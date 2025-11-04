import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import WorkerView from './components/WorkerView';
import BusinessView from './components/BusinessView';
import LoginView from './components/LoginView';
import RegistrationView from './components/RegistrationView';
import JobSeekerRegistrationView from './components/JobSeekerRegistrationView';
import JobAnnouncerRegistrationView from './components/JobAnnouncerRegistrationView';
import ProfileView from './components/ProfileView';
import InsightsView from './components/InsightsView';
import JobSeekerView from './components/JobSeekerView';
import AdminDashboardView from './components/AdminDashboardView';
import PostShiftModal from './components/PostShiftModal';
import ApplicationModal from './components/ApplicationModal';
import EditUserModal from './components/EditUserModal';
import ApplicantsModal from './components/ApplicantsModal';
import ChatView from './components/ChatView';
import ChatsListView from './components/ChatsListView';
import { User, Shift, Role, ShiftStatus, UserType, WebsiteContent, View, ApplicationStatus, Chat, Message } from './types';
import { LanguageProvider } from './context/LanguageContext';

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    role: Role.Barista,
    rating: 4.8,
    reviewCount: 24,
    userType: 'JobSeeker',
    totalEarnings: 1250.75,
    applications: [
      { shiftId: 'shift-1', status: ApplicationStatus.Accepted },
      { shiftId: 'shift-3', status: ApplicationStatus.Pending },
      { shiftId: 'shift-5', status: ApplicationStatus.Confirmed },
    ],
    location: 'Lisbon, Portugal',
    bio: 'Experienced barista with a passion for latte art and customer service. Quick learner and team player, always ready for a new challenge. Fluent in English and Portuguese.',
    experience: [
      { id: 1, position: 'Head Barista', place: 'The Coffee Bean', location: 'Lisbon', startDate: '2022-01', endDate: '2023-12' },
      { id: 2, position: 'Barista', place: 'Morning Brew', location: 'Porto', startDate: '2020-06', endDate: '2021-12' },
    ],
    skills: ['Latte Art', 'Espresso Machine Operation', 'Customer Service', 'Cash Handling', 'Food Safety'],
    reviews: [
      { id: 'rev-1', reviewerName: 'The Local Cafe', reviewerAvatar: 'https://i.pravatar.cc/150?u=cafe', rating: 5, comment: 'Alice was fantastic! Punctual, professional, and great with customers.', date: '2024-07-15' },
      { id: 'rev-2', reviewerName: 'Gourmet Bites', reviewerAvatar: 'https://i.pravatar.cc/150?u=gourmet', rating: 4, comment: 'A reliable and skilled barista. Would hire again.', date: '2024-06-20' },
    ],
  },
   {
    id: 'user-4',
    name: 'Carlos Diaz',
    email: 'carlos.d@example.com',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    role: Role.Chef,
    rating: 4.9,
    reviewCount: 32,
    userType: 'JobSeeker',
    applications: [
      { shiftId: 'shift-3', status: ApplicationStatus.Pending },
    ],
    location: 'Porto, Portugal',
  },
  {
    id: 'user-3',
    name: 'Admin',
    email: 'admin@docky.com',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    role: Role.Host,
    rating: 5,
    reviewCount: 0,
    userType: 'JobSeeker', // Simplified for login purposes
  }
];

const mockBusinessUsers: User[] = [
    { id: 'biz-1', name: 'The Local Cafe', email: 'contact@localcafe.com', avatar: 'https://i.pravatar.cc/150?u=cafe', userType: 'Business', role: Role.Host, rating: 4.5, reviewCount: 150, location: 'Lisbon, Portugal', bio: 'A cozy neighborhood cafe serving specialty coffee and homemade pastries. We pride ourselves on a friendly atmosphere and top-quality ingredients. Looking for passionate people to join our team!', reviews: [ { id: 'rev-1', reviewerName: 'Alice Johnson', reviewerAvatar: 'https://i.pravatar.cc/150?u=alice', rating: 5, comment: 'Great place to work! The team is supportive and the customers are lovely.', date: '2024-07-21' } ] },
    { id: 'biz-2', name: 'Gourmet Bites', email: 'hello@gourmetbites.com', avatar: 'https://i.pravatar.cc/150?u=gourmet', userType: 'Business', role: Role.Host, rating: 4.8, reviewCount: 88, location: 'Porto, Portugal' },
    { id: 'biz-3', name: 'Seaside Restaurant', email: 'bookings@seaside.com', avatar: 'https://i.pravatar.cc/150?u=seaside', userType: 'Business', role: Role.Host, rating: 4.2, reviewCount: 120, location: 'Faro, Portugal' },
    { id: 'biz-4', name: 'Urban Eatery', email: 'contact@urbaneatery.com', avatar: 'https://i.pravatar.cc/150?u=urban', userType: 'Business', role: Role.Host, rating: 4.6, reviewCount: 95, location: 'Lisbon, Portugal' },
    { id: 'biz-5', name: 'Sunset Grill', email: 'info@sunsetgrill.com', avatar: 'https://i.pravatar.cc/150?u=sunset', userType: 'Business', role: Role.Host, rating: 4.7, reviewCount: 110, location: 'Faro, Portugal' },
];

const mockShifts: Shift[] = [
    { id: 'shift-1', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Barista, date: '2024-08-20', startTime: '08:00', endTime: '16:00', hourlyRate: 12.50, location: 'Lisbon, Portugal', status: ShiftStatus.Filled, applicants: [mockUsers[0]], acceptedApplicantId: 'user-1', description: 'Seeking an experienced barista for a busy morning shift.', postedAt: '2024-07-10T10:00:00Z', requirements: ['Latte Art'], languages: ['English'], rating: 4.5, allowPreApplyMessaging: true },
    { id: 'shift-2', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Waiter, date: '2024-08-21', startTime: '18:00', endTime: '23:00', hourlyRate: 11.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Waiter needed for our evening service. Must be friendly and efficient.', postedAt: '2024-07-12T14:30:00Z', requirements: ['Tray service'], rating: 4.5, allowPreApplyMessaging: false },
    { id: 'shift-3', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Chef, date: '2024-08-22', startTime: '10:00', endTime: '18:00', hourlyRate: 18.00, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [mockUsers[0], mockUsers[1]], description: 'Line cook needed for prep and service. Experience with Italian cuisine preferred.', postedAt: '2024-07-11T09:00:00Z', rating: 4.8, requirements: ['Food Safety Certificate'], allowPreApplyMessaging: true },
    { id: 'shift-4', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.Host, date: '2024-08-25', startTime: '19:00', endTime: '23:00', hourlyRate: 13.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Host/Hostess to manage reservations and greet guests.', postedAt: '2024-07-13T11:00:00Z', rating: 4.2, languages: ['English', 'Portuguese'] },
    { id: 'shift-5', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.KitchenStaff, date: '2024-08-15', startTime: '09:00', endTime: '15:00', hourlyRate: 10.50, location: 'Lisbon, Portugal', status: ShiftStatus.Completed, applicants: [mockUsers[0]], acceptedApplicantId: 'user-1', description: 'Dishwasher and general kitchen help needed.', postedAt: '2024-07-01T18:00:00Z', rating: 4.5 },
    // Expired Shift Example
    { id: 'shift-expired-1', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Waiter, date: '2024-10-15', startTime: '19:00', endTime: '23:00', hourlyRate: 11.50, location: 'Porto, Portugal', status: ShiftStatus.Expired, applicants: [], description: 'Waiter for a private event.', postedAt: '2024-10-01T09:00:00Z', rating: 4.8 },

    // November Shifts (15)
    { id: 'shift-nov-1', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.Host, date: '2024-11-05', startTime: '18:00', endTime: '22:00', hourlyRate: 14.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Energetic host needed.', postedAt: '2024-10-20T12:00:00Z', rating: 4.6 },
    { id: 'shift-nov-2', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.Chef, date: '2024-11-08', startTime: '16:00', endTime: '00:00', hourlyRate: 20.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Grill master for evening service.', postedAt: '2024-10-21T10:00:00Z', rating: 4.7 },
    { id: 'shift-nov-3', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Barista, date: '2024-11-10', startTime: '07:00', endTime: '15:00', hourlyRate: 13.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Early bird barista.', postedAt: '2024-10-22T14:00:00Z', rating: 4.5 },
    { id: 'shift-nov-4', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.KitchenStaff, date: '2024-11-12', startTime: '11:00', endTime: '19:00', hourlyRate: 11.00, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Food prep and dishwashing.', postedAt: '2024-10-25T09:00:00Z', rating: 4.8 },
    { id: 'shift-nov-5', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.Waiter, date: '2024-11-15', startTime: '19:00', endTime: '23:30', hourlyRate: 12.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Weekend waiter position.', postedAt: '2024-10-28T11:00:00Z', rating: 4.2 },
    { id: 'shift-nov-6', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.Barista, date: '2024-11-18', startTime: '09:00', endTime: '17:00', hourlyRate: 12.75, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Full-day barista shift.', postedAt: '2024-11-01T15:00:00Z', rating: 4.6 },
    { id: 'shift-nov-7', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Waiter, date: '2024-11-20', startTime: '12:00', endTime: '20:00', hourlyRate: 11.50, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Lunch and dinner service.', postedAt: '2024-11-02T18:00:00Z', rating: 4.5 },
    { id: 'shift-nov-8', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.Host, date: '2024-11-22', startTime: '17:00', endTime: '21:00', hourlyRate: 13.50, location: 'Faro, Portugal', status: ShiftStatus.Filled, applicants: [], description: 'Friday night host.', postedAt: '2024-11-05T12:00:00Z', rating: 4.7 },
    { id: 'shift-nov-9', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Chef, date: '2024-11-24', startTime: '15:00', endTime: '23:00', hourlyRate: 19.00, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Pastry chef assistance.', postedAt: '2024-11-08T16:00:00Z', rating: 4.8 },
    { id: 'shift-nov-10', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.KitchenStaff, date: '2024-11-25', startTime: '10:00', endTime: '16:00', hourlyRate: 11.25, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Morning prep cook.', postedAt: '2024-11-10T13:00:00Z', rating: 4.2 },
    { id: 'shift-nov-11', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Barista, date: '2024-11-26', startTime: '10:00', endTime: '18:00', hourlyRate: 13.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Specialty coffee artist.', postedAt: '2024-11-11T11:00:00Z', rating: 4.5 },
    { id: 'shift-nov-12', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.Chef, date: '2024-11-28', startTime: '17:00', endTime: '01:00', hourlyRate: 21.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Late night line cook.', postedAt: '2024-11-12T19:00:00Z', rating: 4.6 },
    { id: 'shift-nov-13', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.Waiter, date: '2024-11-29', startTime: '18:00', endTime: '23:00', hourlyRate: 12.50, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Cocktail waiter/waitress.', postedAt: '2024-11-15T14:00:00Z', rating: 4.7 },
    { id: 'shift-nov-14', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Host, date: '2024-11-30', startTime: '12:00', endTime: '16:00', hourlyRate: 13.00, location: 'Porto, Portugal', status: ShiftStatus.Completed, applicants: [], description: 'Weekend lunch host.', postedAt: '2024-11-18T10:00:00Z', rating: 4.8 },
    { id: 'shift-nov-15', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.KitchenStaff, date: '2024-11-30', startTime: '08:00', endTime: '12:00', hourlyRate: 11.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Morning bakery assistant.', postedAt: '2024-11-20T08:00:00Z', rating: 4.5 },

    // December Shifts (15)
    { id: 'shift-dec-1', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.Chef, date: '2024-12-02', startTime: '11:00', endTime: '19:00', hourlyRate: 19.50, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Seafood specialist.', postedAt: '2024-11-21T09:00:00Z', rating: 4.2 },
    { id: 'shift-dec-2', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.Waiter, date: '2024-12-04', startTime: '19:00', endTime: '23:00', hourlyRate: 12.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Mid-week dinner service.', postedAt: '2024-11-22T11:00:00Z', rating: 4.6 },
    { id: 'shift-dec-3', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Host, date: '2024-12-06', startTime: '09:00', endTime: '13:00', hourlyRate: 12.50, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Friday morning host.', postedAt: '2024-11-25T14:00:00Z', rating: 4.5 },
    { id: 'shift-dec-4', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.KitchenStaff, date: '2024-12-08', startTime: '14:00', endTime: '22:00', hourlyRate: 11.75, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Sunday evening kitchen porter.', postedAt: '2024-11-26T17:00:00Z', rating: 4.7 },
    { id: 'shift-dec-5', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Barista, date: '2024-12-10', startTime: '13:00', endTime: '21:00', hourlyRate: 13.50, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Afternoon to evening barista.', postedAt: '2024-11-28T10:00:00Z', rating: 4.8 },
    { id: 'shift-dec-6', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.Waiter, date: '2024-12-12', startTime: '18:30', endTime: '22:30', hourlyRate: 12.25, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Cover for dinner service.', postedAt: '2024-11-29T16:00:00Z', rating: 4.6 },
    { id: 'shift-dec-7', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.Host, date: '2024-12-14', startTime: '19:00', endTime: '23:00', hourlyRate: 13.75, location: 'Faro, Portugal', status: ShiftStatus.Filled, applicants: [], description: 'Saturday night hostess.', postedAt: '2024-12-01T11:00:00Z', rating: 4.2 },
    { id: 'shift-dec-8', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Chef, date: '2024-12-16', startTime: '08:00', endTime: '16:00', hourlyRate: 17.50, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Brunch chef needed.', postedAt: '2024-12-02T13:00:00Z', rating: 4.5 },
    { id: 'shift-dec-9', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Waiter, date: '2024-12-18', startTime: '20:00', endTime: '00:00', hourlyRate: 11.75, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Late evening service.', postedAt: '2024-12-03T15:00:00Z', rating: 4.8 },
    { id: 'shift-dec-10', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.Chef, date: '2024-12-20', startTime: '17:00', endTime: '23:00', hourlyRate: 22.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Head chef assistant for holidays.', postedAt: '2024-12-05T18:00:00Z', rating: 4.7 },
    { id: 'shift-dec-11', businessName: 'Urban Eatery', businessLogo: 'https://i.pravatar.cc/150?u=urban', role: Role.KitchenStaff, date: '2024-12-22', startTime: '10:00', endTime: '18:00', hourlyRate: 11.50, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Holiday prep staff.', postedAt: '2024-12-08T10:00:00Z', rating: 4.6 },
    { id: 'shift-dec-12', businessName: 'The Local Cafe', businessLogo: 'https://i.pravatar.cc/150?u=cafe', role: Role.Barista, date: '2024-12-24', startTime: '08:00', endTime: '14:00', hourlyRate: 15.00, location: 'Lisbon, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Christmas Eve morning shift.', postedAt: '2024-12-10T12:00:00Z', rating: 4.5 },
    { id: 'shift-dec-13', businessName: 'Seaside Restaurant', businessLogo: 'https://i.pravatar.cc/150?u=seaside', role: Role.Waiter, date: '2024-12-27', startTime: '19:00', endTime: '23:00', hourlyRate: 12.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'Post-Christmas dinner service.', postedAt: '2024-12-12T14:00:00Z', rating: 4.2 },
    { id: 'shift-dec-14', businessName: 'Gourmet Bites', businessLogo: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Chef, date: '2024-12-29', startTime: '12:00', endTime: '20:00', hourlyRate: 19.00, location: 'Porto, Portugal', status: ShiftStatus.Open, applicants: [], description: 'End of year prep.', postedAt: '2024-12-15T09:00:00Z', rating: 4.8 },
    { id: 'shift-dec-15', businessName: 'Sunset Grill', businessLogo: 'https://i.pravatar.cc/150?u=sunset', role: Role.Host, date: '2024-12-31', startTime: '20:00', endTime: '02:00', hourlyRate: 18.00, location: 'Faro, Portugal', status: ShiftStatus.Open, applicants: [], description: 'New Year\'s Eve host.', postedAt: '2024-12-18T11:00:00Z', rating: 4.7 },
];

const mockChats: Chat[] = [
    {
        id: 'chat-1',
        shiftId: 'shift-1',
        participants: { userId: 'user-1', businessId: 'biz-1' },
        messages: [
            { id: 'msg-1', senderId: 'biz-1', text: "Hi Alice, we're excited to have you for the shift on the 20th! Please confirm you've seen this.", timestamp: '2024-07-11T10:00:00Z' },
            { id: 'msg-2', senderId: 'user-1', text: "Hello! Yes, confirmed. Looking forward to it!", timestamp: '2024-07-11T10:05:00Z' }
        ]
    },
    {
        id: 'chat-2',
        shiftId: 'shift-3',
        participants: { userId: 'user-4', businessId: 'biz-2' },
        messages: [
            { id: 'msg-3', senderId: 'biz-2', text: "Hi Carlos, thanks for applying. Do you have experience with Neapolitan pizza?", timestamp: '2024-07-11T11:00:00Z' },
        ]
    }
];

const initialWebsiteContent: WebsiteContent = {
  hero: {
    title: 'Your Extra Shift, Made Easy.',
    subtitle: 'Docky connects talented hospitality professionals with businesses for on-demand shifts. Find work that fits your schedule, or hire the staff you need, right when you need them.'
  },
  valueProps: {
    jobSeeker: { title: 'For Job Seekers', subtitle: 'Take control of your work life.', description: '', benefits: ['Flexible hours, better pay.', 'Work at top-rated local businesses.', 'Get paid quickly and reliably.'] },
    business: { title: 'For Businesses', subtitle: 'Fill shifts in minutes, not days.', description: '', benefits: ['Access a pool of vetted professionals.', 'Post a shift in seconds.', 'Manage everything in one simple dashboard.'] }
  },
  appDownload: {
    title: 'Get the full experience on our app',
    subtitle: 'Manage your shifts, get instant notifications, and connect on the go. Download the Docky app today for the best experience.'
  }
};

type NotificationSettings = {
    emailOnProfileUpdate: boolean;
    emailOnApplicationStatusChange: boolean;
};


const AppContent: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([...mockUsers, ...mockBusinessUsers]);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailOnProfileUpdate: true,
    emailOnApplicationStatusChange: true,
  });

  const [isPostShiftModalOpen, setIsPostShiftModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<User | null>(null);
  const [shiftToApplyAfterLogin, setShiftToApplyAfterLogin] = useState<string | null>(null);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedShiftForApplicants, setSelectedShiftForApplicants] = useState<Shift | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  
  const handleEditUserClick = (user: User) => {
    setSelectedUserToEdit(user);
    setIsEditUserModalOpen(true);
  };

  const handleNavigate = (newView: View) => {
    setView(currentView => {
        if (currentView !== newView) {
            setPreviousView(currentView);
        }
        return newView;
    });
    window.scrollTo(0, 0);
  };

  const handleLogin = (userType: UserType) => {
    const userToLogin = users.find(u => u.userType === userType && u.email !== 'admin@docky.com');
    if (userToLogin) {
      setIsLoggedIn(true);
      setCurrentUser(userToLogin);
      if (userType === 'Business') {
        handleNavigate('business');
      } else {
        handleNavigate('jobSeekerDashboard');
      }
    }
  };

  const handleAdminLogin = () => {
    const adminUser = users.find(u => u.email === 'admin@docky.com');
    if (adminUser) {
      setIsLoggedIn(true);
      setCurrentUser(adminUser);
      handleNavigate('adminDashboard');
    } else {
      alert('Admin user not found in mock data!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    handleNavigate('home');
  };

  const handleAddShift = (newShiftData: Omit<Shift, 'id' | 'businessName' | 'businessLogo' | 'applicants' | 'status' | 'postedAt'>) => {
    if (!currentUser || currentUser.userType !== 'Business') return;
    
    const newShift: Shift = {
      ...newShiftData,
      id: `shift-${Date.now()}`,
      businessName: currentUser.name,
      businessLogo: currentUser.avatar,
      applicants: [],
      status: ShiftStatus.Open,
      postedAt: new Date().toISOString(),
      rating: currentUser.rating,
    };
    setShifts(prev => [newShift, ...prev]);
  };

  const handleApply = (shiftId: string) => {
    if (isLoggedIn && currentUser?.userType === 'JobSeeker') {
        const shift = shifts.find(s => s.id === shiftId);
        if (shift) {
            setSelectedShift(shift);
            setIsApplicationModalOpen(true);
        }
    } else if (!isLoggedIn) {
        setShiftToApplyAfterLogin(shiftId);
        handleNavigate('jobSeekerRegister');
    }
  };

  const handleJobSeekerRegister = (formData: any) => {
    const newUser: User = {
        id: `user-${Date.now()}`,
        name: formData.fullName,
        email: formData.email,
        avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
        role: formData.preferredJobs.values().next().value || Role.Barista,
        rating: 5.0,
        reviewCount: 0,
        userType: 'JobSeeker',
        applications: [],
        location: formData.location,
        bio: 'A new and enthusiastic member of the Docky community!',
        skills: Array.from(formData.preferredJobs as Set<string>),
    };

    setUsers(prev => [...prev, newUser]);
    setIsLoggedIn(true);
    setCurrentUser(newUser);

    if (shiftToApplyAfterLogin) {
        const shiftIdToApply = shiftToApplyAfterLogin;
        setShiftToApplyAfterLogin(null);
        handleApply(shiftIdToApply);
    } else {
        handleNavigate('jobSeekerDashboard');
    }
  };

  const handleConfirmApplication = (message: string) => {
    if (!selectedShift || !currentUser) return;
    
    console.log(`Application for shift ${selectedShift.id} submitted with message: "${message}"`);

    // Add applicant to shift
    setShifts(prevShifts => prevShifts.map(s => 
      s.id === selectedShift.id 
      ? { ...s, applicants: [...s.applicants.filter(a => a.id !== currentUser.id), currentUser] } 
      : s
    ));
    
    // Add application to user
    setCurrentUser(prevUser => {
        if (!prevUser) return null;
        const newApplications = [
            ...(prevUser.applications || []).filter(app => app.shiftId !== selectedShift.id),
            { shiftId: selectedShift.id, status: ApplicationStatus.Pending }
        ];
        const updatedUser = { ...prevUser, applications: newApplications };
        
        setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));

        return updatedUser;
    });

    setIsApplicationModalOpen(false);
    setSelectedShift(null);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
    if (notificationSettings.emailOnProfileUpdate) {
        alert(`(Simulation) Email notification sent to ${updatedUser.name} about their profile update.`);
    }
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };
  
  const handleDeleteShift = (shiftId: string) => {
    setShifts(prevShifts => prevShifts.filter(s => s.id !== shiftId));
  };

  const handleContentChange = (newContent: WebsiteContent) => {
    setWebsiteContent(newContent);
  };

  const handleNotificationSettingsChange = (settings: NotificationSettings) => {
    setNotificationSettings(settings);
    alert('(Simulation) Notification settings saved successfully!');
  };

  const handleOpenApplicantsModal = (shiftId: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift) {
        setSelectedShiftForApplicants(shift);
        setIsApplicantsModalOpen(true);
    }
  };

  const handleAcceptApplicant = (shiftId: string, applicantId: string) => {
    // 1. Update Shift
    setShifts(prevShifts => prevShifts.map(s => 
        s.id === shiftId 
        ? { ...s, status: ShiftStatus.Filled, acceptedApplicantId: applicantId } 
        : s
    ));

    const business = users.find(u => u.id === currentUser?.id);
    const shift = shifts.find(s => s.id === shiftId);

    // 2. Update all applicants for that shift
    const applicantIds = shift?.applicants.map(a => a.id) || [];
    setUsers(prevUsers => prevUsers.map(u => {
        if (applicantIds.includes(u.id)) {
            const newApplications = u.applications?.map(app => {
                if (app.shiftId === shiftId) {
                    const newStatus = u.id === applicantId ? ApplicationStatus.Accepted : ApplicationStatus.Rejected;
                    if (notificationSettings.emailOnApplicationStatusChange) {
                        alert(`(Simulation) Email sent to ${u.name}: Your application for the ${shift?.role} shift has been ${newStatus}.`);
                    }
                    return { ...app, status: newStatus };
                }
                return app;
            });
            return { ...u, applications: newApplications };
        }
        return u;
    }));
    
    // 3. Create or find a chat and add acceptance message
    if(business) {
        handleStartOrOpenChat(applicantId, shiftId, `Congratulations! You've been selected for the shift. Please confirm the date and time.`);
    }

    setIsApplicantsModalOpen(false);
  };

  const handleConfirmShiftBySeeker = (shiftId: string) => {
      if(!currentUser) return;
      
      const updatedUser = {
          ...currentUser,
          applications: currentUser.applications?.map(app => 
              app.shiftId === shiftId ? { ...app, status: ApplicationStatus.Confirmed } : app
          )
      };
      
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

      handleStartOrOpenChat(null, shiftId, `Confirmed! I'll be there.`);
  };

  const handleOpenChatByShiftId = (shiftId: string) => {
    if (!currentUser) return;
    const chat = chats.find(c => c.shiftId === shiftId && Object.values(c.participants).includes(currentUser.id));
    if (chat) {
        setActiveChat(chat);
        handleNavigate('chat');
    }
  };

  const handleOpenChatById = (chatId: string) => {
    const chatToOpen = chats.find(c => c.id === chatId);
    if (chatToOpen) {
        setActiveChat(chatToOpen);
        handleNavigate('chat');
    }
  };

  const handleStartOrOpenChat = (partnerId: string | null, shiftId: string, initialMessage?: string) => {
    if (!currentUser) return;
    
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;

    let targetPartnerId = partnerId;
    if (!targetPartnerId) {
        // Find partner from existing chat or shift data
        const existingChat = chats.find(c => c.shiftId === shiftId && Object.values(c.participants).includes(currentUser.id));
        if (existingChat) {
            targetPartnerId = currentUser.id === existingChat.participants.userId ? existingChat.participants.businessId : existingChat.participants.userId;
        } else {
             const business = users.find(u => u.name === shift.businessName && u.userType === 'Business');
             if(business) targetPartnerId = business.id;
        }
    }
    if (!targetPartnerId) return;

    let chat = chats.find(c =>
        c.shiftId === shiftId &&
        Object.values(c.participants).includes(currentUser.id) &&
        Object.values(c.participants).includes(targetPartnerId!)
    );

    if (!chat) {
        const newChat: Chat = {
            id: `chat-${Date.now()}`,
            shiftId: shiftId,
            participants: {
                userId: currentUser.userType === 'JobSeeker' ? currentUser.id : targetPartnerId,
                businessId: currentUser.userType === 'Business' ? currentUser.id : targetPartnerId,
            },
            messages: []
        };
        setChats(prev => [...prev, newChat]);
        chat = newChat;
    }

    if (initialMessage) {
        handleSendMessage(chat.id, initialMessage, true);
    } else {
        setActiveChat(chat);
        handleNavigate('chat');
    }
  };

  const handleSendMessage = (chatId: string, text: string, fromSystem: boolean = false) => {
      if (!currentUser && !fromSystem) return;

      const newMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: currentUser!.id,
          text: text,
          timestamp: new Date().toISOString(),
      };

      const updatedChats = chats.map(c => 
          c.id === chatId ? { ...c, messages: [...c.messages, newMessage] } : c
      );

      setChats(updatedChats);
      setActiveChat(updatedChats.find(c => c.id === chatId) || null);
      if (!fromSystem) {
        handleNavigate('chat');
      }
  };

  const renderView = () => {
    switch(view) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApply} businesses={mockBusinessUsers} />;
      case 'jobs':
        return <WorkerView shifts={shifts} onApply={handleApply} isLoggedIn={isLoggedIn} user={currentUser} />;
      case 'insights':
        return <InsightsView shifts={shifts} users={users} />;
      case 'login':
        return <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      case 'register':
        return <RegistrationView onNavigate={handleNavigate} />;
      case 'jobSeekerRegister':
        return <JobSeekerRegistrationView onNavigate={handleNavigate} onRegister={handleJobSeekerRegister} />;
      case 'jobAnnouncerRegister':
        return <JobAnnouncerRegistrationView onNavigate={handleNavigate} />;
      case 'profile':
        return currentUser ? (
          <ProfileView
            user={currentUser}
            chats={chats}
            shifts={shifts}
            allUsers={users}
            onOpenChat={handleOpenChatById}
          />
        ) : (
          <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
        );
      case 'business':
        return currentUser ? <BusinessView 
            shifts={shifts.filter(s => s.businessName === currentUser?.name)} 
            onPostShiftClick={() => setIsPostShiftModalOpen(true)} 
            onShiftClick={handleOpenApplicantsModal}
            chats={chats.filter(c => c.participants.businessId === currentUser.id)}
            allUsers={users}
            currentUser={currentUser}
            onOpenChat={handleOpenChatById}
          /> : <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      case 'jobSeekerDashboard':
        return currentUser ? <JobSeekerView user={currentUser} shifts={shifts} onNavigate={handleNavigate} onApply={handleApply} isLoggedIn={isLoggedIn} onConfirmShift={handleConfirmShiftBySeeker} onOpenChat={handleOpenChatByShiftId} /> : <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      case 'adminDashboard':
        return <AdminDashboardView users={users} shifts={shifts} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} onDeleteShift={handleDeleteShift} onEditUser={handleEditUserClick} websiteContent={websiteContent} onContentChange={handleContentChange} notificationSettings={notificationSettings} onNotificationSettingsChange={handleNotificationSettingsChange} />;
      case 'chatsList': {
          const userChats = chats.filter(c => Object.values(c.participants).includes(currentUser?.id || ''));
          return currentUser ? <ChatsListView chats={userChats} shifts={shifts} currentUser={currentUser} allUsers={users} onOpenChat={handleOpenChatById} /> : <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      }
      case 'chat': {
          const chatPartner = activeChat ? users.find(u => (u.id === activeChat.participants.businessId && u.id !== currentUser?.id) || (u.id === activeChat.participants.userId && u.id !== currentUser?.id)) : null;
          const shiftForChat = activeChat ? shifts.find(s => s.id === activeChat.shiftId) : null;
          return activeChat && currentUser && chatPartner && shiftForChat ? <ChatView chat={activeChat} currentUser={currentUser} chatPartner={chatPartner} shift={shiftForChat} onSendMessage={handleSendMessage} onBack={() => handleNavigate(previousView)} /> : <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      }
      default:
        return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApply} businesses={mockBusinessUsers} />;
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col font-sans">
      <Header
        currentView={view}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <PostShiftModal 
        isOpen={isPostShiftModalOpen}
        onClose={() => setIsPostShiftModalOpen(false)}
        onAddShift={handleAddShift}
      />
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onConfirm={handleConfirmApplication}
        shift={selectedShift}
        user={currentUser}
      />
       <ApplicantsModal
        isOpen={isApplicantsModalOpen}
        onClose={() => setIsApplicantsModalOpen(false)}
        shift={selectedShiftForApplicants}
        onAccept={handleAcceptApplicant}
        onMessage={(applicantId, shiftId) => handleStartOrOpenChat(applicantId, shiftId)}
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        user={selectedUserToEdit}
        onSave={handleUpdateUser}
      />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;