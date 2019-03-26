import React from 'react'
import TrendingDemo from './Misc/TrendingDemo'
import BigNumberDemo from './Misc/BigNumberDemo'
import AlertDemo from './Misc/AlertDemo'
import SearchFieldDemo from './Misc/SearchFieldDemo'
import TextFieldEditorDemo from './Misc/TextFieldEditorDemo'
import ConfirmationDialogDemo from './Misc/ConfirmationDialogDemo';

export default class Misc extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                <AlertDemo />
                <BigNumberDemo />
                <ConfirmationDialogDemo />
                <SearchFieldDemo />
                <TextFieldEditorDemo />
                <TrendingDemo />
            </React.Fragment>
        )
    }
}