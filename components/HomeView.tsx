import React, { useState, useEffect, useRef } from 'react';
import { View, Shift, User, WebsiteContent, RoleDetail } from '../types';
import ShiftCard from './ShiftCard';
import { CheckCircleIcon, AppStoreBadgeIcon, GooglePlayBadgeIcon, UsersIcon, BriefcaseIcon, LocationIcon } from './Icons';

interface HomeViewProps {
  onNavigate: (view: View) => void;
  shifts: Shift[];
  isLoggedIn: boolean;
  user: User | null;
  content: WebsiteContent;
  onApply: (shiftId: string) => void;
  businesses: User[];
  roleDetails: RoleDetail[];
  stats: {
    jobSeekers: number;
    businesses: number;
    completedShifts: number;
    cities: number;
  }
}

const ValuePropCard: React.FC<{
  title: string;
  subtitle: string;
  benefits: string[];
  emoji: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonClass: string;
  index: number;
}> = ({ title, subtitle, benefits, emoji, buttonText, onButtonClick, buttonClass, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  return (
    <div
      ref={cardRef}
      className={`bg-white p-8 rounded-2xl shadow-lg flex flex-col transition-all duration-700 ease-out hover:scale-[1.02] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      <p className="text-slate-600 mt-2">{subtitle}</p>
      <ul className="mt-4 space-y-2 text-slate-700 flex-grow">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onButtonClick}
        className={`mt-8 w-full font-bold py-3 px-8 rounded-full transition-transform duration-200 hover:scale-105 ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const LogoMarquee: React.FC<{ logos: { id: string; name: string; avatar?: string; }[]; reverse?: boolean; }> = ({ logos, reverse = false }) => {
    const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
    if (!logos || logos.length === 0) return null;
    const allLogos = [...logos, ...logos]; // Duplicate for seamless loop

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className={`flex items-center justify-center md:justify-start gap-12 ${animationClass}`}>
                {allLogos.map((logo, index) => (
                    <li key={`${logo.id}-${index}`} className="flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center w-56 h-56 transition-transform hover:-translate-y-1 hover:shadow-lg">
                            <img src={logo.avatar} alt={logo.name} className="h-32 w-32 rounded-full object-cover border-2 border-slate-100" />
                            <p className="mt-4 font-semibold text-primary text-center text-base w-full">{logo.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const useCountUp = (endValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = endValue;
                    const startTime = Date.now();

                    const frame = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const current = Math.floor(progress * (end - start) + start);
                        setCount(current);
                        if (progress < 1) {
                            requestAnimationFrame(frame);
                        }
                    };
                    requestAnimationFrame(frame);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [endValue, duration]);

    return { count, ref };
};


const StatItem: React.FC<{ value: number; label: string; icon: React.ReactNode; iconBgColor: string; }> = ({ value, label, icon, iconBgColor }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div className="flex items-center gap-4">
            <div className={`${iconBgColor} p-4 rounded-full`}>{icon}</div>
            <div>
                <span ref={ref} className="text-3xl font-bold text-primary block">{count.toLocaleString()}</span>
                <span className="text-slate-500">{label}</span>
            </div>
        </div>
    );
};

const StatsSection: React.FC<{ stats: HomeViewProps['stats'] }> = ({ stats }) => (
    <section className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-center text-3xl font-bold text-primary mb-8">Our Community by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem 
                    value={stats.jobSeekers} 
                    label="Job Seekers" 
                    icon={<UsersIcon className="w-6 h-6 text-blue-600"/>} 
                    iconBgColor="bg-blue-100"
                />
                <StatItem 
                    value={stats.businesses} 
                    label="Businesses" 
                    icon={<BriefcaseIcon className="w-6 h-6 text-purple-600"/>} 
                    iconBgColor="bg-purple-100"
                />
                <StatItem 
                    value={stats.completedShifts} 
                    label="Shifts Completed" 
                    icon={<CheckCircleIcon className="w-6 h-6 text-green-600"/>} 
                    iconBgColor="bg-green-100"
                />
                <StatItem 
                    value={stats.cities} 
                    label="Cities Covered" 
                    icon={<LocationIcon className="w-6 h-6 text-orange-600"/>} 
                    iconBgColor="bg-orange-100"
                />
            </div>
        </div>
    </section>
);


const HomeView: React.FC<HomeViewProps> = ({ onNavigate, shifts, isLoggedIn, user, content, onApply, businesses, roleDetails, stats }) => {
  const openShifts = shifts.filter(s => s.status === 'Open').slice(0, 3);
  const heroImage = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop";
  const mockPartners = [
    { id: 'partner-1', name: 'Innovate Corp', avatar: 'https://i.pravatar.cc/150?u=partner-1' },
    { id: 'partner-2', name: 'Tech Solutions', avatar: 'https://i.pravatar.cc/150?u=partner-2' },
    { id: 'partner-3', name: 'Future Ventures', avatar: 'https://i.pravatar.cc/150?u=partner-3' },
    { id: 'partner-4', name: 'Eco Systems', avatar: 'https://i.pravatar.cc/150?u=partner-4' },
    { id: 'partner-5', name: 'HealthFirst', avatar: 'https://i.pravatar.cc/150?u=partner-5' },
    { id: 'partner-6', name: 'EduGrowth', avatar: 'https://i.pravatar.cc/150?u=partner-6' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-24 px-4 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/50 backdrop-blur-sm"></div>
        <div className="relative container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-lg">
            {content.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200 drop-shadow-md">
            {content.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('jobs')}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-transform duration-200 hover:scale-105 w-full sm:w-auto border-2 border-transparent hover:border-white"
            >
              Find Shifts
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform duration-200 hover:scale-105 w-full sm:w-auto"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="container mx-auto px-4 -mt-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ValuePropCard 
                  index={0}
                  emoji="👷"
                  title={content.valueProps.jobSeeker.title}
                  subtitle={content.valueProps.jobSeeker.subtitle}
                  benefits={content.valueProps.jobSeeker.benefits}
                  buttonText="Start Earning"
                  onButtonClick={() => onNavigate('jobSeekerRegister')}
                  buttonClass="bg-primary text-white"
              />
              <ValuePropCard 
                  index={1}
                  emoji="🏢"
                  title={content.valueProps.business.title}
                  subtitle={content.valueProps.business.subtitle}
                  benefits={content.valueProps.business.benefits}
                  buttonText="Start Hiring"
                  onButtonClick={() => onNavigate('jobAnnouncerRegister')}
                  buttonClass="bg-accent text-white"
              />
          </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Trusted By */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">Trusted by Leading Local Businesses</h2>
            <LogoMarquee logos={businesses} />
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">Our Proud Partners</h2>
            <LogoMarquee logos={mockPartners} reverse />
        </div>
      </section>

      {/* Featured Shifts */}
      {openShifts.length > 0 && (
        <section className="bg-white py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-primary tracking-tight">Featured Shifts</h2>
              <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Get a glimpse of the latest opportunities available right now.</p>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              {openShifts.map(shift => (
                <ShiftCard
                  key={shift.id}
                  shift={shift}
                  onApply={onApply}
                  isLoggedIn={isLoggedIn}
                  isApplied={user?.applications?.some(app => app.shiftId === shift.id) ?? false}
                  currentUser={user}
                  roleDetails={roleDetails}
                />
              ))}
            </div>
             <div className="text-center mt-10">
                <button
                    onClick={() => onNavigate('jobs')}
                    className="text-primary font-bold px-6 py-3 rounded-full text-lg hover:bg-slate-100 transition-colors"
                >
                    View All Shifts &rarr;
                </button>
            </div>
          </div>
        </section>
      )}
      
      {/* App Download */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight">{content.appDownload.title}</h2>
              <p className="mt-2 text-slate-300 max-w-2xl">
                {content.appDownload.subtitle}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4">
              <a href="#" aria-label="Download on the App Store" className="transition-transform hover:scale-105">
                <AppStoreBadgeIcon />
              </a>
              <a href="#" aria-label="Get it on Google Play" className="transition-transform hover:scale-105">
                <GooglePlayBadgeIcon />
              </a>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomeView;