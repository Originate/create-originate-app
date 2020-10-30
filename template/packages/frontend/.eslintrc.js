module.exports = {
  extends: "../.eslintrc.base.js",
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  plugins: ["graphql", "ts-graphql"],
  rules: {
    "graphql/capitalized-type-name": "warn",
    "graphql/named-operations": "error",
	"graphql/no-deprecated-fields": ["warn", { env: "apollo" }],
    "graphql/required-fields": [
      "error",
      { env: "apollo", requiredFields: ["id"] },
    ],
    "graphql/template-strings": ["error", { env: "apollo" }],
    "ts-graphql/gql-type-assertion": "error",
  },
}
