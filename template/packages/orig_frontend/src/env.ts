const required = undefined
const defaultValue = (x: string) => x

const expectedVariables = {
  REACT_APP_GRAPHQL_URL: required,
  REACT_APP_GA_MEASUREMENT_ID: required,
  REACT_APP_SENTRY_LAZY_LOADER_URL: required,
  SOME_OPTIONAL_VARIABLE: defaultValue("whatever"),
} as const

export type Env = { [K in keyof typeof expectedVariables]: string }

export function parseEnv(): Env | Error {
  const env: Record<string, string> = {}
  const errors: string[] = []
  for (const variable of Object.keys(expectedVariables)) {
    const value =
      process.env[variable] ||
      expectedVariables[variable as keyof typeof expectedVariables]
    if (value) {
      env[variable] = value
    } else {
      errors.push(`- ${variable}`)
    }
  }

  return errors.length === 0
    ? (env as Env)
    : new Error(
        "These environment variable(s) are required, but are not set:\n" +
          errors.join("\n"),
      )
}
