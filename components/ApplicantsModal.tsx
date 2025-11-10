import React, { useState, useEffect } from 'react';
import { Shift, User, Role } from '../types';
import { StarIcon, ScaleIcon, CheckIcon, SparklesIcon, BriefcaseIcon, ChatBubbleLeftRightIcon, XMarkIcon, ChevronLeftIcon } from './Icons';

interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: Shift | null;
  onAccept: (shiftId: string, applicantId: string) => void;
  onMessage: (applicantId: string, shiftId: string) => void;
}

const ComparisonCard: React.FC<{ applicant: User, onAccept: () => void, onMessage: () => void }> = ({ applicant, onAccept, onMessage }) => (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 flex flex-col h-full">
        <div className="p-4 text-center border-b border-slate-200">
            <img src={applicant.avatar} alt={applicant.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
            <p className="font-bold text-primary text-lg">{applicant.name}</p>
            <p className="text-sm text-slate-600">{applicant.role}</p>
            <div className="flex items-center justify-center text-amber-500 mt-1">
                <StarIcon className="w-4 h-4 mr-1" />
                <span className="font-bold text-sm">{applicant.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-500 ml-1.5">({applicant.reviewCount} reviews)</span>
            </div>
        </div>
        <div className="p-4 space-y-4 flex-grow overflow-y-auto">
            <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><BriefcaseIcon className="w-5 h-5 text-slate-400" /> Bio & Experience</h4>
                <p className="text-sm text-slate-600 leading-relaxed max-h-24 overflow-y-auto pr-2">{applicant.bio || "No bio provided."}</p>
            </div>
            <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-slate-400" /> Top Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {applicant.skills && applicant.skills.length > 0 ? (
                        applicant.skills.slice(0, 5).map(skill => (
                            <span key={skill} className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded-full">{skill}</span>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500 italic">No skills listed.</p>
                    )}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400" /> Latest Review</h4>
                {applicant.reviews && applicant.reviews.length > 0 ? (
                    <blockquote className="text-sm text-slate-600 italic border-l-4 border-slate-200 pl-4 py-1">
                        "{applicant.reviews[0].comment}"
                        <footer className="mt-1 text-xs not-italic text-slate-500">- {applicant.reviews[0].reviewerName}</footer>
                    </blockquote>
                ) : (
                    <p className="text-sm text-slate-500 italic">No reviews yet.</p>
                )}
            </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
            <button onClick={onMessage} className="bg-white text-primary border border-primary font-bold py-2 px-4 rounded-full hover:bg-slate-50 transition-colors text-sm w-full">
                Message
            </button>
            <button onClick={onAccept} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors text-sm w-full">
                Accept
            </button>
        </div>
    </div>
);

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({ isOpen, onClose, shift, onAccept, onMessage }) => {
  const [view, setView] = useState<'list' | 'compare'>('list');
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Reset state when modal is closed or shift changes
    if (!isOpen) {
      setView('list');
      setSelectedApplicants(new Set());
    }
  }, [isOpen]);
  
  const handleSelectApplicant = (applicantId: string) => {
    setSelectedApplicants(prev => {
        const newSelection = new Set(prev);
        if (newSelection.has(applicantId)) {
            newSelection.delete(applicantId);
        } else {
            if (newSelection.size < 3) {
                newSelection.add(applicantId);
            }
        }
        return newSelection;
    });
  };

  const handleClose = () => {
    setView('list');
    setSelectedApplicants(new Set());
    onClose();
  };

  const applicantsToCompare = shift?.applicants.filter(app => selectedApplicants.has(app.id)) || [];
  const canCompare = selectedApplicants.size >= 2 && selectedApplicants.size <= 3;
  const numSelected = selectedApplicants.size;

  if (!isOpen || !shift) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={handleClose}>
      <div className="bg-slate-100 rounded-lg shadow-xl w-full max-w-sm sm:max-w-4xl h-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-200 bg-white rounded-t-lg flex justify-between items-center flex-shrink-0">
          <div>
            {view === 'list' ? (
                <>
                    <h2 className="text-xl font-bold text-primary">Applicants for {shift.role} Shift</h2>
                    <p className="text-sm text-slate-500">Select 2 to 3 candidates to compare side-by-side.</p>
                </>
            ) : (
                <button onClick={() => setView('list')} className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Applicant List
                </button>
            )}
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-slate-100">
            <XMarkIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
            {view === 'list' && (
                shift.applicants.length > 0 ? (
                    <div className="space-y-3">
                        {shift.applicants.map(applicant => (
                            <div key={applicant.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-transparent has-[:checked]:border-accent has-[:checked]:bg-cyan-50/50">
                                <label htmlFor={`compare-${applicant.id}`} className="flex items-center w-full cursor-pointer">
                                    <input 
                                        id={`compare-${applicant.id}`}
                                        type="checkbox"
                                        checked={selectedApplicants.has(applicant.id)}
                                        onChange={() => handleSelectApplicant(applicant.id)}
                                        className="h-5 w-5 rounded border-slate-300 text-accent focus:ring-accent mr-4"
                                    />
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
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-center py-8">No applicants yet.</p>
                )
            )}
            {view === 'compare' && (
                <div className={`grid grid-cols-1 md:grid-cols-${applicantsToCompare.length} gap-4 h-full`}>
                    {applicantsToCompare.map(applicant => (
                        <ComparisonCard 
                            key={applicant.id} 
                            applicant={applicant} 
                            onAccept={() => onAccept(shift.id, applicant.id)}
                            onMessage={() => onMessage(applicant.id, shift.id)}
                        />
                    ))}
                </div>
            )}
        </div>

        {view === 'list' && shift.applicants.length > 0 && (
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 flex justify-end items-center rounded-b-lg flex-shrink-0">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-primary">{numSelected} / 3 selected</p>
                    <button 
                        onClick={() => setView('compare')} 
                        disabled={!canCompare}
                        className="bg-accent text-white font-bold py-2 px-6 rounded-full hover:bg-accent-hover transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ScaleIcon className="w-5 h-5"/>
                        Compare
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsModal;