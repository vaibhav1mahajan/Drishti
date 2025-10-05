import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { connectMongo } from './lib/mongo';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import jwksRouter from './routes/jwks';

const app = express();

// security + basics
const origins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(helmet());
app.use(cors({ origin: origins.length ? origins : true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

// tiny request logger for dev
app.use((req, _res, next) => { console.log(`[REQ] ${req.method} ${req.url}`); next(); });

// public
app.get('/ping', (_req, res) => res.send('pong'));
app.use('/.well-known', jwksRouter);

// auth + users
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// start
(async () => {
  await connectMongo();
  const PORT = Number(process.env.PORT) || 5050;
  const HOST = '0.0.0.0';
  app.listen(PORT, HOST, () => console.log(`API on http://${HOST}:${PORT}`));
})();
