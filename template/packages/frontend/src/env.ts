import * as D from "io-ts/lib/Decoder"
import * as Either from "fp-ts/lib/Either"

const decoder = D.type({
  REACT_APP_GRAPHQL_URL: D.string,
  REACT_APP_GA_MEASUREMENT_ID: D.string,
  REACT_APP_SENTRY_LAZY_LOADER_URL: D.string,
})

export type Env = D.TypeOf<typeof decoder>

export const parseEnv = (): Env | string => {
  const either = decoder.decode(process.env)
  if (Either.isLeft(either)) {
    return D.draw(either.left)
  } else {
    return either.right
  }
}
