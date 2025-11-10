import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const Bars3Icon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const FlagUKIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
    <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
    <clipPath id="b"><path d="M30 15 60 0v30L0 0v30z"/></clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169"/>
      <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
      <path d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export const FlagESIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" {...props}>
    <path fill="#c60b1e" d="M0 0h60v40H0z"/>
    <path fill="#ffc400" d="M0 10h60v20H0z"/>
  </svg>
);

export const FlagPTIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" {...props}>
    <path fill="#006241" d="M0 0h300v500H0z"/>
    <path fill="#e21e26" d="M300 0h500v500H300z"/>
  </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

export const VerificationIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.491 4.491 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.57-1.037 1.24-2.062 2.047-3.098m-2.047 3.098c-.516 1.076-.837 2.228-1.035 3.418m-1.035-3.418a9.063 9.063 0 0 0-4.198 2.023 3 3 0 0 0-1.087 2.133M3.364 5.667c-1.33 1.144-2.262 2.723-2.262 4.502 0 1.06.223 2.052.635 2.953m11.25-8.158c-1.282-1.33-3.142-2.263-5.25-2.263s-3.968.933-5.25 2.263m10.5 0a8.997 8.997 0 0 1 2.635 5.667m0 0a8.997 8.997 0 0 1-2.635 5.667m0 0c1.33 1.144 2.262 2.723 2.262 4.502 0 1.06-.223 2.052-.635 2.953m0 0c.636 1.028 1.428 1.944 2.366 2.723m0 0c.538.438 1.14.793 1.785 1.075M6.636 15.667c1.33-1.144 2.262-2.723 2.262-4.502 0-1.06-.223-2.052-.635-2.953m0 0c-.636-1.028-1.428-1.944-2.366-2.723m0 0c-.538-.438-1.14-.793-1.785-1.075m14.25 15.366c1.33 1.144 2.262 2.723 2.262 4.502 0 1.06-.223 2.052-.635 2.953m0 0c.636 1.028 1.428 1.944 2.366 2.723m0 0c.538.438 1.14.793 1.785 1.075m-15.366-1.075c-1.33-1.144-2.262-2.723-2.262-4.502 0-1.06.223 2.052.635-2.953m0 0c-.636-1.028-1.428-1.944-2.366-2.723m0 0c-.538-.438-1.14-.793-1.785-1.075M12 12.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.92A2.25 2.25 0 0 1 3.67 18.22V7.5a2.25 2.25 0 0 1 2.25-2.25h1.25a2.25 2.25 0 0 1 2.25 2.25v2.25m6.75 0v-2.25a2.25 2.25 0 0 0-2.25-2.25H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-6 0H6.75a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h1.25a2.25 2.25 0 0 1 2.25 2.25v2.25" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const ListBulletIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

export const CalendarDaysIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" />
  </svg>
);

export const AppStoreBadgeIcon: React.FC<IconProps> = (props) => (
    <svg width="135" height="40" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="135" height="40" rx="6" fill="black"/>
        <path d="M16.1424 10.2222C16.1424 9.42222 16.7824 8.78223 17.5824 8.78223H22.3824C23.1824 8.78223 23.8224 9.42222 23.8224 10.2222V15.0222C23.8224 15.8222 23.1824 16.4622 22.3824 16.4622H17.5824C16.7824 16.4622 16.1424 15.8222 16.1424 15.0222V10.2222Z" fill="white"/>
    </svg>
);

export const GooglePlayBadgeIcon: React.FC<IconProps> = (props) => (
    <svg width="135" height="40" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="135" height="40" rx="6" fill="black"/>
        {/* FIX: Added missing opening <g> tag to wrap the path elements, resolving a JSX parsing error. */}
        <g>
            <path d="M16 8L28 20L16 32V8Z" fill="#FFD042"/>
            <path d="M16 8L16 32L24.4706 24.4706L16 8Z" fill="#4CAF50"/>
            <path d="M28 20L24.4706 24.4706L16 32L19.5294 28.4706L28 20Z" fill="#F44336"/>
            <path d="M19.5294 11.5294L16 8L24.4706 15.5294L28 20L19.5294 11.5294Z" fill="#2196F3"/>
        </g>
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const CurrencyEuroIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.144-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.057-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const NoSymbol: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226.55-.223 1.159-.223 1.71 0 .55.223 1.02.684 1.11 1.226l.08 1.018c.278.046.55.106.816.182.266.076.524.166.772.282l.994-.379c.55-.213 1.158-.106 1.61.26l1.273 1.273c.367.367.472.96.26 1.61l-.378.994c.116.248.206.506.282.772.076.266.136.538.182.816l1.018.08c.542.09.993.56 1.216 1.11.223.55.223 1.159 0 1.71-.223.55-.674 1.02-1.216 1.11l-1.018.08c-.046.278-.106.55-.182.816-.076.266-.166.524-.282.772l.378.994c.213.55.106 1.158-.26 1.61l-1.273 1.273c-.367.367-.96.472-1.61.26l-.994-.379a6.523 6.523 0 0 1-.772.282c-.266.076-.538.136-.816.182l-.08 1.018c-.09.542-.56 1.003-1.11 1.226-.55.223-1.159-.223-1.71 0-.55-.223-1.02-.684-1.11-1.226l-.08-1.018a6.523 6.523 0 0 1-.816-.182c-.266-.076-.524-.166-.772-.282l-.994.379c-.55.213-1.158.106-1.61-.26l-1.273-1.273c-.367.367-.472.96-.26-1.61l.378-.994a6.523 6.523 0 0 1-.282-.772c-.076-.266-.136-.538-.182-.816l-1.018-.08c-.542-.09-1.003-.56-1.226-1.11-.223-.55-.223-1.159 0-1.71.223.55.684-1.02 1.226-1.11l1.018-.08c.046-.278.106-.55.182-.816.076-.266.166-.524.282-.772l-.378-.994c-.213-.55-.106-1.158.26-1.61L4.6 3.94c.367-.367.96-.472 1.61-.26l.994.379a6.523 6.523 0 0 1 .772-.282c.266-.076.538-.136.816-.182l.08-1.018Zm-1.859 12.11a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" />
  </svg>
);

export const DocumentMagnifyingGlassIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.5h-8.01a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5h8.01a1.5 1.5 0 0 1 1.5 1.5v8.231l5.153 5.153-1.414 1.414-5.153-5.153Z" />
  </svg>
);

export const MagnifyingGlassIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.356-11.303-8H24v-8H12.697C11.048,24.644,8,29.08,8,36C8,40.418,11.582,44,16,44h8V44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.986,36.639,44,30.825,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" {...props}>
        <path fill="#1877F2" d="M43.011,4.5H4.989C4.444,4.5,4,4.944,4,5.489v37.022C4,43.056,4.444,43.5,4.989,43.5h19.462V29.545h-5.263v-6.111h5.263v-4.521c0-5.21,3.08-8.064,7.822-8.064c2.247,0,4.646,0.399,4.646,0.399v5.224h-2.784c-2.583,0-3.415,1.604-3.415,3.267v3.694h5.882l-0.92,6.111H35.21v13.955h7.791c0.545,0,0.999-0.444,0.999-0.989V5.489C44,4.944,43.556,4.5,43.011,4.5z"></path>
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.53-0.417m-4.386-.719A9.76 9.76 0 0 1 2.25 12c0-4.556 4.03-8.25 9-8.25 4.97 0 9 3.694 9 8.25Z" />
  </svg>
);

export const ScaleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-1.472 0-2.882.265-4.185.75M12 15.75a48.448 48.448 0 0 0-6.75 2.625m13.5 0a48.448 48.448 0 0 1-6.75 2.625m3.375-3.375c.621 1.476 1.448 2.75 2.366 3.828M12 15.75c-.621 1.476-1.448 2.75-2.366 3.828m0 0a48.416 48.416 0 0 1-6.75.47m6.75-.47a48.416 48.416 0 0 0 6.75.47M4.5 4.97A48.416 48.416 0 0 1 12 4.5c2.291 0 4.545.16 6.75.47m0 0a48.448 48.448 0 0 1 6.75 2.625m-13.5 0a48.448 48.448 0 0 0 6.75 2.625m0 0a48.416 48.416 0 0 1-6.75-.47m6.75 .47a48.416 48.416 0 0 0-6.75-.47m-3.375 3.375c-.621 1.476-1.448 2.75-2.366 3.828M12 9.75a48.448 48.448 0 0 1-6.75 2.625m13.5 0a48.448 48.448 0 0 0-6.75 2.625m0 0a48.416 48.416 0 0 1-6.75-.47m6.75 .47a48.416 48.416 0 0 0 6.75-.47" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.534a1.125 1.125 0 0 1-1.097-.987l-.21-1.263a1.125 1.125 0 0 0-1.097-.987H8.25c-.552 0-1-.448-1-1v-1.5c0-.552.448-1 1-1h.268l-.21-1.263a1.125 1.125 0 0 0-1.097-.987l-3.722-.534A1.125 1.125 0 0 1 2.25 12.894V8.607c0-.97.616-1.813 1.5-2.097m6.036 9.385H12c.552 0 1 .448 1 1v1.5c0 .552-.448 1-1 1H9.75l-.21-1.263a1.125 1.125 0 0 0-1.097-.987l-3.722-.534a1.125 1.125 0 0 1-.98-1.196l.54-3.239a1.125 1.125 0 0 1 1.196-.98l3.722.534a1.125 1.125 0 0 0 .98-1.196l-.54-3.239a1.125 1.125 0 0 1 .98-1.196l3.722-.534a1.125 1.125 0 0 1 1.196.98l.54 3.239a1.125 1.125 0 0 0 1.196.98l3.722.534a1.125 1.125 0 0 1 .98 1.196l-.54 3.239a1.125 1.125 0 0 1-1.196.98l-3.722-.534a1.125 1.125 0 0 0-.98 1.196l.54 3.239a1.125 1.125 0 0 1-.98 1.196l-3.722.534a1.125 1.125 0 0 0-1.097.987l-.21 1.263Z" />
  </svg>
);

export const CrosshairsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.255 0-2.45.24-3.57.67m3.57-.67c1.12.43 2.315.67 3.57.67m-7.14 0c-1.033-.42-2.11-.73-3.228-.954m6.456 0A12.02 12.02 0 0 0 12 7.5m0 0a12.02 12.02 0 0 1-3.228.496m3.228-.496a12.023 12.023 0 0 1 3.228.496M12 15.75v1.5m0-1.5c-1.255 0-2.45-.24-3.57-.67m3.57.67c1.12.43 2.315.67 3.57.67m-7.14 0c1.033.42 2.11.73 3.228.954m-6.456 0A12.02 12.02 0 0 1 12 16.5m0 0a12.02 12.02 0 0 0 3.228-.496m-3.228.496a12.023 12.023 0 0 0-3.228-.496M8.25 12h-1.5m1.5 0c0-1.255.24-2.45.67-3.57m-.67 3.57c.43-1.12.67-2.315.67-3.57m0 7.14c-.42 1.033-.73 2.11-.954 3.228m0-6.456A12.02 12.02 0 0 1 7.5 12m0 0A12.02 12.02 0 0 0 7.004 8.772m.496 3.228A12.023 12.023 0 0 0 7.004 15.228M15.75 12h1.5m-1.5 0c0-1.255-.24-2.45-.67-3.57m.67 3.57c-.43-1.12-.67-2.315-.67-3.57m0 7.14c.42 1.033.73 2.11.954 3.228m0-6.456A12.02 12.02 0 0 0 16.5 12m0 0a12.02 12.02 0 0 1 .496-3.228m-.496 3.228a12.023 12.023 0 0 1 .496 3.228M12 12a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
  </svg>
);

export const ArrowDownTrayIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a6.01 6.01 0 0 0-3.75 0M10.5 21h3M12 3c-3.314 0-6 2.686-6 6a6 6 0 0 0 6 6c3.314 0 6-2.686 6-6a6 6 0 0 0-6-6Z" />
  </svg>
);

export const BookmarkIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
  </svg>
);

export const BookmarkSlashIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V14.25l-2.062-2.062M12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
  </svg>
);