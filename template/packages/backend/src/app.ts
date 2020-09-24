import {good, installMany} from '@Originate/leash';
import {Express} from 'express';

import {authRouter, router, UserSignup, User} from '@/lib';
import * as Auth from '@/auth';

import {delay} from '@/backend/src/utils';
import {Env} from '@/backend/src/env';

export class App {
  constructor(_env: Env, express: Express, authController: Auth.AuthController<UserSignup, User>) {
    installMany(express, authRouter, authController.routes);
    router.ping.install(express, async (req) => {
      const fakeDelayForDemo = () => delay(2);
      await fakeDelayForDemo();
      if (typeof req.query.mood === 'string') {
        return good({mood: req.query.mood});
      }
      throw new Error('bad mood');
    });
  }
}
