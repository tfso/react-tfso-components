import React from 'react'
import PropTypes from 'prop-types'
import {DraggableCore, DraggableData, DraggableEvent} from 'react-draggable'

import {BoardProps, ScreenType} from '.'
import {BoardDimensions} from './types'
import {calculateBoardHeight, calculateBoardRows, calculateItemDimensions} from './utils'
import {boardReducer, boardInit, BoardActionType} from './boardState'
import BoardContainer from './BoardContainer'
import BoardItemContainer from './BoardItemContainer'
import BoardItemPlaceholder from './BoardItemPlaceholder'
import useWidth from './useWidth'
import useScreenType from './useScreenType'

const COLUMNS = 12

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
    const [state, dispatch] = React.useReducer(boardReducer, props.items, boardInit)
    const [width, setWidth] = React.useState(1920)

    // Component received new Items
    React.useEffect(() => dispatch({type: BoardActionType.RESET_ITEMS, items: props.items}), [props.items])

    // Board dimensions
    useWidth(rootRef, React.useCallback(newWidth => setWidth(newWidth), [setWidth]))
    const screenType = useScreenType(width)
    const height = useHeight({items: state.items, spacing: props.spacing, rowHeight: props.rowHeight}, screenType)
    const colWidth = React.useMemo(() => Math.round((width + spacing) / (COLUMNS)) - spacing, [spacing, width])
    const boardDimensions = React.useMemo<BoardDimensions>(() => ({rowHeight, colWidth, spacing, width}), [rowHeight, colWidth, spacing, width])

    // Callbacks
    const onDragStart = React.useCallback((key: React.Key) => {
        dispatch({type: BoardActionType.DRAG_START, key, boardDimensions, screenType})
    }, [screenType, boardDimensions])

    const onDrag = React.useCallback((_: DraggableEvent, {deltaX, deltaY}: DraggableData) => {
        dispatch({type: BoardActionType.DRAGGING, deltaX, deltaY, boardDimensions, screenType})
    }, [screenType, boardDimensions])

    const onDragStop = React.useCallback(() => {
        dispatch({type: BoardActionType.DRAG_STOP, boardDimensions, screenType})
        if(onChange && state.items !== props.items){
            onChange(state.items)
        }
    }, [screenType, boardDimensions, onChange, props.items, state.items])

    const {items, activeDrag, placeholder} = state
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
    items: PropTypes.object.isRequired, // Maybe todo: more specific checking?
    locked: PropTypes.bool,
    onChange: PropTypes.func,
    rowHeight: PropTypes.number.isRequired,
    spacing: PropTypes.number,
}

export default Board