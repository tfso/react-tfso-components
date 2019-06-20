function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import ReactDOM from 'react-dom';
export var useWidth = function useWidth(node) {
  var initialWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1280;

  var _React$useState = React.useState(initialWidth),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      width = _React$useState2[0],
      setWidth = _React$useState2[1];

  var handleResize = React.useCallback(function () {
    var domNode = ReactDOM.findDOMNode(node);

    if (domNode instanceof HTMLElement) {
      setWidth(domNode.offsetWidth);
    }
  }, [node, setWidth]);
  React.useEffect(function () {
    window.addEventListener('resize', handleResize);
    handleResize(); // invoking once to get the correct initial size

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return width;
};
//# sourceMappingURL=useWidth.js.map