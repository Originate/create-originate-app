module.exports = {
  extends: "../.eslintrc.base.js",
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  plugins: ["ts-graphql"],
  rules: {
    "ts-graphql/gql-type-assertion": "error",
  },
}
