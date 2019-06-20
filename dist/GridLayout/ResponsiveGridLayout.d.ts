import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from './utils';
import { GridLayoutProps } from './GridLayout';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
declare type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
declare type State = {
    layout: Layout;
    breakpoint: Breakpoint;
    cols: number;
};
export declare type ResponsiveGridLayoutProps = Omit<GridLayoutProps, 'cols' | 'layout' | 'onLayoutChange'> & {
    breakpoint?: Breakpoint;
    breakpoints: Partial<{
        [BP in Breakpoint]: number;
    }>;
    cols: Partial<{
        [BP in Breakpoint]: number;
    }>;
    layouts: Partial<{
        [BP in Breakpoint]: Layout;
    }>;
    onBreakpointChange?: (breakpoint: Breakpoint, cols: number) => void;
    onLayoutChange?: (layout: Layout, breakpoint: Breakpoint, layouts: Partial<{
        [BP in Breakpoint]: Layout;
    }>) => void;
    onWidthChange?: (containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number] | null) => void;
};
export default class ResponsiveGridLayout extends React.PureComponent<ResponsiveGridLayoutProps, State> {
    static propTypes: {
        breakpoint: PropTypes.Requireable<string>;
        breakpoints: PropTypes.Requireable<object>;
        cols: PropTypes.Requireable<object>;
        layouts(props: ResponsiveGridLayoutProps, propName: string): void;
        width: PropTypes.Validator<number>;
        onBreakpointChange: PropTypes.Requireable<(...args: any[]) => any>;
        onLayoutChange: PropTypes.Requireable<(...args: any[]) => any>;
        onWidthChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: State;
    generateInitialState(): State;
    componentDidUpdate(prevProps: Readonly<ResponsiveGridLayoutProps>): void;
    onLayoutChange: (layout: Readonly<{
        [key: string]: Readonly<{
            width: number;
            height: number;
            col: number;
            row: number;
            id: string;
        }>;
    }>) => void;
    onWidthChange(prevProps: Readonly<ResponsiveGridLayoutProps>): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ResponsiveGridLayout.d.ts.map