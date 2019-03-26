import React, {Component} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
import {layout} from '../lib'

import Misc from './demos/Misc'
import Utils from './demos/Utils'
import Icons from './demos/Icons'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'

const demoComponents = {
    Misc: Misc,
    Utils: Utils,
    Icons: Icons,
}

const GitHubIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </SvgIcon>
)

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
                <Link href='https://github.com/tfso/react-tfso-components'>
                    <Tooltip title='View on GitHub'>
                        <GitHubIcon fontSize='large'/>
                    </Tooltip>
                </Link>
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
