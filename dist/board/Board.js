function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import BoardContainer from './BoardContainer';
import { calculateBoardHeight, calculateBoardRows, calculateItemDimensions } from './utils';
import BoardItemContainer from './BoardItemContainer';
import { useWidth } from './useWidth';
import useScreenType from './useScreenType';
import { DraggableCore } from 'react-draggable';
import BoardItemPlaceholder from './BoardItemPlaceholder';
import { boardReducer, boardInit, BoardActionType } from './boardState';
var COLUMNS = 12;

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

  var _React$useReducer = React.useReducer(boardReducer, props.items, boardInit),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var _React$useState = React.useState(1920),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      width = _React$useState2[0],
      setWidth = _React$useState2[1]; // Component received new Items


  React.useEffect(function () {
    return dispatch({
      type: BoardActionType.RESET_ITEMS,
      items: props.items
    });
  }, [props.items]); // Board dimensions

  useWidth(rootRef, React.useCallback(function (newWidth) {
    return setWidth(newWidth);
  }, [setWidth]));
  var screenType = useScreenType(width);
  var height = useHeight({
    items: state.items,
    spacing: props.spacing,
    rowHeight: props.rowHeight
  }, screenType);
  var colWidth = React.useMemo(function () {
    return Math.round((width + spacing) / COLUMNS) - spacing;
  }, [spacing, width]);
  var boardDimensions = React.useMemo(function () {
    return {
      rowHeight: rowHeight,
      colWidth: colWidth,
      spacing: spacing,
      width: width
    };
  }, [rowHeight, colWidth, spacing, width]); // Callbacks

  var onDragStart = React.useCallback(function (key) {
    dispatch({
      type: BoardActionType.DRAG_START,
      key: key,
      boardDimensions: boardDimensions,
      screenType: screenType
    });
  }, [screenType, boardDimensions]);
  var onDrag = React.useCallback(function (_, _ref2) {
    var deltaX = _ref2.deltaX,
        deltaY = _ref2.deltaY;
    dispatch({
      type: BoardActionType.DRAGGING,
      deltaX: deltaX,
      deltaY: deltaY,
      boardDimensions: boardDimensions,
      screenType: screenType
    });
  }, [screenType, boardDimensions]);
  var onDragStop = React.useCallback(function () {
    dispatch({
      type: BoardActionType.DRAG_STOP,
      boardDimensions: boardDimensions,
      screenType: screenType
    });

    if (onChange && state.items !== props.items) {
      onChange(state.items);
    }
  }, [screenType, boardDimensions, onChange, props.items, state.items]);
  var items = state.items,
      activeDrag = state.activeDrag,
      placeholder = state.placeholder;
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