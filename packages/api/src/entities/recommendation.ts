import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { Profile } from './profile';

enum RecommendationType {
  QUOTE = 'QUOTE',
  RESOURCE = 'RESOURCE'
}

@Entity({ name: 'recommendations' })
/**
 * Entity for recommendations table
 */
export class Recommendation extends CommonBaseEntity {
  // type (quote or link), title, description, link? Not null,
  @Column({
    type: 'enum',
    enum: RecommendationType,
    nullable: false
  })
  type: RecommendationType;

  @Column({ type: 'character varying', nullable: false })
  title: string;

  @Column({ type: 'character varying', nullable: false })
  description: string;

  @Column({ type: 'character varying', nullable: true })
  link: string;

  @ManyToOne(() => Profile, (profile) => profile.recommendations)
  @JoinColumn()
  profile: Profile;
}
