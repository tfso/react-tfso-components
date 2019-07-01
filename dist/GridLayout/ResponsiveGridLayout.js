function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import isEqual from 'lodash/isEqual';
import { synchronizeLayoutWithChildren } from './utils';
import { getBreakpointFromWidth, getColsFromBreakpoint, findOrGenerateResponsiveLayout } from './responsiveUtils';
import GridLayout from './GridLayout';

var ResponsiveGridLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ResponsiveGridLayout, _React$PureComponent);

  function ResponsiveGridLayout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResponsiveGridLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResponsiveGridLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = _this.generateInitialState();

    _this.onLayoutChange = function (layout) {
      _this.props.onLayoutChange && _this.props.onLayoutChange(layout, _this.state.breakpoint, _objectSpread({}, _this.props.layouts, _defineProperty({}, _this.state.breakpoint, layout)));
    };

    return _this;
  }

  _createClass(ResponsiveGridLayout, [{
    key: "generateInitialState",
    value: function generateInitialState() {
      var _this$props = this.props,
          width = _this$props.width,
          breakpoints = _this$props.breakpoints,
          layouts = _this$props.layouts,
          cols = _this$props.cols;
      var breakpoint = getBreakpointFromWidth(breakpoints, width);
      var colNo = getColsFromBreakpoint(breakpoint, cols); // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
      // for this layout.

      var initialLayout = findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, breakpoint, colNo);
      return {
        layout: initialLayout,
        breakpoint: breakpoint,
        cols: colNo
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          width = _this$props2.width,
          breakpoint = _this$props2.breakpoint,
          breakpoints = _this$props2.breakpoints,
          cols = _this$props2.cols,
          layouts = _this$props2.layouts;

      if (prevProps.width !== width || prevProps.breakpoint !== breakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols) {
        this.onWidthChange(prevProps);
      } else if (!isEqual(prevProps.layouts, layouts)) {
        var _this$state = this.state,
            _breakpoint = _this$state.breakpoint,
            _cols = _this$state.cols;
        var newLayout = findOrGenerateResponsiveLayout(layouts, breakpoints, _breakpoint, _breakpoint, _cols);
        this.setState({
          layout: newLayout
        });
      }
    }
  }, {
    key: "onWidthChange",
    value: function onWidthChange(prevProps) {
      var _this$props3 = this.props,
          children = _this$props3.children,
          breakpoint = _this$props3.breakpoint,
          breakpoints = _this$props3.breakpoints,
          margin = _this$props3.margin,
          containerPadding = _this$props3.containerPadding,
          width = _this$props3.width,
          cols = _this$props3.cols,
          onLayoutChange = _this$props3.onLayoutChange,
          onBreakpointChange = _this$props3.onBreakpointChange,
          onWidthChangeCallback = _this$props3.onWidthChange;

      var layouts = _objectSpread({}, this.props.layouts);

      var newBreakpoint = breakpoint || getBreakpointFromWidth(breakpoints, width);
      var lastBreakpoint = this.state.breakpoint;
      var newCols = getColsFromBreakpoint(newBreakpoint, cols);

      if (lastBreakpoint !== newBreakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols) {
        if (!(lastBreakpoint in layouts)) {
          layouts[lastBreakpoint] = this.state.layout;
        }

        var newLayout = synchronizeLayoutWithChildren(findOrGenerateResponsiveLayout(layouts, breakpoints, newBreakpoint, lastBreakpoint, newCols), children, newCols);
        layouts[newBreakpoint] = newLayout;
        onLayoutChange && onLayoutChange(newLayout, newBreakpoint, layouts);
        onBreakpointChange && onBreakpointChange(newBreakpoint, newCols);
        this.setState({
          breakpoint: newBreakpoint,
          layout: newLayout,
          cols: newCols
        });
      }

      onWidthChangeCallback && onWidthChangeCallback(width, margin, newCols, containerPadding);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          breakpoint = _this$props4.breakpoint,
          breakpoints = _this$props4.breakpoints,
          cols = _this$props4.cols,
          layouts = _this$props4.layouts,
          onBreakpointChange = _this$props4.onBreakpointChange,
          onLayoutChange = _this$props4.onLayoutChange,
          onWidthChange = _this$props4.onWidthChange,
          other = _objectWithoutProperties(_this$props4, ["breakpoint", "breakpoints", "cols", "layouts", "onBreakpointChange", "onLayoutChange", "onWidthChange"]);

      return React.createElement(GridLayout, Object.assign({}, other, {
        onLayoutChange: this.onLayoutChange,
        layout: this.state.layout,
        cols: this.state.cols
      }));
    }
  }]);

  return ResponsiveGridLayout;
}(React.PureComponent);

export { ResponsiveGridLayout as default };
//# sourceMappingURL=ResponsiveGridLayout.js.map