import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import classNames from 'classnames'
import {
    autoBindHandlers,
    bottom,
    childrenEqual,
    compact,
    moveItem,
    synchronizeLayoutWithChildren,
    Layout,
    LayoutItem,
    validateLayout
} from './utils'
import GridItem from './GridItem'
import './styles.css'

type State = {
    activeDrag: LayoutItem | null
    layout: Layout
    mounted: boolean
    oldDragItem: LayoutItem | null
    oldLayout: Layout | null
}

export type GridLayoutProps = {
    className?: string
    style?: React.CSSProperties
    width: number
    cols: number
    layout: Layout
    margin: [number, number]
    containerPadding: [number, number] | null
    rowHeight: number
    draggable?: boolean

    // Callbacks
    onLayoutChange?: (layout: Layout) => void
    children: Array<React.ReactElement>
}

export default class GridLayout extends React.PureComponent<GridLayoutProps, State>{
    static displayName = 'GridLayout'

    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,

        // This can be set explicitly. If it is not set, it will automatically
        // be set to the container width. Note that resizes will *not* cause this to adjust.
        // If you need that behavior, use WidthProvider.
        width: PropTypes.number.isRequired,

        // # of cols.
        cols: PropTypes.number.isRequired,

        // layout is an array of object with the format:
        // {x: Number, y: Number, w: Number, h: Number, i: String}
        layout: function(props: GridLayoutProps){
            var layout = props.layout
            // I hope you're setting the data-grid property on the grid items
            if(layout === undefined){
                throw new Error('layout must be defined')
            }
            validateLayout(layout, 'layout')
        },

        // Margin between items [x, y] in px
        margin: PropTypes.arrayOf(PropTypes.number).isRequired,
        // Padding inside the container [x, y] in px
        containerPadding: PropTypes.arrayOf(PropTypes.number).isRequired,
        // Rows have a static height, but you can change this based on breakpoints if you like
        rowHeight: PropTypes.number.isRequired,

        draggable: PropTypes.bool,

        // Callback so you can save the layout. Calls after each drag & resize stops.
        onLayoutChange: PropTypes.func,

        // Children must not have duplicate keys.
        children: function(props: GridLayoutProps, propName: string){
            var children = props[propName]
            // Check children keys for duplicates. Throw if found.
            var keys = {}
            React.Children.forEach(children, function(child){
                if(keys[child.key]){
                    throw new Error(
                        'Duplicate child key \'' +
                        child.key +
                        '\' found!'
                    )
                }
                keys[child.key] = true
            })
        }
    }

    state: State = {
        activeDrag: null,
        layout: synchronizeLayoutWithChildren(
            this.props.layout,
            this.props.children,
            this.props.cols
        ),
        mounted: false,
        oldDragItem: null,
        oldLayout: null
    }

    constructor(props: GridLayoutProps, context: any){
        super(props, context)
        autoBindHandlers(this, [
            'onDragStart',
            'onDrag',
            'onDragStop'
        ])
    }

    componentDidMount(){
        this.setState({mounted: true})
        // Possibly call back with layout on mount. This should be done after correcting the layout width
        // to ensure we don't rerender with the wrong width.
        this.onLayoutMaybeChanged(this.state.layout, this.props.layout)
    }

    componentDidUpdate(prevProps: Readonly<GridLayoutProps>){
        const {layout, children, cols} = this.props
        let newLayoutBase: Layout | undefined
        if(!isEqual(prevProps.layout, layout)){
            newLayoutBase = layout
        }else if(!childrenEqual(prevProps.children, children)){
            newLayoutBase = this.state.layout
        }

        if(newLayoutBase !== undefined){
            const newLayout = synchronizeLayoutWithChildren(newLayoutBase, children, cols)
            const oldLayout = this.state.layout
            this.setState({layout: newLayout})
            this.onLayoutMaybeChanged(newLayout, oldLayout)
        }
    }

    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */
    containerHeight(){
        const nbRow = bottom(this.state.layout)
        const containerPaddingY = this.props.containerPadding
            ? this.props.containerPadding[1]
            : this.props.margin[1]
        return (
            nbRow * this.props.rowHeight +
            (nbRow - 1) * this.props.margin[1] +
            containerPaddingY * 2 +
            'px'
        )
    }

    /**
     * When dragging starts
     * @param {String} id Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDragStart(id: string){
        const {layout} = this.state
        var layoutItem = layout[id]
        if(!layoutItem) return

        this.setState({
            oldDragItem: {...layoutItem},
            oldLayout: this.state.layout
        })
    }

    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} id Id of the child
     * @param {Number} col X position of the move
     * @param {Number} row Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDrag(id: string, col: number, row: number){
        let {layout} = this.state
        const {cols} = this.props
        var l = layout[id]
        if(!l) return

        // Create placeholder (display only)
        var placeholder = {
            width: l.width,
            height: l.height,
            col: l.col,
            row: l.row,
            placeholder: true,
            id: id
        }

        // Move the element to the dragged location.
        layout = moveItem(id, layout, col, row, cols)

        this.setState({
            layout: compact(layout),
            activeDrag: placeholder
        })
    }

    onDragStop(id: string, col: number, row: number){
        const {oldDragItem} = this.state
        let {layout} = this.state
        const {cols} = this.props
        const l = layout[id]
        if(!l) return

        // Move the element here
        layout = moveItem(id, layout, col, row, cols)

        const newLayout = compact(layout)
        this.setState({
            activeDrag: null,
            layout: newLayout,
            oldDragItem: null,
            oldLayout: null
        })

        if(!isEqual(oldDragItem, l)){
            this.props.onLayoutChange && this.props.onLayoutChange(newLayout)
        }
    }

    onLayoutMaybeChanged(newLayout: Layout, oldLayout?: Layout){
        if(!oldLayout) oldLayout = this.state.layout
        if(!isEqual(oldLayout, newLayout)){
            this.props.onLayoutChange && this.props.onLayoutChange(newLayout)
        }
    }

    calcColWidth(): number{
        const {margin, containerPadding, cols, width} = this.props
        return (
            (width - margin[0] * (cols - 1) - ((containerPadding && containerPadding[0]) || 0) * 2) / cols
        )
    }

    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */
    placeholder(): React.ReactElement<any> | null {
        const {activeDrag} = this.state
        if(!activeDrag) return null
        const {
            cols,
            margin,
            containerPadding,
            rowHeight
        } = this.props

        // {...this.state.activeDrag} is pretty slow, actually
        return (
            <GridItem
                width={activeDrag.width}
                height={activeDrag.height}
                col={activeDrag.col}
                row={activeDrag.row}
                id={activeDrag.id}
                className='react-grid-placeholder'
                colWidth={this.calcColWidth()}
                cols={cols}
                margin={margin}
                containerPadding={containerPadding || margin}
                rowHeight={rowHeight}
                draggable={false}
            >
                <div />
            </GridItem>
        )
    }

    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */
    processGridItem(child: React.ReactElement): React.ReactElement | null | undefined{
        if(!child || !child.key) return
        const l = this.state.layout[child.key]
        if(!l) return null
        const {
            cols,
            margin,
            containerPadding,
            rowHeight,
            draggable
        } = this.props

        return (
            <GridItem
                colWidth={this.calcColWidth()}
                cols={cols}
                margin={margin}
                containerPadding={containerPadding || margin}
                rowHeight={rowHeight}
                onDragStop={this.onDragStop}
                onDragStart={this.onDragStart}
                onDrag={this.onDrag}
                draggable={!!draggable}
                width={l.width}
                height={l.height}
                col={l.col}
                row={l.row}
                id={l.id}
            >
                {child}
            </GridItem>
        )
    }

    render(){
        const {className, style} = this.props

        const mergedClassName = classNames('react-grid-layout', className)
        const mergedStyle = {
            height: this.containerHeight(),
            ...style
        }

        return (
            <div className={mergedClassName} style={mergedStyle}>
                {React.Children.map(this.props.children, (child: React.ReactElement) =>
                    this.processGridItem(child)
                )}
                {this.placeholder()}
            </div>
        )
    }
}