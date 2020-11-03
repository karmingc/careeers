import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBaseEntity } from './common_base';
import { InterviewQuestion } from './interview_question';

@Entity({ name: 'interview_links' })
/**
 * Entity for Interview Links table
 */
export class InterviewLink extends CommonBaseEntity {
  @Column({ type: 'character varying', nullable: false })
  link: string;

  @Column({ type: 'character varying', nullable: false })
  name: string;

  @ManyToOne((type) => InterviewQuestion, (interview) => interview.links, {
    nullable: false
  })
  @JoinColumn()
  question: InterviewQuestion;
}
