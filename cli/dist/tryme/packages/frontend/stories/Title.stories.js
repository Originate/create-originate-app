"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var React = __importStar(require("react"));
var react_1 = require("@storybook/react");
var IndexStyles_1 = require("../components/IndexStyles");
var Theme_1 = require("../components/Theme");
var GlobalStyles_1 = require("../components/GlobalStyles");
var styled_components_1 = require("styled-components");
react_1.storiesOf("Title", module).add("with text", function () {
    return (<styled_components_1.ThemeProvider theme={Theme_1.theme}>
      <GlobalStyles_1.GlobalStyle />
      <IndexStyles_1.Title>
        Welcome to{" "}
        <a href="https://github.com/Originate/create-react-app">
          Create Originate App!
        </a>
      </IndexStyles_1.Title>
    </styled_components_1.ThemeProvider>);
});
//# sourceMappingURL=Title.stories.js.map