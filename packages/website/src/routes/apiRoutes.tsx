import axios from 'axios';

export enum ApiRouteName {
  INTERVIEWS_GROUP = '/profiles/interviews/group/',
  INTERVIEWS_COUNT = '/interviews/count',
  INTERVIEWS_SLUG = '/interviews/',
  INTERVIEWS_RANDOM = '/profiles/interviews/random',
  RESUMES_SLUG = '/resumes/',
  RESUMES_COUNT = '/resumes/count',
  RESUMES_GROUP = '/profiles/resumes/group/',
  RESUMES_RELATED = '/profiles/resumes/related/',
  RESUMES_RANDOM = '/profiles/resumes/random',
  RESOURCES_GROUP = '/resources/group/',
  RESOURCES_COUNT = '/resources/count',
  RESOURCES_RANDOM = '/resources/random',
  RECOMMENDATIONS_GROUP = '/recommendations/group/',
  RECOMMENDATIONS_COUNT = '/recommendations/count',
  RECOMMENDATIONS_RANDOM = '/recommendations/random',
  JOBS_GROUP = '/jobs/group/',
  JOBS_COUNT = '/jobs/count'
}

export const apiRoutes = ({
  apiRouteName
}: {
  apiRouteName: ApiRouteName;
}): string => {
  const apiPrefix = `${process.env.REACT_APP_API_ORIGIN}/api`;
  return apiPrefix + apiRouteName;
};

export async function fetchFeed({
  page,
  group,
  count
}: {
  page: number;
  group: ApiRouteName;
  count: ApiRouteName;
}) {
  const [lists, feedMeta] = await Promise.all([
    axios.get(
      `${apiRoutes({
        apiRouteName: group
      })}${page}`
    ),
    axios.get(`${apiRoutes({ apiRouteName: count })}`)
  ]);
  return [lists, feedMeta];
}

export async function fetchHomeFeed() {
  const [resumes, interviews, resources, recommendations] = await Promise.all([
    axios.get(`${apiRoutes({ apiRouteName: ApiRouteName.RESUMES_RANDOM })}`),
    axios.get(`${apiRoutes({ apiRouteName: ApiRouteName.INTERVIEWS_RANDOM })}`),
    axios.get(`${apiRoutes({ apiRouteName: ApiRouteName.RESOURCES_RANDOM })}`),
    axios.get(
      `${apiRoutes({ apiRouteName: ApiRouteName.RECOMMENDATIONS_RANDOM })}`
    )
  ]);
  return [resumes, interviews, resources, recommendations];
}
