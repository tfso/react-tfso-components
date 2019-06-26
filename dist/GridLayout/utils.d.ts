import React from 'react';
export declare type LayoutItem = Readonly<{
    width: number;
    height: number;
    col: number;
    row: number;
    id: string;
}>;
export declare type Layout = Readonly<{
    [key: string]: LayoutItem;
}>;
export declare type Position = Readonly<{
    left: number;
    top: number;
    width: number;
    height: number;
}>;
export declare type ReactDraggableCallbackData = {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
};
export declare type PartialPosition = {
    left: number;
    top: number;
};
export declare type Size = {
    width: number;
    height: number;
};
export declare type GridDragEvent = {
    e: Event;
    node: HTMLElement;
    newPosition: PartialPosition;
};
export declare type GridResizeEvent = {
    e: Event;
    node: HTMLElement;
    size: Size;
};
export declare type EventCallback = (layout: Layout, oldItem: LayoutItem | null, newItem: LayoutItem | null, placeholder: LayoutItem | null, event: Event, node: HTMLElement) => void;
/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export declare function bottom(layout: Layout): number;
/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */
export declare function childrenEqual(a: Array<React.ReactElement>, b: Array<React.ReactElement>): boolean;
/**
 * Given two layoutitems, check if they collide.
 */
export declare function collides(l1: LayoutItem, l2: LayoutItem): boolean;
export declare function compact(layout: Layout): Layout;
export declare function constrainCol(targetCol: number, width: number, columns: number): number;
/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} cols Number of columns.
 */
export declare function correctBounds(layout: Layout, cols: number): Layout;
export declare function getFirstCollision(layoutItems: ReadonlyArray<LayoutItem>, target: LayoutItem): Readonly<{
    width: number;
    height: number;
    col: number;
    row: number;
    id: string;
}> | undefined;
export declare function getAllCollisions(layoutItems: ReadonlyArray<LayoutItem>, target: LayoutItem): readonly Readonly<{
    width: number;
    height: number;
    col: number;
    row: number;
    id: string;
}>[];
export declare function moveItem(itemId: string, layout: Layout, col: number, row: number, cols: number): {
    [x: string]: Readonly<{
        width: number;
        height: number;
        col: number;
        row: number;
        id: string;
    }> | {
        col: number;
        row: number;
        width: number;
        height: number;
        id: string;
    };
};
export declare function setTransform({ top, left, width, height }: Position): React.CSSProperties;
export declare function sortLayoutItems(layout: Layout, ascending?: boolean): ReadonlyArray<LayoutItem>;
/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */
export declare function synchronizeLayoutWithChildren(initialLayout: Layout, children: Array<React.ReactElement>, cols: number): Layout;
/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
export declare function validateLayout(layout: Layout, contextName?: string): void;
export declare function autoBindHandlers(el: Object, fns: Array<string>): void;
//# sourceMappingURL=utils.d.ts.map