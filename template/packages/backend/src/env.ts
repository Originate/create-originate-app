import * as D from 'io-ts/lib/Decoder';
import * as Either from 'fp-ts/lib/Either';
import {withDefault} from '@/lib/src/io-ts';

const decoder = D.type({
  ENVIRONMENT: D.string,
  PORT: withDefault('3000', D.string),
  DATABASE_URL: D.string,
});

export type Env = D.TypeOf<typeof decoder>;

export const parseEnv = (): Env | string => {
  const either = decoder.decode(process.env);
  if (Either.isLeft(either)) {
    return D.draw(either.left);
  } else {
    return either.right;
  }
};
