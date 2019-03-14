var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components/macro';
var StyledDrawer = styled(Drawer).attrs({
    classes: { paper: 'MuiPaperStyle' }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    &&{\n      width: ", "px;\n      transition: none;\n      transform: none;\n      white-space: nowrap;\n      display: flex;\n      overflow-x: hidden;\n      background-color: #CCC;\n      border: none;\n    }\n    \n    .MuiPaperStyle{\n      width: ", "px;\n      transition: none;\n      transform: none;\n      position: static;\n      overflow-x: hidden;\n      background-color: ", ";\n      border: none;\n    }\n"], ["\n    &&{\n      width: ", "px;\n      transition: none;\n      transform: none;\n      white-space: nowrap;\n      display: flex;\n      overflow-x: hidden;\n      background-color: #CCC;\n      border: none;\n    }\n    \n    .MuiPaperStyle{\n      width: ", "px;\n      transition: none;\n      transform: none;\n      position: static;\n      overflow-x: hidden;\n      background-color: ", ";\n      border: none;\n    }\n"])), function (props) { return props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1; }, function (props) { return props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1; }, function (props) { return props.theme.tfso.colors.baseLight5Color; });
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.render = function () {
        return (React.createElement(StyledDrawer, { variant: "permanent", open: this.props.open },
            React.createElement(List, null, this.props.children)));
    };
    Menu.propTypes = {
        open: PropTypes.bool.isRequired
    };
    return Menu;
}(React.PureComponent));
export { Menu };
var templateObject_1;
//# sourceMappingURL=Menu.js.map