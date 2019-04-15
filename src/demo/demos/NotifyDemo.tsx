import React from 'react'

import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import Notifier, {NotificationItem, NotificationItemProps} from '../../lib/Notify'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

import MailIcon from '@material-ui/icons/Email'
import ChatIcon from '@material-ui/icons/Chat'
import KeyIcon from '@material-ui/icons/VpnKey'
import SecurityIcon from '@material-ui/icons/Security'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

const generateNotifications = (newCount: number) => {
    let key = 0
    const makeItem = (children: React.ReactChild, avatar: React.ReactChild): NotificationItemProps => {
        let date = new Date()
        date.setHours(date.getHours() - key * 12 * Math.random())
        const read = key >= newCount
        return {
            read,
            id: `${read ? 'p' : 'n'}-${key++}`,
            date,
            children,
            avatar,
            onClick: () => {}
        }
    }
    return [
        makeItem(<Typography>New mail from <b>verk@stag.no</b></Typography>, <MailIcon />),
        makeItem(<Typography><b>Fru Hansen</b> sendt you a message</Typography>, <ChatIcon />),
        makeItem(<Typography>Access to <b>Sagene Verk &amp; Byll</b> was granted by <b>Oslolosen</b></Typography>, <KeyIcon />),
        makeItem(<Typography><b>Kari</b> requested access to <b>Stagrapport</b></Typography>, <SecurityIcon />),
        makeItem(<Typography>You where notified of something that happened</Typography>, <SupervisorAccountIcon />),
        makeItem(<Typography>Sometime something happened</Typography>, <Avatar>Foo</Avatar>),
        makeItem(<Typography>Something may or may not have happened</Typography>, <Avatar>Bar</Avatar>),
    ]
}

type State = {
    notifications: NotificationItemProps[],
}

export default class NotifyDemo extends React.PureComponent<{}, State>{
    state: State = {
        notifications: generateNotifications(3)
    }

    renderNotifications(){
        return this.state.notifications
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(n => <NotificationItem key={n.id} {...n} />)
    }

    setNotificationsRead = () => {
        this.setState(state => ({
            notifications: state.notifications.map(n => ({...n, read: true}))
        }))
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='NotifyDemo.tsx' srcPath='Notify.tsx'>Notify</DemoTitle>
                <DemoHelp>A Notification icon with a dropdown list of notifications</DemoHelp>
                <DemoProps>
                    <DemoProp required name='' type='' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <Notifier
                        count={this.state.notifications.filter(n => !n.read).length}
                        onRead={this.setNotificationsRead}
                    >
                        {this.renderNotifications()}
                    </Notifier>
                </DemoContent>
            </Demo>
        )
    }
}