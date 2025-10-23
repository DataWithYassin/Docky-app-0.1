import React from 'react';
import { Shift, User } from '../types';
import ShiftCard from './ShiftCard';
import { View } from '../App';
import { CheckBadgeIcon, AppleIcon, GooglePlayIcon } from './Icons';

interface HomeViewProps {
  onNavigate: (view: View) => void;
  shifts: Shift[];
  isLoggedIn: boolean;
  user: User | null;
}

const heroImage = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, shifts, isLoggedIn, user }) => {
  const recentShifts = shifts
    .filter(shift => shift.status === 'Open')
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, 3);

  return (
    <>
      <div 
        className="bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%), url(${heroImage})` 
        }}
      >
        <div className="container mx-auto px-4 pt-16 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {isLoggedIn && user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Your Extra Shift, Made Easy.'}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200">
            {isLoggedIn ? 'Check out the most recent shifts or head to your dashboard to manage your activity.' : 'Docky connects talented hospitality staff with businesses for on-demand shifts. Find work or fill a role, seamlessly.'}
          </p>
          
          <div className="mt-10 flex justify-center">
            {isLoggedIn && user ? (
              <button
                onClick={() => onNavigate(user.userType === 'JobSeeker' ? 'jobSeekerDashboard' : 'business')}
                className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 text-lg"
              >
                Go to Your Dashboard &rarr;
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-primary transition-colors duration-200 text-lg w-full sm:w-auto"
                >
                  Find a Shift
                </button>
                <button
                  onClick={() => onNavigate('business')}
                  className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 text-lg w-full sm:w-auto"
                >
                  Post a Shift
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-transform hover:scale-[1.02] duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">👷</span>
                  <div>
                      <h3 className="text-2xl font-bold text-primary">For Job Seekers</h3>
                      <p className="text-slate-500">Take control of your work life.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 flex-grow">
                  Find flexible, on-demand shifts that match your skills and schedule. No more searching—let the work find you.
                </p>
                <ul className="space-y-3 text-slate-700 mb-8">
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Work on your terms:</strong> Choose when and where you want to work.</span></li>
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Get paid fast:</strong> Reliable payments for every shift you complete.</span></li>
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Build your profile:</strong> Gain experience and earn ratings to unlock more opportunities.</span></li>
                </ul>
                <button 
                  onClick={() => onNavigate('jobSeekerRegister')}
                  className="w-full bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-transform duration-200 hover:scale-105"
                >
                  Start Earning Now
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-transform hover:scale-[1.02] duration-300">
                 <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">🏢</span>
                  <div>
                      <h3 className="text-2xl font-bold text-primary">For Businesses</h3>
                      <p className="text-slate-500">Staffing, solved.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 flex-grow">
                  Access a network of verified, skilled professionals ready to fill your shifts at a moment's notice.
                </p>
                <ul className="space-y-3 text-slate-700 mb-8">
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Fill shifts in seconds:</strong> Post a job and get matched with available talent instantly.</span></li>
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Reduce hiring costs:</strong> Say goodbye to lengthy recruitment processes.</span></li>
                  <li className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><strong>Verified professionals:</strong> Connect with rated and reviewed workers you can trust.</span></li>
                </ul>
                <button 
                  onClick={() => onNavigate('jobAnnouncerRegister')}
                  className="w-full bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105"
                >
                  Find Talent Today
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary tracking-tight text-center">Recently Posted Shifts</h2>
        <div className="mt-8 space-y-6 max-w-4xl mx-auto">
          {recentShifts.length > 0 ? (
            recentShifts.map(shift => <ShiftCard key={shift.id} shift={shift} />)
          ) : (
            <p className="text-center text-slate-500">No open shifts right now. Check back soon!</p>
          )}
        </div>
         <div className="text-center mt-8">
            <button 
                onClick={() => onNavigate('jobs')}
                className="text-accent font-bold hover:underline"
            >
                View all jobs &rarr;
            </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col justify-center text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                    Take Docky with you
                </h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Manage your schedule, apply for shifts instantly, and communicate with businesses on the go. The Docky app is your pocket-sized career companion.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-primary hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-lg flex items-center justify-center gap-3 transition-colors">
                        <AppleIcon className="w-7 h-7" />
                        <div>
                            <p className="text-xs text-left">Download on the</p>
                            <p className="text-lg text-left -mt-1">App Store</p>
                        </div>
                    </button>
                    <button className="bg-white border border-slate-300 hover:bg-slate-100 text-primary font-semibold py-3 px-5 rounded-lg flex items-center justify-center gap-3 transition-colors">
                        <GooglePlayIcon className="w-6 h-6" />
                        <div>
                            <p className="text-xs text-left uppercase">Get it on</p>
                            <p className="text-lg text-left -mt-1">Google Play</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>

    </>
  );
};

export default HomeView;