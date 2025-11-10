import React, { useState, useMemo } from 'react';
import { Role, Experience, View, RoleDetail } from '../types';

interface JobSeekerRegistrationViewProps {
    onNavigate: (view: View) => void;
    onRegister: (formData: any) => void;
    roleDetails: RoleDetail[];
}

const locationData: { [key: string]: { code: string; cities: string[]; flag: string; } } = {
    'PT': { code: '+351', cities: ['Lisbon', 'Porto', 'Faro', 'Braga', 'Coimbra', 'Aveiro', 'Setúbal', 'Funchal', 'Évora', 'Sintra', 'Cascais', 'Almada', 'Guimarães', 'Viseu', 'Leiria'], flag: '🇵🇹' },
    'ES': { code: '+34', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Granada'], flag: '🇪🇸' },
    'FR': { code: '+33', cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon'], flag: '🇫🇷' },
    'GB': { code: '+44', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Leeds', 'Sheffield', 'Edinburgh', 'Leicester', 'Coventry', 'Nottingham', 'Newcastle', 'Brighton', 'Cardiff'], flag: '🇬🇧' },
};


const JobSeekerRegistrationView: React.FC<JobSeekerRegistrationViewProps> = ({ onNavigate, onRegister, roleDetails }) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [languages, setLanguages] = useState<{ id: number; name: string; level: string }[]>([]);
    const [fileErrors, setFileErrors] = useState<{ cv?: string; idFile?: string }>({});

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
    const removeExperience = (id: number) => {
      setExperiences(experiences.filter(exp => exp.id !== id));
    };
    const handleExperienceChange = (id: number, field: keyof Omit<Experience, 'id'>, value: string) => {
      setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const addLanguage = () => {
        setLanguages([...languages, { id: Date.now(), name: '', level: 'Basic' }]);
    }
    const removeLanguage = (id: number) => {
      setLanguages(languages.filter(lang => lang.id !== id));
    };
    const handleLanguageChange = (id: number, field: 'name' | 'level', value: string) => {
      setLanguages(languages.map(lang => lang.id === id ? { ...lang, [field]: value } : lang));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cv' | 'idFile') => {
        const file = e.target.files ? e.target.files[0] : null;
        setFileErrors(prev => ({ ...prev, [fileType]: undefined })); // Clear previous error

        if (file) {
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            const allowedCVTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const cvExtensions = ['.pdf', '.doc', '.docx'];
            const allowedIDTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const idExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

            const allowedTypes = fileType === 'cv' ? allowedCVTypes : allowedIDTypes;
            const allowedExtensions = fileType === 'cv' ? cvExtensions : idExtensions;
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

            if (file.size > MAX_SIZE) {
                setFileErrors(prev => ({ ...prev, [fileType]: 'File is too large (max 5MB).' }));
                e.target.value = '';
                setFormData(p => ({ ...p, [fileType]: null }));
                return;
            }

            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
                 setFileErrors(prev => ({ ...prev, [fileType]: `Invalid file type. Allowed: ${allowedExtensions.join(', ')}` }));
                e.target.value = '';
                setFormData(p => ({ ...p, [fileType]: null }));
                return;
            }
            setFormData(p => ({...p, [fileType]: file}));
        } else {
            setFormData(p => ({...p, [fileType]: null}));
        }
    };

    const completion = useMemo(() => {
        let score = 0;
        const weights = {
            // Core: 70 points
            fullName: 10,
            email: 10,
            phone: 5,
            location: 5,
            residenceType: 5,
            preferredJobs: 15,
            preferredLocations: 15,
            terms: 5,

            // Optional: 30 points
            experience: 10,
            languages: 5,
            atividade: 5,
            cv: 5,
            idFile: 5,
        };

        // Core fields checks
        if (formData.fullName.trim()) score += weights.fullName;
        if (/\S+@\S+\.\S+/.test(formData.email)) score += weights.email;
        if (formData.phone.trim()) score += weights.phone;
        if (formData.location) score += weights.location;
        if (formData.residenceType) score += weights.residenceType;
        if (formData.preferredJobs.size > 0) score += weights.preferredJobs;
        if (formData.preferredLocations.length > 0) score += weights.preferredLocations;
        if (formData.terms) score += weights.terms;
        
        // Optional fields checks
        const hasExperience = experiences.some(exp => exp.position.trim() && exp.place.trim());
        if (hasExperience) score += weights.experience;

        const hasLanguage = languages.some(lang => lang.name.trim());
        if (hasLanguage) score += weights.languages;

        if (formData.atividade) score += weights.atividade;
        if (formData.cv) score += weights.cv;
        if (formData.idFile) score += weights.idFile;

        return Math.min(100, score);
    }, [formData, experiences, languages]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.terms) {
            alert('You must agree to the terms and conditions.');
            return;
        }
        if (formData.preferredJobs.size === 0) {
             alert('Please select at least one preferred job category.');
            return;
        }
        if (formData.preferredLocations.length === 0) {
             alert('Please select at least one preferred work location.');
            return;
        }
        onRegister(formData);
    };
    
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

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            
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
                    {roleDetails.map(role => (
                        <div key={role.name} className="flex items-center">
                            <input
                                id={`job-${role.name}`}
                                type="checkbox"
                                value={role.name}
                                checked={formData.preferredJobs.has(role.name)}
                                onChange={handlePreferredJobChange}
                                className="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent"
                            />
                            <label htmlFor={`job-${role.name}`} className="ml-2 text-sm text-slate-700">
                                {role.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-medium text-primary">Work Experience (Optional)</h3>
                 {experiences.map((exp, index) => (
                    <div key={exp.id} className="mt-4 p-4 border border-slate-200 rounded-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-slate-800">Experience #{index + 1}</h4>
                            <button type="button" onClick={() => removeExperience(exp.id)} className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">Remove</button>
                        </div>
                        <input type="text" placeholder="Position (e.g., Barista)" value={exp.position} onChange={e => handleExperienceChange(exp.id, 'position', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                        <input type="text" placeholder="Company / Place" value={exp.place} onChange={e => handleExperienceChange(exp.id, 'place', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                        <input type="text" placeholder="Location (e.g., Lisbon)" value={exp.location} onChange={e => handleExperienceChange(exp.id, 'location', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="text-xs text-slate-500">Start Date</label>
                               <input type="month" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, 'startDate', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <div>
                               <label className="text-xs text-slate-500">End Date</label>
                               <input type="month" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, 'endDate', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addExperience} className="mt-2 text-sm font-semibold text-accent hover:text-accent-hover">+ Add Experience</button>
            </div>
             <div>
                <h3 className="text-lg font-medium text-primary">Languages Spoken (Optional)</h3>
                 {languages.map((lang, index) => (
                    <div key={lang.id} className="mt-4 p-4 border border-slate-200 rounded-md space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-slate-800">Language #{index + 1}</h4>
                          <button type="button" onClick={() => removeLanguage(lang.id)} className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">Remove</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Language (e.g., English)" value={lang.name} onChange={e => handleLanguageChange(lang.id, 'name', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            <select value={lang.level} onChange={e => handleLanguageChange(lang.id, 'level', e.target.value)} className="block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                                <option>Basic</option>
                                <option>Conversational</option>
                                <option>Fluent</option>
                                <option>Native</option>
                            </select>
                        </div>
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
                    <input type="file" name="cv" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-accent hover:file:bg-cyan-100" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cv')}/>
                    {fileErrors.cv && <p className="mt-1 text-sm text-red-600">{fileErrors.cv}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Residence / ID / Passport (Optional)</label>
                    <div className="mt-1 flex flex-col sm:flex-row gap-2">
                        <select name="docType" className="w-full sm:w-1/3 px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:ring-accent focus:border-accent" onChange={handleInputChange}>
                            <option>ID Card</option>
                            <option>Passport</option>
                            <option>Residence Permit</option>
                        </select>
                        <input type="file" name="idFile" className="block w-full sm:w-2/3 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-accent hover:file:bg-cyan-100" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'idFile')}/>
                    </div>
                     {fileErrors.idFile && <p className="mt-1 text-sm text-red-600">{fileErrors.idFile}</p>}
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