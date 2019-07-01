import React from 'react';
import withWidth from '@material-ui/core/withWidth'; // import useTheme from '@material-ui/styles/useTheme'
// import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery'

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
  throw new Error('ScreenSize hook is not finished yet. Sorry'); // Below breaks hook rules (even though it actually works)

  /*
  const theme = useTheme()
   const width = [...theme.breakpoints.keys]
      .reverse()
      .reduce((output, key) => {
          const matches = useMediaQuery(theme.breakpoints.only(key))
          return !output && matches ? key : output
      }, null) || 'xs'
   return getScreenSize(width)
  */
};
export default ScreenSize;
//# sourceMappingURL=ScreenSize.js.map