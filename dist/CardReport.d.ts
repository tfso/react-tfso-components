import React from 'react';
import { InjectedScreenSizeProps } from './ScreenSize';
export declare type ReportsProps = {
    options: {
        id: number;
        title: string;
        description: string;
        url: string;
        image: any;
    };
    translate: (key: string) => string;
    onClick: (event: any, object: any) => void;
};
declare const _default: React.ComponentType<Pick<ReportsProps & InjectedScreenSizeProps, "onClick" | "translate" | "options">>;
export default _default;
//# sourceMappingURL=CardReport.d.ts.map