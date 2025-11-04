

import React, { useState, useMemo, useEffect } from 'react';
import { User, Shift, ShiftStatus, Role, WebsiteContent } from '../types';
import EditUserModal from './EditUserModal';
import {
    PencilSquareIcon, TrashIcon, UsersIcon, CurrencyEuroIcon, ChartBarIcon, NoSymbol, Cog6ToothIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassIcon, ChevronDownIcon
} from './Icons';

type NotificationSettings = {
    emailOnProfileUpdate: boolean;
    emailOnApplicationStatusChange: boolean;
};

interface AdminDashboardViewProps {
  users: User[];
  shifts: Shift[];
  websiteContent: WebsiteContent;
  notificationSettings: NotificationSettings;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  onDeleteShift: (shiftId: string) => void;
  onEditUser: (user: User) => void;
  onContentChange: (newContent: WebsiteContent) => void;
  onNotificationSettingsChange: (settings: NotificationSettings) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
        <div className="bg-slate-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
    </div>
);

const EmptyState: React.FC<{icon: React.ReactNode, title: string, message: string}> = ({icon, title, message}) => (
    <div className="text-center py-16 px-6 bg-slate-50 rounded-lg">
        <div className="text-slate-400 w-16 h-16 mx-auto">{icon}</div>
        <h3 className="text-xl font-semibold text-primary mt-4">{title}</h3>
        <p className="text-slate-500 mt-2">{message}</p>
    </div>
);

const AccordionItem: React.FC<{title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode}> = ({ title, isOpen, onClick, children }) => (
    <div className="border-b border-slate-200">
        <h2>
            <button type="button" onClick={onClick} className="flex justify-between items-center w-full py-4 px-2 font-medium text-left text-slate-700 hover:bg-slate-50">
                <span>{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </h2>
        {isOpen && (
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                {children}
            </div>
        )}
    </div>
);

const roleBadgeColors: Record<Role, string> = {
    [Role.Chef]: 'bg-orange-100 text-orange-800',
    [Role.Barista]: 'bg-amber-100 text-amber-800',
    [Role.Waiter]: 'bg-indigo-100 text-indigo-800',
    [Role.Host]: 'bg-rose-100 text-rose-800',
    [Role.KitchenStaff]: 'bg-slate-200 text-slate-800',
};


const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  users,
  shifts,
  websiteContent,
  notificationSettings,
  onUpdateUser,
  onDeleteUser,
  onDeleteShift,
  onEditUser,
  onContentChange,
  onNotificationSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'Shifts' | 'Job Seekers' | 'Businesses' | 'Content' | 'Settings'>('Shifts');
  
  // State for search and filters
  const [shiftSearch, setShiftSearch] = useState('');
  const [shiftStatusFilter, setShiftStatusFilter] = useState<ShiftStatus | 'All'>('All');
  const [seekerSearch, setSeekerSearch] = useState('');
  const [seekerRoleFilter, setSeekerRoleFilter] = useState<Role | 'All'>('All');
  const [businessSearch, setBusinessSearch] = useState('');

  // State for content editor
  const [editableContent, setEditableContent] = useState<WebsiteContent>(websiteContent);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // State for notification settings
  const [localNotificationSettings, setLocalNotificationSettings] = useState<NotificationSettings>(notificationSettings);

  useEffect(() => {
    setEditableContent(websiteContent);
  }, [websiteContent]);

  useEffect(() => {
    setLocalNotificationSettings(notificationSettings);
  }, [notificationSettings]);


  const jobSeekers = users.filter(u => u.userType === 'JobSeeker');
  const businesses = users.filter(u => u.userType === 'Business');

  const filteredShifts = useMemo(() => shifts.filter(shift => {
    const searchTerm = shiftSearch.toLowerCase();
    const searchMatch = shift.businessName.toLowerCase().includes(searchTerm) ||
                        shift.role.toLowerCase().includes(searchTerm) ||
                        shift.date.toLowerCase().includes(searchTerm);
    const statusMatch = shiftStatusFilter === 'All' || shift.status === shiftStatusFilter;
    return searchMatch && statusMatch;
  }), [shifts, shiftSearch, shiftStatusFilter]);

  const filteredJobSeekers = useMemo(() => jobSeekers.filter(user => {
    const searchTerm = seekerSearch.toLowerCase();
    const searchMatch = user.name.toLowerCase().includes(searchTerm) ||
                        (user.email && user.email.toLowerCase().includes(searchTerm));
    const roleMatch = seekerRoleFilter === 'All' || user.role === seekerRoleFilter;
    return searchMatch && roleMatch;
  }), [jobSeekers, seekerSearch, seekerRoleFilter]);

  const filteredBusinesses = useMemo(() => businesses.filter(user => {
    const searchTerm = businessSearch.toLowerCase();
    return user.name.toLowerCase().includes(searchTerm) || 
           (user.email && user.email.toLowerCase().includes(searchTerm));
  }
  ), [businesses, businessSearch]);


  const totalShiftValue = shifts.reduce((acc, shift) => {
    const start = new Date(`1970-01-01T${shift.startTime}:00`);
    const end = new Date(`1970-01-01T${shift.endTime}:00`);
    let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (diff < 0) diff += 24;
    return acc + (diff * shift.hourlyRate);
  }, 0);

  const statusCounts = shifts.reduce((acc, shift) => {
    acc[shift.status] = (acc[shift.status] || 0) + 1;
    return acc;
    // FIX: Changed Record<ShiftStatus, number> to Record<string, number>.
    // Record<Enum, Type> requires all enum members to be present as keys, which is not true for an empty initial object.
    // This was causing a type inference issue.
  }, {} as Record<string, number>);
  // FIX: Explicitly cast the result of `Object.values` to `number[]`. This is necessary to
  // resolve a type error where the values were inferred as `unknown`, which is not
  // assignable to the `number` parameters of `Math.max`.
  const maxStatusCount = Math.max(...Object.values(statusCounts) as number[], 0);
  
  const TableHeader: React.FC<{children: React.ReactNode}> = ({children}) => (
     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{children}</th>
  );
  
  const TableCell: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
      <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
  );

  const handleContentInputChange = (section: keyof WebsiteContent, field: string, value: string) => {
      setEditableContent(prev => ({
          ...prev,
          [section]: {
              // @ts-ignore
              ...prev[section],
              [field]: value,
          }
      }));
  };

  const handleValuePropChange = (userType: 'jobSeeker' | 'business', field: string, value: any) => {
    setEditableContent(prev => ({
        ...prev,
        valueProps: {
            ...prev.valueProps,
            [userType]: {
                ...prev.valueProps[userType],
                [field]: value
            }
        }
    }));
  };
  
  const handleSaveChanges = () => {
      onContentChange(editableContent);
      alert('Content saved!'); // Or use a more sophisticated notification
  };

  const handleNotificationSettingToggle = (setting: keyof NotificationSettings) => {
      setLocalNotificationSettings(prev => ({
          ...prev,
          [setting]: !prev[setting]
      }));
  };

  const handleSaveNotificationSettings = () => {
      onNotificationSettingsChange(localNotificationSettings);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-primary tracking-tighter mb-2">Admin Dashboard</h1>
      <p className="text-slate-500 mb-8">Oversee and manage all platform activity from one central hub.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={users.length} icon={<UsersIcon className="w-6 h-6 text-slate-500" />} />
        <StatCard title="Total Businesses" value={businesses.length} icon={<UsersIcon className="w-6 h-6 text-slate-500" />} />
        <StatCard title="Total Shifts" value={shifts.length} icon={<UsersIcon className="w-6 h-6 text-slate-500" />} />
        <StatCard title="Total Shift Value" value={`€${totalShiftValue.toFixed(2)}`} icon={<CurrencyEuroIcon className="w-6 h-6 text-slate-500" />} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-primary mb-4">Shift Status Distribution</h3>
            <div className="space-y-3">
                {Object.values(ShiftStatus).map(status => (
                    <div key={status} className="flex items-center gap-4">
                        <span className="font-semibold text-slate-600 w-24">{status}</span>
                        <div className="flex-grow bg-slate-100 rounded-full h-6">
                            <div 
                                className={`h-6 rounded-full ${
                                    status === 'Open' ? 'bg-green-500' :
                                    status === 'Filled' ? 'bg-blue-500' : 
                                    status === 'Completed' ? 'bg-slate-400' : 'bg-red-500'
                                }`}
                                style={{ width: `${((statusCounts[status] || 0) / (maxStatusCount || 1)) * 100}%` }}
                            ></div>
                        </div>
                        <span className="font-bold text-primary w-12 text-right">{statusCounts[status] || 0}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>


      <div>
        <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {(['Shifts', 'Job Seekers', 'Businesses', 'Content', 'Settings'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                            ? 'border-accent text-accent'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                    >
                        {tab === 'Shifts' && <DocumentMagnifyingGlassIcon className="w-5 h-5" />}
                        {tab === 'Job Seekers' && <UsersIcon className="w-5 h-5" />}
                        {tab === 'Businesses' && <UsersIcon className="w-5 h-5" />}
                        {tab === 'Content' && <PencilSquareIcon className="w-5 h-5" />}
                        {tab === 'Settings' && <Cog6ToothIcon className="w-5 h-5" />}
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        <div>
          {activeTab === 'Shifts' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-4">Manage Shifts ({filteredShifts.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                       <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                       <input 
                          type="text"
                          placeholder="Search by business, role, or date..."
                          value={shiftSearch}
                          onChange={e => setShiftSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent"
                       />
                  </div>
                  <select
                    value={shiftStatusFilter}
                    onChange={e => setShiftStatusFilter(e.target.value as ShiftStatus | 'All')}
                    className="w-full border border-slate-300 rounded-lg focus:ring-accent focus:border-accent bg-white"
                  >
                      <option value="All">All Statuses</option>
                      {Object.values(ShiftStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                      ))}
                  </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <TableHeader>Business</TableHeader>
                      <TableHeader>Role</TableHeader>
                      <TableHeader>Date & Time</TableHeader>
                      <TableHeader>Shift Value</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader><span className="sr-only">Actions</span></TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredShifts.length > 0 ? filteredShifts.map((shift) => (
                      <tr key={shift.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-900">{shift.businessName}</TableCell>
                        <TableCell className="text-slate-500">{shift.role}</TableCell>
                        <TableCell className="text-slate-500">{shift.date} @ {shift.startTime}</TableCell>
                        <TableCell className="text-slate-500 font-mono">€{(shift.hourlyRate * 8).toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              shift.status === 'Open' ? 'bg-green-100 text-green-800' :
                              shift.status === 'Filled' ? 'bg-blue-100 text-blue-800' : 
                              shift.status === 'Completed' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {shift.status}
                          </span>
                        </TableCell>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button>
                            <button onClick={() => { if (window.confirm(`Delete shift for ${shift.businessName}?`)) { onDeleteShift(shift.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    )) : (
                        <tr>
                            <td colSpan={6}>
                                <EmptyState icon={<DocumentMagnifyingGlassIcon/>} title="No Shifts Found" message="There are no shifts that match your current search and filters." />
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Job Seekers' && (
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Manage Job Seekers ({filteredJobSeekers.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <div className="relative">
                       <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                       <input 
                          type="text"
                          placeholder="Search by name or email..."
                          value={seekerSearch}
                          onChange={e => setSeekerSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent"
                       />
                    </div>
                    <select
                        value={seekerRoleFilter}
                        onChange={e => setSeekerRoleFilter(e.target.value as Role | 'All')}
                        className="w-full border border-slate-300 rounded-lg focus:ring-accent focus:border-accent bg-white"
                    >
                        <option value="All">All Roles</option>
                        {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Total Earned</TableHeader>
                                <TableHeader><span className="sr-only">Actions</span></TableHeader>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-slate-200">
                            {filteredJobSeekers.length > 0 ? filteredJobSeekers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <TableCell>
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                                            <div className="ml-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                                    {user.name}
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleBadgeColors[user.role] || 'bg-slate-100 text-slate-800'}`}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 font-mono">€{user.totalEarnings?.toFixed(2) || '0.00'}</TableCell>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => onEditUser(user)} className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button>
                                        <button onClick={() => { if (window.confirm(`Delete ${user.name}?`)) { onDeleteUser(user.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3}>
                                        <EmptyState icon={<UsersIcon/>} title="No Job Seekers Found" message="There are no job seekers that match your current search and filters." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

          {activeTab === 'Businesses' && (
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Manage Businesses ({filteredBusinesses.length})</h2>
                <div className="grid grid-cols-1 mb-4">
                     <div className="relative">
                       <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                       <input 
                          type="text"
                          placeholder="Search by name or email..."
                          value={businessSearch}
                          onChange={e => setBusinessSearch(e.target.value)}
                          className="w-full md:w-1/2 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent"
                       />
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Rating</TableHeader>
                                <TableHeader><span className="sr-only">Actions</span></TableHeader>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-slate-200">
                           {filteredBusinesses.length > 0 ? filteredBusinesses.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <TableCell>
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                                <div className="text-sm text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500">{user.rating.toFixed(1)} ({user.reviewCount} reviews)</TableCell>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => onEditUser(user)} className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button>
                                        <button onClick={() => { if (window.confirm(`Delete ${user.name}?`)) { onDeleteUser(user.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3}>
                                         <EmptyState icon={<UsersIcon/>} title="No Businesses Found" message="There are no businesses that match your current search." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

          {activeTab === 'Content' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Manage Website Content</h2>
                <div className="space-y-4">
                    <AccordionItem title="Homepage Hero" isOpen={openAccordion === 'hero'} onClick={() => setOpenAccordion(openAccordion === 'hero' ? null : 'hero')}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={editableContent.hero.title} onChange={e => handleContentInputChange('hero', 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                                <textarea value={editableContent.hero.subtitle} onChange={e => handleContentInputChange('hero', 'subtitle', e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <button onClick={handleSaveChanges} className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover">Save Changes</button>
                        </div>
                    </AccordionItem>
                    <AccordionItem title="Value Propositions" isOpen={openAccordion === 'valueProps'} onClick={() => setOpenAccordion(openAccordion === 'valueProps' ? null : 'valueProps')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Seeker */}
                            <div className="space-y-4 p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-primary">For Job Seekers</h4>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Title</label>
                                    <input type="text" value={editableContent.valueProps.jobSeeker.title} onChange={e => handleValuePropChange('jobSeeker', 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                                    <input type="text" value={editableContent.valueProps.jobSeeker.subtitle} onChange={e => handleValuePropChange('jobSeeker', 'subtitle', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Benefits (one per line)</label>
                                    <textarea value={editableContent.valueProps.jobSeeker.benefits.join('\n')} onChange={e => handleValuePropChange('jobSeeker', 'benefits', e.target.value.split('\n'))} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                            </div>
                            {/* Business */}
                             <div className="space-y-4 p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-primary">For Businesses</h4>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Title</label>
                                    <input type="text" value={editableContent.valueProps.business.title} onChange={e => handleValuePropChange('business', 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                                    <input type="text" value={editableContent.valueProps.business.subtitle} onChange={e => handleValuePropChange('business', 'subtitle', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Benefits (one per line)</label>
                                    <textarea value={editableContent.valueProps.business.benefits.join('\n')} onChange={e => handleValuePropChange('business', 'benefits', e.target.value.split('\n'))} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                         <button onClick={handleSaveChanges} className="mt-4 bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover">Save Changes</button>
                    </AccordionItem>
                    <AccordionItem title="App Download Section" isOpen={openAccordion === 'appDownload'} onClick={() => setOpenAccordion(openAccordion === 'appDownload' ? null : 'appDownload')}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Title</label>
                                <input type="text" value={editableContent.appDownload.title} onChange={e => handleContentInputChange('appDownload', 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                                <textarea value={editableContent.appDownload.subtitle} onChange={e => handleContentInputChange('appDownload', 'subtitle', e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <button onClick={handleSaveChanges} className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover">Save Changes</button>
                        </div>
                    </AccordionItem>
                </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h2 className="text-2xl font-bold text-primary mb-4">Notification Settings</h2>
                 <div className="space-y-6">
                    <div className="p-4 border border-slate-200 rounded-lg">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <p className="font-medium text-slate-800">Email on Profile Update</p>
                                <p className="text-sm text-slate-500">Send an email to users when their profile is updated by an admin.</p>
                            </div>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={localNotificationSettings.emailOnProfileUpdate} onChange={() => handleNotificationSettingToggle('emailOnProfileUpdate')} />
                                <div className={`block w-14 h-8 rounded-full ${localNotificationSettings.emailOnProfileUpdate ? 'bg-accent' : 'bg-slate-300'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${localNotificationSettings.emailOnProfileUpdate ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                        <label className="flex items-center justify-between cursor-pointer">
                             <div>
                                <p className="font-medium text-slate-800">Email on Application Status Change</p>
                                <p className="text-sm text-slate-500">Send an email when a job seeker is accepted or rejected for a shift.</p>
                            </div>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={localNotificationSettings.emailOnApplicationStatusChange} onChange={() => handleNotificationSettingToggle('emailOnApplicationStatusChange')} />
                                <div className={`block w-14 h-8 rounded-full ${localNotificationSettings.emailOnApplicationStatusChange ? 'bg-accent' : 'bg-slate-300'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${localNotificationSettings.emailOnApplicationStatusChange ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleSaveNotificationSettings} className="bg-primary text-white font-bold px-6 py-2 rounded-md hover:bg-slate-800 transition-colors">
                            Save Settings
                        </button>
                    </div>
                 </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;