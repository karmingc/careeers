import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Profile } from '../entities/profile';
import { Recommendation } from '../entities/recommendation';

/* GET METHODS */

/**
 * Number of profiles that have recommendations
 * @param request
 * @param response
 */
export async function getRecommendationsUniqueCount(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Recommendation, 'recommendation')
    .select('COUNT(DISTINCT(recommendation.profile)) AS count')
    .getRawMany();
  // .innerJoinAndSelect('profile.recommendations', 'recommendations')
  // .getCount();

  if (typeof query === 'undefined') {
    response
      .status(404)
      .send({ error: 'Recommendations table does not yet have an entry' });
    return;
  }

  response.status(200).send({ count: query[0].count });
  return;
}

/**
 * Gets 16 entries from params.id - 1 (starts at 0) * 16 onward
 * from Profiles related to Recommendations table
 * @param request
 * @param response
 */
export async function getProfilesByRecommendationsByGroup(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoinAndSelect('profile.profileLinks', 'profileLinks')
    .innerJoinAndSelect('profile.recommendations', 'recommendations')
    .orderBy('profile.id')
    .limit(16)
    .offset((parseInt(request.params.id) - 1) * 16)
    .getMany();

  if (typeof query === 'undefined' || query.length <= 0) {
    response.status(404).send({
      error: `recommendations/group/:${request.params.id} does not exist`
    });
    return;
  }
  response.status(200).send(query);
  return;
}

/**
 * Get 4 profiles with recommendations, used in homepage
 * @param request
 * @param response
 */
export async function getProfilesByRecommendationsByRandom(
  request: Request,
  response: Response
) {
  const query = await getManager()
    .createQueryBuilder(Profile, 'profile')
    .innerJoinAndSelect('profile.profileLinks', 'profileLinks')
    .innerJoinAndSelect('profile.recommendations', 'recommendations')
    .orderBy('RANDOM()')
    .limit(4)
    .getMany();

  if (typeof query === 'undefined') {
    response
      .status(404)
      .send({ error: 'Profiles/Recommendations table does not exist' });
    return;
  }
  response.status(200).send(query);
  return;
}

/* POST METHODS */
/**
 * Insert an entry into Recommendation table for its profile
 * @param request
 * @param response
 */
export async function addRecommendation(
  request: Request,
  response: Response
): Promise<void> {
  const query = await getManager()
    .createQueryBuilder()
    .insert()
    .into(Recommendation)
    .values(request.body)
    .execute();

  response.status(200).send(query);
  return;
}
