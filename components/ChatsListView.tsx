import React from 'react';
import { Chat, User, Shift } from '../types';

interface ChatsListViewProps {
  chats: Chat[];
  shifts: Shift[];
  currentUser: User;
  allUsers: User[];
  onOpenChat: (chatId: string) => void;
}

const ChatsListView: React.FC<ChatsListViewProps> = ({ chats, shifts, currentUser, allUsers, onOpenChat }) => {
  
  const getChatPartner = (chat: Chat): User | undefined => {
    const partnerId = chat.participants.userId === currentUser.id 
      ? chat.participants.businessId 
      : chat.participants.userId;
    return allUsers.find(u => u.id === partnerId);
  };

  const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  };
  
  const sortedChats = [...chats].sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;
    return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Your Conversations</h1>
        
        <div className="bg-white rounded-lg shadow-lg">
          {sortedChats.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {sortedChats.map(chat => {
                const partner = getChatPartner(chat);
                const shift = shifts.find(s => s.id === chat.shiftId);
                const lastMessage = chat.messages[chat.messages.length - 1];

                if (!partner || !shift) return null;

                return (
                  <li key={chat.id}>
                    <button onClick={() => onOpenChat(chat.id)} className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                      <img src={partner.avatar} alt={partner.name} className="w-14 h-14 rounded-full" />
                      <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between items-baseline">
                          <p className="font-bold text-primary truncate">{partner.name}</p>
                          {lastMessage && <p className="text-xs text-slate-500 flex-shrink-0">{timeSince(lastMessage.timestamp)}</p>}
                        </div>
                        <p className="text-sm text-slate-600">Re: {shift.role} at {shift.businessName}</p>
                        {lastMessage ? (
                             <p className="text-sm text-slate-500 truncate mt-1">
                                {lastMessage.senderId === currentUser.id && "You: "}
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
            <div className="text-center p-12">
              <h3 className="text-xl font-semibold text-primary">No Conversations Yet</h3>
              <p className="text-slate-500 mt-2">When you message a business or they message you, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsListView;