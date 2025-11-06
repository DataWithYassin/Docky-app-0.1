import React, { useState } from 'react';
import { Role, Shift, User, Job, WeekDay, weekDays } from '../types';

type PartTimeJobData = Omit<Job, 'id' | 'businessName' | 'businessLogo' | 'talentId' | 'postedAt' | 'applicants'>;
type ShiftData = Omit<Shift, 'id' | 'businessName' | 'businessLogo' | 'applicants' | 'status' | 'postedAt'>;

interface PostShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShift: (shift: ShiftData) => void;
  onAddJob: (job: PartTimeJobData) => void;
  hiringTalent?: User | null;
}

const PostShiftModal: React.FC<PostShiftModalProps> = ({ isOpen, onClose, onAddShift, onAddJob, hiringTalent }) => {
  const [postType, setPostType] = useState<'shift' | 'part-time'>('shift');
  const [selectedDays, setSelectedDays] = useState<Set<WeekDay>>(new Set());

  if (!isOpen) return null;

  const handleDayChange = (day: WeekDay) => {
    setSelectedDays(prev => {
      const newDays = new Set(prev);
      if (newDays.has(day)) {
        newDays.delete(day);
      } else {
        newDays.add(day);
      }
      return newDays;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (postType === 'part-time') {
        const newJob: PartTimeJobData = {
          role: formData.get('role') as Role,
          startDate: formData.get('startDate') as string,
          workDays: Array.from(selectedDays),
          scheduleDetails: formData.get('scheduleDetails') as string,
          hourlyRate: parseFloat(formData.get('hourlyRate') as string),
          location: formData.get('location') as string,
          description: formData.get('description') as string,
        };
        onAddJob(newJob);
    } else {
      const newShift: ShiftData = {
        role: formData.get('role') as Role,
        date: formData.get('date') as string,
        startTime: formData.get('startTime') as string,
        endTime: formData.get('endTime') as string,
        hourlyRate: parseFloat(formData.get('hourlyRate') as string),
        location: formData.get('location') as string,
        description: formData.get('description') as string,
      };
      onAddShift(newShift);
    }

    onClose();
  };
  
  const InputField: React.FC<{label: string, name: string, type: string, required?: boolean, placeholder?: string, defaultValue?: string | number}> = ({label, name, type, required, placeholder, defaultValue}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <input 
            type={type} 
            name={name} 
            id={name} 
            required={required} 
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">{hiringTalent ? `Send Offer to ${hiringTalent.name}` : 'Post a New Job Opening'}</h2>
          <p className="text-sm text-slate-500">{hiringTalent ? 'Choose the type of job and fill in the details below.' : 'Select whether you are posting a single shift or a recurring part-time job.'}</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="flex rounded-md shadow-sm">
                    <button type="button" onClick={() => setPostType('shift')} className={`w-full px-4 py-2 text-sm font-medium border rounded-l-md transition-colors ${postType === 'shift' ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
                        Single Shift
                    </button>
                    <button type="button" onClick={() => setPostType('part-time')} className={`w-full px-4 py-2 text-sm font-medium border rounded-r-md -ml-px transition-colors ${postType === 'part-time' ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
                        Part-time Job
                    </button>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                    <select id="role" name="role" required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" defaultValue={hiringTalent?.role}>
                        {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                
                {postType === 'shift' ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Date" name="date" type="date" required defaultValue="2024-08-15" />
                            <InputField label="Hourly Rate (€)" name="hourlyRate" type="number" required placeholder="e.g., 25.50" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Start Time" name="startTime" type="time" required defaultValue="09:00" />
                            <InputField label="End Time" name="endTime" type="time" required defaultValue="17:00" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Start Date" name="startDate" type="date" required />
                            <InputField label="Hourly Rate (€)" name="hourlyRate" type="number" required placeholder="e.g., 16.50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Work Days</label>
                            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {weekDays.map(day => (
                                <div key={day} className="flex items-center">
                                    <input id={`day-${day}`} type="checkbox" checked={selectedDays.has(day)} onChange={() => handleDayChange(day)} className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent" />
                                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">{day}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="scheduleDetails" className="block text-sm font-medium text-slate-700">Schedule Details</label>
                            <textarea id="scheduleDetails" name="scheduleDetails" rows={2} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md" placeholder="e.g., 9am-1pm, with flexibility."></textarea>
                        </div>
                    </>
                )}

                <InputField label="Location" name="location" type="text" required placeholder="e.g., 123 Main St, Anytown" />
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Message / Description</label>
                     <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                        placeholder="Briefly describe the shift, responsibilities, or requirements."
                    ></textarea>
                </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end items-center space-x-3 rounded-b-lg">
                <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
                    {hiringTalent ? 'Send Offer' : (postType === 'shift' ? 'Post Shift' : 'Post Job')}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default PostShiftModal;