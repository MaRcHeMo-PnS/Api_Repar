import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RepairStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CANCELED = 'CANCELED',
}

@Entity()
export class Repared extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('timestamp', {
		nullable: false,
	})
	date: Date;

	@Column('enum', {
		enum: RepairStatus,
		default: RepairStatus.PENDING,
	})
	status: RepairStatus;

	@Column('varchar', {
		nullable: false,
	})
	userId: string;
}
