import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { Resume } from './resume';
import { Resource } from './resource';
import { Interview } from './interview';
import { Recommendation } from './recommendation';
import { ProfileLink } from './profile_link';

@Entity({ name: 'profiles' })
/**
 * Entity for Profiles table
 */
export class Profile extends CommonBaseEntity {
  @Column({ type: 'character varying', unique: true, nullable: false })
  slug: string;

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

  @OneToOne((type) => Resume, (resume) => resume.profile, {
    onDelete: 'CASCADE'
  })
  resume: Resume;

  @OneToOne((type) => Resource, { nullable: true })
  resource: Resource;

  @OneToOne((type) => Interview, (interview) => interview.profile, {
    onDelete: 'CASCADE'
  })
  interview: Interview;

  @OneToMany(() => ProfileLink, (profileLink) => profileLink.profile, {
    onDelete: 'CASCADE'
  })
  profileLinks: ProfileLink[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.profile, {
    onDelete: 'CASCADE'
  })
  recommendations: Recommendation[];
}
