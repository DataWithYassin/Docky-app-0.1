import React from 'react';
import { Shift, User, ApplicationStatus } from '../types';
import { XMarkIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon } from './Icons';

type UserShift = { shift: Shift; status: ApplicationStatus };

interface DayShiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  shiftsWithStatus: UserShift[];
}

const statusInfo: Record<ApplicationStatus, { text: string; classes: string; icon: React.ReactNode; }> = {
    [ApplicationStatus.Pending]: { text: 'Pending', classes: 'bg-yellow-100 text-yellow-800', icon: <ClockIcon className="w-4 h-4" /> },
    [ApplicationStatus.Accepted]: { text: 'Accepted', classes: 'bg-green-100 text-green-800', icon: <CheckCircleIcon className="w-4 h-4" /> },
    [ApplicationStatus.Rejected]: { text: 'Not Selected', classes: 'bg-red-100 text-red-800', icon: <XCircleIcon className="w-4 h-4" /> },
    [ApplicationStatus.Confirmed]: { text: 'Confirmed', classes: 'bg-blue-100 text-blue-800', icon: <CheckCircleIcon className="w-4 h-4" /> },
};

const CalendarShiftItem: React.FC<{ shift: Shift; status: ApplicationStatus; }> = ({ shift, status }) => {
    const currentStatus = statusInfo[status];

    const formatToICSDate = (date: string, time: string) => {
        // Assume local timezone, but ICS standard is UTC. For simplicity, we'll format without 'Z'.
        // Proper implementation would require timezone conversion.
        const d = new Date(`${date}T${time}`);
        return d.toISOString().replace(/[-:.]/g, '').substring(0, 15) + 'Z';
    };

    const handleAddToCalendar = () => {
        const startDate = formatToICSDate(shift.date, shift.startTime);
        const endDate = formatToICSDate(shift.date, shift.endTime);

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//DockyApp//EN',
            'BEGIN:VEVENT',
            `UID:${shift.id}@docky.app`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '').substring(0, 15) + 'Z'}`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:Work Shift: ${shift.role} at ${shift.businessName}`,
            `LOCATION:${shift.location}`,
            `DESCRIPTION:Details: ${shift.description}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `shift-${shift.role}-${shift.date}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="flex items-center gap-3">
                    <img src={shift.businessLogo} alt={shift.businessName} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold text-primary">{shift.role} at {shift.businessName}</p>
                        <p className="text-sm text-slate-500">{shift.startTime} - {shift.endTime} &bull; €{shift.hourlyRate}/hr</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${currentStatus.classes}`}>
                        {currentStatus.icon}
                        {currentStatus.text}
                    </span>
                    {status === ApplicationStatus.Confirmed && (
                        <button
                            onClick={handleAddToCalendar}
                            className="bg-white text-primary border border-slate-300 font-bold text-xs py-1.5 px-3 rounded-full hover:bg-slate-100 flex items-center gap-1.5"
                            title="Add to Calendar"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const DayShiftsModal: React.FC<DayShiftsModalProps> = ({ isOpen, onClose, date, shiftsWithStatus }) => {
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
            <h2 className="text-xl font-bold text-primary">Your Shifts for {formattedDate}</h2>
            <p className="text-sm text-slate-500">{shiftsWithStatus.length} application(s) on this day.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <XMarkIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          {shiftsWithStatus.length > 0 ? (
            shiftsWithStatus.map(({ shift, status }) => (
              <CalendarShiftItem
                key={shift.id}
                shift={shift}
                status={status}
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
