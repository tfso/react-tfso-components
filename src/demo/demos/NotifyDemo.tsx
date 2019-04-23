import React from 'react'

import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import Notifier, {NotificationItem, NotificationItemProps} from '../../lib/layout/Notify'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import MailIcon from '@material-ui/icons/Email'
import ChatIcon from '@material-ui/icons/Chat'
import KeyIcon from '@material-ui/icons/VpnKey'
import SecurityIcon from '@material-ui/icons/Security'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

type State = {
    notifications: NotificationItemProps[],
    loading: boolean
    loadingMore: boolean
}

export default class NotifyDemo extends React.PureComponent<{}, State>{
    constructor(props){
        super(props)

        this.state = {
            notifications: this.generateNotifications(),
            loading: false,
            loadingMore: false
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
                onClick: () => console.log('Clicked notification', id),
                onToggleMarkRead: this.onRead(id),
                toggleMarkReadTitle: 'Mark as read',
                toggleMarkUnreadTitle: 'Mark as unread'
            }
        }
        return [
            makeItem(<Typography>New mail from <b>verk@stag.no</b></Typography>, <MailIcon />),
            makeItem(<Typography><b>Fru Hansen</b> sendt you a message</Typography>, <ChatIcon />),
            makeItem(<Typography>Access to <b>Sagene Verk &amp; Byll</b> was granted by <b>Søstrene Hansonsen</b></Typography>, <KeyIcon />),
            makeItem(<Typography>Something may or may not have happened</Typography>, <Avatar>42</Avatar>),
            makeItem(<Typography>Acces was denied to <b>Loff på tverrstaget</b></Typography>, <SecurityIcon />),
            makeItem(<Typography><b>Kari</b> requested access to <b>Stagrapport</b></Typography>, <SecurityIcon />),
            makeItem(<Typography>Notification without avatar notifying <b>something</b></Typography>),
            makeItem(<Typography>You where notified of something that happened</Typography>, <SupervisorAccountIcon />),
            makeItem(<Typography>Sometime something happened</Typography>, <Avatar>Foo</Avatar>),
            makeItem(<Typography>Access to <b>Hostekrampefabrikken</b> was granted by <b>Kols</b></Typography>, <KeyIcon />),
            makeItem(<Typography>Something definitely have happened</Typography>, <Avatar>42</Avatar>),
            makeItem(<Typography><b>Kjell Aronsen</b> requested access to <b>Tettstedet</b></Typography>, <SecurityIcon />),
            makeItem(<Typography>The watchdog service <b>los på mongotraller</b> is out of order</Typography>),
        ]
    }

    renderNotifications(){
        return this.state.notifications
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(n => <NotificationItem key={n.id} {...n} />)
    }

    onOpen = () => {
        this.setState({loading: true})
        setTimeout(() => this.setState({loading: false}), 3000)
    }

    onSeen = () => {
        this.setState(state => ({
            notifications: state.notifications.map(n => ({...n, seen: true}))
        }))
    }

    onRead = (id: string) => () => this.setState(state => ({
        notifications: state.notifications.map(n => n.id === id ? {...n, read: !n.read} : n)
    }))

    onReadAll = () => {
        this.setState(state => ({
            notifications: state.notifications.map(n => ({...n, read: true}))
        }))
    }

    onLoadMore = async (startIndex: number, stopIndex: number) => {
        this.setState({loadingMore: true})
        setTimeout(() => this.setState({loadingMore: false}), 3000)
    }

    isItemLoaded = (index: number) => {
        return index < this.state.notifications.length
    }

    reset = () => {
        this.setState({notifications: this.generateNotifications()})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='NotifyDemo.tsx' srcPath='Notify.tsx'>Notify</DemoTitle>
                <DemoHelp>A Notification icon with a dropdown list of notifications</DemoHelp>
                <DemoProps title='Notifier'>
                    <DemoProp required name='' type='' default='' description=''/>
                </DemoProps>
                <DemoProps title='NotificationItem'>
                    <DemoProp required name='' type='' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <Notifier
                        readAllButtonText='Mark all as read'
                        count={this.state.notifications.filter(n => !n.seen).length}
                        onOpen={this.onOpen}
                        onLoadMore={this.onLoadMore}
                        onSeen={this.onSeen}
                        onReadAll={this.onReadAll}
                        loading={this.state.loading}
                        loadingMore={this.state.loadingMore}
                        isItemLoaded={this.isItemLoaded}
                    >
                        {this.renderNotifications()}
                    </Notifier>
                    <Button onClick={this.reset}>Reset</Button>
                </DemoContent>
            </Demo>
        )
    }
}