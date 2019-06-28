import React from 'react';
import { Layout } from './GridLayout/utils';
import { ResponsiveLayout } from './GridLayout/responsiveUtils';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
export declare type GridItem = {
    id: string;
    children: React.ReactNode;
};
export declare type GridItemPosition = {
    id: string;
    col: number;
    row: number;
    width: number;
    height: number;
};
export declare type GridLayoutProps = {
    items: Array<GridItem>;
    draggable?: boolean;
    layout: ResponsiveLayout;
    /**
     * @default 16
     */
    margin?: number;
    onLayoutChange?: (layout: Layout, breakpoint: Breakpoint, responsiveLayout: ResponsiveLayout) => void;
    children?: undefined;
};
export default function Board(props: GridLayoutProps): JSX.Element;
//# sourceMappingURL=GridLayout.d.ts.map