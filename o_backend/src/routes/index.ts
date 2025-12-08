import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patients.routes';
import appointmentRoutes from './appointments.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);

export default router;
