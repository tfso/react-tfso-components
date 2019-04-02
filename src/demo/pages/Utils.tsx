import React from 'react'
import {Delay, Hoverable, Wizard} from '../../lib'
import CircularProgress from '@material-ui/core/CircularProgress'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

export default class Utils extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                <DelayDemo />
                <HoverableDemo />
                <WizardDemo />
            </React.Fragment>
        )
    }
}

class DelayDemo extends React.PureComponent{
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

class HoverableDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='Utils.tsx' srcPath='Hoverable.tsx'>Hoverable</DemoTitle>
                <DemoHelp>A HOC that passes hover true/false as a render prop</DemoHelp>
                <DemoProps>
                    <DemoProp name="children" type="(hover: boolean, ref: RefObject) => ReactElement" default="" description="A function that returns a react component" />
                </DemoProps>
                <DemoContent>
                    <Hoverable>
                        {(hover) => (
                            <React.Fragment>
                                {hover
                                    ? <div key="1" style={{backgroundColor: '#6699bb', padding: 15, color: '#FFF', cursor: 'pointer'}}>You're hovering me!</div>
                                    : <div key="2" style={{padding: 15, height: '100%'}}>Hover your mouse over me</div>
                                }
                            </React.Fragment>
                        )}
                    </Hoverable>
                </DemoContent>
            </Demo>
        )
    }
}

class WizardDemo extends React.PureComponent{
    render(){
        const length = 3
        return (
            <Demo>
                <DemoTitle demoPath='Utils.tsx' srcPath='Wizard.tsx'>Wizard</DemoTitle>
                <DemoHelp>A HOC that passes an index and next/prev functions in a render prop. Can be used along with material ui stepper or any other wizard</DemoHelp>
                <DemoProps>
                    <DemoProp name="children" type="(index: number, next: function, prev: function) => ReactElement" default="" description="A function that returns a react component" />
                    <DemoProp name="index" type="number (optional)" default="" description="Force the current index to a certain value" />
                    <DemoProp name="length" type="number (optional)" default="" description="The max length. The index will always be lower than this" />
                </DemoProps>
                <DemoContent>
                    <Wizard length={length + 1}>
                        {(index, next, prev) => (
                            <React.Fragment>
                                <Stepper activeStep={index}>
                                    <Step key="Step 1">
                                        <StepLabel>Step 1</StepLabel>
                                    </Step>
                                    <Step key="Step 2">
                                        <StepLabel>Step 2</StepLabel>
                                    </Step>
                                    <Step key="Step 3">
                                        <StepLabel>Step 3</StepLabel>
                                    </Step>
                                </Stepper>
                                <div>
                                    <Button onClick={prev} disabled={index <= 0}>Prev</Button>
                                    <Button onClick={next} disabled={index >= length}>Next</Button>
                                    {index >= length && 'All steps completed!'}
                                </div>
                            </React.Fragment>
                        )}
                    </Wizard>
                </DemoContent>
            </Demo>
        )
    }
}