import express from 'express';
import Shift from '../models/Shift';
import Application from '../models/Application';
import User from '../models/User';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (req, res) => {
  const { role, businessId, date } = req.query;
  const q: any = {};
  if (role) q.role = role;
  if (businessId) q.businessId = businessId;
  if (date) q.date = { $eq: new Date(String(date)) };
  const shifts = await Shift.find(q).populate('applicants').lean();
  res.json(shifts);
});

router.post('/', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  if (currentUser.userType !== 'Business') return res.status(403).json({ error: 'Only businesses may post shifts' });
  const data = req.body;
  const shift = await Shift.create({
    ...data,
    businessId: currentUser._id,
    businessName: currentUser.name,
    businessLogo: currentUser.avatar,
    postedAt: new Date()
  });
  res.json(shift);
});

router.get('/:id', async (req, res) => {
  const shift = await Shift.findById(req.params.id).populate('applicants').lean();
  if (!shift) return res.status(404).json({ error: 'Not found' });
  res.json(shift);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const shift = await Shift.findById(req.params.id);
  if (!shift) return res.status(404).json({ error: 'Not found' });
  if (shift.businessId.toString() !== currentUser._id.toString() && currentUser.userType !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await shift.deleteOne();
  res.json({ success: true });
});

router.post('/:id/apply', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const { message } = req.body;
  const shift = await Shift.findById(req.params.id);
  if (!shift) return res.status(404).json({ error: 'Shift not found' });
  const existing = await Application.findOne({ shiftId: shift._id, userId: currentUser._id });
  if (existing) return res.status(400).json({ error: 'Already applied' });
  const app = await Application.create({ shiftId: shift._id, userId: currentUser._id, message });
  shift.applicants.push(currentUser._id);
  await shift.save();
  res.json(app);
});

router.get('/:id/applicants', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const shift = await Shift.findById(req.params.id).populate('applicants');
  if (!shift) return res.status(404).json({ error: 'Not found' });
  if (shift.businessId.toString() !== currentUser._id.toString() && currentUser.userType !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const apps = await Application.find({ shiftId: shift._id }).populate('userId');
  res.json(apps);
});

router.post('/:id/accept', requireAuth, async (req, res) => {
  const currentUser = (req as any).currentUser;
  const { applicantId } = req.body;
  const shift = await Shift.findById(req.params.id);
  if (!shift) return res.status(404).json({ error: 'Shift not found' });
  if (shift.businessId.toString() !== currentUser._id.toString()) return res.status(403).json({ error: 'Only business' });
  shift.status = 'Filled';
  shift.acceptedUserId = applicantId;
  await shift.save();
  await Application.updateMany({ shiftId: shift._id, userId: applicantId }, { status: 'Accepted' });
  await Application.updateMany({ shiftId: shift._id, userId: { $ne: applicantId } }, { status: 'Rejected' });
  res.json({ success: true });
});

export default router;