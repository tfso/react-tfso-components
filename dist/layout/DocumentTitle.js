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
import { Component } from 'react';
function setTitle(text) {
    document.title = text;
}
var DocumentTitle = /** @class */ (function (_super) {
    __extends(DocumentTitle, _super);
    function DocumentTitle(props) {
        var _this = _super.call(this, props) || this;
        setTitle(props.text);
        return _this;
    }
    DocumentTitle.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.text !== this.props.text) {
            setTitle(nextProps.text);
        }
    };
    DocumentTitle.prototype.render = function () {
        return '';
    };
    return DocumentTitle;
}(Component));
export default DocumentTitle;
//# sourceMappingURL=DocumentTitle.js.map