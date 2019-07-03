import React from 'react'
import {Demo, DemoCode, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

export default class LayoutDemo extends React.PureComponent<{}>{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='LayoutDemo.tsx' srcPath='Layout.tsx' >Layout</DemoTitle>
                <DemoHelp></DemoHelp>
                <DemoProps>
                    <DemoProp name='docTitle' type='string' description='Document title' />
                    <DemoProp name='menuContent' type='React.ReactNode' description='menu content' />
                    <DemoProp name='topMenuContent' type='React.ReactNode' description='top bar content' />
                    <DemoProp name='screenSize' type='ScreenSizeData' description='' />
                </DemoProps>
                <DemoCode language='tsx'>
                    {`
                    import React from 'react'
import {layout} from '../lib'
import Home from './pages/Home'
import Icons from './pages/Icons'
import GitHubLink from './components/GitHubLink'
import MaterialUiLink from './components/MaterialUiLink'
import Guidelines from './pages/Guidelines'
import Theme from './pages/Theme'
import HomeIcon from '@material-ui/icons/Home'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import HelpIcon from '@material-ui/icons/Help'
import history from './history'
import {Location, UnregisterCallback} from 'history'
import Link from './components/Link'
import TrendingDemo from './demos/TrendingDemo'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ScreenSize from '../lib/ScreenSize'

const menuGroups = {
    home: {
        label: 'Tfso-Components',
        subtitle: 'Where magic happens',
        icon: HomeIcon,
        component: Home
    },
    components: {
        label: 'Components',
        subtitle: 'Presentational',
        icon: ViewCompactIcon,
        items: {
            emoji: {
                label: 'Emoji',
                component: EmojiDemo,
                chipLabel: 'New',
                chipColor: 'success'
            },
        }
    },
}


type LayoutState = {
 
    menuGroupsExpanded: any
}

export default class Layout extends React.PureComponent<{}, LayoutState>{
    _unsubHistory: UnregisterCallback | null = null
    componentDidMount(){
        this.expandSelected()
        this._unsubHistory = history.listen(this.onNavigation)
    }
    componentWillUnmount(){
        this._unsubHistory && this._unsubHistory()
    }

    state: LayoutState = {
        location: history.location,
        menuGroupsExpanded: {}
    }

    onNavigation = (location: Location<any>) => {
        this.setState({location})
    }

    getSelected = () => {
        const {location: {pathname}} = this.state
        const path = pathname.slice(pathname.indexOf('#') + 2)
        const [group, item] = path.split('/')

        return {group: group || 'home', item}
    }

    expandSelected(){
        const {group} = this.getSelected()
        this.onToggleGroupExpanded(group)
    }

    onToggleGroupExpanded = (name) => {
        this.setState(state => ({
            menuGroupsExpanded: {
                ...state.menuGroupsExpanded,
                [name]: !state.menuGroupsExpanded[name]
            }
        }))
    }

    render(){
        const menuContent = (
            <layout.MenuContent>
                {Object.keys(menuGroups).map(groupName => {
                    const group = menuGroups[groupName]
                    if(group.component){
                        return (
                            <layout.MenuRootItem
                                key={group.label}
                                label={group.label}
                                selected={this.getSelected().group === groupName}
                                icon={group.icon}
                                subtitle={group.subtitle}
                                chipLabel= {group.chipLabel}
                                chipColor= {group.chipColor}
                                href={(content) => {
                                    return (
                                        <Link to={} key={groupName}>
                                            {content}
                                        </Link>
                                    )
                                }}
                            />
                        )
                    }

                    return (
                        <layout.MenuGroup
                            expanded={!!this.state.menuGroupsExpanded[groupName]}
                            key={group.label}
                            label={group.label}
                            icon={group.icon}
                            subtitle={group.subtitle}
                            onToggleExpanded={() => this.onToggleGroupExpanded(groupName)}
                        >
                            {Object.keys(group.items).sort((a, b) => a > b ? 1 : -1).map(itemName => {
                                const item = group.items[itemName]
                                const selected = this.getSelected()
                                return (
                                    <layout.MenuItem
                                        key={item.label}
                                        label={item.label}
                                        selected={selected.item === itemName && selected.group === groupName}
                                        icon={item.icon}
                                        chipLabel= {item.chipLabel}
                                        chipColor= {item.chipColor}
                                        href={(content) => {
                                            return (
                                                <Link to={} key={itemName} underline={'hover'}>
                                                    {content}
                                                </Link>
                                            )
                                        }}
                                    />
                                )
                            })}
                        </layout.MenuGroup>
                    )
                })}
            </layout.MenuContent>
        )
        const topMenuContent = (
            <layout.TopMenuContent>
                <ScreenSize>
                    {({mobile}) => (
                        mobile
                            ? null
                            : <ClientSwitcher clientName={identity.client.name} />
                    )}
                </ScreenSize>
                <div style={{padding: '4px 8px'}}><MaterialUiLink /></div>
                <div style={{padding: '4px 8px'}}><GitHubLink /></div>
                <Profile />
            </layout.TopMenuContent>
        )

        const selected = this.getSelected()
        const group = menuGroups[selected.group]

        let content: React.ReactNode = 'Not found'
        if(group.component){
            const Page = group.component
            content = <Page />
        }else if(group.items && group.items[selected.item]){
            const Page = group.items[selected.item].component
            content = <Page />
        }

        return (
            <layout.Layout
                menuContent={menuContent}
                topMenuContent={topMenuContent}
                docTitle="Tfso Components"
            >
                {content}
            </layout.Layout>
        )
    }
}

`
                    }
                </DemoCode>
            </Demo>
        )
    }
}