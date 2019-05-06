function _templateObject() {
  var data = _taggedTemplateLiteral(["&&{\n    background-color: ", "\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
var variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

var bgColor = function bgColor(variant, palette) {
  switch (variant) {
    case 'success':
      return palette.success;

    case 'error':
      return palette.alert;

    case 'info':
      return palette.primaryLight;

    case 'warning':
      return palette.warning;
  }
};

var SnackbarContent = function SnackbarContent(_ref) {
  var variant = _ref.variant,
      other = _objectWithoutProperties(_ref, ["variant"]);

  return React.createElement(MuiSnackbarContent, other);
};

var StyledSnack = styled(SnackbarContent)(_templateObject(), function (_ref2) {
  var variant = _ref2.variant,
      theme = _ref2.theme;
  return bgColor(variant, theme.tfso.palette);
});

var Alert = function Alert(props) {
  var message = props.message,
      onClose = props.onClose,
      variant = props.variant;
  var Icon = variantIcon[variant];
  return React.createElement(StyledSnack, {
    variant: variant,
    "aria-describedby": "client-snackbar",
    message: React.createElement("span", {
      id: "client-snackbar",
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, React.createElement(Icon, {
      style: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: 10
      }
    }), message),
    action: [React.createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      onClick: onClose
    }, React.createElement(CloseIcon, {
      fontSize: "small"
    }))]
  });
};

export default Alert;
//# sourceMappingURL=Alert.js.map