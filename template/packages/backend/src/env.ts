import { config } from "dotenv"
import * as Either from "fp-ts/lib/Either"
import * as D from "io-ts/lib/Decoder"

config()

const decoder = D.type({
  ENVIRONMENT: D.string,
  PORT: withDefault("3000", D.string),
  DATABASE_URL: D.string,
})

function withDefault<T, U>(
  defaultValue: U,
  decoder: D.Decoder<T, U>,
): D.Decoder<T, U> {
  return {
    decode: u => {
      const result = decoder.decode(u)
      return Either.isLeft(result) ? D.success(defaultValue) : result
    },
  }
}

export type Env = D.TypeOf<typeof decoder>

export const parseEnv = (): Env => {
  const either = decoder.decode(process.env)
  if (Either.isLeft(either)) {
    throw new Error(D.draw(either.left))
  } else {
    return either.right
  }
}

export const env = parseEnv()

export function isDev(): boolean {
  return env.ENVIRONMENT === "development"
}
