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
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
var ConfirmationDialog = function (props) {
    var open = props.open, onCancel = props.onCancel, onOk = props.onOk, title = props.title, message = props.message, okButtonText = props.okButtonText, cancelButtonText = props.cancelButtonText;
    return (React.createElement(Dialog, { TransitionComponent: function (props) { return React.createElement(Slide, __assign({ direction: 'up' }, props)); }, keepMounted: true, open: open, onClose: onCancel, maxWidth: 'xs' },
        title && React.createElement(DialogTitle, null, title),
        React.createElement(DialogContent, null, message),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onCancel, color: "primary" }, cancelButtonText),
            React.createElement(Button, { onClick: onOk, color: "secondary" }, okButtonText))));
};
ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    okButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
export default ConfirmationDialog;
//# sourceMappingURL=index.js.map