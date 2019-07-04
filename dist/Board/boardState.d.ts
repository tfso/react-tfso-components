import React from 'react';
import { BoardItems, ScreenType, BoardItem } from '.';
import { BoardDimensions } from './types';
import { BoardItemContainerProps } from './BoardItemContainer';
import { BoardItemPlaceholderProps } from './BoardItemPlaceholder';
export declare type BoardState = {
    items: BoardItems;
    activeDrag: BoardItemContainerProps & {
        key: React.Key;
    } | null;
    oldDragItem: BoardItem | null;
    placeholder: BoardItemPlaceholderProps | null;
};
export declare enum BoardActionType {
    'DRAG_START' = "DRAG_START",
    'DRAGGING' = "DRAGGING",
    'DRAG_STOP' = "DRAG_STOP",
    'RESET_ITEMS' = "RESET_ITEMS"
}
declare type DragActionArgs = {
    screenType: ScreenType;
    boardDimensions: BoardDimensions;
};
declare type ActionDragStart = {
    type: BoardActionType.DRAG_START;
    key: React.Key;
} & DragActionArgs;
declare type ActionDrag = {
    type: BoardActionType.DRAGGING;
    deltaX: number;
    deltaY: number;
} & DragActionArgs;
declare type ActionDragStop = {
    type: BoardActionType.DRAG_STOP;
} & DragActionArgs;
declare type ActionResetItems = {
    type: BoardActionType.RESET_ITEMS;
    items: BoardItems;
};
declare type BoardAction = ActionDrag | ActionDragStart | ActionDragStop | ActionResetItems;
export declare function boardInit(items: BoardItems): BoardState;
export declare function boardReducer(state: BoardState, action: BoardAction): BoardState;
export {};
//# sourceMappingURL=boardState.d.ts.map