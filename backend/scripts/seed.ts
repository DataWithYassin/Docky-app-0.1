import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Shift from '../src/models/Shift';
import Application from '../src/models/Application';
import Chat from '../src/models/Chat';
import WebsiteContent from '../src/models/WebsiteContent';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/docky';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding.');

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Shift.deleteMany({}),
    Application.deleteMany({}),
    Chat.deleteMany({}),
    WebsiteContent.deleteMany({})
  ]);

  // Create sample users (job seekers, businesses, admin)
  const users = [
    { name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://i.pravatar.cc/150?u=alice', role: 'Barista', rating: 4.8, reviewCount: 24, userType: 'JobSeeker', location: 'Lisbon, Portugal', bio: 'Experienced barista with a passion for latte art.', skills: ['Latte Art','Espresso Machine Operation'] },
    { name: 'Carlos Diaz', email: 'carlos.d@example.com', avatar: 'https://i.pravatar.cc/150?u=carlos', role: 'Chef', rating: 4.9, reviewCount: 32, userType: 'JobSeeker', location: 'Porto, Portugal' },
    { name: 'The Local Cafe', email: 'contact@localcafe.com', avatar: 'https://i.pravatar.cc/150?u=cafe', userType: 'Business', role: 'Host', rating: 4.5, reviewCount: 150, location: 'Lisbon' },
    { name: 'Gourmet Bites', email: 'hello@gourmetbites.com', avatar: 'https://i.pravatar.cc/150?u=gourmet', userType: 'Business', role: 'Host', rating: 4.8, reviewCount: 88, location: 'Lisbon' },
    { name: 'Admin', email: 'admin@docky.com', avatar: 'https://i.pravatar.cc/150?u=admin', userType: 'Admin', role: 'Host', rating: 5 }
  ];

  const createdUsers = await User.insertMany(users);
  const alice = createdUsers.find(u => u.email === 'alice.j@example.com')!;
  const carlos = createdUsers.find(u => u.email === 'carlos.d@example.com')!;
  const localCafe = createdUsers.find(u => u.email === 'contact@localcafe.com')!;
  const gourmet = createdUsers.find(u => u.email === 'hello@gourmetbites.com')!;

  const shifts = [
    { businessId: localCafe._id, businessName: localCafe.name, businessLogo: localCafe.avatar, role: 'Barista', date: new Date('2024-08-20'), startTime: '08:00', endTime: '16:00', hourlyRate: 12.5, status: 'Open', postedAt: new Date(), rating: 4.5, applicants: [] },
    { businessId: gourmet._id, businessName: gourmet.name, businessLogo: gourmet.avatar, role: 'Chef', date: new Date('2024-08-22'), startTime: '10:00', endTime: '18:00', hourlyRate: 18, status: 'Open', postedAt: new Date(), rating: 4.8, applicants: [] }
  ];

  const createdShifts = await Shift.insertMany(shifts);
  const shift1 = createdShifts[0];
  const shift2 = createdShifts[1];

  await Application.create({ shiftId: shift1._id, userId: alice._id, status: 'Accepted', message: 'I am available and experienced!' });
  await Application.create({ shiftId: shift2._id, userId: carlos._id, status: 'Pending', message: 'I have experience with Neapolitan pizza.' });

  shift1.applicants.push(alice._id);
  shift2.applicants.push(carlos._id);
  await shift1.save();
  await shift2.save();

  await Chat.create({ shiftId: shift1._id, userId: alice._id, businessId: localCafe._id, messages: [ { senderId: localCafe._id, text: "Hi Alice, please confirm you've seen this.\", timestamp: new Date() }, { senderId: alice._id, text: 'Hello! Yes, confirmed.', timestamp: new Date() } ] });

  await WebsiteContent.create({ data: { hero: { title: 'Your Extra Shift, Made Easy.', subtitle: 'Docky connects hospitality professionals with businesses.' }, valueProps: { jobSeeker: { title: 'For Job Seekers', subtitle: 'Take control of your work life.' }, business: { title: 'For Businesses', subtitle: 'Fill shifts in minutes, not days.' } }, appDownload: { title: 'Get the full experience on our app' } } });

  console.log('Seeding complete.');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => { console.error('Seeding failed', err); process.exit(1); });