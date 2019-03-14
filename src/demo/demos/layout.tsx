import React, {Component} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
import {layout} from '../../lib'

export class MainLayout extends Component<any, any>{
    state = {
        menuOpen: true
    }
    onMenuToggle = () => {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    render(){
        const menu = (
            <layout.Menu open={this.state.menuOpen}>
                <ListItem button>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 1</ListItemText>
                    <Chip
                        label="Badge"
                        color="secondary"
                    />
                </ListItem>
                <ListItem button selected={true} onClick={() => console.log('Navigate')}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 1</ListItemText>
                </ListItem>
                <ListItem button selected={false}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 2</ListItemText>
                </ListItem>
                <ListItem button selected={false}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 3</ListItemText>
                </ListItem>
                <ListItem button selected={false}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 4</ListItemText>
                </ListItem>
                <ListItem button selected={false}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText>Menu 5</ListItemText>
                </ListItem>
            </layout.Menu>
        )
        const mobileMenu = (
            <div></div>
        )

        return (
            <layout.Layout
                menu={menu}
                mobileMenu={mobileMenu}
                title="Test"
                docTitle="Test"
                onMenuToggle={this.onMenuToggle}
            >
                {this.props.children}
            </layout.Layout>
        )
    }
}
