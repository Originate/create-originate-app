"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@apollo/client");
var react_1 = __importDefault(require("react"));
var styled_components_1 = require("styled-components");
var apolloClient_1 = require("../lib/apolloClient");
var Theme_1 = require("../components/Theme");
var GlobalStyles_1 = require("../components/GlobalStyles");
/**
 * The App component implicitly wraps every page component. This code runs
 * client-side and server-side.
 *
 * See https://nextjs.org/docs/advanced-features/custom-app
 */
function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var apolloClient = apolloClient_1.useApollo(pageProps.initialApolloState);
    return (<client_1.ApolloProvider client={apolloClient}>
      <styled_components_1.ThemeProvider theme={Theme_1.theme}>
        <GlobalStyles_1.GlobalStyle />
        <Component {...pageProps}/>
      </styled_components_1.ThemeProvider>
    </client_1.ApolloProvider>);
}
exports["default"] = App;
//# sourceMappingURL=_app.js.map