import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

export default class TopbarDemo extends React.PureComponent{
    state = {
        value: 'demo',
        dirty: false,
        enableDirtyCheck: false
    }

    onReset = () => {
        this.setState({value: ''})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='TextFieldEditorDemo.tsx' srcPath='TextFieldEditor.tsx' >TopBar.tsx</DemoTitle>
                <DemoHelp>A wrapper around material-ui's TextField with some added features</DemoHelp>
                <DemoProps>
                    <DemoProp name='value' type='string' default='' description='' />
                    <DemoProp name='onChange' type='(value: string) => void' default='' description='Invoked when the user has finished editing the value (editor looses focus by clicking or tabbing away, pressing the Enter or ctrl+s' />
                </DemoProps>
                <DemoContent>

                </DemoContent>
            </Demo>
        )
    }
}