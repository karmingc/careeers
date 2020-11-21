import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';
import { Resource } from '../entities/resource';

/**
 * Returns the row of the resource based on id provided, else false
 * @param request request params id, usually the parameter's ID after the get
 */
async function resourcesHasId(request: Request): Promise<Resource | false> {
  const queryResourceById = await getManager()
    .createQueryBuilder(Resource, 'resource')
    .where('resource.id = :id', { id: request.params.id })
    .getOne();

  if (typeof queryResourceById === 'undefined') {
    return false;
  }
  return queryResourceById;
}

/* GET METHODS */
export async function getResourcesByGroup(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Resource, 'resource')
    .orderBy({ 'resource.createdAt': 'DESC' })
    .limit(16)
    .offset((parseInt(request.params.group) - 1) * 16)
    .getMany();

  if (typeof query === 'undefined' || query.length <= 0) {
    response.status(404).send({
      error: `resources/group/:${request.params.group} not found`
    });
    return;
  }
  response.status(200).send(query);
  return;
}

export async function getResourcesByRandom(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Resource, 'resource')
    .orderBy('RANDOM()')
    .limit(4)
    .getMany();

  if (typeof query === 'undefined') {
    response.status(404).send({ error: 'Resources table not found' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Returns num of rows from Resources table
 * @param request
 * @param response
 */
export async function getResourcesCount(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Resource, 'resource')
    .getCount();

  if (typeof query === 'undefined') {
    response.status(404).send({ error: 'Resources table does not exist' });
    return;
  }
  response.status(200).send({ count: query });
  return;
}

/* POST METHODS */
/**
 * Inserts an entry into Resources table
 * @param request
 * @param response
 */
export async function addResource(request: Request, response: Response) {
  const queryValues = request.body;

  /* obtains the cloudinary Id that can be fetched directly with base url */
  // queryValues.cloudinaryId = await uploadPhotoToCloudinary(
  //   request.body.cloudinaryId,
  //   '/resources'
  // );

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Resource)
    .values(queryValues)
    .execute();

  response.status(200).send(query);
  return;
}

/* UPDATE METHODS */
/**
 * Updates a specific row from Resources based on the given id
 * @param request
 * @param response
 */
export async function updateResourceById(
  request: Request,
  response: Response
): Promise<void> {
  const queryResourceById = await resourcesHasId(request);

  /* Verifies if it exist */
  if (!queryResourceById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resources table`
    });
    return;
  }

  const queryValues = request.body;
  /* remove current cloudinary pic */
  if (request.body.cloudinaryId) {
    await deletePhotoFromCloudinary(queryResourceById.cloudinaryId);

    /* upload new cloudinary pic */
    queryValues.cloudinaryId = await uploadPhotoToCloudinary(
      request.body.cloudinaryId,
      '/resources'
    );
  }

  const query = await getManager()
    .createQueryBuilder()
    .update(Resource)
    .set(queryValues)
    .where('id = :id', { id: request.params.id })
    .execute();

  response.status(200).send(query);
  return;
}

/* DELETE METHODS */
/**
 * Deletes a specific row from Resources based on the given id
 * @param request
 * @param response
 */
export async function deleteResourceById(
  request: Request,
  response: Response
): Promise<void> {
  const queryResourceById = await resourcesHasId(request);

  /* Verifies if it exist */
  if (!queryResourceById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resources table`
    });
    return;
  }

  /* remove photo from cloudinary */
  await deletePhotoFromCloudinary(queryResourceById.cloudinaryId);

  const query = await getManager()
    .createQueryBuilder()
    .delete()
    .from(Resource)
    .where('id = :id', { id: request.params.id })
    .execute();

  response.status(200).send(query);
  return;
}
