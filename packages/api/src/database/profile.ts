import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import slugify from 'slugify';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';

import { Profile } from '../entities/profile';
import { ProfileLink } from '../entities/profile_link';

/**
 *
 * @param request Returns the row of the resume based on id provided, else false
 */
async function profilesHasId(request: Request): Promise<Profile | false> {
  const queryProfileById = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .where('profile.id =:id', { id: request.params.id })
    .getOne();

  if (typeof queryProfileById === 'undefined') {
    console.log({
      error: `id: ${request.params.id} does not exist in Profiles table`
    });
    return false;
  }
  return queryProfileById;
}

/**
 * Gets 16 entries from params.id - 1 (starts at 0) * 16 onward from Profiles in Resumes table
 * @param request
 * @param response
 */
export async function getProfilesByInterviewsByGroup(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoin('profile.interview', 'interview')
    .orderBy('profile.id')
    .limit(16)
    .offset((parseInt(request.params.group) - 1) * 16)
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Profiles/Interviews table does not exist' });
    response
      .status(404)
      .send({ error: 'Profiles/Interviews table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Get 4 profiles with interviews, used in homepage
 * @param request
 * @param response
 */
export async function getProfilesByInterviewsByRandom(
  request: Request,
  response: Response
) {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoin('profile.interview', 'interview')
    .orderBy('RANDOM()')
    .limit(4)
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Profiles table does not exist' });
    response.status(404).send({ error: 'Profiles table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Gets 16 entries from params.id - 1 (starts at 0) * 16 onward from Profiles in Resumes table
 * @param request
 * @param response
 */
export async function getProfilesByResumesByGroup(
  request: Request,
  response: Response
) {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoin('profile.resume', 'resume')
    .orderBy('profile.id')
    .limit(16)
    .offset((parseInt(request.params.group) - 1) * 16)
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Profiles table does not exist' });
    response.status(404).send({ error: 'Profiles table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Get 4 profiles with resumes except slug
 * @param request
 * @param response
 */
export async function getProfilesByResumesByRelated(
  request: Request,
  response: Response
) {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoin('profile.resume', 'resume')
    .where('profile.slug != :slug', { slug: request.params.slug })
    .orderBy('RANDOM()')
    .limit(4)
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Profiles table does not exist' });
    response.status(404).send({ error: 'Profiles table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Get 4 profiles with resumes, used in homepage
 * @param request
 * @param response
 */
export async function getProfilesByResumesByRandom(
  request: Request,
  response: Response
) {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoin('profile.resume', 'resume')
    .orderBy('RANDOM()')
    .limit(4)
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Profiles table does not exist' });
    response.status(404).send({ error: 'Profiles table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/* POST METHODS */
/**
 * Inserts an entry into Profiles table
 * @param request
 * @param response
 */
export async function addProfile(
  request: Request,
  response: Response
): Promise<void> {
  const queryValues = request.body;

  /* get resume cloudinary id and updates it*/
  queryValues.profileCloudinaryId = await uploadPhotoToCloudinary(
    request.body.profileCloudinaryId,
    '/profiles'
  );

  queryValues.slug = `${slugify(queryValues.name, { lower: true })}`;

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Profile)
    .values(queryValues)
    .execute();

  console.log('added new entry to Profiles', query, request.body);
  response.status(200).send(query);
  return;
}

/**
 * Insert an entry into Profile_Links table
 * @param request
 * @param response
 */
export async function addProfileLink(request: Request, response: Response) {
  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(ProfileLink)
    .values(request.body)
    .execute();

  console.log('added new entry to Profile_Links table', query, request.body);
  response.status(200).send(query);
  return;
}

/* DELETE METHODS */
export async function deleteProfileById(
  request: Request,
  response: Response
): Promise<void> {
  const queryProfileById = await profilesHasId(request);

  /* Verifies if it exist */
  if (!queryProfileById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Profiles table`
    });
    return;
  }

  /* remove photo from cloudinary */
  await deletePhotoFromCloudinary(queryProfileById.profileCloudinaryId);

  const query = await getManager()
    .createQueryBuilder()
    .delete()
    .from(Profile)
    .where('id = :id', { id: request.params.id })
    .execute();

  console.log(`deleted id: ${request.params.id} in Profiles table`);
  response.status(200).send(query);
  return;
}
