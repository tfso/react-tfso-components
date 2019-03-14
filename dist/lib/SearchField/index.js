var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
var SearchField = /** @class */ (function (_super) {
    __extends(SearchField, _super);
    function SearchField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editing: false
        };
        _this.onBlur = function (e) {
            var onBlur = _this.props.onBlur;
            _this.setState({ editing: false });
            onBlur && onBlur(e);
        };
        _this.onFocus = function (e) {
            var onFocus = _this.props.onFocus;
            _this.setState({ editing: true });
            onFocus && onFocus(e);
        };
        return _this;
    }
    SearchField.prototype.render = function () {
        return (React.createElement(TextField
        // placeholder="Search"
        // margin="dense"
        , __assign({ 
            // placeholder="Search"
            // margin="dense"
            fullWidth: this.state.editing, InputProps: {
                startAdornment: React.createElement(InputAdornment, { position: "start" },
                    React.createElement(SearchIcon, { fontSize: "small" })),
            } }, this.props, { onBlur: this.onBlur, onFocus: this.onFocus })));
    };
    SearchField.propTypes = TextField.propTypes;
    SearchField.defaultProps = {
        placeholder: 'Search',
        margin: 'dense',
        InputProps: { startAdornment: React.createElement(InputAdornment, { position: "start" },
                React.createElement(SearchIcon, { fontSize: "small" })) }
    };
    return SearchField;
}(React.PureComponent));
export default SearchField;
//# sourceMappingURL=index.js.map