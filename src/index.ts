import express from 'express';

const app: express.Application = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('App is listening on port 3000! http://localhost:3000');
});
