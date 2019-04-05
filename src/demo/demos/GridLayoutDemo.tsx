import React from 'react'
import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps} from '../components/demo'
import GridLayout from '../../lib/GridLayout'
import {Link} from '@material-ui/core'

export default class GridLayoutDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='GridLayout.tsx' demoPath='GridLayoutDemo.tsx'>GridLayout</DemoTitle>
                <DemoHelp>A draggable and movable grid layout based on <Link href='https://github.com/STRML/react-grid-layout' target='_blank' rel='noreferrer'>react-grid-layout</Link></DemoHelp>
                <DemoProps>

                </DemoProps>
                <DemoContent>
                    <GridLayout
                        onLayoutChange={(layout) => { console.log(JSON.stringify(layout, undefined, 2)) }}
                        items={[
                            {
                                id: 'a',
                                backgroundColor: '#f0f',
                                children: <div>a (I'm resizable)</div>
                            },
                            {
                                id: 'b',
                                backgroundColor: '#0ff',
                                children: <div>b (I'm locked in place)</div>
                            },
                            {
                                id: 'c',
                                backgroundColor: '#ff0',
                                children: <div>c</div>
                            },
                            {
                                id: 'd',
                                backgroundColor: '#f8f',
                                children: <div>d</div>
                            },
                        ]}
                        layout={[
                            {
                                id: 'a',
                                width: 'onequarter',
                                height: 1,
                                col: 0,
                                row: 0,
                                resizable: true
                            },
                            {
                                id: 'b',
                                width: 'onequarter',
                                height: 1,
                                col: 3,
                                row: 0,
                                draggable: false
                            },
                            {
                                id: 'c',
                                width: 'onequarter',
                                height: 1,
                                col: 6,
                                row: 0,
                            },
                            {
                                id: 'd',
                                width: 'full',
                                height: 2,
                                col: 0,
                                row: 1,
                            },
                        ]}
                    />
                </DemoContent>
            </Demo>
        )
    }
}