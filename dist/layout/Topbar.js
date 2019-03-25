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
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

var Root = _styled.div.withConfig({
  displayName: "Root",
  componentId: "sc-1bk8ev5-0"
})(["width:100%;"]);

var StyledAppBar = _styled(AppBar).withConfig({
  displayName: "StyledAppBar",
  componentId: "sc-1bk8ev5-1"
})(["&&{background:white;box-shadow:none;z-index:", ";}"], function (props) {
  return props.theme.mui.zIndex.drawer + 1;
});

var Grow = _styled.div.withConfig({
  displayName: "Grow",
  componentId: "sc-1bk8ev5-2"
})(["flex-grow:1;"]);

var MenuButton = _styled(IconButton).withConfig({
  displayName: "MenuButton",
  componentId: "sc-1bk8ev5-3"
})(["&&{margin-left:-12px;margin-right:20px;}"]);

var Title = _styled(Typography).withConfig({
  displayName: "Title",
  componentId: "sc-1bk8ev5-4"
})(["&&{display:none;", "{display:block;}}"], function (_ref) {
  var theme = _ref.theme;
  return theme.mui.breakpoints.up('sm');
});

var SectionDesktop = _styled.div.withConfig({
  displayName: "SectionDesktop",
  componentId: "sc-1bk8ev5-5"
})(["&&{display:none;", "{display:flex;align-items:center;}}"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.mui.breakpoints.up('md');
});

var SectionMobile = _styled.div.withConfig({
  displayName: "SectionMobile",
  componentId: "sc-1bk8ev5-6"
})(["&&{display:flex;", "{display:none;}}"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.mui.breakpoints.up('md');
});

export var TopBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TopBar, _React$PureComponent);

  function TopBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TopBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TopBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      mobileMoreAnchorEl: null
    };

    _this.handleMobileMenuOpen = function (event) {
      _this.setState({
        mobileMoreAnchorEl: event.currentTarget
      });
    };

    _this.handleMobileMenuClose = function () {
      _this.setState({
        mobileMoreAnchorEl: null
      });
    };

    return _this;
  }

  _createClass(TopBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var mobileMoreAnchorEl = this.state.mobileMoreAnchorEl;
      var isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
      return React.createElement(Root, null, React.createElement(StyledAppBar, {
        position: "static",
        color: "default"
      }, React.createElement(Toolbar, null, this.props.onMenuToggle !== null && React.createElement(MenuButton, {
        color: "inherit",
        "aria-label": "Open drawer",
        onClick: function onClick(e) {
          return _this2.props.onMenuToggle && _this2.props.onMenuToggle();
        }
      }, React.createElement(MenuIcon, null)), React.createElement(Title, {
        variant: "h6",
        color: "inherit",
        noWrap: true
      }, this.props.title), React.createElement(Grow, null), React.createElement(SectionDesktop, null, this.props.children), React.createElement(SectionMobile, null, React.createElement(IconButton, {
        "aria-haspopup": "true",
        onClick: this.handleMobileMenuOpen,
        color: "inherit"
      }, React.createElement(MoreIcon, null))))), React.createElement(Menu, {
        anchorEl: mobileMoreAnchorEl,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        open: isMobileMenuOpen,
        onClose: this.handleMobileMenuClose
      }, this.props.mobileMenu));
    }
  }]);

  return TopBar;
}(React.PureComponent);
//# sourceMappingURL=Topbar.js.map