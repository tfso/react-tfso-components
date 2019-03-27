import React from 'react'
import TrendingDemo from './ComponentDemos/TrendingDemo'
import BigNumberDemo from './ComponentDemos/BigNumberDemo'
import AlertDemo from './ComponentDemos/AlertDemo'
import SearchFieldDemo from './ComponentDemos/SearchFieldDemo'
import TextFieldEditorDemo from './ComponentDemos/TextFieldEditorDemo'
import ConfirmationDialogDemo from './ComponentDemos/ConfirmationDialogDemo'

export default class Components extends React.PureComponent{
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