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
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

var SearchField =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SearchField, _React$PureComponent);

  function SearchField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchField)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      editing: false
    };

    _this.onBlur = function (e) {
      var onBlur = _this.props.onBlur;

      _this.setState({
        editing: false
      });

      onBlur && onBlur(e);
    };

    _this.onFocus = function (e) {
      var onFocus = _this.props.onFocus;

      _this.setState({
        editing: true
      });

      onFocus && onFocus(e);
    };

    return _this;
  }

  _createClass(SearchField, [{
    key: "render",
    value: function render() {
      return React.createElement(TextField // placeholder="Search"
      // margin="dense"
      , Object.assign({
        fullWidth: this.state.editing,
        InputProps: {
          startAdornment: React.createElement(InputAdornment, {
            position: "start"
          }, React.createElement(SearchIcon, {
            fontSize: "small"
          }))
        }
      }, this.props, {
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }));
    }
  }]);

  return SearchField;
}(React.PureComponent);

SearchField.defaultProps = {
  placeholder: 'Search',
  margin: 'dense',
  InputProps: {
    startAdornment: React.createElement(InputAdornment, {
      position: "start"
    }, React.createElement(SearchIcon, {
      fontSize: "small"
    }))
  }
};
export { SearchField as default };
//# sourceMappingURL=index.js.map