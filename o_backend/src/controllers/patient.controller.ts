import { Request, Response } from 'express';
import Patient from '../models/patient.model';

export const createPatient = async (req: Request, res: Response) => {
  const p = new Patient(req.body);
  await p.save();
  res.status(201).json(p);
};

export const listPatients = async (req: Request, res: Response) => {
  const patients = await Patient.find().limit(100);
  res.json(patients);
};

export const getPatient = async (req: Request, res: Response) => {
  const p = await Patient.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

export const updatePatient = async (req: Request, res: Response) => {
  const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

export const deletePatient = async (req: Request, res: Response) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
