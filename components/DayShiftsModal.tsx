import React from 'react';
import { Shift, User } from '../types';
import ShiftCard from './ShiftCard';
import { XMarkIcon } from './Icons';

interface DayShiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  shifts: Shift[];
  onApply: (shiftId: string) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
}

const DayShiftsModal: React.FC<DayShiftsModalProps> = ({ isOpen, onClose, date, shifts, onApply, isLoggedIn, currentUser }) => {
  if (!isOpen) return null;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-primary">Shifts for {formattedDate}</h2>
            <p className="text-sm text-slate-500">{shifts.length} shift(s) available.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <XMarkIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {shifts.length > 0 ? (
            shifts.map(shift => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                onApply={onApply}
                isLoggedIn={isLoggedIn}
                isApplied={currentUser?.applications?.some(app => app.shiftId === shift.id) ?? false}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No shifts scheduled for this day.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayShiftsModal;
