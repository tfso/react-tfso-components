/// <reference types="react" />
import { BoardItems, ScreenType, BoardItemDimensions, BoardItemLayout, BoardDimensions } from './types';
import { Breakpoint, BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
export declare function calculateBoardRows(items: BoardItems, screenType: ScreenType): number;
export declare function calculateBoardHeight(rows: number, spacing: number, rowHeight: number): number;
export declare function calculateItemDimensions(item: BoardItemLayout, { rowHeight, colWidth, spacing }: BoardDimensions): BoardItemDimensions;
export declare function calculateItemLayout(item: BoardItemLayout, { top, left }: Pick<BoardItemDimensions, 'top' | 'left'>, { rowHeight, colWidth, spacing }: BoardDimensions): BoardItemLayout;
export declare function getBreakpointFromWidth(breakpoints: BreakpointValues, width: number): Breakpoint;
export declare function sortBreakpoints(breakpoints: BreakpointValues): Array<Breakpoint>;
export declare function collides(bil1?: BoardItemLayout, bil2?: BoardItemLayout): boolean;
export declare function compact(items: BoardItems, screenType: ScreenType): BoardItems;
export declare function compareBoardItemLayout(a: BoardItemLayout, b: BoardItemLayout): 0 | 1 | -1;
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
        desktop?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
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
        desktop?: Readonly<{
            col: number;
            row: number;
            colSpan: number;
            rowSpan: number;
        }> | undefined;
        component: import("react").ElementType<{
            screenType: ScreenType;
        }>;
    };
};
//# sourceMappingURL=utils.d.ts.map