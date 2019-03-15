import React from 'react';
export declare const LayoutWrapper: any;
export declare const LayoutHeader: any;
export declare const LayoutBody: any;
export declare const LayoutBodyLeft: any;
export declare const LayoutBodyRight: any;
declare type LayoutProps = {
    title: string;
    docTitle: string;
    menu: React.ReactNode;
    mobileMenu: React.ReactNode;
    topMenu: React.ReactNode;
    onMenuToggle: Function;
};
export declare class Layout extends React.Component<LayoutProps> {
    render(): JSX.Element;
}
declare type LayoutNoMenuProps = {
    title: string;
    docTitle: string;
    mobileMenu: React.ReactNode;
    topMenu: React.ReactNode;
};
export declare class LayoutNoMenu extends React.Component<LayoutNoMenuProps> {
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Layout.d.ts.map