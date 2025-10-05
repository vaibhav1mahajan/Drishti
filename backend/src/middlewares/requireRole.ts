import { type Response, type NextFunction } from 'express';
import { type AuthedRequest } from './auth';
import { type Role } from '../lib/jwt';

export function requireRole(...roles: Role[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) return res.status(403).json({ error: 'forbidden_role', need: roles });
    next();
  };
}
