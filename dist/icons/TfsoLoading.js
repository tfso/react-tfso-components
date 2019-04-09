import { css as _css } from "styled-components";
import _styled from "styled-components";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    opacity: 1;\n    animation-delay: 1.5s;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

var TfsoLoadingIconWrapper = function TfsoLoadingIconWrapper(_ref) {
  var once = _ref.once,
      other = _objectWithoutProperties(_ref, ["once"]);

  return React.createElement(SvgIcon, other);
};

var path = _css(_templateObject());

var StyledSvgIcon = _styled(TfsoLoadingIconWrapper).withConfig({
  displayName: "StyledSvgIcon",
  componentId: "sc-155ause-0"
})(["&&{#path1{", " animation:fade-in1 1.5s ", "}#path2{", " animation:fade-in2 1.5s ", "}#path3{", " animation:fade-in3 1.5s ", "}#path4{", " animation:fade-in4 1.5s ", "}#path5{", " animation:fade-in5 1.5s ", "}@keyframes fade-in1{0%{opacity:0.2;}20%{opacity:1;}40%{opacity:1;}60%{opacity:1;}80%{opacity:1;}100%{opactiy:1}}@keyframes fade-in2{0%{opacity:0.2;}20%{opacity:0.2;}40%{opacity:1;}60%{opacity:1;}80%{opacity:1;}100%{opactiy:1}}@keyframes fade-in3{0%{opacity:0.2;}20%{opacity:0.2;}40%{opacity:0.2;}60%{opacity:1;}80%{opacity:1;}100%{opactiy:1}}@keyframes fade-in4{0%{opacity:0.2;}20%{opacity:0.2;}40%{opacity:0.2;}60%{opacity:0.2;}80%{opacity:1;}100%{opactiy:1}}@keyframes fade-in5{0%{opacity:0.2;}20%{opacity:0.2;}40%{opacity:0.2;}60%{opacity:0.2;}80%{opacity:1;}100%{opactiy:1}}}"], path, function (_ref2) {
  var once = _ref2.once;
  return once ? 1 : 'infinite';
}, path, function (_ref3) {
  var once = _ref3.once;
  return once ? 1 : 'infinite';
}, path, function (_ref4) {
  var once = _ref4.once;
  return once ? 1 : 'infinite';
}, path, function (_ref5) {
  var once = _ref5.once;
  return once ? 1 : 'infinite';
}, path, function (_ref6) {
  var once = _ref6.once;
  return once ? 1 : 'infinite';
}); // seems like returntype of styled-components adds string as a type of _ref.. dunnp why


export default React.memo(function (props) {
  return React.createElement(StyledSvgIcon, Object.assign({}, props, {
    viewBox: "0 0 37 23",
    fillRule: "evenodd",
    strokeWidth: "1"
  }), React.createElement("path", {
    d: "M21.79 9.81C21.17789 8.5323532 19.886707 7.7195303 18.47 7.72 16.444136 7.7143752 14.803816 6.0724096 14.800223 4.0465408 14.79663 2.020672 16.431115 0.37289845 18.456947 0.36008776 20.482778 0.34727707 22.137972 1.9742478 22.16 4c-0.01782 1.4288443 0.793121 2.7388262 2.08 3.36-1.120033 0.4431782-2.006822 1.3299671-2.45 2.45l0 0z",
    id: "path5"
  }), React.createElement("path", {
    d: "m33.24 15.09c-1.427527 0.01209-2.733245-0.802525-3.35-2.09-0.443178 1.120033-1.329967 2.006822-2.45 2.45 1.275973 0.613987 2.088053 1.903991 2.09 3.32 0 2.032408 1.647592 3.68 3.68 3.68 2.032408 0 3.68-1.647592 3.68-3.68 0-2.032408-1.647592-3.68-3.68-3.68l0.03 0 0 0z",
    id: "path4"
  }), React.createElement("path", {
    d: "m14.79 11.41c0-2.0351693-1.649831-3.685-3.685-3.685-2.0351693 0-3.685 1.6498307-3.685 3.685 0 2.032408-1.6475921 3.68-3.68 3.68-2.0324079 0-3.68 1.647592-3.68 3.68 0 2.032408 1.6475921 3.68 3.68 3.68 2.0324079 0 3.68-1.647592 3.68-3.68-0.00119-1.719312 1.1882715-3.210312 2.864877-3.591141 1.676605-0.380829 3.39346 0.450022 4.135123 2.001141 0.443178-1.120033 1.329967-2.006822 2.45-2.45-1.27208-0.616837-2.079908-1.906255-2.08-3.32l0 0 0 0z",
    id: "path2"
  }), React.createElement("path", {
    d: "m25.84 7.73c-2.016889-0.0001192-3.658077 1.6232303-3.68 3.64l0 0.09c-0.02094 1.397916-0.830116 2.663946-2.09 3.27 1.120033 0.443178 2.006822 1.329967 2.45 2.45 0.613987-1.275973 1.903991-2.088053 3.32-2.09 2.035169 0 3.685-1.649831 3.685-3.685 0-2.0351693-1.649831-3.685-3.685-3.685l0 0.01 0 0z",
    id: "path3"
  }), React.createElement("path", {
    d: "m18.47 15.1c-2.031097 0.0055-3.673671 1.655547-3.669994 3.686649 0.0037 2.031101 1.652215 3.675171 3.683318 3.673336C20.514428 22.45815 22.159993 20.811104 22.16 18.78 22.162665 17.800536 21.774754 16.860421 21.082167 16.167833 20.389579 15.475246 19.449463 15.087335 18.47 15.09l0 0.01 0 0z",
    id: "path1"
  }));
});
//# sourceMappingURL=TfsoLoading.js.map