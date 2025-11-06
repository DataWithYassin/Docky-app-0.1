import React from 'react';
import { User, Shift, ShiftStatus, View, Application, ApplicationStatus, Job } from '../types';
import { DocumentTextIcon, CalendarIcon, TrendingUpIcon, CheckCircleIcon, XCircleIcon, ClockIcon, BriefcaseIcon } from './Icons';

interface JobSeekerViewProps {
    user: User;
    shifts: Shift[];
    jobs: Job[];
    onNavigate: (view: View) => void;
    onApply: (shiftId: string) => void;
    isLoggedIn: boolean;
    onConfirmShift: (shiftId: string) => void;
    onOpenChat: (shiftId: string) => void;
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


const JobSeekerView: React.FC<JobSeekerViewProps> = ({ user, shifts, jobs, onNavigate, onApply, isLoggedIn, onConfirmShift, onOpenChat }) => {
    const userApplications = user.applications || [];
    // FIX: Use a type guard in the filter to ensure TypeScript correctly infers
    // that `shift` is not undefined in the subsequent `sort` and `map` operations.
    // This resolves the arithmetic operation error and allows removing non-null assertions.
    const appliedShifts = userApplications
        .map(app => ({
            application: app,
            shift: shifts.find(s => s.id === app.shiftId),
        }))
        .filter((item): item is { application: Application; shift: Shift } => !!item.shift) // Filter out any applications for shifts that don't exist
        .sort((a, b) => new Date(b.shift.postedAt).getTime() - new Date(a.shift.postedAt).getTime());

    const actionRequiredShifts = appliedShifts.filter(item => item.application.status === ApplicationStatus.Accepted);
    const otherAppliedShifts = appliedShifts.filter(item => item.application.status !== ApplicationStatus.Accepted);
    
    const userJobs = jobs.filter(job => job.talentId === user.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-slate-600 mt-1">Here's a summary of your activity. Let's find your next shift.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard 
                    title="Shifts Applied" 
                    value={userApplications.length || 0} 
                    icon={<DocumentTextIcon className="w-6 h-6 text-slate-600"/>} 
                />
                <StatCard 
                    title="Upcoming Shifts" 
                    value={userApplications.filter(a => a.status === ApplicationStatus.Confirmed).length} 
                    icon={<CalendarIcon className="w-6 h-6 text-slate-600"/>} 
                />
                <StatCard 
                    title="Total Earned" 
                    value={`€${user.totalEarnings?.toFixed(2) || '0.00'}`} 
                    icon={<TrendingUpIcon className="w-6 h-6 text-slate-600"/>} 
                />
            </div>

            {actionRequiredShifts.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-2xl font-bold text-amber-600 mb-4">Action Required</h3>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg space-y-4">
                        {actionRequiredShifts.map(({ shift, application }) => (
                            <div key={shift.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                <p className="text-amber-900">
                                    <span className="font-bold">Congratulations!</span> You've been accepted for the <span className="font-semibold">{shift.role}</span> shift at <span className="font-semibold">{shift.businessName}</span>.
                                </p>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <button onClick={() => onOpenChat(shift.id)} className="font-bold text-sm text-primary hover:underline">Chat with Business</button>
                                    <button onClick={() => onConfirmShift(shift.id)} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors text-sm">
                                        Confirm Shift
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-primary">Your Applied Shifts</h3>
                     <button
                        onClick={() => onNavigate('jobs')}
                        className="bg-accent text-white font-bold py-2 px-5 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105"
                    >
                        Find More Shifts
                    </button>
                </div>

                {otherAppliedShifts.length > 0 ? (
                    <div className="space-y-4">
                        {otherAppliedShifts.map(({ shift, application }) => (
                            <AppliedShiftCard
                                key={shift.id}
                                shift={shift}
                                application={application}
                                onConfirm={() => onConfirmShift(shift.id)}
                                onChat={() => onOpenChat(shift.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-primary">No Applied Shifts</h3>
                        <p className="text-slate-500 mt-2 mb-6">You haven't applied for any shifts yet. Start exploring opportunities now!</p>
                        <button
                            onClick={() => onNavigate('jobs')}
                            className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-slate-800 transition-transform duration-200 hover:scale-105"
                        >
                            Browse Jobs
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold text-primary mb-6">Your Part-time Jobs</h3>
                {userJobs.length > 0 ? (
                    <div className="space-y-4">
                        {userJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                        <div className="text-slate-400 w-16 h-16 mx-auto">
                            <BriefcaseIcon />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mt-4">No Part-time Jobs</h3>
                        <p className="text-slate-500 mt-2">You haven't been hired for any part-time positions yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSeekerView;