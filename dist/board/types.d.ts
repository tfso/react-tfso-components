/// <reference types="react" />
export declare type ScreenType = 'mobile' | 'tablet' | 'desktop';
export declare type BoardItemLayout = Readonly<{
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
}>;
export declare type BoardItemComponent = React.ElementType<{
    screenType: ScreenType;
}>;
export declare type BoardItem = Readonly<{
    key: React.Key;
    mobile?: BoardItemLayout;
    tablet?: BoardItemLayout;
    desktop: BoardItemLayout;
    component: React.ElementType<{
        screenType: ScreenType;
    }>;
}>;
export declare type BoardItems = Readonly<{
    [key: string]: BoardItem;
}>;
export declare type BoardDimensions = Readonly<{
    colWidth: number;
    rowHeight: number;
    spacing: number;
}>;
export declare type BoardItemDimensions = Readonly<{
    top: number;
    left: number;
    width: number;
    height: number;
}>;
//# sourceMappingURL=types.d.ts.map