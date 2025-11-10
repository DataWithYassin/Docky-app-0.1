import React, { useState, useMemo } from 'react';
import { Shift, User, ApplicationStatus } from '../types';
import DayShiftsModal from './DayShiftsModal';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from './Icons';

type UserShift = { shift: Shift; status: ApplicationStatus };

interface CalendarViewProps {
  userShifts: UserShift[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const statusDotColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Pending]: 'bg-yellow-500',
    [ApplicationStatus.Accepted]: 'bg-green-500',
    [ApplicationStatus.Rejected]: 'bg-red-500',
    [ApplicationStatus.Confirmed]: 'bg-blue-500',
};

const CalendarView: React.FC<CalendarViewProps> = ({ userShifts, currentDate, onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthHasShifts = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return userShifts.some(({ shift }) => {
        const shiftDate = new Date(`${shift.date}T00:00:00`);
        return shiftDate.getFullYear() === year && shiftDate.getMonth() === month;
    });
  }, [userShifts, currentDate]);

  const getShiftsForDay = (day: number): UserShift[] => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dayString = day.toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${dayString}`;
    return userShifts.filter(({ shift }) => shift.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const shiftsOnDay = getShiftsForDay(day);
    if (shiftsOnDay.length > 0) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        setIsModalOpen(true);
    }
  };

  const changeMonth = (offset: number) => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };
  
  const renderCalendarDays = () => {
    const days = [];
    // Blank days at the start
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`blank-${i}`} className="border-r border-b border-slate-200"></div>);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const shiftsOnDay = getShiftsForDay(day);
      const statusesOnDay = [...new Set(shiftsOnDay.map(s => s.status))];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const hasShifts = shiftsOnDay.length > 0;
      
      days.push(
        <div 
          key={day} 
          className={`border-r border-b border-slate-200 p-2 min-h-[100px] flex flex-col transition-colors ${hasShifts ? 'cursor-pointer hover:bg-slate-50' : 'bg-slate-50/50'}`} 
          onClick={() => handleDayClick(day)}
          title={hasShifts ? `Click to view ${shiftsOnDay.length} shift(s)` : 'No shifts on this day'}
        >
          <div className={`font-semibold text-sm self-start ${isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-700'}`}>{day}</div>
          {hasShifts && (
            <div className="mt-2 flex-grow flex items-end">
              <div className="flex flex-wrap gap-1">
                {statusesOnDay.slice(0, 4).map(status => (
                    <div key={status} className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} title={status}></div>
                ))}
                {statusesOnDay.length > 4 && (
                    <div className="w-2 h-2 rounded-full bg-slate-300" title={`${statusesOnDay.length - 4} more`}></div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100">
            <ChevronLeftIcon className="w-6 h-6 text-slate-600" />
        </button>
        <h3 className="text-xl font-bold text-primary">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100">
            <ChevronRightIcon className="w-6 h-6 text-slate-600" />
        </button>
      </div>
      
      {monthHasShifts ? (
        <div className="grid grid-cols-7 border-t border-l border-slate-200">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center font-bold text-primary p-2 border-r border-b border-slate-200 bg-slate-50 text-sm">{day}</div>
            ))}
            {renderCalendarDays()}
        </div>
      ) : (
        <div className="text-center py-16 px-6 border-t border-slate-200">
            <CalendarIcon className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-xl font-semibold text-primary mt-4">No Shifts This Month</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">You have no pending or confirmed shifts for this month. Go to the 'Jobs' page to find new opportunities!</p>
        </div>
      )}

      {selectedDate && (
         <DayShiftsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={selectedDate}
            shiftsWithStatus={getShiftsForDay(selectedDate.getDate())}
        />
      )}
    </div>
  );
};

export default CalendarView;
