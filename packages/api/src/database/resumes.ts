import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';

import { Resumes } from '../entities/resumes';

/**
 *
 * @param request Returns the row of the resume based on id provided, else false
 */
async function resumesHasId(request: Request): Promise<Resumes | false> {
  const queryResumeById = await getManager()
    .createQueryBuilder(Resumes, 'resume')
    .where('resume.id =:id', { id: request.params.id })
    .getOne();

  if (typeof queryResumeById === 'undefined') {
    console.log({
      error: `id: ${request.params.id} does not exist in Resumes table`
    });
    return false;
  }
  return queryResumeById;
}

/* GET METHODS */
/**
 * Returns all rows from Resumes table
 * @param request
 * @param response
 */
export async function getResumes(request: Request, response: Response) {
  const query = await getManager()
    .createQueryBuilder(Resumes, 'resumes')
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Resumes table does not exist' });
    response.status(404).send({ error: 'Resumes table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Gets a specific row from Resumes based on given id
 * @param request
 * @param response
 */
export async function getResumeById(request: Request, response: Response) {
  const queryResumeById = await resumesHasId(request);
  if (!queryResumeById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resumes table`
    });
    return;
  }
  response.status(200).send(queryResumeById);
  return;
}

/* POST METHODS */
/**
 * Inserts an entry into Resumes table
 * @param request
 * @param response
 */
export async function addResume(request: Request, response: Response) {
  const queryValues = request.body;

  /* get profile cloudinary id and updates it */
  queryValues.profileCloudinaryId = await uploadPhotoToCloudinary(
    request.body.profileCloudinaryId,
    'resumes'
  );

  /* get resume cloudinary id and updates it*/
  queryValues.resumeCloudinaryId = await uploadPhotoToCloudinary(
    request.body.resumeCloudinaryId,
    '/resumes'
  );

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Resumes)
    .values(queryValues)
    .execute();

  console.log('added new entry to Resumes', query, queryValues);
  response.status(200).send(query);
  return;
}

/* UPDATE METHODS */

/**
 * Updates a specific row from Resumes based on the given id
 * @param request
 * @param response
 */
export async function updateResumeById(request: Request, response: Response) {
  const queryResumeById = await resumesHasId(request);

  /* Verifies if it exist */
  if (!queryResumeById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resumes table`
    });
    return;
  }

  const query = await getManager()
    .createQueryBuilder()
    .update(Resumes)
    .set(request.body)
    .where('id = :id', { id: request.params.id })
    .execute();

  console.log(
    `updated ${request.params.id} in Resumes table with`,
    request.body
  );
  response.status(200).send(query);
  return;
}

/* DELETE METHODS */
/**
 * Deletes a specific row from Resumes based on the given id
 * @param request
 * @param response
 */
export async function deleteResumeById(request: Request, response: Response) {
  const queryResumeById = await resumesHasId(request);

  /* Verifies if it exist */
  if (!queryResumeById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resumes table`
    });
    return;
  }

  /* remove photo from cloudinary */
  await deletePhotoFromCloudinary(queryResumeById.profileCloudinaryId);
  await deletePhotoFromCloudinary(queryResumeById.resumeCloudinaryId);

  const query = await getManager()
    .createQueryBuilder()
    .delete()
    .from(Resumes)
    .where('id = :id', { id: request.params.id })
    .execute();

  console.log(`deleted id: ${request.params.id} in Resumes`);
  response.status(200).send(query);
  return;
}
