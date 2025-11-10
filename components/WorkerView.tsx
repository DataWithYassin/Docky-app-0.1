
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Shift, Role, User, Job, SavedSearchFilters, RoleDetail } from '../types';
import ShiftCard from './ShiftCard';
import JobCard from './JobCard';
import { BriefcaseIcon, LocationIcon, ClockIcon, ChevronDownIcon, CalendarIcon, XCircleIcon, ListBulletIcon, CrosshairsIcon, BookmarkIcon, TagIcon, BellIcon } from './Icons';

type ShiftTime = 'All' | 'Morning' | 'Afternoon' | 'Evening';

const SaveSearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, notificationsEnabled: boolean) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [notifications, setNotifications] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, notifications);
    } else {
      alert('Please enter a name for your search.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Save Your Search</h2>
          <p className="text-sm text-slate-500">Name this search to easily access it later.</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="search-name" className="block text-sm font-medium text-slate-700">Search Name</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <TagIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Morning Barista Shifts"
                className="block w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="notifications"
                type="checkbox"
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="notifications" className="font-medium text-slate-700">Enable Job Alerts</label>
              <p className="text-slate-500">Get notified when new jobs match this search.</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 flex justify-end items-center space-x-3 rounded-b-lg">
          <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="bg-accent text-white font-bold px-4 py-2 rounded-md hover:bg-accent-hover transition-colors flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5"/>
            Save Search
          </button>
        </div>
      </div>
    </div>
  );
};


const SingleSelectFilterDropdown: React.FC<{
  title: string;
  items: readonly string[];
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
        className={`w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg text-left focus:outline-none ring-1 ring-slate-300 transition-all ${isOpen ? 'ring-accent ring-2' : 'hover:ring-slate-400'}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <div className="text-slate-500 flex-shrink-0">{icon}</div>
          <span className="font-semibold text-primary text-sm truncate">{selected === 'All' ? title : selected}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl z-10 p-2 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {items.map(item => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selected === item 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-slate-700 hover:bg-slate-100'
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

const MultiSelectFilterDropdown: React.FC<{
  title: string;
  items: readonly string[];
  selectedItems: Set<string>;
  onToggleItem: (item: string) => void;
  onClear: () => void;
  icon: React.ReactNode;
  isDisabled?: boolean;
}> = ({ title, items, selectedItems, onToggleItem, onClear, icon, isDisabled = false }) => {
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

  const displayValue = selectedItems.size > 0 ? `${title} (${selectedItems.size})` : title;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-left focus:outline-none ring-1 transition-all ${
            isDisabled 
                ? 'bg-slate-100 text-slate-500 cursor-not-allowed ring-slate-200' 
                : `bg-white ring-slate-300 ${isOpen ? 'ring-accent ring-2' : 'hover:ring-slate-400'}`
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <div className={`${isDisabled ? 'text-slate-400' : 'text-slate-500'} flex-shrink-0`}>{icon}</div>
          <span className={`font-semibold ${isDisabled ? 'text-slate-500' : 'text-primary'} text-sm truncate`}>{displayValue}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 ${isDisabled ? 'text-slate-400' : 'text-slate-500'} transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !isDisabled && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl z-10 p-2 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {items.map(item => (
              <label key={item} className="flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item)}
                  onChange={() => onToggleItem(item)}
                  className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          {selectedItems.size > 0 && (
            <div className="border-t border-slate-200 mt-2 pt-2 px-2">
                <button
                    onClick={() => { onClear(); }}
                    className="w-full text-center text-sm font-semibold text-accent hover:underline"
                >
                    Clear selection
                </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface WorkerViewProps {
  shifts: Shift[];
  jobs: Job[];
  onApply: (shiftId: string) => void;
  onApplyForJob: (jobId: string) => void;
  isLoggedIn: boolean;
  user: User | null;
  onSaveSearch: (name: string, filters: SavedSearchFilters, notificationsEnabled: boolean) => void;
  appliedFilters: SavedSearchFilters | null;
  onClearAppliedFilters: () => void;
  roleDetails: RoleDetail[];
}

const WorkerView: React.FC<WorkerViewProps> = ({ shifts, jobs, onApply, onApplyForJob, isLoggedIn, user, onSaveSearch, appliedFilters, onClearAppliedFilters, roleDetails }) => {
  const [postType, setPostType] = useState<'All' | 'Part-time Jobs' | 'Single Shifts'>('All');
  const [filterRoles, setFilterRoles] = useState<Set<string>>(new Set());
  const [filterCities, setFilterCities] = useState<Set<string>>(new Set());
  const [filterTime, setFilterTime] = useState<ShiftTime>('All');
  const [filterDate, setFilterDate] = useState<string>('All'); // 'All' or 'YYYY-MM-DD'
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(10); // default 10km
  const [isLocating, setIsLocating] = useState<boolean>(false);
  
  useEffect(() => {
    if (appliedFilters) {
        setPostType(appliedFilters.postType);
        setFilterRoles(new Set(appliedFilters.roles));
        setFilterCities(new Set(appliedFilters.cities));
        setFilterTime(appliedFilters.time);
        setFilterDate(appliedFilters.date);
        setUserLocation(appliedFilters.userLocation);
        setSearchRadius(appliedFilters.searchRadius);
        onClearAppliedFilters(); // Clear after applying to prevent re-application
    }
  }, [appliedFilters, onClearAppliedFilters]);

  const activeFilters = useMemo(() => {
    return filterRoles.size > 0 ||
           filterCities.size > 0 ||
           filterTime !== 'All' ||
           filterDate !== 'All' ||
           postType !== 'All' ||
           userLocation !== null;
  }, [filterRoles, filterCities, filterTime, filterDate, postType, userLocation]);

  const handleSaveSearch = (name: string, notificationsEnabled: boolean) => {
    const filters: SavedSearchFilters = {
        postType,
        roles: Array.from(filterRoles),
        cities: Array.from(filterCities),
        time: filterTime,
        date: filterDate,
        userLocation,
        searchRadius
    };
    onSaveSearch(name, filters, notificationsEnabled);
    setIsSaveModalOpen(false);
  };

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
  
  const handleRoleToggle = (role: Role) => {
    setFilterRoles(prev => {
        const newRoles = new Set(prev);
        if (newRoles.has(role)) {
            newRoles.delete(role);
        } else {
            newRoles.add(role);
        }
        return newRoles;
    });
  };

  const handleCityToggle = (city: string) => {
    setFilterCities(prev => {
        const newCities = new Set(prev);
        if (newCities.has(city)) {
            newCities.delete(city);
        } else {
            newCities.add(city);
        }
        return newCities;
    });
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setFilterCities(new Set()); // Clear city filter
                setIsLocating(false);
            },
            (error) => {
                console.error("Error getting location: ", error);
                alert("Could not retrieve your location. Please ensure location services are enabled in your browser and for this site.");
                setIsLocating(false);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  };

  const clearLocation = () => {
      setUserLocation(null);
  };

  const filteredItems = useMemo(() => {
    const filterFn = (item: Job | Shift) => {
        if (userLocation && item.coordinates) {
            const distance = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, item.coordinates.lat, item.coordinates.lon);
            if (distance > searchRadius) return false;
        } else if (userLocation === null) {
            const cityMatch = filterCities.size === 0 || filterCities.has(getCityFromLocation(item.location));
            if (!cityMatch) return false;
        }

        const roleMatch = filterRoles.size === 0 || filterRoles.has(item.role);
        if (!roleMatch) return false;

        if ('startTime' in item) { // It's a Shift
            const timeMatch = filterTime === 'All' || getShiftTimeCategory(item.startTime) === filterTime;
            const dateMatch = filterDate === 'All' || item.date === filterDate;
            return timeMatch && dateMatch;
        } else { // It's a Job
            // If a specific date is selected, jobs should not be shown as they don't occur on a single day.
            if (filterDate !== 'All') {
                return false;
            }
            return true;
        }
    };
    
    const jobs = (postType === 'All' || postType === 'Part-time Jobs') ? availableJobs.filter(filterFn) : [];
    const shifts = (postType === 'All' || postType === 'Single Shifts') ? availableShifts.filter(filterFn) : [];

    if (userLocation) {
        const sortByDistance = (a: Job | Shift, b: Job | Shift) => {
            const distA = a.coordinates ? getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, a.coordinates.lat, a.coordinates.lon) : Infinity;
            const distB = b.coordinates ? getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, b.coordinates.lat, b.coordinates.lon) : Infinity;
            return distA - distB;
        };
        jobs.sort(sortByDistance);
        shifts.sort(sortByDistance);
    } else {
        const sortByDate = (a: Job | Shift, b: Job | Shift) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        jobs.sort(sortByDate);
        shifts.sort(sortByDate);
    }
    
    return { jobsToShow: jobs, shiftsToShow: shifts };

  }, [availableShifts, availableJobs, postType, filterRoles, filterCities, filterTime, filterDate, userLocation, searchRadius]);

  const roles = roleDetails.map(r => r.name);
  const cities = useMemo(() => {
    const allLocations = [...availableShifts.map(s => s.location), ...availableJobs.map(j => j.location)];
    return [...Array.from(new Set(allLocations.map(location => getCityFromLocation(location))))];
  }, [availableShifts, availableJobs]);

  const shiftTimes: ShiftTime[] = ['All', 'Morning', 'Afternoon', 'Evening'];
  const jobTypes = ['All', 'Part-time Jobs', 'Single Shifts'];
  const radiusOptions = ['5 km', '10 km', '25 km', '50 km'];

  const { jobsToShow, shiftsToShow } = filteredItems;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Find Your Next Opportunity</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Browse part-time jobs and single shifts. Your next opportunity is just a click away.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:col-span-1 lg:sticky lg:top-24">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold text-primary mb-4">Filters</h3>
            <div className="grid grid-cols-1 gap-4">
              <SingleSelectFilterDropdown 
                title="Job Type" 
                items={jobTypes} 
                selected={postType} 
                onSelect={(type) => {
                    const newPostType = type as 'All' | 'Part-time Jobs' | 'Single Shifts';
                    setPostType(newPostType);
                    if (newPostType === 'Part-time Jobs') {
                        setFilterTime('All');
                        setFilterDate('All');
                    }
                }} 
                icon={<ListBulletIcon className="w-5 h-5" />} 
              />
              <MultiSelectFilterDropdown title="Role" items={roles} selectedItems={filterRoles} onToggleItem={(item) => handleRoleToggle(item as Role)} onClear={() => setFilterRoles(new Set())} icon={<BriefcaseIcon className="w-5 h-5" />} />
              <MultiSelectFilterDropdown title="City" items={cities} selectedItems={filterCities} onToggleItem={handleCityToggle} onClear={() => setFilterCities(new Set())} icon={<LocationIcon className="w-5 h-5" />} isDisabled={!!userLocation} />
              
              {!userLocation ? (
                <button onClick={handleUseMyLocation} disabled={isLocating} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-left focus:outline-none ring-1 ring-slate-300 transition-all hover:ring-slate-400 disabled:bg-slate-100 disabled:cursor-wait">
                  <CrosshairsIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="font-semibold text-primary text-sm truncate">{isLocating ? 'Locating...' : 'Find Near Me'}</span>
                </button>
              ) : (
                <div className="relative">
                    <SingleSelectFilterDropdown title="Radius" items={radiusOptions} selected={`${searchRadius} km`} onSelect={(item) => setSearchRadius(parseInt(item.split(' ')[0]))} icon={<LocationIcon className="w-5 h-5" />} />
                    <button onClick={clearLocation} className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:text-red-500 p-1 z-10">
                        <XCircleIcon className="w-5 h-5" />
                    </button>
                </div>
              )}
              
              {(postType === 'All' || postType === 'Single Shifts') && (
                <>
                  <SingleSelectFilterDropdown title="Shift Time" items={shiftTimes} selected={filterTime} onSelect={(time) => setFilterTime(time as ShiftTime)} icon={<ClockIcon className="w-5 h-5" />} />
                  <div className="relative w-full">
                    <div className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg text-left ring-1 ring-slate-300">
                        <div className="flex items-center gap-2 w-full">
                            <label htmlFor="date-filter" className="text-slate-500"><CalendarIcon className="w-5 h-5" /></label>
                            <div className="flex items-center justify-between w-full">
                                <input
                                    id="date-filter"
                                    type="date"
                                    value={filterDate === 'All' ? '' : filterDate}
                                    onChange={(e) => setFilterDate(e.target.value || 'All')}
                                    className="font-semibold text-primary bg-transparent focus:outline-none w-full appearance-none text-sm"
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
                </>
              )}
            </div>
            {isLoggedIn && user?.userType === 'JobSeeker' && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <button
                        onClick={() => setIsSaveModalOpen(true)}
                        disabled={!activeFilters}
                        title={!activeFilters ? 'Apply at least one filter to save a search' : 'Save current search criteria'}
                        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary bg-slate-200/50 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                        <BookmarkIcon className="w-5 h-5" />
                        Save Current Search
                    </button>
                </div>
            )}
          </div>
        </aside>

        <main className="lg:col-span-3">
          <>
            {jobsToShow.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-primary mb-6">Part-time Job Openings</h3>
                    <div className="space-y-6">
                        {jobsToShow.map(job => {
                            const application = user?.applications?.find(app => app.jobId === job.id);
                            const applicationStatus = application ? application.status : null;
                            const distance = userLocation && job.coordinates ? getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, job.coordinates.lat, job.coordinates.lon) : null;
                            return (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onApply={onApplyForJob}
                                    isLoggedIn={isLoggedIn}
                                    applicationStatus={applicationStatus}
                                    currentUser={user}
                                    distance={distance}
                                    roleDetails={roleDetails}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {shiftsToShow.length > 0 && (
                <div>
                     <h3 className="text-2xl font-bold text-primary mb-6">Available Single Shifts</h3>
                    <div className="space-y-6">
                    {shiftsToShow.map(shift => {
                        const distance = userLocation && shift.coordinates ? getDistanceFromLatLonInKm(userLocation.lat, userLocation.lon, shift.coordinates.lat, shift.coordinates.lon) : null;
                        return (
                            <ShiftCard
                                key={shift.id}
                                shift={shift}
                                onApply={onApply}
                                isLoggedIn={isLoggedIn}
                                isApplied={user?.applications?.some(app => app.shiftId === shift.id) ?? false}
                                currentUser={user}
                                distance={distance}
                                roleDetails={roleDetails}
                            />
                        );
                    })}
                    </div>
                </div>
            )}

            {jobsToShow.length === 0 && shiftsToShow.length === 0 && (
                 <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-primary">
                        {postType === 'Part-time Jobs' ? 'No Jobs Available' : postType === 'Single Shifts' ? 'No Shifts Available' : 'No Opportunities Found'}
                    </h3>
                    <p className="text-slate-500 mt-2">
                        {postType === 'Part-time Jobs' ? 'There are no part-time jobs matching your criteria. Please check back later!' :
                         postType === 'Single Shifts' ? 'There are no open shifts matching your criteria. Please check back later!' :
                         'There are no jobs or shifts matching your criteria. Try broadening your search filters!'}
                    </p>
                </div>
            )}
          </>
        </main>
      </div>

      <SaveSearchModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSaveSearch} />
    </div>
  );
};

export default WorkerView;