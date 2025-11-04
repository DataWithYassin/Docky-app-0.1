import React from 'react';
import { UserType } from '../types';
import { GoogleIcon, FacebookIcon } from './Icons';

interface LoginViewProps {
  onLogin: (userType: UserType) => void;
  onAdminLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onAdminLogin }) => {

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

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
                <button
                type="button"
                onClick={() => {}}
                className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                <span className="sr-only">Sign in with Google</span>
                <GoogleIcon className="w-5 h-5" />
                Google
                </button>
            </div>
            <div>
                <button
                type="button"
                onClick={() => {}}
                className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166FE5]"
                >
                <span className="sr-only">Sign in with Facebook</span>
                <FacebookIcon className="w-5 h-5" />
                Facebook
                </button>
            </div>
        </div>


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
            <button
              onClick={onAdminLogin}
              className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-full shadow-sm text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
            >
              Log In as Admin
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;