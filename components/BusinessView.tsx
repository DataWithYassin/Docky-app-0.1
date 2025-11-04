import React, { useState } from 'react';
import { Shift, User, ShiftStatus, Chat } from '../types';
import { StarIcon, LocationIcon } from './Icons';

interface BusinessViewProps {
  shifts: Shift[];
  chats: Chat[];
  allUsers: User[];
  currentUser: User;
  onPostShiftClick: () => void;
  onShiftClick: (shiftId: string) => void;
  onOpenChat: (chatId: string) => void;
}

const ApplicantCard: React.FC<{ applicant: User }> = ({ applicant }) => (
  <div className="flex items-center p-3 bg-slate-50 rounded-lg">
    <img src={applicant.avatar} alt={applicant.name} className="w-12 h-12 rounded-full mr-4" />
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <p className="font-bold text-primary">{applicant.name}</p>
        <div className="flex items-center text-amber-500">
            <StarIcon className="w-4 h-4 mr-1" />
            <span className="font-bold text-sm">{applicant.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500 ml-1.5">({applicant.reviewCount} reviews)</span>
        </div>
      </div>
      <p className="text-sm text-slate-600">{applicant.role}</p>
    </div>
  </div>
);

const PostedShiftCard: React.FC<{ shift: Shift, onClick: () => void }> = ({ shift, onClick }) => {
  const statusColors: Record<ShiftStatus, string> = {
    [ShiftStatus.Open]: 'border-green-500',
    [ShiftStatus.Filled]: 'border-blue-500',
    [ShiftStatus.Completed]: 'border-slate-400',
    [ShiftStatus.Expired]: 'border-red-400',
  };
  
  const statusBgColors: Record<ShiftStatus, string> = {
    [ShiftStatus.Open]: 'bg-green-100 text-green-800',
    [ShiftStatus.Filled]: 'bg-blue-100 text-blue-800',
    [ShiftStatus.Completed]: 'bg-slate-100 text-slate-800',
    [ShiftStatus.Expired]: 'bg-red-100 text-red-800',
  };

  const canBeClicked = shift.status === ShiftStatus.Open && shift.applicants.length > 0;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border-l-4 ${statusColors[shift.status]} ${canBeClicked ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={canBeClicked ? onClick : undefined}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-primary">{shift.role}</h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <LocationIcon className="w-4 h-4 mr-1" />
              {shift.location}
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusBgColors[shift.status]}`}>{shift.status}</span>
        </div>
        <div className="text-sm text-slate-600 mt-2">
          <span>{shift.date} &bull; {shift.startTime} - {shift.endTime} &bull; ${shift.hourlyRate}/hr</span>
        </div>
      </div>
      
      {shift.applicants.length > 0 && (
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center">
             <h4 className="font-semibold text-primary">Applicants ({shift.applicants.length})</h4>
             {canBeClicked && <span className="text-sm font-semibold text-accent">View &rarr;</span>}
          </div>
          {shift.status !== ShiftStatus.Open && shift.acceptedApplicantId && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-primary mb-1">Accepted Applicant:</p>
              <ApplicantCard applicant={shift.applicants.find(a => a.id === shift.acceptedApplicantId)!} />
            </div>
          )}
        </div>
      )}

      {shift.status === ShiftStatus.Open && shift.applicants.length === 0 && (
         <div className="px-5 pb-5 text-center text-sm text-slate-500">
            Awaiting applicants...
         </div>
      )}
    </div>
  );
};

const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ChatList: React.FC<{ 
    chats: Chat[]; 
    shifts: Shift[]; 
    allUsers: User[]; 
    currentUser: User; 
    onOpenChat: (chatId: string) => void;
}> = ({ chats, shifts, allUsers, currentUser, onOpenChat }) => {
    const sortedChats = [...chats].sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        if (!lastMessageA) return 1;
        if (!lastMessageB) return -1;
        return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
    });

    return (
         <div className="bg-white rounded-lg shadow-md">
          {sortedChats.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {sortedChats.map(chat => {
                const partner = allUsers.find(u => u.id === chat.participants.userId);
                const shift = shifts.find(s => s.id === chat.shiftId);
                const lastMessage = chat.messages[chat.messages.length - 1];

                if (!partner || !shift) return null;

                return (
                  <li key={chat.id}>
                    <button onClick={() => onOpenChat(chat.id)} className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                      <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                      <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between items-baseline">
                          <p className="font-bold text-primary truncate">{partner.name}</p>
                          {lastMessage && <p className="text-xs text-slate-500 flex-shrink-0">{timeSince(lastMessage.timestamp)}</p>}
                        </div>
                        <p className="text-sm text-slate-600 truncate">Re: {shift.role}</p>
                        {lastMessage ? (
                             <p className="text-sm text-slate-500 truncate mt-1">
                                {lastMessage.senderId === currentUser.id && <span className="font-semibold">You: </span>}
                                {lastMessage.text}
                            </p>
                        ) : (
                             <p className="text-sm text-slate-500 italic mt-1">No messages yet.</p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center p-16">
              <h3 className="text-xl font-semibold text-primary">No Conversations Yet</h3>
              <p className="text-slate-500 mt-2">When you message an applicant, the conversation will appear here.</p>
            </div>
          )}
        </div>
    );
};


const BusinessView: React.FC<BusinessViewProps> = ({ shifts, chats, allUsers, currentUser, onPostShiftClick, onShiftClick, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'shifts' | 'chats'>('shifts');

  const openShifts = shifts.filter(s => s.status === ShiftStatus.Open).length;
  const filledShifts = shifts.filter(s => s.status === ShiftStatus.Filled).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Your Dashboard</h2>
          <p className="text-slate-600 mt-1">Manage your posted shifts and review applicants.</p>
        </div>
        <button
          onClick={onPostShiftClick}
          className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full md:w-auto"
        >
          Post a New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">TOTAL SHIFTS</p>
            <p className="text-4xl font-bold text-primary">{shifts.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">OPEN FOR APPLICANTS</p>
            <p className="text-4xl font-bold text-green-600">{openShifts}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">FILLED</p>
            <p className="text-4xl font-bold text-blue-600">{filledShifts}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-slate-200 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                  onClick={() => setActiveTab('shifts')}
                  className={`${
                      activeTab === 'shifts'
                      ? 'border-accent text-accent'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                  Posted Shifts ({shifts.length})
              </button>
              <button
                  onClick={() => setActiveTab('chats')}
                  className={`${
                      activeTab === 'chats'
                      ? 'border-accent text-accent'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                  Conversations ({chats.length})
              </button>
          </nav>
      </div>
      
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          {shifts.length > 0 ? (
              shifts.map(shift => (
                  <PostedShiftCard key={shift.id} shift={shift} onClick={() => onShiftClick(shift.id)} />
              ))
          ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary">No Shifts Posted Yet</h3>
                  <p className="text-slate-500 mt-2 mb-6">Click the button below to post your first shift and find the talent you need.</p>
                  <button
                      onClick={onPostShiftClick}
                      className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105"
                  >
                      Post Your First Shift
                  </button>
              </div>
          )}
        </div>
      )}

      {activeTab === 'chats' && (
          <ChatList
              chats={chats}
              shifts={shifts}
              allUsers={allUsers}
              currentUser={currentUser}
              onOpenChat={onOpenChat}
          />
      )}

    </div>
  );
};

export default BusinessView;