import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { Profile } from './profile';

@Entity({ name: 'profile_links' })

/**
 * Entity for each profile's social links
 */
export class ProfileLink extends CommonBaseEntity {
  @Column({ type: 'character varying', nullable: false })
  platform: string;

  @Column({ type: 'character varying', nullable: false })
  handle: string;

  @ManyToOne(() => Profile, (profile) => profile.profileLinks)
  profile: Profile;
}
