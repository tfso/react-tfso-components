import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {misc} from '../../lib'
import {Demo, DemoContent, DemoHelp, DemoTitle} from '../demo'

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
                <DemoContent>
                    <Button onClick={this.onClickOpenConfirmationDialog}>Open ConfirmationDialog</Button>
                    {this.state.openConfirmationDialog && // For some reason, if the dialog is rendered, opened then closed, no clicks work on the page afterwards. not rendering it does not render the slide animation properly... fixme
                    <misc.ConfirmationDialog
                        open={this.state.openConfirmationDialog}
                        okButtonText='Ok'
                        cancelButtonText='Cancel'
                        onOk={() => this.setState({openConfirmationDialog: false})}
                        onCancel={() => this.setState({openConfirmationDialog: false})}
                        message='Confirmation dialog message'
                        title='Confirmation dialog title'
                    />}
                </DemoContent>
            </Demo>
        )
    }
}