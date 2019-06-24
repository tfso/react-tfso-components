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
import Emoji from './Emoji';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

var CustomPaper = _styled(Paper).withConfig({
  displayName: "CustomPaper",
  componentId: "gm57fw-0"
})([" &&{display:flex;flex-direction:column;align-items:center;justify-content:center;width:20%;height:100%;}"]);

var AccessDenied =
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
      _this.props.onButtonClick(event, _this.props.data);
    };

    return _this;
  }

  _createClass(AccessDenied, [{
    key: "render",
    value: function render() {
      return React.createElement(CustomPaper, null, React.createElement("h3", null, "Access denied to:"), React.createElement(Typography, {
        variant: "h2"
      }, React.createElement(Emoji, {
        variant: 'warning'
      })), React.createElement("ul", null, this.props.data.modules.map(function (module) {
        return React.createElement("li", {
          key: module.id
        }, module.name);
      })), this.props.showButton && React.createElement(Button, {
        onClick: this.onButtonClick
      }, "Click here"));
    }
  }]);

  return AccessDenied;
}(React.PureComponent);

export { AccessDenied as default };
//# sourceMappingURL=AccessDenied.js.map