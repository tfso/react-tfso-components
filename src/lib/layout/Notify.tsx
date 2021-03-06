import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import CloseIcon from '@material-ui/icons/Close'

import LinearProgress from '@material-ui/core/LinearProgress'
import Popover from '@material-ui/core/Popover'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Box from '@material-ui/core/Box'

import ScreenSize from '../ScreenSize'
import Delay from '../Delay'
import InfiniteScroll from '../InfiniteScroll'

const TransitionComponent = props => <Slide direction='down' {...props} />

const ListItemWrapper = ({read, ...props}: ListItemProps & {read?: boolean}) => <ListItem {...props as any} />
const ReadListItem = styled(ListItemWrapper)`&&{
    background-color: ${({read, theme}) => read ? 'inherit' : theme.tfso.colors.notification};
    :hover {
        background-color: ${({read, theme}) => read ? theme.mui.palette.action.hover : theme.tfso.colors.notificationHover};
    };
}`

const CustomDialogTitle = styled.div`
  display: flex;
  flex-flow: row-reverse;
  padding: 5px;
`

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
     * Callback when the user clicks the notification.
     * you should set `read` to `true` in this callback before anything else.
     */
    onClick: () => void

    /**
     * Should be either an `<Avatar>`, `<SvgIcon>` or `undefined`. Wrapped in a ListItemAvatar
     */
    avatar?: React.ReactElement

    /**
     * <Typography> formatted text, or string
     */
    children: React.ReactChild

    action?: React.ReactChild

    ContainerComponent?: ListItemProps['ContainerComponent']
}

const NotificationItem = (props: NotificationItemProps) => {
    const secondaryText = React.useMemo(() => getNotificateSecondaryText(props.date), [props.date])

    return (
        <ReadListItem
            id={props.id}
            button
            onClick={props.onClick}
            divider
            read={props.read}
            ContainerComponent={props.ContainerComponent}
        >
            {props.avatar && <ListItemAvatar>{props.avatar}</ListItemAvatar>}
            <ListItemText secondary={secondaryText}>
                {props.children}
            </ListItemText>
            {props.action && <ListItemSecondaryAction>
                {props.action}
            </ListItemSecondaryAction>}
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
    children: PropTypes.node.isRequired,
    action: PropTypes.node,
    ContainerComponent: PropTypes.any
}

export {NotificationItem}

export type NotifierProps = {
    /**
     * Number of new notifications
     */
    count: number

    /**
     * Display a loading indicator
     */
    loading?: boolean

    open: boolean

    /* function for translation */
    translate: (key: string) => string

    /**
     * Callback when the user clicked the bell and opens the list of notifications.
     * You may want to fetch new notifications here.
     * When you're done fetching data, it is your responsibility to mark all notifications as read if the notifications is still open.
     */
    onOpen: () => void

    /**
     * Invoked when the user clicks the `Mark all as read` button
     * You should set the notifications as read here.
     */
    onReadAll: () => void

    /**
     * Invoked when the user scrolled to the end of the list
     */
    onLoadMore: () => Promise<void>

    /**
     * Invoked when the list is closed.
     */
    onClose: () => void

    /**
     * Render your notifications here.
     * The children will be wrapped in a `List`component.
     * Typically a `NotificationItem`, but anything goes.
     */
    children: React.ReactNode

    /**
     * Properties for the Notification Bell icon
     */
    IconProps?: SvgIconProps
}

export default class Notifier extends React.PureComponent<NotifierProps>{
    static propTypes = {
        count: PropTypes.number.isRequired,
        loading: PropTypes.bool,
        open: PropTypes.bool.isRequired,
        translate: PropTypes.func.isRequired,
        onOpen: PropTypes.func.isRequired,
        onReadAll: PropTypes.func.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        IconProps: PropTypes.object,
    }

    _anchorEl: React.RefObject<HTMLButtonElement> = React.createRef()

    onOpen = () => {
        this.props.onOpen()
    }

    onClose = () => {
        this.props.onClose()
    }

    renderNotifyer = () => (
        <IconButton buttonRef={this._anchorEl} onClick={this.onOpen} >
            {this.props.count > 0
                ? <Badge color='error' badgeContent={this.props.count} max={9}><NotificationsActiveIcon {...this.props.IconProps} /></Badge>
                : <NotificationsNoneIcon {...this.props.IconProps} />
            }
        </IconButton>
    )

    renderToolbar = (mobile: boolean) => (
        <>
            <Toolbar variant='dense'>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography style={{flex: 1}} variant={mobile ? 'subtitle1' : 'subtitle2'} >{this.props.translate('Notifications')}</Typography>
                    <Button onClick={this.props.onReadAll} variant='text' size='small' color='primary' >
                        {this.props.translate('Mark all as read')}
                    </Button>
                </div>
            </Toolbar>
            {this.renderLoading()}
            <Divider />
        </>
    )

    renderContent(mobile: boolean){
        return (
            <InfiniteScroll height={mobile ? undefined : 500} threshold={0.2} onReachThreshold={this.props.onLoadMore}>
                <List dense={!mobile} disablePadding>
                    {this.props.children}
                </List>
            </InfiniteScroll>
        )
    }

    renderDesktop(){
        return (
            <Popover
                open={this.props.open}
                onClose={this.onClose}
                anchorEl={this._anchorEl.current}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{style: {width: 500}}}
            >
                {this.renderToolbar(false)}
                {this.renderContent(false)}
            </Popover>
        )
    }

    renderMobile(){
        return (
            <Dialog
                TransitionComponent={TransitionComponent}
                open={this.props.open}
                onClose={this.onClose}
                fullScreen
            >
                <CustomDialogTitle>
                    <IconButton href="#" size="small" onClick={this.onClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </CustomDialogTitle>
                <Box>
                    {this.renderToolbar(true)}
                </Box>
                {this.renderContent(true)}
            </Dialog>
        )
    }

    renderLoading = () => {
        const Spacer = <div style={{height: 4}} />
        return (
            this.props.loading ? (
                <Delay delayMs={200} beforeShow={Spacer}>
                    <LinearProgress color='secondary' />
                </Delay>
            ) : Spacer
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