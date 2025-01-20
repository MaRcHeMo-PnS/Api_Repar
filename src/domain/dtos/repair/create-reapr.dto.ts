export class CreateRepairDto {
	constructor(public date: Date, public userId: string) {}
	static create(object: { [key: string]: any }): [string?, CreateRepairDto?] {
		const { date, userId } = object;

		if (!date) return ['date i requiered'];
		if (!userId) return ['userId i requiered'];

		return [undefined, new CreateRepairDto(date, userId)];
	}
}
