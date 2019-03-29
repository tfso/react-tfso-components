import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

import PeopleIcon from '@material-ui/icons/People'

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

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import HomeIcon from '@material-ui/icons/Home'
import CodeIcon from '@material-ui/icons/Code'
import StyleIcon from '@material-ui/icons/Style'
import BuildIcon from '@material-ui/icons/Build'
import StraightenIcon from '@material-ui/icons/Straighten'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import FontDownloadIcon from '@material-ui/icons/FontDownload'
import history from './history';
import { Location } from 'history';
import Link from './components/Link';

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

export default class Layout extends React.PureComponent<any, any> {
    constructor(props){
        super(props)

        history.listen(this.onNavigation)
    }

    state = {
        location: history.location,
        menuOpen: true,
    }

    onNavigation = (location: Location<any> ) => {
        this.setState({location})
    }

    onMenuToggle = () => {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    render(){
        const menu = (
            <layout.Menu open={this.state.menuOpen}>
                {Object.keys(pages).map(page => {
                    const Icon = pageIcon[page]
                    return (
                        <Link to={page} key={page} >
                            <ListItem
                                selected={this.state.location.pathname.indexOf(page.toLowerCase()) > -1}
                            >
                                    <ListItemIcon><Icon/></ListItemIcon>
                                    <ListItemText >{page}</ListItemText>
                            </ListItem>
                        </Link>
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

        const { pathname } = this.state.location
        const pageName = Object.keys(pages).find(page => pathname.indexOf(page.toLowerCase()) > -1) || 'Home'
        const Page = pages[pageName]

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
