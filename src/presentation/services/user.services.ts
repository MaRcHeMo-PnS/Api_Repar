import { Status, User } from '../../data';
import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UpdateUserDTO } from '../../domain/dtos/users/update.user.dto';
import { CustomError } from '../../domain/error/custom.error';

export class UserService {
	async fingOne(id: string) {
		const user = await User.findOne({
			where: {
				status: Status.AVAILABLE,
				id: id,
			},
		});
		if (!user) {
			throw CustomError.notFoud('User not found');
		}
		return user;
	}

	async fingAll() {
		try {
			const users = await User.find({
				where: {
					status: Status.AVAILABLE,
				},
			});
			return users;
		} catch (error) {
			throw CustomError.internalServer('Error fetching users');
		}
	}

	async create(data: CreateUserDTO) {
		const user = new User();

		user.name = data.name;
		user.email = data.email;
		user.password = data.password;
		user.role = data.role;
		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating user');
		}
	}

	async update(id: string, data: UpdateUserDTO) {
		const user = await this.fingOne(id);

		user.name = data.name;
		user.email = data.email;

		try {
			await user.save();
			return { message: 'User Updated' };
		} catch (error) {
			throw CustomError.internalServer('error update info');
		}
	}

	async delete(id: string) {
		const user = await this.fingOne(id);

		user.status = Status.DISABLED;
		try {
			await user.save();
		} catch (error) {
			throw CustomError.internalServer('error delete user');
		}
	}
}
