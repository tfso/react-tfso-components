import React from 'react'
import Button from '@material-ui/core/Button'
import ClientSwitcher from '../../lib/layout/ClientSwitcher'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import styled from 'styled-components'

const DemoDisplay = styled.div`
  flex: 1;
`

export default class ClientSwitcherDemo extends React.PureComponent{
    _anchorEl: React.RefObject<HTMLButtonElement> = React.createRef()
    state = {
        selectedOption: null,
        open: false,
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
            value: '534536553',
            label: '24SevenOffice Denmark'
        }, {
            value: '23424534324',
            label: '24sevenOffice Finland'
        }, {
            value: '53453233',
            label: '24SevenOffice Sweden'
        }]
    }

    onClickOpenConfirmationDialog = () => {
        this.setState({open: true})
    }

    onSwitch =(value) => {
        console.log(`selected value ${value}`)
        this.setState({selectedOption: value})
        this.onCancel()
    }

    onCancel =() => {
        this.setState({open: false})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ClientSwitcherDemo.tsx' srcPath='ClientSwitcher.tsx' >ClientSwitcher</DemoTitle>
                <DemoHelp>Dialog(mobile) or Popover(desktop) showing list of options. Made with switching client's in mind</DemoHelp>
                <DemoProps>
                    <DemoProp name="open" type="boolean" default="" description="Show list of options" />
                    <DemoProp name="options" type="arrayOf<{ value: string, label: string }>" description="Array of items to display"/>
                    <DemoProp name="disabled" type="string" default="" description="Disables current item in list" />
                    <DemoProp name="selected" type="string" default="" description="Selects current item in list" />
                    <DemoProp name="cancelButtonText" type="string" default="" description="Text for cancel button" />
                    <DemoProp name="onSwitch" type="function" default="" description="Returns value for selected option" />
                    <DemoProp name="onCancel" type="function" default="" description="Fires when list closes" />
                </DemoProps>
                <DemoContent>
                    <ClientSwitcher
                        anchorEl={this._anchorEl.current}
                        open={this.state.open}
                        cancelButtonText='Cancel'
                        onCancel={this.onCancel}
                        onSwitch={this.onSwitch}
                        options={this.state.options}
                        disabled='234234324'
                    />
                    <Button variant='outlined' buttonRef={this._anchorEl} onClick={this.onClickOpenConfirmationDialog}>Click me</Button>
                    {this.state && this.state.selectedOption
                        ? <DemoDisplay>You have selected: {this.state.selectedOption} {
                            this.state.options
                                .map((option) => {
                                    if(option.value == this.state.selectedOption){
                                        return '(' + option.label + ')'
                                    }
                                })}</DemoDisplay>
                        : ''
                    }
                </DemoContent>
            </Demo>
        )
    }
}