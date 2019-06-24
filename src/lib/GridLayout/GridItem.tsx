import React from 'react'
import PropTypes from 'prop-types'
import {DraggableCore} from 'react-draggable'
import {
    setTransform,
    PartialPosition,
    ReactDraggableCallbackData,
    GridDragEvent,
    Position} from './utils'
import classNames from 'classnames'

type GridItemCallback<TData extends GridDragEvent> = (
    id: string,
    width: number,
    height: number,
    data: TData
) => void

type State = {
    dragging: PartialPosition | null,
}

type Props = {
    children: React.ReactElement<any>,
    cols: number,
    colWidth: number,
    margin: [number, number],
    containerPadding: [number, number],
    rowHeight: number,
    draggable: boolean,

    className: string,
    style?: Object

    col: number,
    row: number,
    width: number,
    height: number,

    id: string,

    onDrag?: GridItemCallback<GridDragEvent>,
    onDragStart?: GridItemCallback<GridDragEvent>,
    onDragStop?: GridItemCallback<GridDragEvent>
}

/**
 * An individual item within a ReactGridLayout.
 */
export default class GridItem extends React.Component<Props, State>{
    static propTypes = {
        // Children must be only a single element
        children: PropTypes.element,

        // General grid attributes
        cols: PropTypes.number.isRequired,
        colWidth: PropTypes.number.isRequired,
        rowHeight: PropTypes.number.isRequired,
        margin: PropTypes.array.isRequired,
        containerPadding: PropTypes.array.isRequired,

        // These are all in grid units
        col: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        // ID is nice to have for callbacks
        id: PropTypes.string.isRequired,

        // Functions
        onDragStop: PropTypes.func,
        onDragStart: PropTypes.func,
        onDrag: PropTypes.func,

        // Flags
        draggable: PropTypes.bool.isRequired,

        // Others
        className: PropTypes.string,
    }

    static defaultProps = {
        className: ''
    }

    state: State = {
        dragging: null,
    }

    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  col             X coordinate in grid units.
     * @param  {Number}  row             Y coordinate in grid units.
     * @param  {Number}  width             W coordinate in grid units.
     * @param  {Number}  height             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */
    calcPosition(
        col: number,
        row: number,
        width: number,
        height: number,
        state?: State
    ): Position{
        const {margin, containerPadding, rowHeight, colWidth} = this.props

        const out = {
            left: Math.round((colWidth + margin[0]) * col + containerPadding[0]),
            top: Math.round((rowHeight + margin[1]) * row + containerPadding[1]),
            // 0 * Infinity === NaN, which causes problems with resize constraints;
            // Fix this if it occurs.
            // Note we do it here rather than later because Math.round(Infinity) causes deopt
            width:
                width === Infinity
                    ? width
                    : Math.round(colWidth * width + Math.max(0, width - 1) * margin[0]),
            height:
                height === Infinity
                    ? height
                    : Math.round(rowHeight * height + Math.max(0, height - 1) * margin[1])
        }

        if(state && state.dragging){
            out.top = Math.round(state.dragging.top)
            out.left = Math.round(state.dragging.left)
        }

        return out
    }

    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */
    calcXY(top: number, left: number): { x: number, y: number }{
        const {margin, cols, rowHeight, width: w, colWidth} = this.props

        let x = Math.round((left - margin[0]) / (colWidth + margin[0]))
        let y = Math.round((top - margin[1]) / (rowHeight + margin[1]))

        // Capping
        x = Math.max(Math.min(x, cols - w), 0)
        y = Math.max(y, 0)

        return {x, y}
    }

    mixinDraggable(child: React.ReactElement){
        return (
            <DraggableCore
                onStart={this.onDragHandler('onDragStart') as any}
                onDrag={this.onDragHandler('onDrag') as any}
                onStop={this.onDragHandler('onDragStop') as any}
                cancel=''
                handle=''
            >
                {child}
            </DraggableCore>
        )
    }

    onDragHandler(handlerName: string){
        return (e: Event, {node, deltaX, deltaY}: ReactDraggableCallbackData) => {
            const handler = this.props[handlerName]
            if(!handler) return

            const newPosition: PartialPosition = {top: 0, left: 0}

            // Get new XY
            switch(handlerName){
            case 'onDragStart':{
                // TODO: this wont work on nested parents
                const {offsetParent} = node
                if(!offsetParent) return
                const parentRect = offsetParent.getBoundingClientRect()
                const clientRect = node.getBoundingClientRect()
                newPosition.left =
                    clientRect.left - parentRect.left + offsetParent.scrollLeft
                newPosition.top =
                    clientRect.top - parentRect.top + offsetParent.scrollTop
                this.setState({dragging: newPosition})
                break
            }
            case 'onDrag':
                if(!this.state.dragging){
                    throw new Error('onDrag called before onDragStart.')
                }
                newPosition.left = this.state.dragging.left + deltaX
                newPosition.top = this.state.dragging.top + deltaY
                this.setState({dragging: newPosition})
                break
            case 'onDragStop':
                if(!this.state.dragging){
                    throw new Error('onDragEnd called before onDragStart.')
                }
                newPosition.left = this.state.dragging.left
                newPosition.top = this.state.dragging.top
                this.setState({dragging: null})
                break
            default:
                throw new Error(
                    'onDragHandler called with unrecognized handlerName: ' + handlerName
                )
            }

            const {x, y} = this.calcXY(newPosition.top, newPosition.left)

            return handler.call(this, this.props.id, x, y, {e, node, newPosition})
        }
    }

    render(){
        const {
            col,
            row,
            width,
            height,
            draggable,
        } = this.props

        const pos = this.calcPosition(col, row, width, height, this.state)
        const child = React.Children.only(this.props.children)

        // Create the child element. We clone the existing element but modify its className and style.
        const newChild = React.cloneElement(child, {
            className: classNames(
                'react-grid-item',
                child.props.className,
                this.props.className,
                {
                    static: false,
                    cssTransforms: true,
                    'react-draggable': draggable,
                    'react-draggable-dragging': Boolean(this.state.dragging),
                }
            ),
            // We can set the width and height on the child, but unfortunately we can't set the position.
            style: {
                ...this.props.style,
                ...child.props.style,
                ...setTransform(pos)
            }
        })

        if(draggable){
            return this.mixinDraggable(newChild)
        }

        return newChild
    }
}
