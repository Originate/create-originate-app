import {good} from '@Originate/leash';
import dotenv from 'dotenv';

import {authRouter, router, UserSignup, User} from '@/lib';
import * as Auth from '@/auth';
import * as D from 'io-ts/lib/Decoder';

import {delay, makeExpress} from '@/backend/src/utils';
import {parseEnv} from '@/backend/src/env';

const signupDecoder: D.Decoder<unknown, UserSignup> = D.type({
  name: D.string,
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
    console.error('unsolicited advice: check your packages/backend/.env file');
    process.exit(1);
  }

  const authController = new Auth.AuthController<UserSignup, User>(signupDecoder);

  const app = makeExpress(env, (app) => {
    authRouter.login.install(app, authController.loginPOST);
    authRouter.signup.install(app, authController.signupPOST);
    authRouter['password-reset'].install(app, authController.passwordResetPOST);
    authRouter.password.install(app, authController.passwordPUT);

    router.ping.install(app, async (req) => {
      const fakeDelayForDemo = () => delay(2);
      await fakeDelayForDemo();
      if (typeof req.query.mood === 'string') {
        return good({mood: req.query.mood});
      }
      throw new Error('bad mood');
    });
  });

  app.listen(env.PORT, () => {
    console.log(`backend: started at http://localhost:${env.PORT}`);
  });
}

main();
