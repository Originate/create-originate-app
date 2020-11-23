const isServerSide = typeof window === "undefined"

const env = {
  graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  sentryLazyLoaderUrl: process.env.NEXT_PUBLIC_SENTRY_LAZY_LOADER_URL,
  someOptionalVariable: process.env.SOME_OPTIONAL_VARIABLE || "default value",
} as const

export type Env = typeof env

function validate(e: Env) {
  const errors: string[] = []
  for (const variable of Object.keys(e)) {
    if (
      !e[variable as keyof Env] &&
      (variable.startsWith("NEXT_PUBLIC_") || isServerSide)
    ) {
      // If there is no value for a variable we want to return an error. But
      // when running in the browser we should not expect server-side variables
      // to be defined. (Only variables prefixed with NEXT_PUBLIC_ are sent to
      // the browser.) So skip error reporting if a server-side variable is
      // missing in the browser.
      errors.push(`- ${variable}`)
    }
  }
  if (errors.length > 0) {
    throw new Error(
      "These environment variable(s) are required, but are not set:\n" +
        errors.join("\n"),
    )
  }
}

validate(env)
export default env
