/// <reference types="react" />
import Board from './Board';
export { addBoardItem, removeBoardItem, hideBoardItem, showBoardItem } from './utils';
export default Board;
export declare type ScreenType = 'mobile' | 'tablet' | 'desktop';
export declare type BoardProps = {
    locked?: boolean;
    items: BoardItems;
    spacing?: number;
    rowHeight: number;
    onChange?: (items: BoardItems) => void;
    children?: undefined;
};
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
    component: BoardItemComponent;
}>;
export declare type BoardItems = Readonly<{
    [key: string]: BoardItem;
}>;
//# sourceMappingURL=index.d.ts.map