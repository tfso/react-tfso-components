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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import TfsoIcon from '../icons/Tfso';

var StyledAppBar = _styled(AppBar).withConfig({
  displayName: "StyledAppBar",
  componentId: "sc-1bk8ev5-0"
})(["&&{background:white;position:relative;}"]);

var Wrapper = _styled.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-1bk8ev5-1"
})(["display:flex;align-items:stretch;"]);

var Left = _styled.div.withConfig({
  displayName: "Left",
  componentId: "sc-1bk8ev5-2"
})(["&&{max-width:240px;flex:0 0 240px;background-color:", ";color:#fff;padding-left:10px;padding-right:10px;display:flex;align-items:center;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.tfso.colors.menu;
});

var LeftMobile = _styled(Left).withConfig({
  displayName: "LeftMobile",
  componentId: "sc-1bk8ev5-3"
})(["&&{flex:0 1 auto;}"]);

var Right = _styled.div.withConfig({
  displayName: "Right",
  componentId: "sc-1bk8ev5-4"
})(["&&{flex:1 1 auto;}"]);

var MenuButton = _styled(IconButton).withConfig({
  displayName: "MenuButton",
  componentId: "sc-1bk8ev5-5"
})(["&&{margin-left:-12px;margin-right:20px;}"]);

var ToolbarRight = _styled.div.withConfig({
  displayName: "ToolbarRight",
  componentId: "sc-1bk8ev5-6"
})(["&&{width:100%;display:flex;align-items:center;justify-content:flex-end;}"]);

var TopBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TopBar, _React$PureComponent);

  function TopBar() {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopBar).apply(this, arguments));
  }

  _createClass(TopBar, [{
    key: "render",
    value: function render() {
      var _this = this;

      var homeUrl = '/modules/dashboard/';
      return React.createElement(StyledAppBar, {
        position: "relative",
        color: "default",
        elevation: 1
      }, React.createElement(Wrapper, null, this.props.mobile ? React.createElement(LeftMobile, null, React.createElement(Link, {
        href: homeUrl,
        underline: "none"
      }, React.createElement(TfsoIcon, {
        color: "primary",
        fontSize: "large"
      }))) : React.createElement(Left, null, React.createElement(Link, {
        href: homeUrl,
        underline: "none"
      }, React.createElement(TfsoIcon, {
        color: "primary",
        fontSize: "large"
      })), React.createElement(Typography, {
        component: "h1",
        variant: "h6",
        color: "inherit",
        style: {
          paddingLeft: 7
        }
      }, React.createElement(Link, {
        href: homeUrl,
        underline: "none",
        color: "inherit"
      }, "24SevenOffice"))), React.createElement(Right, null, React.createElement(Toolbar, {
        variant: "dense"
      }, this.props.onMenuToggle && React.createElement(MenuButton, {
        color: "inherit",
        "aria-label": "Open drawer",
        onClick: function onClick(e) {
          return _this.props.onMenuToggle && _this.props.onMenuToggle();
        }
      }, React.createElement(MenuIcon, null)), React.createElement(ToolbarRight, null, this.props.children)))));
    }
  }]);

  return TopBar;
}(React.PureComponent);

export { TopBar as default };
export var TopMenuContent =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(TopMenuContent, _React$PureComponent2);

  function TopMenuContent() {
    _classCallCheck(this, TopMenuContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopMenuContent).apply(this, arguments));
  }

  _createClass(TopMenuContent, [{
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, this.props.children);
    }
  }]);

  return TopMenuContent;
}(React.PureComponent);
//# sourceMappingURL=Topbar.js.map