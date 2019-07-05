import { BoardItemDimensions } from './types';
export declare type BoardItemContainerProps = {
    dragging?: boolean;
} & BoardItemDimensions;
declare const BoardItemContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
    style: {
        transform: string;
    };
} & {
    dragging?: boolean | undefined;
} & Readonly<{
    top: number;
    left: number;
    width: number;
    height: number;
}>, "style">;
export default BoardItemContainer;
//# sourceMappingURL=BoardItemContainer.d.ts.map