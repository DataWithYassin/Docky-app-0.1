import React from 'react';
import { User, Shift, ShiftStatus } from '../types';
import { View } from '../App';
import { DocumentTextIcon, CalendarIcon, TrendingUpIcon } from './Icons';
import ShiftCard from './ShiftCard';

interface JobSeekerViewProps {
    user: User;
    shifts: Shift[];
    onNavigate: (view: View) => void;
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


const JobSeekerView: React.FC<JobSeekerViewProps> = ({ user, shifts, onNavigate }) => {
    // Filter shifts based on user's applications
    const appliedShifts = shifts.filter(s => user.appliedShifts?.includes(s.id));
    const upcomingShifts = appliedShifts.filter(s => s.status === ShiftStatus.Filled || s.status === ShiftStatus.Open); // Assume open shifts are still possibilities

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-slate-600 mt-1">Here's a summary of your activity. Let's find your next shift.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard 
                    title="Shifts Applied" 
                    value={user.appliedShifts?.length || 0} 
                    icon={<DocumentTextIcon className="w-6 h-6 text-slate-600"/>} 
                />
                <StatCard 
                    title="Upcoming Shifts" 
                    value={upcomingShifts.length} 
                    icon={<CalendarIcon className="w-6 h-6 text-slate-600"/>} 
                />
                <StatCard 
                    title="Total Earned" 
                    value={`€${user.totalEarnings?.toFixed(2) || '0.00'}`} 
                    icon={<TrendingUpIcon className="w-6 h-6 text-slate-600"/>} 
                />
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-primary">Your Upcoming & Applied Shifts</h3>
                     <button
                        onClick={() => onNavigate('jobs')}
                        className="bg-accent text-white font-bold py-2 px-5 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105"
                    >
                        Find More Shifts
                    </button>
                </div>

                {upcomingShifts.length > 0 ? (
                    <div className="space-y-6">
                    {upcomingShifts.map(shift => (
                        <ShiftCard key={shift.id} shift={shift} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-primary">No Upcoming Shifts</h3>
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
        </div>
    );
};

export default JobSeekerView;