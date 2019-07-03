import React from 'react';
import PropTypes from 'prop-types';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
declare type ChipColor = 'success' | 'error' | 'info' | 'warning';
export declare type MenuProps = {
    open: boolean;
    onClose: () => void;
    mobile: boolean;
    children: React.ReactNode;
};
export default class Menu extends React.PureComponent<MenuProps> {
    static propTypes: {
        open: PropTypes.Validator<boolean>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        mobile: PropTypes.Validator<boolean>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    render(): JSX.Element;
}
export declare const MenuContent: (props: any) => JSX.Element;
export declare type MenuGroupProps = {
    icon: React.ComponentType<SvgIconProps>;
    subtitle: string;
    label: string;
    onToggleExpanded: () => void;
    expanded: boolean;
    children: React.ReactNode;
};
export declare const MenuGroup: any;
export declare type MenuRootItemProps = {
    icon: React.ComponentType<SvgIconProps>;
    subtitle: string;
    label: string;
    chipLabel?: string;
    chipColor?: ChipColor;
    selected: boolean;
    href?: string | ((content: React.ReactChild) => React.ReactChild);
};
export declare class MenuRootItem extends React.PureComponent<MenuRootItemProps> {
    static propTypes: {
        icon: PropTypes.Validator<PropTypes.ReactComponentLike>;
        subtitle: PropTypes.Validator<string>;
        label: PropTypes.Validator<string>;
        selected: PropTypes.Validator<boolean>;
        href: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        chipLabel: PropTypes.Requireable<string>;
        chipColor: PropTypes.Requireable<string>;
    };
    render(): JSX.Element;
}
export declare type MenuItemProps = {
    icon?: React.ComponentType<SvgIconProps>;
    label: string;
    selected: boolean;
    href: string | ((content: React.ReactChild) => React.ReactChild);
    chipLabel?: string;
    chipColor?: 'warning' | 'information';
};
export declare class MenuItem extends React.PureComponent<MenuItemProps> {
    static propTypes: {
        icon: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        label: PropTypes.Validator<string>;
        selected: PropTypes.Validator<boolean>;
        href: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        chipLabel: PropTypes.Requireable<string>;
        chipColor: PropTypes.Requireable<string>;
    };
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Menu.d.ts.map