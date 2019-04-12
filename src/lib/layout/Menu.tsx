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
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Divider from '@material-ui/core/Divider'

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
` as typeof Drawer

export type MenuProps = {
    open: boolean
    onClose: () => void
    mobile: boolean
    children: React.ReactNode
}

export default class Menu extends React.PureComponent<MenuProps>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        mobile: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired
    }

    render(){
        return (
            <StyledDrawer variant={this.props.mobile ? 'temporary' : 'persistent'} elevation={0} open={this.props.open} onClose={this.props.onClose}>
                <List disablePadding>
                    {this.props.children}
                </List>
            </StyledDrawer>
        )
    }
}

export const MenuContent = props => <>{props.children}</>

export type MenuGroupProps = {
    icon: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    onToggleExpanded: () => void
    expanded: boolean
    children: React.ReactNode
}

export class MenuGroup extends React.PureComponent<MenuGroupProps>{
    static propTypes = {
        icon: PropTypes.elementType.isRequired,
        subtitle: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onToggleExpanded: PropTypes.func.isRequired,
        expanded: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired
    }

    onToggleExpanded = e => {
        // Stop propagation to let parent layout close mobile menu on clicks that do navigation
        e.stopPropagation()
        this.props.onToggleExpanded()
    }

    render(){
        const Icon = this.props.icon
        const backgroundColor = this.props.expanded ? '#fafaf9' : 'inherit'

        return (
            <>
                <ListItem divider={!this.props.expanded} style={{backgroundColor}} button onClick={this.onToggleExpanded}>
                    <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color='secondary'/></ListItemIcon>
                    <ListItemText
                        secondary={this.props.subtitle}
                        primaryTypographyProps={{color: 'secondary'}}
                        secondaryTypographyProps={{variant: 'caption'}}
                    >
                        {this.props.label}
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.onToggleExpanded}>
                            {this.props.expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
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
    icon: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    selected: boolean
    href?: string | ((content: React.ReactChild) => React.ReactChild)
}

export class MenuRootItem extends React.PureComponent<MenuRootItemProps>{
    static propTypes = {
        icon: PropTypes.elementType.isRequired,
        subtitle: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }

    render(){
        const Icon = this.props.icon

        const LinkContent = (
            <ListItem divider>
                <ListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'secondary'}/></ListItemIcon>
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
}` as typeof ListItem

export class MenuItem extends React.PureComponent<MenuItemProps>{
    static propTypes = {
        icon: PropTypes.elementType,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }

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