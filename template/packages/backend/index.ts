import {good} from '@Originate/leash';
import dotenv from 'dotenv';

import {router} from '@/lib';

import {delay, makeExpress} from '@/backend/src/utils';
import {parseEnv} from '@/backend/src/env';

function main() {
  dotenv.config();
  const env = parseEnv();
  if (typeof env == 'string') {
    console.error('missing or invalid keys in ENV');
    console.error('==============================');
    console.error('');
    console.error(env);
    console.error('');
    console.error('unsolicited advice: check your packages/backend/.env file');
    process.exit(1);
  }

  const app = makeExpress(env);

  router.ping.install(app, async (req) => {
    const fakeDelayForDemo = () => delay(2);
    await fakeDelayForDemo();
    if (typeof req.query.mood === 'string') {
      return good({mood: req.query.mood});
    }
    throw new Error('bad mood');
  });

  app.listen(env.PORT, () => {
    console.log(`backend: started at http://localhost:${env.PORT}`);
  });
}

main();
