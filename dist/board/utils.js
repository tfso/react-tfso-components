function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export function calculateBoardRows(items, screenType) {
  return Object.values(items).map(function (item) {
    var layout = item[screenType];
    return layout ? layout.row + layout.rowSpan : 0;
  }).reduce(function (max, bottomY) {
    return bottomY > max ? bottomY : max;
  }, 0);
}
export function calculateBoardHeight(rows, spacing, rowHeight) {
  return rows * rowHeight + (rows - 1) * spacing;
}
export function calculateItemDimensions(item, _ref) {
  var rowHeight = _ref.rowHeight,
      colWidth = _ref.colWidth,
      spacing = _ref.spacing;
  return {
    top: item.row * (rowHeight + spacing),
    left: item.col * (colWidth + spacing),
    height: item.rowSpan * rowHeight + (item.rowSpan - 1) * spacing,
    width: item.colSpan * colWidth + (item.colSpan - 1) * spacing
  };
}
export function calculateItemLayout(item, _ref2, _ref3) {
  var top = _ref2.top,
      left = _ref2.left;
  var rowHeight = _ref3.rowHeight,
      colWidth = _ref3.colWidth,
      spacing = _ref3.spacing;
  return _objectSpread({}, item, {
    col: Math.round(left / (colWidth + spacing)),
    row: Math.round(top / (rowHeight + spacing))
  });
}
export function getBreakpointFromWidth(breakpoints, width) {
  var sorted = sortBreakpoints(breakpoints);
  var matching = sorted[0];

  for (var i = 1; i < sorted.length; i++) {
    var breakpointName = sorted[i];
    var breakpoint = breakpoints[breakpointName];
    if (breakpoint && width > breakpoint) matching = breakpointName;
  }

  return matching;
}
export function sortBreakpoints(breakpoints) {
  var keys = Object.keys(breakpoints);
  return keys.sort(function (a, b) {
    return (breakpoints[a] || 0) - (breakpoints[b] || 0);
  });
}
export function collides(bil1, bil2) {
  if (!bil1 || !bil2) return false;
  if (bil1.col + bil1.colSpan <= bil2.col) return false;
  if (bil1.col >= bil2.col + bil2.colSpan) return false;
  if (bil1.row + bil1.rowSpan <= bil2.row) return false;
  if (bil1.row >= bil2.row + bil2.rowSpan) return false;
  return true;
}
export function compact(items, screenType) {
  var newLayout = {};
  var layoutWasChanged = false;
  var sortedItemLayouts = Object.values(items).filter(function (item) {
    return item.hasOwnProperty(screenType);
  }).map(function (item) {
    return _objectSpread({
      key: item.key
    }, item[screenType]);
  }).sort(compareBoardItemLayout);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sortedItemLayouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var itemLayout = _step.value;
      var itemWasChanged = false;

      var _loop = function _loop() {
        var test = _objectSpread({}, itemLayout, {
          row: itemLayout.row - 1
        });

        if (test.row < 0 || !!Object.values(newLayout).find(function (otherItem) {
          return collides(otherItem[screenType], test);
        })) {
          return "break";
        }

        itemLayout = test;
        itemWasChanged = layoutWasChanged = true;
      };

      while (true) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      newLayout[itemLayout.key] = itemWasChanged ? _objectSpread({}, items[itemLayout.key], _defineProperty({}, screenType, itemLayout)) : items[itemLayout.key]; // don't want to duplicate items.
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return layoutWasChanged ? newLayout : items;
}
export function compareBoardItemLayout(a, b) {
  if (a.row > b.row || a.row === b.row && a.col > b.col) {
    return 1;
  } else if (a.row === b.row && a.col === b.col) {
    return 0;
  }

  return -1;
}
export function moveItem(key, items, col, row, screenType) {
  if (!items.hasOwnProperty(key)) {
    throw new Error('slutt');
  }

  var sourceItem = items[key];
  var sourceItemLayout = sourceItem[screenType];

  var targetItemLayout = _objectSpread({}, sourceItemLayout, {
    col: col,
    row: row
  });

  var targetItem = _objectSpread({}, sourceItem, _defineProperty({}, screenType, targetItemLayout));

  var newItems = _objectSpread({}, items, _defineProperty({}, sourceItem.key, targetItem));

  var collisions = Object.values(newItems).filter(function (otherItem) {
    return targetItem.key !== otherItem.key && collides(otherItem[screenType], targetItemLayout);
  });

  if (!collisions.length) {
    return newItems;
  }

  var movedItems = new Set([sourceItem.key]);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var collision = _step2.value;
      var collisionLayout = collision[screenType];

      var collissionMovedUp = _objectSpread({}, collision, _defineProperty({}, screenType, _objectSpread({}, collisionLayout, {
        row: Math.max(targetItemLayout.row - collisionLayout.rowSpan, 0)
      }))); // Can switch places (move collision above target)


      if (!Object.values(newItems).find(function (item) {
        return collides(item[screenType], collissionMovedUp[screenType]);
      })) {
        movedItems.add(collision.key);
        newItems = _objectSpread({}, newItems, _defineProperty({}, collision.key, collissionMovedUp));
      } else {
        newItems = moveCollidingItem(targetItem, collision, newItems, screenType, movedItems);
      }
    };

    for (var _iterator2 = collisions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return newItems;
}

function moveCollidingItem(source, collidesWith, items, screenType, movedItems) {
  movedItems.add(collidesWith.key);

  var collissionMovedDown = _objectSpread({}, collidesWith, _defineProperty({}, screenType, _objectSpread({}, collidesWith[screenType], {
    row: source[screenType].row + source[screenType].rowSpan
  })));

  var newItems = _objectSpread({}, items, _defineProperty({}, collissionMovedDown.key, collissionMovedDown));

  var collisions = Object.values(newItems).filter(function (otherItem) {
    return !movedItems.has(otherItem.key) && collides(otherItem[screenType], collissionMovedDown[screenType]);
  });

  if (!collisions.length) {
    return newItems;
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = collisions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var collision = _step3.value;
      newItems = moveCollidingItem(collissionMovedDown, collision, newItems, screenType, movedItems);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return newItems;
}
//# sourceMappingURL=utils.js.map