import React from 'react';

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const MoneyIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2V8a2 2 0 012-2h4" />
  </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const LocationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const VerificationIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const CheckBadgeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.5a2.25 2.25 0 01-1.06.602L3 21l.898-3.593a2.25 2.25 0 01.602-1.06L15.12 4.487a2.25 2.25 0 011.742 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 5.25l5.25 5.25" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const TrendingUpIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export const AppleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.809.023-.02-.023-.096-.023-.096s-1.043-.469-1.043-2.234c0-1.649-.5-2.259-.594-2.343-.101-.096-.234-.141-.343-.141-.112 0-.24.045-.358.138-.119.093-.306.229-.479.414-.173.185-.259.335-.31.383-.051.049-.102.096-.153.141a2.07 2.07 0 0 0-.42.456c-.18.212-.323.398-.42.543-.102.153-.173.28-.213.383-.04.101-.06.184-.06.243a.97.97 0 0 0 .04.315.91.91 0 0 0 .1.234c.04.096.09.192.14.288.05.096.1.191.15.287.05.096.1.184.15.259.05.075.09.141.14.207.04.065.09.138.14.207.05.065.09.121.14.168.05.048.09.087.14.118.05.03.09.051.13.065.04.015.08.023.12.023h.011a.97.97 0 0 0 .343-.051c.112-.03.223-.075.333-.138.112-.06.213-.13.303-.207.09-.075.17-.153.24-.234.07-.082.13-.165.18-.248.05-.082.09-.165.12-.248a.9.9 0 0 0 .04-.288.9.9 0 0 0-.04-.315c-.02-.082-.05-.165-.08-.248-.03-.082-.06-.153-.1-.217-.03-.065-.07-.13-.1-.184a.95.95 0 0 0-.14-.248c-.05-.082-.09-.153-.14-.217a.95.95 0 0 0-.14-.207c-.05-.056-.09-.102-.13-.141-.04-.04-.08-.075-.12-.102a.83.83 0 0 0-.18-.138c-.05-.03-.09-.051-.13-.065a.88.88 0 0 0-.2-.04.83.83 0 0 0-.213.023.9.9 0 0 0-.315.118c-.101.075-.19.168-.27.278-.08.11-.15.229-.2.358a2.5 2.5 0 0 0-.18.479c-.05.153-.09.306-.12.456-.02.153-.04.297-.04.448 0 .15.02.306.05.456.03.15.08.306.14.456.06.15.13.306.2.456.07.15.15.297.24.448.09.15.18.297.28.437.1.14.21.278.32.414.11.138.23.278.35.405.12.129.25.248.38.368.13.119.26.229.4.329.14.1.28.184.42.258.14.075.29.13.44.168.15.04.3.06.45.06h.011c.15 0 .3-.02.45-.06a.99.99 0 0 0 .44-.168c.14-.075.28-.153.42-.258.14-.1.27-.2.4-.315.13-.119.25-.229.38-.348.13-.119.25-.248.37-.378.12-.129.23-.258.34-.395.11-.138.21-.288.3-.437.09-.15.18-.306.26-.479.08-.173.15-.358.2-.543.05-.184.09-.38.12-.574.03-.194.04-.398.04-.604 0-.207-.01-.414-.04-.622-.03-.207-.06-.414-.12-.622a2.5 2.5 0 0 0-.2-.585c-.07-.184-.15-.358-.24-.533a2.5 2.5 0 0 0-.32-.506c-.12-.173-.25-.329-.4-.467-.15-.138-.31-.258-.47-.368-.16-.11-.33-.207-.5-.288-.17-.082-.34-.153-.51-.217a3 3 0 0 0-.57-.184c-.2-.056-.4-.096-.61-.129a.9.9 0 0 0-.358.051.9.9 0 0 0-.343.141c-.112.096-.213.207-.304.335a.9.9 0 0 0-.153.448.9.9 0 0 0 .153.448c.04.096.11.184.2.278.09.096.2.173.32.248.12.075.25.13.38.168.13.04.26.06.4.06.14 0 .28-.02.4-.06.13-.04.25-.09.38-.168.12-.075.23-.16.32-.258.09-.096.17-.207.24-.329a.8.8 0 0 0 .04-.448c-.02-.217-.18-.38-.39-.414a.83.83 0 0 0-.41.04c-.11.051-.21.11-.3.184-.09.075-.17.16-.24.258a1 1 0 0 0-.2.344c-.04.11-.06.229-.06.358 0 .129.02.248.06.368.04.119.09.229.15.329.06.1.13.191.2.278.07.087.15.165.24.234a1 1 0 0 0 .4.207c.14.04.28.06.42.06.14 0 .28-.02.42-.06.14-.04.27-.09.4-.168.13-.075.25-.16.35-.258.1-.096.18-.207.25-.329.07-.119.12-.248.15-.387.03-.138.04-.278.04-.414s-.01-.278-.04-.414c-.03-.138-.08-.268-.15-.387a.9.9 0 0 0-.25-.329c-.1-.096-.2-.184-.32-.258a1.2 1.2 0 0 0-.4-.168.9.9 0 0 0-.42.06c-.14.04-.27.1-.4.184-.13.087-.24.184-.34.297-.1.112-.18.234-.24.368a.9.9 0 0 0-.09.414c0 .165.05.32.14.448.09.129.21.229.35.306.14.075.29.112.45.112.16 0 .31-.038.45-.112a.9.9 0 0 0 .35-.306c.09-.129.14-.283.14-.448 0-.165-.05-.32-.14-.448a.8.8 0 0 0-.35-.306c-.14-.075-.29-.112-.45-.112-.16 0-.31.038-.45.112a.9.9 0 0 0-.35.306.9.9 0 0 0-.14.448c0 .11.02.217.06.315.04.096.09.184.15.268.06.082.13.153.2.217.07.065.15.121.22.168.07.048.15.087.22.118.07.03.15.051.22.065.07.015.15.023.22.023s.15-.008.22-.023c.07-.015.15-.03.22-.065.07-.03.15-.06.22-.118.07-.048.15-.102.22-.168.07-.065.14-.13.2-.217.06-.082.11-.173.15-.268.04-.096.06-.207.06-.315 0-.11-.02-.217-.06-.315a.9.9 0 0 0-.15-.268.9.9 0 0 0-.2-.217c-.07-.065-.15-.121-.22-.168a.9.9 0 0 0-.45-.118c-.16 0-.31.038-.45.112Z"/>
    <path d="M6.166 8.903C6.136 7.512 7.115 6.19 8.28 6.19c1.145 0 1.966.782 1.966 2.215 0 1.54-.74 2.625-1.933 2.625-1.222 0-2.157-1.182-2.157-2.625Z"/>
  </svg>
);

export const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 16 16">
    <path d="M14.222 9.374c1.037-.61.908-1.787.043-2.411l-3.24-1.923L8.33 2.924l-.229 12.06 4.375-2.512 1.746-1.099Z" fill="#34A853"/>
    <path d="m3.13 1.077 4.968 4.968-3.24 1.923-1.728-1.047L3.13 1.077Z" fill="#EA4335"/>
    <path d="M3.13 14.923 8.1 9.955l-3.24-1.923-1.728 1.047 0 5.844Z" fill="#FBBC04"/>
    <path d="M8.33 2.924 3.13 1.077a2.031 2.031 0 0 0-1.872 1.872v10.106c0 .943.621 1.745 1.52 1.996l6.83-3.896L8.33 2.924Z" fill="#4285F4"/>
  </svg>
);