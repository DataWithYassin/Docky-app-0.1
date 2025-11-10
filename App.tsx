import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import WorkerView from './components/WorkerView';
import AvailabilityView from './components/AvailabilityView';
import InsightsView from './components/InsightsView';
import LoginView from './components/LoginView';
import RegistrationView from './components/RegistrationView';
import JobSeekerRegistrationView from './components/JobSeekerRegistrationView';
import JobAnnouncerRegistrationView from './components/JobAnnouncerRegistrationView';
import AdminDashboardView from './components/AdminDashboardView';
import ProfileView from './components/ProfileView';
import JobSeekerView from './components/JobSeekerView';
import BusinessView from './components/BusinessView';
import ChatsListView from './components/ChatsListView';
import ChatView from './components/ChatView';
import PostShiftModal from './components/PostShiftModal';
import ApplicationModal from './components/ApplicationModal';
import ApplicantsModal from './components/ApplicantsModal';
import PostAvailabilityModal from './components/PostAvailabilityModal';
import { View, User, Shift, Role, ShiftStatus, UserType, Job, ApplicationStatus, Notification, NotificationType, SavedSearch, SavedSearchFilters, WebsiteContent, AvailabilityPost, Review, RoleDetail } from './types';
import EditUserModal from './components/EditUserModal';

const initialRoleDetails: RoleDetail[] = [
  { name: 'Chef', emoji: '👨‍🍳', classes: 'bg-orange-100 text-orange-800' },
  { name: 'Barista', emoji: '☕️', classes: 'bg-amber-100 text-amber-800' },
  { name: 'Waiter', emoji: '🤵', classes: 'bg-indigo-100 text-indigo-800' },
  { name: 'Host', emoji: '👋', classes: 'bg-rose-100 text-rose-800' },
  { name: 'Kitchen Staff', emoji: '🔪', classes: 'bg-slate-200 text-slate-800' },
];

// --- MOCK DATA ---
const mockReviews: Review[] = [
    { id: 'review-1', reviewerName: 'The Local Cafe', reviewerAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, comment: 'Alice is a fantastic barista, very professional and friendly. Highly recommended!', date: '2024-07-15' },
    { id: 'review-2', reviewerName: 'Gourmet Burger', reviewerAvatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 4, comment: 'Good team player, but was a bit late on one of the days.', date: '2024-06-20' },
    { id: 'review-3', reviewerName: 'Alice Johnson', reviewerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg', rating: 5, comment: 'Great place to work, very organized and friendly staff.', date: '2024-07-16' },
];

const mockUsers: User[] = [
    {
        id: 'user-1', name: 'Alice Johnson', email: 'alice.j@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', userType: 'JobSeeker', role: 'Barista', location: 'Lisbon, Portugal', rating: 4.8, reviewCount: 12, bio: 'Experienced barista with over 5 years in specialty coffee shops. I am passionate about crafting the perfect cup and providing excellent customer service. I am quick, clean, and work well under pressure. Looking for morning or afternoon shifts.', skills: ['Latte Art', 'Espresso Machine Calibration', 'Customer Service', 'POS Systems', 'Inventory Management'], experience: [{ id: 1, position: 'Head Barista', place: 'Coffee Beans Collective', location: 'Lisbon', startDate: '2020', endDate: '2023' }],
        applications: [
            { shiftId: 'shift-1', status: ApplicationStatus.Pending },
            { shiftId: 'shift-2', status: ApplicationStatus.Accepted },
            { jobId: 'job-1', status: ApplicationStatus.Rejected },
            { shiftId: 'shift-completed-1', status: ApplicationStatus.Confirmed },
        ],
        totalEarnings: 1250.75,
        reviews: [mockReviews[0], mockReviews[1]],
        status: 'Verified',
        createdAt: '2024-07-01T10:00:00Z',
    },
    {
        id: 'user-2', name: 'Bob Williams', email: 'bob.w@example.com', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', userType: 'JobSeeker', role: 'Chef', location: 'Porto, Portugal', rating: 4.9, reviewCount: 8, bio: 'Classically trained chef with a focus on Mediterranean cuisine. I thrive in fast-paced kitchen environments and have experience in menu development and team leadership.', skills: ['Fine Dining', 'Menu Costing', 'Sous Vide', 'Pastry', 'Grilling'],
        applications: [
            { shiftId: 'shift-3', status: ApplicationStatus.Pending },
        ],
        totalEarnings: 3200.00,
        status: 'Active',
        createdAt: '2024-07-05T11:00:00Z',
    },
    {
        id: 'business-1', name: 'The Local Cafe', email: 'contact@localcafe.com', avatar: 'https://i.pravatar.cc/150?u=business-1', userType: 'Business', role: 'Barista', location: 'Lisbon, Portugal', rating: 4.5, reviewCount: 25,
        reviews: [mockReviews[2]],
        status: 'Verified',
        createdAt: '2024-06-15T09:00:00Z',
    },
    {
        id: 'business-2', name: 'Gourmet Burger', email: 'hr@gourmetburger.com', avatar: 'https://i.pravatar.cc/150?u=business-2', userType: 'Business', role: 'Chef', location: 'Porto, Portugal', rating: 4.2, reviewCount: 18,
        status: 'Active',
        createdAt: '2024-06-20T14:30:00Z',
    },
    {
        id: 'business-3', name: 'Seaside Grill', email: 'contact@seasidegrill.com', avatar: 'https://i.pravatar.cc/150?u=business-3', userType: 'Business', role: 'Waiter', location: 'Faro, Portugal', rating: 4.7, reviewCount: 32,
        status: 'Active',
        createdAt: '2024-07-10T18:00:00Z',
    },
    {
        id: 'business-4', name: 'Urban Eats', email: 'hello@urbaneats.com', avatar: 'https://i.pravatar.cc/150?u=business-4', userType: 'Business', role: 'Host', location: 'Madrid, Spain', rating: 4.4, reviewCount: 15,
        status: 'Suspended',
        createdAt: '2024-07-22T12:00:00Z',
    },
    {
        id: 'admin-1', name: 'Admin User', email: 'admin@docky.com', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', userType: 'Admin', role: 'Host', rating: 5, reviewCount: 0,
        status: 'Active',
        createdAt: '2024-01-01T00:00:00Z',
    }
];

const mockShifts: Shift[] = [
    { id: 'shift-1', businessId: 'business-1', businessName: 'The Local Cafe', businessLogo: mockUsers[2].avatar, role: 'Barista', date: '2024-08-20', startTime: '08:00', endTime: '16:00', hourlyRate: 12.50, location: 'Lisbon, Portugal', description: 'Busy morning shift. Experience with latte art is a plus.', applicants: [mockUsers[0]], status: ShiftStatus.Open, postedAt: '2024-07-28T10:00:00Z', coordinates: { lat: 38.7223, lon: -9.1393 } },
    { id: 'shift-2', businessId: 'business-1', businessName: 'The Local Cafe', businessLogo: mockUsers[2].avatar, role: 'Waiter', date: '2024-08-22', startTime: '18:00', endTime: '23:00', hourlyRate: 11.00, location: 'Lisbon, Portugal', description: 'Evening shift for our terrace seating.', applicants: [mockUsers[0]], status: ShiftStatus.Filled, postedAt: '2024-07-27T14:00:00Z', coordinates: { lat: 38.7223, lon: -9.1393 }, filledAt: '2024-07-28T18:00:00Z' },
    { id: 'shift-3', businessId: 'business-2', businessName: 'Gourmet Burger', businessLogo: mockUsers[3].avatar, role: 'Chef', date: '2024-08-21', startTime: '17:00', endTime: '01:00', hourlyRate: 18.00, location: 'Porto, Portugal', description: 'Lead the grill station during our busiest evening hours.', applicants: [mockUsers[1]], status: ShiftStatus.Open, postedAt: '2024-07-28T11:00:00Z', coordinates: { lat: 41.1579, lon: -8.6291 } },
    { id: 'shift-completed-1', businessId: 'business-1', businessName: 'The Local Cafe', businessLogo: mockUsers[2].avatar, role: 'Barista', date: '2024-07-15', startTime: '08:00', endTime: '16:00', hourlyRate: 12.50, location: 'Lisbon, Portugal', description: 'Completed shift', applicants: [mockUsers[0]], status: ShiftStatus.Completed, postedAt: '2024-07-10T10:00:00Z', filledAt: '2024-07-11T10:00:00Z', coordinates: { lat: 38.7223, lon: -9.1393 } },
];

const mockJobs: Job[] = [
    { id: 'job-1', businessId: 'business-2', businessName: 'Gourmet Burger', businessLogo: mockUsers[3].avatar, role: 'Kitchen Staff', startDate: '2024-09-01', workDays: ['Monday', 'Wednesday', 'Friday'], scheduleDetails: 'Evenings, 6pm - 11pm', hourlyRate: 10.50, location: 'Porto, Portugal', description: 'Part-time kitchen helper needed for prep and cleaning.', postedAt: '2024-07-25T09:00:00Z', applicants: [mockUsers[0]], coordinates: { lat: 41.1579, lon: -8.6291 } },
];

const mockNotifications: Notification[] = [
    { id: 'notif-1', type: NotificationType.APPLICATION_ACCEPTED, message: 'Your application for the Barista shift at The Local Cafe has been accepted!', timestamp: new Date().toISOString(), isRead: false, relatedShiftId: 'shift-2' },
    { id: 'notif-2', type: NotificationType.NEW_MESSAGE, message: 'The Local Cafe sent you a new message regarding your application.', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: false },
    { id: 'notif-3', type: NotificationType.NEW_APPLICANT, message: 'You have a new applicant, Alice Johnson, for your Barista shift.', timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: true },
];

const mockChats = [
    { id: 'chat-1', participants: { userId: 'user-1', businessId: 'business-1' }, shiftId: 'shift-2', messages: [{ id: 'msg-1', senderId: 'business-1', text: 'Hi Alice, we were impressed with your profile. Are you available for a quick chat tomorrow?', timestamp: new Date(Date.now() - 3700000).toISOString() }] }
];

const mockSavedSearches: SavedSearch[] = [
    { id: 'search-1', name: 'Morning Barista Shifts', filters: { postType: 'Single Shifts', roles: ['Barista'], cities: ['Lisbon'], time: 'Morning', date: 'All', userLocation: null, searchRadius: 10 }, notificationsEnabled: true }
];

const mockAvailabilityPosts: AvailabilityPost[] = [
    { id: 'avail-1', userId: 'user-2', postedAt: new Date().toISOString(), lookingFor: ['Single Shifts', 'Part-time Job'], availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], availableTimes: ['Morning (6am-12pm)', 'Afternoon (12pm-6pm)'], roles: ['Chef', 'Kitchen Staff'], experienceSummary: '10+ years as a professional chef in high-end restaurants.', languages: ['English', 'Portuguese'], notes: 'Available for immediate start.' }
];

const mockWebsiteContent: WebsiteContent = {
    hero: { title: "Your Extra Shift, Made Easy.", subtitle: "Docky connects talented hospitality professionals with businesses for on-demand shifts. Find work that fits your schedule, or hire the staff you need, right when you need them." },
    valueProps: {
        jobSeeker: { title: "For Job Seekers", subtitle: "Take control of your work life.", benefits: ["Flexible hours, better pay.", "Work at top-rated local businesses.", "Get paid quickly and reliably."] },
        business: { title: "For Businesses", subtitle: "Fill shifts in minutes, not days.", benefits: ["Access a pool of vetted professionals.", "Post a shift in seconds.", "Manage everything in one simple dashboard."] }
    },
    appDownload: { title: "Get the full experience on our app", subtitle: "Manage your shifts, get instant notifications, and connect on the go. Download the Docky app today for the best experience." }
};

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [profileToShow, setProfileToShow] = useState<User | null>(null);
    
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [shifts, setShifts] = useState<Shift[]>(mockShifts);
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [chats, setChats] = useState(mockChats);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [savedSearches, setSavedSearches] = useState(mockSavedSearches);
    const [availabilityPosts, setAvailabilityPosts] = useState(mockAvailabilityPosts);
    const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(mockWebsiteContent);
    const [appliedFilters, setAppliedFilters] = useState<SavedSearchFilters | null>(null);
    const [roleDetails, setRoleDetails] = useState<RoleDetail[]>(initialRoleDetails);

    // Modal States
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [shiftToApply, setShiftToApply] = useState<Shift | null>(null);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
    const [shiftToViewApplicants, setShiftToViewApplicants] = useState<Shift | null>(null);
    const [isPostShiftModalOpen, setIsPostShiftModalOpen] = useState(false);
    const [isPostAvailabilityModalOpen, setIsPostAvailabilityModalOpen] = useState(false);
    const [hiringTalent, setHiringTalent] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const platformStats = {
      jobSeekers: users.filter(u => u.userType === 'JobSeeker').length,
      businesses: users.filter(u => u.userType === 'Business').length,
      completedShifts: shifts.filter(s => s.status === ShiftStatus.Completed).length,
      cities: new Set([...shifts.map(s => s.location.split(',')[0]), ...jobs.map(j => j.location.split(',')[0])]).size
    };

    const handleNavigate = (view: View, data?: any) => {
        if (view === 'profile' && data?.userId) {
          const userToShow = users.find(u => u.id === data.userId);
          setProfileToShow(userToShow || null);
        } else if (view === 'profile' && isLoggedIn) {
          setProfileToShow(currentUser);
        } else {
          setProfileToShow(null);
        }
        
        if (view === 'chat' && data?.chatId) {
            setActiveChatId(data.chatId);
        }

        setCurrentView(view);
        window.scrollTo(0, 0);
    };
    
    const handleApplySavedSearch = (filters: SavedSearchFilters) => {
        setAppliedFilters(filters);
        handleNavigate('jobs');
    };

    const handleLogin = (userType: UserType) => {
        const userToLogin = users.find(u => u.userType === userType);
        if (userToLogin) {
            setCurrentUser(userToLogin);
            setIsLoggedIn(true);
            handleNavigate(userType === 'JobSeeker' ? 'jobSeekerDashboard' : 'business');
        }
    };
    
    const handleAdminLogin = () => {
        const adminUser = users.find(u => u.email === 'admin@docky.com');
        if (adminUser) {
            setCurrentUser(adminUser);
            setIsLoggedIn(true);
            handleNavigate('adminDashboard');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        handleNavigate('home');
    };

    const handleApply = (shiftId: string) => {
        if (!isLoggedIn || currentUser?.userType !== 'JobSeeker') {
            handleNavigate('login');
            return;
        }
        const shift = shifts.find(s => s.id === shiftId);
        if (shift) {
            setShiftToApply(shift);
            setIsApplicationModalOpen(true);
        }
    };

    const handleConfirmApplication = (message: string) => {
        if (currentUser && shiftToApply) {
          // Logic to add application to user and applicant to shift
          console.log(`Applying to shift ${shiftToApply.id} with message: ${message}`);
        }
        setIsApplicationModalOpen(false);
        setShiftToApply(null);
    };
    
    const handleApplyForJob = (jobId: string) => {
        if (!isLoggedIn) {
            handleNavigate('login');
            return;
        }
        alert(`Applying for job ${jobId}`);
    };
    
    const handleViewApplicants = (shift: Shift) => {
        setShiftToViewApplicants(shift);
        setIsApplicantsModalOpen(true);
    };
    
    const handleHireTalent = (userId: string) => {
        const talent = users.find(u => u.id === userId);
        if (talent) {
            setHiringTalent(talent);
            setIsPostShiftModalOpen(true);
        }
    };

    const handleOpenChat = (chatId: string) => {
        handleNavigate('chat', { chatId });
    };

    const handleSaveSearch = (name: string, filters: SavedSearchFilters, notificationsEnabled: boolean) => {
        const newSearch: SavedSearch = {
            id: `search-${Date.now()}`,
            name,
            filters,
            notificationsEnabled,
        };
        setSavedSearches(prev => [...prev, newSearch]);
    };
    
    const handleUpdateUser = (updatedUser: User) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        if (currentUser?.id === updatedUser.id) {
            setCurrentUser(updatedUser);
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} onApply={handleApply} businesses={users.filter(u=>u.userType === 'Business')} content={websiteContent} roleDetails={roleDetails} stats={platformStats} />;
            case 'jobs':
                return <WorkerView shifts={shifts} jobs={jobs} onApply={handleApply} onApplyForJob={handleApplyForJob} isLoggedIn={isLoggedIn} user={currentUser} onSaveSearch={handleSaveSearch} appliedFilters={appliedFilters} onClearAppliedFilters={() => setAppliedFilters(null)} roleDetails={roleDetails} />;
            case 'availability':
                return <AvailabilityView availabilityPosts={availabilityPosts} allUsers={users} currentUser={currentUser} isLoggedIn={isLoggedIn} onPostAvailabilityClick={() => setIsPostAvailabilityModalOpen(true)} onContactTalent={(userId) => alert(`Contacting user ${userId}`)} onHireTalent={handleHireTalent} onHireUnauthenticated={() => handleNavigate('register')} roleDetails={roleDetails} />;
            case 'insights':
                return <InsightsView shifts={shifts} users={users} />;
            case 'login':
                return <LoginView onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
            case 'register':
                return <RegistrationView onNavigate={handleNavigate} />;
            case 'jobSeekerRegister':
                return <JobSeekerRegistrationView onNavigate={handleNavigate} onRegister={(data) => { console.log(data); handleLogin('JobSeeker'); }} roleDetails={roleDetails} />;
            case 'jobAnnouncerRegister':
                return <JobAnnouncerRegistrationView onNavigate={handleNavigate} onLogin={() => handleLogin('Business')} />;
            case 'profile':
                 return profileToShow && <ProfileView user={profileToShow} chats={chats} shifts={shifts} allUsers={users} onOpenChat={handleOpenChat} />;
            case 'jobSeekerDashboard':
                return currentUser && <JobSeekerView user={currentUser} shifts={shifts} jobs={jobs} savedSearches={savedSearches} onNavigate={handleNavigate} onApply={handleApply} isLoggedIn={isLoggedIn} onConfirmShift={(shiftId) => alert(`Confirming shift ${shiftId}`)} onOpenChat={(shiftId) => alert(`Opening chat for shift ${shiftId}`)} onDeleteSearch={(id) => setSavedSearches(p => p.filter(s => s.id !== id))} onApplySavedSearch={handleApplySavedSearch} roleDetails={roleDetails} />;
            case 'business':
                return currentUser && <BusinessView user={currentUser} shifts={shifts} onPostShift={() => setIsPostShiftModalOpen(true)} onViewApplicants={handleViewApplicants} />;
            case 'adminDashboard':
                return <AdminDashboardView users={users} shifts={shifts} websiteContent={websiteContent} notificationSettings={{emailOnProfileUpdate: true, emailOnApplicationStatusChange: true}} onUpdateUser={handleUpdateUser} onDeleteUser={(id) => setUsers(p => p.filter(u => u.id !== id))} onDeleteShift={(id) => setShifts(p => p.filter(s => s.id !== id))} onEditUser={(user) => setUserToEdit(user)} onContentChange={setWebsiteContent} onNotificationSettingsChange={(s) => console.log(s)} roleDetails={roleDetails} onRoleDetailsChange={setRoleDetails} />;
            case 'chatsList':
                return currentUser && <ChatsListView chats={chats} shifts={shifts} currentUser={currentUser} allUsers={users} onOpenChat={handleOpenChat} />;
            case 'chat': {
                const activeChat = chats.find(c => c.id === activeChatId);
                const chatPartnerId = activeChat?.participants.userId === currentUser?.id ? activeChat?.participants.businessId : activeChat?.participants.userId;
                const chatPartner = users.find(u => u.id === chatPartnerId);
                const shift = shifts.find(s => s.id === activeChat?.shiftId);
                return activeChat && currentUser && chatPartner && shift ? (
                    <ChatView chat={activeChat} currentUser={currentUser} chatPartner={chatPartner} shift={shift} onSendMessage={(chatId, text) => console.log(chatId, text)} onBack={() => handleNavigate('chatsList')} />
                ) : <p>Chat not found.</p>;
            }
            default:
                return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} onApply={handleApply} businesses={users.filter(u=>u.userType === 'Business')} content={websiteContent} roleDetails={roleDetails} stats={platformStats} />;
        }
    };

    return (
        <LanguageProvider>
            <div className="bg-slate-50 min-h-screen">
                <Header
                    currentView={currentView}
                    onNavigate={handleNavigate}
                    isLoggedIn={isLoggedIn}
                    user={currentUser}
                    onLogout={handleLogout}
                    notifications={notifications}
                    onNotificationClick={(n) => setNotifications(prev => prev.map(noti => noti.id === n.id ? {...noti, isRead: true} : noti))}
                    onMarkAllNotificationsAsRead={() => setNotifications(prev => prev.map(n => ({...n, isRead: true})))}
                    roleDetails={roleDetails}
                />
                <main>
                    {renderView()}
                </main>
                <Footer onNavigate={handleNavigate} />
                <ApplicationModal 
                    isOpen={isApplicationModalOpen}
                    onClose={() => setIsApplicationModalOpen(false)}
                    shift={shiftToApply}
                    user={currentUser}
                    onConfirm={handleConfirmApplication}
                />
                <ApplicantsModal
                    isOpen={isApplicantsModalOpen}
                    onClose={() => setIsApplicantsModalOpen(false)}
                    shift={shiftToViewApplicants}
                    onAccept={(shiftId, applicantId) => alert(`Accepting ${applicantId} for ${shiftId}`)}
                    onMessage={(applicantId, shiftId) => alert(`Messaging ${applicantId} for ${shiftId}`)}
                />
                <PostShiftModal 
                    isOpen={isPostShiftModalOpen}
                    onClose={() => { setIsPostShiftModalOpen(false); setHiringTalent(null); }}
                    onAddShift={(s) => console.log('Adding shift', s)}
                    onAddJob={(j) => console.log('Adding job', j)}
                    currentUser={currentUser}
                    hiringTalent={hiringTalent}
                    roleDetails={roleDetails}
                />
                <PostAvailabilityModal
                    isOpen={isPostAvailabilityModalOpen}
                    onClose={() => setIsPostAvailabilityModalOpen(false)}
                    onPost={(data) => console.log('Posting availability', data)}
                    roleDetails={roleDetails}
                />
                {/* FIX: Render the EditUserModal and pass the necessary props */}
                <EditUserModal
                    isOpen={!!userToEdit}
                    onClose={() => setUserToEdit(null)}
                    user={userToEdit}
                    onSave={handleUpdateUser}
                    roleDetails={roleDetails}
                />
            </div>
        </LanguageProvider>
    );
};

export default App;