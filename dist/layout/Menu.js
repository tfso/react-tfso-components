import _styled from "styled-components";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import Typography from '@material-ui/core/Typography';

var StyledDrawer = _styled(Drawer).attrs({
  classes: {
    paper: 'MuiPaperStyle'
  }
}).withConfig({
  displayName: "StyledDrawer",
  componentId: "sc-1ryjcne-0"
})(["&&{width:", "px;height:100%;}.MuiPaperStyle{position:static;background-color:", ";color:", ";}"], function (_ref) {
  var open = _ref.open;
  return open ? 240 : 0;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.tfso.colors.menu;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.tfso.colors.menuItemText;
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
        color: "inherit",
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

var ListItemSecondaryText = _styled(Typography).withConfig({
  displayName: "ListItemSecondaryText",
  componentId: "sc-1ryjcne-1"
})(["&&{color:", ";}"], function (_ref4) {
  var theme = _ref4.theme;
  return theme.tfso.colors.grayLight;
});

var ListItemWrapper = function ListItemWrapper(_ref5) {
  var expanded = _ref5.expanded,
      props = _objectWithoutProperties(_ref5, ["expanded"]);

  return React.createElement(ListItem, props);
};

var MenuGroupListItem = _styled(ListItemWrapper).withConfig({
  displayName: "MenuGroupListItem",
  componentId: "sc-1ryjcne-2"
})(["&&{background-color:", ";color:", ";:focus{background-color:", ";};}"], function (_ref6) {
  var theme = _ref6.theme,
      expanded = _ref6.expanded;
  return expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.tfso.colors.menuItemText;
}, function (_ref8) {
  var theme = _ref8.theme,
      expanded = _ref8.expanded;
  return expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu;
});

var MenuGroupExpandLess = _styled(ExpandLess).withConfig({
  displayName: "MenuGroupExpandLess",
  componentId: "sc-1ryjcne-3"
})(["&&{color:", ";}"], function (_ref9) {
  var theme = _ref9.theme;
  return theme.tfso.colors.menuItemText;
});

var MenuGroupExpandMore = _styled(ExpandMore).withConfig({
  displayName: "MenuGroupExpandMore",
  componentId: "sc-1ryjcne-4"
})(["&&{color:", ";}"], function (_ref10) {
  var theme = _ref10.theme;
  return theme.tfso.colors.menuItemText;
});

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
      return React.createElement(React.Fragment, null, React.createElement(MenuGroupListItem, {
        divider: !this.props.expanded,
        expanded: this.props.expanded,
        button: true,
        onClick: this.onToggleExpanded,
        disableRipple: true,
        disableTouchRipple: true
      }, React.createElement(ListItemIcon, {
        style: {
          marginRight: 0,
          color: 'inherit'
        }
      }, React.createElement(Icon, {
        fontSize: "small"
      })), React.createElement(ListItemText, {
        primaryTypographyProps: {
          color: 'inherit'
        }
      }, this.props.label, React.createElement(Collapse, {
        in: !this.props.expanded,
        timeout: "auto"
      }, React.createElement(ListItemSecondaryText, {
        variant: "caption",
        noWrap: true
      }, this.props.subtitle))), React.createElement(ListItemSecondaryAction, null, React.createElement(IconButton, {
        onClick: this.onToggleExpanded,
        disableRipple: true,
        disableTouchRipple: true
      }, this.props.expanded ? React.createElement(MenuGroupExpandLess, null) : React.createElement(MenuGroupExpandMore, null)))), React.createElement(Collapse, {
        in: this.props.expanded,
        timeout: "auto"
      }, React.createElement(List, {
        dense: true,
        disablePadding: true
      }, this.props.children), this.props.expanded && React.createElement(Divider, null)));
    }
  }]);

  return MenuGroup;
}(React.PureComponent);

var RootListItem = _styled(ListItem).withConfig({
  displayName: "RootListItem",
  componentId: "sc-1ryjcne-5"
})(["&&{background-color:", ";color:", ";}"], function (_ref11) {
  var theme = _ref11.theme;
  return theme.tfso.colors.menu;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.tfso.colors.menuItemText;
});

var RootListItemIcon = _styled(ListItemIcon).withConfig({
  displayName: "RootListItemIcon",
  componentId: "sc-1ryjcne-6"
})(["&&{color:", ";}"], function (_ref13) {
  var theme = _ref13.theme;
  return theme.tfso.colors.menuItemText;
});

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
      var LinkContent = React.createElement(RootListItem, {
        divider: true
      }, React.createElement(RootListItemIcon, {
        style: {
          marginRight: 0
        }
      }, React.createElement(Icon, {
        fontSize: "small",
        color: this.props.selected ? 'inherit' : 'inherit'
      })), React.createElement(ListItemText, {
        primaryTypographyProps: {
          color: this.props.selected ? 'primary' : 'inherit'
        }
      }, this.props.label, React.createElement(ListItemSecondaryText, {
        variant: "caption",
        noWrap: true
      }, this.props.subtitle)));
      return React.createElement(React.Fragment, null, typeof this.props.href === 'string' ? React.createElement(Link, {
        href: this.props.href
      }, LinkContent) : this.props.href ? this.props.href(LinkContent) : LinkContent);
    }
  }]);

  return MenuRootItem;
}(React.PureComponent);

var NestedListItem = _styled(ListItem).withConfig({
  displayName: "NestedListItem",
  componentId: "sc-1ryjcne-7"
})(["&&{padding-left:52px;background-color:", ";color:", ";:hover{background-color:", ";};}"], function (_ref14) {
  var theme = _ref14.theme;
  return theme.tfso.colors.menuExpanded;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.tfso.colors.menuItemText;
}, function (_ref16) {
  var theme = _ref16.theme;
  return theme.tfso.colors.menu;
});

var NestedListItemIcon = _styled(ListItemIcon).withConfig({
  displayName: "NestedListItemIcon",
  componentId: "sc-1ryjcne-8"
})(["&&{color:", ";}"], function (_ref17) {
  var theme = _ref17.theme;
  return theme.tfso.colors.menuItemText;
});

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
      var LinkContent = React.createElement(NestedListItem, null, Icon && React.createElement(NestedListItemIcon, {
        color: "inherit",
        style: {
          marginRight: 0
        }
      }, React.createElement(Icon, {
        fontSize: "small",
        color: this.props.selected ? 'primary' : 'inherit'
      })), React.createElement(ListItemText, {
        primaryTypographyProps: {
          color: this.props.selected ? 'primary' : 'inherit'
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