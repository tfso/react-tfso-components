import React from 'react';
import { InjectedScreenSizeProps } from './ScreenSize';
declare type ModuleDescriptor = {
    id: number;
    name: string;
};
declare type Modules = Array<ModuleDescriptor>;
declare type AccessDeniedProps = {
    title: string;
    description: string;
    status: number;
    modules: Modules;
    onButtonClick: (event: any, value: any) => void;
    goBack: () => void;
    translate: (key: string) => string;
};
declare const _default: React.ComponentType<Pick<AccessDeniedProps & InjectedScreenSizeProps, "title" | "description" | "status" | "modules" | "onButtonClick" | "goBack" | "translate">>;
export default _default;
//# sourceMappingURL=AccessDenied.d.ts.map