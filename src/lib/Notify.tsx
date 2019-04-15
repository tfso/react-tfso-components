import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

import Popover from '@material-ui/core/Popover'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import ScreenSize from './ScreenSize'

const TransitionComponent = props => <Slide direction='down' {...props} />

const CloseIconButton = styled(IconButton)`&&{
    position: absolute;
    right: ${({theme}) => theme.mui.spacing.unit};
    top: ${({theme}) => theme.mui.spacing.unit};
}` as typeof IconButton

const ListItemWrapper = ({read, ...props}: ListItemProps & {read?: boolean}) => <ListItem {...props} />
const ReadListItem = styled(ListItemWrapper)`&&{
    border-left-width: thick;
    border-left-style: solid;
    border-left-color: ${({read, theme}) => read ? theme.mui.palette.background.paper : theme.tfso.palette.primaryLight};
}`

const getNotificateSecondaryText = (date: Date) => {
    const hours = Math.floor(Math.abs(date.getTime() - Date.now()) / 3600000)
    return hours >= 24
        ? date.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'})
        : date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
}

export type NotificationItemProps = {
    id: string
    date: Date
    read?: boolean
    onClick?: () => void
    /**
     * <Avatar> or <SvgIcon>
     */
    avatar: React.ReactChild
    /**
     * <Typography> formatted text, or string
     */
    children: React.ReactChild
}

const NotificationItem = (props: NotificationItemProps) => {
    return (
        <ReadListItem
            id={props.id}
            button={!!props.onClick}
            onClick={props.onClick}
            divider
            read={props.read}
        >
            {props.avatar && <ListItemAvatar>{props.avatar}</ListItemAvatar>}
            <ListItemText
                secondary={getNotificateSecondaryText(props.date)}
            >
                {props.children}
            </ListItemText>
        </ReadListItem>
    )
}

NotificationItem.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    read: PropTypes.bool,
    onClick: PropTypes.func,
    avatar: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
}

export {NotificationItem}

export type NotifierProps = {
    /**
     * Number of new notifications
     */
    count: number
    onRead: () => void
    onClose?: () => void
    children: React.ReactNode
}

type State = {
    open: boolean
}

export default class Notifier extends React.PureComponent<NotifierProps, State>{
    _anchorEl: React.RefObject<HTMLButtonElement> = React.createRef()

    state: State = {
        open: false
    }

    onOpen = () => {
        this.setState({open: true}, this.props.onRead)
    }

    onClose = () => {
        this.setState({open: false}, this.props.onClose)
    }

    renderNotifyer = () => (
        <IconButton buttonRef={this._anchorEl} onClick={this.onOpen} >
            {this.props.count > 0
                ? <Badge color='error' badgeContent={this.props.count} max={9}><NotificationsActiveIcon /></Badge>
                : <NotificationsNoneIcon />
            }
        </IconButton>
    )

    renderDesktop(){
        return (
            <Popover
                open={this.state.open}
                onClose={this.onClose}
                anchorEl={this._anchorEl.current}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <List dense disablePadding>{this.props.children}</List>
            </Popover>
        )
    }

    renderMobile(){
        return (
            <Dialog
                TransitionComponent={TransitionComponent}
                open={this.state.open}
                onClose={this.onClose}
                fullScreen
            >
                <DialogTitle disableTypography>
                    <Typography variant='h6'>Notifications</Typography>
                    <CloseIconButton onClick={this.onClose}><CloseIcon /></CloseIconButton>
                </DialogTitle>
                <DialogContent>
                    <List>{this.props.children}</List>
                </DialogContent>
            </Dialog>
        )
    }

    render(){
        return (
            <>
                {this.renderNotifyer()}
                <ScreenSize>
                    {({mobile}) => mobile ? this.renderMobile() : this.renderDesktop()}
                </ScreenSize>
            </>
        )
    }

    static propTypes = {
        count: PropTypes.number.isRequired,
        onRead: PropTypes.func.isRequired,
        onClose: PropTypes.func,
        children: PropTypes.node.isRequired
    }
}