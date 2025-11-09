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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [availabilityPosts, setAvailabilityPosts] = useState<AvailabilityPost[]>([]);

  const [isPostShiftModalOpen, setIsPostShiftModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isPostAvailabilityModalOpen, setIsPostAvailabilityModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);

  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [hiringTalent, setHiringTalent] = useState<User | null>(null);

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnProfileUpdate: true,
    emailOnApplicationStatusChange: true,
  });

  React.useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
    fetch('http://localhost:3001/api/shifts')
      .then(res => res.json())
      .then(data => setShifts(data));
    fetch('http://localhost:3001/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
    fetch('http://localhost:3001/api/chats')
      .then(res => res.json())
      .then(data => setChats(data));
    fetch('http://localhost:3001/api/availability')
      .then(res => res.json())
      .then(data => setAvailabilityPosts(data));
    fetch('http://localhost:3001/api/website-content')
        .then(res => res.json())
        .then(data => setWebsiteContent(data));
  }, []);
  
  const handleLogin = (userType: UserType) => {
    setIsLoggedIn(true);
    if (userType === 'Business') {
      setCurrentUser(users.find(u => u.userType === 'Business') || null);
      setCurrentView('business');
    } else {
      setCurrentUser(users.find(u => u.userType === 'JobSeeker') || null);
      setCurrentView('jobSeekerDashboard');
    }
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser(users.find(u => u.email === 'admin@docky.com') || null);
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
      const shiftData = {
        ...newShiftData,
        businessName: currentUser.name,
        businessLogo: currentUser.avatar,
        postedAt: new Date().toISOString(),
        applicants: hiringTalent ? [hiringTalent] : [],
        status: hiringTalent ? ShiftStatus.Filled : ShiftStatus.Open,
        acceptedApplicantId: hiringTalent ? hiringTalent.id : undefined,
      };

      fetch('http://localhost:3001/api/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shiftData),
      })
      .then(res => res.json())
      .then(newShift => {
        setShifts(prev => [newShift, ...prev]);
        if (hiringTalent) {
          // Update the hired user's applications locally for now
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
        }
      });
    }
  };
  
  const handleAddJob = (jobData: Omit<Job, 'id' | 'businessName' | 'businessLogo' | 'talentId' | 'postedAt' | 'applicants'>) => {
    if (currentUser && currentUser.userType === 'Business') {
        const newJobData = {
            ...jobData,
            businessName: currentUser.name,
            businessLogo: currentUser.avatar,
            postedAt: new Date().toISOString(),
            talentId: hiringTalent ? hiringTalent.id : undefined,
            applicants: [],
        };

        fetch('http://localhost:3001/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJobData),
        })
        .then(res => res.json())
        .then(newJob => {
            setJobs(prev => [newJob, ...prev]);
            if (hiringTalent) {
                setUsers(prevUsers => prevUsers.map(user => {
                    if (user.id === hiringTalent.id) {
                        return {
                            ...user,
                            jobs: [...(user.jobs || []), newJob]
                        };
                    }
                    return user;
                }));
            }
        });
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
    fetch(`http://localhost:3001/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    })
    .then(res => res.json())
    .then(data => {
        setUsers(users.map(u => u.id === data.id ? data : u));
        if (currentUser && currentUser.id === data.id) {
            setCurrentUser(data);
        }
        setIsEditUserModalOpen(false);
        setSelectedUserId(null);
    });
  };

  const handleDeleteUser = (userId: string) => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
    })
    .then(() => {
        setUsers(users.filter(u => u.id !== userId));
    });
  };
  
  const handleDeleteShift = (shiftId: string) => {
    fetch(`http://localhost:3001/api/shifts/${shiftId}`, {
        method: 'DELETE',
    })
    .then(() => {
        setShifts(shifts.filter(s => s.id !== shiftId));
    });
  };
  
  const handleOpenChat = (shiftId: string, applicantId?: string) => {
      if (!currentUser) return;
      
      const businessId = currentUser.userType === 'Business' ? currentUser.id : shifts.find(s=>s.id === shiftId)?.businessName || '';
      const userId = currentUser.userType === 'JobSeeker' ? currentUser.id : applicantId || '';

      const business = users.find(b => b.name === businessId)
      
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
        return <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApplyForShift} businesses={users.filter(u => u.userType === 'Business')} />;
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
        ) : <HomeView onNavigate={handleNavigate} shifts={shifts} isLoggedIn={isLoggedIn} user={currentUser} content={websiteContent} onApply={handleApplyForShift} businesses={users.filter(u => u.userType === 'Business')} />;
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