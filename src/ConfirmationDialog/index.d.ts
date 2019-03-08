import React from 'react'

export type ConfirmationDialogProps = {
    open: boolean
    title?: string
    message: string
    okButtonText: string
    cancelButtonText: string
    onOk(): void
    onCancel(): void
}
declare const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps>
export default ConfirmationDialog