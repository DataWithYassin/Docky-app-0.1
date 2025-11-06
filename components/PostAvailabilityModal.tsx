import React, { useState } from 'react';
import { AvailabilityPost, AvailabilityType, availabilityTypes, WeekDay, weekDays, TimeSlot, timeSlots, Role } from '../types';

type PostData = Omit<AvailabilityPost, 'id' | 'userId' | 'postedAt'>;

interface PostAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (data: PostData) => void;
}

const CheckboxGroup: React.FC<{
  title: string;
  options: readonly string[];
  selected: Set<string>;
  onChange: (option: string) => void;
}> = ({ title, options, selected, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700">{title}</label>
    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map(option => (
        <div key={option} className="flex items-center">
          <input id={`check-${title}-${option}`} type="checkbox" checked={selected.has(option)} onChange={() => onChange(option)} className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent" />
          <label htmlFor={`check-${title}-${option}`} className="ml-2 text-sm text-gray-700">{option}</label>
        </div>
      ))}
    </div>
  </div>
);


const PostAvailabilityModal: React.FC<PostAvailabilityModalProps> = ({ isOpen, onClose, onPost }) => {
  const [lookingFor, setLookingFor] = useState<Set<AvailabilityType>>(new Set());
  const [availableDays, setAvailableDays] = useState<Set<WeekDay>>(new Set());
  const [availableTimes, setAvailableTimes] = useState<Set<TimeSlot>>(new Set());
  const [roles, setRoles] = useState<Set<Role>>(new Set());
  const [experienceSummary, setExperienceSummary] = useState('');
  const [languages, setLanguages] = useState('');
  const [notes, setNotes] = useState('');


  if (!isOpen) return null;
  
  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<Set<any>>>, value: any) => {
    setter(prev => {
        const newSet = new Set(prev);
        if (newSet.has(value)) {
            newSet.delete(value);
        } else {
            newSet.add(value);
        }
        return newSet;
    });
  };

  const handleSubmit = () => {
    if (lookingFor.size === 0 || roles.size === 0) {
        alert('Please fill in at least "Looking For" and "Roles".');
        return;
    }
    const postData: PostData = {
        lookingFor: Array.from(lookingFor),
        availableDays: Array.from(availableDays),
        availableTimes: Array.from(availableTimes),
        roles: Array.from(roles),
        experienceSummary,
        languages: languages.split(',').map(l => l.trim()).filter(Boolean),
        notes,
    };
    onPost(postData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Post Your Availability</h2>
          <p className="text-sm text-slate-500">Let businesses know you're looking for work by providing more details.</p>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <CheckboxGroup title="I'm looking for..." options={availabilityTypes} selected={lookingFor} onChange={(val) => handleCheckboxChange(setLookingFor, val)} />
            <CheckboxGroup title="My preferred roles are..." options={Object.values(Role)} selected={roles} onChange={(val) => handleCheckboxChange(setRoles, val)} />
            <CheckboxGroup title="I'm available on these days..." options={weekDays} selected={availableDays} onChange={(val) => handleCheckboxChange(setAvailableDays, val)} />
            <CheckboxGroup title="I'm available during these times..." options={timeSlots} selected={availableTimes} onChange={(val) => handleCheckboxChange(setAvailableTimes, val)} />
             <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700">Experience Summary</label>
                <textarea id="experience" value={experienceSummary} onChange={e => setExperienceSummary(e.target.value)} rows={3} className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="e.g., 5+ years experience as a line cook, specializing in Italian cuisine."></textarea>
            </div>
             <div>
                <label htmlFor="languages" className="block text-sm font-medium text-slate-700">Languages I Speak</label>
                <input id="languages" type="text" value={languages} onChange={e => setLanguages(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="e.g., English, Portuguese, Spanish" />
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Additional Notes</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="e.g., Available to start immediately."></textarea>
            </div>
        </div>
        <div className="p-6 bg-slate-50 flex justify-end items-center space-x-3 rounded-b-lg">
          <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAvailabilityModal;