import React from 'react'
import Button from '@material-ui/core/Button'
import TextFieldEditor from '../../lib/TextFieldEditor'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

export default class TextFieldEditorDemo extends React.PureComponent{
    state = {
        value: 'demo',
        dirty: false,
        enableDirtyCheck: false
    }

    onReset = () => {
        this.setState({value: ''})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='TextFieldEditorDemo.tsx' srcPath='TextFieldEditor.tsx' >TextFieldEditor</DemoTitle>
                <DemoHelp>A wrapper around material-ui's TextField with some added features</DemoHelp>
                <DemoProps>
                    <DemoProp name='value' type='string' default='' description='' />
                    <DemoProp name='onChange' type='(value: string) => void' default='' description='Invoked when the user has finished editing the value (editor looses focus by clicking or tabbing away, pressing the Enter or ctrl+s' />
                    <DemoProp name='dirty' type='boolean (optional)' default='false' description='If true, it is rendered in italic after onChange' />
                    <DemoProp name='enableDirtyCheck' type='boolean (optional)' default='false' description='If true, the component will do internal dirty checking when editing' />
                    <DemoProp name='...' type='TextFieldProps' description='Any other prop is spread to the TextField' />
                </DemoProps>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography>Keybindings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <code>
                                ctrl + s:&nbsp;&nbsp;&nbsp;&nbsp;commit changes (event is NOT handled!)<br/>
                                ctrl + z:&nbsp;&nbsp;&nbsp;&nbsp;abort changes (event is handled)<br/>
                                Enter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commit changes (event is handled)<br/>
                                Escape:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;abort changes (event is handled)<br/>
                        </code>
                        <br/>
                        <i>When the event is handled `preventDefault()` and `stopPropagation()` is invoked on the `React.KeyboardEvent`</i><br/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <DemoContent>
                    <TextFieldEditor
                        value={this.state.value}
                        enableDirtyCheck={this.state.enableDirtyCheck}
                        dirty={this.state.dirty}
                        onChange={(value: string) => this.setState({value})}
                    />
                    <Button variant='outlined' onClick={() => this.setState({value: 'demo'})}>Reset</Button>
                    <Button variant='outlined' onClick={() => this.setState({dirty: !this.state.dirty})}>Dirty: {this.state.dirty.toString()}</Button>
                    <Button variant='outlined' onClick={() => this.setState({enableDirtyCheck: !this.state.enableDirtyCheck})}>Enable dirty check: {this.state.enableDirtyCheck.toString()}</Button>
                </DemoContent>
            </Demo>
        )
    }
}