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
var MobileMenu = /** @class */ (function (_super) {
    __extends(MobileMenu, _super);
    function MobileMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobileMenu.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.props.children));
    };
    return MobileMenu;
}(React.Component));
export { MobileMenu };
//# sourceMappingURL=MobileMenu.js.map