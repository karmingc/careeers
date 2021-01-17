import { Entity, Column } from 'typeorm';
import { CommonBaseEntity } from './common_base';

export enum ResourceType {
  JOB = 'JOB',
  KNOWLEDGE = 'KNOWLEDGE'
}

@Entity({ name: 'resources' })
/**
 * Table displaying the list of products
 */
export class Resource extends CommonBaseEntity {
  @Column({ type: 'character varying', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'character varying', unique: true, nullable: false })
  link: string;

  @Column({ name: 'cloudinaryId', type: 'text', unique: true, nullable: false })
  cloudinaryId: string;

  @Column({ type: 'enum', enum: ResourceType, nullable: false })
  type: ResourceType;
}
