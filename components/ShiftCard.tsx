import React from 'react';
import { Shift } from '../types';
import { StarIcon, LocationIcon, VerificationIcon } from './Icons';

interface ShiftCardProps {
  shift: Shift;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
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
      return `posted 3d ago`;
    }
    return `posted ${days}d ago`;
  };

  const duration = getShiftDuration(shift.startTime, shift.endTime);
  const totalPay = duration * shift.hourlyRate;

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
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                <div className="flex items-center gap-1">
                    <p className="font-bold text-lg text-primary">{shift.businessName}</p>
                    <VerificationIcon className="w-5 h-5 text-blue-500" />
                </div>
                {shift.rating && (
                    <div className="flex items-center gap-1 text-amber-500">
                        <StarIcon className="w-4 h-4" />
                        <span className="font-bold text-sm">{shift.rating.toFixed(1)} / 5</span>
                        <span className="text-slate-500 text-xs ml-1">(by past workers)</span>
                    </div>
                )}
            </div>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <LocationIcon className="w-4 h-4 mr-1" />
              <span>{shift.location}</span>
              <span className="mx-2">&bull;</span>
              <span>{timeAgo(shift.postedAt)}</span>
            </div>
          </div>
        </div>

        <p className="text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4">
          <span className="font-bold text-cyan-600">🍽️ {shift.role}</span> needed for a shift ({duration.toFixed(1)} hours), on <span className="font-bold text-indigo-600">📅 {formatDate(shift.date)}</span>, from <span className="font-bold text-amber-600">🕓 {shift.startTime}–{shift.endTime}</span>, paid <span className="font-bold text-green-600">💶 €{shift.hourlyRate.toFixed(2)}/hour (€{totalPay.toFixed(2)} total)</span>. 
          {shift.languages && shift.languages.length > 0 && (
            <> Speakers of <span className="font-bold text-purple-600">🗣️ {shift.languages.join(' & ')}</span> are welcome.</>
          )}
          {shift.requirements && shift.requirements.length > 0 && (
            <> Must have <span className="font-bold text-rose-600">✅ {shift.requirements.join(', ')}</span>.</>
          )}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
           <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto">
                Apply Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;