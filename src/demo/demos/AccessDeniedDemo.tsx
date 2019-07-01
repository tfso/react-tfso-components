import React from 'react'
import AccessDenied from '../../lib/AccessDenied'
import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'

const data = {
    title: 'Access Denied',
    description: 'hallo',
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
                    <DemoProp name='title' type='string' default='' description=''/>
                    <DemoProp name='description' type='string' default='' description=''/>
                    <DemoProp name='status' type='number' default='' description=''/>
                    <DemoProp name='*modules' type='ModuleItem[]' default='' description=''/>
                    <DemoProp name='translate' type='function' default='' description='translation function'/>
                </DemoProps>
                <DemoProps title='ModuleItem'>
                    <DemoProp name='id' type='number' default='' description=''/>
                    <DemoProp name='name' type='string' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    {this.state.goBackString &&
                        <div>{this.state.goBackString}</div>
                    }
                    <AccessDenied {...data} translate={this.translate} goBack={this.goBack} onButtonClick={this.handleIncrement}/>
                </DemoContent>
            </Demo>
        )
    }
}
