import React from 'react'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../components/demo'
import TfsoLoading from '../../lib/icons/TfsoLoading'
import Tfso, { TfsoIconProps } from '../../lib/icons/Tfso'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

export default class Icons extends React.PureComponent {
    render(){
        return (
            <>
                <TfsoDemo />
                <TfsoLoadingDemo />
            </>
        )
    }
}

type TfsoLogoDemoState =  {
    color: TfsoIconProps['color']
    fontSize: TfsoIconProps['fontSize']
    nativeColor: TfsoIconProps['nativeColor']
}

class TfsoDemo extends React.PureComponent<{}, TfsoLogoDemoState> {
    state:TfsoLogoDemoState = {
        color: 'primary',
        fontSize: 'large',
        nativeColor: ''
    }

    handleChange = (target: keyof TfsoLogoDemoState) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        this.setState({[target]: event.target.value} as TfsoLogoDemoState)
    }

    render(){
        return(
            <Demo>
                <DemoTitle demoPath='Icons.tsx' srcPath='icons/Tfso.tsx'>Tfso</DemoTitle>
                <DemoHelp>Tfso logo icon</DemoHelp>
                <DemoProps>
                    <DemoProp name='...' type='SvgIconProps' description='Any props will be spread to the material-ui SvgIcon'/>
                </DemoProps>
                <DemoContent>
                    <Tfso 
                        color={this.state.color} 
                        fontSize={this.state.fontSize} 
                        nativeColor={this.state.nativeColor}
                    />
                    <TextField 
                        select
                        label='color'
                        value={this.state.color}
                        onChange={this.handleChange('color')}
                        >
                        <MenuItem value='inherit' >inherit</MenuItem>
                        <MenuItem value='primary' >primary</MenuItem>
                        <MenuItem value='secondary' >secondary</MenuItem>
                        <MenuItem value='default' >default</MenuItem>
                        <MenuItem value='action' >action</MenuItem>
                        <MenuItem value='disabled' >disabled</MenuItem>
                        <MenuItem value='error' >error</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label='fontSize'
                        value={this.state.fontSize}
                        onChange={this.handleChange('fontSize')}
                        >
                        <MenuItem value='small'>small</MenuItem>
                        <MenuItem value='default'>default</MenuItem>
                        <MenuItem value='large'>large</MenuItem>

                    </TextField>
                    <TextField
                        label='nativeColor'
                        placeholder='#00B8F3'
                        value={this.state.nativeColor}
                        onChange={this.handleChange('nativeColor')}
                    />
                </DemoContent>
            </Demo>
        )
    }
}


class TfsoLoadingDemo extends React.PureComponent<{},TfsoLogoDemoState> {
    state:TfsoLogoDemoState = {
        color: 'primary',
        fontSize: 'large',
        nativeColor: ''
    }

    handleChange = (target: keyof TfsoLogoDemoState) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        this.setState({[target]: event.target.value} as TfsoLogoDemoState)
    }
    
    render(){
        return(
            <Demo>
                <DemoTitle demoPath='Icons.tsx' srcPath='icons/TfsoLoading.tsx'>Tfso Loading</DemoTitle>
                <DemoHelp>Tfso logo loading icon</DemoHelp>
                <DemoProps>
                    <DemoProp name='once' type='boolean' default='false' description='If true, the icon will animate once'/>
                    <DemoProp name='...' type='SvgIconProps' description='Any props will be spread to the material-ui SvgIcon'/>
                </DemoProps>
                <DemoContent>
                    <TfsoLoading 
                        color={this.state.color} 
                        fontSize={this.state.fontSize} 
                        nativeColor={this.state.nativeColor}
                    />
                    <TextField 
                        select
                        label='color'
                        value={this.state.color}
                        onChange={this.handleChange('color')}
                        >
                        <MenuItem value='inherit' >inherit</MenuItem>
                        <MenuItem value='primary' >primary</MenuItem>
                        <MenuItem value='secondary' >secondary</MenuItem>
                        <MenuItem value='default' >default</MenuItem>
                        <MenuItem value='action' >action</MenuItem>
                        <MenuItem value='disabled' >disabled</MenuItem>
                        <MenuItem value='error' >error</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label='fontSize'
                        value={this.state.fontSize}
                        onChange={this.handleChange('fontSize')}
                        >
                        <MenuItem value='small'>small</MenuItem>
                        <MenuItem value='default'>default</MenuItem>
                        <MenuItem value='large'>large</MenuItem>
                    </TextField>
                    <TextField
                        label='nativeColor'
                        placeholder='#00B8F3'
                        value={this.state.nativeColor}
                        onChange={this.handleChange('nativeColor')}
                    />
                </DemoContent>
            </Demo>
        )
    }
}