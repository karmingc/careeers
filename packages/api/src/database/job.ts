import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Resource, ResourceType } from '../entities/resource';
import {
  addTypeToResourceCountQuery,
  addTypeToResourceGroupQuery,
  addTypeToResourceRandomQuery
} from './resource';

/* GET METHODS */
export async function getJobsByGroup(
  request: Request,
  response: Response
): Promise<void> {
  const resourceQuery = getManager().createQueryBuilder(Resource, 'resource');

  const query = await addTypeToResourceGroupQuery({
    resourceQuery,
    type: ResourceType.JOB,
    group: request.params.group,
    count: 16
  });

  if (typeof query === 'undefined' || query.length <= 0) {
    response.status(404).send({
      error: `jobs/group/:${request.params.group} not found`
    });
    return;
  }
  response.status(200).send(query);
  return;
}

export async function getJobsByRandom(
  request: Request,
  response: Response
): Promise<void> {
  const resourceQuery = getManager().createQueryBuilder(Resource, 'resource');

  const query = await addTypeToResourceRandomQuery({
    resourceQuery,
    type: ResourceType.JOB,
    count: 4
  });

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
export async function getJobsCount(
  request: Request,
  response: Response
): Promise<void> {
  const resourceQuery = getManager().createQueryBuilder(Resource, 'resource');

  const query = await addTypeToResourceCountQuery({
    resourceQuery,
    type: ResourceType.JOB
  });

  if (typeof query === 'undefined') {
    response.status(404).send({ error: 'Resources table does not exist' });
    return;
  }
  response.status(200).send({ count: query });
  return;
}
