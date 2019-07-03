import React from 'react'
import Menu, {MenuRootItem} from '../../lib/layout/Menu'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import {ScreenSizeData, withScreenSize} from '../../lib/ScreenSize'
import {Button} from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build'
import HomeIcon from '@material-ui/icons/Home'

type MenuProps = {
    screenSize: ScreenSizeData,
}
type LayoutState = {
    menuOpen: boolean | null
}

const menuItems = [{
    icon: HomeIcon,
    label: 'test',
    href: '/',
    selected: false
},
{
    icon: BuildIcon,
    label: 'test1',
    href: '/',
    selected: false

},
{
    icon: BuildIcon,
    label: 'test2',
    href: '/',
    selected: true

},
{
    icon: BuildIcon,
    label: 'test3',
    href: '/',
    selected: false

}]

export default withScreenSize(class MenuDemo extends React.PureComponent<MenuProps, LayoutState>{
    state: LayoutState = {
        menuOpen: null
    }
    onCloseMenu = () => this.setState({menuOpen: false})
    onMenuToggle = () => this.setState(state => ({menuOpen: !this.menuIsOpen()}))
    menuIsOpen(){
        if(this.state.menuOpen === null){
            return !this.props.screenSize.mobile
        }
        return this.state.menuOpen
    }
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='MenuDemo.tsx' srcPath='Menu.tsx' >Menu</DemoTitle>
                <DemoHelp>A menu that can hide and show on commando, mobile friendly</DemoHelp>
                <DemoProps title='MenuProps'>
                    <DemoProp name='mobile' type='boolean' default='' description='if mobile' />
                    <DemoProp name='onClose' type='function' default='' description='Callback invoked when the menu is closed. Set false to close it'/>
                    <DemoProp name='children' type='React.ReactNode' default='' description='Render the menuItems. the children is wrapped in a <list>'/>
                    <DemoProp name='open' type='boolean' default='' description='whether the menu open'/>
                </DemoProps>
                <DemoProps title='MenuGroupProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='wrapped in <menuIcon>' />
                    <DemoProp name='subtitle' type='string' default='' description='Secondary list item text'/>
                    <DemoProp name='label' type='string' default='' description='List item text'/>
                    <DemoProp name='onToggleExpanded' type='function' default='' description='Runs when icon(not menuIcon) gets clicked'/>
                    <DemoProp name='expanded' type='boolean' default='' description=''/>
                    <DemoProp name='children' type='React.ReactNode' default='' description='render your MenuGroupItems. the children is wrapped in a <list>'/>
                </DemoProps>
                <DemoProps title='MenuRootItemProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='menuIcon' />
                    <DemoProp name='subtitle' type='string' default='' description='Secondary list item text'/>
                    <DemoProp name='label' type='string' default='' description='list item text'/>
                    <DemoProp name='chipLabel' type='string' default='' description='Label in a chip component'/>
                    <DemoProp name='chipColor' type='ChipColor' default='' description='Color switcher'/>
                    <DemoProp name='selected' type='boolean' default='' description=''/>
                    <DemoProp name='href' type='string| ((content: React.ReactChild) => React.ReactChild)' default='' description='linked up with menuRootItems'/>
                </DemoProps>
                <DemoProps title='MenuItemProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='icon' />
                    <DemoProp name='label' type='string' default='' description='list item text'/>
                    <DemoProp name='chipLabel' type='string' default='' description='Label in a chip component'/>
                    <DemoProp name='chipColor' type='warning| information' default='' description='Color switcher'/>
                    <DemoProp name='selected' type='boolean' default='' description='makes the value'/>
                    <DemoProp name='href' type='string| ((content: React.ReactChild) => React.ReactChild)' default='' description='liked up with menuItems'/>
                </DemoProps>
                <DemoContent>
                    <Button onClick={this.onMenuToggle}>hide menu</Button>
                    <Menu
                        open={this.menuIsOpen()}
                        onClose={this.onCloseMenu}
                        mobile={this.props.screenSize.mobile}
                    >
                        {menuItems.map((menuItem) => (
                            <MenuRootItem
                                icon={menuItem.icon}
                                key={menuItem.label}
                                label={menuItem.label}
                                subtitle={menuItem.label}
                                href={menuItem.href}
                                selected={menuItem.selected}
                            />
                        ))}
                    </Menu>
                </DemoContent>
            </Demo>
        )
    }
})