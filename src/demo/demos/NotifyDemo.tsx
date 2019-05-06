import React from 'react'

import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import Notifier, {NotificationItem, NotificationItemProps} from '../../lib/layout/Notify'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import MoreIcon from '@material-ui/icons/MoreVert'
import MailIcon from '@material-ui/icons/Email'
import ChatIcon from '@material-ui/icons/Chat'
import KeyIcon from '@material-ui/icons/VpnKey'
import SecurityIcon from '@material-ui/icons/Security'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

type State = {
    open: boolean
    notifications: NotificationItemProps[]
    loading: boolean
    currentTarget?: any
    currentTargetNotification?: NotificationItemProps
}

export default class NotifyDemo extends React.PureComponent<{}, State>{
    constructor(props){
        super(props)

        this.state = {
            open: false,
            notifications: this.generateNotifications(),
            loading: false
        }
    }

    generateNotifications = () => {
        let key = 0
        const readCount = 3 + Math.random() * 2
        const makeItem = (children: React.ReactChild, avatar?: React.ReactElement): NotificationItemProps => {
            let date = new Date()
            date.setHours(date.getHours() - key * 12 * Math.random())
            const read = key >= readCount
            const seen = key >= 2
            const id = `${read ? 'p' : 'n'}-${key++}`
            return {
                read,
                seen: seen,
                id,
                date,
                children,
                avatar,
                onClick: () => console.log('Clicked notification', id)
            }
        }
        return [
            makeItem(<Typography>New mail from <b>verk@stag.no</b></Typography>, <Avatar style={{backgroundColor: 'magenta'}}><MailIcon /></Avatar>),
            makeItem(<Typography><b>Fru Hansen</b> sendt you a message</Typography>, <Avatar style={{backgroundColor: 'green'}}><ChatIcon /></Avatar>),
            makeItem(<Typography>Access to <b>Sagene Verk &amp; Byll</b> was granted by <b>Søstrene Hansonsen</b></Typography>, <Avatar style={{backgroundColor: 'blue'}}><KeyIcon /></Avatar>),
            makeItem(<Typography>Something may or may not have happened</Typography>, <Avatar>42</Avatar>),
            makeItem(<Typography>Acces was denied to <b>Loff på tverrstaget</b></Typography>, <Avatar style={{backgroundColor: 'purple'}}><SecurityIcon /></Avatar>),
            makeItem(<Typography><b>Kari</b> requested access to <b>Stagrapport</b></Typography>, <Avatar style={{backgroundColor: 'purple'}}><SecurityIcon /></Avatar>),
            makeItem(<Typography>Notification without avatar notifying <b>something</b></Typography>),
            makeItem(<Typography>You where notified of something that happened</Typography>, <Avatar><SupervisorAccountIcon /></Avatar>),
            makeItem(<Typography>Sometime something happened</Typography>, <Avatar>Foo</Avatar>),
            makeItem(<Typography>Access to <b>Hostekrampefabrikken</b> was granted by <b>Kols</b></Typography>, <Avatar style={{backgroundColor: 'blue'}}><KeyIcon /></Avatar>),
            makeItem(<Typography>Something definitely have happened</Typography>, <Avatar>42</Avatar>),
            makeItem(<Typography><b>Kjell Aronsen</b> requested access to <b>Tettstedet</b></Typography>, <Avatar style={{backgroundColor: 'purple'}}><SecurityIcon /></Avatar>),
            makeItem(<Typography>The watchdog service <b>los på mongotraller</b> is out of order</Typography>),
        ]
    }

    renderNotifications(){
        return this.state.notifications
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(n => <NotificationItem key={n.id} {...n} action={
                <IconButton onClick={this.onMenu(true, n)}>
                    <MoreIcon fontSize='small'/>
                </IconButton>
            } />)
    }

    onOpen = () => {
        this.setState({loading: true, open: true})
        setTimeout(() => this.setState({loading: false}, this.onSeen), 3000)
    }

    onSeen = () => {
        if(!this.state.open){
            return
        }

        this.setState(state => ({
            notifications: state.notifications.map(n => ({...n, seen: true}))
        }))
    }

    onClose = () => {
        this.setState({open: false})
    }

    onRead = (id: string) => this.setState(state => ({
        notifications: state.notifications.map(n => n.id === id ? {...n, read: !n.read} : n)
    }))

    onReadAll = () => {
        this.setState(state => ({
            notifications: state.notifications.map(n => ({...n, read: true}))
        }))
    }

    onLoadMore = async () => {
        this.setState({loading: true})
        setTimeout(() => this.setState({loading: false}, this.onSeen), 3000)
    }

    reset = () => {
        this.setState({notifications: this.generateNotifications()})
    }

    render(){
        const {currentTarget, currentTargetNotification} = this.state

        return (
            <Demo>
                <DemoTitle demoPath='NotifyDemo.tsx' srcPath='Notify.tsx'>Notify</DemoTitle>
                <DemoHelp>A Notification icon with a dropdown list of notifications</DemoHelp>
                <DemoProps title='Notifier'>
                    <DemoProp required name='count' type='number' default='' description='Number of unseen notifications'/>
                    <DemoProp name='loading' type='boolean' default='false' description='Display a loading indicator'/>
                    <DemoProp required name='open' type='boolean' default='' description='Whether the notifications list is open'/>
                    <DemoProp required name='readAllButtonText' type='' default='' description='Your translated value of e.g `Mark all as read`'/>
                    <DemoProp required name='onOpen' type='() => void' default='' description='Callback invoked when the list of notifications is opened, refresh/fetch notifications here'/>
                    <DemoProp required name='onReadAll' type='() => void' default='' description='Callback invoked when the user marks all notifications as read'/>
                    <DemoProp required name='onLoadMore' type='() => Promise<void>' default='' description='Callback invoked when the user scrolled to near the end of the list'/>
                    <DemoProp required name='onClose' type='() => void' default='' description='Callback invoked when the list is closed. Set open to false here to close the list'/>
                    <DemoProp name='IconProps' type='SvgIconProps' default='' description='Spread to the Notification Bell icon'/>
                    <DemoProp required name='children' type='React.ReactNode' default='' description='Render your NotificationItems here. The children will be wrappen in a <List>'/>
                </DemoProps>
                <DemoProps title='NotificationItem'>
                    <DemoProp required name='id' type='string' description='Unique identifier of the Notification'/>
                    <DemoProp required name='date' type='Date' description='Date when the notification was created'/>
                    <DemoProp name='seen' type='boolean' default='false' description='Whether the notification has been displayed to the user'/>
                    <DemoProp name='read' type='boolean' default='false' description='Whether the notification has been read by the user'/>
                    <DemoProp required name='onClick' type='() => void' description='Callback invoked when the user clicks the notification'/>
                    <DemoProp name='avatar' type='React.ReactElement' description='Should be either an <Avatar>, <SvgIcon> or undefined'/>
                    <DemoProp name='action' type='React.ReactChild' description='Custom action'/>
                    <DemoProp required name='children' type='React.ReactChild' description='String or HTML formatted text'/>
                </DemoProps>
                <DemoContent>
                    <Notifier
                        open={this.state.open}
                        readAllButtonText='Mark all as read'
                        count={this.state.notifications.filter(n => !n.seen).length}
                        onOpen={this.onOpen}
                        onClose={this.onClose}
                        onLoadMore={this.onLoadMore}
                        onReadAll={this.onReadAll}
                        loading={this.state.loading}
                    >
                        {this.renderNotifications()}
                    </Notifier>
                    <Button onClick={this.reset}>Reset</Button>
                    <Menu
                        disableAutoFocusItem
                        MenuListProps={{disablePadding: true}}
                        open={!!currentTarget}
                        anchorEl={currentTarget}
                        onClose={this.onMenu(false)}
                    >
                        <MenuItem onClick={
                            this.onMenuAction(() => {
                                console.log(currentTargetNotification)
                                currentTargetNotification && this.onRead(currentTargetNotification.id)
                            })
                        }>
                            {currentTargetNotification && currentTargetNotification.read ? 'Mark as unread' : 'Mark as read'}
                        </MenuItem>
                    </Menu>
                </DemoContent>
            </Demo>
        )
    }

    onMenu = (menuOpen: boolean, notification?: NotificationItemProps, callback?: () => void) => (event: React.SyntheticEvent) => {
        event.stopPropagation()
        callback && callback()
        this.setState({currentTarget: menuOpen ? event.currentTarget : undefined, currentTargetNotification: notification})
    }

    onMenuAction = (callback: () => void) => this.onMenu(false, undefined, callback)
}