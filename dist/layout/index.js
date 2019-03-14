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
import styled from 'styled-components/macro';
import { TopBar } from './Topbar';
import DocumentTitle from './DocumentTitle';
export { Menu } from './Menu';
export { TopBar } from './Topbar';
// Wrap everything
export var LayoutWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  flex-direction: column; // Flex header and body from top to bottom\n"], ["\n  height: 100%;\n  display: flex;\n  flex-direction: column; // Flex header and body from top to bottom\n"
    // Put topbar in here
])));
// Put topbar in here
export var LayoutHeader = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  \n"], ["\n  \n"
    // Put everything below topbar here
])));
// Put everything below topbar here
export var LayoutBody = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1; // Fill the rest of the page after header has taken its space\n  display: flex;\n"], ["\n  flex: 1; // Fill the rest of the page after header has taken its space\n  display: flex;\n"
    // Put menu here
])));
// Put menu here
export var LayoutBodyLeft = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\n"], ["\n\n"
    // Put your app here
])));
// Put your app here
export var LayoutBodyRight = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  flex: 1;\n  padding: 15px;\n"], ["\n  flex: 1;\n  padding: 15px;\n"])));
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return (React.createElement(LayoutWrapper, null,
            React.createElement(DocumentTitle, { text: this.props.docTitle }),
            React.createElement(LayoutHeader, null,
                React.createElement(TopBar, { title: this.props.title, onMenuToggle: this.props.onMenuToggle, mobileMenu: this.props.mobileMenu })),
            React.createElement(LayoutBody, null,
                React.createElement(LayoutBodyLeft, null, this.props.menu),
                React.createElement(LayoutBodyRight, null, this.props.children))));
    };
    return Layout;
}(React.Component));
export { Layout };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map