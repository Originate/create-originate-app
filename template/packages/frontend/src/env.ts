import * as D from 'io-ts/lib/Decoder';
import * as Either from 'fp-ts/lib/Either';

declare global {
  const MAGIC_WEBPACK_ENVIRONMENT: string;
}

const decoder = D.type({
  GOOGLE_ANALYTICS_ID: D.string,
});

export type Env = D.TypeOf<typeof decoder>;

export const parseEnv = (): Env | string => {
  const either = decoder.decode(MAGIC_WEBPACK_ENVIRONMENT);
  if (Either.isLeft(either)) {
    return D.draw(either.left);
  } else {
    return either.right;
  }
};
