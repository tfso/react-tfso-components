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
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

var StyledDrawer = _styled(Drawer).attrs({
  classes: {
    paper: 'MuiPaperStyle'
  }
}).withConfig({
  displayName: "StyledDrawer",
  componentId: "sc-1ryjcne-0"
})(["&&{width:", "px;height:100%;}.MuiPaperStyle{position:static;}"], function (_ref) {
  var open = _ref.open;
  return open ? 240 : 0;
});

var Menu =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Menu, _React$PureComponent);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      return React.createElement(StyledDrawer, {
        variant: this.props.mobile ? 'temporary' : 'persistent',
        elevation: 0,
        open: this.props.open,
        onClose: this.props.onClose
      }, React.createElement(List, {
        disablePadding: true
      }, this.props.children));
    }
  }]);

  return Menu;
}(React.PureComponent);

export { Menu as default };
export var MenuContent = function MenuContent(props) {
  return React.createElement(React.Fragment, null, props.children);
};
export var MenuGroup =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(MenuGroup, _React$PureComponent2);

  function MenuGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MenuGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onToggleExpanded = function (e) {
      // Stop propagation to let parent layout close mobile menu on clicks that do navigation
      e.stopPropagation();

      _this.props.onToggleExpanded();
    };

    return _this;
  }

  _createClass(MenuGroup, [{
    key: "render",
    value: function render() {
      var Icon = this.props.icon;
      var backgroundColor = this.props.expanded ? '#fafaf9' : 'inherit';
      return React.createElement(React.Fragment, null, React.createElement(ListItem, {
        divider: !this.props.expanded,
        style: {
          backgroundColor: backgroundColor
        },
        button: true,
        onClick: this.onToggleExpanded
      }, React.createElement(ListItemIcon, {
        style: {
          marginRight: 0
        }
      }, React.createElement(Icon, {
        fontSize: "small",
        color: "secondary"
      })), React.createElement(ListItemText, {
        secondary: this.props.subtitle,
        primaryTypographyProps: {
          color: 'secondary'
        },
        secondaryTypographyProps: {
          variant: 'caption'
        }
      }, this.props.label), React.createElement(ListItemSecondaryAction, null, React.createElement(IconButton, {
        onClick: this.onToggleExpanded
      }, this.props.expanded ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null)))), React.createElement(Collapse, {
        in: this.props.expanded,
        timeout: "auto",
        style: {
          backgroundColor: backgroundColor
        }
      }, React.createElement(List, {
        dense: true,
        disablePadding: true
      }, this.props.children), React.createElement(Divider, null)));
    }
  }]);

  return MenuGroup;
}(React.PureComponent);
export var MenuRootItem =
/*#__PURE__*/
function (_React$PureComponent3) {
  _inherits(MenuRootItem, _React$PureComponent3);

  function MenuRootItem() {
    _classCallCheck(this, MenuRootItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuRootItem).apply(this, arguments));
  }

  _createClass(MenuRootItem, [{
    key: "render",
    value: function render() {
      var Icon = this.props.icon;
      var LinkContent = React.createElement(ListItem, {
        divider: true
      }, React.createElement(ListItemIcon, {
        style: {
          marginRight: 0
        }
      }, React.createElement(Icon, {
        fontSize: "small",
        color: this.props.selected ? 'primary' : 'secondary'
      })), React.createElement(ListItemText, {
        secondary: this.props.subtitle,
        primaryTypographyProps: {
          color: this.props.selected ? 'primary' : 'secondary'
        },
        secondaryTypographyProps: {
          variant: 'caption'
        }
      }, this.props.label));
      return React.createElement(React.Fragment, null, typeof this.props.href === 'string' ? React.createElement(Link, {
        href: this.props.href
      }, LinkContent) : this.props.href ? this.props.href(LinkContent) : LinkContent);
    }
  }]);

  return MenuRootItem;
}(React.PureComponent);

var NestedListItem = _styled(ListItem).withConfig({
  displayName: "NestedListItem",
  componentId: "sc-1ryjcne-1"
})(["&&{padding-left:52px;}"]);

export var MenuItem =
/*#__PURE__*/
function (_React$PureComponent4) {
  _inherits(MenuItem, _React$PureComponent4);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      var Icon = this.props.icon;
      var LinkContent = React.createElement(NestedListItem, null, Icon && React.createElement(ListItemIcon, {
        style: {
          marginRight: 0
        }
      }, React.createElement(Icon, {
        fontSize: "small",
        color: this.props.selected ? 'primary' : 'secondary'
      })), React.createElement(ListItemText, {
        primaryTypographyProps: {
          color: this.props.selected ? 'primary' : 'secondary'
        }
      }, this.props.label));
      return React.createElement(React.Fragment, null, typeof this.props.href === 'string' ? React.createElement(Link, {
        href: this.props.href
      }, LinkContent) : this.props.href(LinkContent));
    }
  }]);

  return MenuItem;
}(React.PureComponent);
//# sourceMappingURL=Menu.js.map