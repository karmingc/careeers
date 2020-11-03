import { Entity, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { Interview } from './interview';
import { InterviewPhoto } from './interview_photo';
import { InterviewLink } from './interview_link';

@Entity({ name: 'interview_questions' })
/**
 * Entity for Interviews Questions table
 */
export class InterviewQuestion extends CommonBaseEntity {
  @Column({ type: 'smallint', nullable: false })
  order: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'text', nullable: false })
  answer: string;

  @ManyToOne((type) => Interview, (interview) => interview.questions, {
    nullable: false
  })
  @JoinColumn()
  interview: Interview;

  @OneToMany(
    (type) => InterviewPhoto,
    (interviewPhoto) => interviewPhoto.question,
    {
      onDelete: 'CASCADE',
      nullable: false
    }
  )
  photos: InterviewPhoto[];

  @OneToMany(
    (type) => InterviewLink,
    (interviewLink) => interviewLink.question,
    {
      onDelete: 'CASCADE',
      nullable: false
    }
  )
  links: InterviewLink[];
}
