import React from 'react';
export declare const LayoutWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LayoutHeader: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LayoutBody: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LayoutBodyLeft: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LayoutBodyRight: import("styled-components").StyledComponent<"div", any, {}, never>;
declare type LayoutProps = {
    title: string;
    docTitle: string;
    menu: React.ReactNode;
    mobileMenu: React.ReactNode;
    topMenu: React.ReactNode;
    onMenuToggle: Function;
};
export declare class Layout extends React.PureComponent<LayoutProps> {
    render(): JSX.Element;
}
declare type LayoutNoMenuProps = {
    title: string;
    docTitle: string;
    mobileMenu: React.ReactNode;
    topMenu: React.ReactNode;
};
export declare class LayoutNoMenu extends React.PureComponent<LayoutNoMenuProps> {
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Layout.d.ts.map