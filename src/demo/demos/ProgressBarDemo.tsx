import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import TextField from '@material-ui/core/TextField'
import ProgressBar, {ProgressBarProps} from '../../lib/ProgressBar'
import Grid from '@material-ui/core/Grid'

type ProgressBarState = {
    color: ProgressBarProps['color']
    targetValue: ProgressBarProps['targetValue'],
    currentValue: ProgressBarProps['currentValue'],
    name: ProgressBarProps['name']
}

export default class ProgressBarDemo extends React.PureComponent<{}, ProgressBarState>{
    state: ProgressBarState = {
        color: '#6699bb',
        targetValue: 95,
        currentValue: 62,
        name: 'Progress'
    }

    handleChange = (key: keyof ProgressBarState) => (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({[key]: event.target.value} as any)

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ProgressBarDemo.tsx' srcPath='ProgressBar.tsx'>ProgressBar</DemoTitle>
                <DemoHelp>
                    A bar that displays progress
                </DemoHelp>
                <DemoProps>
                    <DemoProp name='targetValue' type='number' default='' description='The target value of the bar.'></DemoProp>
                    <DemoProp name='currentValue' type='number' default='' description='The current progress.'></DemoProp>
                    <DemoProp name='name' type='string' default='' description='The text below the bar.'></DemoProp>
                    <DemoProp name='color' type='string' default='#6699bb' description='The color of the bar.'></DemoProp>
                </DemoProps>
                <DemoContent>
                    <Grid container alignItems='center' spacing={32}>
                        <Grid item>
                            <ProgressBar targetValue={this.state.targetValue} currentValue={this.state.currentValue} color={this.state.color} name={this.state.name} />
                        </Grid>
                    </Grid>
                    <TextField
                        label='currentValue'
                        value={this.state.currentValue}
                        onChange={this.handleChange('currentValue')}
                    />
                    <TextField
                        label='targetValue'
                        value={this.state.targetValue}
                        onChange={this.handleChange('targetValue')}
                    />
                    <TextField
                        label='color'
                        value={this.state.color}
                        onChange={this.handleChange('color')}
                    />
                    <TextField
                        label='name'
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                </DemoContent>
            </Demo>
        )
    }
}