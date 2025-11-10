import React, { useMemo, useState } from 'react';
import { Shift, User, Role, ShiftStatus } from '../types';
import { ChartBarIcon, CurrencyEuroIcon, LocationIcon, BriefcaseIcon, UsersIcon, CheckCircleIcon, CalendarIcon, ClockIcon, SparklesIcon, TrendingUpIcon, ChevronDownIcon } from './Icons';

interface InsightsViewProps {
  shifts: Shift[];
  users: User[];
}

const CompactStatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4 flex-1">
        <div className="bg-slate-100 p-3 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-primary">{value}</p>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
        </div>
    </div>
);

const AccordionItem: React.FC<{title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode}> = ({ title, isOpen, onClick, children, icon }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h2>
            <button type="button" onClick={onClick} className="flex justify-between items-center w-full p-6 font-semibold text-left text-primary hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-3 rounded-full">
                        {icon}
                    </div>
                    <span className="text-xl">{title}</span>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </h2>
        {isOpen && (
            <div className="p-6 bg-white border-t border-slate-200">
                {children}
            </div>
        )}
    </div>
);


const InsightsView: React.FC<InsightsViewProps> = ({ shifts, users }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('roles');

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

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
      <div className="bg-white/80 backdrop-blur-md shadow-sm rounded-xl p-8 mb-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-primary tracking-tighter">Market Insights</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Discover trends in the on-demand shift market to make smarter decisions.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CompactStatCard title="Active Job Seekers" value={platformStats.jobSeekers} icon={<UsersIcon className="w-6 h-6 text-primary" />} />
        <CompactStatCard title="Registered Businesses" value={platformStats.businesses} icon={<BriefcaseIcon className="w-6 h-6 text-primary" />} />
        <CompactStatCard title="Completed Shifts" value={platformStats.completedShifts} icon={<CheckCircleIcon className="w-6 h-6 text-primary" />} />
        <CompactStatCard title="Completion Rate" value={`${completionRate.toFixed(0)}%`} icon={<TrendingUpIcon className="w-6 h-6 text-primary" />} />
      </div>

      <div className="space-y-4">
        <AccordionItem 
            title="Role & Financial Insights" 
            isOpen={openAccordion === 'roles'} 
            onClick={() => toggleAccordion('roles')}
            icon={<CurrencyEuroIcon className="w-6 h-6 text-slate-500" />}
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-lg text-slate-800 mb-4">Average Hourly Rate by Role</h4>
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
                </div>
                <div className="space-y-8">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4">Most In-Demand Roles</h4>
                        <ul className="space-y-3">
                            {roleDemand.map(({ role, count }, index) => (
                                <li key={role} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center"><span className="text-lg font-bold text-slate-400 w-8">{index + 1}.</span><span className="font-semibold text-primary">{role}</span></div>
                                    <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4">Most Common Requirements</h4>
                        <ul className="space-y-3">
                            {topRequirements.map(({ name, count }) => (
                                 <li key={name} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <span className="font-semibold text-primary">{name}</span>
                                    <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} times</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AccordionItem>

        <AccordionItem 
            title="Time & Location Insights" 
            isOpen={openAccordion === 'time'} 
            onClick={() => toggleAccordion('time')}
            icon={<LocationIcon className="w-6 h-6 text-slate-500" />}
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-lg text-slate-800 mb-4">Peak Hiring Days</h4>
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
                </div>
                <div className="space-y-8">
                     <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4">Busiest Shift Times</h4>
                        <ul className="space-y-3">
                            {busiestTimes.map(({ time, count }) => (
                                 <li key={time} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <span className="font-semibold text-primary">{time}</span>
                                    <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-4">Top Hiring Locations</h4>
                        <ul className="space-y-3">
                            {topLocations.map(({ location, count }, index) => (
                                 <li key={location} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center"><span className="text-lg font-bold text-slate-400 w-8">{index + 1}.</span><span className="font-semibold text-primary">{location}</span></div>
                                    <span className="font-bold text-accent bg-cyan-100 px-2 py-0.5 rounded-full text-sm">{count} shifts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AccordionItem>
      </div>
    </div>
  );
};

export default InsightsView;