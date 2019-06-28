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
})(["width:400px;z-index:2;"]);

var CustomPaper = _styled(Paper).withConfig({
  displayName: "CustomPaper",
  componentId: "gm57fw-1"
})(["&&{height:100%;padding:50px;display:flex;align-items:center;justify-content:center;text-align:center;}"]);

var styles = {
  position: 'absolute',
  zIndex: '1',
  color: 'rgba(0, 0, 0, 0.1)',
  fontSize: '25em',
  transform: 'translate(-50 %, -50 %)',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
};
var styleButton = {
  color: 'rgb(36,160,237)'
};
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
      _this.props.onButtonClick(event, _this.props.data);
    };

    _this.goBack = function () {
      _this.props.goBack();
    };

    return _this;
  }

  _createClass(AccessDenied, [{
    key: "render",
    value: function render() {
      return React.createElement(CustomPaper, null, React.createElement(LockIcon, {
        style: styles
      }), React.createElement(CustomDiv, null, React.createElement(Typography, {
        variant: "h3"
      }, "Access Denied"), " ", React.createElement("br", null), React.createElement(Typography, {
        variant: "body1"
      }, "Ops! Ser ut som du ikke har tilgang her. Trykk p\xE5 knappen under, s\xE5 gir vi beskjed til en administrator at du \xF8snker tilgang til f\xF8lgene:"), React.createElement("ul", {
        style: {
          listStyle: 'none',
          padding: 0,
          fontWeight: 'bold'
        }
      }, this.props.data.modules.map(function (module) {
        return React.createElement("li", {
          key: module.id
        }, module.name, " ");
      })), React.createElement(Button, {
        size: "large",
        color: "primary",
        style: styleButton,
        onClick: this.onButtonClick
      }, "Click here"), React.createElement("br", null), React.createElement(Link, {
        onClick: this.goBack
      }, "Go back")));
    }
  }]);

  return AccessDenied;
}(React.PureComponent), _temp));
//# sourceMappingURL=AccessDenied.js.map