function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import useTheme from '@material-ui/styles/useTheme';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
var mobile = ['xs', 'sm'];
var tablet = ['sm', 'md'];
var desktop = ['md', 'lg', 'xl'];

var getScreenSize = function getScreenSize(width) {
  return {
    mobile: mobile.includes(width),
    tablet: tablet.includes(width),
    desktop: desktop.includes(width)
  };
};

var ScreenSize = withWidth()(function (props) {
  return props.children(getScreenSize(props.width));
});
export function withScreenSize(Component) {
  return function (props) {
    return React.createElement(ScreenSize, null, function (screenSize) {
      return React.createElement(Component, Object.assign({}, props, {
        screenSize: screenSize
      }));
    });
  };
}
export var useScreenSize = function useScreenSize() {
  var theme = useTheme();
  var width = _toConsumableArray(theme.breakpoints.keys).reverse().reduce(function (output, key) {
    var matches = useMediaQuery(theme.breakpoints.only(key));
    return !output && matches ? key : output;
  }, null) || 'xs';
  return getScreenSize(width);
};
export default ScreenSize;
//# sourceMappingURL=ScreenSize.js.map