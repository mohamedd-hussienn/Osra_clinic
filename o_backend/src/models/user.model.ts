import { Schema, model, Document } from 'mongoose';

export type Role = 'admin' | 'doctor' | 'receptionist' | 'pharmacist';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: Role;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin','doctor','receptionist','pharmacist'], default: 'receptionist' }
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
