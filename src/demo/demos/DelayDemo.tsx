import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import {Delay} from '../../lib'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class DelayDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='Utils.tsx' srcPath='Delay.tsx'>Delay</DemoTitle>
                <DemoHelp>Shows the component inside after a set delay. Can be used to only show loaders if exceptionally slow</DemoHelp>
                <DemoProps>
                    <DemoProp name="beforeShow" type="React element or string (optional)" default="" description="What you want to show before the delay is finished" />
                    <DemoProp name="delayMs" type="Number (optional)" default="1000" description="Delay time in ms" />
                    <DemoProp name="show" type="Boolean (optional)" default="false" description="Force show content" />
                    <DemoProp name="children" type="React element" default="" description="Content to show after delay" />
                </DemoProps>
                <DemoContent>
                    <Delay beforeShow="Waiting for delay...">
                        <CircularProgress />
                    </Delay>
                </DemoContent>
            </Demo>
        )
    }
}