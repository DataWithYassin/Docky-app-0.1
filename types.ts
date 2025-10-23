// FIX: Removed self-import of `Role` which was causing a name conflict.
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
}

export type UserType = 'JobSeeker' | 'Business';

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: Role;
  rating: number;
  reviewCount: number;
  userType: UserType;
  totalEarnings?: number;
  appliedShifts?: string[];
  location?: string;
  bio?: string;
  experience?: Experience[];
  skills?: string[];
  reviews?: Review[];
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
  description: string;
  postedAt: string;
  languages?: string[];
  rating?: number;
  requirements?: string[];
}