function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { withTheme } from 'styled-components';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import TrendingDown from '@material-ui/icons/TrendingDown';
var iconMap = {
  up: TrendingUp,
  flat: TrendingFlat,
  down: TrendingDown
};

var getColor = function getColor(variant, theme) {
  switch (variant) {
    case 'up':
      return theme.tfso.palette.success;

    case 'down':
      return theme.tfso.palette.warning;

    case 'flat':
      return theme.tfso.palette.alert;

    default:
      return undefined;
  }
};

var trending = function trending(_ref) {
  var variant = _ref.variant,
      theme = _ref.theme,
      iconProps = _objectWithoutProperties(_ref, ["variant", "theme"]);

  var Icon = iconMap[variant];
  var htmlColor = getColor(variant, theme);
  return React.createElement(Icon, Object.assign({
    htmlColor: htmlColor
  }, iconProps));
};

export default React.memo(withTheme(trending));
//# sourceMappingURL=Trending.js.map