import express from 'express';
import moment from 'moment';
const cors = require('cors');

const boot = require('./app/boot');

const app: express.Application = express();
app.use(cors());
app.use(express.json());
boot(app);
app.listen(3000, () => {

  const date = "2021-08-31";
  const enWeek = moment(date).format("dddd");
  console.log(enWeek);

  console.log('App is listening on port 3000! http://localhost:3000');
});
