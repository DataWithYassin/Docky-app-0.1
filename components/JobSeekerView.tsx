

import React, { useState, useMemo } from 'react';
import { User, Shift, ShiftStatus, View, Application, ApplicationStatus, Job, SavedSearch, SavedSearchFilters, RoleDetail } from '../types';
import { DocumentTextIcon, CalendarIcon, TrendingUpIcon, CheckCircleIcon, XCircleIcon, ClockIcon, BriefcaseIcon, BookmarkIcon, BookmarkSlashIcon, BellIcon } from './Icons';
import CalendarView from './CalendarView';

interface JobSeekerViewProps {
    user: User;
    shifts: Shift[];
    jobs: Job[];
    savedSearches: SavedSearch[];
    onNavigate: (view: View) => void;
    onApply: (shiftId: string) => void;
    isLoggedIn: boolean;
    onConfirmShift: (shiftId: string) => void;
    onOpenChat: (shiftId: string) => void;
    onDeleteSearch: (searchId: string) => void;
    onApplySavedSearch: (filters: SavedSearchFilters) => void;
    roleDetails: RoleDetail[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-slate-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
    </div>
);

const AppliedShiftCard: React.FC<{ shift: Shift; application: Application; onConfirm: () => void; onChat: () => void; }> = ({ shift, application, onConfirm, onChat }) => {
    const statusInfo = {
        [ApplicationStatus.Pending]: { text: 'Pending', classes: 'bg-yellow-100 text-yellow-800', icon: <ClockIcon className="w-4 h-4" /> },
        [ApplicationStatus.Accepted]: { text: 'Accepted', classes: 'bg-green-100 text-green-800', icon: <CheckCircleIcon className="w-4 h-4" /> },
        [ApplicationStatus.Rejected]: { text: 'Not Selected', classes: 'bg-red-100 text-red-800', icon: <XCircleIcon className="w-4 h-4" /> },
        [ApplicationStatus.Confirmed]: { text: 'Confirmed', classes: 'bg-blue-100 text-blue-800', icon: <CheckCircleIcon className="w-4 h-4" /> },
    };

    const currentStatus = statusInfo[application.status];

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <img src={shift.businessLogo} alt={shift.businessName} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-bold text-primary">{shift.role} at {shift.businessName}</p>
                        <p className="text-sm text-slate-500">{shift.date} &bull; {shift.startTime} - {shift.endTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${currentStatus.classes}`}>
                        {currentStatus.icon}
                        {currentStatus.text}
                    </span>
                    {(application.status === ApplicationStatus.Accepted || application.status === ApplicationStatus.Confirmed) && (
                         <button onClick={onChat} className="bg-primary text-white font-bold text-xs py-1.5 px-3 rounded-full hover:bg-slate-800">
                           Chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
    <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
                <img src={job.businessLogo} alt={job.businessName} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold text-primary">{job.role} at {job.businessName}</p>
                    <p className="text-sm text-slate-500">Starts: {job.startDate} &bull; €{job.hourlyRate}/hr</p>
                    <p className="text-sm text-slate-500 font-semibold">{job.workDays.join(', ')}</p>
                </div>
            </div>
            <button className="bg-primary text-white font-bold text-xs py-1.5 px-3 rounded-full hover:bg-slate-800">
                View Details
            </button>
        </div>
    </div>
);

const SavedSearchCard: React.FC<{ search: SavedSearch; onDelete: (id: string) => void; onApply: (filters: SavedSearchFilters) => void; }> = ({ search, onDelete, onApply }) => {
    const generateFilterSummary = (filters: SavedSearchFilters): string => {
        const parts = [];
        if (filters.postType !== 'All') parts.push(filters.postType);
        if (filters.roles.length > 0) parts.push(filters.roles.join(', '));
        if (filters.cities.length > 0) parts.push(`in ${filters.cities.join(', ')}`);
        else if (filters.userLocation) parts.push(`near you (${filters.searchRadius}km)`);
        if (filters.time !== 'All') parts.push(`${filters.time} shifts`);
    
        return parts.length > 0 ? parts.join(' | ') : 'All Jobs & Shifts';
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-primary text-lg">{search.name}</p>
                        {/* FIX: The 'title' prop is not a valid prop for the BellIcon component. The icon has been wrapped in a span to apply the tooltip correctly. */}
                        {search.notificationsEnabled && <span title="Notifications enabled"><BellIcon className="w-5 h-5 text-accent" /></span>}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{generateFilterSummary(search.filters)}</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                    <button onClick={() => onApply(search.filters)} className="bg-slate-100 text-slate-700 font-bold text-xs py-1.5 px-3 rounded-full hover:bg-slate-200">
                        Apply Search
                    </button>
                    <button onClick={() => onDelete(search.id)} className="text-slate-400 hover:text-red-500 p-1">
                        <BookmarkSlashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


const JobSeekerView: React.FC<JobSeekerViewProps> = ({ user, shifts, jobs, savedSearches, onNavigate, onApply, isLoggedIn, onConfirmShift, onOpenChat, onDeleteSearch, onApplySavedSearch, roleDetails }) => {
    const [activeTab, setActiveTab] = useState<'Dashboard' | 'My Applications' | 'Saved Searches' | 'My Jobs'>('Dashboard');
    const [calendarDate, setCalendarDate] = useState(new Date());

    const stats = useMemo(() => {
        const applied = user.applications?.length || 0;
        const confirmed = user.applications?.filter(app => app.status === ApplicationStatus.Confirmed).length || 0;
        const totalEarnings = user.totalEarnings || 0;
        return { applied, confirmed, totalEarnings };
    }, [user]);
    
    const userShifts = useMemo(() => {
        return user.applications
            ?.map(app => {
                if (!app.shiftId) return null;
                const shift = shifts.find(s => s.id === app.shiftId);
                return shift ? { shift, status: app.status } : null;
            })
            .filter(Boolean)
            .filter(item => item !== null) as { shift: Shift, status: ApplicationStatus }[];
    }, [user.applications, shifts]);

    const userJobs = useMemo(() => {
        return user.applications
            ?.map(app => {
                if (!app.jobId) return null;
                return jobs.find(j => j.id === app.jobId);
            })
            .filter(Boolean) as Job[];
    }, [user.applications, jobs]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-primary tracking-tighter">Welcome, {user.name.split(' ')[0]}!</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">This is your personal dashboard. Manage your applications, view your schedule, and track your earnings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Applications Sent" value={stats.applied} icon={<DocumentTextIcon className="w-6 h-6 text-slate-500" />} />
        <StatCard title="Shifts Confirmed" value={stats.confirmed} icon={<CalendarIcon className="w-6 h-6 text-slate-500" />} />
        <StatCard title="Total Earnings" value={`€${stats.totalEarnings.toFixed(2)}`} icon={<TrendingUpIcon className="w-6 h-6 text-slate-500" />} />
      </div>
      
      <div>
        <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                 {(['Dashboard', 'My Applications', 'My Jobs', 'Saved Searches'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                            ? 'border-accent text-accent'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                    >
                         {tab === 'Dashboard' && <CalendarIcon className="w-5 h-5" />}
                         {tab === 'My Applications' && <DocumentTextIcon className="w-5 h-5" />}
                         {tab === 'My Jobs' && <BriefcaseIcon className="w-5 h-5" />}
                         {tab === 'Saved Searches' && <BookmarkIcon className="w-5 h-5" />}
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        <div>
            {activeTab === 'Dashboard' && (
                <CalendarView userShifts={userShifts} currentDate={calendarDate} onDateChange={setCalendarDate} />
            )}
            {activeTab === 'My Applications' && (
                <div className="space-y-4">
                    {userShifts.length > 0 ? userShifts
                        .sort((a,b) => new Date(b.shift.date).getTime() - new Date(a.shift.date).getTime())
                        .map(({ shift, status }) => (
                            <AppliedShiftCard 
                                key={shift.id} 
                                shift={shift} 
                                application={{shiftId: shift.id, status}}
                                onConfirm={() => onConfirmShift(shift.id)} 
                                onChat={() => onOpenChat(shift.id)}
                            />
                        )) : (
                        <p className="text-center text-slate-500 py-8">You haven't applied to any shifts yet.</p>
                    )}
                </div>
            )}
            {activeTab === 'My Jobs' && (
                 <div className="space-y-4">
                    {userJobs.length > 0 ? userJobs.map(job => <JobCard key={job.id} job={job} />) : (
                        <p className="text-center text-slate-500 py-8">You are not currently hired for any part-time jobs.</p>
                    )}
                 </div>
            )}
            {activeTab === 'Saved Searches' && (
                <div className="space-y-4">
                    {savedSearches.length > 0 ? savedSearches.map(search => (
                        <SavedSearchCard key={search.id} search={search} onDelete={onDeleteSearch} onApply={onApplySavedSearch} />
                    )) : (
                         <p className="text-center text-slate-500 py-8">You haven't saved any searches yet.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerView;