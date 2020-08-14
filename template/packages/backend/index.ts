import {good} from '@Originate/leash';
import express from 'express';
import {router} from '@/lib';

import {delay} from '@/backend/src/utils';

const app = express();
const port = 3000;

router.ping.install(app, async (req) => {
  const fakeDelayForDemo = () => delay(2);
  await fakeDelayForDemo();
  if (typeof req.query.mood === 'string') {
    return good({mood: req.query.mood});
  }
  throw new Error('bad mood');
});

app.listen(port, () => {
  console.log(`backend: started at http://localhost:${port}`);
});
