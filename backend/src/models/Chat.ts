import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  text: string;
  timestamp: Date;
}

export interface IChat extends Document {
  shiftId: Types.ObjectId;
  userId: Types.ObjectId;
  businessId: Types.ObjectId;
  messages: Types.DocumentArray<IMessage>;
  createdAt: Date;
}

const MessageSubSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new Schema<IChat>({
  shiftId: { type: Schema.Types.ObjectId, ref: 'Shift', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: { type: [MessageSubSchema], default: [] }
}, { timestamps: true });

export default mongoose.model<IChat>('Chat', ChatSchema);
