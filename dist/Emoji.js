import React from 'react';
import PropTypes from 'prop-types'; // https://www.w3schools.com/charsets/ref_emoji.asp

var emojis = {
  middleFinger: React.createElement(React.Fragment, null, "\uD83D\uDD95"),
  indexFinger: React.createElement(React.Fragment, null, "\uD83D\uDC46"),
  flex: React.createElement(React.Fragment, null, "\uD83D\uDCAA"),
  brokenHeart: React.createElement(React.Fragment, null, "\uD83D\uDC94"),
  perfect: React.createElement(React.Fragment, null, "\uD83D\uDC4C"),
  thumbsUp: React.createElement(React.Fragment, null, "\uD83D\uDC4D"),
  thumbsDown: React.createElement(React.Fragment, null, "\uD83D\uDC4E"),
  clap: React.createElement(React.Fragment, null, "\uD83D\uDC4F"),
  heart: React.createElement(React.Fragment, null, "\uD83D\uDC98"),
  fire: React.createElement(React.Fragment, null, "\uD83D\uDD25"),
  bulb: React.createElement(React.Fragment, null, "\uD83D\uDCA1"),
  crap: React.createElement(React.Fragment, null, "\uD83D\uDCA9"),
  thinking: React.createElement(React.Fragment, null, "\uD83E\uDD14"),
  rocket: React.createElement(React.Fragment, null, "\uD83D\uDE80"),
  warning: React.createElement(React.Fragment, null, "\uD83D\uDEAB"),
  stopp: React.createElement(React.Fragment, null, "\uD83D\uDED1")
};

var Emoji = function Emoji(props) {
  return emojis[props.variant];
};

Emoji.propTypes = {
  variant: PropTypes.oneOf(Object.keys(emojis))
};
export default Emoji;
//# sourceMappingURL=Emoji.js.map