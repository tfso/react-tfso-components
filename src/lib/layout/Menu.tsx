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
import Tooltip from '@material-ui/core/Tooltip'
import {DefaultTheme} from 'styled-components'
import {InjectedScreenSizeProps, withScreenSize} from '../ScreenSize'
import {ListPickerProps} from "../ListPicker";

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
        width: ${({open}) => open ? 240 : 0}px;
        height: 100%;
        z-index: ${props => props.theme.mui.zIndex.drawer};
    }
    
    a, a:hover{
        text-decoration: none
    };
    
    li:focus{
        outline: none;
    }
    
    .MuiPaperStyle{
        position: relative;
        background-color: ${({theme}) => theme.tfso.colors.menu};
        color: ${({theme}) => theme.tfso.colors.menuItemText};
    }
    
    .MuiPaperStyle ::-webkit-scrollbar {
        width: 7px;
        background-color: transparent;
    }
    
    .MuiPaperStyle ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(255,255,255, 0.2);
    }
    
    .MuiPaperStyle ::-webkit-scrollbar-thumb:hover{
        background-color: rgba(255,255,255, 0.5);
    }
    
    .MuiPaperStyle ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: transparent;
    }
    
` as typeof Drawer

type ChipColor = 'success' | 'error' | 'info' | 'warning'
const getColor = (color: ChipColor, palette: DefaultTheme['tfso']['palette']) => {
    switch(color){
    case 'success': return palette.success
    case 'error': return palette.alert
    case 'info': return palette.loudInfo
    case 'warning': return palette.warning
    default: return palette.loudInfo
    }
}

const ChipWrapper = ({color: ChipColor, ...props}) => <Chip {...props} />
const StyledChip = styled(ChipWrapper)`&&{
    background-color: ${({color, theme}) => getColor(color, theme.tfso.palette)};
    color: ${({theme}) => theme.tfso.colors.white};
    font-size: ${({theme}) => theme.mui.typography.pxToRem(10)}; 
    height: 22px;
}`

const StyledListItemText = styled(ListItemText)`&&{
  flex: 1; //Ie fix
}` as typeof ListItemText

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
            <StyledDrawer variant={this.props.mobile ? 'temporary' : 'persistent'} elevation={0} open={this.props.open} onClose={this.props.onClose} transitionDuration={0}>
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

const MenuIcon = styled(ListItemIcon)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    margin-right: 0;
}` as typeof ListItemIcon

export type MenuGroupProps = {
    icon: React.ComponentType<SvgIconProps>
    subtitle: string
    label: string
    onToggleExpanded: () => void
    expanded: boolean,
    children: React.ReactNode
}

const ListItemWrapper = ({expanded, ...props}: ListItemProps & {expanded: boolean}) => <ListItem {...props} />

const MenuGroupListItem = styled(ListItemWrapper)`&&{
    background-color: ${({theme, expanded}) => expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu};
    :focus {
        background-color: ${({theme, expanded}) => expanded ? theme.tfso.colors.menuExpanded : theme.tfso.colors.menu};
    }
    color: ${({theme}) => theme.tfso.colors.menuItemText};
    :focus :hover, :hover {
        background-color: ${({theme}) => theme.tfso.colors.menuItem};
    };
}` as typeof ListItemWrapper

const MenuGroupExpandLess = styled(ExpandLess)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
}` as typeof ExpandLess

const MenuGroupExpandMore = styled(ExpandMore)`&&{
    color: ${({theme}) => theme.tfso.colors.menuItemText};
}` as typeof ExpandMore

// @ts-ignore
export const MenuGroup = withScreenSize(class MenuGroup extends React.PureComponent<MenuGroupProps & InjectedScreenSizeProps>{
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
        const {expanded, subtitle, label, children, icon: Icon} = this.props
        const mobile = this.props.screenSize.mobile
        return (
            <>
                <MenuGroupListItem
                    ContainerProps={{
                        style: {
                            top: 0,
                            position: expanded ? 'sticky' : 'relative',
                            zIndex: expanded ? 1 : 'auto',
                        }
                    }}
                    divider={!expanded}
                    expanded={expanded}
                    onClick={this.onToggleExpanded}
                    button
                    disableRipple
                    disableTouchRipple
                >
                    <MenuIcon><Icon fontSize='small' /></MenuIcon>
                    <StyledListItemText primaryTypographyProps={{color: 'inherit'}}>
                        {label}
                        <Collapse in={!expanded} timeout='auto'>
                            <Tooltip title={subtitle} enterDelay={500}>
                                <ListItemSecondaryText variant='caption' noWrap>
                                    {subtitle}
                                </ListItemSecondaryText>
                            </Tooltip>
                        </Collapse>
                    </StyledListItemText>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.onToggleExpanded} disableRipple disableTouchRipple>
                            {expanded ? <MenuGroupExpandLess /> : <MenuGroupExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </MenuGroupListItem>
                <Collapse in={expanded} timeout="auto">
                    <List dense={!mobile} disablePadding>
                        {children}
                    </List>
                    {expanded && <Divider />}
                </Collapse>
            </>
        )
    }
})

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
        background-color: ${({theme}) => theme.tfso.colors.menuItem};
    };
}` as typeof ListItem

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
            <RootListItem
                style={{
                    top: 0,
                    zIndex: 1,
                }}
                divider
                button
                disableRipple
                disableTouchRipple
                selected={this.props.selected}
            >
                <MenuIcon><Icon fontSize='small' /></MenuIcon>
                <StyledListItemText primaryTypographyProps={{color: 'inherit'}}>
                    {this.props.label}
                    <ListItemSecondaryText variant='caption' noWrap>
                        {this.props.subtitle}
                    </ListItemSecondaryText>
                </StyledListItemText>
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
    :hover {
        background-color: ${({theme}) => theme.tfso.colors.menu};
    };
}` as typeof ListItem

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
                {Icon && <MenuIcon><Icon fontSize='small' /></MenuIcon>}
                <StyledListItemText primaryTypographyProps={{color: 'inherit', noWrap: true}}>
                    {this.props.label}
                </StyledListItemText>
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