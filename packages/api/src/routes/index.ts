import {
  getResourcesByGroup,
  getResourcesByRandom,
  addResource,
  updateResourceById,
  deleteResourceById,
  getResourcesCount
} from '../database/resource';
import {
  getResumesCount,
  getResumeBySlug,
  addResume,
  updateResumeById,
  deleteResumeById
} from '../database/resume';
import {
  getProfilesByResumesByGroup,
  getProfilesByResumesByRelated,
  getProfilesByResumesByRandom,
  getProfilesByInterviewsByGroup,
  getProfilesByInterviewsByRandom,
  addProfile,
  addProfileLink,
  deleteProfileById
} from '../database/profile';
import {
  getInterviewsCount,
  getInterviewBySlug,
  addInterview,
  addInterviewQuestion,
  addInterviewQuestionPhoto,
  addInterviewQuestionLink
} from '../database/interview';
import {
  getRecommendationsUniqueCount,
  getProfilesByRecommendationsByGroup,
  getProfilesByRecommendationsByRandom,
  addRecommendation
} from '../database/recommendation';

import { HTTP } from '../helpers/https';
import { getGaMeasurementId } from './keys';

export const ApiRoutes = [
  { path: '/google/id', method: HTTP.GET, action: getGaMeasurementId },
  /* profiles */
  {
    path: '/profiles/interviews/group/:id',
    method: HTTP.GET,
    action: getProfilesByInterviewsByGroup
  },
  {
    path: '/profiles/interviews/random',
    method: HTTP.GET,
    action: getProfilesByInterviewsByRandom
  },
  {
    path: '/profiles/resumes/group/:id',
    method: HTTP.GET,
    action: getProfilesByResumesByGroup
  },
  {
    path: '/profiles/resumes/related/:slug',
    method: HTTP.GET,
    action: getProfilesByResumesByRelated
  },
  {
    path: '/profiles/resumes/random',
    method: HTTP.GET,
    action: getProfilesByResumesByRandom
  },
  // { path: '/profiles', method: HTTP.POST, action: addProfile },
  // { path: '/profiles/link', method: HTTP.POST, action: addProfileLink },
  // { path: '/profiles/:id', method: HTTP.DELETE, action: deleteProfileById },
  /* resumes */
  { path: '/resumes/count', method: HTTP.GET, action: getResumesCount },
  { path: '/resumes/:slug', method: HTTP.GET, action: getResumeBySlug },
  // { path: '/resumes', method: HTTP.POST, action: addResume },
  // { path: '/resumes/:id', method: HTTP.PUT, action: updateResumeById },
  // { path: '/resumes/:id', method: HTTP.DELETE, action: deleteResumeById },
  /* interviews */
  { path: '/interviews/count', method: HTTP.GET, action: getInterviewsCount },
  { path: '/interviews/:slug', method: HTTP.GET, action: getInterviewBySlug },
  // { path: '/interviews', method: HTTP.POST, action: addInterview },
  // {
  //   path: '/interviews/questions',
  //   method: HTTP.POST,
  //   action: addInterviewQuestion
  // },
  // {
  //   path: '/interviews/questions/photos',
  //   method: HTTP.POST,
  //   action: addInterviewQuestionPhoto
  // },
  // {
  //   path: '/interviews/questions/links',
  //   method: HTTP.POST,
  //   action: addInterviewQuestionLink
  // },
  /* resources */
  { path: '/resources/random', method: HTTP.GET, action: getResourcesByRandom },
  {
    path: '/resources/group/:group',
    method: HTTP.GET,
    action: getResourcesByGroup
  },
  { path: '/resources/count', method: HTTP.GET, action: getResourcesCount },
  // { path: '/resources', method: HTTP.POST, action: addResource },
  // { path: '/resources/:id', method: HTTP.PUT, action: updateResourceById },
  // { path: '/resources/:id', method: HTTP.DELETE, action: deleteResourceById },
  /* recommendations */
  {
    path: '/recommendations/count',
    method: HTTP.GET,
    action: getRecommendationsUniqueCount
  },
  {
    path: '/recommendations/group/:id',
    method: HTTP.GET,
    action: getProfilesByRecommendationsByGroup
  },
  // { path: '/recommendations', method: HTTP.POST, action: addRecommendation },
  {
    path: '/recommendations/random',
    method: HTTP.GET,
    action: getProfilesByRecommendationsByRandom
  }
];
