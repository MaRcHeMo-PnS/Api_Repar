import { Request, Response } from 'express';
import { CreateRepairDto, CustomError } from '../../domain';
import { RepairServices } from '../services/repair.services';

export class RepairController {
	constructor(private readonly repairServices: RepairServices) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}

		console.log(error);
		return res.status(500).json({ message: 'Something went very wrong! 🧨' });
	};

	findAllRepair = (req: Request, res: Response) => {
		this.repairServices
			.findAll()
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	findOneRepair = (req: Request, res: Response) => {
		const { id } = req.params;

		this.repairServices
			.findOne(id)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	createRepair = (req: Request, res: Response) => {
		const [error, createRepairDto] = CreateRepairDto.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.repairServices
			.create(createRepairDto!)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	updateRepair = (req: Request, res: Response) => {
		const { id } = req.params;

		this.repairServices
			.update(id)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	deleteRepair = (req: Request, res: Response) => {
		const { id } = req.params;

		this.repairServices
			.delete(id)
			.then(() => res.status(204).json(null))
			.catch((error: any) => this.handleError(error, res));
	};
}
