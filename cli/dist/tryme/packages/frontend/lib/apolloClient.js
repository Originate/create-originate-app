"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useApollo = exports.initializeApollo = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var env_1 = __importDefault(require("./env"));
var apolloClient;
var isServerSide = typeof window === "undefined";
function createApolloClient() {
    return new client_1.ApolloClient({
        ssrMode: isServerSide,
        link: new client_1.HttpLink({
            uri: env_1["default"].graphqlUrl
        }),
        cache: new client_1.InMemoryCache()
    });
}
function initializeApollo(initialState) {
    if (initialState === void 0) { initialState = null; }
    var _apolloClient = apolloClient !== null && apolloClient !== void 0 ? apolloClient : createApolloClient();
    // If your page has Next.js data fetching methods that use Apollo Client, the
    // initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client-side data fetching
        var existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore(__assign(__assign({}, existingCache), initialState));
    }
    // On the client create the Apollo Client once and save a reference to it. For
    // SSR and SSG we want a new Client instance every time this function is
    // called.
    if (!isServerSide && !apolloClient) {
        apolloClient = _apolloClient;
    }
    return _apolloClient;
}
exports.initializeApollo = initializeApollo;
function useApollo(initialState) {
    var store = react_1.useMemo(function () { return initializeApollo(initialState); }, [initialState]);
    return store;
}
exports.useApollo = useApollo;
//# sourceMappingURL=apolloClient.js.map