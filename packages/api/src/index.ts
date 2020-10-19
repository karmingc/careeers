import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import cors from 'cors';
import dotenv from 'dotenv';

import { ApiRoutes } from './routes/index';
import { HttpMethods } from './helpers/https';

dotenv.config();

// create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080; // default port to listen

app.get('/', (req: Request, res: Response) => {
  res.send("welcome to careeers' api");
});

/**
 * But be careful with this approach.
 * If you are using ts-node then you need to specify paths to .ts files instead.
 * If you are using outDir then you'll need to specify paths to .js files inside
 * outDir directory. If you are using outDir and when you remove or rename your
 * entities make sure to clear outDir directory and re-compile your project
 * again, because when you remove your source .ts files their compiled .js
 * versions aren't removed from output directory and still are loaded by
 * TypeORM because they are present in the outDir directory.
 */
createConnection({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/entities/*.ts'],
  synchronize: true,
  logging: false,
  cache: true
})
  .then(async (connection) => {
    ApiRoutes.forEach((route) => {
      HttpMethods[route.method].bind(app)(
        '/api' + route.path,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });
  })
  .catch((error) => console.log(error));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
