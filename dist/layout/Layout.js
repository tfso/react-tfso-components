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
import { TopBar } from './Topbar';
import DocumentTitle from './DocumentTitle'; // Wrap everything

export var LayoutWrapper = _styled.div.withConfig({
  displayName: "LayoutWrapper",
  componentId: "k8yl19-0"
})(["height:100%;display:flex;flex-direction:column;"]); // Put topbar in here

export var LayoutHeader = _styled.div.withConfig({
  displayName: "LayoutHeader",
  componentId: "k8yl19-1"
})([""]); // Put everything below topbar here

export var LayoutBody = _styled.div.withConfig({
  displayName: "LayoutBody",
  componentId: "k8yl19-2"
})(["flex:1;min-height:0;display:flex;"]); // Put menu here

export var LayoutBodyLeft = _styled.div.withConfig({
  displayName: "LayoutBodyLeft",
  componentId: "k8yl19-3"
})([""]); // Put your app here

export var LayoutBodyRight = _styled.div.withConfig({
  displayName: "LayoutBodyRight",
  componentId: "k8yl19-4"
})(["flex:1;min-height:0;padding:15px;overflow-y:auto;"]);
export var Layout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Layout, _React$PureComponent);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, _getPrototypeOf(Layout).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      return React.createElement(LayoutWrapper, null, React.createElement(DocumentTitle, {
        text: this.props.docTitle
      }), React.createElement(LayoutHeader, null, React.createElement(TopBar, {
        title: this.props.title,
        onMenuToggle: this.props.onMenuToggle,
        mobileMenu: this.props.mobileMenu
      }, this.props.topMenu)), React.createElement(LayoutBody, null, React.createElement(LayoutBodyLeft, null, this.props.menu), React.createElement(LayoutBodyRight, null, this.props.children)));
    }
  }]);

  return Layout;
}(React.PureComponent);
export var LayoutNoMenu =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(LayoutNoMenu, _React$PureComponent2);

  function LayoutNoMenu() {
    _classCallCheck(this, LayoutNoMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(LayoutNoMenu).apply(this, arguments));
  }

  _createClass(LayoutNoMenu, [{
    key: "render",
    value: function render() {
      return React.createElement(LayoutWrapper, null, React.createElement(DocumentTitle, {
        text: this.props.docTitle
      }), React.createElement(LayoutHeader, null, React.createElement(TopBar, {
        title: this.props.title,
        onMenuToggle: null,
        mobileMenu: this.props.mobileMenu
      }, this.props.topMenu)), React.createElement(LayoutBody, null, React.createElement(LayoutBodyRight, null, this.props.children)));
    }
  }]);

  return LayoutNoMenu;
}(React.PureComponent);
//# sourceMappingURL=Layout.js.map