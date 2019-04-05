import React from 'react'
import Button from '@material-ui/core/Button'
import ClientSwitcherDialog from '../../lib/layout/ClientSwitcherDialog'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

export default class ClientSwitcherDialogDemo extends React.PureComponent{
    state = {
        openConfirmationDialog: false,
        options: [{
            value: '23324',
            label: 'Vrådal & Rypefjord AS'
        }, {
            value: '353453',
            label: '24SevenOffice Norge'
        }, {
            value: '234234324',
            label: '24sevenOffice Labs'
        }, {
            value: '53453453',
            label: '24SevenOffice Sweden'
        }]
    }

    onClickOpenConfirmationDialog = () => {
        this.setState({openConfirmationDialog: true})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ConfirmationDialogDemo.tsx' srcPath='ConfirmationDialog.tsx' >ClientSwitcherDialog</DemoTitle>
                <DemoHelp>Dialog showing list of options. Made with switching client's in mind</DemoHelp>
                <DemoProps>
                    <DemoProp name="open" type="boolean" default="" description="Show dialog" />
                    <DemoProp name="fullScreen" type="boolean" default="false" description="Show dialog in full screen (mobile)" />
                    <DemoProp name="cancelButtonText" type="string" default="" description="" />
                    <DemoProp name="onSwitch" type="function" default="" description="returns value for selected option" />
                    <DemoProp name="onCancel" type="function" default="" description="" />
                </DemoProps>
                <DemoContent>
                    <Button variant='outlined' onClick={this.onClickOpenConfirmationDialog}>Open ConfirmationDialog</Button>
                    <ClientSwitcherDialog
                        open={this.state.openConfirmationDialog}
                        cancelButtonText='Cancel'
                        onCancel={() => this.setState({openConfirmationDialog: false})}
                        onSwitch={(value) => { console.log(`selected value ${value}`) }}
                        options={this.state.options}
                        selected='53453453'
                    />
                </DemoContent>
            </Demo>
        )
    }
}