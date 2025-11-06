import React, { useState, useMemo } from 'react';
import { View, UserType } from '../types';

interface JobAnnouncerRegistrationViewProps {
    onNavigate: (view: View) => void;
    onLogin: (userType: UserType) => void;
}

const JobAnnouncerRegistrationView: React.FC<JobAnnouncerRegistrationViewProps> = ({ onNavigate, onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(false);

    const [formData, setFormData] = useState({
        businessName: '',
        category: 'Restaurant',
        email: '',
        phone: '',
        city: '',
        area: '',
        contactPreference: '',
        anonymous: true,
        terms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const completion = useMemo(() => {
        const fields = [
            formData.businessName,
            formData.category,
            formData.email,
            formData.phone,
            formData.city,
            formData.contactPreference,
            formData.terms
        ];
        const filledCount = fields.filter(field => {
            if (typeof field === 'boolean') return field === true;
            return Boolean(field);
        }).length;
        
        return Math.round((filledCount / fields.length) * 100);
    }, [formData]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin('Business');
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally handle registration logic
        console.log('Registering with data:', formData);
        alert('Registration complete! Please log in.');
        setIsLoginView(true);
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => onNavigate('register')} className="text-sm text-slate-600 hover:text-primary mb-4">&larr; Back to role selection</button>
        <div className="bg-white p-8 rounded-lg shadow-lg">

            {isLoginView ? (
                <>
                    <h2 className="text-2xl font-bold text-primary text-center">Log In to Your Business Account</h2>
                    <p className="text-slate-500 mt-1 text-center">Access your dashboard to post shifts and manage applicants.</p>
                    <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input type="email" name="email" placeholder="contact@yourbusiness.com" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" defaultValue="contact@localcafe.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <input type="password" name="password" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" defaultValue="password123" />
                        </div>
                        <div className="border-t border-slate-200 pt-6 flex flex-col items-center">
                            <button type="submit" className="w-full md:w-auto bg-accent text-white font-bold py-3 px-12 rounded-full hover:bg-accent-hover transition-colors">
                                Log In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-slate-600 mt-6">
                        Don't have an account?{' '}
                        <button onClick={() => setIsLoginView(false)} className="font-medium text-accent hover:underline">
                            Register here
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-primary">Create Your Business Profile</h2>
                    <p className="text-slate-500 mt-1">Set up your business account to start posting shifts.</p>

                    <div className="my-6">
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-primary">Profile Completion</span>
                            <span className="text-sm font-medium text-primary">{completion}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
                        </div>
                    </div>

                    <form className="mt-6 space-y-6" onSubmit={handleRegisterSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Business / Event Name</label>
                                <input type="text" name="businessName" placeholder="e.g., The Local Cafe" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Business Category</label>
                                <select name="category" required className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}>
                                    <option>Restaurant</option>
                                    <option>Café</option>
                                    <option>Catering</option>
                                    <option>Event</option>
                                    <option>Other</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Email</label>
                                <input type="email" name="email" placeholder="contact@yourbusiness.com" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                                <input type="tel" name="phone" placeholder="912 345 678" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Location (City)</label>
                                <input type="text" name="city" placeholder="e.g., Lisbon" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Location (Area/Neighbourhood)</label>
                                <input type="text" name="area" placeholder="e.g., Arroios (Optional)" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Contact Preference (Optional)</label>
                            <div className="mt-2 flex flex-wrap gap-4">
                                <div className="flex items-center">
                                    <input id="contact-email" name="contactPreference" type="radio" value="Email" className="h-4 w-4 text-accent border-slate-300 focus:ring-accent" onChange={handleInputChange}/>
                                    <label htmlFor="contact-email" className="ml-2 block text-sm text-slate-900">Email</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="contact-phone" name="contactPreference" type="radio" value="Phone" className="h-4 w-4 text-accent border-slate-300 focus:ring-accent" onChange={handleInputChange}/>
                                    <label htmlFor="contact-phone" className="ml-2 block text-sm text-slate-900">Phone</label>
                                </div>
                                 <div className="flex items-center">
                                    <input id="contact-both" name="contactPreference" type="radio" value="Both" className="h-4 w-4 text-accent border-slate-300 focus:ring-accent" onChange={handleInputChange}/>
                                    <label htmlFor="contact-both" className="ml-2 block text-sm text-slate-900">Both</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Profile Photo or Logo (Optional)</label>
                            <input type="file" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-accent hover:file:bg-cyan-100"/>
                        </div>

                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input id="anonymous" name="anonymous" type="checkbox" checked={formData.anonymous} className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent" onChange={handleInputChange}/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="anonymous" className="font-medium text-slate-700">Display Anonymously</label>
                                <p className="text-slate-500">Hide business name on job posts (e.g., “Restaurant in Arroios, Lisbon”).</p>
                            </div>
                        </div>

                         <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent" onChange={handleInputChange}/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-slate-700">I agree to the <a href="#" className="text-accent hover:underline">Terms & Conditions</a>.</label>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-200 pt-6 flex flex-col items-center">
                            <button type="submit" className="w-full md:w-auto bg-accent text-white font-bold py-3 px-12 rounded-full hover:bg-accent-hover transition-colors">
                              Complete Registration
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-slate-600 mt-6">
                        Already have an account?{' '}
                        <button onClick={() => setIsLoginView(true)} className="font-medium text-accent hover:underline">
                            Log in here
                        </button>
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobAnnouncerRegistrationView;