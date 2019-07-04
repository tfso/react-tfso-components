import React from 'react';
import ReactDOM from 'react-dom';
export default function useWidth(ref, onWidthChange) {
  var handleResize = React.useCallback(function () {
    var domNode = ReactDOM.findDOMNode(ref.current);

    if (domNode instanceof HTMLElement) {
      onWidthChange(domNode.offsetWidth);
    }
  }, [ref, onWidthChange]);
  React.useEffect(function () {
    window.addEventListener('resize', handleResize);
    handleResize(); // invoking once to get the correct initial size

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
}
//# sourceMappingURL=useWidth.js.map