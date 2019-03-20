import React, {Component} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
import {layout} from '../lib'

import Misc from './demos/Misc'
import Utils from './demos/Utils'
import Divider from '@material-ui/core/Divider'

const demoComponents = {
    Misc: Misc,
    Utils: Utils
}

export default class Layout extends Component<any, any>{
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
                            <ListItemIcon><PeopleIcon/></ListItemIcon>
                            <ListItemText>{demo}</ListItemText>
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
                Top menu
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
