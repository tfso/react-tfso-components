import React from 'react'
import BoardContainer from './BoardContainer'
import {BoardItems, ScreenType} from './types'
import {calculateBoardHeight, calculateBoardRows, calculateItemDimensions, calculateItemLayout} from './utils'
import BoardItemContainer, {BoardItemContainerProps} from './BoardItemContainer'
import {useWidth} from './useWidth'
import useScreenType from './useScreenType'
import {DraggableCore, DraggableData, DraggableEvent} from 'react-draggable'
import BoardItemPlaceholder, {BoardItemPlaceholdProps} from './BoardItemPlaceholder'

export type BoardProps = {
    locked?: boolean
    items: BoardItems
    spacing?: number
    rowHeight: number
    onChange?: (items: BoardItems) => void
    children?: undefined
}

const columns = 12

const useHeight = (
    {items, spacing = 0, rowHeight}: Pick<BoardProps, 'items'|'spacing'|'rowHeight'>,
    screenType: ScreenType
) => {
    const bottomRow = React.useMemo(() => calculateBoardRows(items, screenType), [items, screenType])
    const height = React.useMemo(() => calculateBoardHeight(bottomRow, spacing, rowHeight), [bottomRow, spacing, rowHeight])
    return height
}

const Board = (props: BoardProps) => {
    const {spacing = 0, rowHeight, locked, onChange} = props
    const rootRef = React.useRef<HTMLDivElement>(null)

    // State
    const [items, setItems] = React.useState(props.items)
    const [activeDrag, setActiveDrag] = React.useState<BoardItemContainerProps & {key: React.Key} | null>(null)
    const [placeholder, setPlaceholder] = React.useState<BoardItemPlaceholdProps | null>(null)
    const [width, setWidth] = React.useState(1920)

    // Board dimensions
    useWidth(rootRef, (width) => setWidth(width))
    const screenType = useScreenType(width)
    const height = useHeight(props, screenType)
    const colWidth = React.useMemo(() => Math.round((width + spacing) / (columns)) - spacing, [spacing, width])
    const boardDimensions = React.useMemo(() => ({rowHeight, colWidth, spacing}), [rowHeight, colWidth, spacing])

    // Callbacks
    const onDragStart = React.useCallback((key: React.Key) => {
        const item = {...items[key]}
        const dimensions = calculateItemDimensions(item[screenType]!, boardDimensions)
        setActiveDrag({...dimensions, key, dragging: true})
    }, [items, screenType, boardDimensions])

    const onDrag = React.useCallback((_: DraggableEvent, {deltaX, deltaY}: DraggableData) => {
        if(!activeDrag) return

        // Constraining movement to within the container bounds
        const top = Math.max(activeDrag.top + deltaY, 0)
        const left = Math.min(Math.max(activeDrag.left + deltaX, 0), width - activeDrag.width)

        const item = {...items[activeDrag.key]}
        const placeholderLayout = calculateItemLayout(item[screenType]!, {top, left}, boardDimensions)

        // TODO: Move items out of collisions.
        setActiveDrag({...activeDrag, top, left})
        setPlaceholder(calculateItemDimensions(placeholderLayout, boardDimensions))
    }, [activeDrag, items, screenType, boardDimensions, width])

    const onDragStop = React.useCallback(() => {
        if(!activeDrag){
            return
        }
        const {key} = activeDrag
        const item = {...items[key], [screenType]: calculateItemLayout(items[key][screenType]!, activeDrag, boardDimensions)}
        const newItems = {...items, [activeDrag.key]: item}
        setItems(newItems)
        setActiveDrag(null)
        setPlaceholder(null)
        // TODO: Check that the newItem was in fact moved to a new position.
        // If not, the layout should not have changed, and we should not invoke the onChange callback.
        // Might need a new state variable for this.
        onChange && onChange(newItems)
    }, [activeDrag, items, screenType, boardDimensions, onChange])

    return (
        <div ref={rootRef}>
            <BoardContainer height={height}>
                {Object.values(items).map(item => {
                    const layout = item[screenType]
                    if(!layout){
                        return null
                    }
                    const containerProps = activeDrag && activeDrag.key === item.key
                        ? activeDrag
                        : calculateItemDimensions(layout, boardDimensions)

                    const Component = item.component
                    return locked ? (
                        <BoardItemContainer {...containerProps} key={item.key}>
                            <Component screenType={screenType} />
                        </BoardItemContainer>
                    ) : (
                        <DraggableCore
                            key={item.key}
                            onStart={() => onDragStart(item.key)}
                            onDrag={onDrag}
                            onStop={onDragStop}
                        >
                            <BoardItemContainer {...containerProps}>
                                <Component screenType={screenType} />
                            </BoardItemContainer>
                        </DraggableCore>
                    )
                })}
                {placeholder && <BoardItemPlaceholder {...placeholder} />}
            </BoardContainer>
        </div>
    )
}

Board.propTypes = {
    // TODO
}

export default Board