import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import isEqual from 'lodash/isEqual'

import Paper, {PaperProps} from '@material-ui/core/Paper'

import RGL, {Layout, WidthProvider} from 'react-grid-layout/'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ReactGridLayout = WidthProvider(RGL)

const BackgroundPaper = ({backgroundColor, ...props}: { backgroundColor: string } & PaperProps) => (<Paper {...props} />)
const GridItemContainer = styled(BackgroundPaper)`&&{
    background-color: ${({backgroundColor}) => backgroundColor};
    width: 100%;
    height: 100%;
}`

type GridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'
type GridItemHeight = number
const gridItemWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'onequarter', 'onethird', 'half', 'twothirds', 'threequarters', 'full']
const gridItemWidthNumberMap: {[P in GridItemWidth]: number} = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 'onequarter': 3, 'onethird': 4, 'half': 6, 'twothirds': 8, 'threequarters': 9, 'full': 12}
const numberGridItemWithMap: {[n: number]: GridItemWidth} = {1: 1, 2: 2, 3: 'onequarter', 4: 'onethird', 5: 5, 6: 'half', 7: 7, 8: 'twothirds', 9: 'threequarters', 10: 10, 11: 11, 12: 'full'}

const toGridItemWidth = (w?: number): GridItemWidth | undefined => w === undefined ? undefined : numberGridItemWithMap[Math.min(6, Math.trunc(w))]
const toGridItemHeight = (w?: number): GridItemHeight | undefined => w === undefined ? undefined : Math.min(12, Math.trunc(w)) as GridItemHeight

const gridItemPositionToLayout = (position: GridItemPosition): Layout => ({
    i: position.id,
    x: position.col,
    y: position.row,
    h: position.height,
    w: gridItemWidthNumberMap[position.width],
    minH: position.minHeight,
    minW: (position.minWidth && gridItemWidthNumberMap[position.minWidth]) || undefined,
    maxH: position.maxHeight,
    maxW: (position.maxWidth && gridItemWidthNumberMap[position.maxWidth]) || undefined,
    isDraggable: position.draggable !== undefined ? position.draggable : false,
    isResizable: position.resizable !== undefined ? position.resizable : false,
    static: position.static,
})

const layoutToGridItemPosition = (layout: Layout): GridItemPosition => ({
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
    static: layout.static,
})

export type GridItem = {
    id: string
    backgroundColor?: string
    children: React.ReactNode
}

export type GridItemPosition = {
    id: string
    col: number
    row: number
    width: GridItemWidth
    height: GridItemHeight
    minWidth?: GridItemWidth
    minHeight?: GridItemHeight
    maxWidth?: GridItemWidth
    maxHeight?: GridItemHeight
    draggable?: boolean
    resizable?: boolean
    static?: boolean
}

export type GridLayoutProps = {
    items: Array<GridItem>
    layout: Array<GridItemPosition>
    /**
     * @default 16
     */
    margin?: number
    onLayoutChange?: (layout: Array<GridItemPosition>) => void
    children?: undefined
}

export default class GridLayout extends React.PureComponent<GridLayoutProps>{
    static defaultProps: Partial<GridLayoutProps> = {
        margin: 16,
    }

    static propTypes = {
        margin: PropTypes.number,
        onLayoutChange: PropTypes.func,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string,
            children: PropTypes.node.isRequired
        })).isRequired,
        layout: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            col: PropTypes.number.isRequired,
            row: PropTypes.number.isRequired,
            width: PropTypes.oneOf(gridItemWidths).isRequired,
            height: PropTypes.number.isRequired,
            minWidth: PropTypes.oneOf(gridItemWidths),
            minHeight: PropTypes.number,
            maxWidth: PropTypes.oneOf(gridItemWidths),
            maxHeight: PropTypes.number,
            draggable: PropTypes.bool,
            resizable: PropTypes.bool,
            static: PropTypes.bool,
        })).isRequired
    }

    _layoutWasChangedWorkaround = false

    componentDidMount(){
        this.validateItemLayout()
    }

    onLayoutChange = (layouts: Array<Layout>) => {
        const {onLayoutChange} = this.props
        onLayoutChange &&
            this._layoutWasChangedWorkaround &&
            onLayoutChange(layouts.map(layoutToGridItemPosition))
        this._layoutWasChangedWorkaround = false
    }

    validateItemLayout = () => {
        if(process.env.NODE_ENV === 'production') return

        const items = new Set(this.props.items.map(item => item.id))
        const layouts = new Set(this.props.layout.map(layout => layout.id))

        items.forEach(item => {
            if(!layouts.has(item)){
                console.error(`Error: Item with id: ${item} is missing layout`)
            }
        })

        layouts.forEach(layout => {
            if(!items.has(layout)){
                console.warn(`Warning: Layout with id: ${layout} does not correspond to any item`)
            }
        })
    }

    onDragResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        this._layoutWasChangedWorkaround = !isEqual(oldItem, newItem)
    }

    render(){
        const {items, layout, margin = 16} = this.props
        const rglLayout = Object.values(layout).map(gridItemPositionToLayout)

        return (
            <ReactGridLayout
                className='layout'
                cols={12}
                rowHeight={90}
                layout={rglLayout}
                compactType={'vertical'}
                margin={[margin, margin]}
                containerPadding={[0, 0]}
                autoSize
                measureBeforeMount
                // width= // TODO: set this one such that width is fixed, should be someting large, but not too large... hmm.
                useCSSTransforms
                preventCollision={false}
                onLayoutChange={this.onLayoutChange}
                onResizeStop={this.onDragResizeStop}
                onDragStop={this.onDragResizeStop}
            >
                {items.map(({id, backgroundColor, children}) => (
                    <GridItemContainer
                        key={id}
                        backgroundColor={backgroundColor || 'inherit'}
                    >
                        {children}
                    </GridItemContainer>))
                }
            </ReactGridLayout>
        )
    }
}