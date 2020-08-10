import {good} from '@Originate/leash';
import express from 'express';
import {router} from '@/lib/routes';

const app = express();
const port = 3000;

const delay = async (seconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(void 0), seconds * 1000);
  });

router.ping.install(app, async (req) => {
  await delay(2);
  if (typeof req.query.mood === 'string') {
    return good({mood: req.query.mood});
  }
  throw new Error('bad mood');
});

app.listen(port, () => {
  console.log(`backend: started at http://localhost:${port}`);
});
