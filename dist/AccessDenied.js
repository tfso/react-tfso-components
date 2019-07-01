import _styled from "styled-components";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withScreenSize } from './ScreenSize';
import Typography from '@material-ui/core/Typography';

var CustomDiv = _styled.div.withConfig({
  displayName: "CustomDiv",
  componentId: "gm57fw-0"
})(["width:400px;"]);

var CustomPaper = _styled(Paper).withConfig({
  displayName: "CustomPaper",
  componentId: "gm57fw-1"
})(["&&{width:100%;height:100%;padding:50px;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;}"]);

var CustomLockIcon = _styled(LockIcon).withConfig({
  displayName: "CustomLockIcon",
  componentId: "gm57fw-2"
})([" &&{position:absolute;color:rgba(0,0,0,0.1);font-size:25em;transform:translate(-50 %,-50 %);display:flex;flex-wrap:wrap;align-items:center;}"]);

var RequestButton = _styled(Button).withConfig({
  displayName: "RequestButton",
  componentId: "gm57fw-3"
})(["&&{margin:10px;}"]);

var List = _styled.ul.withConfig({
  displayName: "List",
  componentId: "gm57fw-4"
})(["list-style:none;padding:0;font-weight:bold;"]);

export default withScreenSize((_temp =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AccessDenied, _React$PureComponent);

  function AccessDenied() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AccessDenied);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccessDenied)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onButtonClick = function (event) {
      _this.props.onButtonClick(event, _this.props.modules);
    };

    _this.goBack = function () {
      _this.props.goBack();
    };

    return _this;
  }

  _createClass(AccessDenied, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          translate = _this$props.translate,
          modules = _this$props.modules;
      var desktopView = React.createElement(CustomPaper, null, React.createElement(CustomLockIcon, null), React.createElement(CustomDiv, null, React.createElement(Typography, {
        variant: "h3"
      }, translate('Access Denied')), " ", React.createElement("br", null), React.createElement(Typography, {
        variant: "body1"
      }, translate('accessdenieddescription')), React.createElement(List, null, modules.map(function (module) {
        return React.createElement("li", {
          key: module.id
        }, translate(module.name), " ");
      })), React.createElement(RequestButton, {
        size: "large",
        color: "primary",
        variant: "contained",
        onClick: this.onButtonClick
      }, translate('Request access')), React.createElement("br", null), React.createElement(Link, {
        onClick: this.goBack
      }, translate('Go back'))));
      var mobileView = React.createElement(CustomPaper, null, React.createElement(CustomLockIcon, null), React.createElement("div", null, React.createElement(Typography, {
        variant: "h3"
      }, translate('Access Denied')), " ", React.createElement("br", null), React.createElement(Typography, {
        variant: "body1"
      }, translate('accessdenieddescription')), React.createElement(List, null, modules.map(function (module) {
        return React.createElement("li", {
          key: module.id
        }, translate(module.name), " ");
      })), React.createElement(RequestButton, {
        size: "large",
        color: "primary",
        variant: "contained",
        onClick: this.onButtonClick
      }, translate('Request access')), React.createElement("br", null), React.createElement(Link, {
        onClick: this.goBack
      }, translate('Go back'))));
      var mobile = this.props.screenSize.mobile;
      return mobile ? mobileView : desktopView;
    }
  }]);

  return AccessDenied;
}(React.PureComponent), _temp));
//# sourceMappingURL=AccessDenied.js.map