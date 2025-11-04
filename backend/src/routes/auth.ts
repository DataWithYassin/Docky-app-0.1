import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userType, role, location } = req.body;
    if (!name || !email || !userType) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(email || uuidv4())}`;
    const user = await User.create({ name, email, passwordHash, userType, role, location, avatar });
    (req.session as any).userId = user._id.toString();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    (req.session as any).userId = user._id.toString();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session!.destroy(err => {
    if (err) return res.status(500).json({ error: 'Failed to destroy session' });
    res.clearCookie('docky_sid');
    res.json({ success: true });
  });
});

router.get('/me', async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) return res.status(200).json({ user: null });
  const user = await User.findById(userId).lean();
  res.json({ user });
});

export default router;