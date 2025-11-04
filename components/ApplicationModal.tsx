import React, { useMemo, useState } from 'react';
import { Shift, User } from '../types';
import { CheckCircleIcon, XCircleIcon, CalendarIcon, ClockIcon, LocationIcon } from './Icons';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  shift: Shift | null;
  user: User | null;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, onConfirm, shift, user }) => {
  const [message, setMessage] = useState('');

  const matches = useMemo(() => {
    if (!shift || !user) return [];

    const results: { requirement: string, match: boolean }[] = [];

    // Check 1: Role Match
    const roleMatch = user.role === shift.role;
    results.push({ requirement: `Correct Role (${shift.role})`, match: roleMatch });

    // Check 2: Specific Requirements Match
    shift.requirements?.forEach(req => {
      // Simple case-insensitive check against user skills
      const skillMatch = user.skills?.some(skill => skill.toLowerCase().includes(req.toLowerCase())) || false;
      results.push({ requirement: `Requirement: ${req}`, match: skillMatch });
    });
    
    return results;
  }, [shift, user]);

  if (!isOpen || !shift || !user) return null;
  
  const allMatch = matches.every(m => m.match);

  const handleConfirmClick = () => {
    onConfirm(message);
    setMessage(''); // Reset message after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Confirm Your Application</h2>
          <p className="text-sm text-slate-500">Review your profile match before submitting.</p>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Shift Details */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Shift Details</h3>
            <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                    <img src={shift.businessLogo} alt={shift.businessName} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-800">{shift.businessName}</span>
                </div>
                <p className="font-bold text-cyan-600 text-lg">🍽️ {shift.role}</p>
                <div className="text-sm text-slate-600 space-y-1">
                    <p className="flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> {shift.date}</p>
                    <p className="flex items-center gap-2"><ClockIcon className="w-4 h-4"/> {shift.startTime} - {shift.endTime}</p>
                    <p className="flex items-center gap-2"><LocationIcon className="w-4 h-4"/> {shift.location}</p>
                </div>
            </div>
          </div>

          {/* Profile Match */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Profile Match Analysis</h3>
            <div className="p-4 border border-slate-200 rounded-lg space-y-3">
              {matches.map(({ requirement, match }) => (
                <div key={requirement} className="flex items-center">
                  {match ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  )}
                  <span className={`text-slate-700 ${!match ? 'line-through' : ''}`}>{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cover Message */}
           <div>
              <label htmlFor="cover-message" className="font-bold text-lg text-primary mb-2 block">Message to Business (Optional)</label>
              <textarea
                id="cover-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent"
                placeholder="Write a brief message to introduce yourself..."
              ></textarea>
           </div>


          {/* Summary Message */}
          {allMatch && (
            <div className="p-4 rounded-lg bg-green-50 text-green-800">
              <h4 className="font-bold">You're a great fit!</h4>
              <p className="text-sm">
                Your profile matches all the key requirements for this shift.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 flex justify-end items-center space-x-3 rounded-b-lg">
          <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleConfirmClick} className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
            Confirm Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;