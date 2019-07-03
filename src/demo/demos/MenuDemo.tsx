import React from 'react'
import Menu from '../../lib/layout/Menu'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import {ScreenSizeData, withScreenSize} from '../../lib/ScreenSize'
import {Button} from '@material-ui/core'

type MenuProps = {
    menuContent?: React.ReactNode
} & {
    screenSize: ScreenSizeData
}
type LayoutState = {
    menuOpen: boolean | null
}
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
        return(
            <Demo>
                <DemoTitle demoPath='MenuDemo.tsx' srcPath='Menu.tsx' >Menu</DemoTitle>
                <DemoHelp>Menu</DemoHelp>
                <DemoProps title='MenuProps'>
                    <DemoProp name='mobile' type='boolean' default='' description='runs if mobile' />
                    <DemoProp name='onClose' type='function' default='' description=''/>
                    <DemoProp name='children' type='React.ReactNode' default='' description=''/>
                    <DemoProp name='open' type='boolean' default='' description=''/>
                </DemoProps>
                <DemoProps title='MenuGroupProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='' />
                    <DemoProp name='subtitle' type='string' default='' description=''/>
                    <DemoProp name='label' type='string' default='' description=''/>
                    <DemoProp name='onToggleExpanded' type='function' default='' description=''/>
                    <DemoProp name='expanded' type='boolean' default='' description=''/>
                    <DemoProp name='children' type='React.ReactNode' default='' description=''/>
                </DemoProps>
                <DemoProps title='MenuRootItemProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='' />
                    <DemoProp name='subtitle' type='string' default='' description=''/>
                    <DemoProp name='label' type='string' default='' description=''/>
                    <DemoProp name='chipLabel' type='string' default='' description=''/>
                    <DemoProp name='chipColor' type='ChipColor' default='' description=''/>
                    <DemoProp name='selected' type='boolean' default='' description=''/>
                    <DemoProp name='href' type='string| ((content: React.ReactChild) => React.ReactChild)' default='' description=''/>
                </DemoProps>
                <DemoProps title='MenuItemProps'>
                    <DemoProp name='icon' type='React.ComponentType<SvgIconProps>' default='' description='' />
                    <DemoProp name='label' type='string' default='' description=''/>
                    <DemoProp name='chipLabel' type='string' default='' description=''/>
                    <DemoProp name='chipColor' type='warning| information' default='' description=''/>
                    <DemoProp name='selected' type='boolean' default='' description=''/>
                    <DemoProp name='href' type='string| ((content: React.ReactChild) => React.ReactChild)' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <Button onClick={this.onMenuToggle}>hide menu</Button>
                    <Menu children={[]} open={this.menuIsOpen()} onClose={this.onCloseMenu} mobile={this.props.screenSize.mobile}/>
                </DemoContent>
            </Demo>
        )
    }
})