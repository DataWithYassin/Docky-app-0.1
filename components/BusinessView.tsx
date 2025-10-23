import React from 'react';
import { Shift, User, ShiftStatus } from '../types';
import { StarIcon, LocationIcon } from './Icons';

interface BusinessViewProps {
  shifts: Shift[];
  onPostShiftClick: () => void;
}

const ApplicantCard: React.FC<{ applicant: User }> = ({ applicant }) => (
  <div className="flex items-center p-3 bg-slate-50 rounded-lg">
    <img src={applicant.avatar} alt={applicant.name} className="w-12 h-12 rounded-full mr-4" />
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <p className="font-bold text-primary">{applicant.name}</p>
        <div className="flex items-center text-amber-500">
            <StarIcon className="w-4 h-4 mr-1" />
            <span className="font-bold text-sm">{applicant.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500 ml-1.5">({applicant.reviewCount} reviews)</span>
        </div>
      </div>
      <p className="text-sm text-slate-600">{applicant.role}</p>
    </div>
  </div>
);

const PostedShiftCard: React.FC<{ shift: Shift }> = ({ shift }) => {
  const statusColors = {
    [ShiftStatus.Open]: 'border-green-500',
    [ShiftStatus.Filled]: 'border-blue-500',
    [ShiftStatus.Completed]: 'border-slate-400',
  };
  
  const statusBgColors = {
    [ShiftStatus.Open]: 'bg-green-100 text-green-800',
    [ShiftStatus.Filled]: 'bg-blue-100 text-blue-800',
    [ShiftStatus.Completed]: 'bg-slate-100 text-slate-800',
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${statusColors[shift.status]}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-primary">{shift.role}</h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <LocationIcon className="w-4 h-4 mr-1" />
              {shift.location}
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusBgColors[shift.status]}`}>{shift.status}</span>
        </div>
        <div className="text-sm text-slate-600 mt-2">
          <span>{shift.date} &bull; {shift.startTime} - {shift.endTime} &bull; ${shift.hourlyRate}/hr</span>
        </div>
      </div>
      
      {shift.applicants.length > 0 && (
        <div className="px-5 pb-5">
          <h4 className="font-semibold text-primary mb-2">Applicants ({shift.applicants.length})</h4>
          <div className="space-y-2">
            {shift.applicants.map(applicant => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </div>
        </div>
      )}

      {shift.status === ShiftStatus.Open && shift.applicants.length === 0 && (
         <div className="px-5 pb-5 text-center text-sm text-slate-500">
            Awaiting applicants...
         </div>
      )}
    </div>
  );
};


const BusinessView: React.FC<BusinessViewProps> = ({ shifts, onPostShiftClick }) => {
  const openShifts = shifts.filter(s => s.status === ShiftStatus.Open).length;
  const filledShifts = shifts.filter(s => s.status === ShiftStatus.Filled).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Your Dashboard</h2>
          <p className="text-slate-600 mt-1">Manage your posted shifts and review applicants.</p>
        </div>
        <button
          onClick={onPostShiftClick}
          className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full md:w-auto"
        >
          Post a New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">TOTAL SHIFTS</p>
            <p className="text-4xl font-bold text-primary">{shifts.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">OPEN FOR APPLICANTS</p>
            <p className="text-4xl font-bold text-green-600">{openShifts}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <p className="text-slate-500 text-sm font-semibold">FILLED</p>
            <p className="text-4xl font-bold text-blue-600">{filledShifts}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {shifts.length > 0 ? (
            shifts.map(shift => (
                <PostedShiftCard key={shift.id} shift={shift} />
            ))
        ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary">No Shifts Posted Yet</h3>
                <p className="text-slate-500 mt-2 mb-6">Click the button below to post your first shift and find the talent you need.</p>
                <button
                    onClick={onPostShiftClick}
                    className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105"
                >
                    Post Your First Shift
                </button>
            </div>
        )}
      </div>

    </div>
  );
};

export default BusinessView;