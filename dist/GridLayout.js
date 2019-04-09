import _styled from "styled-components";

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
import Paper from '@material-ui/core/Paper';
import ReactGridLayout from 'react-grid-layout/';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { styledTheme } from './theme';
import isEqual from 'lodash/isEqual';

var BackgroundPaper = function BackgroundPaper(_ref) {
  var backgroundColor = _ref.backgroundColor,
      props = _objectWithoutProperties(_ref, ["backgroundColor"]);

  return React.createElement(Paper, props);
};

var GridItemContainer = _styled(BackgroundPaper).withConfig({
  displayName: "GridItemContainer",
  componentId: "pvve1h-0"
})(["&&{background-color:", ";width:100%;height:100%;}"], function (_ref2) {
  var backgroundColor = _ref2.backgroundColor;
  return backgroundColor;
});

var gridItemWidthNumberMap = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  'onequarter': 3,
  'onethird': 4,
  'half': 6,
  'twothirds': 8,
  'threequarters': 9,
  'full': 12
};
var numberGridItemWithMap = {
  1: 1,
  2: 2,
  3: 'onequarter',
  4: 'onethird',
  5: 5,
  6: 'half',
  7: 7,
  8: 'twothirds',
  9: 'threequarters',
  10: 10,
  11: 11,
  12: 'full'
};

var toGridItemWidth = function toGridItemWidth(w) {
  return w === undefined ? undefined : numberGridItemWithMap[Math.min(6, Math.trunc(w))];
};

var toGridItemHeight = function toGridItemHeight(w) {
  return w === undefined ? undefined : Math.min(12, Math.trunc(w));
};

var gridItemPositionToLayout = function gridItemPositionToLayout(position) {
  return {
    i: position.id,
    x: position.col,
    y: position.row,
    h: position.height,
    w: gridItemWidthNumberMap[position.width],
    minH: position.minHeight,
    minW: position.minWidth && gridItemWidthNumberMap[position.minWidth] || undefined,
    maxH: position.maxHeight,
    maxW: position.maxWidth && gridItemWidthNumberMap[position.maxWidth] || undefined,
    isDraggable: position.draggable !== undefined ? position.draggable : false,
    isResizable: position.resizable !== undefined ? position.resizable : false,
    static: position.static
  };
};

var layoutToGridItemPosition = function layoutToGridItemPosition(layout) {
  return {
    id: layout.i,
    col: layout.x,
    row: layout.y,
    width: toGridItemWidth(layout.w),
    height: toGridItemHeight(layout.h),
    minHeight: toGridItemHeight(layout.minH),
    minWidth: toGridItemWidth(layout.minW),
    maxHeight: toGridItemHeight(layout.maxH),
    maxWidth: toGridItemWidth(layout.maxW),
    draggable: layout.isDraggable,
    resizable: layout.isResizable,
    static: layout.static
  };
};

var GridLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GridLayout, _React$PureComponent);

  function GridLayout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GridLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GridLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._layoutWasChangedWorkaround = false;

    _this.onLayoutChange = function (layouts) {
      var onLayoutChange = _this.props.onLayoutChange;
      onLayoutChange && _this._layoutWasChangedWorkaround && onLayoutChange(layouts.map(layoutToGridItemPosition));
      _this._layoutWasChangedWorkaround = false;
    };

    _this.validateItemLayout = function () {
      if (process.env.NODE_ENV === 'production') return;
      var items = new Set(_this.props.items.map(function (item) {
        return item.id;
      }));
      var layouts = new Set(_this.props.layout.map(function (layout) {
        return layout.id;
      }));
      items.forEach(function (item) {
        if (!layouts.has(item)) {
          console.error("Error: Item with id: ".concat(item, " is missing layout"));
        }
      });
      layouts.forEach(function (layout) {
        if (!items.has(layout)) {
          console.warn("Warning: Layout with id: ".concat(layout, " does not correspond to any item"));
        }
      });
    };

    _this.onResize = function (layout, oldItem, newItem, placeHolder) {
      newItem.h = placeHolder.h = Math.min(6, newItem.h);
    };

    _this.onDragStop = function (layout, oldItem, newItem, placeHolder) {
      _this._layoutWasChangedWorkaround = !isEqual(oldItem, newItem);
    };

    _this.onResizeStop = function (layout, oldItem, newItem, placeHolder) {
      _this._layoutWasChangedWorkaround = !isEqual(oldItem, newItem);
    };

    return _this;
  }

  _createClass(GridLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.validateItemLayout();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          layout = _this$props.layout,
          _this$props$margin = _this$props.margin,
          margin = _this$props$margin === void 0 ? 16 : _this$props$margin,
          onLayoutChange = _this$props.onLayoutChange,
          other = _objectWithoutProperties(_this$props, ["items", "layout", "margin", "onLayoutChange"]);

      var rglLayout = Object.values(layout).map(gridItemPositionToLayout);
      return React.createElement(ReactGridLayout, Object.assign({}, other, {
        className: "layout",
        cols: 12,
        layout: rglLayout,
        margin: [margin, margin],
        rowHeight: 90,
        width: styledTheme.mui.breakpoints.values.lg,
        onLayoutChange: this.onLayoutChange,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        onDragStop: this.onDragStop
      }), items.map(function (_ref3) {
        var id = _ref3.id,
            backgroundColor = _ref3.backgroundColor,
            children = _ref3.children;
        return React.createElement(GridItemContainer, {
          key: id,
          backgroundColor: backgroundColor || 'inherit'
        }, children);
      }));
    }
  }]);

  return GridLayout;
}(React.PureComponent);

GridLayout.defaultProps = {
  margin: 16,
  compactType: 'vertical'
};
export { GridLayout as default };
//# sourceMappingURL=GridLayout.js.map