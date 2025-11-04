import React from 'react';
import { View, Shift, User, WebsiteContent } from '../types';
import ShiftCard from './ShiftCard';
import { CheckCircleIcon, AppStoreBadgeIcon, GooglePlayBadgeIcon } from './Icons';

interface HomeViewProps {
  onNavigate: (view: View) => void;
  shifts: Shift[];
  isLoggedIn: boolean;
  user: User | null;
  content: WebsiteContent;
  onApply: (shiftId: string) => void;
  businesses: User[];
}

const ValuePropCard: React.FC<{
  title: string;
  subtitle: string;
  benefits: string[];
  emoji: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonClass: string;
}> = ({ title, subtitle, benefits, emoji, buttonText, onButtonClick, buttonClass }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col transition-transform duration-300 hover:scale-[1.02]">
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-2xl font-bold text-primary">{title}</h3>
    <p className="text-slate-600 mt-2">{subtitle}</p>
    <ul className="mt-4 space-y-2 text-slate-700 flex-grow">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
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

const LogoMarquee: React.FC<{ logos: { id: string; name: string; avatar?: string; src?: string }[]; reverse?: boolean; }> = ({ logos, reverse = false }) => {
    const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
    const allLogos = [...logos, ...logos, ...logos, ...logos]; // Duplicate for seamless loop

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${animationClass}`}>
                {allLogos.map((logo, index) => (
                    <li key={`${logo.id}-${index}`}>
                        <img src={logo.avatar || logo.src} alt={logo.name} className="h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" title={logo.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const partnerLogos = [
  { id: 'transistor', name: 'Transistor', src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg' },
  { id: 'reform', name: 'Reform', src: 'https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg' },
  { id: 'tuple', name: 'Tuple', src: 'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg' },
  { id: 'savvycal', name: 'SavvyCal', src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg' },
  { id: 'statamic', name: 'Statamic', src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg' },
  { id: 'transistor2', name: 'Transistor', src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg' },
  { id: 'reform2', name: 'Reform', src: 'https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg' },
  { id: 'tuple2', name: 'Tuple', src: 'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg' },
];


const HomeView: React.FC<HomeViewProps> = ({ onNavigate, shifts, isLoggedIn, user, content, onApply, businesses }) => {
  const openShifts = shifts.filter(s => s.status === 'Open').slice(0, 3);
  const heroImage = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-24 px-4 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm"></div>
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
                  emoji="👷"
                  title={content.valueProps.jobSeeker.title}
                  subtitle={content.valueProps.jobSeeker.subtitle}
                  benefits={content.valueProps.jobSeeker.benefits}
                  buttonText="Start Earning"
                  onButtonClick={() => onNavigate('jobSeekerRegister')}
                  buttonClass="bg-primary text-white"
              />
              <ValuePropCard 
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

      {/* Featured Shifts */}
      {openShifts.length > 0 && (
        <section className="pt-16">
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

      {/* Trusted By */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-primary mb-8">Trusted by Top Local Businesses</h2>
            <LogoMarquee logos={businesses.slice(0, 8)} />
        </div>
      </section>
      
      {/* App Download */}
      <section className="container mx-auto px-4">
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/50 to-slate-900"></div>
          <div className="relative grid md:grid-cols-2 items-center gap-8 p-8 md:p-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight text-white">{content.appDownload.title}</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-xl">
                {content.appDownload.subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                <a href="#" aria-label="Download on the App Store" className="transition-transform hover:scale-105">
                  <AppStoreBadgeIcon />
                </a>
                <a href="#" aria-label="Get it on Google Play" className="transition-transform hover:scale-105">
                  <GooglePlayBadgeIcon />
                </a>
              </div>
            </div>
            <div className="relative h-[450px] w-[225px] mx-auto hidden md:block">
              <div className="absolute inset-0 bg-primary rounded-[2rem] border-[10px] border-slate-700"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-5 bg-slate-700 rounded-b-lg"></div>
              <div className="absolute inset-2 bg-slate-100 rounded-[1.25rem] p-3 overflow-hidden">
                <div className="w-full h-full space-y-2 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="w-1/2 h-3 bg-slate-200 rounded"></div>
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`p-2 bg-white rounded-lg shadow space-y-1.5 ${i > 2 ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                        <div className="w-1/2 h-2.5 bg-slate-200 rounded"></div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded"></div>
                      <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
          <div className="container mx-auto px-4">
              <h2 className="text-center text-2xl font-bold text-primary mb-8">Our Proud Partners</h2>
              <LogoMarquee logos={partnerLogos} reverse={true} />
          </div>
      </section>
    </div>
  );
};

export default HomeView;