import React from 'react'
import Grid from '@material-ui/core/Grid'
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
import history from './history'
import {Location, UnregisterCallback} from 'history'
import Link from './components/Link'
import TrendingDemo from './demos/TrendingDemo'
import BigNumberDemo from './demos/BigNumberDemo'
import AlertDemo from './demos/AlertDemo'
import SearchFieldDemo from './demos/SearchFieldDemo'
import TextFieldEditorDemo from './demos/TextFieldEditorDemo'
import ConfirmationDialogDemo from './demos/ConfirmationDialogDemo'
import ListPickerDemo from './demos/ListPickerDemo'
import EmojiDemo from './demos/EmojiDemo'
import GridLayoutDemo from './demos/GridLayoutDemo'
import HoverableDemo from './demos/HoverableDemo'
import DelayDemo from './demos/DelayDemo'
import WizardDemo from './demos/WizardDemo'
import ScreenSizeDemo from './demos/ScreenSizeDemo'
import ProfileCardDemo from './demos/ProfileCardDemo'

const menuGroups = {
    home: {
        label: 'Home',
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
                component: EmojiDemo
            },
            alert: {
                label: 'Alert',
                component: AlertDemo
            },
            bignumber: {
                label: 'BigNumber',
                component: BigNumberDemo
            },
            confirmationdialog: {
                label: 'ConfirmationDialog',
                component: ConfirmationDialogDemo
            },
            listpicker: {
                label: 'ListPicker',
                component: ListPickerDemo
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
            }
        }
    },
    theme: {
        label: 'Theme',
        subtitle: 'Much Dashing',
        icon: StyleIcon,
        component: Theme
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
        icon: FontDownloadIcon
    },
    labs: {
        label: 'Labs',
        subtitle: 'Works in progress',
        icon: CodeIcon,
        items: {
            gridlayout: {
                label: 'GridLayout',
                component: GridLayoutDemo
            },
            profilecard: {
                label: 'ProfileCard',
                component: ProfileCardDemo
            }
        }
    },
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
                            {Object.keys(group.items).map(itemName => {
                                const item = group.items[itemName]
                                const selected = this.getSelected()
                                return (
                                    <layout.MenuItem
                                        key={item.label}
                                        label={item.label}
                                        selected={selected.item === itemName && selected.group === groupName}
                                        icon={item.icon}
                                        href={(content) => {
                                            return (
                                                <Link to={`/${groupName}/${itemName}`} key={itemName}>
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
                <Grid container spacing={16}>
                    <Grid item><MaterialUiLink /></Grid>
                    <Grid item><GitHubLink /></Grid>
                </Grid>
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
                title="Tfso Components"
                docTitle="Tfso Components"
            >
                {content}
            </layout.Layout>
        )
    }
}