import _styled from "styled-components";

var BoardItemContainer = _styled.div.attrs(function (props) {
  return {
    style: {
      // This property changes very often, if it's in the styled macro, a new class will be generated for each change to the position.
      transform: "translate(".concat(props.left, "px, ").concat(props.top, "px)")
    }
  };
}).withConfig({
  displayName: "BoardItemContainer",
  componentId: "sc-9jczmn-0"
})(["&&{position:absolute;width:", "px;height:", "px;transition:", ";z-index:", ";}"], function (_ref) {
  var width = _ref.width;
  return width;
}, function (_ref2) {
  var height = _ref2.height;
  return height;
}, function (_ref3) {
  var dragging = _ref3.dragging;
  return dragging ? 'none' : 'transform 200ms ease';
}, function (_ref4) {
  var dragging = _ref4.dragging;
  return dragging ? 3 : 'auto';
});

export default BoardItemContainer;
//# sourceMappingURL=BoardItemContainer.js.map