function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compact, correctBounds } from './utils';

/**
 * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
 *
 * @param  {Breakpoints} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
 * @param  {Number} width Screen width.
 * @return {Breakpoint}       Highest breakpoint that is less than width.
 */
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
/**
 * Given a breakpoint, get the # of cols set for it.
 * @param  {String} breakpoint Breakpoint name.
 * @param  {Object} cols       Map of breakpoints to cols.
 * @return {Number}            Number of cols.
 */

export function getColsFromBreakpoint(breakpoint, cols) {
  var numCols = cols[breakpoint];

  if (!numCols) {
    throw new Error('ResponsiveReactGridLayout: `cols` entry for breakpoint ' + breakpoint + ' is missing!');
  }

  return numCols;
}
/**
 * Given existing layouts and a new breakpoint, find or generate a new layout.
 *
 * This finds the layout above the new one and generates from it, if it exists.
 *
 * @param  {Object} layouts     Existing layouts.
 * @param  {Array} breakpoints All breakpoints.
 * @param  {String} breakpoint New breakpoint.
 * @param  {String} breakpoint Last breakpoint (for fallback).
 * @param  {Number} cols       Column count at new breakpoint.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}             New layout.
 */

export function findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, lastBreakpoint, cols) {
  // If it already exists, just return it.
  if (layouts[breakpoint]) return _objectSpread({}, layouts[breakpoint]); // Find or generate the next layout

  var layout = layouts[lastBreakpoint];
  var breakpointsSorted = sortBreakpoints(breakpoints);
  var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = breakpointsAbove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var b = _step.value;

      if (layouts[b]) {
        layout = layouts[b];
        break;
      }
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

  layout = layout ? _objectSpread({}, layout) : {};
  return compact(correctBounds(layout, cols));
}
/**
 * Given breakpoints, return an array of breakpoints sorted by width. This is usually
 * e.g. ['xs', 'sm', ...]
 *
 * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
 * @return {Array}              Sorted breakpoints.
 */

export function sortBreakpoints(breakpoints) {
  var keys = Object.keys(breakpoints);
  return keys.sort(function (a, b) {
    return (breakpoints[a] || 0) - (breakpoints[b] || 0);
  });
}
//# sourceMappingURL=responsiveUtils.js.map