import mongoose, { Schema, Document } from 'mongoose';

export type UserType = 'JobSeeker' | 'Business' | 'Admin';
export type Role = 'Barista' | 'Chef' | 'Waiter' | 'Host' | 'KitchenStaff' | string;

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  avatar?: string;
  role?: Role;
  rating?: number;
  reviewCount?: number;
  userType: UserType;
  bio?: string;
  location?: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  avatar: { type: String },
  role: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  userType: { type: String, required: true, enum: ['JobSeeker','Business','Admin'] },
  bio: { type: String },
  location: { type: String },
  skills: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
