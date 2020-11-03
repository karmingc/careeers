import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { InterviewQuestion } from './interview_question';

@Entity({ name: 'interview_photos' })
/**
 * Entity for Interview Photos table
 */
export class InterviewPhoto extends CommonBaseEntity {
  @Column({
    name: 'cloudinaryId',
    type: 'text',
    unique: true,
    nullable: false
  })
  cloudinaryId: string;

  @ManyToOne((type) => InterviewQuestion, (interview) => interview.photos, {
    nullable: false
  })
  @JoinColumn()
  question: InterviewQuestion;
}
