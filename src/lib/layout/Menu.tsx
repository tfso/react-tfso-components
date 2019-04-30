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
import Chip from '@material-ui/core/Chip'
import {DefaultTheme} from 'styled-components'

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
      width: ${({open}) => open ? 240 : 0}px;
      height: 100%;
    }
    
    a, a:hover{
        text-decoration: none
    };
    
    li:focus{
     outline: none;
    }
    
    .MuiPaperStyle{
      position: static;
      background-color: ${({theme}) => theme.tfso.colors.menu};
      color: ${({theme}) => theme.tfso.colors.menuItemText};
    }
` as typeof Drawer

type ChipColor = 'success' | 'error' | 'info' | 'warning'
const getColor = (color: ChipColor, palette: DefaultTheme['tfso']['palette']) => {
    switch(color){
    case 'success': return palette.success
    case 'error': return palette.alert
    case 'info': return palette.loudInfo
    case 'warning': return palette.warning
    }
}

const ChipWrapper = ({color: ChipColor, ...props}) => <Chip {...props} />
const StyledChip = styled(ChipWrapper)`&&{
    background-color: ${({color, theme}) => getColor(color, theme.tfso.palette)};
    color: ${({color, theme}) => theme.tfso.colors.white};
    font-size: ${({theme}) => theme.mui.typography.pxToRem(10)}; 
    height: 22px;
}`

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
                <List color="inherit" disablePadding style={{paddingBottom: 100}}>
                    {this.props.children}
                </List>
            </StyledDrawer>
        )
    }
}

export const MenuContent = props => <>{props.children}</>

const ListItemSecondaryText = styled(Typography)`&&{
    color: ${({theme}) => theme.tfso.colors.grayLight};
}` as typeof Typography

export type MenuGroupProps = {
    icon: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    onToggleExpanded: () => void
    expanded: boolean
    children: React.ReactNode
    selected: boolean
}

const ListItemWrapper = ({expanded, disabled, ...props}: ListItemProps & {expanded: boolean}) => <ListItem {...props} />

const MenuGroupListItem = styled(ListItemWrapper)`&&{
    background-color: ${({theme, expanded}) => expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu};
    color: ${({selected, theme}) => selected ? theme.tfso.colors.menuItemSelectedText : theme.tfso.colors.menuItemText};
    :focus :hover, :hover {
        background-color: ${({theme}) => theme.mui.palette.action.hover};
    };
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
        children: PropTypes.node.isRequired,
        selected: PropTypes.bool
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
                <MenuGroupListItem divider={!this.props.expanded} selected={this.props.selected} expanded={this.props.expanded} button onClick={this.onToggleExpanded} disableRipple disableTouchRipple>
                    <ListItemIcon style={{marginRight: 0, color: 'inherit'}}><Icon fontSize="small"/></ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: 'inherit'}}>
                        {this.props.label}
                        <Collapse in={!this.props.expanded} timeout='auto'>
                            <ListItemSecondaryText variant='caption' noWrap>
                                {this.props.subtitle}
                            </ListItemSecondaryText>
                        </Collapse>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.onToggleExpanded} disableRipple disableTouchRipple>
                            {this.props.expanded ? <MenuGroupExpandLess /> : <MenuGroupExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </MenuGroupListItem>
                <Collapse in={this.props.expanded} timeout="auto">
                    <List dense disablePadding>
                        {this.props.children}
                    </List>
                    {this.props.expanded && <Divider />}
                </Collapse>
            </>
        )
    }
}

export type MenuRootItemProps = {
    icon: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    chipLabel?: string
    chipColor?: ChipColor
    selected: boolean
    href?: string | ((content: React.ReactChild) => React.ReactChild)
}

const RootListItem = styled(ListItem).attrs({classes: {selected: 'styled-selected'}})`&&{
    background-color: ${({theme}) => theme.tfso.colors.menu};
    color: ${({theme}) => theme.tfso.colors.menuItemText};    
    &&.styled-selected {
        background-color: ${({theme}) => theme.tfso.colors.menu};
        color: ${({theme}) => theme.tfso.colors.menuItemSelectedText};
    };
    :focus :hover, :hover {
        background-color: ${({theme}) => theme.mui.palette.action.hover};
    };
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
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        chipLabel: PropTypes.string,
        chipColor: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    }

    render(){
        const Icon = this.props.icon

        const LinkContent = (
            <RootListItem divider selected={this.props.selected} >
                <RootListItemIcon style={{marginRight: 0}}><Icon fontSize="small" color='inherit'/></RootListItemIcon>
                <ListItemText primaryTypographyProps={{color: 'inherit'}}>
                    {this.props.label}
                    <ListItemSecondaryText variant='caption' noWrap>
                        {this.props.subtitle}
                    </ListItemSecondaryText>
                </ListItemText>
                {this.props.chipLabel &&
                    <StyledChip color={this.props.chipColor} label={this.props.chipLabel}/>
                }
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
    chipLabel?: string
    chipColor?: 'warning' | 'information'
}

const NestedListItem = styled(ListItem)`&&{
    padding-left: 52px;
    background-color: ${({theme}) => theme.tfso.colors.menuExpanded};
    color: ${({selected, theme}) => selected ? theme.tfso.colors.menuItemSelectedText : theme.tfso.colors.menuItemText};
    :hover{
      background-color: ${({theme}) => theme.tfso.colors.menu}; // ${({theme}) => theme.mui.palette.action.hover};
    };
}` as typeof ListItem

const NestedListItemIcon = styled(ListItemIcon)`&&{
      color: ${({theme}) => theme.tfso.colors.menuItemText};
}` as typeof ListItemIcon

export class MenuItem extends React.PureComponent<MenuItemProps>{
    static propTypes = {
        icon: PropTypes.elementType,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        chipLabel: PropTypes.string,
        chipColor: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    }

    render(){
        const Icon = this.props.icon

        const LinkContent = (
            <NestedListItem selected={this.props.selected}>
                {Icon &&
                    <NestedListItemIcon color="inherit" style={{marginRight: 0}}><Icon fontSize="small" color={this.props.selected ? 'primary' : 'inherit'}/></NestedListItemIcon>
                }
                <ListItemText primaryTypographyProps={{color: 'inherit', noWrap: true}}>
                    {this.props.label}
                </ListItemText>
                {this.props.chipLabel &&
                    <StyledChip color={this.props.chipColor} label={this.props.chipLabel}/>
                }
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