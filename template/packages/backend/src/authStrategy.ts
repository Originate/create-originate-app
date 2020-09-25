import {QueryResult} from 'pg';
import * as D from 'io-ts/lib/Decoder';

import {Env} from '@/backend/src/env';
import {DB} from '@/backend/src/db';
import {UserSignup, User} from '@/lib';

namespace Rows {
  export interface Auth {
    id: string;
    password_digest: Buffer;
  }
}

export class AuthStrategy {
  constructor(_env: Env, private db: DB) {}

  signupDecoder: D.Decoder<unknown, UserSignup> = D.type({
    name: D.string,
    email: D.string,
  });

  async createUser(
    user: UserSignup,
    passwordDigest: Buffer,
  ): Promise<{ok: true; id: string} | {ok: false; key: string; error: string}> {
    const query = `
INSERT INTO auth(id, password_digest)
VALUES ($1, $2)
ON CONFLICT (id) DO NOTHING
`;
    return await this.db.withClient(async (client) => {
      const answer = await client.query(query, [user.email, passwordDigest]);
      if (answer.rowCount === 0) {
        return {ok: false, key: 'duplicate', error: 'User with this email already exists'};
      } else {
        return {ok: true, id: user.email};
      }
    });
  }

  async authenticate(
    id: string,
  ): Promise<{ok: true; passwordDigest: Buffer; user: User} | {ok: false; key: string; error: string}> {
    return await this.db.withClient(async (client) => {
      const query = 'SELECT * FROM auth WHERE id = $1';
      const answer: QueryResult<Rows.Auth> = await client.query(query, [id]);
      if (answer.rows.length > 0) {
        return {
          ok: true,
          passwordDigest: answer.rows[0].password_digest,
          user: {email: answer.rows[0].id, name: 'fixme', occupation: 'fixme'},
        };
      } else {
        return {ok: false, key: 'unauthorized', error: 'Incorrect username or password'};
      }
    });
  }
}
