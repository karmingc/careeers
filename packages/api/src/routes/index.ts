import {
  getResourcesByGroup,
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
  getProfilesByInterviewsByGroup,
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

import { HTTP } from '../helpers/https';

export const ApiRoutes = [
  {
    path: '/profiles/interviews/group/:group',
    method: HTTP.GET,
    action: getProfilesByInterviewsByGroup
  },
  {
    path: '/profiles/resumes/group/:group',
    method: HTTP.GET,
    action: getProfilesByResumesByGroup
  },
  {
    path: '/profiles/resumes/related/:slug',
    method: HTTP.GET,
    action: getProfilesByResumesByRelated
  },
  { path: '/profiles', method: HTTP.POST, action: addProfile },
  { path: '/profiles/link', method: HTTP.POST, action: addProfileLink },
  { path: '/profiles/:id', method: HTTP.DELETE, action: deleteProfileById },
  { path: '/resumes/count', method: HTTP.GET, action: getResumesCount },
  { path: '/resumes/:slug', method: HTTP.GET, action: getResumeBySlug },
  { path: '/resumes', method: HTTP.POST, action: addResume },
  { path: '/resumes/:id', method: HTTP.PUT, action: updateResumeById },
  { path: '/resumes/:id', method: HTTP.DELETE, action: deleteResumeById },
  {
    path: '/resources/group/:group',
    method: HTTP.GET,
    action: getResourcesByGroup
  },
  { path: '/resources/count', method: HTTP.GET, action: getResourcesCount },
  { path: '/resources', method: HTTP.POST, action: addResource },
  { path: '/resources/:id', method: HTTP.PUT, action: updateResourceById },
  { path: '/resources/:id', method: HTTP.DELETE, action: deleteResourceById },
  { path: '/interviews/count', method: HTTP.GET, action: getInterviewsCount },
  { path: '/interviews/:slug', method: HTTP.GET, action: getInterviewBySlug },
  { path: '/interviews', method: HTTP.POST, action: addInterview },
  {
    path: '/interviews/questions',
    method: HTTP.POST,
    action: addInterviewQuestion
  },
  {
    path: '/interviews/questions/photos',
    method: HTTP.POST,
    action: addInterviewQuestionPhoto
  },
  {
    path: '/interviews/questions/links',
    method: HTTP.POST,
    action: addInterviewQuestionLink
  }
];
