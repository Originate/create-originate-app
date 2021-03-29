module.exports = {
  extends: "../.eslintrc.base.js",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  plugins: ["graphql", "@originate/ts-graphql"],
  rules: {
    // These rules conflict with nextjs conventions
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    //
    "graphql/capitalized-type-name": "warn",
    "graphql/named-operations": "error",
    "graphql/no-deprecated-fields": ["warn", { env: "apollo" }],
    "graphql/required-fields": [
      "error",
      { env: "apollo", requiredFields: ["id"] },
    ],
    "graphql/template-strings": ["error", { env: "apollo" }],
    "@originate/ts-graphql/gql-type-assertion": "error",
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
      },
    },
  ],
  ignorePatterns: ["__generated__", "cypress"],
}
