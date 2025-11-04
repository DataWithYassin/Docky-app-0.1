import React, { useState, useRef, useEffect } from 'react';
import { Chat, User, Message, Shift } from '../types';
import { CalendarIcon, ClockIcon } from './Icons';

interface ChatViewProps {
  chat: Chat;
  currentUser: User;
  chatPartner: User;
  shift: Shift;
  onSendMessage: (chatId: string, text: string) => void;
  onBack: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, currentUser, chatPartner, shift, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(chat.id, newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-150px)]">
      <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-4">
            <button onClick={onBack} className="text-primary hover:text-accent p-2 rounded-full -ml-2">&larr; Back</button>
            <img src={chatPartner.avatar} alt={chatPartner.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-primary">{chatPartner.name}</p>
               <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                <span>Replying about: <strong>{shift.role}</strong></span>
                <span className="hidden sm:inline">&bull;</span>
                <div className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {shift.date}</div>
                <div className="flex items-center gap-1"><ClockIcon className="w-3 h-3" /> {shift.startTime}-{shift.endTime}</div>
              </div>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto bg-slate-50">
          <div className="space-y-4">
            {chat.messages.map(message => (
              <div key={message.id} className={`flex items-end gap-2 ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                {message.senderId !== currentUser.id && (
                    <img src={chatPartner.avatar} alt={chatPartner.name} className="w-8 h-8 rounded-full" />
                )}
                <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${message.senderId === currentUser.id ? 'bg-accent text-white rounded-br-none' : 'bg-slate-200 text-primary rounded-bl-none'}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.senderId === currentUser.id ? 'text-cyan-200' : 'text-slate-500'} text-right`}>
                    {formatDate(message.timestamp)}
                  </p>
                </div>
                 {message.senderId === currentUser.id && (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-slate-300 rounded-full focus:ring-accent focus:border-accent"
            />
            <button onClick={handleSend} className="bg-accent text-white font-bold py-2 px-6 rounded-full hover:bg-accent-hover transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;