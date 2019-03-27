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
import TextField from '@material-ui/core/TextField';

function handleEvent(event) {
  event.preventDefault();
  event.stopPropagation(); // the above only prevents other synthetic events, if we want to prevent global listeners too, we need to stop the propagation on the native event as well

  event.nativeEvent.stopImmediatePropagation();
}

var TextFieldEditor =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TextFieldEditor, _React$PureComponent);

  function TextFieldEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TextFieldEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TextFieldEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._inputRef = React.createRef();
    _this.state = {
      editing: false,
      value: _this.props.value,
      prevProps: _this.props
    };

    _this.blur = function () {
      _this._inputRef.current && _this._inputRef.current.blur();
    };

    _this.onKeyDown = function (event) {
      _this.props.onKeyDown && _this.props.onKeyDown(event);
      if (event.defaultPrevented) return;
      if (event.ctrlKey) switch (event.key) {
        case 's':
          // this event should not be 'handled' here (eg. invoke handleEvent(event)), control may want to perform other actions on ctrl+s
          // It should behave as a save changes in the control as well however
          _this.blur();

          break;

        case 'z':
          handleEvent(event);

          _this.setState({
            editing: false,
            value: _this.props.value
          }, _this.blur);

          break;

        default:
          break;
      } else switch (event.key) {
        case 'Enter':
          if (_this.props.multiline) break;
          handleEvent(event);

          _this.blur();

          break;

        case 'Escape':
          handleEvent(event);

          _this.setState({
            editing: false,
            value: _this.props.value
          }, _this.blur);

          break;

        default:
          break;
      }
    };

    _this.onFocus = function (e) {
      _this.setState({
        editing: true
      });

      _this.props.onFocus && _this.props.onFocus(e);
    };

    _this.onBlur = function (e) {
      if (!_this.state.editing) return; // The method should be safe to call multiple times, but we don't want to raise the event multiple times if we dont need to

      _this.props.onChange(_this.state.value);

      _this.setState({
        editing: false
      });

      _this.props.onBlur && _this.props.onBlur(e);
    };

    _this.onChange = function (event) {
      var value = event.target.value;

      _this.setState({
        value: value,
        editing: true
      });
    };

    return _this;
  }

  _createClass(TextFieldEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dirtyProp = _this$props.dirty,
          onChangeProp = _this$props.onChange,
          valueProp = _this$props.value,
          enableDirtyCheck = _this$props.enableDirtyCheck,
          otherProps = _objectWithoutProperties(_this$props, ["dirty", "onChange", "value", "enableDirtyCheck"]);

      var value = this.state.value;
      var isDirty = enableDirtyCheck ? this.props.value !== value || !!dirtyProp : !!dirtyProp;
      return React.createElement(TextField, Object.assign({}, otherProps, {
        inputRef: this._inputRef,
        value: value,
        onFocus: this.onFocus,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        InputProps: {
          style: {
            fontStyle: isDirty ? 'italic' : 'normal'
          }
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps;
      if (prevProps.value !== props.value) return {
        value: props.value,
        prevProps: props
      };
      return {
        prevProps: props
      };
    }
  }]);

  return TextFieldEditor;
}(React.PureComponent);

export { TextFieldEditor as default };
//# sourceMappingURL=TextFieldEditor.js.map