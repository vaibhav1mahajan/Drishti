import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { exportJWK, importSPKI } from 'jose';

function readMaybe(p?: string) {
  if (!p) return undefined;
  const full = path.resolve(p);
  if (fs.existsSync(full)) return fs.readFileSync(full, 'utf8');
  return undefined;
}

const privFromFile = readMaybe(process.env.JWT_PRIVATE_KEY_PATH);
const pubFromFile  = readMaybe(process.env.JWT_PUBLIC_KEY_PATH);

export const PRIVATE_PEM = privFromFile || process.env.JWT_PRIVATE_KEY || '';
export const PUBLIC_PEM  = pubFromFile  || process.env.JWT_PUBLIC_KEY  || '';

if (!PRIVATE_PEM || !PUBLIC_PEM) {
  console.warn('[jwt] WARNING: RSA keys missing. Generate keys and set env/paths.');
}

// derive a stable kid from public key
export const KID = crypto.createHash('sha256').update(PUBLIC_PEM).digest('base64url');

// Build JWKS from public PEM
export async function buildJWKS() {
  if (!PUBLIC_PEM) return { keys: [] };
  const pubKey = await importSPKI(PUBLIC_PEM, 'RS256');
  const jwk = await exportJWK(pubKey);
  return { keys: [{ ...jwk, alg: 'RS256', use: 'sig', kid: KID }] };
}
