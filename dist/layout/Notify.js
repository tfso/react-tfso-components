function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: row-reverse;\n  padding: 5px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["&&{\n    background-color: ", ";\n    :hover {\n        background-color: ", ";\n    };\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import styled from 'styled-components';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ScreenSize from '../ScreenSize';
import Delay from '../Delay';
import InfiniteScroll from '../InfiniteScroll';

var TransitionComponent = function TransitionComponent(props) {
  return React.createElement(Slide, Object.assign({
    direction: "down"
  }, props));
};

var ListItemWrapper = function ListItemWrapper(_ref) {
  var read = _ref.read,
      props = _objectWithoutProperties(_ref, ["read"]);

  return React.createElement(ListItem, props);
};

var ReadListItem = styled(ListItemWrapper)(_templateObject(), function (_ref2) {
  var read = _ref2.read,
      theme = _ref2.theme;
  return read ? 'inherit' : theme.tfso.colors.notification;
}, function (_ref3) {
  var read = _ref3.read,
      theme = _ref3.theme;
  return read ? theme.mui.palette.action.hover : theme.tfso.colors.notificationHover;
});
var CustomDialogTitle = styled.div(_templateObject2());

var getNotificateSecondaryText = function getNotificateSecondaryText(date) {
  var hours = Math.floor(Math.abs(date.getTime() - Date.now()) / 3600000);
  return hours >= 24 ? date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

var NotificationItem = function NotificationItem(props) {
  var secondaryText = React.useMemo(function () {
    return getNotificateSecondaryText(props.date);
  }, [props.date]);
  return React.createElement(ReadListItem, {
    id: props.id,
    button: true,
    onClick: props.onClick,
    divider: true,
    read: props.read,
    ContainerComponent: props.ContainerComponent
  }, props.avatar && React.createElement(ListItemAvatar, null, props.avatar), React.createElement(ListItemText, {
    secondary: secondaryText
  }, props.children), props.action && React.createElement(ListItemSecondaryAction, null, props.action));
};

export { NotificationItem };

var Notifier =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Notifier, _React$PureComponent);

  function Notifier() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notifier);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notifier)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._anchorEl = React.createRef();

    _this.onOpen = function () {
      _this.props.onOpen();
    };

    _this.onClose = function () {
      _this.props.onClose();
    };

    _this.renderNotifyer = function () {
      return React.createElement(IconButton, {
        buttonRef: _this._anchorEl,
        onClick: _this.onOpen
      }, _this.props.count > 0 ? React.createElement(Badge, {
        color: "error",
        badgeContent: _this.props.count,
        max: 9
      }, React.createElement(NotificationsActiveIcon, _this.props.IconProps)) : React.createElement(NotificationsNoneIcon, _this.props.IconProps));
    };

    _this.renderToolbar = function (mobile) {
      return React.createElement(React.Fragment, null, React.createElement(Toolbar, {
        variant: "dense"
      }, React.createElement(Grid, {
        container: true,
        justify: "space-between",
        alignItems: "baseline",
        spacing: 8,
        wrap: "nowrap"
      }, React.createElement(Grid, {
        item: true,
        xs: true
      }, React.createElement(Typography, {
        variant: mobile ? 'subtitle1' : 'subtitle2'
      }, _this.props.translate('Notifications'))), React.createElement(Grid, {
        item: true
      }, React.createElement(Button, {
        onClick: _this.props.onReadAll,
        variant: "text",
        size: "small",
        color: "primary",
        fullWidth: true
      }, _this.props.translate('Mark all as read'))))), _this.renderLoading(), React.createElement(Divider, null));
    };

    _this.renderLoading = function () {
      var Spacer = React.createElement("div", {
        style: {
          height: 4
        }
      });
      return _this.props.loading ? React.createElement(Delay, {
        delayMs: 200,
        beforeShow: Spacer
      }, React.createElement(LinearProgress, {
        color: "secondary"
      })) : Spacer;
    };

    return _this;
  }

  _createClass(Notifier, [{
    key: "renderContent",
    value: function renderContent(mobile) {
      return React.createElement(InfiniteScroll, {
        height: mobile ? undefined : 500,
        threshold: 0.2,
        onReachThreshold: this.props.onLoadMore
      }, React.createElement(List, {
        dense: !mobile,
        disablePadding: true
      }, this.props.children));
    }
  }, {
    key: "renderDesktop",
    value: function renderDesktop() {
      return React.createElement(Popover, {
        open: this.props.open,
        onClose: this.onClose,
        anchorEl: this._anchorEl.current,
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        PaperProps: {
          style: {
            width: 500
          }
        }
      }, this.renderToolbar(false), this.renderContent(false));
    }
  }, {
    key: "renderMobile",
    value: function renderMobile() {
      return React.createElement(Dialog, {
        TransitionComponent: TransitionComponent,
        open: this.props.open,
        onClose: this.onClose,
        fullScreen: true
      }, React.createElement(CustomDialogTitle, null, React.createElement(IconButton, {
        href: "#",
        size: "small",
        onClick: this.onClose,
        "aria-label": "Close"
      }, React.createElement(CloseIcon, null))), React.createElement(Box, null, this.renderToolbar(true)), this.renderContent(true));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(React.Fragment, null, this.renderNotifyer(), React.createElement(ScreenSize, null, function (_ref4) {
        var mobile = _ref4.mobile;
        return mobile ? _this2.renderMobile() : _this2.renderDesktop();
      }));
    }
  }]);

  return Notifier;
}(React.PureComponent);

export { Notifier as default };
//# sourceMappingURL=Notify.js.map