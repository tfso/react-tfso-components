import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

var TransitionComponent = function TransitionComponent(props) {
  return React.createElement(Slide, Object.assign({
    direction: "up"
  }, props));
};

var ConfirmationDialog = function ConfirmationDialog(props) {
  var open = props.open,
      onCancel = props.onCancel,
      onOk = props.onOk,
      title = props.title,
      message = props.message,
      okButtonText = props.okButtonText,
      cancelButtonText = props.cancelButtonText;
  return React.createElement(Dialog, {
    TransitionComponent: TransitionComponent,
    keepMounted: false,
    open: open,
    onClose: onCancel,
    maxWidth: 'xs'
  }, title && React.createElement(DialogTitle, null, title), React.createElement(DialogContent, null, message), React.createElement(DialogActions, null, React.createElement(Button, {
    onClick: onCancel,
    color: "primary"
  }, cancelButtonText), React.createElement(Button, {
    onClick: onOk,
    color: "secondary"
  }, okButtonText)));
};

export default ConfirmationDialog;
//# sourceMappingURL=ConfirmationDialog.js.map