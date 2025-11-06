
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AvailabilityPost, User, Role, AvailabilityType, availabilityTypes } from '../types';
import { StarIcon, LocationIcon, BriefcaseIcon, ChevronDownIcon, ListBulletIcon } from './Icons';

const roleBadges: Record<Role, { emoji: string; classes: string; }> = {
    [Role.Chef]: { emoji: '👨‍🍳', classes: 'bg-orange-100 text-orange-800' },
    [Role.Barista]: { emoji: '☕️', classes: 'bg-amber-100 text-amber-800' },
    [Role.Waiter]: { emoji: '🤵', classes: 'bg-blue-100 text-blue-800' },
    [Role.Host]: { emoji: '👋', classes: 'bg-rose-100 text-rose-800' },
    [Role.KitchenStaff]: { emoji: '🔪', classes: 'bg-slate-200 text-slate-800' },
};

const lookingForBadgeClasses: Record<string, string> = {
    'Single Shifts': 'bg-slate-100 text-slate-800',
    'Part-time Job': 'bg-purple-100 text-purple-800',
    'Full-time Job': 'bg-green-100 text-green-800',
};

interface AvailabilityPostCardProps {
  post: AvailabilityPost;
  user: User;
  currentUser: User | null;
  isLoggedIn: boolean;
  onContact: (userId: string) => void;
  onHire: (userId: string) => void;
  onHireUnauthenticated: () => void;
}

const AvailabilityPostCard: React.FC<AvailabilityPostCardProps> = ({ post, user, currentUser, isLoggedIn, onContact, onHire, onHireUnauthenticated }) => {
  const isBusiness = isLoggedIn && currentUser?.userType === 'Business';

  const timeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 60) return `posted just now`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `posted ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `posted ${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days >= 3) return `posted 3d+ ago`;
    return `posted ${days}d ago`;
  };

  const badge = post.roles[0] ? roleBadges[post.roles[0]] : null;
  
  const rolesText = post.roles.map(role => {
    const emojiInfo = {
        [Role.Waiter]: '🍽️',
        [Role.Barista]: '☕',
        [Role.KitchenStaff]: '👨‍🍳',
        [Role.Chef]: '👨‍🍳',
        [Role.Host]: '👋',
    };
    return `${emojiInfo[role] || '💼'} ${role}`;
  }).join(' | ');

  const lookingForSpans = post.lookingFor.map((lf, index) => (
    <React.Fragment key={lf}>
      <span className="font-bold text-indigo-600">{lf}</span>
      {index < post.lookingFor.length - 1 && ' or '}
    </React.Fragment>
  ));

  const daysText = post.availableDays.length === 7 ? 'Any day of the week' : post.availableDays.join(', ');
  const timesText = post.availableTimes.join(', ');

  const languagesSpans = post.languages.map((lang, index) => (
    <React.Fragment key={lang}>
        {lang}
        {index < post.languages.length - 1 && <span className="mx-1 text-slate-400">|</span>}
    </React.Fragment>
  ));


  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                <p className="font-bold text-lg text-primary">{user.name}</p>
                 {badge && (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${badge.classes}`}>
                    {badge.emoji}
                    <span className="ml-1.5">{post.roles[0]}</span>
                    </span>
                )}
                {post.lookingFor.map(type => (
                    <span key={type} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${lookingForBadgeClasses[type] || 'bg-slate-100 text-slate-800'}`}>
                    {type}
                    </span>
                ))}
                <div className="flex items-center gap-1 text-amber-500">
                  <StarIcon className="w-4 h-4" />
                  <span className="font-bold text-sm">{user.rating.toFixed(1)} / 5</span>
                  <span className="text-slate-500 text-xs ml-1">({user.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center text-slate-500 text-sm mt-2">
                {user.location && (
                  <>
                    <LocationIcon className="w-4 h-4 mr-1" />
                    <span>{user.location}</span>
                    <span className="mx-2">&bull;</span>
                  </>
                )}
                <span>{timeAgo(post.postedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            {isBusiness && (
              <>
                <button onClick={() => onContact(user.id)} className="bg-white text-primary border border-primary font-bold py-2 px-4 rounded-full hover:bg-slate-50 transition-colors text-sm w-full">
                  Contact Me
                </button>
                <button onClick={() => onHire(user.id)} className="bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-accent-hover transition-colors text-sm w-full">
                  Hire Me
                </button>
              </>
            )}
            {!isLoggedIn && (
              <button onClick={onHireUnauthenticated} className="bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-accent-hover transition-colors text-sm w-full">
                Hire Me
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 text-slate-700 leading-relaxed border-t border-slate-200 pt-4">
            <p className="font-semibold text-primary text-base">{rolesText}</p>
            <p>
                <span className="mr-2">🔍</span>
                Looking for {lookingForSpans} opportunities in <span className="font-bold">{user.location?.split(',')[0]}</span>.
            </p>
            {post.experienceSummary && (
                <p>
                    <span className="mr-2">💼</span>
                    {post.experienceSummary}
                </p>
            )}
            <p>
                <span className="mr-2">🕒</span>
                Availability: <span className="font-semibold text-amber-600">{daysText} — {timesText}</span>.
            </p>
            {post.languages.length > 0 && (
                <p>
                    <span className="mr-2">🗣️</span>
                    Languages: <span className="font-semibold">{languagesSpans}</span>
                </p>
            )}
            {post.notes && (
                <p>
                    <span className="mr-2">🚀</span>
                    {post.notes}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

interface AvailabilityViewProps {
  availabilityPosts: AvailabilityPost[];
  allUsers: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  onPostAvailabilityClick: () => void;
  onContactTalent: (userId: string) => void;
  onHireTalent: (userId: string) => void;
  onHireUnauthenticated: () => void;
}

const FilterDropdown: React.FC<{
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


const AvailabilityView: React.FC<AvailabilityViewProps> = ({
  availabilityPosts,
  allUsers,
  currentUser,
  isLoggedIn,
  onPostAvailabilityClick,
  onContactTalent,
  onHireTalent,
  onHireUnauthenticated,
}) => {
  const isJobSeeker = isLoggedIn && currentUser?.userType === 'JobSeeker';

  const [filterRole, setFilterRole] = useState<Role | 'All'>('All');
  const [filterJobType, setFilterJobType] = useState<AvailabilityType | 'All'>('All');

  const filteredPosts = useMemo(() => {
    return availabilityPosts.filter(post => {
        const roleMatch = filterRole === 'All' || post.roles.includes(filterRole);
        const jobTypeMatch = filterJobType === 'All' || post.lookingFor.includes(filterJobType);
        return roleMatch && jobTypeMatch;
    });
  }, [availabilityPosts, filterRole, filterJobType]);

  const roles = ['All', ...Object.values(Role)];
  const jobTypes = ['All', ...availabilityTypes];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Find Talent</h2>
          <p className="text-slate-600 mt-1">Browse posts from skilled professionals ready for their next shift.</p>
        </div>
        {isJobSeeker && (
          <button
            onClick={onPostAvailabilityClick}
            className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full md:w-auto"
          >
            Post Your Availability
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <FilterDropdown title="Role" items={roles} selected={filterRole} onSelect={(role) => setFilterRole(role as Role | 'All')} icon={<BriefcaseIcon className="w-5 h-5" />} />
          <FilterDropdown title="Looking For" items={jobTypes} selected={filterJobType} onSelect={(type) => setFilterJobType(type as AvailabilityType | 'All')} icon={<ListBulletIcon className="w-5 h-5" />} />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => {
            const user = allUsers.find(u => u.id === post.userId);
            if (!user) return null;
            return (
              <AvailabilityPostCard
                key={post.id}
                post={post}
                user={user}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                onContact={onContactTalent}
                onHire={onHireTalent}
                onHireUnauthenticated={onHireUnauthenticated}
              />
            );
          })
        ) : (
           <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary">No Talent Found</h3>
                <p className="text-slate-500 mt-2">No available professionals match your current filters. Try broadening your search!</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityView;
