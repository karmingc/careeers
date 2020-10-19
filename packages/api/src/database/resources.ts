import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Verifies if id exist in support table
 * @param request request from frontend
 */
export async function test(request: Request, response: Response) {
    console.log('good job')
    return response.status(200).send('swag')
}