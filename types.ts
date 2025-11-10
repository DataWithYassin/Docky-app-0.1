

export type View =
  | 'home'
  | 'jobs'
  | 'availability'
  | 'insights'
  | 'login'
  | 'register'
  | 'jobSeekerRegister'
  | 'jobAnnouncerRegister'
  | 'profile'
  | 'jobSeekerDashboard'
  | 'business'
  | 'adminDashboard'
  | 'chatsList'
  | 'chat';

export type Role = string;

export interface RoleDetail {
  name: Role;
  emoji: string;
  classes: string;
}

export enum ShiftStatus {
    Open = 'Open',
    Filled = 'Filled',
    Completed = 'Completed',
    Expired = 'Expired',
}

export enum ApplicationStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Confirmed = 'Confirmed',
}

export type UserType = 'JobSeeker' | 'Business' | 'Admin';
export type UserStatus = 'Active' | 'Suspended' | 'Verified';

export interface Experience {
    id: number;
    position: string;
    place: string;
    location: string;
    startDate: string;
    endDate: string;
}

export interface Review {
    id: string;
    reviewerName: string;
    reviewerAvatar: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Application {
    shiftId?: string;
    jobId?: string;
    status: ApplicationStatus;
    message?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    userType: UserType;
    role: Role; // Predominant role for job seekers
    location?: string;
    rating: number;
    reviewCount: number;
    reviews?: Review[];
    bio?: string;
    skills?: string[];
    experience?: Experience[];
    applications?: Application[];
    totalEarnings?: number;
    status: UserStatus;
    createdAt: string;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Shift {
    id: string;
    businessName: string;
    businessId: string;
    businessLogo: string;
    role: Role;
    date: string;
    startTime: string;
    endTime: string;
    hourlyRate: number;
    location: string;
    description: string;
    applicants: User[];
    status: ShiftStatus;
    postedAt: string;
    rating?: number;
    // FIX: Add optional filledAt property to match mock data.
    filledAt?: string;
    requirements?: string[];
    languages?: string[];
    coordinates?: Coordinates;
    allowPreApplyMessaging?: boolean;
}

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type WeekDay = typeof weekDays[number];

export interface Job {
    id: string;
    businessId: string;
    businessName: string;
    businessLogo: string;
    role: Role;
    startDate: string;
    workDays: WeekDay[];
    scheduleDetails: string;
    hourlyRate: number;
    location: string;
    description: string;
    talentId?: string | null; // Filled by which talent
    postedAt: string;
    applicants?: User[];
    coordinates?: Coordinates;
}

export enum NotificationType {
    APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
    APPLICATION_REJECTED = 'APPLICATION_REJECTED',
    NEW_MESSAGE = 'NEW_MESSAGE',
    NEW_APPLICANT = 'NEW_APPLICANT',
    SHIFT_CONFIRMED = 'SHIFT_CONFIRMED',
}

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    timestamp: string;
    isRead: boolean;
    relatedShiftId?: string;
    relatedUserId?: string;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

export interface Chat {
    id: string;
    participants: {
        userId: string;
        businessId: string;
    };
    shiftId: string;
    messages: Message[];
}

export interface SavedSearchFilters {
    postType: 'All' | 'Part-time Jobs' | 'Single Shifts';
    roles: Role[];
    cities: string[];
    time: 'All' | 'Morning' | 'Afternoon' | 'Evening';
    date: string;
    userLocation: { lat: number, lon: number } | null;
    searchRadius: number;
}

export interface SavedSearch {
    id: string;
    name: string;
    filters: SavedSearchFilters;
    notificationsEnabled: boolean;
}

export const availabilityTypes = ['Single Shifts', 'Part-time Job', 'Full-time Job'] as const;
export type AvailabilityType = typeof availabilityTypes[number];

export const timeSlots = ['Morning (6am-12pm)', 'Afternoon (12pm-6pm)', 'Evening (6pm-12am)', 'Overnight (12am-6am)'] as const;
export type TimeSlot = typeof timeSlots[number];

export interface AvailabilityPost {
    id: string;
    userId: string;
    postedAt: string;
    lookingFor: AvailabilityType[];
    availableDays: WeekDay[];
    availableTimes: TimeSlot[];
    roles: Role[];
    experienceSummary: string;
    languages: string[];
    notes: string;
}

export interface WebsiteContent {
    hero: {
        title: string;
        subtitle: string;
    };
    valueProps: {
        jobSeeker: {
            title: string;
            subtitle: string;
            benefits: string[];
        };
        business: {
            title: string;
            subtitle: string;
            benefits: string[];
        };
    };
    appDownload: {
        title: string;
        subtitle: string;
    };
}