import React from 'react'
import styled from 'styled-components'

import {Demo, DemoContent, DemoTitle, DemoHelp, DemoProps, DemoProp} from '../components/demo'
import Board, {BoardProps} from '../../lib/board/Board'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper, {PaperProps} from '@material-ui/core/Paper'
import {addBoardItem} from '../../lib/board/utils'

const ItemWrapper = ({backgroundColor, ...props}: PaperProps & {backgroundColor: string}) => <Paper {...props} />
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
    items: BoardProps['items']
    addItemId: number
    addColor: string
    addWidth: number
    addHeight: number
    addCol: number,
    addRow: number,
}

export default class BoardDemo extends React.PureComponent<{}, State>{
    state: State = {
        items: {
            a: {
                key: 'a',
                mobile: {
                    col: 0,
                    row: 0,
                    colSpan: 4,
                    rowSpan: 1
                },
                tablet: {
                    col: 0,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                desktop: {
                    col: 0,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                component: () => <Item backgroundColor={'#f0f'}>a</Item>
            },
            b: {
                key: 'b',
                mobile: {
                    col: 0,
                    row: 1,
                    colSpan: 4,
                    rowSpan: 1
                },
                tablet: {
                    col: 3,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                desktop: {
                    col: 3,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                component: () => <Item backgroundColor={'#0ff'}>b</Item>
            },
            c: {
                key: 'c',
                mobile: {
                    col: 0,
                    row: 2,
                    colSpan: 4,
                    rowSpan: 1
                },
                tablet: {
                    col: 0,
                    row: 1,
                    colSpan: 3,
                    rowSpan: 1
                },
                desktop: {
                    col: 6,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                component: () => (<Item backgroundColor={'#ff0'}>
                    c
                    <Button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => console.log('buttonclick')}>Button</Button>
                </Item>)
            },
            d: {
                key: 'd',
                mobile: {
                    col: 0,
                    row: 2,
                    colSpan: 4,
                    rowSpan: 1
                },
                tablet: {
                    col: 0,
                    row: 1,
                    colSpan: 3,
                    rowSpan: 1
                },
                desktop: {
                    col: 9,
                    row: 0,
                    colSpan: 3,
                    rowSpan: 1
                },
                component: () => <Item backgroundColor={'#0fa'}>d</Item>
            },
            e: {
                key: 'e',
                mobile: {
                    col: 0,
                    row: 3,
                    colSpan: 4,
                    rowSpan: 1
                },
                tablet: {
                    col: 0,
                    row: 2,
                    colSpan: 6,
                    rowSpan: 1
                },
                desktop: {
                    col: 0,
                    row: 1,
                    colSpan: 12,
                    rowSpan: 1
                },
                component: ({screenType}) => <Item backgroundColor={'#f8f'}>e {screenType}</Item>
            },
        },
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
            addWidth: colSpan,
            addHeight: rowSpan,
            addCol: col,
            addRow: row,
        } = this.state
        const layout = {col, row, colSpan, rowSpan}
        const newItems = addBoardItem(this.state.items, {
            key: id.toString(),
            component: () => <Item backgroundColor={backgroundColor}>{id}</Item>,
            desktop: layout,
            tablet: layout,
            mobile: layout
        })
        this.setState({
            items: newItems,
            addItemId: id + 1,
            addCol: col >= 12 ? 0 : col,
            addRow: col === 0 ? row + rowSpan : col + colSpan > 12 ? row + 1 : row
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

    onChange = (items: BoardProps['items']) => {
        this.setState({items})
    }

    render(){
        return (
            <Demo>
                <DemoTitle srcPath='Board.tsx' demoPath='BoardDemo.tsx'>Board</DemoTitle>
                <DemoHelp>A Board layout</DemoHelp>
                <DemoProps title='BoardProps'>
                    <DemoProp required name='rowHeight' type='number' />
                    <DemoProp name='spacing' type='number' default='0'/>
                    <DemoProp name='locked' type='boolean' description='When true, no items can be moved' default='false' />
                    <DemoProp required name='items' type='{[key: string]: BoardItem}' default='' description='' />
                    <DemoProp name='onChange' type='(items: {[key: string]: BoardItem}) => void' default='' description='' />
                </DemoProps>
                <DemoProps title='BoardItem' >
                    <DemoProp required name='key' type='React.Key' default='' description='' />
                    <DemoProp required name='component' type='React.ElementType<{screenType: ScreenType}>' default='' description='' />
                    <DemoProp name='mobile' type='BoardItemLayout' description='If not defined, the item is hidden' />
                    <DemoProp name='tablet' type='BoardItemLayout' description='If not defined, the item is hidden' />
                    <DemoProp required name='desktop' type='BoardItemLayout' description='' />
                </DemoProps>
                <DemoProps title='BoardItemLayout' >
                    <DemoProp required name='col' type='number' default='' description='Column in which the item is positioned' />
                    <DemoProp required name='row' type='number' default='' description='Row in which the item is positioned' />
                    <DemoProp required name='colSpan' type='number' default='' description='Width in number of columns' />
                    <DemoProp required name='rowSpan' type='number' default='' description='Height in number of rows' />
                </DemoProps>
                <DemoHelp>
                    To prevent dragging when clicking and holding buttons within gridItems, you must stop the event propagation of the onMouseDown event on the button.<br />
                    <code>{`onMouseDown={(e) => e.stopPropagation()}`}</code>
                </DemoHelp>
                <DemoContent>
                    <Board
                        spacing={16}
                        rowHeight={90}
                        locked={false}
                        items={this.state.items}
                        onChange={this.onChange}
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