import React from 'react'

import PropTypes from 'prop-types'

import GL from './GridLayout/GridLayout'
import { LayoutItem, Layout } from './GridLayout/utils'

type GridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full'
type GridItemHeight = number
const gridItemWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'onequarter', 'onethird', 'half', 'twothirds', 'threequarters', 'full']
const gridItemWidthNumberMap: {[P in GridItemWidth]: number} = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 'onequarter': 3, 'onethird': 4, 'half': 6, 'twothirds': 8, 'threequarters': 9, 'full': 12}
const numberGridItemWithMap: {[n: number]: GridItemWidth} = {1: 1, 2: 2, 3: 'onequarter', 4: 'onethird', 5: 5, 6: 'half', 7: 7, 8: 'twothirds', 9: 'threequarters', 10: 10, 11: 11, 12: 'full'}

const toGridItemWidth = (w?: number): GridItemWidth | undefined => w === undefined ? undefined : numberGridItemWithMap[Math.min(12, Math.trunc(w))]
const toGridItemHeight = (w?: number): GridItemHeight | undefined => w === undefined ? undefined : Math.min(12, Math.trunc(w)) as GridItemHeight

const gridItemPositionToLayout = (position: GridItemPosition): LayoutItem => ({
    id: position.id,
    col: position.col,
    row: position.row,
    height: position.height,
    width: gridItemWidthNumberMap[position.width],
    draggable: true
})

const layoutToGridItemPosition = (layout: LayoutItem): GridItemPosition => ({
    id: layout.id!,
    col: layout.col,
    row: layout.row,
    width: toGridItemWidth(layout.width)!,
    height: toGridItemHeight(layout.height)!
})

export type GridItem = {
    id: string
    children: React.ReactNode
}

export type GridItemPosition = {
    id: string
    col: number
    row: number
    width: GridItemWidth
    height: GridItemHeight
}

export type GridLayoutProps = {
    items: Array<GridItem>
    draggable?: boolean
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
        draggable: PropTypes.bool,
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
        })).isRequired
    }

    componentDidMount(){
        this.validateItemLayout()
    }

    onLayoutChange = (layouts: Layout) => {
        const {onLayoutChange} = this.props
        onLayoutChange && onLayoutChange(Object.values(layouts).map(layoutToGridItemPosition))
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

    render(){
        const {items, layout, margin = 16, draggable} = this.props
        const rglLayout = layout
            .map(gridItemPositionToLayout)
            .reduce((l, item) => {
                l[item.id] = item
                return l
            }, {})

        return (
            <GL
                className='layout'
                cols={12}
                rowHeight={90}
                layout={rglLayout}
                margin={[margin, margin]}
                containerPadding={[0, 0]}
                onLayoutChange={this.onLayoutChange}
                draggable={draggable}
            >
                {// TODO: Perhaps cloning items and adding key is better, or, requiring key ? hmm
                    items.map(({id, children}) => (
                        <div key={id}>
                            {children}
                        </div>))
                }
            </GL>
        )
    }
}