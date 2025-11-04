import express from 'express';
import User from '../models/User';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: (req as any).currentUser });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.put('/:id', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  if (currentUser._id.toString() !== req.params.id && currentUser.userType !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const updates = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  if (currentUser.userType !== 'Admin') return res.status(403).json({ error: 'Only admin' });
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;