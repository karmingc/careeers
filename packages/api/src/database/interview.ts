import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';

import { Interview } from '../entities/interview';
import { InterviewQuestion } from '../entities/interview_question';
import { InterviewPhoto } from '../entities/interview_photo';
import { InterviewLink } from '../entities/interview_link';

/* GET METHODS */
/**
 *  Get the number of rows in Interviews table
 * @param request
 * @param response
 */
export async function getInterviewsCount(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Interview, 'interview')
    .getCount();

  if (typeof query === 'undefined') {
    console.log({ error: 'Interviews table does not exist' });
    response.status(404).send({ error: 'Interviews table does not exist' });
    return;
  }
  response.status(200).send({ count: query });
  return;
}

/**
 * Gets a specific row from Interviews table based on given slug
 * @param request
 * @param response
 */
export async function getInterviewBySlug(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Interview, 'interview')
    .leftJoinAndSelect('interview.profile', 'profile')
    .leftJoinAndSelect('profile.profileLinks', 'profileLinks')
    .leftJoinAndSelect('interview.questions', 'questions')
    .leftJoinAndSelect('questions.links', 'links')
    .leftJoinAndSelect('questions.photos', 'photos')
    .orderBy('questions.order', 'ASC')
    .where('profile.slug =:slug', { slug: request.params.slug })
    .getOne();

  if (typeof query === 'undefined') {
    console.log({
      error: `slug: ${request.params.slug} does not exist in Profiles/Interviews table`
    });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Add interview to Interviews table
 * @param request
 * @param response
 */
export async function addInterview(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Interview)
    .values(request.body)
    .execute();

  console.log('added new entry to Interviews table', query);
  response.status(200).send(query);
  return;
}

/**
 * Add interview questions to a specific row of Interviews table
 * @param request
 * @param response
 */
export async function addInterviewQuestion(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(InterviewQuestion)
    .values(request.body)
    .execute();

  console.log(
    `added new entry to Interview Questions table for id: ${request.body.interview}`,
    query
  );
  response.status(200).send(query);
}

/**
 * Add interview photos related to a specific question for the Interviews table
 * @param request
 * @param response
 */
export async function addInterviewQuestionPhoto(
  request: Request,
  response: Response
): Promise<void> {
  const queryValues = request.body;

  /* get resume cloudinary id and updates it*/
  queryValues.cloudinaryId = await uploadPhotoToCloudinary(
    request.body.cloudinaryId,
    '/interviews'
  );

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(InterviewPhoto)
    .values(queryValues)
    .execute();

  console.log(
    `added new entry to Interview Photos table for id: ${request.body.question}`,
    query
  );
  response.status(200).send(query);
}

/**
 * Add interview links related to a specific question for the Interviews table
 * @param request
 * @param response
 */
export async function addInterviewQuestionLink(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(InterviewLink)
    .values(request.body)
    .execute();

  console.log(
    `added new entry to Interview Links table for id: ${request.body.question}`,
    query
  );
  response.status(200).send(query);
}
