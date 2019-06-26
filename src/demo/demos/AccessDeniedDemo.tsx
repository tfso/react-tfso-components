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
    handleIncrement = () => {
        console.log('Click happened')
    }
    goBack = () =>{}
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='AccessDenied.tsx' demoPath='AccessDeniedDemo.tsx'>AccessDenied</DemoTitle>
                <DemoHelp>
                    List of no access
                </DemoHelp>
                <DemoProps>
                    <DemoProp name='title' type='string' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <AccessDenied data={data} goBack={this.goBack} onButtonClick={this.handleIncrement}/>
                </DemoContent>
            </Demo>
        )
    }
}
