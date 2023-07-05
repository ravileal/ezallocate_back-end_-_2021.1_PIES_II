import express from 'express';
import cors from 'cors';

import boot from './app/boot';

const start = (app: express.Application = express()) => {
  app.use(cors());
  app.use(express.json());
  boot(app);
  app.listen(3000, () => {
    console.log('App is listening on port 3000! http://localhost:3000');
  });
};

export default start;
