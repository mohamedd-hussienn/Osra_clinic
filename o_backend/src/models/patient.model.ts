import { Schema, model, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  dob?: Date;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

const PatientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  dob: Date,
  gender: String,
  phone: String,
  email: String,
  address: String,
  notes: String
}, { timestamps: true });

export default model<IPatient>('Patient', PatientSchema);
