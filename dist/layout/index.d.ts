import React from 'react';
import './index.css';
export { Menu } from './Menu';
export { TopBar } from './Topbar';
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
    onMenuToggle: Function;
};
declare type LayoutState = {
    menuOpen: boolean;
};
export declare class Layout extends React.Component<LayoutProps, LayoutState> {
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map