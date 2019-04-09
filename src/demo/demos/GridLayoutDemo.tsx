import React from 'react'
import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import GridLayout from '../../lib/GridLayout'
import Link from '../components/Link'

export default class GridLayoutDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='GridLayout.tsx' demoPath='GridLayoutDemo.tsx'>GridLayout</DemoTitle>
                <DemoHelp>A draggable and movable grid layout based on <Link href='https://github.com/STRML/react-grid-layout' target='_blank'>react-grid-layout</Link></DemoHelp>
                <DemoProps title='GridLayoutProps' >
                    <DemoProp name='margin' type='number' default='16' description='The margin between each item' />
                    <DemoProp name='compactType' type='vertical | horizontal' default='vertical' description='' />
                    <DemoProp required name='onLayoutChange' type='(layout: GridItemPosition[]) => void' default='' description='' />
                    <DemoProp required name='items' type='GridItem[]' default='' description='' />
                    <DemoProp required name='layout' type='GridItemPosition[]' default='' description='' />
                </DemoProps>
                <DemoProps title='GridItem' >
                    <DemoProp required name='id' type='string' default='' description='Id of the item. A corresponding GridItemPosition must be supplied to the layout' />
                    <DemoProp name='backgroundColor' type='string' default='inherit' description='The backgroundcolor of the item' />
                    <DemoProp required name='children' type='React.ReactNode' default='' description='' />
                </DemoProps>
                <DemoProps title='GridItemPosition' >
                    <DemoProp required name='id' type='string' default='' description='Used to positition the GridItem with the same id' />
                    <DemoProp required name='col' type='number' default='' description='Column in which the item is positioned' />
                    <DemoProp required name='row' type='number' default='' description='Row in which the item is positioned' />
                    <DemoProp required name='width' type={`1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'`} default='' description='Width in number of columns' />
                    <DemoProp required name='height' type='number' default='' description='Height in number of rows' />
                    <DemoProp name='draggable' type='boolean' default='false' description='If true, the item can be repositioned by dragging' />
                    <DemoProp name='resizable' type='boolean' default='false' description='If true, the item can be resized' />
                    <DemoProp name='static' type='boolean' default='false' description='If true, the item is locked in place (draggable and resizable is overriden to false)' />
                    <DemoProp name='minWidth' type={`1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'`} default='' description='Width in number of columns' />
                    <DemoProp name='minHeight' type='number' default='' description='Height in number of rows' />
                    <DemoProp name='maxWidth' type={`1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'`} default='' description='Width in number of columns' />
                    <DemoProp name='maxHeight' type='number' default='' description='Height in number of rows' />
                </DemoProps>
                <DemoContent>
                    <GridLayout
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
                                draggable: true,
                                resizable: true
                            },
                            {
                                id: 'b',
                                width: 'onequarter',
                                height: 1,
                                col: 3,
                                row: 0,
                                static: true
                            },
                            {
                                id: 'c',
                                width: 'onequarter',
                                height: 1,
                                col: 6,
                                row: 0,
                                draggable: true,
                            },
                            {
                                id: 'd',
                                width: 'full',
                                height: 2,
                                col: 0,
                                row: 1,
                                draggable: true,
                            },
                        ]}
                    />
                </DemoContent>
            </Demo>
        )
    }
}