import { Router } from 'express';
import { z } from 'zod';
import auth, { type AuthedRequest } from '../middlewares/auth';
import { requireRole } from '../middlewares/requireRole';
import { User } from '../models/User';

const r = Router();

// GET /users/me
r.get('/me', auth, async (req: AuthedRequest, res) => {
  const me = await User.findById(req.user!.sub).select('-passwordHash');
  return res.json(me);
});

// PATCH /users/me (name, avatar)
r.patch('/me', auth, async (req: AuthedRequest, res) => {
  const Schema = z.object({
    name: z.string().min(2).max(80).optional(),
    avatarUrl: z.string().url().optional()
  });
  const body = Schema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.message });

  const updated = await User.findByIdAndUpdate(
    req.user!.sub,
    { $set: body.data },
    { new: true, select: '-passwordHash' }
  );
  return res.json(updated);
});

// GET /users (admin)
r.get('/', auth, requireRole('admin'), async (_req, res) => {
  const list = await User.find({ deletedAt: null }).select('-passwordHash').lean();
  return res.json(list);
});

// POST /users (admin invite/create)
r.post('/', auth, requireRole('admin'), async (req, res) => {
  const Schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(8),
    role: z.enum(['admin','user']).default('user')
  });
  const body = Schema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.message });

  const email = body.data.email.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'email_exists' });

  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.default.hash(body.data.password, 10);
  const u = await User.create({
    email, name: body.data.name, passwordHash: hash, role: body.data.role
  });
  return res.status(201).json({ id: u._id, email: u.email, role: u.role });
});

// PATCH /users/:id/roles (admin)
r.patch('/:id/roles', auth, requireRole('admin'), async (req, res) => {
  const role = req.body?.role;
  if (!['admin','user'].includes(role)) return res.status(400).json({ error: 'bad_role' });
  await User.updateOne({ _id: req.params.id }, { $set: { role } });
  return res.json({ ok: true });
});

// DELETE /users/:id → soft-delete/deactivate (admin)
r.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  await User.updateOne({ _id: req.params.id }, { $set: { deletedAt: new Date() } });
  return res.json({ ok: true });
});

export default r;
