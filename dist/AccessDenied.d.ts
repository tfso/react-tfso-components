import React from 'react';
import { InjectedScreenSizeProps } from './ScreenSize';
declare type ModuleDescriptor = {
    id: number;
    name: string;
};
declare type Modules = Array<ModuleDescriptor>;
declare type AccessDeniedProps = {
    modules: Modules;
    onButtonClick: (event: any, value: any) => void;
    goBack: () => void;
    translate: (key: string) => string;
};
declare const _default: React.ComponentType<Pick<AccessDeniedProps & InjectedScreenSizeProps, "modules" | "onButtonClick" | "goBack" | "translate">>;
export default _default;
//# sourceMappingURL=AccessDenied.d.ts.map