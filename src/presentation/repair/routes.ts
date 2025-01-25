import { Router } from 'express';
import { RepairController } from './controler';
import { RepairServices } from '../services/repair.services';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Role } from '../../data';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairServices();
		const repairController = new RepairController(repairService);

		router.use(AuthMiddleware.protect);
		router.post('/', repairController.createRepair);
		router.use(AuthMiddleware.restrictTo(Role.EXPLOYEE));
		router.get('/', repairController.findAllRepair);
		router.get('/:id', repairController.findOneRepair);
		router.patch('/:id', repairController.updateRepair);
		router.delete('/:id', repairController.deleteRepair);

		return router;
	}
}
