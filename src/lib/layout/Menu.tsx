import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Drawer from '@material-ui/core/Drawer'
import Link from '@material-ui/core/Link'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import styled from 'styled-components/macro'
import {withWidth} from '@material-ui/core'
import {WithWidth} from '@material-ui/core/withWidth'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {SvgIconProps} from '@material-ui/core/SvgIcon'

/*
Tfso ikon
Hamburger til høyre - åpner/lukker hele menyen

Meny skjult som default på mobil
Page overlay på mobil
Meny lukkes ved klikk på mobil

MenuGroup
- icon
- label
- href
- subtitle
- expand button
- expanded true/false
- selected true/false
- children

MenuItem
- icon
- label
- href
- selected true/false

 */

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
      width: ${({open}) => open ? 240 : 0}px;
      height: 100%;
      //transition: none;
      //transform: none;
      white-space: nowrap;
      display: flex;
      overflow-x: hidden;
      background-color: ${props => props.theme.tfso.colors.baseLight5Color};
      border: none;
    }
    
    .MuiPaperStyle{
      position: static;
      overflow-x: hidden;
      background-color: ${props => props.theme.tfso.colors.baseLight5Color};
      border: none;
    }
`

export type MenuProps = {
    open: boolean
    onClose: () => void
} & WithWidth

export default withWidth()(class Menu extends React.PureComponent<MenuProps>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render(){
        const isMobile = ['xs', 'sm'].includes(this.props.width)

        return (
            <StyledDrawer variant={isMobile ? 'temporary' : 'persistent'} open={this.props.open} onClose={this.props.onClose}>
                <List>
                    {this.props.children}
                </List>
            </StyledDrawer>
        )
    }
})

export type MenuGroupProps = {
    icon?: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    selected: boolean
    href?: string | ((content: React.ReactChild) => React.ReactChild)
    onToggleExpanded: () => void
    expanded: boolean
    children: React.ReactNode
}

export class MenuGroup extends React.PureComponent<MenuGroupProps>{
    render(){
        const Icon = this.props.icon

        const LinkContent = (
            <ListItem divider={!this.props.expanded}>
                {Icon &&
                <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'secondary'}/></ListItemIcon>
                }
                <ListItemText
                    secondary={this.props.subtitle}
                    primaryTypographyProps={{color: this.props.selected ? 'primary' : 'secondary'}}
                >
                    {this.props.label}
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton onClick={this.props.onToggleExpanded}>
                        {this.props.expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )

        return (
            <>
                {typeof this.props.href === 'string'
                    ? <Link href={this.props.href}>{LinkContent}</Link>
                    : this.props.href
                        ? this.props.href(LinkContent)
                        : LinkContent
                }
                <Collapse in={this.props.expanded} timeout="auto">
                    <List>
                        {this.props.children}
                    </List>
                </Collapse>
            </>
        )
    }
}

export type MenuItemProps = {
    icon?: React.ComponentType<SvgIconProps>
    label: string
    selected: boolean
    href: string | ((content: React.ReactChild) => React.ReactChild)
}

const NestedListItem = styled(ListItem)`&&{
    padding-left: ${({theme}) => theme.mui.spacing.unit * 3}px;
}`

export class MenuItem extends React.PureComponent<MenuItemProps>{
    render(){
        const Icon = this.props.icon
        const LinkContent = (
            <NestedListItem dense>
                {Icon &&
                <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'secondary'}/></ListItemIcon>
                }
                <ListItemText primaryTypographyProps={{color: this.props.selected ? 'primary' : 'secondary'}}>{this.props.label}</ListItemText>
            </NestedListItem>
        )

        return (
            <>
                {typeof this.props.href === 'string'
                    ? <Link href={this.props.href}>{LinkContent}</Link>
                    : this.props.href(LinkContent)
                }
            </>
        )
    }
}