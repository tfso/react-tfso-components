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
import { DraggableCore } from 'react-draggable';
import { setTransform } from './utils';
import classNames from 'classnames';

/**
 * An individual item within a ReactGridLayout.
 */
var GridItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridItem, _React$Component);

  function GridItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GridItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GridItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      dragging: null
      /**
       * Return position on the page given an x, y, w, h.
       * left, top, width, height are all in pixels.
       * @param  {Number}  col             X coordinate in grid units.
       * @param  {Number}  row             Y coordinate in grid units.
       * @param  {Number}  width             W coordinate in grid units.
       * @param  {Number}  height             H coordinate in grid units.
       * @return {Object}                Object containing coords.
       */

    };
    return _this;
  }

  _createClass(GridItem, [{
    key: "calcPosition",
    value: function calcPosition(col, row, width, height, state) {
      var _this$props = this.props,
          margin = _this$props.margin,
          containerPadding = _this$props.containerPadding,
          rowHeight = _this$props.rowHeight,
          colWidth = _this$props.colWidth;
      var out = {
        left: Math.round((colWidth + margin[0]) * col + containerPadding[0]),
        top: Math.round((rowHeight + margin[1]) * row + containerPadding[1]),
        // 0 * Infinity === NaN, which causes problems with resize constraints;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: width === Infinity ? width : Math.round(colWidth * width + Math.max(0, width - 1) * margin[0]),
        height: height === Infinity ? height : Math.round(rowHeight * height + Math.max(0, height - 1) * margin[1])
      };

      if (state && state.dragging) {
        out.top = Math.round(state.dragging.top);
        out.left = Math.round(state.dragging.left);
      }

      return out;
    }
    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */

  }, {
    key: "calcXY",
    value: function calcXY(top, left) {
      var _this$props2 = this.props,
          margin = _this$props2.margin,
          cols = _this$props2.cols,
          rowHeight = _this$props2.rowHeight,
          w = _this$props2.width,
          colWidth = _this$props2.colWidth;
      var x = Math.round((left - margin[0]) / (colWidth + margin[0]));
      var y = Math.round((top - margin[1]) / (rowHeight + margin[1])); // Capping

      x = Math.max(Math.min(x, cols - w), 0);
      y = Math.max(y, 0);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "mixinDraggable",
    value: function mixinDraggable(child) {
      return React.createElement(DraggableCore, {
        onStart: this.onDragHandler('onDragStart'),
        onDrag: this.onDragHandler('onDrag'),
        onStop: this.onDragHandler('onDragStop'),
        cancel: "",
        handle: ""
      }, child);
    }
  }, {
    key: "onDragHandler",
    value: function onDragHandler(handlerName) {
      var _this2 = this;

      return function (e, _ref) {
        var node = _ref.node,
            deltaX = _ref.deltaX,
            deltaY = _ref.deltaY;
        var handler = _this2.props[handlerName];
        if (!handler) return;
        var newPosition = {
          top: 0,
          left: 0 // Get new XY

        };

        switch (handlerName) {
          case 'onDragStart':
            {
              // TODO: this wont work on nested parents
              var offsetParent = node.offsetParent;
              if (!offsetParent) return;
              var parentRect = offsetParent.getBoundingClientRect();
              var clientRect = node.getBoundingClientRect();
              newPosition.left = clientRect.left - parentRect.left + offsetParent.scrollLeft;
              newPosition.top = clientRect.top - parentRect.top + offsetParent.scrollTop;

              _this2.setState({
                dragging: newPosition
              });

              break;
            }

          case 'onDrag':
            if (!_this2.state.dragging) {
              throw new Error('onDrag called before onDragStart.');
            }

            newPosition.left = _this2.state.dragging.left + deltaX;
            newPosition.top = _this2.state.dragging.top + deltaY;

            _this2.setState({
              dragging: newPosition
            });

            break;

          case 'onDragStop':
            if (!_this2.state.dragging) {
              throw new Error('onDragEnd called before onDragStart.');
            }

            newPosition.left = _this2.state.dragging.left;
            newPosition.top = _this2.state.dragging.top;

            _this2.setState({
              dragging: null
            });

            break;

          default:
            throw new Error('onDragHandler called with unrecognized handlerName: ' + handlerName);
        }

        var _this2$calcXY = _this2.calcXY(newPosition.top, newPosition.left),
            x = _this2$calcXY.x,
            y = _this2$calcXY.y;

        return handler.call(_this2, _this2.props.id, x, y, {
          e: e,
          node: node,
          newPosition: newPosition
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          col = _this$props3.col,
          row = _this$props3.row,
          width = _this$props3.width,
          height = _this$props3.height,
          draggable = _this$props3.draggable;
      var pos = this.calcPosition(col, row, width, height, this.state);
      var child = React.Children.only(this.props.children); // Create the child element. We clone the existing element but modify its className and style.

      var newChild = React.cloneElement(child, {
        className: classNames('react-grid-item', child.props.className, this.props.className, {
          static: false,
          cssTransforms: true,
          'react-draggable': draggable,
          'react-draggable-dragging': Boolean(this.state.dragging)
        }),
        // We can set the width and height on the child, but unfortunately we can't set the position.
        style: _objectSpread({}, this.props.style, child.props.style, setTransform(pos))
      });

      if (draggable) {
        return this.mixinDraggable(newChild);
      }

      return newChild;
    }
  }]);

  return GridItem;
}(React.Component);

GridItem.defaultProps = {
  className: ''
};
export { GridItem as default };
//# sourceMappingURL=GridItem.js.map