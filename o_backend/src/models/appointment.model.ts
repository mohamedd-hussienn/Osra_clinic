import { Schema, model, Document, Types } from 'mongoose';

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  startAt: Date;
  endAt?: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startAt: { type: Date, required: true },
  endAt: Date,
  status: { type: String, enum: ['scheduled','completed','cancelled'], default: 'scheduled' },
  notes: String
}, { timestamps: true });

export default model<IAppointment>('Appointment', AppointmentSchema);
