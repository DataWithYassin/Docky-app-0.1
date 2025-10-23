import React from 'react';
import { View } from '../App';

interface RegistrationViewProps {
  onNavigate: (view: View) => void;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary tracking-tight sm:text-4xl">Join the Docky Community</h2>
        <p className="mt-4 text-lg text-slate-600">First, let us know what you're here for. Are you looking for flexible work or are you here to hire talented professionals?</p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-between">
            <div>
                <span className="text-5xl">👷</span>
                <h3 className="mt-4 text-2xl font-bold text-primary">I'm a Job Seeker</h3>
                <p className="mt-2 text-slate-600">Find and apply for flexible shifts in restaurants, cafés, and events that fit your schedule.</p>
            </div>
            <button 
                onClick={() => onNavigate('jobSeekerRegister')}
                className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-transform duration-200 hover:scale-105 w-full"
            >
                Find Work
            </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-between">
            <div>
                <span className="text-5xl">🏢</span>
                <h3 className="mt-4 text-2xl font-bold text-primary">I'm a Business</h3>
                <p className="mt-2 text-slate-600">Post shifts in seconds and connect with a community of reliable, on-demand professionals.</p>
            </div>
            <button
                onClick={() => onNavigate('jobAnnouncerRegister')}
                className="mt-8 bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full"
            >
                Hire Talent
            </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationView;