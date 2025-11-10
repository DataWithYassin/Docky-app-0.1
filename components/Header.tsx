import React, { useState, useRef, useEffect } from 'react';
import { View, User, Role, Notification, RoleDetail } from '../types';
import { BellIcon, ChevronDownIcon, Bars3Icon, XMarkIcon, FlagUKIcon, FlagESIcon, FlagPTIcon } from './Icons';
import { useLanguage, Language } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import NotificationPanel from './NotificationPanel';

const languageOptions: Record<Language, { name: string, flag: React.ReactNode }> = {
    en: { name: 'English', flag: <FlagUKIcon className="w-5 h-5 rounded-sm" /> },
    es: { name: 'Español', flag: <FlagESIcon className="w-5 h-5 rounded-sm" /> },
    pt: { name: 'Português', flag: <FlagPTIcon className="w-5 h-5 rounded-sm" /> },
};

const Header: React.FC<{
  currentView: View;
  onNavigate: (view: View) => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllNotificationsAsRead: () => void;
  roleDetails: RoleDetail[];
}> = ({ currentView, onNavigate, isLoggedIn, user, onLogout, notifications, onNotificationClick, onMarkAllNotificationsAsRead, roleDetails }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslations();
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;
  
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(p => !p);
    setIsLangDropdownOpen(false);
    setIsNotificationPanelOpen(false);
  };
  
  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(p => !p);
    setIsProfileDropdownOpen(false);
    setIsNotificationPanelOpen(false);
  };

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(p => !p);
    setIsProfileDropdownOpen(false);
    setIsLangDropdownOpen(false);
  };

  const NavLink: React.FC<{ view: View, children: React.ReactNode }> = ({ view, children }) => (
    <button
      onClick={() => onNavigate(view)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        currentView === view
        ? 'bg-primary text-white'
        : 'text-slate-600 hover:bg-slate-200 hover:text-primary'
      }`}
    >
      {children}
    </button>
  );

  const MobileNavLink: React.FC<{ view: View, children: React.ReactNode, isButton?: boolean, buttonStyle?: string }> = ({ view, children, isButton = false, buttonStyle = '' }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={isButton ? buttonStyle : `block w-full text-left px-4 py-3 text-base font-semibold transition-colors rounded-md ${
        currentView === view
        ? 'bg-accent text-white'
        : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
            setIsProfileDropdownOpen(false);
        }
        if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
            setIsLangDropdownOpen(false);
        }
        if (notificationPanelRef.current && !notificationPanelRef.current.contains(target)) {
            setIsNotificationPanelOpen(false);
        }
        if (
            isMobileMenuOpen &&
            mobileMenuPanelRef.current && !mobileMenuPanelRef.current.contains(target) &&
            mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(target)
        ) {
            setIsMobileMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileDropdownOpen, isLangDropdownOpen, isNotificationPanelOpen]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl">🐳</span>
            <h1 className="text-xl font-bold text-primary tracking-tighter">Docky</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink view="home">{t('home')}</NavLink>
            <NavLink view="jobs">{t('jobs')}</NavLink>
            <NavLink view="availability">Find Talent</NavLink>
            <NavLink view="insights">{t('insights')}</NavLink>
            {isLoggedIn && <NavLink view="chatsList">Chats</NavLink>}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative" ref={langDropdownRef}>
                <button 
                    onClick={toggleLangDropdown}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-200 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isLangDropdownOpen}
                >
                    {languageOptions[language].flag}
                    <span className="text-sm font-medium text-slate-700">{language.toUpperCase()}</span>
                    <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                </button>
                {isLangDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                        {(Object.keys(languageOptions) as Language[]).map(langCode => (
                            <button
                                key={langCode}
                                onClick={() => {
                                    setLanguage(langCode);
                                    setIsLangDropdownOpen(false);
                                }}
                                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                                {languageOptions[langCode].flag}
                                <span>{languageOptions[langCode].name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            {isLoggedIn && (
              <div className="relative" ref={notificationPanelRef}>
                <button
                  onClick={toggleNotificationPanel}
                  className="relative p-2 rounded-full hover:bg-slate-200 transition-colors"
                  aria-label="Notifications"
                >
                  <BellIcon className="w-6 h-6 text-slate-600" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
                {isNotificationPanelOpen && (
                  <NotificationPanel
                    notifications={notifications}
                    onNotificationClick={onNotificationClick}
                    onMarkAllAsRead={onMarkAllNotificationsAsRead}
                    onClose={() => setIsNotificationPanelOpen(false)}
                  />
                )}
              </div>
            )}

            {isLoggedIn && user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-slate-200 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <img src={user.avatar} alt="user avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name.split(' ')[0]}</span>
                  {user.userType === 'JobSeeker' && (() => {
                     const roleInfo = roleDetails.find(r => r.name === user.role);
                     if (!roleInfo) return null;
                     return (
                       <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${roleInfo.classes}`}>
                         {roleInfo.emoji}
                       </span>
                     );
                  })()}
                  <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    {user.email === 'admin@docky.com' && (
                       <>
                         <button
                           onClick={() => { onNavigate('adminDashboard'); setIsProfileDropdownOpen(false); }}
                           className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 font-semibold text-accent"
                         >
                           {t('adminDashboard')}
                         </button>
                         <div className="border-t border-slate-100 my-1"></div>
                       </>
                     )}
                    {user.userType === 'JobSeeker' && (
                        <button
                          onClick={() => { onNavigate('jobSeekerDashboard'); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          {t('myDashboard')}
                        </button>
                    )}
                     {user.userType === 'Business' && (
                        <button
                          onClick={() => { onNavigate('business'); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          {t('businessDashboard')}
                        </button>
                    )}
                    <button
                      onClick={() => { onNavigate('profile'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {user.userType === 'JobSeeker' ? t('myProfile') : t('businessProfile')}
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                    onClick={() => onNavigate('login')}
                    className="text-primary font-bold px-4 py-2 rounded-full text-sm hover:bg-slate-100 transition-colors"
                >
                    {t('login')}
                </button>
                <button
                    onClick={() => onNavigate('register')}
                    className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-accent-hover transition-colors"
                >
                    {t('register')}
                </button>
              </div>
            )}
             <div className="md:hidden flex items-center">
                <button
                    ref={mobileMenuButtonRef}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="sr-only">{t('openMenu')}</span>
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg" id="mobile-menu" ref={mobileMenuPanelRef}>
            <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
                <MobileNavLink view="home">{t('home')}</MobileNavLink>
                <MobileNavLink view="jobs">{t('jobs')}</MobileNavLink>
                <MobileNavLink view="availability">Find Talent</MobileNavLink>
                <MobileNavLink view="insights">{t('insights')}</MobileNavLink>
                {isLoggedIn && <MobileNavLink view="chatsList">Chats</MobileNavLink>}

                <div className="border-t border-slate-200 !mt-4 pt-4 space-y-3">
                    {isLoggedIn && user ? (
                        <>
                            {user.email === 'admin@docky.com' && (
                                <MobileNavLink view="adminDashboard">{t('adminDashboard')}</MobileNavLink>
                            )}
                            {user.userType === 'JobSeeker' && (
                               <MobileNavLink view="jobSeekerDashboard">{t('myDashboard')}</MobileNavLink>
                            )}
                            {user.userType === 'Business' && (
                                <MobileNavLink view="business">{t('businessDashboard')}</MobileNavLink>
                            )}
                            <MobileNavLink view="profile">{user.userType === 'JobSeeker' ? t('myProfile') : t('businessProfile')}</MobileNavLink>
                            <button
                                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                                className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                {t('logout')}
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <MobileNavLink
                                view="login"
                                isButton
                                buttonStyle="w-full text-primary font-bold px-4 py-3 rounded-full text-sm bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                                {t('login')}
                            </MobileNavLink>
                            <MobileNavLink
                                view="register"
                                isButton
                                buttonStyle="w-full bg-accent text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-accent-hover transition-colors"
                            >
                                {t('register')}
                            </MobileNavLink>
                        </div>
                    )}
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <span className="text-sm font-medium text-slate-600">Language:</span>
                        {(Object.keys(languageOptions) as Language[]).map(langCode => (
                            <button 
                                key={langCode}
                                onClick={() => { setLanguage(langCode); setIsMobileMenuOpen(false); }} 
                                className={`p-2 rounded-md transition-colors ${language === langCode ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
                                aria-label={`Switch to ${languageOptions[langCode].name}`}
                            >
                                {languageOptions[langCode].flag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;