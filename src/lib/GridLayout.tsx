import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import Paper, {PaperProps} from '@material-ui/core/Paper'

import ReactGridLayout, {Layout, ReactGridLayoutProps} from 'react-grid-layout/'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {styledTheme} from './theme'

const BackgroundPaper = ({backgroundColor, ...props}: { backgroundColor: string } & PaperProps) => (<Paper {...props} />)
const GridItemContainer = styled(BackgroundPaper)`&&{
    background-color: ${({backgroundColor}) => backgroundColor};
    width: 100%;
    height: 100%;
}`

type GridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'
type GridItemHeight = 1 | 2 | 3 | 4 | 5 | 6

const gridItemWidthNumberMap: {[P in GridItemWidth]: number} = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    'onequarter': 3,
    'onethird': 4,
    'half': 6,
    'twothirds': 8,
    'threequarters': 9,
    'full': 12,
}

const numberGridItemWithMap: {[n: number]: GridItemWidth} = {
    1: 1,
    2: 2,
    3: 'onequarter',
    4: 'onethird',
    5: 5,
    6: 'half',
    7: 7,
    8: 'twothirds',
    9: 'threequarters',
    10: 10,
    11: 11,
    12: 'full',
}

const toGridItemWidth = (w?: number): GridItemWidth | undefined => {
    return w === undefined
        ? undefined
        : numberGridItemWithMap[Math.min(6, Math.trunc(w))]
}

const toGridItemHeight = (w?: number): GridItemHeight | undefined => {
    return w === undefined
        ? undefined
        : Math.min(12, Math.trunc(w)) as GridItemHeight
}

const gridItemPositionToLayout = (position: GridItemPosition): Layout => {
    return {
        i: position.id,
        x: position.col,
        y: position.row,
        h: position.height,
        w: gridItemWidthNumberMap[position.width],
        minH: position.minHeight,
        minW: position.minWidth && gridItemWidthNumberMap[position.minWidth] || undefined,
        maxH: position.maxHeight,
        maxW: position.maxWidth && gridItemWidthNumberMap[position.maxWidth] || undefined,
        isDraggable: position.draggable !== undefined ? position.draggable : true,
        isResizable: position.resizable !== undefined ? position.resizable : false,
    }
}

const layoutToGridItemPosition = (layout: Layout): GridItemPosition => {
    return {
        id: layout.i!,
        col: layout.x,
        row: layout.y,
        width: toGridItemWidth(layout.w)!,
        height: toGridItemHeight(layout.h)!,
        minHeight: toGridItemHeight(layout.minH),
        minWidth: toGridItemWidth(layout.minW),
        maxHeight: toGridItemHeight(layout.maxH),
        maxWidth: toGridItemWidth(layout.maxW),
        draggable: layout.isDraggable,
        resizable: layout.isResizable,
    }
}

export type GridItem = {
    id: string
    backgroundColor?: string
    children: React.ReactNode
}

type GridItemPosition = {
    id: string
    col: number
    row: number
    width: GridItemWidth
    height: GridItemHeight
    minWidth?: GridItemWidth
    minHeight?: GridItemHeight
    maxWidth?: GridItemWidth
    maxHeight?: GridItemHeight
    /**
     * @default true
     */
    draggable?: boolean
    /**
     * @default false
     */
    resizable?: boolean
}

// class GridLayoutItem extends React.PureComponent<GridItem>{
//     render(){
//         const {id, backgroundColor, children} = this.props
//         return (
//             <GridItemContainer
//                 key={id}
//                 backgroundColor={backgroundColor || 'inherit'}
//             >
//                 {children}
//             </GridItemContainer>
//         )
//     }
// }

export type GridLayoutProps = {
    items: Array<GridItem>
    layout: Array<GridItemPosition>
    /**
     * @default 16
     */
    margin?: number
    onLayoutChange: (layout: Array<GridItemPosition>) => void
    /**
     * @default vertical
     */
    compactType?: ReactGridLayoutProps['compactType']
    children?: undefined
}

export default class GridLayout extends React.PureComponent<GridLayoutProps>{
    static defaultProps: Partial<GridLayoutProps> = {
        margin: 16,
        compactType: 'vertical'
    }

    static propTypes = {
        // TODO
    }

    onLayoutChange = (layouts: Array<Layout>) => {
        this.props.onLayoutChange(layouts.map(layoutToGridItemPosition))
    }

    validateItemLayout = () => {
        if(process.env.NODE_ENV === 'production') return

        const items = new Set(this.props.items.map(item => item.id))
        const layouts = new Set(this.props.layout.map(layout => layout.id))
        for(const item in items){
            if(!layouts.has(item)){
                console.error(`Item with id: ${item} is missing layout`)
            }
        }

        for(const layout in layouts){
            if(!items.has(layout)){
                console.warn(`Layout with id: ${layout} does not correspond to any item`)
            }
        }
    }

    onResize = (layout: Layout[], oldItem: Layout, newItem: Layout, placeHolder: Layout) => {
        newItem.h = placeHolder.h = Math.min(6, newItem.h)
    }

    render(){
        const {items, layout, margin = 16, onLayoutChange, ...other} = this.props
        const rglLayout = Object.values(layout).map(gridItemPositionToLayout)

        return (
            <ReactGridLayout
                {...other}
                className='layout'
                cols={12}
                layout={rglLayout}
                margin={[margin, margin]}
                rowHeight={90}
                width={styledTheme.mui.breakpoints.values.lg}
                onLayoutChange={this.onLayoutChange}
                onResize={this.onResize}
            >
                {items.map(({id, backgroundColor, children}) => (
                    <GridItemContainer
                        key={id}
                        backgroundColor={backgroundColor || 'inherit'}
                    >
                        {children}
                    </GridItemContainer>))}
            </ReactGridLayout>
        )
    }
}