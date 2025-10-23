import React, { useState } from 'react';
import { Shift, Role } from '../types';
import ShiftCard from './ShiftCard';
import { BriefcaseIcon, LocationIcon, ClockIcon } from './Icons';

interface WorkerViewProps {
  shifts: Shift[];
}

type ShiftTime = 'All' | 'Morning' | 'Afternoon' | 'Evening';

const WorkerView: React.FC<WorkerViewProps> = ({ shifts }) => {
  const [filterRole, setFilterRole] = useState<Role | 'All'>('All');
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterTime, setFilterTime] = useState<ShiftTime>('All');
  
  const availableShifts = shifts.filter(shift => shift.status === 'Open');

  const getCityFromLocation = (location: string): string => {
    return location.split(', ').shift() || location;
  }

  const getShiftTimeCategory = (startTime: string): ShiftTime => {
    const hour = parseInt(startTime.split(':')[0], 10);
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  const filteredShifts = availableShifts.filter(shift => {
    const roleMatch = filterRole === 'All' || shift.role === filterRole;
    const cityMatch = filterCity === 'All' || getCityFromLocation(shift.location) === filterCity;
    const timeMatch = filterTime === 'All' || getShiftTimeCategory(shift.startTime) === filterTime;
    return roleMatch && cityMatch && timeMatch;
  });

  const sortedShifts = filteredShifts.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  
  const roles = [ 'All', ...Object.values(Role)];
  const cities = ['All', ...Array.from(new Set(availableShifts.map(shift => getCityFromLocation(shift.location))))];
  const shiftTimes: ShiftTime[] = ['All', 'Morning', 'Afternoon', 'Evening'];

  const FilterTabs: React.FC<{title: string, items: string[], selected: string, onSelect: (item: string) => void, icon: React.ReactNode}> = ({title, items, selected, onSelect, icon}) => (
     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
            {icon}
            <span className="font-semibold text-primary">{title}:</span>
        </div>
        <div className="flex flex-wrap gap-2">
        {items.map(item => (
            <button
            key={item}
            onClick={() => onSelect(item)}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                selected === item
                ? 'bg-primary text-white shadow'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            >
            {item}
            </button>
        ))}
        </div>
    </div>
  );


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Find Your Next Shift</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Browse available shifts using the keyword tabs below. Your next opportunity is just a click away.</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-[80px] z-30">
        <div className="flex flex-col gap-4">
            <FilterTabs title="Job Types" items={roles} selected={filterRole} onSelect={(role) => setFilterRole(role as Role | 'All')} icon={<BriefcaseIcon className="w-5 h-5 text-slate-500" />} />
             <div className="border-t border-slate-200 -mx-4"></div>
            <FilterTabs title="Cities" items={cities} selected={filterCity} onSelect={setFilterCity} icon={<LocationIcon className="w-5 h-5 text-slate-500" />} />
             <div className="border-t border-slate-200 -mx-4"></div>
            <FilterTabs title="Shift Times" items={shiftTimes} selected={filterTime} onSelect={(time) => setFilterTime(time as ShiftTime)} icon={<ClockIcon className="w-5 h-5 text-slate-500" />} />
        </div>
      </div>

      {sortedShifts.length > 0 ? (
        <div className="space-y-6">
          {sortedShifts.map(shift => (
            <ShiftCard key={shift.id} shift={shift} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary">No Shifts Available</h3>
            <p className="text-slate-500 mt-2">There are no open shifts matching your criteria. Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default WorkerView;