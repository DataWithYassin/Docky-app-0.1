import React from 'react';
import { Role, Shift } from '../types';

interface PostShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShift: (shift: Omit<Shift, 'id' | 'businessName' | 'businessLogo' | 'applicants' | 'status' | 'postedAt'>) => void;
}

const PostShiftModal: React.FC<PostShiftModalProps> = ({ isOpen, onClose, onAddShift }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newShift = {
      role: formData.get('role') as Role,
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      hourlyRate: parseFloat(formData.get('hourlyRate') as string),
      location: formData.get('location') as string,
      description: formData.get('description') as string,
    };
    onAddShift(newShift);
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
          <h2 className="text-xl font-bold text-primary">Post a New Shift</h2>
          <p className="text-sm text-slate-500">Fill out the details below to find the right person for the job.</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                    <select id="role" name="role" required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                        {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Date" name="date" type="date" required defaultValue="2024-08-15" />
                    <InputField label="Hourly Rate ($)" name="hourlyRate" type="number" required placeholder="e.g., 25.50" />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Start Time" name="startTime" type="time" required defaultValue="09:00" />
                    <InputField label="End Time" name="endTime" type="time" required defaultValue="17:00" />
                </div>
                <InputField label="Location" name="location" type="text" required placeholder="e.g., 123 Main St, Anytown" />
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
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
                    Post Shift
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default PostShiftModal;