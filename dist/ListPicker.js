var _temp;

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
  var data = _taggedTemplateLiteral(["&&{\n    background-color: ", ";\n    color: ", ";\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SearchField from './SearchField';
import Popover from '@material-ui/core/Popover';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withScreenSize } from './ScreenSize';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import Delay from './Delay';
var AvatarColor = styled(Avatar)(_templateObject(), function (_ref) {
  var theme = _ref.theme,
      color = _ref.color;
  return color || theme.tfso.colors.menu;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.mui.palette.primary.contrastText;
});
var CustomDialogTitle = styled.div(_templateObject2());

var TransitionComponent = function TransitionComponent(props) {
  return React.createElement(Slide, Object.assign({
    direction: "down"
  }, props));
}; // @ts-ignore


export default withScreenSize((_temp =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ListPicker, _React$PureComponent);

  function ListPicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListPicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListPicker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._inputRef = React.createRef();
    _this._listRef = React.createRef();
    _this.state = {
      filterValue: '',
      focusValue: ''
    };

    _this.onFilter = function (event) {
      _this.setState({
        filterValue: event.target.value
      });
    };

    _this.onKeyDown = function (event) {
      if (!(event && event.keyCode === 40)) {
        return;
      }

      _this._listRef.current && _this._listRef.current.focus();
    };

    _this.onSelect = function (value) {
      _this.props.onSelect(value);
    };

    _this.onClose = function () {
      _this.props.onCancel();
    };

    return _this;
  }

  _createClass(ListPicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!prevProps.open && this.props.open && !this.props.screenSize.mobile) {
        setTimeout(function () {
          _this2._inputRef.current && _this2._inputRef.current.focus();
        }, 1);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var renderLoading = function renderLoading() {
        var Spacer = React.createElement("div", {
          style: {
            height: 4
          }
        });
        return _this3.props.loading ? React.createElement(Delay, {
          delayMs: 200,
          beforeShow: Spacer
        }, React.createElement(LinearProgress, {
          color: "secondary"
        })) : Spacer;
      };

      var renderItems = React.createElement(React.Fragment, null, React.createElement(SearchField, {
        placeholder: this.props.searchLabel,
        inputRef: this._inputRef,
        onChange: this.onFilter,
        value: this.state.filterValue,
        onKeyDown: this.onKeyDown,
        fullWidth: this.props.screenSize.mobile
      }), renderLoading(), React.createElement( // @ts-ignore
      MenuList, {
        ref: this._listRef
      }, this.props.options.filter(function (option) {
        return option.label.toLowerCase().indexOf(_this3.state.filterValue.toLocaleLowerCase()) > -1 || option.value.indexOf(_this3.state.filterValue.toLocaleLowerCase()) > -1;
      }).map(function (option, i) {
        return React.createElement(MenuItem, {
          disabled: option.value === _this3.props.disabled,
          selected: option.value === _this3.props.selected,
          key: i,
          onClick: function onClick() {
            _this3.onSelect(option.value);
          }
        }, React.createElement(ListItemAvatar, null, React.createElement(AvatarColor, {
          color: _this3.props.avatarColor === 'default' ? '' : _this3.props.avatarColor
        }, React.createElement(Typography, {
          variant: "caption",
          color: "inherit"
        }, option.label.split(' ').slice(0, 3).map(function (words) {
          return words[0];
        })))), React.createElement(ListItemText, {
          primary: option.label
        }));
      })));
      var desktopDialog = React.createElement(Popover, {
        anchorEl: this.props.anchorEl,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        open: this.props.open,
        onClose: this.onClose
      }, React.createElement(DialogContent, null, renderItems));
      var mobileDialog = React.createElement(Dialog, {
        TransitionComponent: TransitionComponent,
        keepMounted: false,
        fullScreen: true,
        open: this.props.open,
        onClose: this.onClose,
        fullWidth: true,
        maxWidth: "sm"
      }, React.createElement(CustomDialogTitle, null, React.createElement(IconButton, {
        size: "small",
        onClick: this.onClose,
        "aria-label": "Close"
      }, React.createElement(CloseIcon, null))), React.createElement(Box, {
        p: 1
      }, renderItems));
      var mobile = this.props.screenSize.mobile;
      return mobile ? mobileDialog : desktopDialog;
    }
  }]);

  return ListPicker;
}(React.PureComponent), _temp));
//# sourceMappingURL=ListPicker.js.map