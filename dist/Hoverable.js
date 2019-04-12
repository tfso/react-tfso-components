function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';

var Hoverable =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Hoverable, _React$PureComponent);

  function Hoverable(props) {
    var _this;

    _classCallCheck(this, Hoverable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hoverable).call(this, props));
    _this.ref = void 0;

    _this.toggleHover = function () {
      _this.setState(function (state) {
        return {
          hover: !state.hover
        };
      });
    };

    _this.hoverOn = function () {
      return _this.setState({
        hover: true
      });
    };

    _this.hoverOff = function () {
      return _this.setState({
        hover: false
      });
    };

    _this.ref = React.createRef();
    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(Hoverable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          restProps = _objectWithoutProperties(_this$props, ["children"]);

      return React.createElement("div", Object.assign({
        ref: this.ref,
        onMouseEnter: this.hoverOn,
        onMouseLeave: this.hoverOff
      }, restProps), children(this.state.hover, this.ref));
    }
  }]);

  return Hoverable;
}(React.PureComponent);

export { Hoverable as default };
//# sourceMappingURL=Hoverable.js.map