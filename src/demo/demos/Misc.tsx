import React from 'react'
import Button from '@material-ui/core/Button'
import { misc } from '../../lib'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../demo'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import { AlertProps } from '../../lib/misc/Alert';

export default class Misc extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                <AlertDemo />
                <ConfirmationDialogDemo />
                <SearchFieldDemo />
                <TextFieldEditorDemo />
            </React.Fragment>
        )
    }
}

const variantMessage: {[P in AlertProps['variant']]: string } = {
    success: 'GRATE SUCCÉSS!',
    info: 'Informational information',
    warning: 'You better not do that, Brian',
    error: 'That failed horribly...',
}

class AlertDemo extends React.PureComponent<{}, {variant: AlertProps['variant'], message: string, open: boolean}> {
    state = {
        variant: 'success' as AlertProps['variant'],
        open: false,
        message: 'GRATE SUCCÉSS!'
    }

    onClose = () => this.setState({open: false})

    onPress = (variant: AlertProps['variant']) => { 
        const message = variantMessage[variant]
        return () => this.setState({ open: true, message, variant})
    }

    render(){
        return(
            <Demo>
                <DemoTitle>Alert</DemoTitle>
                <DemoHelp>An dismissable alert-box that can be used in a SnackBar or as a standard component in a page</DemoHelp>
                <DemoProps>
                    <DemoProp name='message' type='string | ReactNode' description='The message string or Element to be displayed' />
                    <DemoProp name='variant' type='success | error | info | warning' description='The variant of the alert. Icon and background-color is selected based on the variant' />
                    <DemoProp name='onClose' type='() => void' description='Callback function invoked when the alert is dismissed' />
                </DemoProps>
                <DemoContent>
                    <Snackbar
                        open={this.state.open}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        autoHideDuration={2000}
                        onClose={this.onClose}
                    >
                        <misc.Alert
                            onClose={this.onClose}
                            message={this.state.message}
                            variant={this.state.variant}
                        />
                    </Snackbar>
                    <Button variant='outlined' onClick={this.onPress('success')}>Open Success</Button>
                    <Button variant='outlined' onClick={this.onPress('info')}>Open Info</Button>
                    <Button variant='outlined' onClick={this.onPress('warning')}>Open Warning</Button>
                    <Button variant='outlined' onClick={this.onPress('error')}>Open Error</Button>
                </DemoContent>
            </Demo>
        )
    }
}

class TextFieldEditorDemo extends React.PureComponent {
    state = {
        value: 'demo',
        dirty: false,
        enableDirtyCheck: false
    }

    onReset = () => {
        this.setState({value: ''})
    }

    render(){
        return(
            <Demo>
                <DemoTitle>TextFieldEditor</DemoTitle>
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
                    <misc.TextFieldEditor 
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

class SearchFieldDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle>SearchField</DemoTitle>
                <DemoHelp>A TextField that gets full width on typing. It also has a search icon adornnment.</DemoHelp>
                <DemoProps>
                    <DemoProp name='placeholder' type='string (optional)' default='Search' description=''></DemoProp>
                    <DemoProp name='margin' type='none | dense | normal (optional)' default='dense' description=''></DemoProp>
                    <DemoProp name='InputProps' type="TextFieldProps['InputProps'] (optional)" default='{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>}' description=''></DemoProp>
                    <DemoProp name='...' type='TextFieldProps' default='' description='Any other prop is spread to the TextField'></DemoProp>
                </DemoProps>
                <DemoContent>
                    <misc.SearchField />
                </DemoContent>
            </Demo>
        )
    }
}

class ConfirmationDialogDemo extends React.PureComponent{
    state = {
        openConfirmationDialog: false
    }

    onClickOpenConfirmationDialog = () => {
        this.setState({openConfirmationDialog: true})
    }

    render(){
        return (
            <Demo>
                <DemoTitle>ConfirmationDialog</DemoTitle>
                <DemoHelp>A Dialog containing Ok and Cancel buttons</DemoHelp>
                <DemoProps>
                    <DemoProp name="open" type="boolean" default="" description="Show dialog" />
                    <DemoProp name="title" type="string (optional)" default="" description="Dialog title" />
                    <DemoProp name="message" type="string" default="" description="Dialog content" />
                    <DemoProp name="okButtonText" type="string" default="" description="" />
                    <DemoProp name="cancelButtonText" type="string" default="" description="" />
                    <DemoProp name="onOk" type="function" default="" description="" />
                    <DemoProp name="onCancel" type="function" default="" description="" />
                </DemoProps>
                <DemoContent>
                    <Button variant='outlined' onClick={this.onClickOpenConfirmationDialog}>Open ConfirmationDialog</Button>
                    <misc.ConfirmationDialog
                        open={this.state.openConfirmationDialog}
                        okButtonText='Ok'
                        cancelButtonText='Cancel'
                        onOk={() => this.setState({openConfirmationDialog: false})}
                        onCancel={() => this.setState({openConfirmationDialog: false})}
                        message='Confirmation dialog message'
                        title='Confirmation dialog title'
                    />
                </DemoContent>
            </Demo>
        )
    }
}