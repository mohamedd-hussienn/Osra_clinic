import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';

export const createAppointment = async (req: Request, res: Response) => {
  const a = new Appointment(req.body);
  await a.save();
  res.status(201).json(a);
};

export const listAppointments = async (req: Request, res: Response) => {
  const items = await Appointment.find().limit(100).populate('patient doctor');
  res.json(items);
};

export const getAppointment = async (req: Request, res: Response) => {
  const a = await Appointment.findById(req.params.id).populate('patient doctor');
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
};

export const updateAppointment = async (req: Request, res: Response) => {
  const a = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
};

export const deleteAppointment = async (req: Request, res: Response) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
