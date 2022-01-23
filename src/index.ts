import express from 'express';
const cors = require('cors');

const boot = require('./app/boot');

const app: express.Application = express();
app.use(cors());
app.use(express.json());
boot(app);
app.listen(3000, () => {
  console.log('App is listening on port 3000! http://localhost:3000');
});
