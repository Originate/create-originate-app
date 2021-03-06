import {
  DATABASE_URL_REGEXP,
  FRONTEND_REGEXP,
  BACKEND_REGEXP,
  README_REGEXP,
} from "../src/helpers"
jest.mock("chalk", () => jest.fn(() => {}))

describe("cli", () => {
  test("FRONTEND_REGEXP", () => {
    const string = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql"
    expect(FRONTEND_REGEXP.test(string)).toBe(true)
  })

  test("BACKEND_REGEXP", () => {
    const string = "PORT=4000"
    expect(BACKEND_REGEXP.test(string)).toBe(true)
  })

  test("DATABASE_URL_REGEXP", () => {
    const string = "DATABASE_URL=postgres:postgres:password@loclhost/postgres"
    expect(DATABASE_URL_REGEXP.test(string)).toBe(false)
  })

  test("README_REGEXP", () => {
    const string = "@replaceme"
    expect(README_REGEXP.test(string)).toBe(true)
  })
})
