import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum CommonStatus {
  CREATED = 'CREATED',
  ASSIGNED = 'ASSIGNED',
  SOLVED = 'SOLVED',
  ARCHIVED = 'ARCHIVED'
}

/**
 * Base entity including id, createdAt, updatedAt
 */
export abstract class CommonBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt!: Date;
}
