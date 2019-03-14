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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components/macro';
var Root = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var StyledAppBar = styled(AppBar)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n&&{\n  background: white;\n  box-shadow: none;\n  z-index: ", ";\n}\n"], ["\n&&{\n  background: white;\n  box-shadow: none;\n  z-index: ", ";\n}\n"])), function (props) { return props.theme.mui.zIndex.drawer + 1; });
var Grow = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"])));
var MenuButton = styled(IconButton)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n&&{\n  margin-left: -12px;\n  margin-right: 20px;\n}\n"], ["\n&&{\n  margin-left: -12px;\n  margin-right: 20px;\n}\n"])));
var Title = styled(Typography)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n&&{\n  display: none;\n  ", "{\n    display: block;\n  }\n}\n"], ["\n&&{\n  display: none;\n  ", "{\n    display: block;\n  }\n}\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mui.breakpoints.up('sm');
});
var SectionDesktop = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n&&{\n  display: none;\n  ", "{\n    display: flex;\n    align-items: center;\n  }\n}\n"], ["\n&&{\n  display: none;\n  ", "{\n    display: flex;\n    align-items: center;\n  }\n}\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mui.breakpoints.up('md');
});
var SectionMobile = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n&&{\n  display: flex;\n  ", "{\n    display: none;\n  }\n}\n"], ["\n&&{\n  display: flex;\n  ", "{\n    display: none;\n  }\n}\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mui.breakpoints.up('md');
});
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            mobileMoreAnchorEl: null
        };
        _this.handleMobileMenuOpen = function (event) {
            _this.setState({ mobileMoreAnchorEl: event.currentTarget });
        };
        _this.handleMobileMenuClose = function () {
            _this.setState({ mobileMoreAnchorEl: null });
        };
        return _this;
    }
    TopBar.prototype.render = function () {
        var _this = this;
        var mobileMoreAnchorEl = this.state.mobileMoreAnchorEl;
        var isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        return (React.createElement(Root, null,
            React.createElement(StyledAppBar, { position: "static", color: "default" },
                React.createElement(Toolbar, null,
                    React.createElement(MenuButton, { color: "inherit", "aria-label": "Open drawer", onClick: function (e) { return _this.props.onMenuToggle(); } },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Title, { variant: "h6", color: "inherit", noWrap: true }, this.props.title),
                    React.createElement(Grow, null),
                    React.createElement(SectionDesktop, null, this.props.children),
                    React.createElement(SectionMobile, null,
                        React.createElement(IconButton, { "aria-haspopup": "true", onClick: this.handleMobileMenuOpen, color: "inherit" },
                            React.createElement(MoreIcon, null))))),
            React.createElement(Menu, { anchorEl: mobileMoreAnchorEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isMobileMenuOpen, onClose: this.handleMobileMenuClose }, this.props.mobileMenu)));
    };
    TopBar.propTypes = {
        title: PropTypes.string.isRequired,
        mobileMenu: PropTypes.node.isRequired
    };
    return TopBar;
}(React.PureComponent));
export { TopBar };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Topbar.js.map