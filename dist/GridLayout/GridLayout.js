function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { autoBindHandlers, bottom, childrenEqual, compact, moveItem, synchronizeLayoutWithChildren } from './utils';
import GridItem from './GridItem';
import './styles.css';

var GridLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GridLayout, _React$PureComponent);

  function GridLayout(props, context) {
    var _this;

    _classCallCheck(this, GridLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GridLayout).call(this, props, context));
    _this.state = {
      activeDrag: null,
      layout: synchronizeLayoutWithChildren(_this.props.layout, _this.props.children, _this.props.cols),
      mounted: false,
      oldDragItem: null,
      oldLayout: null
    };
    autoBindHandlers(_assertThisInitialized(_this), ['onDragStart', 'onDrag', 'onDragStop']);
    return _this;
  }

  _createClass(GridLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      }); // Possibly call back with layout on mount. This should be done after correcting the layout width
      // to ensure we don't rerender with the wrong width.

      this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          layout = _this$props.layout,
          children = _this$props.children,
          cols = _this$props.cols;
      var newLayoutBase;

      if (!isEqual(prevProps.layout, layout)) {
        newLayoutBase = layout;
      } else if (!childrenEqual(prevProps.children, children)) {
        newLayoutBase = this.state.layout;
      }

      if (newLayoutBase !== undefined) {
        var newLayout = synchronizeLayoutWithChildren(newLayoutBase, children, cols);
        var oldLayout = this.state.layout;
        this.setState({
          layout: newLayout
        });
        this.onLayoutMaybeChanged(newLayout, oldLayout);
      }
    }
    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */

  }, {
    key: "containerHeight",
    value: function containerHeight() {
      var nbRow = bottom(this.state.layout);
      var containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
      return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + 'px';
    }
    /**
     * When dragging starts
     * @param {String} id Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: "onDragStart",
    value: function onDragStart(id) {
      var layout = this.state.layout;
      var layoutItem = layout[id];
      if (!layoutItem) return;
      this.setState({
        oldDragItem: _objectSpread({}, layoutItem),
        oldLayout: this.state.layout
      });
    }
    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} id Id of the child
     * @param {Number} col X position of the move
     * @param {Number} row Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: "onDrag",
    value: function onDrag(id, col, row) {
      var layout = this.state.layout;
      var cols = this.props.cols;
      var l = layout[id];
      if (!l) return; // Create placeholder (display only)

      var placeholder = {
        width: l.width,
        height: l.height,
        col: l.col,
        row: l.row,
        placeholder: true,
        id: id // Move the element to the dragged location.

      };
      layout = moveItem(id, layout, col, row, cols);
      this.setState({
        layout: compact(layout),
        activeDrag: placeholder
      });
    }
  }, {
    key: "onDragStop",
    value: function onDragStop(id, col, row) {
      var oldDragItem = this.state.oldDragItem;
      var layout = this.state.layout;
      var cols = this.props.cols;
      var l = layout[id];
      if (!l) return; // Move the element here

      layout = moveItem(id, layout, col, row, cols);
      var newLayout = compact(layout);
      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldDragItem: null,
        oldLayout: null
      });

      if (!isEqual(oldDragItem, l)) {
        this.props.onLayoutChange && this.props.onLayoutChange(newLayout);
      }
    }
  }, {
    key: "onLayoutMaybeChanged",
    value: function onLayoutMaybeChanged(newLayout, oldLayout) {
      if (!oldLayout) oldLayout = this.state.layout;

      if (!isEqual(oldLayout, newLayout)) {
        this.props.onLayoutChange && this.props.onLayoutChange(newLayout);
      }
    }
  }, {
    key: "calcColWidth",
    value: function calcColWidth() {
      var _this$props2 = this.props,
          margin = _this$props2.margin,
          containerPadding = _this$props2.containerPadding,
          cols = _this$props2.cols,
          width = _this$props2.width;
      return (width - margin[0] * (cols - 1) - (containerPadding && containerPadding[0] || 0) * 2) / cols;
    }
    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */

  }, {
    key: "placeholder",
    value: function placeholder() {
      var activeDrag = this.state.activeDrag;
      if (!activeDrag) return null;
      var _this$props3 = this.props,
          cols = _this$props3.cols,
          margin = _this$props3.margin,
          containerPadding = _this$props3.containerPadding,
          rowHeight = _this$props3.rowHeight; // {...this.state.activeDrag} is pretty slow, actually

      return React.createElement(GridItem, {
        width: activeDrag.width,
        height: activeDrag.height,
        col: activeDrag.col,
        row: activeDrag.row,
        id: activeDrag.id,
        className: "react-grid-placeholder",
        colWidth: this.calcColWidth(),
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        rowHeight: rowHeight,
        draggable: false
      }, React.createElement("div", null));
    }
    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */

  }, {
    key: "processGridItem",
    value: function processGridItem(child) {
      if (!child || !child.key) return;
      var l = this.state.layout[child.key];
      if (!l) return null;
      var _this$props4 = this.props,
          cols = _this$props4.cols,
          margin = _this$props4.margin,
          containerPadding = _this$props4.containerPadding,
          rowHeight = _this$props4.rowHeight,
          draggable = _this$props4.draggable;
      return React.createElement(GridItem, {
        colWidth: this.calcColWidth(),
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        rowHeight: rowHeight,
        onDragStop: this.onDragStop,
        onDragStart: this.onDragStart,
        onDrag: this.onDrag,
        draggable: !!draggable,
        width: l.width,
        height: l.height,
        col: l.col,
        row: l.row,
        id: l.id
      }, child);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          className = _this$props5.className,
          style = _this$props5.style;
      var mergedClassName = classNames('react-grid-layout', className);

      var mergedStyle = _objectSpread({
        height: this.containerHeight()
      }, style);

      return React.createElement("div", {
        className: mergedClassName,
        style: mergedStyle
      }, React.Children.map(this.props.children, function (child) {
        return _this2.processGridItem(child);
      }), this.placeholder());
    }
  }]);

  return GridLayout;
}(React.PureComponent);

GridLayout.displayName = 'GridLayout';
export { GridLayout as default };
//# sourceMappingURL=GridLayout.js.map