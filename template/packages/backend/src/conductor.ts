import {UserSignup, User} from '@/lib';
import * as Auth from '@/auth';
import * as D from 'io-ts/lib/Decoder';

import {makeExpress} from '@/backend/src/utils';
import {parseEnv} from '@/backend/src/env';
import {App} from '@/backend/src/app';
import {DB} from '@/backend/src/db';

const signupDecoder: D.Decoder<unknown, UserSignup> = D.type({
  name: D.string,
});

function makeEnv() {
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
  return env;
}

export class Conductor {
  env = makeEnv();
  authController = new Auth.AuthController<UserSignup, User>(signupDecoder);
  db = new DB(this.env);

  async listen() {
    await this._testDB();
    const express = makeExpress(this.env, (express) => {
      new App(this.env, express, this.authController);
    });
    express.listen(this.env.PORT, () => {
      console.log(`backend: started at http://localhost:${this.env.PORT}`);
    });
  }

  async _testDB() {
    const url = 'https://github.com/Originate/create-originate-app/blob/master/docs/persistence.md';
    try {
      await this.db.withClient((client) => client.query('SELECT 1234'));
    } catch (e) {
      if (e.code == 'ECONNREFUSED') {
        console.error(`>>> unable to connect to ${this.env.DATABASE_URL} <<<`);
        console.error(`see ${url} for help`);
        process.exit(1);
      } else {
        throw e;
      }
    }
  }
}
