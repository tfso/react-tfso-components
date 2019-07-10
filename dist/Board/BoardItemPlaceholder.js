import _styled from "styled-components";

var BoardItemPlaceholder = _styled.div.attrs(function (props) {
  return {
    style: {
      // This property changes very often, if it's in the styled macro, a new class will be generated for each change to the position.
      transform: "translate(".concat(props.left, "px, ").concat(props.top, "px)")
    }
  };
}).withConfig({
  displayName: "BoardItemPlaceholder",
  componentId: "sc-1551sj6-0"
})(["&&{position:absolute;width:", "px;height:", "px;background:red;opacity:0.2;transition:transform 100ms ease;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;}"], function (_ref) {
  var width = _ref.width;
  return width;
}, function (_ref2) {
  var height = _ref2.height;
  return height;
});

export default BoardItemPlaceholder;
//# sourceMappingURL=BoardItemPlaceholder.js.map