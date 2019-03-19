import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {misc} from '../../lib'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../demo'

export default class Misc extends Component{
    render(){
        return (
            <React.Fragment>
                <SearchFieldDemo />
                <ConfirmationDialogDemo />
            </React.Fragment>
        )
    }
}

class SearchFieldDemo extends Component{
    render(){
        return (
            <Demo>
                <DemoTitle>SearchField</DemoTitle>
                <DemoHelp>A TextField that gets full width on typing. It also has a search icon adornnment.</DemoHelp>
                <DemoContent>
                    <misc.SearchField />
                </DemoContent>
            </Demo>
        )
    }
}

class ConfirmationDialogDemo extends Component{
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
                    <Button onClick={this.onClickOpenConfirmationDialog}>Open ConfirmationDialog</Button>
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