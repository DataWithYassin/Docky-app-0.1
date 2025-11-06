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
import AvailabilityView from './components/AvailabilityView';
import PostAvailabilityModal from './components/PostAvailabilityModal';
import { User, Shift, Role, ShiftStatus, UserType, WebsiteContent, View, ApplicationStatus, Chat, Message, AvailabilityPost, Job, WeekDay } from './types';
import { LanguageProvider } from './context/LanguageContext';

const nataliaUser: User = {
    id: 'user-nat',
    name: 'Natalia Kowalska',
    email: 'natalia.k@example.com',
    avatar: 'https://i.pravatar.cc/150?u=natalia',
    role: Role.Waiter,
    rating: 4.7,
    reviewCount: 15,
    userType: 'JobSeeker',
    location: 'Lisbon, Portugal',
    bio: 'Versatile hospitality professional from Poland, eager to contribute to a great team in Lisbon.',
    skills: ['English', 'Polish', 'Basic Portuguese', 'Waitress', 'Barback'],
};

const mockJobs: Job[] = [
    {
        id: 'job-1',
        businessName: 'Gourmet Bites',
        businessLogo: 'https://i.pravatar.cc/150?u=gourmet',
        talentId: 'user-1',
        role: Role.Barista,
        startDate: '2024-09-01',
        workDays: ['Monday', 'Wednesday', 'Friday'],
        scheduleDetails: 'Morning shifts, 8am to 2pm.',
        hourlyRate: 16.00,
        location: 'Porto, Portugal',
        description: 'Permanent part-time barista position. We are looking for a reliable team member for our morning crew.',
        postedAt: '2024-07-30T10:00:00Z',
    },
    {
        id: 'job-2',
        businessName: 'The Local Cafe',
        businessLogo: 'https://i.pravatar.cc/150?u=cafe',
        role: Role.Waiter,
        startDate: '2024-09-15',
        workDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
        scheduleDetails: 'Weekend availability is a must. Shifts are typically 6-8 hours.',
        hourlyRate: 14.50,
        location: 'Lisbon, Portugal',
        description: 'Seeking an enthusiastic waiter for a permanent part-time role. Great tips and a friendly team environment.',
        postedAt: '2024-08-01T12:00:00Z',
        applicants: [nataliaUser],
    }
];

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
    jobs: [mockJobs[0]],
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
  },
  nataliaUser,
];

const mockBusinessUsers: User[] = [
    { id: 'biz-1', name: 'The Local Cafe', email: 'contact@localcafe.com', avatar: 'https://i.pravatar.cc/150?u=cafe', role: Role.Host, rating: 4.5, reviewCount: 120, userType: 'Business', location: 'Lisbon, Portugal' },
    { id: 'biz-2', name: 'Gourmet Bites', email: 'info@gourmetbites.com', avatar: 'https://i.pravatar.cc/150?u=gourmet', role: Role.Host, rating: 4.7, reviewCount: 88, userType: 'Business', location: 'Porto, Portugal' },
    { id: 'biz-3', name: 'Sunset Grill', email: 'manager@sunsetgrill.com', avatar: 'https://i.pravatar.cc/150?u=sunset', role: Role.Host, rating: 4.2, reviewCount: 45, userType: 'Business', location: 'Faro, Portugal' },
    { id: 'biz-4', name: 'Ocean View Restaurant', email: 'bookings@oceanview.com', avatar: 'https://i.pravatar.cc/150?u=ocean', role: Role.Host, rating: 4.9, reviewCount: 150, userType: 'Business', location: 'Cascais, Portugal' },
    { id: 'biz-5', name: 'The Artisan Bakery', email: 'hello@artisanbakery.com', avatar: 'https://i.pravatar.cc/150?u=bakery', role: Role.Host, rating: 4.6, reviewCount: 72, userType: 'Business', location: 'Sintra, Portugal' },
];

const allMockUsers = [...mockUsers, ...mockBusinessUsers];

const mockShifts: Shift[] = [
  {
    id: 'shift-1',
    businessName: 'The Local Cafe',
    businessLogo: 'https://i.pravatar.cc/150?u=cafe',
    role: Role.Barista,
    date: '2024-08-20',
    startTime: '08:00',
    endTime: '16:00',
    hourlyRate: 15.00,
    location: 'Lisbon, Portugal',
    status: ShiftStatus.Filled,
    applicants: [mockUsers[0]],
    acceptedApplicantId: 'user-1',
    description: 'Seeking an experienced barista for a full-day shift. Must be proficient with latte art and various brewing methods.',
    postedAt: '2024-07-25T09:00:00Z',
    rating: 4.5,
    requirements: ['Food Safety Certificate'],
    languages: ['Portuguese', 'English'],
    allowPreApplyMessaging: true,
  },
   {
    id: 'shift-2',
    businessName: 'Gourmet Bites',
    businessLogo: 'https://i.pravatar.cc/150?u=gourmet',
    role: Role.Waiter,
    date: '2024-08-21',
    startTime: '18:00',
    endTime: '23:00',
    hourlyRate: 12.50,
    location: 'Porto, Portugal',
    status: ShiftStatus.Open,
    applicants: [mockUsers[0], mockUsers[1]],
    description: 'Evening waiter needed for a busy dinner service. Experience in fine dining is a plus.',
    postedAt: '2024-07-28T11:30:00Z',
    rating: 4.7,
    allowPreApplyMessaging: false,
  },
  {
    id: 'shift-3',
    businessName: 'Sunset Grill',
    businessLogo: 'https://i.pravatar.cc/150?u=sunset',
    role: Role.Chef,
    date: '2024-08-22',
    startTime: '10:00',
    endTime: '18:00',
    hourlyRate: 18.00,
    location: 'Faro, Portugal',
    status: ShiftStatus.Open,
    applicants: [mockUsers[1]],
    description: 'Chef needed for a daytime shift focusing on prep and lunch service. Must have experience with grill and seafood.',
    postedAt: '2024-07-29T14:00:00Z',
    rating: 4.2,
    requirements: ['Valid Food Safety Certificate'],
    allowPreApplyMessaging: true,
  },
   {
    id: 'shift-4',
    businessName: 'The Local Cafe',
    businessLogo: 'https://i.pravatar.cc/150?u=cafe',
    role: Role.KitchenStaff,
    date: '2024-08-22',
    startTime: '09:00',
    endTime: '13:00',
    hourlyRate: 11.00,
    location: 'Lisbon, Portugal',
    status: ShiftStatus.Completed,
    applicants: [],
    description: 'Kitchen help needed for morning prep, including chopping vegetables and washing dishes.',
    postedAt: '2024-07-21T10:00:00Z',
    rating: 4.5,
  },
  {
    id: 'shift-5',
    businessName: 'Ocean View Restaurant',
    businessLogo: 'https://i.pravatar.cc/150?u=ocean',
    role: Role.Host,
    date: '2024-08-25',
    startTime: '19:00',
    endTime: '23:00',
    hourlyRate: 14.00,
    location: 'Cascais, Portugal',
    status: ShiftStatus.Open,
    applicants: [mockUsers[0]],
    description: 'Looking for a charismatic host to manage reservations and greet guests on a busy weekend night.',
    postedAt: '2024-07-29T18:00:00Z',
    rating: 4.9,
    languages: ['English'],
    allowPreApplyMessaging: true,
  },
];

const mockChats: Chat[] = [
    {
        id: 'chat-1',
        shiftId: 'shift-1',
        participants: { userId: 'user-1', businessId: 'biz-1' },
        messages: [
            { id: 'msg-1', senderId: 'biz-1', text: 'Hi Alice, we were very impressed with your profile. Are you available for a quick chat tomorrow?', timestamp: '2024-07-25T10:00:00Z' },
            { id: 'msg-2', senderId: 'user-1', text: 'Hi! Yes, absolutely. How about 10 AM?', timestamp: '2024-07-25T10:05:00Z' },
        ]
    },
     {
        id: 'chat-2',
        shiftId: 'shift-2',
        participants: { userId: 'user-4', businessId: 'biz-2' },
        messages: [
             { id: 'msg-3', senderId: 'user-4', text: 'Hello, I saw your opening for a waiter. I have 5 years of experience and would love to be considered.', timestamp: '2024-07-28T12:00:00Z' },
        ]
    }
];

const initialWebsiteContent: WebsiteContent = {
  hero: {
    title: "Your Extra Shift, Made Easy.",
    subtitle: "Docky connects talented hospitality professionals with businesses for on-demand shifts. Find work that fits your schedule, or hire the staff you need, right when you need them."
  },
  valueProps: {
    jobSeeker: {
      title: "For Job Seekers",
      subtitle: "Take control of your work life.",
      description: "",
      benefits: [
        "Flexible hours, better pay.",
        "Work at top-rated local businesses.",
        "Get paid quickly and reliably."
      ]
    },
    business: {
      title: "For Businesses",
      subtitle: "Fill shifts in minutes, not days.",
      description: "",
      benefits: [
        "Access a pool of vetted professionals.",
        "Post a shift in seconds.",
        "Manage everything in one simple dashboard."
      ]
    }
  },
  appDownload: {
    title: "Get the full experience on our app",
    subtitle: "Manage your shifts, get instant notifications, and connect on the go. Download the Docky app today for the best experience."
  }
};

const mockAvailabilityPosts: AvailabilityPost[] = [
  {
    id: 'ap-1',
    userId: 'user-nat',
    postedAt: '2024-07-28T10:00:00Z',
    lookingFor: ['Single Shifts', 'Part-time Job'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availableTimes: ['Morning', 'Afternoon', 'Evening'],
    roles: [Role.Waiter, Role.Barista, Role.KitchenStaff],
    experienceSummary: 'Experience working in the kitchen, as a waitress, barback, and a bit as a bartender.',
    languages: ['English (Fluent)', 'Polish (Native)', 'Portuguese (Basic)'],
    notes: 'Available to start immediately (this week at the latest). Eager to contribute to a great team in Lisbon!',
  },
  {
    id: 'ap-2',
    userId: 'user-4',
    postedAt: '2024-07-27T14:30:00Z',
    lookingFor: ['Part-time Job'],
    availableDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    availableTimes: ['Evening', 'Night'],
    roles: [Role.Chef, Role.KitchenStaff],
    experienceSummary: 'Specializing in Mediterranean cuisine with over 10 years in the industry. Reliable, creative, and work well under pressure.',
    languages: ['Spanish (Native)', 'English (Conversational)'],
    notes: 'Looking for part-time evening shifts in Porto.'
  }
];


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(allMockUsers);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [availabilityPosts, setAvailabilityPosts] = useState<AvailabilityPost[]>(mockAvailabilityPosts);

  const [isPostShiftModalOpen, setIsPostShiftModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isPostAvailabilityModalOpen, setIsPostAvailabilityModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);

  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [hiringTalent, setHiringTalent] = useState<User | null>(null);

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnProfileUpdate: true,
    emailOnApplicationStatusChange: true,
  });
  
  const handleLogin = (userType: UserType) => {
    setIsLoggedIn(true);
    if (userType === 'Business') {
      setCurrentUser(mockBusinessUsers[0]);
      setCurrentView('business');
    } else {
      setCurrentUser(mockUsers[0]);
      setCurrentView('jobSeekerDashboard');
    }
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser(mockUsers.find(u => u.email === 'admin@docky.com') || null);
    setCurrentView('adminDashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  const handleAddShift = (newShiftData: Omit<Shift, 'id' | 'businessName' | 'businessLogo' | 'applicants' | 'status' | 'postedAt'>) => {
    if (currentUser && currentUser.userType === 'Business') {
      if (hiringTalent) {
        // Direct hire flow
        const newShift: Shift = {
          ...newShiftData,
          id: `shift-${Date.now()}`,
          businessName: currentUser.name,
          businessLogo: currentUser.avatar,
          applicants: [hiringTalent],
          status: ShiftStatus.Filled,
          acceptedApplicantId: hiringTalent.id,
          postedAt: new Date().toISOString(),
        };
        setShifts(prev => [newShift, ...prev]);

        // Update the hired user's applications
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === hiringTalent.id) {
                const newApplication = { shiftId: newShift.id, status: ApplicationStatus.Accepted };
                return {
                    ...user,
                    applications: [...(user.applications || []), newApplication]
                };
            }
            return user;
        }));
      } else {
        // Normal post shift flow
        const newShift: Shift = {
          ...newShiftData,
          id: `shift-${Date.now()}`,
          businessName: currentUser.name,
          businessLogo: currentUser.avatar,
          applicants: [],
          status: ShiftStatus.Open,
          postedAt: new Date().toISOString(),
        };
        setShifts(prev => [newShift, ...prev]);
      }
    }
  };
  
  const handleAddJob = (jobData: Omit<Job, 'id' | 'businessName' | 'businessLogo' | 'talentId' | 'postedAt' | 'applicants'>) => {
    if (currentUser && currentUser.userType === 'Business') {
        if (hiringTalent) {
            const newJob: Job = {
                ...jobData,
                id: `job-${Date.now()}`,
                businessName: currentUser.name,
                businessLogo: currentUser.avatar,
                talentId: hiringTalent.id,
                postedAt: new Date().toISOString(),
            };
            setJobs(prev => [newJob, ...prev]);
    
            setUsers(prevUsers => prevUsers.map(user => {
                if (user.id === hiringTalent.id) {
                    return {
                        ...user,
                        jobs: [...(user.jobs || []), newJob]
                    };
                }
                return user;
            }));
        } else {
            // Public job post
            const newJob: Job = {
                ...jobData,
                id: `job-${Date.now()}`,
                businessName: currentUser.name,
                businessLogo: currentUser.avatar,
                postedAt: new Date().toISOString(),
                applicants: []
            };
            setJobs(prev => [newJob, ...prev]);
        }
    }
  };

  const handleApplyForShift = (shiftId: string) => {
    if (!isLoggedIn) {
      setCurrentView('login');
      return;
    }
    setSelectedShiftId(shiftId);
    setIsApplicationModalOpen(true);
  };

  const handleApplyForJob = (jobId: string) => {
    if (!isLoggedIn || !currentUser || currentUser.userType !== 'JobSeeker') {
      setCurrentView('login');
      return;
    }
    
    // Check if already applied
    if (currentUser.applications?.some(app => app.jobId === jobId)) {
        console.log("Already applied for this job");
        return;
    }

    // Update user's applications
    const updatedUser = {
      ...currentUser,
      applications: [...(currentUser.applications || []), { jobId: jobId, status: ApplicationStatus.Pending }]
    };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    
    // Update job's applicants
    const updatedJobs = jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, applicants: [...(j.applicants || []), currentUser] };
      }
      return j;
    });
    setJobs(updatedJobs);
  };
  
  const handleConfirmApplication = (message: string) => {
    if (currentUser && selectedShiftId) {
      const updatedUser = {
        ...currentUser,
        applications: [...(currentUser.applications || []), { shiftId: selectedShiftId, status: ApplicationStatus.Pending }]
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      
      const updatedShifts = shifts.map(s => {
        if (s.id === selectedShiftId) {
          return { ...s, applicants: [...s.applicants, currentUser] };
        }
        return s;
      });
      setShifts(updatedShifts);
      
      console.log(`Applied for shift ${selectedShiftId} with message: "${message}"`);
    }
    setIsApplicationModalOpen(false);
    setSelectedShiftId(null);
  };

  const handleConfirmShift = (shiftId: string) => {
    if (!currentUser) return;
    const updatedApplications = currentUser.applications?.map(app => 
      app.shiftId === shiftId ? { ...app, status: ApplicationStatus.Confirmed } : app
    );
    const updatedUser = { ...currentUser, applications: updatedApplications };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const handleOpenApplicants = (shiftId: string) => {
    setSelectedShiftId(shiftId);
    setIsApplicantsModalOpen(true);
  };

  const handleAcceptApplicant = (shiftId: string, applicantId: string) => {
    setShifts(prevShifts => prevShifts.map(shift => {
      if (shift.id === shiftId) {
        return { ...shift, status: ShiftStatus.Filled, acceptedApplicantId: applicantId };
      }
      return shift;
    }));
    
    setUsers(prevUsers => prevUsers.map(user => {
        if (user.id === applicantId && user.applications) {
            const newApplications = user.applications.map(app => 
                app.shiftId === shiftId ? { ...app, status: ApplicationStatus.Accepted } : app
            );
            return { ...user, applications: newApplications };
        }
        return user;
    }));
    setIsApplicantsModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setSelectedUserId(user.id);
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    setIsEditUserModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };
  
  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter(s => s.id !== shiftId));
  };
  
  const handleOpenChat = (shiftId: string, applicantId?: string) => {
      if (!currentUser) return;
      
      const businessId = currentUser.userType === 'Business' ? currentUser.id : shifts.find(s=>s.id === shiftId)?.businessName || '';
      const userId = currentUser.userType === 'JobSeeker' ? currentUser.id : applicantId || '';

      const business = mockBusinessUsers.find(b => b.name === businessId)
      
      if (!userId || !business) return;

      let existingChat = chats.find(c => 
          c.shiftId === shiftId &&
          c.participants.userId === userId &&
          c.participants.businessId === business.id
      );
      
      if (existingChat) {
          setActiveChatId(existingChat.id);
      } else {
          const newChat: Chat = {
              id: `chat-${Date.now()}`,
              shiftId,
              participants: { userId, businessId: business.id },
              messages: [],
          };
          setChats(prev => [...prev, newChat]);
          setActiveChatId(newChat.id);
      }
      setCurrentView('chat');
  };

  const handleSendMessage = (chatId: string, text: string) => {
      if (!currentUser) return;
      const newMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          text,
          timestamp: new Date().toISOString()
      };
      setChats(prev => prev.map(chat => 
          chat.id === chatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat
      ));
  };

  const handlePostAvailability = (data: Omit<AvailabilityPost, 'id' | 'userId' | 'postedAt'>) => {
    if (!currentUser || currentUser.userType !== 'JobSeeker') return;
    const newPost: AvailabilityPost = {
      ...data,
      id: `ap-${Date.now()}`,
      userId: currentUser.id,
      postedAt: new Date().toISOString(),
    };
    setAvailabilityPosts(prev => [newPost, ...prev]);
  };
  
  const handleStartDirectChat = (partnerId: string) => {
    if (!currentUser) return;
    const businessId = currentUser.id;
    const userId = partnerId;

    const directChatKey = [userId, businessId].sort().join('-');
    const newChatId = `chat-direct-${directChatKey}`;

    let existingChat = chats.find(chat => chat.id === newChatId);

    if (existingChat) {
        setActiveChatId(existingChat.id);
        setCurrentView('chat');
    } else {
        const newChat: Chat = {
            id: newChatId,
            shiftId: `direct-${Date.now()}`,
            participants: { userId, businessId },
            messages: [],
        };
        setChats(prev => [...prev, newChat]);
        setActiveChatId(newChat.id);
        setCurrentView('chat');
    }
  };
  
  const handleHireTalent = (userId: string) => {
    const talent = users.find(u => u.id === userId);
    if (talent) {
      setHiringTalent(talent);
      setIsPostShiftModalOpen(true);
    }
  };

  const handleHireUnauthenticated = () => {
    setCurrentView('jobAnnouncerRegister');
  };

  const selectedShift = shifts.find(s => s.id === selectedShiftId);
  const selectedUser = users.find(u => u.id === selectedUserId);
  const activeChat = chats.find(c => c.id === activeChatId);
  
  const viewRenderer = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApplyForShift} businesses={mockBusinessUsers} />;
      case 'jobs':
        return <WorkerView shifts={shifts} jobs={jobs} onApply={handleApplyForShift} onApplyForJob={handleApplyForJob} isLoggedIn={isLoggedIn} user={currentUser} />;
      case 'availability':
        return <AvailabilityView 
                  availabilityPosts={availabilityPosts}
                  allUsers={users}
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  onPostAvailabilityClick={() => setIsPostAvailabilityModalOpen(true)}
                  onContactTalent={handleStartDirectChat}
                  onHireTalent={handleHireTalent}
                  onHireUnauthenticated={handleHireUnauthenticated}
                />;
      case 'insights':
        return <InsightsView shifts={shifts} users={users} />;
      case 'login':
        return <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      case 'register':
        return <RegistrationView onNavigate={handleNavigate} />;
      case 'jobSeekerRegister':
        return <JobSeekerRegistrationView onNavigate={handleNavigate} onRegister={(data) => console.log(data)} />;
      case 'jobAnnouncerRegister':
        return <JobAnnouncerRegistrationView onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'profile':
        return currentUser ? <ProfileView user={currentUser} /> : <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
      case 'business':
         return currentUser ? <BusinessView shifts={shifts.filter(s => s.businessName === currentUser.name)} chats={chats.filter(c=>c.participants.businessId === currentUser.id)} allUsers={users} currentUser={currentUser} onPostShiftClick={() => setIsPostShiftModalOpen(true)} onShiftClick={handleOpenApplicants} onOpenChat={(chatId) => { setActiveChatId(chatId); setCurrentView('chat'); }} /> : null;
      case 'jobSeekerDashboard':
        return currentUser ? <JobSeekerView user={currentUser} shifts={shifts} jobs={jobs} onNavigate={handleNavigate} onApply={handleApplyForShift} isLoggedIn={isLoggedIn} onConfirmShift={handleConfirmShift} onOpenChat={(shiftId) => handleOpenChat(shiftId)} /> : null;
      case 'adminDashboard':
        return currentUser && currentUser.email === 'admin@docky.com' ? (
          <AdminDashboardView 
            users={users} 
            shifts={shifts}
            websiteContent={websiteContent}
            notificationSettings={notificationSettings}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onDeleteShift={handleDeleteShift}
            onEditUser={handleEditUser}
            onContentChange={setWebsiteContent}
            onNotificationSettingsChange={setNotificationSettings}
          />
        ) : <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApplyForShift} businesses={mockBusinessUsers} />;
      case 'chat':
          if (activeChat && currentUser) {
              const chatPartnerId = activeChat.participants.userId === currentUser.id ? activeChat.participants.businessId : activeChat.participants.userId;
              const chatPartner = users.find(u => u.id === chatPartnerId);
              let shiftForChat;

              if (activeChat.shiftId.startsWith('direct-')) {
                  // For direct chats, we don't have a real shift. Create a placeholder.
                  shiftForChat = { 
                      id: activeChat.shiftId, 
                      role: 'Direct Message', 
                      businessName: chatPartner?.name || '', 
                      date: '', startTime: '', endTime: '',
                      // Add other required Shift properties with placeholder values
                      businessLogo: '', hourlyRate: 0, location: '', status: ShiftStatus.Open, applicants: [], postedAt: '', description: ''
                  };
              } else {
                  shiftForChat = shifts.find(s => s.id === activeChat.shiftId);
              }
              
              if (chatPartner && shiftForChat) {
                   return <ChatView chat={activeChat} currentUser={currentUser} chatPartner={chatPartner} shift={shiftForChat} onSendMessage={handleSendMessage} onBack={() => { setActiveChatId(null); setCurrentView(currentUser.userType === 'Business' ? 'business' : 'chatsList')}} />;
              }
          }
          return <p>Chat not found.</p>;
       case 'chatsList':
           return currentUser ? <ChatsListView chats={chats.filter(c => c.participants.businessId === currentUser.id || c.participants.userId === currentUser.id)} shifts={shifts} currentUser={currentUser} allUsers={users} onOpenChat={(chatId) => { setActiveChatId(chatId); setCurrentView('chat'); }}/> : null;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header currentView={currentView} onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={currentUser} onLogout={handleLogout} />
        <main className="flex-grow">
          {viewRenderer()}
        </main>
        <Footer onNavigate={handleNavigate} />
        <PostShiftModal
          isOpen={isPostShiftModalOpen}
          onClose={() => {
            setIsPostShiftModalOpen(false);
            setHiringTalent(null);
          }}
          onAddShift={handleAddShift}
          onAddJob={handleAddJob}
          hiringTalent={hiringTalent}
        />
        <ApplicationModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} shift={selectedShift || null} user={currentUser} onConfirm={handleConfirmApplication} />
        <PostAvailabilityModal isOpen={isPostAvailabilityModalOpen} onClose={() => setIsPostAvailabilityModalOpen(false)} onPost={handlePostAvailability} />
        <EditUserModal isOpen={isEditUserModalOpen} onClose={() => setIsEditUserModalOpen(false)} user={selectedUser || null} onSave={handleUpdateUser} />
        <ApplicantsModal isOpen={isApplicantsModalOpen} onClose={() => setIsApplicantsModalOpen(false)} shift={selectedShift || null} onAccept={handleAcceptApplicant} onMessage={(applicantId, shiftId) => handleOpenChat(shiftId, applicantId)} />
      </div>
    </LanguageProvider>
  );
};

export default App;