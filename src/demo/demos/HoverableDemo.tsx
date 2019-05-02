import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'
import {Hoverable} from '../../lib'

export default class HoverableDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='Utils.tsx' srcPath='Hoverable.tsx'>Hoverable</DemoTitle>
                <DemoHelp>A HOC that passes hover true/false as a render prop</DemoHelp>
                <DemoProps>
                    <DemoProp name="children" type="(hover: boolean, ref: RefObject) => ReactElement" default="" description="A function that returns a react component" />
                </DemoProps>
                <DemoContent>
                    <Hoverable>
                        {(hover) => (
                            <React.Fragment>
                                {hover
                                    ? <div key="1" style={{backgroundColor: '#6699bb', padding: 15, color: '#FFF', cursor: 'pointer'}}>You're hovering me!</div>
                                    : <div key="2" style={{padding: 15, height: '100%'}}>Hover your mouse over me</div>
                                }
                            </React.Fragment>
                        )}
                    </Hoverable>
                </DemoContent>
            </Demo>
        )
    }
}