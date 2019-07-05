function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { boardInit, boardReducer, BoardActionType } from './boardState';
describe('boardState', function () {
  describe('boardInit', function () {
    it('sets drag-state to null', function () {
      expect(boardInit({
        foo: 'foo'
      })).toEqual({
        items: {
          foo: 'foo'
        },
        activeDrag: null,
        oldDragItem: null,
        placeholder: null
      });
    });
  });
  describe('boardReducer', function () {
    var boardState = {
      items: {
        a: {
          key: 'a',
          component: 'a',
          desktop: {
            row: 0,
            col: 0,
            rowSpan: 1,
            colSpan: 1
          }
        }
      },
      placeholder: null,
      activeDrag: null,
      oldDragItem: null
    };
    var boardDimensions = {
      colWidth: 90,
      rowHeight: 90,
      spacing: 16,
      width: 1000
    };
    var screenType = 'desktop';
    describe('RESET_ITEMS', function () {
      it('sets items', function () {
        var state = {
          items: {
            foo: 'foo'
          },
          otherProp: 'foo'
        };
        var nextState = boardReducer(state, {
          type: BoardActionType.RESET_ITEMS,
          items: {}
        });
        expect(nextState.items).toEqual({});
        expect(nextState.items).not.toBe(state.items);
        expect(state).not.toBe(nextState);
        expect(nextState['otherProp']).toBe('foo');
      });
      it('does not set items when items are the same', function () {
        var state = {
          items: {
            foo: 'foo'
          },
          otherProp: 'foo'
        };
        var nextState = boardReducer(state, {
          type: BoardActionType.RESET_ITEMS,
          items: state.items
        });
        expect(nextState).toBe(state);
      });
    });
    describe('DRAG_START', function () {
      var type = BoardActionType.DRAG_START;
      it('returns same state if the key does not exist in the items', function () {
        var state = {
          items: {}
        };
        var nextState = boardReducer(state, {
          type: type,
          key: 'a'
        });
        expect(state).toBe(nextState);
      });
      it('sets oldDragItem and activeDrag', function () {
        var nextState = boardReducer(boardState, {
          type: type,
          key: 'a',
          screenType: screenType,
          boardDimensions: boardDimensions
        });
        expect(nextState.oldDragItem).toBe(boardState.items['a']);
        expect(nextState.activeDrag).toEqual({
          dragging: true,
          height: 90,
          key: 'a',
          left: 0,
          top: 0,
          width: 90
        });
      });
      it('does not set items', function () {
        var nextState = boardReducer(boardState, {
          type: type,
          key: 'a',
          screenType: screenType,
          boardDimensions: boardDimensions
        });
        expect(nextState.items).toBe(boardState.items);
      });
      it('does not mutate state', function () {
        boardReducer(boardState, {
          type: type,
          key: 'a',
          screenType: screenType,
          boardDimensions: boardDimensions
        });
        expect(boardState).toEqual({
          items: {
            a: {
              key: 'a',
              component: 'a',
              desktop: {
                row: 0,
                col: 0,
                rowSpan: 1,
                colSpan: 1
              }
            }
          },
          placeholder: null,
          activeDrag: null,
          oldDragItem: null
        });
      });
    });
    describe('DRAGGING', function () {
      var type = BoardActionType.DRAGGING;
      it('returns the same state if activeDrag is null', function () {
        var state = boardReducer(boardState, {
          type: type,
          deltaX: 1,
          deltaY: 2,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(state).toBe(boardState);
      });
      it('returns the same state if deltaX and deltaY is 0', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 0,
            top: 0,
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          deltaX: 0,
          deltaY: 0,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextState).toBe(state);
      });
      it('constrains movement to within the boards bounds', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 0,
            top: 0,
            width: 90
          }
        });

        var nextStateLessThan = boardReducer(state, {
          type: type,
          deltaX: -20,
          deltaY: -20,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        var nextStateGreaterThan = boardReducer(state, {
          type: type,
          deltaX: 1020,
          deltaY: -20,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextStateLessThan.activeDrag).toEqual(state.activeDrag);
        expect(nextStateGreaterThan.activeDrag).toEqual(_objectSpread({}, state.activeDrag, {
          left: 910
        }));
      });
      it('compacts items', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 0,
            top: 0,
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          deltaY: 300,
          deltaX: 0,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextState.placeholder.top).toBe(0);
        expect(nextState.activeDrag.top).toBe(300);
      });
      it('does not mutate state', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 0,
            top: 0,
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          deltaX: 1,
          deltaY: 2,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(state).toEqual({
          items: {
            a: {
              key: 'a',
              component: 'a',
              desktop: {
                row: 0,
                col: 0,
                rowSpan: 1,
                colSpan: 1
              }
            }
          },
          placeholder: null,
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 0,
            top: 0,
            width: 90
          },
          oldDragItem: null
        });
        expect(nextState).not.toBe(state);
      });
    });
    describe('DRAG_STOP', function () {
      var type = BoardActionType.DRAG_STOP;
      it('returns the same state if activeDrag is null', function () {
        var state = boardReducer(boardState, {
          type: type,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(state).toBe(boardState);
      });
      it('returns the same items if the oldDragItem is equal to item that was dragged', function () {
        var state = _objectSpread({}, boardState, {
          oldDragItem: _objectSpread({}, boardState.items['a']),
          // copy to make sure that isEqual is used and not ===
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 30,
            // snaps back where it was
            top: 500,
            // should be compacted down
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextState).toEqual(boardState);
        expect(nextState.items).toBe(boardState.items);
      });
      it('returns new items if item was moved', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 70,
            // snaps 1 col to the right
            top: 0,
            // should be compacted down
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextState.items['a'].desktop.col).toBe(1);
        expect(nextState.items).not.toBe(boardState.items);
      });
      it('compacts items', function () {
        // dragStop must also compact since it's creating a new layout based on the activeDrag, which may be held with a lot of free space above.
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 70,
            // is moved 1 col to the right
            top: 500,
            // this movement is compacted away, but the item was nonetheless moved
            width: 90
          }
        });

        var nextState = boardReducer(state, {
          type: type,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(nextState.items['a'].desktop).toEqual({
          col: 1,
          row: 0,
          colSpan: 1,
          rowSpan: 1
        });
      });
      it('does not mutate state', function () {
        var state = _objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 70,
            top: 0,
            width: 90
          }
        });

        boardReducer(state, {
          type: type,
          boardDimensions: boardDimensions,
          screenType: screenType
        });
        expect(state).toEqual(_objectSpread({}, boardState, {
          activeDrag: {
            dragging: true,
            height: 90,
            key: 'a',
            left: 70,
            top: 0,
            width: 90
          }
        }));
      });
    });
  });
});
//# sourceMappingURL=boardState.test.js.map