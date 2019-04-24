function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';

var throttle = function throttle(fn) {
  var running = false;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!running) {
      // TODO: Use timeout if RAF is unavailable
      window.requestAnimationFrame(function () {
        fn(args);
        running = false;
      });
      running = true;
    }
  };
};

var InfiniteScroll =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(InfiniteScroll, _React$PureComponent);

  function InfiniteScroll() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InfiniteScroll);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InfiniteScroll)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._reachedTreshold = true;
    _this._lastScrollTop = 0;
    _this._ref = React.createRef();
    _this.onScroll = throttle(function () {
      var node = _this._ref.current;

      if (!node) {
        return;
      }

      var clientHeight = node.clientHeight,
          scrollTop = node.scrollTop,
          scrollHeight = node.scrollHeight;

      if (clientHeight >= scrollHeight) {
        return;
      }

      var _this$props = _this.props,
          _this$props$threshold = _this$props.threshold,
          threshold = _this$props$threshold === void 0 ? 0.1 : _this$props$threshold,
          onReachEnd = _this$props.onReachEnd,
          onReachTreshold = _this$props.onReachTreshold;
      var thresholdPoint = scrollHeight - clientHeight * threshold;
      var thresholdReachable = clientHeight < thresholdPoint;
      var end = clientHeight + scrollTop;
      var reachedTreshold = end >= thresholdPoint;
      var reachedEnd = end === scrollHeight;

      if (scrollTop <= _this._lastScrollTop) {
        // Scrolling up
        _this._lastScrollTop = scrollTop;
        _this._reachedTreshold = reachedTreshold;
        return;
      }

      _this._lastScrollTop = scrollTop; // Reaching the treshold can occur multiple times, handle differently

      if (reachedTreshold) {
        if (!_this._reachedTreshold || !thresholdReachable && reachedEnd) {
          onReachTreshold && onReachTreshold();
          console.log('onReachThreshold');
        }

        _this._reachedTreshold = true;
      } else if (_this._reachedTreshold) {
        _this._reachedTreshold = false;
      } // Reaching the end can only occur once


      if (reachedEnd) {
        onReachEnd && onReachEnd();
        console.log('onReachEnd');
      }
    });
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          height: this.props.height || 'calc(100%)',
          width: '100%',
          overflowY: 'auto'
        },
        ref: this._ref,
        onScroll: this.onScroll
      }, this.props.children);
    }
  }]);

  return InfiniteScroll;
}(React.PureComponent);

InfiniteScroll.defaultProps = {
  treshold: 0.1,
  height: 'calc(100%)'
};
export { InfiniteScroll as default };
//# sourceMappingURL=InfiniteScroll.js.map