import React from 'react';
import { ScreenSizeData } from '../ScreenSize';
export declare const LayoutWrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const LayoutHeader: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const LayoutBody: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const LayoutBodyLeft: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const LayoutBodyRight: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare type LayoutProps = {
    docTitle: string;
    menuContent?: React.ReactNode;
    topMenuContent?: React.ReactNode;
} & {
    screenSize: ScreenSizeData;
};
declare const _default: React.ComponentType<Pick<LayoutProps, "docTitle" | "menuContent" | "topMenuContent">>;
export default _default;
//# sourceMappingURL=Layout.d.ts.map