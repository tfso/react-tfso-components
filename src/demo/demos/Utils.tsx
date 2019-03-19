import React, {Component} from 'react'
import {utils} from '../../lib'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../demo'

export default class Utils extends Component{
    render(){
        return (
            <React.Fragment>
                <DelayDemo />
            </React.Fragment>
        )
    }
}

/*
beforeShow: PropTypes.element,
        delayMs: PropTypes.number,
        show: PropTypes.bool
 */

class DelayDemo extends Component{
    render(){
        return (
            <Demo>
                <DemoTitle variant="h4">Delay</DemoTitle>
                <DemoHelp variant="caption">Shows the component inside after a set delay. Can be used to only show loaders if exceptionally slow</DemoHelp>
                <DemoProps>
                    <DemoProp name="beforeShow" type="React element or string (optional)" default="" description="What you want to show before the delay is finished" />
                    <DemoProp name="delayMs" type="Number (optional)" default="1000" description="Delay time in ms" />
                    <DemoProp name="show" type="Boolean (optional)" default="false" description="Force show content" />
                    <DemoProp name="children" type="React element" default="" description="Content to show after delay" />
                </DemoProps>
                <DemoContent>
                    <utils.Delay beforeShow="Waiting for delay...">
                        <CircularProgress />
                    </utils.Delay>
                </DemoContent>
            </Demo>
        )
    }
}