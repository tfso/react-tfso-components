import React from 'react'
import AccessDenied from '../../lib/AccessDenied'
import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'

const data = {
    title: 'Access Denied',
    description: 'A list of no access',
    status: 403,
    modules: [{id: 1, name: 'bank'}, {id: 2, name: 'status'}]
}

export default class AccessDeniedDemo extends React.PureComponent<{}>{
    state = {
        goBackString: ''
    }

    handleIncrement = () => {
    }
    translate = (key) => {
        return key
    }
    goBack = () => {
        this.setState({goBackString: 'back link clicked'})
    }
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='AccessDenied.tsx' demoPath='AccessDeniedDemo.tsx'>AccessDenied</DemoTitle>
                <DemoHelp>
                    List of no access
                </DemoHelp>
                <DemoProps>
                    <DemoProp name='onButtonClick' type='function' default='' description='Callback invoked when the user click on the button'/>
                    <DemoProp name='goBack' type='function' default='' description='Callback invoked when the user click on the link.'/>
                    <DemoProp name='data' type='object' default='' description='an object that gets data'/>
                    <DemoProp name='translate' type='function' default='' description='translation function'/>
                </DemoProps>
                <DemoContent>
                    {this.state.goBackString &&
                        <div>{this.state.goBackString}</div>
                    }
                    <AccessDenied data={data} translate={this.translate} goBack={this.goBack} onButtonClick={this.handleIncrement}/>
                </DemoContent>
            </Demo>
        )
    }
}
