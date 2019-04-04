import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
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
import Divider from '@material-ui/core/Divider'

/*

Meny skjult som default på mobil
Meny lukkes ved klikk på mobil

 */

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
      width: ${({open}) => open ? 240 : 0}px;
      height: 100%;
     
    }
    
    .MuiPaperStyle{
      position: static;
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
            <StyledDrawer variant={isMobile ? 'temporary' : 'persistent'} elevation={0} open={this.props.open} onClose={this.props.onClose}>
                <List disablePadding>
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
    onToggleExpanded: () => void
    expanded: boolean
    children: React.ReactNode
}

export class MenuGroup extends React.PureComponent<MenuGroupProps>{
    render(){
        const Icon = this.props.icon
        const backgroundColor = this.props.expanded ? '#fafaf9' : 'inherit'

        const LinkContent = (
            <ListItem divider={!this.props.expanded} style={{backgroundColor}} button onClick={this.props.onToggleExpanded}>
                {Icon &&
                <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color='secondary'/></ListItemIcon>
                }
                <ListItemText
                    secondary={this.props.subtitle}
                    primaryTypographyProps={{color: 'secondary'}}
                    secondaryTypographyProps={{variant: 'caption'}}
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
                {LinkContent}
                <Collapse in={this.props.expanded} timeout="auto" style={{backgroundColor}}>
                    <List dense disablePadding>
                        {this.props.children}
                    </List>
                    <Divider />
                </Collapse>
            </>
        )
    }
}

export type MenuRootItemProps = {
    icon?: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    selected: boolean
    href?: string | ((content: React.ReactChild) => React.ReactChild)
}

export class MenuRootItem extends React.PureComponent<MenuRootItemProps>{
    render(){
        const Icon = this.props.icon

        const LinkContent = (
            <ListItem divider>
                {Icon &&
                <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'secondary'}/></ListItemIcon>
                }
                <ListItemText
                    secondary={this.props.subtitle}
                    primaryTypographyProps={{color: this.props.selected ? 'primary' : 'secondary'}}
                    secondaryTypographyProps={{variant: 'caption'}}
                >
                    {this.props.label}
                </ListItemText>
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
    padding-left: 52px;
}`

export class MenuItem extends React.PureComponent<MenuItemProps>{
    render(){
        const Icon = this.props.icon
        const LinkContent = (
            <NestedListItem>
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