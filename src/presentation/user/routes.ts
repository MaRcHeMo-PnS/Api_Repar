import { Router } from 'express';
import { UserController } from './controler';
import { UserService } from '../services/user.services';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const userService = new UserService();
		const userController = new UserController(userService);

		router.post('/', userController.createUser);
		router.post('/login', userController.login);

		router.use(AuthMiddleware.protect);
		router.get('/', userController.fineAllUser);
		router.get('/:id', userController.findOneUser);
		router.patch('/:id', userController.updateUser);
		router.delete('/:id', userController.deleteUser);

		return router;
	}
}
