import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import {Wizard} from '../../lib'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'

export default class WizardDemo extends React.PureComponent{
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