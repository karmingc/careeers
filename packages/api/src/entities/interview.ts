import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CommonBaseEntity } from './common_base';

import { Profile } from './profile';
import { InterviewQuestion } from './interview_question';

@Entity({ name: 'interviews' })
/**
 * Entity for Interviews table
 */
export class Interview extends CommonBaseEntity {
  /**
   * Field that interview is in, considering an enum for this type
   */
  @Column({ type: 'character varying', nullable: false })
  field: string;

  @OneToOne((type) => Profile, (profile) => profile.interview, {
    nullable: false
  })
  @JoinColumn()
  profile: Profile;

  /**
   * Q & As for the interview
   */
  @OneToMany(
    (type) => InterviewQuestion,
    (interviewQuestion) => interviewQuestion.interview,
    {
      onDelete: 'CASCADE',
      nullable: false
    }
  )
  questions: InterviewQuestion[];
}
