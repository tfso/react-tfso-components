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
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';

var StyledDrawer = _styled(Drawer).attrs({
  classes: {
    paper: 'MuiPaperStyle'
  }
}).withConfig({
  displayName: "StyledDrawer",
  componentId: "sc-1ryjcne-0"
})(["&&{width:", "px;transition:none;transform:none;white-space:nowrap;display:flex;overflow-x:hidden;background-color:#CCC;border:none;}.MuiPaperStyle{width:", "px;transition:none;transform:none;position:static;overflow-x:hidden;background-color:", ";border:none;}"], function (props) {
  return props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1;
}, function (props) {
  return props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1;
}, function (props) {
  return props.theme.tfso.colors.baseLight5Color;
});

export var Menu =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Menu, _React$PureComponent);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      return React.createElement(StyledDrawer, {
        variant: "permanent",
        open: this.props.open
      }, React.createElement(List, null, this.props.children));
    }
  }]);

  return Menu;
}(React.PureComponent);
//# sourceMappingURL=Menu.js.map