import _styled from "styled-components";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ScreenSize from '../ScreenSize';
import { Tooltip } from '@material-ui/core';

var CustomCard = _styled(Card).withConfig({
  displayName: "CustomCard",
  componentId: "sc-1432bb2-0"
})(["&&{box-shadow:none;min-width:200px;}"]);

var CustomCardContent = _styled(CardContent).withConfig({
  displayName: "CustomCardContent",
  componentId: "sc-1432bb2-1"
})(["&&{padding:0;box-shadow:none;}"]);

var ProfileCardContent = _styled(CardContent).withConfig({
  displayName: "ProfileCardContent",
  componentId: "sc-1432bb2-2"
})(["display:flex;align-items:center;background-color:", ";"], function (_ref) {
  var theme = _ref.theme,
      color = _ref.color;
  return color || theme.tfso.colors.menu;
});

var ProfileTypography = _styled(Typography).withConfig({
  displayName: "ProfileTypography",
  componentId: "sc-1432bb2-3"
})(["&&{color:", "}"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.mui.palette.primary.contrastText;
});

var ProfileAvatar = _styled(Avatar).withConfig({
  displayName: "ProfileAvatar",
  componentId: "sc-1432bb2-4"
})(["&&{width:60px;height:60px;margin:", "px;}"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.mui.spacing.unit;
});

var CustomCloseIconButton = _styled(IconButton).withConfig({
  displayName: "CustomCloseIconButton",
  componentId: "sc-1432bb2-5"
})(["&&{position:absolute;right:0;margin:0 auto;color:", ";}"], function (_ref4) {
  var theme = _ref4.theme;
  return theme.mui.palette.primary.contrastText;
});

var RightPanel = _styled.div.withConfig({
  displayName: "RightPanel",
  componentId: "sc-1432bb2-6"
})(["flex:1 0 auto;padding:", "px;;"], function (_ref5) {
  var theme = _ref5.theme;
  return theme.mui.spacing.unit;
});

var Right = _styled.div.withConfig({
  displayName: "Right",
  componentId: "sc-1432bb2-7"
})(["text-align:right;flex:1 0 auto;"]);

var TransitionComponent = function TransitionComponent(props) {
  return React.createElement(Slide, Object.assign({
    direction: "down"
  }, props));
};

var ProfileCard =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ProfileCard, _React$PureComponent);

  function ProfileCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProfileCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProfileCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onClose = function () {
      _this.props.onClose();
    };

    _this.onSignOut = function () {
      _this.props.onSignOut();
    };

    _this.renderContent = function () {
      return React.createElement(CustomCard, null, React.createElement(ProfileCardContent, null, React.createElement(ProfileAvatar, {
        src: _this.props.identity.profile.thumb.data,
        "aria-label": _this.props.identity.profile.firstName
      }), React.createElement(RightPanel, null, React.createElement(ProfileTypography, {
        variant: "h6"
      }, _this.props.identity.profile.firstName + ' ' + _this.props.identity.profile.lastName), React.createElement(ProfileTypography, {
        variant: "body2"
      }, _this.props.identity.profile.identifier))), React.createElement(Divider, null), React.createElement(CustomCardContent, null, _this.props.children), React.createElement(CardActions, null, React.createElement(Right, null, React.createElement(Tooltip, {
        title: _this.props.translate('Sign out')
      }, React.createElement(Button, {
        variant: "outlined",
        size: "small",
        color: "secondary",
        onClick: _this.onSignOut
      }, _this.props.translate('Sign out'))))));
    };

    return _this;
  }

  _createClass(ProfileCard, [{
    key: "render",
    value: function render() {
      var desktopDialog = React.createElement(Popover, {
        anchorEl: this.props.anchorEl,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        open: this.props.open,
        onClose: this.onClose
      }, this.renderContent());
      var mobileDialog = React.createElement(Dialog, {
        TransitionComponent: TransitionComponent,
        keepMounted: false,
        fullScreen: true,
        open: this.props.open,
        onClose: this.onClose,
        fullWidth: true,
        maxWidth: "sm"
      }, React.createElement(CustomCloseIconButton, {
        onClick: this.props.onClose,
        "aria-label": "Close"
      }, React.createElement(CloseIcon, null)), this.renderContent());
      return React.createElement(ScreenSize, null, function (_ref6) {
        var mobile = _ref6.mobile;
        return mobile ? mobileDialog : desktopDialog;
      });
    }
  }]);

  return ProfileCard;
}(React.PureComponent);

export { ProfileCard as default };
//# sourceMappingURL=ProfileCard.js.map