import React, { useState, useRef, useEffect } from 'react';
import { View } from '../App';
import { User } from '../types';
import { ChevronDownIcon } from './Icons';

interface HeaderProps {
  onNavigate: (view: View) => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const NavLink: React.FC<{ view: View, children: React.ReactNode }> = ({ view, children }) => (
    <button
      onClick={() => onNavigate(view)}
      className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
    >
      {children}
    </button>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl">🐳</span>
            <h1 className="text-xl font-bold text-primary tracking-tighter">Docky</h1>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink view="home">Home</NavLink>
            <NavLink view="jobs">Jobs</NavLink>
            <NavLink view="insights">Insights</NavLink>
          </nav>
          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-slate-200 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <img src={user.avatar} alt="user avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name.split(' ')[0]}</span>
                  <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    {user.userType === 'JobSeeker' && (
                        <button
                          onClick={() => { onNavigate('jobSeekerDashboard'); setIsDropdownOpen(false); }}
                          className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          My Dashboard
                        </button>
                    )}
                     {user.userType === 'Business' && (
                        <button
                          onClick={() => { onNavigate('business'); setIsDropdownOpen(false); }}
                          className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          Business Dashboard
                        </button>
                    )}
                    <button
                      onClick={() => { onNavigate('profile'); setIsDropdownOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {user.userType === 'JobSeeker' ? 'My Profile' : 'Business Profile'}
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                    onClick={() => onNavigate('login')}
                    className="text-primary font-bold px-4 py-2 rounded-full text-sm hover:bg-slate-100 transition-colors"
                >
                    Log In
                </button>
                <button
                    onClick={() => onNavigate('register')}
                    className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-accent-hover transition-colors"
                >
                    Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;