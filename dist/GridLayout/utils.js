function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import isEqual from 'lodash/isEqual';
import React from 'react';

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout) {
  return Object.values(layout).map(function (item) {
    return item.row + item.height;
  }).reduce(function (max, bottomY) {
    return bottomY > max ? bottomY : max;
  }, 0);
}
/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */

export function childrenEqual(a, b) {
  return isEqual(React.Children.map(a, function (c) {
    return c.key;
  }), React.Children.map(b, function (c) {
    return c.key;
  }));
}
/**
 * Given two layoutitems, check if they collide.
 */

export function collides(l1, l2) {
  if (l1.id === l2.id) return false; // same element

  if (l1.col + l1.width <= l2.col) return false; // l1 is left of l2

  if (l1.col >= l2.col + l2.width) return false; // l1 is right of l2

  if (l1.row + l1.height <= l2.row) return false; // l1 is above l2

  if (l1.row >= l2.row + l2.height) return false; // l1 is below l2

  return true; // boxes overlap
}
export function compact(layout) {
  var newLayout = {};
  var sortedItems = sortLayoutItems(layout);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sortedItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      while (true) {
        var test = _objectSpread({}, item, {
          row: item.row - 1
        });

        if (test.row < 0 || !!getFirstCollision(Object.values(newLayout), test)) {
          break;
        }

        item = test;
      }

      newLayout[item.id] = item;
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

  return newLayout;
}
export function constrainCol(targetCol, width, columns) {
  if (width > columns || targetCol < 0) {
    return 0;
  }

  if (targetCol + width > columns) {
    return columns - width;
  }

  return targetCol;
}
/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} cols Number of columns.
 */

export function correctBounds(layout, cols) {
  return Object.values(layout).map(function (item) {
    var width = item.width > cols ? cols : item.width;
    var col = constrainCol(item.col, width, cols); // item.col + width > cols ? Math.max(cols - width, 0) : item.col

    return item.col !== col || item.width !== width ? _objectSpread({}, item, {
      width: width,
      col: col
    }) : item;
  }).reduce(function (l, item) {
    l[item.id] = item;
    return l;
  }, {});
}
export function getFirstCollision(layoutItems, target) {
  return layoutItems.find(function (item) {
    return collides(item, target);
  });
}
export function getAllCollisions(layoutItems, target) {
  return layoutItems.filter(function (item) {
    return collides(item, target);
  });
}
export function moveItem(itemId, layout, col, row, cols) {
  if (!layout.hasOwnProperty(itemId)) {
    throw new Error('slutt');
  }

  var source = layout[itemId];
  var correctedCol = constrainCol(col, source.width, cols);

  var target = _objectSpread({}, source, {
    col: correctedCol,
    row: row
  });

  var newLayout = _objectSpread({}, layout, _defineProperty({}, source.id, target));

  var collisions = getAllCollisions(Object.values(newLayout), target);

  if (!collisions) {
    return newLayout;
  }

  var movedItems = new Set([target.id]);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = collisions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var collision = _step2.value;

      var collissionMovedUp = _objectSpread({}, collision, {
        row: Math.max(target.row - collision.height, 0) // Can switch places (move collision above target)

      });

      if (!getFirstCollision(Object.values(newLayout), collissionMovedUp)) {
        movedItems.add(collision.id);
        newLayout = _objectSpread({}, newLayout, _defineProperty({}, collision.id, collissionMovedUp));
      } else {
        newLayout = moveCollidingItem(target, collision, newLayout, movedItems);
      }
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

  return newLayout;
}

function moveCollidingItem(source, collidesWith, layout, movedItems) {
  movedItems.add(collidesWith.id);

  var collissionMovedDown = _objectSpread({}, collidesWith, {
    row: source.row + source.height
  });

  var newLayout = _objectSpread({}, layout, _defineProperty({}, collissionMovedDown.id, collissionMovedDown));

  var collisions = Object.values(newLayout).filter(function (item) {
    return !movedItems.has(item.id) && collides(item, collissionMovedDown);
  });

  if (!collisions.length) {
    return newLayout;
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = collisions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var collision = _step3.value;
      newLayout = moveCollidingItem(collissionMovedDown, collision, newLayout, movedItems);
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

  return newLayout;
}

export function setTransform(_ref) {
  var top = _ref.top,
      left = _ref.left,
      width = _ref.width,
      height = _ref.height;
  // Replace unitless items with px
  var translate = "translate(".concat(left, "px,").concat(top, "px)");
  return {
    transform: translate,
    // WebkitTransform: translate,
    // MozTransform: translate,
    // msTransform: translate,
    // OTransform: translate,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    position: 'absolute'
  };
}

function uncollide(layout) {
  var newLayout = layout;
  var sortedItemIds = sortLayoutItems(layout).map(function (item) {
    return item.id;
  });

  var pickFromLayout = function pickFromLayout(id) {
    return newLayout[id];
  };

  for (var i = 0; i < sortedItemIds.length - 1; i++) {
    // length - 1 because the last item won't collide with jack shit
    while (true) {
      var item = newLayout[sortedItemIds[i]];
      var rest = sortedItemIds.slice(i + 1).map(pickFromLayout);
      var collision = getFirstCollision(rest, item);

      if (!collision) {
        break;
      }

      newLayout = moveCollidingItem(item, collision, newLayout, new Set([item.id]));
    }
  }

  return newLayout;
}

export function sortLayoutItems(layout) {
  var ascending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Object.values(layout).sort(function (a, b) {
    if (a.row > b.row || a.row === b.row && a.col > b.col) {
      return ascending ? 1 : -1;
    } else if (a.row === b.row && a.col === b.col) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }

    return ascending ? -1 : 1;
  });
}
/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */

export function synchronizeLayoutWithChildren(initialLayout, children, cols) {
  // Generate one layout item per child.
  var layout = {};
  React.Children.forEach(children, function (child) {
    var id = String(child.key); // Don't overwrite if it already exists.

    var exists = initialLayout[id];

    if (exists) {
      layout[id] = _objectSpread({}, exists);
    } else {
      // Nothing provided: ensure this is added to the bottom
      layout[id] = {
        width: 1,
        height: 1,
        col: 0,
        row: bottom(layout),
        id: id
      };
    }
  }); // Correct the layout.

  layout = correctBounds(layout, cols);
  layout = uncollide(layout);
  layout = compact(layout);
  return layout;
}
/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */

export function validateLayout(layout) {
  var contextName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Layout';
  var subProps = ['col', 'row', 'width', 'height'];

  for (var _i = 0, _Object$values = Object.values(layout); _i < _Object$values.length; _i++) {
    var item = _Object$values[_i];

    for (var j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== 'number') {
        throw new Error('GridLayout: ' + contextName + '[' + item.id + '].' + subProps[j] + ' must be a number!');
      }
    }

    if (item.id && typeof item.id !== 'string') {
      throw new Error('GridLayout: ' + contextName + ' item.id must be a string!');
    }
  }
}
export function autoBindHandlers(el, fns) {
  fns.forEach(function (key) {
    return el[key] = el[key].bind(el);
  });
}
//# sourceMappingURL=utils.js.map