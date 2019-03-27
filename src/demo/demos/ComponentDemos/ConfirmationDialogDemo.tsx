import React from 'react'
import Button from '@material-ui/core/Button'
import ConfirmationDialog from '../../../lib/ConfirmationDialog'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../../components/demo'

export default class ConfirmationDialogDemo extends React.PureComponent{
    state = {
        openConfirmationDialog: false
    }

    onClickOpenConfirmationDialog = () => {
        this.setState({openConfirmationDialog: true})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ComponentDemos/ConfirmationDialogDemo.tsx' srcPath='ConfirmationDialog.tsx' >ConfirmationDialog</DemoTitle>
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
                    <ConfirmationDialog
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