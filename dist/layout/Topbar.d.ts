import React from 'react';
import PropTypes from 'prop-types';
export declare type TopBarProps = {
    title: string;
    onMenuToggle?: () => void;
    mobile: boolean;
    children?: React.ReactNode;
};
export default class TopBar extends React.PureComponent<TopBarProps> {
    static propTypes: {
        title: PropTypes.Validator<string>;
        onMenuToggle: PropTypes.Requireable<(...args: any[]) => any>;
        mobile: PropTypes.Validator<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    render(): JSX.Element;
}
export declare type TopMenuContentProps = {
    children: React.ReactNode;
};
export declare class TopMenuContent extends React.PureComponent<TopMenuContentProps> {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    render(): JSX.Element;
}
//# sourceMappingURL=Topbar.d.ts.map