import React from 'react'
import AccessDenied from '../../lib/AccessDenied'
import {Button} from '@material-ui/core'
import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'
type State = {
    showButton: boolean
}
const data = {
    title: 'Access Denied',
    description: 'A list of no access',
    status: 403,
    modules: [{id: 1, name: 'bank'}, {id: 2, name: 'status'}]
}

export default class AccessDeniedDemo extends React.PureComponent<{}, State>{
    state:
        State = {showButton: false}
    handleIncrement = () => {
        console.log('Click happened')
    }
    onDemoBtnClick = () => {
        this.setState({showButton: !this.state.showButton})
    }
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
                    <AccessDenied data={data} onButtonClick={this.handleIncrement} showButton={this.state.showButton}/>
                    <Button value='Show button' onClick={this.onDemoBtnClick}>Show</Button>
                </DemoContent>
            </Demo>
        )
    }
}
