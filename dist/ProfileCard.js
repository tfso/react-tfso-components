import _styled from "styled-components";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PowerOffIcon from '@material-ui/icons/PowerSettingsNew';
/*export type ProfileCardProps = {

}*/

var CustomCard = _styled(Card).withConfig({
  displayName: "CustomCard",
  componentId: "sc-1wsjxq0-0"
})(["&&{}"]);

var CustomCardContent = _styled(CardContent).withConfig({
  displayName: "CustomCardContent",
  componentId: "sc-1wsjxq0-1"
})(["&&{padding:0;box-shadow:none;}"]);

var ProfileAvatar = _styled(Avatar).withConfig({
  displayName: "ProfileAvatar",
  componentId: "sc-1wsjxq0-2"
})(["backgroundColor:red"]);

var Right = _styled.div.withConfig({
  displayName: "Right",
  componentId: "sc-1wsjxq0-3"
})(["text-align:right;flex:1;"]);

var ProfileCard =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ProfileCard, _React$PureComponent);

  function ProfileCard() {
    _classCallCheck(this, ProfileCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProfileCard).apply(this, arguments));
  }

  _createClass(ProfileCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          open = _this$props.open,
          onClose = _this$props.onClose,
          anchorEl = _this$props.anchorEl;
      return React.createElement(React.Fragment, null, React.createElement(Popover, {
        open: open,
        onClose: onClose,
        anchorEl: anchorEl,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      }, React.createElement(CustomCard, null, React.createElement(CardHeader, {
        avatar: React.createElement(ProfileAvatar, {
          "aria-label": "Your name"
        }, "JS"),
        title: "Jeanette Stavsholt Gusj\xE5s",
        subheader: "jeanette.stavsholt@live.no"
      }), React.createElement(Divider, null), React.createElement(CustomCardContent, null, React.createElement(List, null, React.createElement(ListItem, null, React.createElement(ListItemText, {
        primary: "Account"
      })), React.createElement(ListItem, null, React.createElement(ListItemText, {
        primary: "Requests"
      })), React.createElement(Divider, {
        component: "hr"
      }), React.createElement(ListItem, null, React.createElement(ListItemText, {
        primary: "Stavsholt Web og Design",
        secondary: "Administration"
      })))), React.createElement(Divider, null), React.createElement(CardActions, null, React.createElement(Right, null, React.createElement(IconButton, null, React.createElement(PowerOffIcon, null)))))));
    }
  }]);

  return ProfileCard;
}(React.PureComponent);
/*ProfileCard.propTypes = {

}*/


export { ProfileCard as default };
//# sourceMappingURL=ProfileCard.js.map