import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsiteContent extends Document {
  data: any;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteContentSchema = new Schema<IWebsiteContent>({
  data: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model<IWebsiteContent>('WebsiteContent', WebsiteContentSchema);
