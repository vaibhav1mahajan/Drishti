import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import speakeasy from 'speakeasy';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import { signAccess, signRefresh, verifyRefresh, type AccessPayload, type RefreshPayload } from '../lib/jwt';
import crypto from 'crypto';    

const r = Router();
const COOKIE = process.env.REFRESH_COOKIE_NAME || 'drishti_rt';
const COOKIE_SECURE = (process.env.COOKIE_SECURE || 'false') === 'true';

function setRefreshCookie(res: any, token: string) {
  res.cookie(COOKIE, token, {
    httpOnly: true, secure: COOKIE_SECURE, sameSite: 'lax',
    path: '/api/v1/auth', maxAge: 1000 * 60 * 60 * 24 * 30
  });
}

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(80)
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  code: z.string().optional() // optional TOTP
});

function adminOrUser(email: string) {
  const list = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase());
  return list.includes(email.toLowerCase()) ? 'admin' : 'user';
}

function sha256b64(s: string) { return crypto.createHash('sha256').update(s).digest('base64'); }

/** POST /auth/register  (dev only if enabled later) */
r.post('/register', async (req, res) => {
  const body = RegisterSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.message });

  const email = body.data.email.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'email_exists' });

  const hash = await bcrypt.hash(body.data.password, 10);
  const user = await User.create({
    email, name: body.data.name, passwordHash: hash, role: adminOrUser(email)
  });
  return res.status(201).json({ id: user._id, email: user.email, role: user.role });
});

/** POST /auth/login -> { access_token, refresh_token } */
r.post('/login', async (req, res) => {
  const body = LoginSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.message });

  const email = body.data.email.toLowerCase();
  const user = await User.findOne({ email, deletedAt: null });
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });

  const ok = await bcrypt.compare(body.data.password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });

  // optional MFA TOTP
  if (user.mfaEnabled) {
    const code = body.data.code || '';
    const okMfa = speakeasy.totp.verify({
      secret: user.mfaSecret || '', encoding: 'base32', token: code, window: 1
    });
    if (!okMfa) return res.status(401).json({ error: 'mfa_required_or_invalid' });
  }

  const base: AccessPayload = { sub: String(user._id), email: user.email || '', role: user.role as any };
  const jti = uuid();
  const refreshPayload: RefreshPayload = { ...base, jti, rtv: user.refreshVersion || 0 };

  const access_token  = signAccess(base);
  const refresh_token = signRefresh(refreshPayload);

  // persist hashed refresh (server-side revocation)
  await RefreshToken.create({
    userId: String(user._id),
    jti,
    tokenHash: sha256b64(refresh_token),
    userAgent: req.headers['user-agent'] || '',
    ip: (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  });

  setRefreshCookie(res, refresh_token);
  return res.json({ access_token, refresh_token });
});

/** POST /auth/refresh -> rotate refresh, return new pair */
r.post('/refresh', async (req, res) => {
  try {
    const token = (req.cookies?.[COOKIE]) || req.body?.refresh_token;
    if (!token) return res.status(401).json({ error: 'no_refresh' });

    const decoded = verifyRefresh(token);
    const dbToken = await RefreshToken.findOne({ jti: decoded.jti, userId: decoded.sub });
    if (!dbToken || dbToken.revokedAt) return res.status(401).json({ error: 'refresh_revoked' });
    if (dbToken.tokenHash !== sha256b64(token)) return res.status(401).json({ error: 'mismatch' });

    // rotate: revoke old, issue new
    dbToken.revokedAt = new Date();
    await dbToken.save();

    const base: AccessPayload = { sub: decoded.sub, email: decoded.email, role: decoded.role };
    const jti = uuid();
    const refreshPayload: RefreshPayload = { ...base, jti, rtv: decoded.rtv || 0 };
    const access_token  = signAccess(base);
    const refresh_token = signRefresh(refreshPayload);

    await RefreshToken.create({
      userId: decoded.sub, jti, tokenHash: sha256b64(refresh_token),
      userAgent: req.headers['user-agent'] || '',
      ip: (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    });

    setRefreshCookie(res, refresh_token);
    return res.json({ access_token, refresh_token });
  } catch {
    return res.status(401).json({ error: 'invalid_refresh' });
  }
});

/** POST /auth/logout -> revoke refresh (server blacklist) */
r.post('/logout', async (req, res) => {
  try {
    const token = (req.cookies?.[COOKIE]) || req.body?.refresh_token;
    if (token) {
      const d = verifyRefresh(token);
      await RefreshToken.updateOne({ jti: d.jti, userId: d.sub, revokedAt: null }, { $set: { revokedAt: new Date() } });
      // Optional: bump user's refreshVersion to kill all sessions
      await User.updateOne({ _id: d.sub }, { $inc: { refreshVersion: 1 } });
    }
  } catch { /* ignore */ }
  res.clearCookie(COOKIE, { path: '/api/v1/auth' });
  return res.json({ ok: true });
});

/** POST /auth/mfa/verify (optional TOTP check after enrollment) */
r.post('/mfa/verify', async (req, res) => {
  const email = (req.body?.email || '').toLowerCase();
  const code  = (req.body?.code || '').trim();
  const user = await User.findOne({ email });
  if (!user || !user.mfaEnabled) return res.status(400).json({ error: 'mfa_not_enabled' });
  const ok = speakeasy.totp.verify({
    secret: user.mfaSecret || '', encoding: 'base32', token: code, window: 1
  });
  return res.json({ ok });
});

export default r;
