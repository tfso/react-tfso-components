import React from 'react';
import { WithWidth } from '@material-ui/core/withWidth';
declare type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
export declare type ScreenSizeData = {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
};
export declare type InjectedScreenSizeProps = {
    screenSize: ScreenSizeData;
};
export declare type ScreenSizeProps = {
    children: (screenSize: ScreenSizeData) => any;
} & WithWidth;
declare const ScreenSize: React.ComponentType<Pick<ScreenSizeProps, "children"> & import("@material-ui/core/withWidth").WithWidthProps>;
export declare function withScreenSize<P extends InjectedScreenSizeProps>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, keyof InjectedScreenSizeProps>>;
export declare const useScreenSize: () => {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
};
export default ScreenSize;
//# sourceMappingURL=ScreenSize.d.ts.map