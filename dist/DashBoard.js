import _styled from "styled-components";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';

var BackgroundPaper = function BackgroundPaper(_ref) {
  var background = _ref.background,
      props = _objectWithoutProperties(_ref, ["background"]);

  return React.createElement(Paper, props);
};

var WidgetContainer = _styled(BackgroundPaper).withConfig({
  displayName: "WidgetContainer",
  componentId: "sc-6cwxqm-0"
})(["&&{background:", ";width:100%;height:100%;}"], function (_ref2) {
  var background = _ref2.background;
  return background;
});

var Widget =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Widget, _React$PureComponent);

  function Widget() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Widget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Widget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      dragging: false,
      dragOver: false
    };

    _this.onDrop = function (e) {
      e.stopPropagation();
      e.preventDefault();

      try {
        var data = JSON.parse(e.dataTransfer.getData('text'));

        if (data.index !== _this.props.index) {
          _this.props.onOrder(_this.props.index, data.index);
        }
      } catch (err) {}

      _this.setState({
        dragOver: false
      });
    };

    _this.onDragStart = function (e) {
      var dragData = {
        index: _this.props.index
      };
      e.dataTransfer.setData('text', JSON.stringify(dragData));

      _this.setState({
        dragging: true
      });
    };

    _this.onDragEnd = function (e) {
      _this.setState({
        dragging: false
      });
    };

    _this.onDragEnter = function (e) {
      _this.setState({
        dragOver: true
      });
    };

    _this.onDragOver = function (e) {
      e.preventDefault();
    };

    _this.onDragLeave = function (e) {
      _this.setState({
        dragOver: false
      });
    };

    return _this;
  }

  _createClass(Widget, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          background = _this$props.background;
      return React.createElement(WidgetContainer, {
        background: background || 'inherit',
        elevation: 0,
        style: {
          // TODO: other design??
          border: this.state.dragOver ? '2px dashed #333' : 'unset'
        },
        draggable: true,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd,
        onDragEnter: this.onDragEnter,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop
      }, children);
    }
  }]);

  return Widget;
}(React.PureComponent);

Widget.defaultProps = {
  background: 'inherit'
};
var sizeMap = {
  small: {
    cols: 1,
    rows: 0.5
  },
  medium: {
    cols: 2,
    rows: 1
  },
  large: {
    cols: 4,
    rows: 2
  }
};

var DashBoard =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(DashBoard, _React$PureComponent2);

  function DashBoard() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, DashBoard);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DashBoard)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _this2.onOrderArray = function (target, source) {
      var widgets = _toConsumableArray(_this2.props.widgets);

      widgets.splice(target, 0, widgets.splice(source, 1)[0]);

      _this2.props.onChangeOrder(widgets);
    };

    return _this2;
  }

  _createClass(DashBoard, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(GridList, {
        spacing: this.props.spacing,
        cols: 4,
        cellHeight: 250,
        style: {
          width: '100%'
        }
      }, this.props.widgets.map(function (_ref3, i) {
        var size = _ref3.size,
            widget = _objectWithoutProperties(_ref3, ["size"]);

        return React.createElement(GridListTile, Object.assign({
          key: i
        }, sizeMap[size]), React.createElement(Widget, Object.assign({}, widget, {
          index: i,
          onOrder: _this3.onOrderArray
        })));
      }));
    }
  }]);

  return DashBoard;
}(React.PureComponent);

DashBoard.defaultProps = {
  spacing: 16
};
export { DashBoard as default };
//# sourceMappingURL=DashBoard.js.map