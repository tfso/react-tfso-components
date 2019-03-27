import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

import PeopleIcon from '@material-ui/icons/People'

import {layout} from '../lib'

import Home from './Home'
import Misc from './demos/Components'
import Utils from './demos/Utils'
import Icons from './demos/Icons'
import GitHubLink from './components/GitHubLink'
import MaterialUiLink from './components/MaterialUiLink'

const demoComponents = {
    Home: Home,
    Misc: Misc,
    Utils: Utils,
    Icons: Icons,
}

export default class Layout extends React.PureComponent<any, any> {
    state = {
        menuOpen: true,
        selectedDemo: Object.keys(demoComponents)[0]
    }

    onMenuToggle = () => {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    onChangeDemo = (selectedDemo) => this.setState({selectedDemo})

    render(){
        const menu = (
            <layout.Menu open={this.state.menuOpen}>
                {Object.keys(demoComponents).map(demo => {
                    return (
                        <ListItem key={demo} button selected={this.state.selectedDemo === demo} onClick={() => this.onChangeDemo(demo)}>
                            {/* <ListItemIcon><PeopleIcon/></ListItemIcon> */}
                            <ListItemText >{demo}</ListItemText>
                        </ListItem>
                    )
                })}

                <br />
                <Divider />

                <ListItem button>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Chip</ListItemText>
                    <Chip
                        label="Badge"
                        color="secondary"
                    />
                </ListItem>
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

        const SelectedDemo = demoComponents[this.state.selectedDemo]

        return (
            <layout.Layout
                menu={menu}
                mobileMenu={mobileMenu}
                topMenu={topMenu}
                title="Tfso Components"
                docTitle="Tfso Components"
                onMenuToggle={this.onMenuToggle}
            >
                <SelectedDemo />
            </layout.Layout>
        )
    }
}
