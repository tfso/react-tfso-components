/// <reference types="react-grid-layout" />
import React from 'react';
import PropTypes from 'prop-types';
import RGL from 'react-grid-layout/';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
declare type GridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'onequarter' | 'onethird' | 'half' | 'twothirds' | 'threequarters' | 'full';
declare type GridItemHeight = number;
export declare type GridItem = {
    id: string;
    backgroundColor?: string;
    children: React.ReactNode;
};
export declare type GridItemPosition = {
    id: string;
    col: number;
    row: number;
    width: GridItemWidth;
    height: GridItemHeight;
    minWidth?: GridItemWidth;
    minHeight?: GridItemHeight;
    maxWidth?: GridItemWidth;
    maxHeight?: GridItemHeight;
    draggable?: boolean;
    resizable?: boolean;
    static?: boolean;
};
export declare type GridLayoutProps = {
    items: Array<GridItem>;
    layout: Array<GridItemPosition>;
    /**
     * @default 16
     */
    margin?: number;
    onLayoutChange?: (layout: Array<GridItemPosition>) => void;
    children?: undefined;
};
export default class GridLayout extends React.PureComponent<GridLayoutProps> {
    static defaultProps: Partial<GridLayoutProps>;
    static propTypes: {
        margin: PropTypes.Requireable<number>;
        onLayoutChange: PropTypes.Requireable<(...args: any[]) => any>;
        items: PropTypes.Validator<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            backgroundColor: PropTypes.Requireable<string>;
            children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        }> | null)[]>;
        layout: PropTypes.Validator<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            col: PropTypes.Validator<number>;
            row: PropTypes.Validator<number>;
            width: PropTypes.Validator<React.ReactText>;
            height: PropTypes.Validator<number>;
            minWidth: PropTypes.Requireable<React.ReactText>;
            minHeight: PropTypes.Requireable<number>;
            maxWidth: PropTypes.Requireable<React.ReactText>;
            maxHeight: PropTypes.Requireable<number>;
            draggable: PropTypes.Requireable<boolean>;
            resizable: PropTypes.Requireable<boolean>;
            static: PropTypes.Requireable<boolean>;
        }> | null)[]>;
    };
    _layoutWasChangedWorkaround: boolean;
    componentDidMount(): void;
    onLayoutChange: (layouts: RGL.Layout[]) => void;
    validateItemLayout: () => void;
    onDragResizeStop: (layout: RGL.Layout[], oldItem: RGL.Layout, newItem: RGL.Layout) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=GridLayout.d.ts.map