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
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
      width: ${({open}) => open ? 240 : 0}px;
      height: 100%;
    }
    
    .MuiPaperStyle{
      position: static;
      background-color: ${({theme}) => theme.tfso.colors.menu};
      color: ${({theme}) => theme.tfso.colors.menuItemText};
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
                <List color="inherit" disablePadding>
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

const ListItemWrapper = ({expanded, ...props}: ListItemProps & {expanded: boolean}) => <ListItem {...props} />
const MenuGroupListItem = styled(ListItemWrapper)`&&{
    background-color: ${({theme, expanded}) => expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu};
    // border-bottom: 0.5px solid ${({theme, expanded}) => expanded ? theme.tfso.colors.menuExpandedDivider : 'inherit'};
    color: ${({theme}) => theme.tfso.colors.menuItemText};
}` as typeof ListItemWrapper

const MenuGroupExpandLess = styled(ExpandLess)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    
}` as typeof ExpandLess

const MenuGroupExpandMore = styled(ExpandMore)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    
}` as typeof ExpandMore

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
        return (
            <>
                <MenuGroupListItem divider expanded={this.props.expanded} button onClick={this.onToggleExpanded}>
                    <ListItemIcon style={{marginRight: 0, color: 'inherit'}}><Icon fontSize="small"/></ListItemIcon>
                    <ListItemText
                        secondary={this.props.subtitle}
                        primaryTypographyProps={{color: 'inherit'}}
                        secondaryTypographyProps={{variant: 'caption', color: 'inherit'}}
                    >
                        {this.props.label}
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.onToggleExpanded}>
                            {this.props.expanded ? <MenuGroupExpandLess /> : <MenuGroupExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </MenuGroupListItem>
                <Collapse in={this.props.expanded} timeout="auto">
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

const RootListItem = styled(ListItem)`&&{
    background-color: ${({theme}) => theme.tfso.colors.menu};
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    
}` as typeof ListItem

const RootListItemIcon = styled(ListItemIcon)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    
}` as typeof ListItemIcon

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
            <RootListItem divider>
                <RootListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'inherit' : 'inherit'}/></RootListItemIcon>
                <ListItemText
                    secondary={this.props.subtitle}
                    primaryTypographyProps={{color: this.props.selected ? 'primary' : 'inherit'}}
                    secondaryTypographyProps={{variant: 'caption', color: 'inherit'}}
                >
                    {this.props.label}
                </ListItemText>
            </RootListItem>
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
    background-color: ${({theme}) => theme.tfso.colors.menuExpanded};
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    
}` as typeof ListItem

const NestedListItemIcon = styled(ListItemIcon)`&&{
      color: ${({theme}) => theme.tfso.colors.menuItemText};
}` as typeof ListItemIcon

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
                <NestedListItemIcon color="inherit" style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'inherit'}/></NestedListItemIcon>
                }
                <ListItemText primaryTypographyProps={{color: this.props.selected ? 'primary' : 'inherit'}}>{this.props.label} </ListItemText>
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