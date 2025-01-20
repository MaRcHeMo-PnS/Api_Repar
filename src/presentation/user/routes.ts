import { Router } from 'express';
import { UserController } from './controler';
import { UserService } from '../services/user.services';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const userService = new UserService();
		const userController = new UserController(userService);

		router.get('/', userController.fineAllUser);
		router.get('/:id', userController.findOneUser);
		router.post('/', userController.createUser);
		router.patch('/:id', userController.updateUser);
		router.delete('/:id', userController.deleteUser);

		return router;
	}
}
