
import React from 'react';
import { Job, Role, User } from '../types';
import { LocationIcon, VerificationIcon, CheckCircleIcon, UsersIcon } from './Icons';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  isApplied: boolean;
  isLoggedIn: boolean;
  currentUser: User | null;
}

const roleBadges: Record<Role, { emoji: string; classes: string; }> = {
    [Role.Chef]: { emoji: '👨‍🍳', classes: 'bg-orange-100 text-orange-800' },
    [Role.Barista]: { emoji: '☕️', classes: 'bg-amber-100 text-amber-800' },
    [Role.Waiter]: { emoji: '🤵', classes: 'bg-blue-100 text-blue-800' },
    [Role.Host]: { emoji: '👋', classes: 'bg-rose-100 text-rose-800' },
    [Role.KitchenStaff]: { emoji: '🔪', classes: 'bg-slate-200 text-slate-800' },
};

const JobCard: React.FC<JobCardProps> = ({ job, onApply, isApplied, isLoggedIn, currentUser }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

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

  const badge = roleBadges[job.role] || { emoji: '💼', classes: 'bg-cyan-100 text-cyan-800' };
  const isJobSeeker = isLoggedIn && currentUser?.userType === 'JobSeeker';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full border-l-4 border-purple-500">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={job.businessLogo} 
            alt={`${job.businessName} logo`} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                <div className="flex items-center gap-1">
                    <p className="font-bold text-lg text-primary">{job.businessName}</p>
                    <VerificationIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${badge.classes}`}>
                  {badge.emoji}
                  <span className="ml-1.5">{job.role}</span>
                </span>
                 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                  Part-time
                </span>
            </div>
            <div className="flex items-center text-slate-500 text-sm mt-2">
              <LocationIcon className="w-4 h-4 mr-1" />
              <span>{job.location}</span>
              <span className="mx-2">&bull;</span>
              <span>{timeAgo(job.postedAt)}</span>
            </div>
          </div>
        </div>

        <p className="text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4">
          Hiring a part-time <span className="font-bold">{job.role}</span>, starting <span className="font-bold text-indigo-600">📅 {formatDate(job.startDate)}</span>.
          The schedule is for <span className="font-bold text-amber-600">{job.workDays.join(', ')}</span>.
          {' '}Pay is <span className="font-bold text-green-600">💶 €{job.hourlyRate.toFixed(2)} per hour</span>.
          {' '}{job.description}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <UsersIcon className="w-5 h-5" />
                    <span className="font-semibold">{job.applicants?.length || 0}</span>
                    <span>{job.applicants?.length === 1 ? 'applicant' : 'applicants'}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full sm:w-auto">
              {(() => {
                  if (isLoggedIn && currentUser?.userType === 'Business') {
                    return (
                      <button
                        disabled
                        className="bg-slate-200 text-slate-500 font-bold py-2 px-6 rounded-md w-full sm:w-auto cursor-not-allowed"
                        title="Only Job Seekers can apply"
                      >
                        Apply Now
                      </button>
                    );
                  }

                  if (isJobSeeker && isApplied) {
                    return (
                      <button
                        disabled
                        className="bg-green-100 text-green-700 font-bold py-2 px-6 rounded-md w-full sm:w-auto flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                        Applied
                      </button>
                    );
                  }

                  return (
                    <button 
                        onClick={() => onApply(job.id)}
                        className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto"
                    >
                        Apply Now
                    </button>
                  );
                })()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;