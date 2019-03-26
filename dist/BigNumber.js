import _styled from "styled-components";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
var fontSizeMap = {
  medium: 32,
  large: 48
};
var defaultProps = {
  color: 'light',
  size: 'large'
};

var wrapper = function wrapper(_ref) {
  var size = _ref.size,
      color = _ref.color,
      props = _objectWithoutProperties(_ref, ["size", "color"]);

  return React.createElement("div", props);
};

wrapper.defaultProps = defaultProps;

var BigNumber = _styled(wrapper).withConfig({
  displayName: "BigNumber",
  componentId: "l2zbtc-0"
})(["&&{font-size:", ";line-height:normal;letter-spacing:0.08em;color:", ";white-space:nowrap}"], function (_ref2) {
  var theme = _ref2.theme,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? defaultProps.size : _ref2$size;
  return theme.mui.typography.pxToRem(fontSizeMap[size]);
}, function (_ref3) {
  var _ref3$color = _ref3.color,
      color = _ref3$color === void 0 ? defaultProps.color : _ref3$color;
  return color === 'light' ? '#FFFFFF' : '#404040';
});

export default BigNumber;
//# sourceMappingURL=BigNumber.js.map