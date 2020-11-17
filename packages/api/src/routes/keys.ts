import { Request, Response } from 'express';

export async function getGaMeasurementId(request: Request, response: Response) {
  response.status(200).send({ id: process.env.GA_MEASUREMENT_ID });
  return;
}
