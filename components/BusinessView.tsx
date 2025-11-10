
import React from 'react';
import { User, Shift } from '../types';

interface BusinessViewProps {
  user: User;
  shifts: Shift[];
  onPostShift: () => void;
  onViewApplicants: (shift: Shift) => void;
}

const BusinessView: React.FC<BusinessViewProps> = ({ user, shifts, onPostShift, onViewApplicants }) => {
  const businessShifts = shifts.filter(s => s.businessId === user.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
            <h2 className="text-3xl font-bold text-primary">Business Dashboard</h2>
            <p className="text-slate-600 mt-2">Welcome, {user.name}. Manage your shifts and applicants here.</p>
        </div>
        <button onClick={onPostShift} className="bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full md:w-auto">
            Post New Opening
        </button>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-primary mb-4">Your Posted Shifts</h3>
        {businessShifts.length > 0 ? (
          <div className="space-y-4">
            {businessShifts.map(shift => (
              <div key={shift.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="font-semibold text-lg text-slate-800">{shift.role} on {shift.date}</p>
                    <p className="text-sm text-slate-500">{shift.status} &bull; {shift.applicants.length} applicant(s)</p>
                </div>
                <button onClick={() => onViewApplicants(shift)} className="bg-primary text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-slate-800 transition-colors self-end sm:self-center">
                  View Applicants
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary">No Shifts Posted</h3>
            <p className="text-slate-500 mt-2">You have not posted any shifts yet. Click 'Post New Opening' to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessView;
