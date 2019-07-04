import _styled from "styled-components";
import React from 'react';
import Typography from '@material-ui/core/Typography';

var Bar = _styled.div.withConfig({
  displayName: "Bar",
  componentId: "sc-80ibn9-0"
})(function (props) {
  return {
    height: '1em',
    width: '30em',
    borderRadius: '0.3em',
    background: "linear-gradient(90deg, ".concat(props.color, ");")
  };
});

var calculatePercentage = function calculatePercentage(a, b) {
  return Math.floor(a / b * 100);
};

var defaultProps = {
  color: '#6699bb'
};

var ProgressBar = function ProgressBar(_ref) {
  var name = _ref.name,
      color = _ref.color,
      currentValue = _ref.currentValue,
      targetValue = _ref.targetValue;
  return React.createElement(React.Fragment, null, React.createElement(Bar, {
    color: "".concat(color, " ").concat(calculatePercentage(currentValue, targetValue), "%, lightgrey ").concat(calculatePercentage(currentValue, targetValue), "%")
  }), React.createElement(Typography, {
    variant: "subtitle1"
  }, name, React.createElement("span", {
    style: {
      float: 'right'
    }
  }, calculatePercentage(currentValue, targetValue), "%")));
};

ProgressBar.defaultProps = defaultProps;
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map