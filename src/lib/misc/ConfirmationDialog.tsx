import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'

export type ConfirmationDialogProps = {
    open: boolean
    title?: string
    message: string
    okButtonText: string
    cancelButtonText: string
    onOk(): void
    onCancel(): void
}

const TransitionComponent = props => <Slide direction='up' {...props} />

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = (props: ConfirmationDialogProps) => {
    const {open, onCancel, onOk, title, message, okButtonText, cancelButtonText} = props
    return (
        <Dialog
            TransitionComponent={TransitionComponent}
            keepMounted={false}
            open={open}
            onClose={onCancel}
            maxWidth={'xs'}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">{cancelButtonText}</Button>
                <Button onClick={onOk} color="secondary">{okButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    okButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default ConfirmationDialog