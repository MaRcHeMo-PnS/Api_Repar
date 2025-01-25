import { encriptAdapter } from '../../config';
import { JwtAdapter } from '../../config/jwt.adapter';
import { Status, User } from '../../data';
import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { LoginUserDto } from '../../domain/dtos/users/login_user.dto';
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
			const newUser = await user.save();
			// return await user.save();
			return {
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
			};
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

	async login(credentials: LoginUserDto) {
		const user = await this.findUserByEmail(credentials.email);

		const isMatching = encriptAdapter.compare(
			credentials.password,
			user.password,
		);
		if (!isMatching) throw CustomError.unAuthorized('invalid Credentials');

		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token) throw CustomError.internalServer('Error generation token');

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	async findUserByEmail(email: string) {
		const user = await User.findOne({
			where: {
				email: email,
				status: Status.AVAILABLE,
			},
		});

		if (!user) throw CustomError.notFoud(`User with email: ${email} not found`);

		return user;
	}
}
