import dotenv from 'dotenv';
import {Conductor} from '@/backend/src/conductor';

async function main() {
  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });

  dotenv.config();
  const conductor = new Conductor();
  await conductor.listen();
}

main().catch((e) => {
  throw e;
});
