import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();
router.use(authenticate);
router.post('/', authorize('admin','receptionist','doctor'), appointmentController.createAppointment);
router.get('/', authorize('admin','receptionist','doctor'), appointmentController.listAppointments);
router.get('/:id', authorize('admin','receptionist','doctor'), appointmentController.getAppointment);
router.put('/:id', authorize('admin','receptionist','doctor'), appointmentController.updateAppointment);
router.delete('/:id', authorize('admin'), appointmentController.deleteAppointment);

export default router;
