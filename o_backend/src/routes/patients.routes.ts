import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import * as patientController from '../controllers/patient.controller';

const router = Router();
router.use(authenticate);
router.post('/', authorize('admin','receptionist','doctor'), patientController.createPatient);
router.get('/', authorize('admin','receptionist','doctor'), patientController.listPatients);
router.get('/:id', authorize('admin','receptionist','doctor'), patientController.getPatient);
router.put('/:id', authorize('admin','receptionist','doctor'), patientController.updatePatient);
router.delete('/:id', authorize('admin'), patientController.deletePatient);

export default router;
