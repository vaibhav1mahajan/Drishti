import { Router } from 'express';
import { buildJWKS } from '../lib/keys';

const r = Router();
r.get('/jwks.json', async (_req, res) => {
  const jwks = await buildJWKS();
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.json(jwks);
});
export default r;
