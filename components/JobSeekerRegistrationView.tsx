import React, { useState, useMemo } from 'react';
import { Role, Experience } from '../types';
import { View } from '../App';

interface JobSeekerRegistrationViewProps {
    onNavigate: (view: View) => void;
}

const locationData: { [key: string]: { code: string; cities: string[]; flag: string; } } = {
    'PT': { code: '+351', cities: ['Lisbon', 'Porto', 'Faro', 'Braga', 'Coimbra', 'Aveiro', 'Setúbal', 'Funchal', 'Évora', 'Sintra', 'Cascais', 'Almada', 'Guimarães', 'Viseu', 'Leiria'], flag: '🇵🇹' },
    'ES': { code: '+34', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Granada'], flag: '🇪🇸' },
    'FR': { code: '+33', cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon'], flag: '🇫🇷' },
    'GB': { code: '+44', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Leeds', 'Sheffield', 'Edinburgh', 'Leicester', 'Coventry', 'Nottingham', 'Newcastle', 'Brighton', 'Cardiff'], flag: '🇬🇧' },
};


const JobSeekerRegistrationView: React.FC<JobSeekerRegistrationViewProps> = ({ onNavigate }) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [languages, setLanguages] = useState<{ id: number; name: string; level: string }[]>([]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: 'PT',
        phone: '',
        location: '',
        residenceType: 'Work Permit',
        preferredJobs: new Set<Role>(),
        preferredLocations: [] as string[],
        atividade: '',
        docType: 'ID Card',
        cv: null as File | null,
        idFile: null as File | null,
        terms: false,
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (name === 'countryCode') {
            setFormData(prev => ({
                ...prev,
                countryCode: value,
                location: '',
                preferredLocations: [],
            }));
            return;
        }

        if (type === 'checkbox') {
            const { checked, name } = e.target as HTMLInputElement;
            if (name === "terms") {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePreferredLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentLocations = [...prev.preferredLocations];
            if (checked) {
                if (currentLocations.length < 3) {
                    return { ...prev, preferredLocations: [...currentLocations, value] };
                }
            } else {
                return { ...prev, preferredLocations: currentLocations.filter(loc => loc !== value) };
            }
            return prev; // No change if trying to add a 4th
        });
    };

    const handlePreferredJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target as { value: Role; checked: boolean };
        setFormData(prev => {
            const newJobs = new Set(prev.preferredJobs);
            if (checked) {
                newJobs.add(value);
            } else {
                newJobs.delete(value);
            }
            return { ...prev, preferredJobs: newJobs };
        });
    };
    
    const addExperience = () => {
        setExperiences([...experiences, { id: Date.now(), position: '', place: '', location: '', startDate: '', endDate: '' }]);
    }

    const addLanguage = () => {
        setLanguages([...languages, { id: Date.now(), name: '', level: 'Basic' }]);
    }

    const completion = useMemo(() => {
        const fields = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            residenceType: formData.residenceType,
            preferredJobs: formData.preferredJobs.size > 0,
            preferredLocations: formData.preferredLocations.length > 0,
            terms: formData.terms,
            // Optional fields for bonus
            experience: experiences.length > 0,
            languages: languages.length > 0,
            atividade: formData.atividade,
            idFile: !!formData.idFile,
        };
        
        let filledCount = 0;
        Object.values(fields).forEach(value => {
            if (typeof value === 'boolean' && value) {
                filledCount++;
            } else if (typeof value !== 'boolean' && value) {
                filledCount++;
            }
        });
        
        return Math.round((filledCount / Object.keys(fields).length) * 100);
    }, [formData, experiences, languages]);
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => onNavigate('register')} className="text-sm text-slate-600 hover:text-primary mb-4">&larr; Back to role selection</button>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary">Create Your Worker Profile</h2>
          <p className="text-slate-500 mt-1">Fill in your details to start finding shifts. Completing your profile to 80% or more helps you get verified faster.</p>
          
           <div className="my-6">
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-primary">Profile Completion</span>
                    <span className="text-sm font-medium text-primary">{completion}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
                </div>
            </div>

          <form className="mt-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" name="fullName" placeholder="e.g., Jane Doe" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" name="email" placeholder="you@example.com" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <select name="countryCode" value={formData.countryCode} onChange={handleInputChange} className="block w-1/3 rounded-l-md border-r-0 border-slate-300 bg-slate-50 focus:ring-accent focus:border-accent text-sm">
                            {Object.keys(locationData).map(countryKey => (
                                <option key={countryKey} value={countryKey}>
                                    {locationData[countryKey].flag} {locationData[countryKey].code}
                                </option>
                            ))}
                        </select>
                        <input type="tel" name="phone" placeholder="Your number" required className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 focus:ring-accent focus:border-accent" onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Current Location (City)</label>
                    <select name="location" required value={formData.location} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}>
                        <option value="" disabled>Select a city</option>
                        {locationData[formData.countryCode].cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Type of Residence</label>
                    <select name="residenceType" required className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}>
                        <option>Work Permit</option>
                        <option>Student Visa</option>
                        <option>Citizen</option>
                        <option>Other</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Preferred Work Locations (required, max 3)</label>
                    <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border border-slate-300 rounded-md max-h-32 overflow-y-auto">
                        {locationData[formData.countryCode].cities.map(city => {
                            const isChecked = formData.preferredLocations.includes(city);
                            const isDisabled = !isChecked && formData.preferredLocations.length >= 3;
                            return (
                                <div key={city} className="flex items-center">
                                    <input
                                        id={`loc-${city}`}
                                        type="checkbox"
                                        value={city}
                                        checked={isChecked}
                                        disabled={isDisabled}
                                        onChange={handlePreferredLocationChange}
                                        className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent"
                                    />
                                    <label htmlFor={`loc-${city}`} className={`ml-2 text-sm text-slate-700 ${isDisabled ? 'text-slate-400 cursor-not-allowed' : ''}`}>
                                        {city}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Preferred Job Categories (required)</label>
                <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border border-slate-300 rounded-md">
                    {Object.values(Role).map(role => (
                        <div key={role} className="flex items-center">
                            <input
                                id={`job-${role}`}
                                type="checkbox"
                                value={role}
                                checked={formData.preferredJobs.has(role)}
                                onChange={handlePreferredJobChange}
                                className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent"
                            />
                            <label htmlFor={`job-${role}`} className="ml-2 text-sm text-slate-700">
                                {role}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-medium text-primary">Work Experience (Optional)</h3>
                 {experiences.map((exp, index) => (
                    <div key={exp.id} className="mt-4 p-4 border border-slate-200 rounded-md space-y-4">
                        <input type="text" placeholder="Position (e.g., Barista)" className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                         <input type="text" placeholder="Company / Place" className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                         <div className="grid grid-cols-2 gap-4">
                            <input type="month" placeholder="Start Date" className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            <input type="month" placeholder="End Date" className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addExperience} className="mt-2 text-sm font-semibold text-accent hover:text-accent-hover">+ Add Experience</button>
            </div>
             <div>
                <h3 className="text-lg font-medium text-primary">Languages Spoken (Optional)</h3>
                 {languages.map((lang, index) => (
                    <div key={lang.id} className="mt-4 p-4 border border-slate-200 rounded-md grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Language (e.g., English)" className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                        <select className="block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                            <option>Basic</option>
                            <option>Conversational</option>
                            <option>Fluent</option>
                            <option>Native</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={addLanguage} className="mt-2 text-sm font-semibold text-accent hover:text-accent-hover">+ Add Language</button>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700">Do you have Atividade Aberta? (Optional)</label>
                <div className="mt-2 flex gap-4">
                    <div className="flex items-center">
                        <input id="atividade-yes" name="atividade" type="radio" value="yes" className="h-4 w-4 text-accent border-slate-300 focus:ring-accent" onChange={handleInputChange}/>
                        <label htmlFor="atividade-yes" className="ml-2 block text-sm text-slate-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                        <input id="atividade-no" name="atividade" type="radio" value="no" className="h-4 w-4 text-accent border-slate-300 focus:ring-accent" onChange={handleInputChange}/>
                        <label htmlFor="atividade-no" className="ml-2 block text-sm text-slate-900">No</label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Upload CV (Optional)</label>
                    <input type="file" name="cv" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-accent hover:file:bg-cyan-100" onChange={(e) => setFormData(p => ({...p, cv: e.target.files ? e.target.files[0] : null}))}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Residence / ID / Passport (Optional)</label>
                    <div className="mt-1 flex flex-col sm:flex-row gap-2">
                        <select name="docType" className="w-full sm:w-1/3 px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}>
                            <option>ID Card</option>
                            <option>Passport</option>
                            <option>Residence Permit</option>
                        </select>
                        <input type="file" name="idFile" className="block w-full sm:w-2/3 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-accent hover:file:bg-cyan-100" onChange={(e) => setFormData(p => ({...p, idFile: e.target.files ? e.target.files[0] : null}))}/>
                    </div>
                </div>
            </div>
            
            <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent" onChange={handleInputChange}/>
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-slate-700">I agree to the <a href="#" className="text-accent hover:underline">Terms & Conditions</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.</label>
                </div>
            </div>

            <div className="border-t border-slate-200 pt-6 flex flex-col items-center">
                <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-12 rounded-full hover:bg-slate-800 transition-colors">
                  Complete Registration
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerRegistrationView;