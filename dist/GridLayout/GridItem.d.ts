import React from 'react';
import PropTypes from 'prop-types';
import { PartialPosition, ReactDraggableCallbackData, GridDragEvent, Position } from './utils';
declare type GridItemCallback<TData extends GridDragEvent> = (id: string, width: number, height: number, data: TData) => void;
declare type State = {
    dragging: PartialPosition | null;
};
declare type Props = {
    children: React.ReactElement<any>;
    cols: number;
    colWidth: number;
    margin: [number, number];
    containerPadding: [number, number];
    rowHeight: number;
    draggable: boolean;
    className: string;
    style?: Object;
    col: number;
    row: number;
    width: number;
    height: number;
    id: string;
    onDrag?: GridItemCallback<GridDragEvent>;
    onDragStart?: GridItemCallback<GridDragEvent>;
    onDragStop?: GridItemCallback<GridDragEvent>;
};
/**
 * An individual item within a ReactGridLayout.
 */
export default class GridItem extends React.Component<Props, State> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        cols: PropTypes.Validator<number>;
        colWidth: PropTypes.Validator<number>;
        rowHeight: PropTypes.Validator<number>;
        margin: PropTypes.Validator<any[]>;
        containerPadding: PropTypes.Validator<any[]>;
        col: PropTypes.Validator<number>;
        row: PropTypes.Validator<number>;
        width: PropTypes.Validator<number>;
        height: PropTypes.Validator<number>;
        id: PropTypes.Validator<string>;
        onDragStop: PropTypes.Requireable<(...args: any[]) => any>;
        onDragStart: PropTypes.Requireable<(...args: any[]) => any>;
        onDrag: PropTypes.Requireable<(...args: any[]) => any>;
        draggable: PropTypes.Validator<boolean>;
        className: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        className: string;
    };
    state: State;
    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  col             X coordinate in grid units.
     * @param  {Number}  row             Y coordinate in grid units.
     * @param  {Number}  width             W coordinate in grid units.
     * @param  {Number}  height             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */
    calcPosition(col: number, row: number, width: number, height: number, state?: State): Position;
    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */
    calcXY(top: number, left: number): {
        x: number;
        y: number;
    };
    mixinDraggable(child: React.ReactElement): JSX.Element;
    onDragHandler(handlerName: string): (e: Event, { node, deltaX, deltaY }: ReactDraggableCallbackData) => any;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=GridItem.d.ts.map