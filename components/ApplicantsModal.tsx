import React from 'react';
import { Shift, User, Role } from '../types';
import { StarIcon } from './Icons';

interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: Shift | null;
  onAccept: (shiftId: string, applicantId: string) => void;
  onMessage: (applicantId: string, shiftId: string) => void;
}

const ApplicantCard: React.FC<{ applicant: User; onAccept: () => void; onMessage: () => void; }> = ({ applicant, onAccept, onMessage }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 bg-slate-50 rounded-lg transition-colors hover:bg-slate-100 gap-3">
    <div className="flex items-center w-full sm:w-auto flex-grow">
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
    <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
        <button
            onClick={onMessage}
            className="bg-white text-primary border border-primary font-bold py-2 px-4 rounded-full hover:bg-slate-50 transition-colors text-sm w-full"
        >
            Message
        </button>
        <button
            onClick={onAccept}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors text-sm w-full"
        >
            Accept
        </button>
    </div>
  </div>
);

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({ isOpen, onClose, shift, onAccept, onMessage }) => {
  if (!isOpen || !shift) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Applicants for {shift.role} Shift</h2>
          <p className="text-sm text-slate-500">Review the candidates below and select the best fit.</p>
        </div>
        
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {shift.applicants.length > 0 ? (
                shift.applicants.map(applicant => (
                    <ApplicantCard 
                        key={applicant.id} 
                        applicant={applicant} 
                        onAccept={() => onAccept(shift.id, applicant.id)}
                        onMessage={() => onMessage(applicant.id, shift.id)}
                    />
                ))
            ) : (
                <p className="text-slate-500 text-center py-8">No applicants yet.</p>
            )}
        </div>

        <div className="p-4 bg-slate-50 flex justify-end items-center rounded-b-lg">
          <button type="button" onClick={onClose} className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsModal;