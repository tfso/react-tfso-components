import React from 'react'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../demo'
import TfsoLoading, { TfsoLoadingIconProps } from '../../lib/icons/TfsoLoading'
import Tfso, { TfsoIconProps } from '../../lib/icons/Tfso'
import Button from '@material-ui/core/Button'

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

type TfsoDemoState =  {
    color: TfsoIconProps['color']
    fontSize: TfsoIconProps['fontSize']
}

class TfsoDemo extends React.PureComponent<{}, TfsoDemoState> {
    state:TfsoDemoState = {
        color: 'primary',
        fontSize: 'large',
    }

    render(){
        return(
            <Demo>
                <DemoTitle>Tfso</DemoTitle>
                <DemoHelp></DemoHelp>
                <DemoProps>
                    <DemoProp name='color' type='primary | secondary' default='primary' description='' />
                    <DemoProp name='...' type='SvgIconProps' description='Any props will be spread to the material-ui SvgIcon'/>
                </DemoProps>
                <DemoContent>
                    <Tfso color={this.state.color} fontSize={this.state.fontSize} />
                    <Button onClick={() => this.setState({color: this.state.color === 'primary' ? 'secondary': 'primary'})}>color {this.state.color}</Button>
                    <Button onClick={() => this.setState({fontSize: 'small'})}>fontSize small</Button>
                    <Button onClick={() => this.setState({fontSize: 'default'})}>fontSize default</Button>
                    <Button onClick={() => this.setState({fontSize: 'large'})}>fontSize large</Button>
                </DemoContent>
            </Demo>
        )
    }
}

type TfsoLoadingDemoState =  {
    color: TfsoLoadingIconProps['color']
    fontSize: TfsoLoadingIconProps['fontSize']
}

class TfsoLoadingDemo extends React.PureComponent<{},TfsoLoadingDemoState> {
    state: TfsoLoadingDemoState = {
        color: 'primary',
        fontSize: 'large',
    }
    
    render(){
        return(
            <Demo>
                <DemoTitle>Tfso Loading</DemoTitle>
                <DemoHelp></DemoHelp>
                <DemoProps>
                    <DemoProp name='color' type='primary | secondary' default='primary' description='' />
                    <DemoProp name='...' type='SvgIconProps' description='Any props will be spread to the material-ui SvgIcon'/>
                </DemoProps>
                <DemoContent>
                    <TfsoLoading color={this.state.color} fontSize={this.state.fontSize} />
                    <Button onClick={() => this.setState({color: this.state.color === 'primary' ? 'secondary': 'primary'})}>color {this.state.color}</Button>
                    <Button onClick={() => this.setState({fontSize: 'small'})}>fontSize small</Button>
                    <Button onClick={() => this.setState({fontSize: 'default'})}>fontSize default</Button>
                    <Button onClick={() => this.setState({fontSize: 'large'})}>fontSize large</Button>
                </DemoContent>
            </Demo>
        )
    }
}