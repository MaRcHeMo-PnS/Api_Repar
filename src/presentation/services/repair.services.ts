import { In } from 'typeorm';
import { RepairStatus, Repared } from '../../data';
import { CreateRepairDto, CustomError } from '../../domain';

export class RepairServices {
	async findAll() {
		try {
			return await Repared.find({
				where: {
					status: In([RepairStatus.PENDING, RepairStatus.COMPLETED]),
				},
				relations: {
					user: true,
				},
				select: {
					user: {
						id: true,
						name: true,
						email: true,
						role: true,
					},
				},
			});
		} catch (error) {
			throw CustomError.internalServer('Error fetching repair data');
		}
	}

	async findOne(id: string) {
		const repair = await Repared.findOne({
			where: {
				status: RepairStatus.PENDING,
				id,
			},
		});

		if (!repair) {
			throw CustomError.notFoud('Repair not found');
		}
		return repair;
	}

	async create(data: CreateRepairDto) {
		const repair = new Repared();

		repair.date = data.date;
		repair.userId = data.userId;
		repair.serialn = data.serialn;
		repair.description = data.description;

		try {
			return await repair.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating repair 2');
		}
	}

	async update(id: string) {
		const repair = await this.findOne(id);

		repair.status = RepairStatus.COMPLETED;

		try {
			await repair.save();
			return {
				message: 'Update repair',
			};
		} catch (error) {
			throw CustomError.internalServer('Error update repair');
		}
	}

	async delete(id: string) {
		const repair = await this.findOne(id);

		repair.status = RepairStatus.CANCELED;

		try {
			await repair.save();
			return {
				message: 'Canceled repair',
			};
		} catch (error) {
			throw CustomError.internalServer('Error update repair');
		}
	}
}
