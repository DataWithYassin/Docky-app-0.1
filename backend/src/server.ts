import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import shiftsRoutes from './routes/shifts';
import chatsRoutes from './routes/chats';
import contentRoutes from './routes/content';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/docky';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret';
const PORT = Number(process.env.PORT || 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

  const RedisStore = connectRedis(session);
  const redisClient = new Redis(REDIS_URL);

  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    name: 'docky_sid',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 }
  }));

  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/shifts', shiftsRoutes);
  app.use('/api/chats', chatsRoutes);
  app.use('/api/content', contentRoutes);

  app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

  app.listen(PORT, () => console.log(`Docky backend listening on http://localhost:${PORT}`));
}

main().catch(err => { console.error('Failed to start server', err); process.exit(1); });
