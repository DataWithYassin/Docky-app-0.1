import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WorkerView from './components/WorkerView';
import BusinessView from './components/BusinessView';
import PostShiftModal from './components/PostShiftModal';
import HomeView from './components/HomeView';
import InsightsView from './components/InsightsView';
import RegistrationView from './components/RegistrationView';
import JobSeekerRegistrationView from './components/JobSeekerRegistrationView';
import JobAnnouncerRegistrationView from './components/JobAnnouncerRegistrationView';
import ProfileView from './components/ProfileView';
import LoginView from './components/LoginView';
import JobSeekerView from './components/JobSeekerView';
import { Shift, Role, ShiftStatus, User, UserType } from './types';

// Mock Data for demonstration purposes
const mockBusinessUser: User = {
  id: 'user-biz-1',
  name: 'The Local Cafe',
  avatar: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
  role: Role.Host, // Placeholder
  rating: 4.9,
  reviewCount: 150,
  userType: 'Business',
  location: 'Porto, Portugal',
};

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    role: Role.Barista,
    rating: 4.8,
    reviewCount: 25,
    userType: 'JobSeeker',
    totalEarnings: 1250.75,
    appliedShifts: ['shift-3', 'shift-5'],
    location: 'Lisbon, Portugal',
    bio: "Passionate and experienced barista with 5+ years in specialty coffee. I thrive in fast-paced environments and love creating memorable customer experiences. Skilled in latte art, manual brewing methods, and POS systems. I'm a team player, always punctual, and dedicated to quality.",
    experience: [
      { id: 1, position: 'Head Barista', place: 'The Grind House', location: 'Lisbon, PT', startDate: '2022-01', endDate: 'Present' },
      { id: 2, position: 'Barista', place: 'Morning Brew Cafe', location: 'Porto, PT', startDate: '2020-06', endDate: '2021-12' },
    ],
    skills: ['Latte Art', 'Customer Service', 'Espresso Machine Calibration', 'Manual Brewing', 'POS Systems', 'Inventory Management'],
    reviews: [
      { id: 'rev-1', reviewerName: 'The Local Cafe', reviewerAvatar: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80', rating: 5, comment: 'Alice was fantastic! Punctual, professional, and a real hit with our customers. Would hire again in a heartbeat.', date: '2024-07-28' },
      { id: 'rev-2', reviewerName: 'Burger Palace', reviewerAvatar: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80', rating: 4, comment: 'Great work ethic and handled the morning rush with ease. A true professional.', date: '2024-06-15' },
    ],
  },
  { id: 'user-2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=bob', role: Role.Chef, rating: 4.9, reviewCount: 42, userType: 'JobSeeker' },
  { id: 'user-3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=charlie', role: Role.Waiter, rating: 4.6, reviewCount: 18, userType: 'JobSeeker' },
  { id: 'user-4', name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=diana', role: Role.Barista, rating: 5.0, reviewCount: 12, userType: 'JobSeeker' },
];

const mockShifts: Shift[] = [
  {
    id: 'shift-1',
    businessName: 'The Grind House',
    businessLogo: 'https://images.unsplash.com/photo-1511920183303-6235b5ba39c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.Barista,
    date: '2025-01-10',
    startTime: '08:00',
    endTime: '16:00',
    hourlyRate: 22.50,
    location: 'Lisbon, Arroios',
    status: ShiftStatus.Open,
    applicants: [],
    description: 'Seeking an experienced barista for a busy morning shift. Latte art skills are a plus!',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    languages: ['English', 'Portuguese'],
    rating: 4.7,
    requirements: ['Atividade Aberta'],
  },
  {
    id: 'shift-2',
    businessName: 'The Local Cafe',
    businessLogo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.Chef,
    date: '2025-01-11',
    startTime: '17:00',
    endTime: '23:00',
    hourlyRate: 28.00,
    location: 'Porto, Cedofeita',
    status: ShiftStatus.Filled,
    applicants: [mockUsers[1]],
    description: 'Head chef needed for our dinner service. Must be proficient with Italian cuisine.',
    postedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 28 hours ago
    requirements: ['Food Handler Cert.'],
    rating: 4.9,
  },
   {
    id: 'shift-0',
    businessName: 'Restaurant in Arrios',
    businessLogo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.Waiter,
    date: '2025-01-01',
    startTime: '18:00',
    endTime: '23:00',
    hourlyRate: 5.00,
    location: 'Lisbon, Arroios',
    status: ShiftStatus.Open,
    applicants: [],
    description: 'Waiter needed for extra shift.',
    postedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    languages: ['English', 'Portuguese'],
    rating: 4.6,
    requirements: ['Experience required', 'Atividade Aberta'],
  },
  {
    id: 'shift-3',
    businessName: 'The Local Cafe',
    businessLogo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.Waiter,
    date: '2025-01-12',
    startTime: '18:00',
    endTime: '22:00',
    hourlyRate: 18.00,
    location: 'Porto, Cedofeita',
    status: ShiftStatus.Open,
    applicants: [mockUsers[0], mockUsers[2]],
    description: 'Friendly and energetic waiter needed for our patio section. Experience with POS systems required.',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    rating: 4.9,
  },
  {
    id: 'shift-4',
    businessName: 'Burger Palace',
    businessLogo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.KitchenStaff,
    date: '2025-01-10',
    startTime: '11:00',
    endTime: '19:00',
    hourlyRate: 19.50,
    location: 'Faro, Sé',
    status: ShiftStatus.Open,
    applicants: [],
    description: 'Join our kitchen team! Responsibilities include food prep, grilling, and maintaining a clean work station.',
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    rating: 4.5
  },
  {
    id: 'shift-5',
    businessName: 'The Grind House',
    businessLogo: 'https://images.unsplash.com/photo-1511920183303-6235b5ba39c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    role: Role.Barista,
    date: '2025-01-12',
    startTime: '07:00',
    endTime: '11:00',
    hourlyRate: 23.00,
    location: 'Lisbon, Arroios',
    status: ShiftStatus.Completed,
    applicants: [mockUsers[3]],
    description: 'Morning rush barista needed.',
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    rating: 4.7,
  }
];

export type View = 'home' | 'jobs' | 'insights' | 'business' | 'register' | 'jobSeekerRegister' | 'jobAnnouncerRegister' | 'profile' | 'login' | 'jobSeekerDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (userType: UserType) => {
    if (userType === 'JobSeeker') {
      setCurrentUser(mockUsers[0]); // Log in as Alice
      setView('jobSeekerDashboard'); // Navigate to seeker dashboard
    } else {
      setCurrentUser(mockBusinessUser); // Log in as The Local Cafe
      setView('business'); // Navigate to business dashboard
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setView('home'); // Navigate home after logging out
  };


  const handleAddShift = (newShiftData: Omit<Shift, 'id' | 'businessName' | 'businessLogo' | 'applicants' | 'status' | 'postedAt' | 'rating' | 'languages' | 'requirements'>) => {
    const newShift: Shift = {
      ...newShiftData,
      id: `shift-${Date.now()}`,
      businessName: 'The Local Cafe', // Hardcoded for demo to appear in business view
      businessLogo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      applicants: [],
      status: ShiftStatus.Open,
      postedAt: new Date().toISOString(),
      rating: 4.9, // Default rating for new shifts
    };
    setShifts([newShift, ...shifts]);
  };

  const renderView = () => {
    switch (view) {
      case 'jobs':
        return <WorkerView shifts={shifts} />;
      case 'business':
        return <BusinessView shifts={shifts.filter(s => s.businessName === 'The Local Cafe')} onPostShiftClick={() => setIsModalOpen(true)} />;
      case 'insights':
        return <InsightsView />;
      case 'jobSeekerDashboard':
        if (!currentUser || currentUser.userType !== 'JobSeeker') {
          return <HomeView onNavigate={setView} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} />;
        }
        return <JobSeekerView user={currentUser} shifts={shifts} onNavigate={setView} />;
      case 'profile':
        if (!currentUser) {
          // Redirect to login if trying to access profile directly without being logged in
          return <LoginView onLogin={handleLogin} />;
        }
        return <ProfileView user={currentUser} />;
      case 'register':
        return <RegistrationView onNavigate={setView} />;
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'jobSeekerRegister':
        return <JobSeekerRegistrationView onNavigate={setView} />;
      case 'jobAnnouncerRegister':
        return <JobAnnouncerRegistrationView onNavigate={setView} />;
      case 'home':
      default:
        return <HomeView onNavigate={setView} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header 
        onNavigate={setView} 
        isLoggedIn={isLoggedIn}
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
      <PostShiftModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddShift={handleAddShift} 
      />
    </div>
  );
};

export default App;