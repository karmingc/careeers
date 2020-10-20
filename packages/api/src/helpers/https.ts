import express from 'express';

/** Instantiate express app */
export const app = express();

/**
 * GET, POST, DELETE, PUT, PATCH
 */
export enum HTTP {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

/**
 * Container for our http methods
 */
export const HttpMethods: { [key: string]: typeof app.get } = {
  [HTTP.GET]: app.get,
  [HTTP.POST]: app.post,
  [HTTP.DELETE]: app.delete,
  [HTTP.PUT]: app.put,
  [HTTP.PATCH]: app.patch
};
