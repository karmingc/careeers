import {
  getResources,
  getResourceById,
  addResource,
  updateResourceById,
  deleteResourceById
} from '../database/resources';
import {
  getResumes,
  getResumeById,
  addResume,
  updateResumeById,
  deleteResumeById
} from '../database/resumes';

import { HTTP } from '../helpers/https';

export const ApiRoutes = [
  { path: '/resources', method: HTTP.GET, action: getResources },
  { path: '/resources', method: HTTP.POST, action: addResource },
  { path: '/resources/:id', method: HTTP.GET, action: getResourceById },
  { path: '/resources/:id', method: HTTP.PUT, action: updateResourceById },
  { path: '/resources/:id', method: HTTP.DELETE, action: deleteResourceById },
  { path: '/resumes', method: HTTP.GET, action: getResumes },
  { path: '/resumes', method: HTTP.POST, action: addResume },
  { path: '/resumes/:id', method: HTTP.GET, action: getResumeById },
  { path: '/resumes/:id', method: HTTP.PUT, action: updateResumeById },
  { path: '/resumes/:id', method: HTTP.DELETE, action: deleteResumeById }
];
