import React from 'react';
import PropTypes from 'prop-types';
import { Layout, LayoutItem } from './utils';
import './styles.css';
declare type State = {
    activeDrag: LayoutItem | null;
    layout: Layout;
    mounted: boolean;
    oldDragItem: LayoutItem | null;
    oldLayout: Layout | null;
};
export declare type GridLayoutProps = {
    className?: string;
    style?: React.CSSProperties;
    width: number;
    cols: number;
    layout: Layout;
    margin: [number, number];
    containerPadding: [number, number] | null;
    rowHeight: number;
    draggable?: boolean;
    onLayoutChange?: (layout: Layout) => void;
    children: Array<React.ReactElement>;
};
export default class GridLayout extends React.PureComponent<GridLayoutProps, State> {
    static displayName: string;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        width: PropTypes.Validator<number>;
        cols: PropTypes.Validator<number>;
        layout: (props: GridLayoutProps) => void;
        margin: PropTypes.Validator<(number | null)[]>;
        containerPadding: PropTypes.Validator<(number | null)[]>;
        rowHeight: PropTypes.Validator<number>;
        draggable: PropTypes.Requireable<boolean>;
        onLayoutChange: PropTypes.Requireable<(...args: any[]) => any>;
        children: (props: GridLayoutProps, propName: string) => void;
    };
    state: State;
    constructor(props: GridLayoutProps, context: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<GridLayoutProps>): void;
    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */
    containerHeight(): string;
    /**
     * When dragging starts
     * @param {String} id Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDragStart(id: string): void;
    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} id Id of the child
     * @param {Number} col X position of the move
     * @param {Number} row Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
    onDrag(id: string, col: number, row: number): void;
    onDragStop(id: string, col: number, row: number): void;
    onLayoutMaybeChanged(newLayout: Layout, oldLayout?: Layout): void;
    calcColWidth(): number;
    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */
    placeholder(): React.ReactElement<any> | null;
    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */
    processGridItem(child: React.ReactElement): React.ReactElement | null | undefined;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=GridLayout.d.ts.map