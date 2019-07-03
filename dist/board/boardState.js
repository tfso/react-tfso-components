function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { calculateItemDimensions, calculateItemLayout, compact, moveItem } from './utils';
import isEqual from 'lodash/isEqual';
export var BoardActionType;

(function (BoardActionType) {
  BoardActionType["DRAG_START"] = "DRAG_START";
  BoardActionType["DRAGGING"] = "DRAGGING";
  BoardActionType["DRAG_STOP"] = "DRAG_STOP";
  BoardActionType["RESET_ITEMS"] = "RESET_ITEMS";
})(BoardActionType || (BoardActionType = {}));

export function boardInit(items) {
  return {
    items: items,
    placeholder: null,
    oldDragItem: null,
    activeDrag: null
  };
}
export function boardReducer(state, action) {
  switch (action.type) {
    case BoardActionType.DRAG_START:
      {
        var key = action.key,
            screenType = action.screenType,
            boardDimensions = action.boardDimensions;
        var item = state.items[key];

        if (!item) {
          return state;
        }

        var dimensions = calculateItemDimensions(item[screenType], boardDimensions);
        return _objectSpread({}, state, {
          oldDragItem: item,
          activeDrag: _objectSpread({}, dimensions, {
            key: key,
            dragging: true
          })
        });
      }

    case BoardActionType.DRAGGING:
      {
        var activeDrag = state.activeDrag,
            items = state.items;
        var deltaX = action.deltaX,
            deltaY = action.deltaY,
            _boardDimensions = action.boardDimensions,
            _screenType = action.screenType;

        if (!activeDrag || deltaX === 0 && deltaY === 0) {
          return state;
        } // Constraining movement to within the container bounds


        var top = Math.max(activeDrag.top + deltaY, 0);
        var left = Math.min(Math.max(activeDrag.left + deltaX, 0), _boardDimensions.width - activeDrag.width);

        var _item = _objectSpread({}, items[activeDrag.key]);

        var itemLayout = calculateItemLayout(_item[_screenType], {
          top: top,
          left: left
        }, _boardDimensions);

        var newDragItem = _objectSpread({}, activeDrag, {
          top: top,
          left: left
        });

        var newItems = compact(moveItem(newDragItem.key, items, itemLayout.col, itemLayout.row, _screenType), _screenType);
        return _objectSpread({}, state, {
          items: newItems,
          activeDrag: _objectSpread({}, activeDrag, {
            top: top,
            left: left
          }),
          placeholder: calculateItemDimensions(newItems[activeDrag.key][_screenType], _boardDimensions)
        });
      }

    case BoardActionType.DRAG_STOP:
      {
        var _activeDrag = state.activeDrag,
            _items = state.items,
            oldDragItem = state.oldDragItem;
        var _screenType2 = action.screenType,
            _boardDimensions2 = action.boardDimensions;

        if (!_activeDrag) {
          return state;
        }

        var _key = _activeDrag.key;

        var _item2 = _objectSpread({}, _items[_key], _defineProperty({}, _screenType2, calculateItemLayout(_items[_key][_screenType2], _activeDrag, _boardDimensions2)));

        var _newItems = compact(_objectSpread({}, _items, _defineProperty({}, _activeDrag.key, _item2)), _screenType2);

        if (isEqual(_newItems[_key], oldDragItem)) {
          return {
            items: state.items,
            activeDrag: null,
            placeholder: null,
            oldDragItem: null
          };
        }

        return {
          items: _newItems,
          activeDrag: null,
          placeholder: null,
          oldDragItem: null
        };
      }

    case BoardActionType.RESET_ITEMS:
      return action.items !== state.items ? _objectSpread({}, state, {
        items: action.items
      }) : state;

    default:
      return state;
  }
}
//# sourceMappingURL=boardState.js.map