import React, {Component} from 'react'
import {utils} from '../../lib'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Demo, DemoContent, DemoHelp, DemoTitle} from '../demo'

export default class Utils extends Component{
    render(){
        return (
            <React.Fragment>
                <DelayDemo />
            </React.Fragment>
        )
    }
}

class DelayDemo extends Component{
    render(){
        return (
            <Demo>
                <DemoTitle variant="h4">Delay</DemoTitle>
                <DemoHelp variant="caption">Shows the component inside after a set delay. Can be used to only show loaders if exceptionally slow</DemoHelp>
                <DemoContent>
                    <utils.Delay beforeShow="Waiting for delay...">
                        <CircularProgress />
                    </utils.Delay>
                </DemoContent>
            </Demo>
        )
    }
}