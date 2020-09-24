import {Pool, PoolClient} from 'pg';
import {Env} from '@/backend/src/env';

export class DB {
  pool: Pool;

  constructor(env: Env) {
    this.pool = new Pool({connectionString: env.DATABASE_URL});
    this.pool.on('error', (err) => {
      throw err;
    });
  }

  async withClient<T>(handler: (c: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      const result = await handler(client);
      return result;
    } finally {
      client.release();
    }
  }
}
