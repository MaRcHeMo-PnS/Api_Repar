import { Router } from 'express';
import { RepairController } from './controler';
import { RepairServices } from '../services/repair.services';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairServices();
		const repairController = new RepairController(repairService);

		router.get('/', repairController.findAllRepair);
		router.get('/:id', repairController.findOneRepair);
		router.post('/', repairController.createRepair);
		router.patch('/:id', repairController.updateRepair);
		router.delete('/:id', repairController.deleteRepair);

		return router;
	}
}
