import React from 'react'
import styled from 'styled-components'

import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import GridLayout, {GridLayoutProps, GridItemPosition} from '../../lib/GridLayout'
import Link from '../components/Link'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

const ItemWrapper = ({backgroundColor, ...props}: React.HTMLAttributes<HTMLDivElement> & {backgroundColor: string}) => <div {...props} />
const Item = styled(ItemWrapper)`&&{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({backgroundColor}) => backgroundColor};
    color: ${({theme, backgroundColor}) => theme.mui.palette.getContrastText(backgroundColor)};
    font-size: ${({theme}) => theme.mui.typography.h5.fontSize};
    font-weight: ${({theme}) => theme.mui.typography.h5.fontWeight};
    font-family: ${({theme}) => theme.mui.typography.h5.fontFamily};
}`

type State = {
    items: GridLayoutProps['items']
    layout: GridLayoutProps['layout']
    addItemId: number
    addColor: string
    addWidth: number
    addHeight: number
    addCol: number,
    addRow: number,
}

export default class GridLayoutDemo extends React.PureComponent<{}, State>{
    state: State = {
        items: [
            {
                id: 'a',
                backgroundColor: '#f0f',
                children: <Item backgroundColor={'#f0f'}>a</Item>
            },
            {
                id: 'b',
                backgroundColor: '#0ff',
                children: <Item backgroundColor={'#0ff'}>b</Item>
            },
            {
                id: 'c',
                backgroundColor: '#ff0',
                children: <Item backgroundColor={'#ff0'}>
                    c
                    <Button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => console.log('buttonclick')}>Button</Button>
                </Item>
            },
            {
                id: 'd',
                backgroundColor: '#f8f',
                children: <Item backgroundColor={'#f8f'}>d</Item>
            },
        ],
        layout: [
            {
                id: 'a',
                width: 'onequarter',
                height: 1,
                col: 0,
                row: 0
            },
            {
                id: 'b',
                width: 'onequarter',
                height: 1,
                col: 3,
                row: 0,
            },
            {
                id: 'c',
                width: 'onequarter',
                height: 1,
                col: 6,
                row: 0
            },
            {
                id: 'd',
                width: 'full',
                height: 2,
                col: 0,
                row: 1,
            },
        ],
        addItemId: 1,
        addColor: '#ccc',
        addHeight: 2,
        addWidth: 6,
        addCol: 0,
        addRow: 2
    }

    onAddItem = () => {
        const {
            addItemId: id,
            addColor: backgroundColor,
            addWidth: width,
            addHeight: height,
            addCol: col,
            addRow: row,
            items,
            layout
        } = this.state

        const item = {
            id: id.toString(),
            backgroundColor,
            children: <Item backgroundColor={backgroundColor}>{`${id}`}</Item>
        }

        const itemLayout = {
            id: id.toString(),
            width: Number(width),
            height: Number(height),
            col,
            row: col + width > 12 ? row + 1 : row
        } as GridItemPosition

        const addCol = col + width
        this.setState({
            items: [...items, item],
            layout: [...layout, itemLayout],
            addItemId: this.state.addItemId + 1,
            addCol: addCol >= 12 ? 0 : addCol,
            addRow: addCol === 0 ? row + height : col + width > 12 ? row + 1 : row
        })
    }

    handleChange = (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => {
        let value: string | number | boolean | undefined
        switch(key){
        case 'addWidth':
        case 'addHeight':
            value = Number(event.target.value)
            break
        default:
            value = event.target.value
            break
        }
        this.setState({[key]: value} as any)
    }

    onLayoutChange = (layout: GridLayoutProps['layout']) => {
        this.setState({layout})
    }

    render(){
        return (
            <Demo>
                <DemoTitle srcPath='GridLayout.tsx' demoPath='GridLayoutDemo.tsx'>GridLayout</DemoTitle>
                <DemoHelp>A draggable grid layout</DemoHelp>
                <DemoProps title='GridLayoutProps' >
                    <DemoProp name='margin' type='number' default='16' description='The margin between each item' />
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
                <DemoHelp>
                    To prevent dragging when clicking and holding buttons within gridItems, you must stop the event propagation of the onMouseDown event on the button.<br />
                    <code>{`onMouseDown={(e) => e.stopPropagation()}`}</code>
                </DemoHelp>
                <DemoContent>
                    <GridLayout
                        draggable
                        items={this.state.items}
                        layout={this.state.layout}
                        onLayoutChange={this.onLayoutChange}
                    />
                    <TextField label='width' value={this.state.addWidth} onChange={this.handleChange('addWidth')} type='number' inputProps={{max: 12, min: 1}} />
                    <TextField label='height' value={this.state.addHeight} onChange={this.handleChange('addHeight')} type='number' inputProps={{max: 6, min: 1}} />
                    <TextField label='backgroundColor' value={this.state.addColor} onChange={this.handleChange('addColor')} />
                    <Button onClick={this.onAddItem} color='primary' variant='contained'>Add item</Button>
                </DemoContent>
            </Demo>
        )
    }
}