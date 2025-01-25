import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { encriptAdapter } from '../../../config';

export enum Status {
	AVAILABLE = 'AVAILABLE',
	DISABLED = 'DISABLED',
}

export enum Role {
	EXPLOYEE = 'EXPLOYEE',
	CLIENT = 'CLIENT',
}

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column('varchar', {
		nullable: false,
	})
	password: string;

	@Column('enum', {
		enum: Role,
		default: Role.CLIENT,
	})
	role: Role;

	@Column('enum', {
		enum: Status,
		default: Status.AVAILABLE,
	})
	status: Status;

	@BeforeInsert()
	encryptedPassword() {
		this.password = encriptAdapter.hash(this.password);
	}
}
