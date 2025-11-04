import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import Chat from '../models/Chat';
import Shift from '../models/Shift';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const userId = currentUser._id;
  const chats = await Chat.find({ $or: [{ userId }, { businessId: userId }] }).lean();
  res.json(chats);
});

router.post('/', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const { shiftId, partnerId } = req.body;
  const shift = await Shift.findById(shiftId);
  if (!shift) return res.status(404).json({ error: 'Shift not found' });
  let userId = currentUser._id;
  let businessId = partnerId;
  if (currentUser.userType === 'Business') {
    businessId = currentUser._id;
    userId = partnerId;
  } else {
    businessId = shift.businessId;
  }
  let chat = await Chat.findOne({ shiftId, userId, businessId });
  if (!chat) {
    chat = await Chat.create({ shiftId, userId, businessId, messages: [] });
  }
  res.json(chat);
});

router.get('/:id/messages', requireAuth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) return res.status(404).json({ error: 'Not found' });
  res.json(chat.messages);
});

router.post('/:id/messages', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const { text } = req.body;
  const chat = await Chat.findById(req.params.id);
  if (!chat) return res.status(404).json({ error: 'Not found' });
  chat.messages.push({ senderId: currentUser._id, text, timestamp: new Date() } as any);
  await chat.save();
  res.json(chat);
});

export default router;