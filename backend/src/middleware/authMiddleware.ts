import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.session as any)?.userId;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    (req as any).currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
}