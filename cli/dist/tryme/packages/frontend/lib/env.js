"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var isServerSide = typeof window === "undefined";
var env = {
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    sentryLazyLoaderUrl: process.env.NEXT_PUBLIC_SENTRY_LAZY_LOADER_URL,
    someOptionalVariable: process.env.SOME_OPTIONAL_VARIABLE || "default value"
};
function validate(e) {
    var e_1, _a;
    var errors = [];
    try {
        for (var _b = __values(Object.keys(e)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var variable = _c.value;
            if (!e[variable] &&
                (variable.startsWith("NEXT_PUBLIC_") || isServerSide)) {
                // If there is no value for a variable we want to return an error. But
                // when running in the browser we should not expect server-side variables
                // to be defined. (Only variables prefixed with NEXT_PUBLIC_ are sent to
                // the browser.) So skip error reporting if a server-side variable is
                // missing in the browser.
                errors.push("- " + variable);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (errors.length > 0) {
        throw new Error("These environment variable(s) are required, but are not set:\n" +
            errors.join("\n"));
    }
}
validate(env);
exports["default"] = env;
//# sourceMappingURL=env.js.map