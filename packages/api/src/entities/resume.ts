import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { Profile } from './profile';

@Entity({ name: 'resumes' })
/**
 * Table displaying the list of products
 */
export class Resume extends CommonBaseEntity {
  @Column({
    name: 'resumeCloudinaryId',
    type: 'text',
    unique: true,
    nullable: false
  })
  resumeCloudinaryId: string;

  @OneToOne((type) => Profile, (profile) => profile.resume, {
    nullable: true
  })
  @JoinColumn()
  profile: Profile;
}
