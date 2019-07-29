import React from 'react'
import Button from '@material-ui/core/Button'
import ListPicker from '../../lib/ListPicker'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import styled from 'styled-components'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const DemoDisplay = styled.div`
  flex: 1;
`

export default class ListPickerDemo extends React.PureComponent{
    _anchorEl: React.RefObject<HTMLButtonElement> = React.createRef()
    state = {
        selectedOption: undefined,
        selected: 'none',
        buttonType: 'default',
        open: false,
        color: 'default',
        loading: false,
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
        this.setState({
            open: true,
            loading: true
        })

        setTimeout((t) => {
            this.setState({
                loading: false
            })
        }, 2000)
    }

    handleChange = (event) => {
        this.setState({
            selected: event.target.value
        })
    }

    handleColor = (event) => {
        this.setState({
            color: event.target.value
        })
    }

    onSwitch =(value) => {
        this.setState({selectedOption: value})
        this.onCancel()
    }

    onCancel =() => {
        this.setState({open: false})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ListPickerDemo.tsx' srcPath='ListPicker.tsx' >ListPicker</DemoTitle>
                <DemoHelp>Dialog(mobile) or Popover(desktop) showing list of options. Made with switching client's in mind</DemoHelp>
                <DemoProps>
                    <DemoProp name="open" type="boolean" default="" description="Show list of options" />
                    <DemoProp name="options" type="arrayOf<{ value: string, label: string }>" description="Array of items to display"/>
                    <DemoProp name="disabled" type="string" default="" description="Disables current item in list" />
                    <DemoProp name="selected" type="string" default="" description="Selects current item in list" />
                    <DemoProp name="cancelButtonText" type="string" default="" description="Text for cancel button" />
                    <DemoProp name="onSwitch" type="function" default="" description="Returns value for selected option" />
                    <DemoProp name="onCancel" type="function" default="" description="Fires when list closes" />
                    <DemoProp name="avatarColor" type="string" default="" description="Valid values are types of #f7f7f7 or green" />
                    <DemoProp name="loading" type="bool" default="" description="Shows a loading indicator as long as loading = true" />
                </DemoProps>
                <DemoContent>
                    <ListPicker
                        anchorEl={this._anchorEl.current}
                        open={this.state.open}
                        cancelButtonText='Cancel'
                        searchLabel='Search list'
                        onCancel={this.onCancel}
                        onSelect={this.onSwitch}
                        options={this.state.options}
                        disabled='234234324'
                        selected={this.state.selected}
                        avatarColor={this.state.color === 'default' ? '' : this.state.color}
                        loading={this.state.loading}
                    />
                    <Button variant='outlined' buttonRef={this._anchorEl} onClick={this.onClickOpenConfirmationDialog}>Open list</Button>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        AvatarColor
                    </InputLabel>
                    <Select
                        onChange={this.handleColor}
                        value={this.state.color}
                    >
                        <MenuItem key='default' value='default'>Default</MenuItem>
                        <MenuItem key='green' value='green' >Green</MenuItem>
                        <MenuItem key='purple' value='purple' >Purple</MenuItem>
                        <MenuItem key='orange' value='orange' >Orange</MenuItem>
                    </Select>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        Set selected
                    </InputLabel>
                    <Select
                        onChange={this.handleChange}
                        value={this.state.selected}
                    >
                        <MenuItem value='none'>None</MenuItem>
                        { this.state.options
                            .map((option, i) => (
                                <MenuItem
                                    key={i}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {this.state && this.state.selectedOption
                        ? (
                            <DemoDisplay>You have selected: {this.state.selectedOption} {
                                this.state.options.map((option) => {
                                    if(option.value === this.state.selectedOption){
                                        return '(' + option.label + ')'
                                    }
                                    return ''
                                })}
                            </DemoDisplay>
                        )
                        : ''
                    }
                </DemoContent>
            </Demo>
        )
    }
}