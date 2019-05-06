import React from 'react'
import styled, {DefaultTheme} from 'styled-components'
import PropTypes from 'prop-types'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import MuiSnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const bgColor = (variant: AlertVariant, palette: DefaultTheme['tfso']['palette']) => {
    switch(variant){
    case 'success': return palette.success
    case 'error': return palette.alert
    case 'info': return palette.primaryLight
    case 'warning': return palette.warning
    }
}

const SnackbarContent = ({variant, ...other}) => <MuiSnackbarContent {...other} />
const StyledSnack = styled(SnackbarContent)`&&{
    background-color: ${({variant, theme}) => bgColor(variant, theme.tfso.palette)}
}`

type AlertVariant = 'success' | 'warning' | 'error' | 'info'

export type AlertProps = {
    message: React.ReactNode
    onClose(): void
    variant: AlertVariant
}

const Alert = (props: AlertProps) => {
    const {message, onClose, variant} = props
    const Icon = variantIcon[variant]

    return (
        <StyledSnack
            variant={variant}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" style={{display: 'flex', alignItems: 'center'}}>
                    <Icon style={{fontSize: 20, opacity: 0.9, marginRight: 10}} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon fontSize='small' />
                </IconButton>
            ]}
        />
    )
}

Alert.propTypes = {
    message: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
}

export default Alert