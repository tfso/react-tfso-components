import React from 'react'
import {BoardItems, ScreenType, BoardItem, BoardDimensions} from './types'
import {calculateItemDimensions, calculateItemLayout, compact, moveItem} from './utils'
import {BoardItemContainerProps} from './BoardItemContainer'
import {BoardItemPlaceholderProps} from './BoardItemPlaceholder'
import isEqual from 'lodash/isEqual'

export type BoardState = {
    items: BoardItems
    activeDrag: BoardItemContainerProps & {key: React.Key} | null
    oldDragItem: BoardItem | null
    placeholder: BoardItemPlaceholderProps | null
}

export enum BoardActionType { 'DRAG_START' = 'DRAG_START', 'DRAGGING' = 'DRAGGING', 'DRAG_STOP' = 'DRAG_STOP', 'RESET_ITEMS' = 'RESET_ITEMS' }

type DragActionArgs = {
    screenType: ScreenType
    boardDimensions: BoardDimensions
}

type ActionDragStart = {
    type: BoardActionType.DRAG_START
    key: React.Key
} & DragActionArgs

type ActionDrag = {
    type: BoardActionType.DRAGGING
    deltaX: number
    deltaY: number
} & DragActionArgs

type ActionDragStop = {
    type: BoardActionType.DRAG_STOP
} & DragActionArgs

type ActionResetItems = {
    type: BoardActionType.RESET_ITEMS
    items: BoardItems
}

type BoardAction = ActionDrag | ActionDragStart | ActionDragStop | ActionResetItems

export function boardInit(items: BoardItems): BoardState{
    return {
        items,
        placeholder: null,
        oldDragItem: null,
        activeDrag: null
    }
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState{
    switch(action.type){
    case BoardActionType.DRAG_START:{
        const {key, screenType, boardDimensions} = action
        const item = state.items[key]
        if(!item){
            return state
        }
        const dimensions = calculateItemDimensions(item[screenType]!, boardDimensions)
        return {
            ...state,
            oldDragItem: item,
            activeDrag: {...dimensions, key, dragging: true}
        }
    }
    case BoardActionType.DRAGGING:{
        const {activeDrag, items} = state
        const {deltaX, deltaY, boardDimensions, screenType} = action
        if(!activeDrag || !(deltaX + deltaY)){
            return state
        }

        // Constraining movement to within the container bounds
        const top = Math.max(activeDrag.top + deltaY, 0)
        const left = Math.min(Math.max(activeDrag.left + deltaX, 0), boardDimensions.width - activeDrag.width)

        const item = {...items[activeDrag.key]}
        const itemLayout = calculateItemLayout(item[screenType]!, {top, left}, boardDimensions)

        const newDragItem = {...activeDrag, top, left}
        const newItems = compact(moveItem(newDragItem.key, items, itemLayout.col, itemLayout.row, screenType), screenType)
        return {
            ...state,
            items: newItems,
            activeDrag: {...activeDrag, top, left},
            placeholder: calculateItemDimensions(newItems[activeDrag.key][screenType]!, boardDimensions)
        }
    }
    case BoardActionType.DRAG_STOP:{
        const {activeDrag, items, oldDragItem} = state
        const {screenType, boardDimensions} = action
        if(!activeDrag){
            return state
        }
        const {key} = activeDrag
        const item = {...items[key], [screenType]: calculateItemLayout(items[key][screenType]!, activeDrag, boardDimensions)}
        if(isEqual(item, oldDragItem)){
            return {
                items: state.items,
                activeDrag: null,
                placeholder: null,
                oldDragItem: null
            }
        }
        const newItems = compact({...items, [activeDrag.key]: item}, screenType)

        return {
            items: newItems,
            activeDrag: null,
            placeholder: null,
            oldDragItem: null,
        }
    }
    case BoardActionType.RESET_ITEMS:
        return action.items !== state.items ? {
            ...state,
            items: action.items
        } : state
    default:
        return state
    }
}