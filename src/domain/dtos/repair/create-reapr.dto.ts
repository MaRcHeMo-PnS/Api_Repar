import z from 'zod';

const createRepairSchema = z.object({
	date: z
		.string({ message: 'date is required' })
		.regex(/^\d{2}-\d{2}-\d{4}$/, {
			message: 'Date must be in formt MM_DD_YYY',
		})
		.refine(
			(date) => {
				const [month, day, year] = date.split('-').map(Number);
				const parsedDate = new Date(year, month - 1, day);
				return (
					parsedDate.getMonth() === month - 1 &&
					parsedDate.getDate() === day &&
					parsedDate.getFullYear() === year
				);
			},
			{ message: 'invalid date' },
		),
	userId: z.string().uuid({ message: 'userId es required' }),
	serialn: z.string().min(5, { message: 'serial numero required' }),
	description: z.string().min(10, { message: 'description de moto please ' }),
});

export class CreateRepairDto {
	constructor(
		public date: Date,
		public userId: string,
		public serialn: string,
		public description: string,
	) {}
	static create(object: {
		[key: string]: any;
	}): [Record<string, string>?, CreateRepairDto?] {
		const { date, userId, serialn, description } = object;

		const result = createRepairSchema.safeParse(object);

		if (!result.success) {
			const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
				const field = err.path.join('.');
				acc[field] = err.message;
				return acc;
			}, {} as Record<string, string>);

			return [errorMessages];
		}
		// if (!date) return ['date is requiered'];
		// if (!userId) return ['userId is requiered'];
		// if (!serialn) return ['Serial number  is requiered'];
		// if (serialn.length < 13) return ['Serial number  is not real'];

		return [undefined, new CreateRepairDto(date, userId, serialn, description)];
	}
}
