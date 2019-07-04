import React from 'react'
import {layout} from '../lib'
import Home from './pages/Home'
import Icons from './pages/Icons'
import GitHubLink from './components/GitHubLink'
import MaterialUiLink from './components/MaterialUiLink'
import Guidelines from './pages/Guidelines'
import Theme from './pages/Theme'
import HomeIcon from '@material-ui/icons/Home'
import CodeIcon from '@material-ui/icons/Code'
import StyleIcon from '@material-ui/icons/Style'
import BuildIcon from '@material-ui/icons/Build'
import StraightenIcon from '@material-ui/icons/Straighten'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import FontDownloadIcon from '@material-ui/icons/FontDownload'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import HelpIcon from '@material-ui/icons/Help'
import history from './history'
import {Location, UnregisterCallback} from 'history'
import Link from './components/Link'
import TrendingDemo from './demos/TrendingDemo'
import BigNumberDemo from './demos/BigNumberDemo'
import ProgressBarDemo from './demos/ProgressBarDemo'
import AlertDemo from './demos/AlertDemo'
import SearchFieldDemo from './demos/SearchFieldDemo'
import TextFieldEditorDemo from './demos/TextFieldEditorDemo'
import ConfirmationDialogDemo from './demos/ConfirmationDialogDemo'
import ListPickerDemo from './demos/ListPickerDemo'
import EmojiDemo from './demos/EmojiDemo'
import AccessDeniedDemo from './demos/AccessDeniedDemo'
import BoardDemo from './demos/BoardDemo'
import HoverableDemo from './demos/HoverableDemo'
import TopbarDemo from './demos/TopbarDemo'
import DelayDemo from './demos/DelayDemo'
import WizardDemo from './demos/WizardDemo'
import ScreenSizeDemo from './demos/ScreenSizeDemo'
import ProfileCardDemo from './demos/ProfileCardDemo'
import MenuDemo from './demos/MenuDemo'
import LayoutDemo from './demos/LayoutDemo'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ScreenSize from '../lib/ScreenSize'
import ListPicker from '../lib/ListPicker'
import NotifyDemo from './demos/NotifyDemo'
import InfiniteScrollDemo from './demos/InfiniteScrollDemo'
import CardReportsDemo from './demos/CardReportsDemo'

const menuGroups = {
    home: {
        label: 'Tfso-Components',
        subtitle: 'Where magic happens',
        icon: HomeIcon,
        component: Home
    },
    guidelines: {
        label: 'Guidelines',
        subtitle: 'How to frontend',
        icon: StraightenIcon,
        component: Guidelines
    },
    components: {
        label: 'Components',
        subtitle: 'Presentational',
        icon: ViewCompactIcon,
        items: {
            emoji: {
                label: 'Emoji',
                component: EmojiDemo,
            },
            alert: {
                label: 'Alert',
                component: AlertDemo
            },
            bignumber: {
                label: 'BigNumber',
                component: BigNumberDemo
            },
            progressbar: {
                label: 'ProgressBar',
                component: ProgressBarDemo,
            },
            confirmationdialog: {
                label: 'ConfirmationDialog',
                component: ConfirmationDialogDemo,
            },
            listpicker: {
                label: 'ListPicker',
                component: ListPickerDemo,
            },
            searchfield: {
                label: 'SearchField',
                component: SearchFieldDemo
            },
            textfieldeditor: {
                label: 'TextFieldEditor',
                component: TextFieldEditorDemo
            },
            trending: {
                label: 'Trending',
                component: TrendingDemo
            },
            accessdenied: {
                label: 'AccessDenied',
                chipLabel: 'New',
                chipColor: 'success',
                component: AccessDeniedDemo
            },
            cardreport: {
                label: 'CardReport',
                chipLabel: 'New',
                chipColor: 'success',
                component: CardReportsDemo
            },
            board: {
                label: 'Board',
                chipLabel: 'New',
                chipColor: 'success',
                component: BoardDemo
            }
        }
    },
    style: {
        label: 'Style',
        subtitle: 'Much Dashing',
        icon: StyleIcon,
        items: {
            layout: {
                label: 'Layout',
                component: LayoutDemo
            },
            menu: {
                label: 'Menu',
                component: MenuDemo
            },
            notify: {
                label: 'Notify',
                component: NotifyDemo,
            },
            profilecard: {
                label: 'ProfileCard',
                component: ProfileCardDemo
            },
            theme: {
                label: 'Theme',
                component: Theme
            },
            topbar: {
                label: 'Topbar',
                component: TopbarDemo
            }
        }
    },
    utils: {
        label: 'Utils',
        subtitle: 'Utility',
        icon: BuildIcon,
        items: {
            delay: {
                label: 'Delay',
                component: DelayDemo
            },
            hoverable: {
                label: 'Hoverable',
                component: HoverableDemo
            },
            infinitescroll: {
                label: 'InfiniteScroll',
                component: InfiniteScrollDemo
            },
            wizard: {
                label: 'Wizard',
                component: WizardDemo
            },
            screensize: {
                label: 'ScreenSize',
                component: ScreenSizeDemo
            }
        }
    },
    icons: {
        label: 'Icons',
        subtitle: 'Well duh',
        component: Icons,
        icon: FontDownloadIcon,
    },
    labs: {
        label: 'Labs',
        subtitle: 'Works in progress',
        icon: CodeIcon,
        accessDenied: true,
        items: {
        }
    },
}

const identity = {
    license: '2947b4ae-0d40-447b-886f-dcd3aa11648b;693081080913543;1198',
    identity: {
        id: '2947b4ae-0d40-447b-886f-dcd3aa11648b'
    },
    client: {
        id: '693081080913543',
        name: 'Snerk og Verk Stagforretning'
    },
    user: {
        id: '1198'
    },
    profile: {
        id: '2947b4ae-0d40-447b-886f-dcd3aa11648b',
        firstName: 'Sjef',
        lastName: 'Sjefesenen',
        identifier: 'sjef@kpdemo.no',
        culture: 'nn-NO',
        language: 'NO',
        timeZone: 'Europe/Copenhagen',
        country: 'ES',
        created: '2008-08-04T09:04:36.913+00:00',
        modified: '2019-03-12T00:53:56.946+00:00',
        gender: 'Male',
        birthDate: '2018-11-20',
        location: 'Disneyland',
        locationCoordinates: '33.8120918,-117.91897419999998',
        visibility: 'Public',
        thumb: {data: 'data:image/png;base64, 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'}
    },
    locale: {
        country: 'NO',
        culture: 'nn-NO',
        language: 'NO',
        timeZoneOffset: '01:00:00',
        timeZone: 'Europe/Copenhagen'
    }
}

type LayoutState = {
    location: Location<any>
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
                                        <Link to={`/${groupName}`} key={groupName}>
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
                                                <Link to={`/${groupName}/${itemName}`} key={itemName} underline={'hover'}>
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

class ClientSwitcher extends React.PureComponent<any>{
    state = {
        open: false,
        anchorEl: null
    }

    onOpen = (e) => this.setState({open: true, anchorEl: e.currentTarget})
    onClose = () => this.setState({open: false, anchorEl: null})

    render(){
        const options = [
            {value: '1', label: 'Test 1'},
            {value: '2', label: 'Test 2'},
            {value: '3', label: 'Test 3'},
            {value: '4', label: 'Test 4'},
        ]
        return (
            <>
                <Button onClick={this.onOpen}>{this.props.clientName}</Button>
                <ListPicker
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    cancelButtonText='Cancel'
                    searchLabel='Search list'
                    onCancel={this.onClose}
                    onSelect={this.onClose}
                    options={options}
                    avatarColor={'default'}
                />
            </>
        )
    }
}

class Profile extends React.PureComponent{
    state = {
        open: false,
        anchorEl: null
    }

    onOpen = (e) => this.setState({open: true, anchorEl: e.currentTarget})
    onClose = () => this.setState({open: false, anchorEl: null})

    render(){
        return (
            <>
                <Button onClick={this.onOpen} size="small">
                    <Avatar src={identity.profile.thumb.data} />
                </Button>
                <layout.ProfileCard
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.onClose}
                    onSignOut={() => {}}
                    identity={identity}
                    translate={(key) => key}
                >
                    <ScreenSize>
                        {({mobile}) => (
                            <List dense={!mobile}>
                                <ListItem button>
                                    <ListItemText inset primary="Profile"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText inset primary="Forespørsler"/>
                                </ListItem>
                                <ListItem button divider>
                                    <Tooltip title='Profile settings'>
                                        <ListItemIcon>
                                            <SettingsIcon fontSize='small'/>
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText inset primary="Settings"/>
                                </ListItem>
                                {mobile && <ListItem divider button>
                                    <Tooltip title='Switch client'>
                                        <ListItemIcon>
                                            <SwapHorizIcon />
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ClientSwitcher clientName={identity.client.name} />
                                </ListItem>}
                                <ListItem button divider>
                                    <Tooltip title='Help me'>
                                        <ListItemIcon>
                                            <HelpIcon fontSize='small'/>
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText primary="Help"/>
                                </ListItem>
                            </List>
                        )}
                    </ScreenSize>
                </layout.ProfileCard>
            </>
        )
    }
}