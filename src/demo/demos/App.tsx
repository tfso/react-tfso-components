import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {ConfirmationDialog, SearchField} from '../../lib'

export default class App extends Component{
    state = {
        openConfirmationDialog: false
    }

    onClickOpenConfirmationDialog = () => {
        this.setState({openConfirmationDialog: true})
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    yo
                </div>
                <SearchField

                />

                <Button onClick={this.onClickOpenConfirmationDialog}>Open ConfirmationDialog</Button>
                {this.state.openConfirmationDialog && // For some reason, if the dialog is rendered, opened then closed, no clicks work on the page afterwards. not rendering it does not render the slide animation properly... fixme
                <ConfirmationDialog
                    open={this.state.openConfirmationDialog}
                    okButtonText='Ok'
                    cancelButtonText='Cancel'
                    onOk={() => this.setState({openConfirmationDialog: false})}
                    onCancel={() => this.setState({openConfirmationDialog: false})}
                    message='Confirmation dialog message'
                    title='Confirmation dialog title'
                />}
            </React.Fragment>
        )
    }
}
