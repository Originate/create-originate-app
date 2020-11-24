import { FRONTEND_REGEXP, BACKEND_REGEXP } from "./helpers";
jest.createMockFromModule("chalk");

describe("cli", () => {
  test("FRONTEND_REGEXP", () => {
    const pass = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql";
    const fail = "PORT=4000";
    expect(FRONTEND_REGEXP.test(pass)).toBe(true);
    expect(FRONTEND_REGEXP.test(fail)).toBe(false);
  });

  test("BACKEND_REGEXP", () => {
    const pass = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql";
    const fail = "PORT=4000";
    expect(BACKEND_REGEXP.test(pass)).toBe(false);
    expect(BACKEND_REGEXP.test(fail)).toBe(true);
  });
});
