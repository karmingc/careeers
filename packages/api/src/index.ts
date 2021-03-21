import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import cors from 'cors';

import dotenv from 'dotenv';

import { ApiRoutes } from './routes/index';
import { app, HttpMethods } from './helpers/https';
import { getCloudinaryInstance } from './helpers/cloudinary';

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const port = process.env.PORT || 8080; // default port to listen

app.get('/', (req: Request, res: Response) => {
  res.send("welcome to careeers' api");
});

createConnection({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/entities/{*.ts,*.js}'],
  synchronize: true,
  logging: false,
  cache: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
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
    getCloudinaryInstance();
  })

  .catch((error) => console.log(error));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
