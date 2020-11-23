"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.RecipeContainer = exports.BackButton = exports.Button = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
exports.Button = styled_components_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  color: ", ";\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid ", ";\n  border-radius: 3px;\n  width: 10rem;\n  :focus {\n    border-color: ", ";\n    outline: none;\n  }\n  :hover {\n    cursor: pointer;\n  }\n"], ["\n  background: ",
    ";\n  color: ",
    ";\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid ", ";\n  border-radius: 3px;\n  width: 10rem;\n  :focus {\n    border-color: ", ";\n    outline: none;\n  }\n  :hover {\n    cursor: pointer;\n  }\n"])), function (props) {
    return props.primary ? props.theme.colors.accent2 : props.theme.colors.white;
}, function (props) {
    return props.primary ? props.theme.colors.white : props.theme.colors.accent2;
}, function (props) { return props.theme.colors.accent2; }, function (props) { return props.theme.colors.accent; });
exports.BackButton = styled_components_1["default"](exports.Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  left: 1rem;\n  top: 1rem;\n"], ["\n  position: absolute;\n  left: 1rem;\n  top: 1rem;\n"])));
exports.RecipeContainer = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 3rem 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  padding: 3rem 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=RecipeStyles.js.map