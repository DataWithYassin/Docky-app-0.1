import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Shift, Role, User, Job } from '../types';
import ShiftCard from './ShiftCard';
import JobCard from './JobCard';
import { BriefcaseIcon, LocationIcon, ClockIcon, ChevronDownIcon, CalendarIcon, XCircleIcon } from './Icons';

interface WorkerViewProps {
  shifts: Shift[];
  jobs: Job[];
  onApply: (shiftId: string) => void;
  onApplyForJob: (jobId: string) => void;
  isLoggedIn: boolean;
  user: User | null;
}

type ShiftTime = 'All' | 'Morning' | 'Afternoon' | 'Evening';

const FilterDropdown: React.FC<{
  title: string;
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  icon: React.ReactNode;
}> = ({ title, items, selected, onSelect, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-slate-100 rounded-lg text-left focus:outline-none ring-2 ring-transparent transition-all ${isOpen ? 'ring-accent' : 'hover:ring-slate-300'}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
            <div className="text-slate-500">{icon}</div>
            <div>
                <span className="text-xs text-slate-500 font-semibold">{title}</span>
                <span className="block font-semibold text-primary">{selected}</span>
            </div>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl z-10 p-4 ring-1 ring-black ring-opacity-5">
          <div className="flex flex-wrap gap-2">
            {items.map(item => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selected === item 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const WorkerView: React.FC<WorkerViewProps> = ({ shifts, jobs, onApply, onApplyForJob, isLoggedIn, user }) => {
  const [filterRole, setFilterRole] = useState<Role | 'All'>('All');
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterTime, setFilterTime] = useState<ShiftTime>('All');
  const [filterDate, setFilterDate] = useState<string>('All'); // 'All' or 'YYYY-MM-DD'
  
  const availableShifts = useMemo(() => shifts.filter(shift => shift.status === 'Open'), [shifts]);
  const availableJobs = useMemo(() => jobs.filter(job => !job.talentId), [jobs]);

  const getCityFromLocation = (location: string): string => {
    return location.split(', ').shift() || location;
  }

  const getShiftTimeCategory = (startTime: string): ShiftTime => {
    const hour = parseInt(startTime.split(':')[0], 10);
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  const filteredShifts = useMemo(() => {
    return availableShifts.filter(shift => {
      const roleMatch = filterRole === 'All' || shift.role === filterRole;
      const cityMatch = filterCity === 'All' || getCityFromLocation(shift.location) === filterCity;
      const timeMatch = filterTime === 'All' || getShiftTimeCategory(shift.startTime) === filterTime;
      const dateMatch = filterDate === 'All' || shift.date === filterDate;
      return roleMatch && cityMatch && timeMatch && dateMatch;
    });
  }, [availableShifts, filterRole, filterCity, filterTime, filterDate]);

  const sortedShifts = useMemo(() => {
    return [...filteredShifts].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }, [filteredShifts]);
  
  const filteredJobs = useMemo(() => {
    return availableJobs
      .filter(job => {
        const roleMatch = filterRole === 'All' || job.role === filterRole;
        const cityMatch = filterCity === 'All' || getCityFromLocation(job.location) === filterCity;
        return roleMatch && cityMatch;
      })
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }, [availableJobs, filterRole, filterCity]);

  const roles = [ 'All', ...Object.values(Role)];
  
  const cities = useMemo(() => {
    const allLocations = [...availableShifts.map(s => s.location), ...availableJobs.map(j => j.location)];
    return ['All', ...Array.from(new Set(allLocations.map(location => getCityFromLocation(location))))];
  }, [availableShifts, availableJobs]);

  const shiftTimes: ShiftTime[] = ['All', 'Morning', 'Afternoon', 'Evening'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Find Your Next Opportunity</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Browse part-time jobs and single shifts. Your next opportunity is just a click away.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <FilterDropdown title="Job Type" items={roles} selected={filterRole} onSelect={(role) => setFilterRole(role as Role | 'All')} icon={<BriefcaseIcon className="w-5 h-5" />} />
          <FilterDropdown title="City" items={cities} selected={filterCity} onSelect={setFilterCity} icon={<LocationIcon className="w-5 h-5" />} />
          <FilterDropdown title="Shift Time (for shifts)" items={shiftTimes} selected={filterTime} onSelect={(time) => setFilterTime(time as ShiftTime)} icon={<ClockIcon className="w-5 h-5" />} />
          <div className="relative w-full">
            <div className="w-full flex items-center justify-between px-4 py-3 bg-slate-100 rounded-lg text-left h-full">
                <div className="flex items-center gap-3 w-full">
                    <div className="text-slate-500"><CalendarIcon className="w-5 h-5" /></div>
                    <div className="w-full">
                        <label htmlFor="date-filter" className="text-xs text-slate-500 font-semibold">Date (for shifts)</label>
                        <div className="flex items-center justify-between">
                             <input
                                id="date-filter"
                                type="date"
                                value={filterDate === 'All' ? '' : filterDate}
                                onChange={(e) => setFilterDate(e.target.value || 'All')}
                                className="font-semibold text-primary bg-transparent focus:outline-none w-full appearance-none"
                                placeholder="dd/mm/yyyy"
                            />
                             {filterDate !== 'All' && (
                                <button onClick={() => setFilterDate('All')} className="text-slate-400 hover:text-slate-600">
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {filteredJobs.length > 0 && (
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-primary mb-6">Part-time Job Openings</h3>
                <div className="space-y-6">
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onApply={onApplyForJob}
                            isLoggedIn={isLoggedIn}
                            isApplied={user?.applications?.some(app => app.jobId === job.id) ?? false}
                            currentUser={user}
                        />
                    ))}
                </div>
            </div>
        )}

        <div>
             <h3 className="text-2xl font-bold text-primary mb-6">Available Single Shifts</h3>
            {sortedShifts.length > 0 ? (
                <div className="space-y-6">
                {sortedShifts.map(shift => (
                    <ShiftCard
                    key={shift.id}
                    shift={shift}
                    onApply={onApply}
                    isLoggedIn={isLoggedIn}
                    isApplied={user?.applications?.some(app => app.shiftId === shift.id) ?? false}
                    currentUser={user}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-primary">No Shifts Available</h3>
                    <p className="text-slate-500 mt-2">There are no open shifts matching your criteria. Please check back later!</p>
                </div>
            )}
        </div>
      </>
    </div>
  );
};

export default WorkerView;