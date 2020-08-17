import {good} from '@Originate/leash';
import express from 'express';
import dotenv from 'dotenv';

import {router} from '@/lib';

import {delay} from '@/backend/src/utils';
import {parseEnv} from '@/backend/src/env';

const app = express();

router.ping.install(app, async (req) => {
  const fakeDelayForDemo = () => delay(2);
  await fakeDelayForDemo();
  if (typeof req.query.mood === 'string') {
    return good({mood: req.query.mood});
  }
  throw new Error('bad mood');
});

function main() {
  dotenv.config();
  const env = parseEnv();
  if (typeof env == 'string') {
    console.error('missing or invalid keys in ENV');
    console.error('==============================');
    console.error('');
    console.error(env);
    console.error('');
    console.error('unsolicited advice: check your .env file');
  } else {
    app.listen(env.PORT, () => {
      console.log(`backend: started at http://localhost:${env.PORT}`);
    });
  }
}

main();
