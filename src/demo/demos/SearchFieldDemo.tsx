import React from 'react'
import SearchField from '../../lib/SearchField'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

export default class SearchFieldDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='SearchFieldDemo.tsx' srcPath='SearchField.tsx' >SearchField</DemoTitle>
                <DemoHelp>A TextField that gets full width on typing. It also has a search icon adornnment.</DemoHelp>
                <DemoProps>
                    <DemoProp name='placeholder' type='string (optional)' default='Search' description=''></DemoProp>
                    <DemoProp name='margin' type='none | dense | normal (optional)' default='dense' description=''></DemoProp>
                    <DemoProp name='InputProps' type="TextFieldProps['InputProps'] (optional)" default='{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>}' description=''></DemoProp>
                    <DemoProp name='...' type='TextFieldProps' default='' description='Any other prop is spread to the TextField'></DemoProp>
                </DemoProps>
                <DemoContent>
                    <SearchField />
                </DemoContent>
            </Demo>
        )
    }
}