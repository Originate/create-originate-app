"use strict";
exports.__esModule = true;
var helpers_js_1 = require("./helpers.js");
jest.createMockFromModule("chalk");
describe("cli", function () {
    test("FRONTEND_REGEXP", function () {
        var pass = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql";
        var fail = "PORT=4000";
        expect(helpers_js_1.FRONTEND_REGEXP.test(pass)).toBe(true);
        expect(helpers_js_1.FRONTEND_REGEXP.test(fail)).toBe(false);
    });
    test("BACKEND_REGEXP", function () {
        var pass = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql";
        var fail = "PORT=4000";
        expect(helpers_js_1.BACKEND_REGEXP.test(pass)).toBe(false);
        expect(helpers_js_1.BACKEND_REGEXP.test(fail)).toBe(true);
    });
});
//# sourceMappingURL=cli.test.js.map