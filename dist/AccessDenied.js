import _styled from "styled-components";
import React from 'react';

var BlueDiv = _styled.div.withConfig({
  displayName: "BlueDiv",
  componentId: "gm57fw-0"
})(["background-color:#ff7110;color:", ";border:", ";"], function (props) {
  return props.theme.tfso.colors.baseLight;
}, function (props) {
  return props.hasBorder ? '1px solid #000' : 'none';
});

export default (function (props) {
  return React.createElement(BlueDiv, {
    hasBorder: false
  }, "Hei hei fra access denied");
});
//# sourceMappingURL=AccessDenied.js.map