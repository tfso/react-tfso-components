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
  if (rows <= 0) {
    return 0;
  }

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

function constrainItemLayouts(itemLayouts) {
  var layouts = _objectSpread({}, itemLayouts);

  if (layouts.desktop) {
    layouts.desktop = constrainItemLayout(layouts.desktop);
  }

  if (layouts.tablet) {
    layouts.tablet = constrainItemLayout(layouts.tablet);
  }

  if (layouts.mobile) {
    layouts.mobile = constrainItemLayout(layouts.mobile);
  }

  return layouts;
}

function constrainItemLayout(itemLayout) {
  return {
    col: Math.max(Math.min(itemLayout.col, 10), 0),
    // 10 because we have 12 columns, from 0 to 11, and an item needs a minimum of 1 width
    row: Math.max(itemLayout.row, 0),
    colSpan: Math.max(Math.min(itemLayout.colSpan, 12), 1),
    rowSpan: Math.max(itemLayout.rowSpan, 1)
  };
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

function sortBreakpoints(breakpoints) {
  var keys = Object.keys(breakpoints);
  return keys.sort(function (a, b) {
    return (breakpoints[a] || 0) - (breakpoints[b] || 0);
  });
}

function collides(bil1, bil2) {
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
    return {
      key: item.key,
      layout: item[screenType]
    };
  }).sort(function (_ref4, _ref5) {
    var layoutA = _ref4.layout;
    var layoutB = _ref5.layout;
    return compareBoardItemLayout(layoutA, layoutB);
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sortedItemLayouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref7 = _step.value;
      var _key = _ref7.key;
      var itemLayout = _ref7.layout;
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

      newLayout[_key] = itemWasChanged ? _objectSpread({}, items[_key], _defineProperty({}, screenType, itemLayout)) : items[_key]; // don't want to duplicate items.
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

  return layoutWasChanged ? _objectSpread({}, items, newLayout) : items;
}

function compareBoardItemLayout(a, b) {
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

  var newItems = _objectSpread({}, items, _defineProperty({}, targetItem.key, targetItem));

  var collisions = Object.values(newItems).filter(function (otherItem) {
    return targetItem.key !== otherItem.key && collides(otherItem[screenType], targetItemLayout);
  }).sort(function (a, b) {
    return compareBoardItemLayout(a[screenType], b[screenType]);
  }) // The sort may be importand in case one colliding item must be move to fix a previous colliding item
  .reverse(); // so we move the bottommost item down first

  if (!collisions.length) {
    return newItems;
  }

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
        return item.key !== collision.key && collides(item[screenType], collissionMovedUp[screenType]);
      })) {
        newItems = _objectSpread({}, newItems, _defineProperty({}, collision.key, collissionMovedUp));
      } else {
        newItems = moveCollidingItem(targetItem, collision, newItems, screenType);
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

function moveCollidingItem(source, collidesWith, items, screenType) {
  var collissionMovedDown = _objectSpread({}, collidesWith, _defineProperty({}, screenType, _objectSpread({}, collidesWith[screenType], {
    row: source[screenType].row + source[screenType].rowSpan
  })));

  var newItems = _objectSpread({}, items, _defineProperty({}, collissionMovedDown.key, collissionMovedDown));

  var collisions = Object.values(newItems).filter(function (otherItem) {
    return otherItem.key !== collidesWith.key && collides(otherItem[screenType], collissionMovedDown[screenType]);
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
      newItems = moveCollidingItem(collissionMovedDown, collision, newItems, screenType);
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

var screenTypes = ['mobile', 'tablet', 'desktop'];
/**
 * Add a new item to the board
 * @param items Existing items in the board
 * @param item New item to add
 */

export function addBoardItem(items, item) {
  if (items.hasOwnProperty(item.key)) {
    throw new Error("Cannot add item with duplicate key '".concat(item.key, "'"));
  }

  var definedScreenTypes = screenTypes.filter(function (st) {
    return item.hasOwnProperty(st);
  });

  if (!definedScreenTypes.length) {
    throw new Error('Cannot add an item with no layout defined for neither mobile, tablet nor desktop');
  }

  var constrainedItem = constrainItemLayouts(item);

  var newItems = _objectSpread({}, items, _defineProperty({}, constrainedItem.key, constrainedItem));

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    var _loop3 = function _loop3() {
      var screenType = _step4.value;
      var collisions = Object.values(items).filter(function (otherItem) {
        return constrainedItem.key !== otherItem.key && collides(otherItem[screenType], constrainedItem[screenType]);
      });

      if (!collisions.length) {
        newItems = compact(newItems, screenType);
        return "continue";
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = collisions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var collision = _step5.value;
          newItems = moveCollidingItem(constrainedItem, collision, newItems, screenType);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      newItems = compact(newItems, screenType);
    };

    for (var _iterator4 = definedScreenTypes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _ret2 = _loop3();

      if (_ret2 === "continue") continue;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return newItems;
}
export function removeBoardItem(items, key) {
  var deletedItem = _objectSpread({}, items[key]);

  var newItems = _objectSpread({}, items);

  delete newItems[key];

  if (deletedItem.desktop) {
    newItems = compact(newItems, 'desktop');
  }

  if (deletedItem.tablet) {
    newItems = compact(newItems, 'tablet');
  }

  if (deletedItem.mobile) {
    newItems = compact(newItems, 'mobile');
  }

  return newItems;
}
export function hideBoardItem(items, key, screenType) {
  return compact(_objectSpread({}, items, {
    key: _objectSpread({}, items[key], _defineProperty({}, screenType, undefined))
  }), screenType);
}
export function showBoardItem(items, key, screenType) {
  throw new Error('Not implemtented'); // resolve collisions
}
//# sourceMappingURL=utils.js.map