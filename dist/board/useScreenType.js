import React from 'react';
import { getBreakpointFromWidth } from './utils';
import { materialuiTheme } from '../theme';
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

var useScreenType = function useScreenType(width) {
  return React.useMemo(function () {
    var breakpoint = getBreakpointFromWidth(materialuiTheme.breakpoints.values, width);

    var _getScreenSize = getScreenSize(breakpoint),
        mobile = _getScreenSize.mobile,
        tablet = _getScreenSize.tablet;

    return mobile ? 'mobile' : tablet ? 'tablet' : 'desktop';
  }, [width]);
};

export default useScreenType;
//# sourceMappingURL=useScreenType.js.map