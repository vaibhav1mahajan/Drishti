import jwt from 'jsonwebtoken';
import { PRIVATE_PEM, PUBLIC_PEM } from './keys';

export type Role = 'admin' | 'user';

export type AccessPayload = {
  sub: string;
  email: string;
  role: Role;
};

export type RefreshPayload = AccessPayload & {
  jti: string;     // refresh token id
  rtv: number;     // refresh token version (per user session bump)
};

const accessTtl  = process.env.JWT_ACCESS_TTL  || '15m';
const refreshTtl = process.env.JWT_REFRESH_TTL || '7d';

export function signAccess(p: AccessPayload) {
  return jwt.sign(p, PRIVATE_PEM, { algorithm: 'RS256', expiresIn: accessTtl } as jwt.SignOptions);
}

export function signRefresh(p: RefreshPayload) {
  return jwt.sign(p, PRIVATE_PEM, { algorithm: 'RS256', expiresIn: refreshTtl } as jwt.SignOptions);
}

export function verifyAccess(t: string)  { return jwt.verify(t, PUBLIC_PEM, { algorithms: ['RS256'] }) as AccessPayload; }
export function verifyRefresh(t: string) { return jwt.verify(t, PUBLIC_PEM, { algorithms: ['RS256'] }) as RefreshPayload; }
