import { test } from '../database/resources';
import { HTTP } from '../helpers/https';

export const ApiRoutes = [{ path: '/test', method: HTTP.GET, action: test }];
