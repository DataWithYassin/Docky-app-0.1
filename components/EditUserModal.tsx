
import React, { useState, useEffect } from 'react';
import { User, Role, UserType } from '../types';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

const InputField: React.FC<{label: string, name: string, type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ label, name, type, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <input 
            type={type} 
            name={name} 
            id={name} 
            value={value}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
    </div>
);

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: parseFloat(value) || 0 } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Edit User Profile</h2>
          <p className="text-sm text-slate-500">Editing details for <span className="font-semibold">{user?.name}</span></p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <InputField label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
                <InputField label="Avatar URL" name="avatar" type="text" value={formData.avatar} onChange={handleChange} />
                <InputField label="Location" name="location" type="text" value={formData.location || ''} onChange={handleChange} />
                
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-slate-700">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                        placeholder="Brief description about the user."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="userType" className="block text-sm font-medium text-slate-700">User Type</label>
                        <select id="userType" name="userType" value={formData.userType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                           <option value="JobSeeker">JobSeeker</option>
                           <option value="Business">Business</option>
                        </select>
                    </div>
                    {formData.userType === 'JobSeeker' && (
                         <div>
                            <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                                {Object.values(Role).map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Rating" name="rating" type="number" value={formData.rating} onChange={handleNumericChange} />
                    <InputField label="Review Count" name="reviewCount" type="number" value={formData.reviewCount} onChange={handleNumericChange} />
                </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end items-center space-x-3 rounded-b-lg">
                <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
                    Save Changes
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;