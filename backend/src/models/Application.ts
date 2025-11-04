import mongoose, { Schema, Document, Types } from 'mongoose';

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Confirmed';

export interface IApplication extends Document {
  shiftId: Types.ObjectId;
  userId: Types.ObjectId;
  status: ApplicationStatus;
  message?: string;
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  shiftId: { type: Schema.Types.ObjectId, ref: 'Shift', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Pending' },
  message: { type: String }
}, { timestamps: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
