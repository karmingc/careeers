import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import slugify from 'slugify';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';

import { Resume } from '../entities/resume';

/**
 *
 * @param request Returns the row of the resume based on id provided, else false
 */
async function resumesHasId(request: Request): Promise<Resume | false> {
  const queryResumeById = await getManager()
    .createQueryBuilder(Resume, 'resume')
    .where('resume.id =:id', { id: request.params.id })
    .getOne();

  if (typeof queryResumeById === 'undefined') {
    return false;
  }
  return queryResumeById;
}

/* GET METHODS */
export async function getResumesCount(request: Request, response: Response) {
  const query = await getManager()
    .createQueryBuilder(Resume, 'resume')
    .getCount();

  if (typeof query === 'undefined') {
    response.status(404).send({ error: 'Resumes table does not exist' });
    return;
  }
  response.status(200).send({ count: query });
  return;
}

/**
 * Gets a specific row from Resume based on given slug
 * @param request
 * @param response
 */
export async function getResumeBySlug(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Resume, 'resume')
    .leftJoinAndSelect('resume.profile', 'profile')
    .leftJoinAndSelect('profile.profileLinks', 'profileLinks')
    .where('profile.slug =:slug', { slug: request.params.slug })
    .getOne();

  if (typeof query === 'undefined') {
    response.status(404).send({
      error: `${request.params.slug} does not exist in profiles/resumes`
    });
    return;
  }
  response.status(200).send(query);
  return;
}

/* POST METHODS */
/**
 * Inserts an entry into Resume table
 * @param request
 * @param response
 */
export async function addResume(
  request: Request,
  response: Response
): Promise<void> {
  const queryValues = request.body;

  /* get resume cloudinary id and updates it*/
  queryValues.resumeCloudinaryId = await uploadPhotoToCloudinary(
    request.body.resumeCloudinaryId,
    '/resumes'
  );

  queryValues.slug = `${slugify(queryValues.name, { lower: true })}`;

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Resume)
    .values({ resumeCloudinaryId: queryValues.resumeCloudinaryId })
    .execute();

  response.status(200).send(query);
  return;
}

/* UPDATE METHODS */

/**
 * Updates a specific row from Resume based on the given id
 * @param request
 * @param response
 */
export async function updateResumeById(
  request: Request,
  response: Response
): Promise<void> {
  const queryResumeById = await resumesHasId(request);

  /* Verifies if it exist */
  if (!queryResumeById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resumes table`
    });
    return;
  }

  const queryValues = request.body;
  /* remove current cloudinary pic */
  if (request.body.resumeCloudinaryId) {
    await deletePhotoFromCloudinary(queryResumeById.resumeCloudinaryId);

    /* upload new cloudinary pic */
    queryValues.resumeCloudinaryId = await uploadPhotoToCloudinary(
      request.body.resumeCloudinaryId,
      '/resumes'
    );
  }

  const query = await getManager()
    .createQueryBuilder()
    .update(Resume)
    .set(queryValues)
    .where('id = :id', { id: request.params.id })
    .execute();

  response.status(200).send(query);
  return;
}

/* DELETE METHODS */
/**
 * Deletes a specific row from Resume based on the given id
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
  await deletePhotoFromCloudinary(queryResumeById.resumeCloudinaryId);

  const query = await getManager()
    .createQueryBuilder()
    .delete()
    .from(Resume)
    .where('id = :id', { id: request.params.id })
    .execute();

  response.status(200).send(query);
  return;
}
