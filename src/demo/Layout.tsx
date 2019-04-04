import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

import {layout} from '../lib'

import Home from './pages/Home'
import Components from './pages/Components'
import Utils from './pages/Utils'
import Icons from './pages/Icons'
import GitHubLink from './components/GitHubLink'
import MaterialUiLink from './components/MaterialUiLink'
import Guidelines from './pages/Guidelines'
import Theme from './pages/Theme'
import Lab from './pages/Lab'

import {SvgIconProps} from '@material-ui/core/SvgIcon'
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

const menuGroups = {
    main: {
        label: 'Everything',
        subtitle: 'This is all the things',
        pages: {
            Home: Home,
            Guidelines: Guidelines,
            Components: Components,
            Theme: Theme,
            Utils: Utils,
            Icons: Icons,
            Lab: Lab,
        }
    }
}

const pages = {
    Home: Home,
    Guidelines: Guidelines,
    Components: Components,
    Theme: Theme,
    Utils: Utils,
    Icons: Icons,
    Lab: Lab,
}

const pageIcon: {[P in keyof typeof pages]: React.ComponentType<SvgIconProps>} = {
    Home: HomeIcon,
    Guidelines: StraightenIcon,
    Components: ViewCompactIcon,
    Theme: StyleIcon,
    Utils: BuildIcon,
    Icons: FontDownloadIcon,
    Lab: CodeIcon,
}

type LayoutState = {
    menuOpen: boolean,
    location: Location<any>
    menuGroupsExpanded: any
}

export default class Layout extends React.PureComponent<{}, LayoutState>{
    _unsubHistory: UnregisterCallback | null = null
    componentDidMount(){
        this._unsubHistory = history.listen(this.onNavigation)
    }
    componentWillUnmount(){
        this._unsubHistory && this._unsubHistory()
    }

    state: LayoutState = {
        location: history.location,
        menuOpen: true,
        menuGroupsExpanded: {}
    }

    onNavigation = (location: Location<any>) => {
        this.setState({location})
    }

    getSelectedPageName = () => {
        const {location: {pathname}} = this.state
        const path = pathname.slice(pathname.indexOf('#') + 1)
        return Object.keys(pages).find(page => path.indexOf(page.toLowerCase()) > -1) || 'Home'
    }

    onMenuToggle = () => {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    onCloseMenu = () => this.setState({menuOpen: false})

    onToggleGroupExpanded = (name) => {
        this.setState(state => ({
            menuGroupsExpanded: {
                ...state.menuGroupsExpanded,
                [name]: !state.menuGroupsExpanded[name]
            }
        }))
    }

    render(){
        const menu = (
            <layout.Menu open={this.state.menuOpen} onClose={this.onCloseMenu}>
                {Object.keys(menuGroups).map(groupName => {
                    const group = menuGroups[groupName]

                    return (
                        <layout.MenuGroup
                            expanded={this.state.menuGroupsExpanded[groupName]}
                            label={group.label}
                            selected={false}
                            subtitle={group.subtitle}
                            onToggleExpanded={() => this.onToggleGroupExpanded(groupName)}
                        >
                            {Object.keys(group.pages).map(page => {
                                return (
                                    <layout.MenuItem
                                        label={page}
                                        selected={this.getSelectedPageName() === page}
                                        icon={pageIcon[page]}
                                        href={(content) => {
                                            return (
                                                <Link to={`/${page}`} key={page}>
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
            </layout.Menu>
        )
        const mobileMenu = (
            <layout.MobileMenu>
                Mobile menu
            </layout.MobileMenu>
        )
        const topMenu = (
            <layout.TopMenu>
                <Grid container spacing={16}>
                    <Grid item><MaterialUiLink /></Grid>
                    <Grid item><GitHubLink /></Grid>
                </Grid>
            </layout.TopMenu>
        )

        const Page = pages[this.getSelectedPageName()]

        return (
            <layout.Layout
                menu={menu}
                mobileMenu={mobileMenu}
                topMenu={topMenu}
                title="Tfso Components"
                docTitle="Tfso Components"
                onMenuToggle={this.onMenuToggle}
            >
                <Page />
            </layout.Layout>
        )
    }
}
