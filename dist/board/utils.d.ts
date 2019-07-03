/// <reference types="react" />
import { BoardItems, ScreenType, BoardItemDimensions, BoardItemLayout, BoardDimensions, BoardItem } from './types';
import { Breakpoint, BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
export declare function calculateBoardRows(items: BoardItems, screenType: ScreenType): number;
export declare function calculateBoardHeight(rows: number, spacing: number, rowHeight: number): number;
export declare function calculateItemDimensions(item: BoardItemLayout, { rowHeight, colWidth, spacing }: BoardDimensions): BoardItemDimensions;
export declare function calculateItemLayout(item: BoardItemLayout, { top, left }: Pick<BoardItemDimensions, 'top' | 'left'>, { rowHeight, colWidth, spacing }: BoardDimensions): BoardItemLayout;
export declare function getBreakpointFromWidth(breakpoints: BreakpointValues, width: number): Breakpoint;
export declare function compact(items: BoardItems, screenType: ScreenType): BoardItems;
export declare function moveItem(key: string | number, items: BoardItems, col: number, row: number, screenType: ScreenType): {
    [x: string]: Readonly<{
        key: string | number;
        mobile?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        tablet?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        desktop: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }>;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    }> | {
        key: string | number;
        mobile?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        tablet?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        desktop: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }>;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    };
};
/**
 * Add a new item to the board
 * @param items Existing items in the board
 * @param item New item to add
 */
export declare function addBoardItem(items: BoardItems, item: BoardItem): {
    [x: string]: Readonly<{
        key: string | number;
        mobile?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        tablet?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        desktop: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }>;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    }>;
};
export declare function removeBoardItem(items: BoardItems, key: string): Readonly<{
    [key: string]: Readonly<{
        key: string | number;
        mobile?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        tablet?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        desktop: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }>;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    }>;
}>;
export declare function hideBoardItem(items: BoardItems, key: string, screenType: ScreenType): Readonly<{
    [key: string]: Readonly<{
        key: string | number;
        mobile?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        tablet?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        desktop: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }>;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    }>;
}>;
export declare function showBoardItem(items: BoardItems, key: string, screenType: ScreenType): void;
//# sourceMappingURL=utils.d.ts.map