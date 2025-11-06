// FIX: Removed self-import of 'Role' which was causing a conflict.
export enum Role {
  Chef = 'Chef',
  Barista = 'Barista',
  Waiter = 'Waiter',
  Host = 'Host',
  KitchenStaff = 'Kitchen Staff',
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

export type UserType = 'JobSeeker' | 'Business';

// FIX: Moved the View type here from App.tsx to avoid circular dependencies.
export type View =
  | 'home'
  | 'jobs'
  | 'insights'
  | 'login'
  | 'register'
  | 'jobSeekerRegister'
  | 'jobAnnouncerRegister'
  | 'profile'
  | 'business'
  | 'jobSeekerDashboard'
  | 'adminDashboard'
  | 'chat'
  | 'chatsList'
  | 'availability';


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
}

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type WeekDay = typeof weekDays[number];

export interface Job {
  id: string;
  businessName: string;
  businessLogo: string;
  talentId?: string;
  applicants?: User[];
  role: Role;
  startDate: string;
  workDays: WeekDay[];
  scheduleDetails: string;
  hourlyRate: number;
  location: string;
  description: string;
  postedAt: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  role: Role;
  rating: number;
  reviewCount: number;
  userType: UserType;
  totalEarnings?: number;
  applications?: Application[];
  location?: string;
  bio?: string;
  experience?: Experience[];
  skills?: string[];
  reviews?: Review[];
  jobs?: Job[];
}

export interface Experience {
  id: number;
  position: string;
  place: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Shift {
  id: string;
  businessName: string;
  businessLogo: string;
  role: Role;
  date: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  location: string;
  status: ShiftStatus;
  applicants: User[];
  acceptedApplicantId?: string;
  description: string;
  postedAt: string;
  languages?: string[];
  rating?: number;
  requirements?: string[];
  allowPreApplyMessaging?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  shiftId: string;
  participants: { userId: string, businessId: string };
  messages: Message[];
}

export const availabilityTypes = ['Single Shifts', 'Part-time Job'] as const;
export type AvailabilityType = typeof availabilityTypes[number];

export const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'] as const;
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

// Types for editable website content
export interface HeroContent {
  title: string;
  subtitle: string;
}

export interface ValueProp {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

export interface ValuePropsContent {
  jobSeeker: ValueProp;
  business: ValueProp;
}

export interface AppDownloadContent {
    title: string;
    subtitle: string;
}

export interface WebsiteContent {
  hero: HeroContent;
  valueProps: ValuePropsContent;
  appDownload: AppDownloadContent;
}