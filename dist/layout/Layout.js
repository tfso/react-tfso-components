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
import TopBar from './Topbar';
import DocumentTitle from './DocumentTitle';
import Menu from './Menu';
import { withScreenSize } from '../ScreenSize'; // Wrap everything

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
export default withScreenSize((_temp =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Layout, _React$PureComponent);

  function Layout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Layout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Layout)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      menuOpen: null
    };

    _this.onCloseMenu = function () {
      return _this.setState({
        menuOpen: false
      });
    };

    _this.onMenuToggle = function () {
      return _this.setState(function (state) {
        return {
          menuOpen: !_this.menuIsOpen()
        };
      });
    };

    _this.onClickContent = function () {
      if (_this.props.screenSize.mobile && _this.menuIsOpen()) {
        _this.onCloseMenu();
      }
    };

    return _this;
  }

  _createClass(Layout, [{
    key: "menuIsOpen",
    value: function menuIsOpen() {
      if (this.state.menuOpen === null) {
        return !this.props.screenSize.mobile;
      }

      return this.state.menuOpen;
    }
  }, {
    key: "render",
    value: function render() {
      var hasMenu = !!this.props.menuContent;
      return React.createElement(LayoutWrapper, null, React.createElement(DocumentTitle, {
        text: this.props.docTitle + ' - 24SevenOffice'
      }), React.createElement(LayoutHeader, null, React.createElement(TopBar, {
        onMenuToggle: hasMenu ? this.onMenuToggle : undefined,
        mobile: this.props.screenSize.mobile
      }, this.props.topMenuContent)), React.createElement(LayoutBody, null, hasMenu && React.createElement(LayoutBodyLeft, {
        onClick: this.onClickContent
      }, React.createElement(Menu, {
        mobile: this.props.screenSize.mobile,
        open: this.menuIsOpen(),
        onClose: this.onCloseMenu
      }, this.props.menuContent)), React.createElement(LayoutBodyRight, null, this.props.children)));
    }
  }]);

  return Layout;
}(React.PureComponent), _temp));
//# sourceMappingURL=Layout.js.map