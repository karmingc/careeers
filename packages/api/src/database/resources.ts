import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import {
  deletePhotoFromCloudinary,
  uploadPhotoToCloudinary
} from '../helpers/cloudinary';
import { Resources } from '../entities/resources';

/**
 * Returns the row of the resource based on id provided, else false
 * @param request request params id, usually the parameter's ID after the get
 */
async function resourcesHasId(request: Request): Promise<Resources | false> {
  const queryResourceById = await getManager()
    .createQueryBuilder(Resources, 'resource')
    .where('resource.id = :id', { id: request.params.id })
    .getOne();

  if (typeof queryResourceById === 'undefined') {
    console.log({
      error: `id: ${request.params.id} does not exist in Resources table`
    });
    return false;
  }
  return queryResourceById;
}

/* GET METHODS */
/**
 * Returns all rows from Resources table
 * @param request
 * @param response
 */
export async function getResources(request: Request, response: Response) {
  const query = await getManager()
    .createQueryBuilder(Resources, 'resources')
    .getMany();

  if (typeof query === 'undefined') {
    console.log({ error: 'Resources table does not exist' });
    response.status(404).send({ error: 'Resources table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Gets a specific row from Resources based on the given id
 * @param request
 * @param response
 */
export async function getResourceById(request: Request, response: Response) {
  const queryResourceById = await resourcesHasId(request);
  if (!queryResourceById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resources table`
    });
    return;
  }
  response.status(200).send(queryResourceById);
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
  queryValues.cloudinaryId = await uploadPhotoToCloudinary(
    request.body.cloudinaryId,
    '/resources'
  );

  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Resources)
    .values(queryValues)
    .execute();

  console.log('added new entry in Resources', query, queryValues);
  response.status(200).send(query);
  return;
}

/* UPDATE METHODS */
/**
 * Updates a specific row from Resources based on the given id
 * @param request
 * @param response
 */
export async function updateResourceById(request: Request, response: Response) {
  const queryResourceById = await resourcesHasId(request);

  /* Verifies if it exist */
  if (!queryResourceById) {
    response.status(404).send({
      error: `id: ${request.params.id} does not exist in Resources table`
    });
    return;
  }

  const query = await getManager()
    .createQueryBuilder()
    .update(Resources)
    .set(request.body)
    .where('id = :id', { id: request.params.id })
    .execute();

  console.log(
    `updated ${request.params.id} in Resources table with`,
    request.body
  );
  response.status(200).send(query);
  return;
}

/* DELETE METHODS */
/**
 * Deletes a specific row from Resources based on the given id
 * @param request
 * @param response
 */
export async function deleteResourceById(request: Request, response: Response) {
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
    .from(Resources)
    .where('id = :id', { id: request.params.id })
    .execute();

  console.log(`deleted id: ${request.params.id} in Resources`);
  response.status(200).send(query);
  return;
}
