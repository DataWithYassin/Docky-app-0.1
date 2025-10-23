import React from 'react';
import { UserType } from '../types';

interface LoginViewProps {
  onLogin: (userType: UserType) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate default login as job seeker if enter is pressed on the form
    onLogin('JobSeeker');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary text-center">Log In</h2>
        <p className="text-slate-500 mt-2 text-center">Enter your credentials to access your account.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="you@example.com"
                defaultValue="alice.j@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Your password"
                defaultValue="password123"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-accent hover:text-accent-hover">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
        <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-slate-500">For demonstration purposes:</p>
            <button
              onClick={() => onLogin('JobSeeker')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-primary hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Log In as Job Seeker (Alice)
            </button>
            <button
              onClick={() => onLogin('Business')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Log In as Business (The Local Cafe)
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;