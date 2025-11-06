
import React from 'react';
import { Shift, Role, User, ShiftStatus } from '../types';
import { StarIcon, LocationIcon, VerificationIcon, CheckCircleIcon, UsersIcon } from './Icons';

interface ShiftCardProps {
  shift: Shift;
  onApply: (shiftId: string) => void;
  isApplied: boolean;
  isLoggedIn: boolean;
  currentUser: User | null;
}

const roleBadges: Record<Role, { emoji: string; classes: string; }> = {
    [Role.Chef]: { emoji: '👨‍🍳', classes: 'bg-orange-100 text-orange-800' },
    [Role.Barista]: { emoji: '☕️', classes: 'bg-amber-100 text-amber-800' },
    [Role.Waiter]: { emoji: '🤵', classes: 'bg-blue-100 text-blue-800' },
    [Role.Host]: { emoji: '👋', classes: 'bg-rose-100 text-rose-800' },
    [Role.KitchenStaff]: { emoji: '🔪', classes: 'bg-slate-200 text-slate-800' },
};

const getStatusBadgeClass = (status: ShiftStatus) => {
    switch (status) {
        case ShiftStatus.Filled:
            return 'bg-blue-100 text-blue-800';
        case ShiftStatus.Completed:
            return 'bg-slate-100 text-slate-800';
        case ShiftStatus.Expired:
            return 'bg-red-100 text-red-800';
        default:
            return '';
    }
};

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onApply, isApplied, isLoggedIn, currentUser }) => {
  const getShiftDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (diff < 0) diff += 24; // Handles overnight shifts
    return diff;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const timeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 60) return `posted just now`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `posted ${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `posted ${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days >= 3) {
      return `posted 3d+ ago`;
    }
    return `posted ${days}d ago`;
  };

  const duration = getShiftDuration(shift.startTime, shift.endTime);
  const totalPay = duration * shift.hourlyRate;
  const badge = roleBadges[shift.role] || { emoji: '🍽️', classes: 'bg-cyan-100 text-cyan-800' };

  const isJobSeeker = isLoggedIn && currentUser?.userType === 'JobSeeker';

  const formattedDuration = duration % 1 === 0 ? duration.toFixed(0) : duration.toFixed(1);
  const article = formattedDuration === '8' ? 'an' : 'a';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={shift.businessLogo} 
            alt={`${shift.businessName} logo`} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                <div className="flex items-center gap-1">
                    <p className="font-bold text-lg text-primary">{shift.businessName}</p>
                    <VerificationIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${badge.classes}`}>
                  {badge.emoji}
                  <span className="ml-1.5">{shift.role}</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                  Single Shift
                </span>
                {shift.rating && (
                    <div className="flex items-center gap-1 text-amber-500">
                        <StarIcon className="w-4 h-4" />
                        <span className="font-bold text-sm">{shift.rating.toFixed(1)} / 5</span>
                        <span className="text-slate-500 text-xs ml-1">(by past workers)</span>
                    </div>
                )}
            </div>
            <div className="flex items-center text-slate-500 text-sm mt-2">
              <LocationIcon className="w-4 h-4 mr-1" />
              <span>{shift.location}</span>
              <span className="mx-2">&bull;</span>
              <span>{timeAgo(shift.postedAt)}</span>
            </div>
          </div>
        </div>

        <p className="text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4">
          {shift.role} needed for {article} {formattedDuration}-hour shift on <span className="font-bold text-indigo-600">📅 {formatDate(shift.date)}</span>, from <span className="font-bold text-amber-600">🕓 {shift.startTime} to {shift.endTime}</span>.
          {' '}The position pays <span className="font-bold text-green-600">💶 €{shift.hourlyRate.toFixed(2)} per hour (€{totalPay.toFixed(2)} total)</span>.
          {shift.requirements && shift.requirements.length > 0 && (
            <>
              {' '}Applicants must hold a <span className="font-bold text-rose-600">✅ {shift.requirements.join(', ')}</span>.
            </>
          )}
          {shift.languages && shift.languages.length > 0 && (
            <>
              {' '}Speakers of <span className="font-bold text-purple-600">🗣️ {shift.languages.join(' & ')}</span> are welcome.
            </>
          )}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                {shift.status === ShiftStatus.Open && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UsersIcon className="w-5 h-5" />
                        <span className="font-semibold">{shift.applicants.length}</span>
                        <span>{shift.applicants.length === 1 ? 'applicant' : 'applicants'}</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full sm:w-auto">
              {shift.status === ShiftStatus.Open ? (
                <>
                  {isJobSeeker && shift.allowPreApplyMessaging && !isApplied && (
                       <button
                          onClick={() => alert('Chat with business feature coming soon!')}
                          className="bg-white text-primary border border-primary font-bold py-2 px-6 rounded-md hover:bg-slate-50 transition-colors w-full sm:w-auto text-center"
                        >
                          Message
                       </button>
                   )}
        
                   {(() => {
                      if (isLoggedIn && currentUser?.userType === 'Business') {
                        return (
                          <button
                            disabled
                            className="bg-slate-200 text-slate-500 font-bold py-2 px-6 rounded-md w-full sm:w-auto cursor-not-allowed"
                            title="Only Job Seekers can apply"
                          >
                            Apply Now
                          </button>
                        );
                      }

                      if (isJobSeeker && isApplied) {
                        return (
                          <button
                            disabled
                            className="bg-green-100 text-green-700 font-bold py-2 px-6 rounded-md w-full sm:w-auto flex items-center justify-center gap-2 cursor-not-allowed"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                            Applied
                          </button>
                        );
                      }

                      return (
                        <button 
                            onClick={() => onApply(shift.id)}
                            className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto"
                        >
                            Apply Now
                        </button>
                      );
                   })()}
                </>
              ) : (
                <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${getStatusBadgeClass(shift.status)}`}>
                    Shift {shift.status}
                </span>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;