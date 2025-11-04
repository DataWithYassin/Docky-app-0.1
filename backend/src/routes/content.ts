import express from 'express';
import WebsiteContent from '../models/WebsiteContent';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/website', async (req, res) => {
  let content = await WebsiteContent.findOne().lean();
  res.json(content?.data || {});
});

router.put('/website', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  if (currentUser.userType !== 'Admin') return res.status(403).json({ error: 'Only admin' });
  const data = req.body;
  let content = await WebsiteContent.findOne();
  if (content) {
    content.data = data;
    await content.save();
  } else {
    content = await WebsiteContent.create({ data });
  }
  res.json(content);
});

export default router;