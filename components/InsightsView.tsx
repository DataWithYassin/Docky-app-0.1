import React, { useMemo } from 'react';
import { Shift, User, Role, ShiftStatus } from '../types';
import { ChartBarIcon, CurrencyEuroIcon, LocationIcon, BriefcaseIcon, UsersIcon, CheckCircleIcon, CalendarIcon, ClockIcon, SparklesIcon } from './Icons';

interface InsightsViewProps {
  shifts: Shift[];
  users: User[];
}

const InsightCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md flex flex-col ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary">{title}</h3>
        </div>
        <div className="flex-grow">
            {children}
        </div>
    </div>
);

const InsightsView: React.FC<InsightsViewProps> = ({ shifts, users }) => {

    const avgRatesByRole = useMemo(() => {
        const rateMap: { [key in Role]?: { total: number; count: number } } = {};

        shifts.forEach(shift => {
            if (!rateMap[shift.role]) {
                rateMap[shift.role] = { total: 0, count: 0 };
            }
            rateMap[shift.role]!.total += shift.hourlyRate;
            rateMap[shift.role]!.count += 1;
        });

        const result = Object.entries(rateMap).map(([role, data]) => ({
            role: role as Role,
            avgRate: data.total / data.count,
        }));

        return result.sort((a, b) => b.avgRate - a.avgRate);
    }, [shifts]);

    const maxAvgRate = Math.max(...avgRatesByRole.map(r => r.avgRate), 0);

    const roleDemand = useMemo(() => {
        const demandMap: { [key in Role]?: number } = {};
        shifts.forEach(shift => {
            demandMap[shift.role] = (demandMap[shift.role] || 0) + 1;
        });
        return Object.entries(demandMap)
            .map(([role, count]) => ({ role: role as Role, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Top 5
    }, [shifts]);

    const topLocations = useMemo(() => {
        const locationMap: { [key: string]: number } = {};
        const getCity = (location: string) => location.split(',')[0].trim();
        
        shifts.forEach(shift => {
            const city = getCity(shift.location);
            locationMap[city] = (locationMap[city] || 0) + 1;
        });

        return Object.entries(locationMap)
            .map(([location, count]) => ({ location, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [shifts]);
    
    const platformStats = useMemo(() => ({
        jobSeekers: users.filter(u => u.userType === 'JobSeeker').length,
        businesses: users.filter(u => u.userType === 'Business').length,
        completedShifts: shifts.filter(s => s.status === ShiftStatus.Completed).length,
    }), [users, shifts]);

    const completionRate = useMemo(() => {
        const completed = shifts.filter(s => s.status === ShiftStatus.Completed).length;
        const filled = shifts.filter(s => s.status === ShiftStatus.Filled).length;
        const totalClosed = completed + filled;
        return totalClosed > 0 ? (completed / totalClosed) * 100 : 0;
    }, [shifts]);
    
    const peakDays = useMemo(() => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayCounts = Array(7).fill(0);
        shifts.forEach(shift => {
            // Add T00:00:00 to ensure consistent date parsing across timezones
            const dayIndex = new Date(shift.date + 'T00:00:00').getDay();
            dayCounts[dayIndex]++;
        });
        return daysOfWeek.map((day, index) => ({ day, count: dayCounts[index] }));
    }, [shifts]);
    const maxDayCount = Math.max(...peakDays.map(d => d.count), 0);

    const busiestTimes = useMemo(() => {
        const counts = { Morning: 0, Afternoon: 0, Evening: 0 };
        shifts.forEach(shift => {
            const hour = parseInt(shift.startTime.split(':')[0], 10);
            if (hour < 12) counts.Morning++;
            else if (hour < 17) counts.Afternoon++;
            else counts.Evening++;
        });
        return Object.entries(counts).map(([time, count]) => ({ time, count })).sort((a, b) => b.count - a.count);
    }, [shifts]);

    const topRequirements = useMemo(() => {
        const reqMap: { [key: string]: number } = {};
        shifts.forEach(shift => {
            shift.requirements?.forEach(req => {
                reqMap[req] = (reqMap[req] || 0) + 1;
            });
        });
        return Object.entries(reqMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [shifts]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-primary tracking-tighter">Market Insights</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Discover trends in the on-demand shift market to make smarter decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Average Hourly Rate */}
        <InsightCard title="Average Hourly Rate by Role" icon={<CurrencyEuroIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-2">
            <div className="space-y-4">
                {avgRatesByRole.map(({ role, avgRate }) => (
                    <div key={role} className="flex items-center gap-4">
                        <span className="font-semibold text-slate-600 w-28 text-sm">{role}</span>
                        <div className="flex-grow bg-slate-100 rounded-full h-6 relative">
                            <div 
                                className="h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                style={{ width: `${(avgRate / maxAvgRate) * 100}%` }}
                            ></div>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white mix-blend-lighten">€{avgRate.toFixed(2)}/hr</span>
                        </div>
                    </div>
                ))}
            </div>
        </InsightCard>

        {/* Platform Stats */}
        <InsightCard title="Platform Statistics" icon={<ChartBarIcon className="w-6 h-6 text-slate-500" />}>
             <div className="space-y-5 pt-2">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg"><UsersIcon className="w-8 h-8 text-primary" /></div>
                    <div>
                        <p className="text-3xl font-bold text-primary">{platformStats.jobSeekers}</p>
                        <p className="text-slate-500 text-sm">Active Job Seekers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg"><BriefcaseIcon className="w-8 h-8 text-primary" /></div>
                    <div>
                        <p className="text-3xl font-bold text-primary">{platformStats.businesses}</p>
                        <p className="text-slate-500 text-sm">Registered Businesses</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg"><CheckCircleIcon className="w-8 h-8 text-primary" /></div>
                    <div>
                        <p className="text-3xl font-bold text-primary">{platformStats.completedShifts}</p>
                        <p className="text-slate-500 text-sm">Completed Shifts</p>
                    </div>
                </div>
            </div>
        </InsightCard>

        {/* Shift Completion Rate */}
        <InsightCard title="Shift Completion Rate" icon={<CheckCircleIcon className="w-6 h-6 text-slate-500" />}>
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-6xl font-extrabold text-green-500">{completionRate.toFixed(0)}%</p>
                <p className="text-slate-500 mt-2 text-center">of filled shifts were successfully completed.</p>
            </div>
        </InsightCard>

        {/* Most In-Demand Roles */}
        <InsightCard title="Most In-Demand Roles" icon={<BriefcaseIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-1">
            <ul className="space-y-3">
                {roleDemand.map(({ role, count }, index) => (
                    <li key={role} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center"><span className="text-lg font-bold text-slate-400 w-8">{index + 1}.</span><span className="font-semibold text-primary">{role}</span></div>
                        <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                    </li>
                ))}
            </ul>
        </InsightCard>
        
        {/* Top Hiring Locations */}
        <InsightCard title="Top Hiring Locations" icon={<LocationIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-1">
            <ul className="space-y-3">
                {topLocations.map(({ location, count }, index) => (
                     <li key={location} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center"><span className="text-lg font-bold text-slate-400 w-8">{index + 1}.</span><span className="font-semibold text-primary">{location}</span></div>
                        <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                    </li>
                ))}
            </ul>
        </InsightCard>
        
        {/* Peak Hiring Days */}
        <InsightCard title="Peak Hiring Days" icon={<CalendarIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-2">
            <div className="flex justify-between items-end h-full pt-4">
                {peakDays.map(({ day, count }) => (
                    <div key={day} className="flex flex-col items-center w-full">
                        <div className="text-sm font-bold text-primary">{count}</div>
                        <div className="w-4/5 h-32 bg-slate-100 rounded-t-lg relative">
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-400 to-orange-500 rounded-t-lg" style={{ height: `${(count / (maxDayCount || 1)) * 100}%` }}></div>
                        </div>
                        <div className="text-xs font-semibold text-slate-500 mt-1">{day}</div>
                    </div>
                ))}
            </div>
        </InsightCard>
        
        {/* Busiest Shift Times */}
        <InsightCard title="Busiest Shift Times" icon={<ClockIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-2">
             <ul className="space-y-3">
                {busiestTimes.map(({ time, count }) => (
                     <li key={time} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                        <span className="font-semibold text-primary">{time}</span>
                        <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                    </li>
                ))}
            </ul>
        </InsightCard>

        {/* Top Requirements */}
        <InsightCard title="Most Common Requirements" icon={<SparklesIcon className="w-6 h-6 text-slate-500" />} className="lg:col-span-2">
             <ul className="space-y-3">
                {topRequirements.map(({ name, count }) => (
                     <li key={name} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                        <span className="font-semibold text-primary">{name}</span>
                        <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} times</span>
                    </li>
                ))}
            </ul>
        </InsightCard>

      </div>
    </div>
  );
};

export default InsightsView;