import { type Request, type Response, type NextFunction } from 'express';
import { verifyAccess, type AccessPayload } from '../lib/jwt';

export interface AuthedRequest extends Request { user?: AccessPayload; }

export default function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!t) return res.status(401).json({ error: 'no_token' });
  try {
    req.user = verifyAccess(t);
    next();
  } catch {
    return res.status(401).json({ error: 'invalid_or_expired_token' });
  }
}
