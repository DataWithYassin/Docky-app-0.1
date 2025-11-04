import mongoose, { Schema, Document, Types } from 'mongoose';

export type ShiftStatus = 'Open' | 'Filled' | 'Expired';

export interface IShift extends Document {
  businessId: Types.ObjectId;
  businessName: string;
  businessLogo?: string;
  role: string;
  date: Date;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  status: ShiftStatus;
  postedAt: Date;
  rating?: number;
  applicants: Types.ObjectId[];
  acceptedUserId?: Types.ObjectId;
}

const ShiftSchema = new Schema<IShift>({
  businessId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  businessLogo: { type: String },
  role: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String },
  endTime: { type: String },
  hourlyRate: { type: Number, required: true },
  status: { type: String, default: 'Open' },
  postedAt: { type: Date, default: Date.now },
  rating: { type: Number },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  acceptedUserId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<IShift>('Shift', ShiftSchema);
