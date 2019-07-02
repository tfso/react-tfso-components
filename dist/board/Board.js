function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import BoardContainer from './BoardContainer';
import { calculateBoardHeight, calculateBoardRows, calculateItemDimensions, calculateItemLayout, compact, moveItem } from './utils';
import BoardItemContainer from './BoardItemContainer';
import { useWidth } from './useWidth';
import useScreenType from './useScreenType';
import { DraggableCore } from 'react-draggable';
import BoardItemPlaceholder from './BoardItemPlaceholder';
import isEqual from 'lodash/isEqual';
var columns = 12;

var useHeight = function useHeight(_ref, screenType) {
  var items = _ref.items,
      _ref$spacing = _ref.spacing,
      spacing = _ref$spacing === void 0 ? 0 : _ref$spacing,
      rowHeight = _ref.rowHeight;
  var bottomRow = React.useMemo(function () {
    return calculateBoardRows(items, screenType);
  }, [items, screenType]);
  var height = React.useMemo(function () {
    return calculateBoardHeight(bottomRow, spacing, rowHeight);
  }, [bottomRow, spacing, rowHeight]);
  return height;
};

var Board = function Board(props) {
  var _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 0 : _props$spacing,
      rowHeight = props.rowHeight,
      locked = props.locked,
      onChange = props.onChange;
  var rootRef = React.useRef(null); // State

  var _React$useState = React.useState(props.items),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      items = _React$useState2[0],
      setItems = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeDrag = _React$useState4[0],
      setActiveDragItem = _React$useState4[1];

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      oldDragItem = _React$useState6[0],
      setOldDragItem = _React$useState6[1];

  var _React$useState7 = React.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      placeholder = _React$useState8[0],
      setPlaceholder = _React$useState8[1];

  var _React$useState9 = React.useState(1920),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      width = _React$useState10[0],
      setWidth = _React$useState10[1]; // Component received new Items


  React.useEffect(function () {
    setItems(props.items);
  }, [props.items]); // Board dimensions

  useWidth(rootRef, function (width) {
    return setWidth(width);
  });
  var screenType = useScreenType(width);
  var height = useHeight({
    items: items,
    spacing: props.spacing,
    rowHeight: props.rowHeight
  }, screenType);
  var colWidth = React.useMemo(function () {
    return Math.round((width + spacing) / columns) - spacing;
  }, [spacing, width]);
  var boardDimensions = React.useMemo(function () {
    return {
      rowHeight: rowHeight,
      colWidth: colWidth,
      spacing: spacing
    };
  }, [rowHeight, colWidth, spacing]); // Callbacks

  var onDragStart = React.useCallback(function (key) {
    var item = _objectSpread({}, items[key]);

    var dimensions = calculateItemDimensions(item[screenType], boardDimensions);
    setActiveDragItem(_objectSpread({}, dimensions, {
      key: key,
      dragging: true
    }));
    setOldDragItem(item);
  }, [items, screenType, boardDimensions]);
  var onDrag = React.useCallback(function (_, _ref2) {
    var deltaX = _ref2.deltaX,
        deltaY = _ref2.deltaY;
    if (!activeDrag) return; // Constraining movement to within the container bounds

    var top = Math.max(activeDrag.top + deltaY, 0);
    var left = Math.min(Math.max(activeDrag.left + deltaX, 0), width - activeDrag.width);

    var item = _objectSpread({}, items[activeDrag.key]);

    var itemLayout = calculateItemLayout(item[screenType], {
      top: top,
      left: left
    }, boardDimensions); // TODO: Move items out of collisions.

    var newDragItem = _objectSpread({}, activeDrag, {
      top: top,
      left: left
    });

    var newItems = compact(moveItem(newDragItem.key, items, itemLayout.col, itemLayout.row, screenType), screenType);
    setItems(newItems);
    setActiveDragItem(_objectSpread({}, activeDrag, {
      top: top,
      left: left
    }));
    setPlaceholder(calculateItemDimensions(newItems[activeDrag.key][screenType], boardDimensions));
  }, [activeDrag, items, screenType, boardDimensions, width]);
  var onDragStop = React.useCallback(function () {
    if (!activeDrag) {
      return;
    }

    var key = activeDrag.key;

    var item = _objectSpread({}, items[key], _defineProperty({}, screenType, calculateItemLayout(items[key][screenType], activeDrag, boardDimensions)));

    var newItems = compact(_objectSpread({}, items, _defineProperty({}, activeDrag.key, item)), screenType);
    setItems(newItems);

    if (onChange && !isEqual(item, oldDragItem)) {
      onChange(newItems);
    }

    setActiveDragItem(null);
    setPlaceholder(null);
  }, [activeDrag, oldDragItem, items, screenType, boardDimensions, onChange]); // Hmm, there's a bunch of renders, maybe some can be optimized away..

  console.log('render');
  return React.createElement("div", {
    ref: rootRef
  }, React.createElement(BoardContainer, {
    height: height
  }, Object.values(items).map(function (item) {
    var layout = item[screenType];

    if (!layout) {
      return null;
    }

    var containerProps = activeDrag && activeDrag.key === item.key ? activeDrag : calculateItemDimensions(layout, boardDimensions);
    var Component = item.component;
    return locked ? React.createElement(BoardItemContainer, Object.assign({}, containerProps, {
      key: item.key
    }), React.createElement(Component, {
      screenType: screenType
    })) : React.createElement(DraggableCore, {
      key: item.key,
      onStart: function onStart() {
        return onDragStart(item.key);
      },
      onDrag: onDrag,
      onStop: onDragStop
    }, React.createElement(BoardItemContainer, containerProps, React.createElement(Component, {
      screenType: screenType
    })));
  }), placeholder && React.createElement(BoardItemPlaceholder, placeholder)));
};

export default Board;
//# sourceMappingURL=Board.js.map