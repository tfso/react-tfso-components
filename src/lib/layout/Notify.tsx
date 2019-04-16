import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import CloseIcon from '@material-ui/icons/Close'
import MoreIcon from '@material-ui/icons/MoreVert'

import Avatar from '@material-ui/core/Avatar'
import Popover from '@material-ui/core/Popover'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import ListItemAvatar, { ListItemAvatarProps } from '@material-ui/core/ListItemAvatar'
import ListItemIcon, { ListItemIconProps } from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import ScreenSize from '../ScreenSize'

const TransitionComponent = props => <Slide direction='down' {...props} />

const CloseIconButton = styled(IconButton)`&&{
    position: absolute;
    right: ${({theme}) => theme.mui.spacing.unit}px;
    top: ${({theme}) => theme.mui.spacing.unit}px;
}` as typeof IconButton

const ListItemWrapper = ({read, ...props}: ListItemProps & {read?: boolean}) => <ListItem {...props} />
const ReadListItem = styled(ListItemWrapper)`&&{
    background-color: ${({read, theme}) => read ? 'inherit' : theme.tfso.colors.grayLight};
    :hover {
        background-color: ${({read, theme}) => read ? theme.mui.palette.action.hover : theme.tfso.colors.grayLighter};
    };
}`

const getNotificateSecondaryText = (date: Date) => {
    const hours = Math.floor(Math.abs(date.getTime() - Date.now()) / 3600000)
    return hours >= 24
        ? date.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'})
        : date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
}

export type NotificationItemProps = {
    /**
     * Unique identifier of the Notification.
     * Spread to the `ListItem` component.
     */
    id: string

    /**
     * Date when the notification was created.
     */
    date: Date

    /**
     * `true` when the notification has been displayed to the user.
     */
    seen?: boolean
    /**
     * `true` when the user has marked the notification as read either by:
     * - marking all notifications as read.
     * - clicking on the notification.
     */
    read?: boolean

    /**
     * Invoked when the user clicks `Mark as read` or `Mark as unread`.
     * You should persist the changes on the notification.
     * (The notification is not changed by this component)
     */
    onToggleMarkRead: () => void

    /**
     * Text to the displayed on the ToggleMarkRead button when the notification is _not_ read
     */
    toggleMarkReadTitle: string

    /**
     * Text to the displayed on the ToggleMarkRead button when the notification _is_ read
     */
    toggleMarkUnreadTitle: string

    /**
     * Callback when the user clicks the notification.
     * you should set `read` to `true` in this callback before anything else.
     */
    onClick: () => void

    /**
     * Should be either an `<Avatar>`, `<SvgIcon>` or `undefined`
     */
    avatar?: React.ReactElement

    /**
     * <Typography> formatted text, or string
     */
    children: React.ReactChild

    /**
     * Custom actions displayed in a menu when clicking the three vertical dots on the Notification
     */
    actions?: Array<{action: () => void, title: string}>
}

const NotificationItem = (props: NotificationItemProps) => {
    const anchor = React.useRef()
    const [state, setState] = React.useState({menuOpen: false})

    const onMenu = React.useCallback((menuOpen: boolean, callback?: () => void) => (event: React.SyntheticEvent) => {
        event.stopPropagation()
        setState({menuOpen})
        callback && callback()
    }, [])
    const onClickAction = React.useCallback((action: () => void) => onMenu(false, action), [onMenu])

    const secondaryText = React.useMemo(() => getNotificateSecondaryText(props.date), [props.date])
    // const AvatarWrapper = React.useMemo(() => ({children, ...innerProps}) => {
    //     return props.avatar && props.avatar!.type === 'Avatar'
    //         ? <ListItemAvatar {...innerProps}>{children}</ListItemAvatar>
    //         : <ListItemIcon {...innerProps}>{React.cloneElement(children, {style: {fontSize: 40}})}</ListItemIcon>
    // }, [props.avatar])
    return (
        <ReadListItem
            id={props.id}
            button
            onClick={props.onClick}
            divider
            read={props.read}
        >
            {props.avatar && <ListItemIcon>{props.avatar}</ListItemIcon>}
            <ListItemText secondary={secondaryText} inset>
                {props.children}
            </ListItemText>
            <Menu
                disableAutoFocusItem
                MenuListProps={{disablePadding: true}}
                open={state.menuOpen}
                anchorEl={anchor.current}
                onClose={onMenu(false)}
            >
                <MenuItem onClick={onClickAction(props.onToggleMarkRead)}>{props.read ? props.toggleMarkUnreadTitle : props.toggleMarkReadTitle}</MenuItem>
                {props.actions && props.actions
                    .map((action, i) => <MenuItem key={i} onClick={onClickAction(action.action)}>{action.title}</MenuItem>)
                }
            </Menu>
            <ListItemSecondaryAction>
                <IconButton onClick={onMenu(true)} buttonRef={anchor}>
                    <MoreIcon fontSize='small'/>
                </IconButton>
            </ListItemSecondaryAction>
        </ReadListItem>
    )
}

NotificationItem.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    seen: PropTypes.bool,
    read: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    avatar: PropTypes.node,
    onToggleMarkRead: PropTypes.func.isRequired,
    toggleMarkReadTitle: PropTypes.string.isRequired,
    toggleMarkUnreadTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
    }))
}

export {NotificationItem}

type Callback = (() => void) | (() => Promise<void>)

export type NotifierProps = {
    /**
     * Number of new notifications
     */
    count: number

    /**
     * Display a loading indicator for the entire list of notifications
     */
    loading?: boolean

    /**
     * Display a loading indicator at the bottom of the list of notifications, indicating loading of additional notifications
     */
    loadingMore?: boolean

    /**
     * Set to `true` if there are more notifications that could be fetched.
     */
    more?: boolean

    /**
     * Provided your translated value of e.g `Mark all as read`
     */
    readAllButtonText: string

    /**
     * Callback when the user clicked the bell and opens the list of notifications.
     * You may want to fetch new notifications here.
     * When the callback returns, the `onSeen` callback will be invoked
     */
    onOpen: Callback

    /**
     * Invoked after `onOpen` returns and the list is still open.
     * You should mark all notifications as seen here.
     */
    onSeen: Callback

    /**
     * Invoked when the user clicks the `Mark all as read` button
     * You should set the notifications as read here.
     */
    onReadAll: Callback

    /**
     * Invoked if `more` is `true` and the user scrolled to the end of the list
     */
    onLoadMore: Callback

    /**
     * Invoked when the list is closed.
     */
    onClose?: Callback

    /**
     * Render your notifications here.
     * The children will be wrapped in a `List`component.
     * Typically a `NotificationItem`, but anything goes.
     */
    children: React.ReactNode
}

type State = {
    open: boolean
}

export default class Notifier extends React.PureComponent<NotifierProps, State>{
    static propTypes = {
        count: PropTypes.number.isRequired,
        loading: PropTypes.bool,
        loadingMore: PropTypes.bool,
        more: PropTypes.bool,
        readAllButtonText: PropTypes.string.isRequired,
        onOpen: PropTypes.func.isRequired,
        onSeen: PropTypes.func.isRequired,
        onReadAll: PropTypes.func.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        onClose: PropTypes.func,
        children: PropTypes.node.isRequired
    }

    _anchorEl: React.RefObject<HTMLButtonElement> = React.createRef()

    state: State = {
        open: false
    }

    onOpen = async () => {
        const {onOpen, onSeen} = this.props
        this.setState({open: true})
        await onOpen()
        // If the user closed the list while fetching data in the onOpen callback, the list has not been shown yet.
        this.state.open && onSeen()
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

    renderToolbar = (mobile: boolean) => (
        <>
            <Toolbar variant={'dense'} style={{marginRight: mobile ? 32 : 0}}>
                <Grid container justify='space-between' alignItems='baseline' spacing={8} wrap='nowrap'>
                    <Grid item xs>
                        <Typography variant={mobile ? 'subtitle1' : 'subtitle2'} >Notifications</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={this.props.onReadAll} variant='text' size='small' color='primary' fullWidth>
                            {this.props.readAllButtonText}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            <Divider />
        </>
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
                {this.renderToolbar(false)}
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
                scroll={'paper'}
            >
                <DialogTitle disableTypography>
                    {this.renderToolbar(true)}
                    <CloseIconButton onClick={this.onClose}><CloseIcon /></CloseIconButton>
                </DialogTitle>
                <DialogContent>
                    <List disablePadding>{this.props.children}</List>
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
}