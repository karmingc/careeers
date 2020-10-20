import { Entity, Column } from 'typeorm';
import { CommonBaseEntity } from './common_base';

@Entity({ name: 'resumes' })
/**
 * Table displaying the list of products
 */
export class Resumes extends CommonBaseEntity {
  @Column({ type: 'character varying', unique: true, nullable: false })
  name: string;

  @Column({ type: 'character varying', nullable: false })
  company: string;

  @Column({ type: 'text', unique: true, nullable: false })
  description: string;

  @Column({ type: 'character varying', unique: true, nullable: true })
  website: string;

  @Column({
    name: 'profileCloudinaryId',
    type: 'text',
    unique: true,
    nullable: false
  })
  profileCloudinaryId: string;

  @Column({
    name: 'resumeCloudinaryId',
    type: 'text',
    unique: true,
    nullable: false
  })
  resumeCloudinaryId: string;
}
