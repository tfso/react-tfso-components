import React from 'react';
import PropTypes from 'prop-types';
export declare type TopBarProps = {
    title: string;
    onMenuToggle: Function;
    mobileMenu?: React.ReactNode;
};
export declare class TopBar extends React.PureComponent<TopBarProps, any> {
    static propTypes: {
        title: PropTypes.Validator<string>;
        mobileMenu: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    state: {
        mobileMoreAnchorEl: null;
    };
    handleMobileMenuOpen: (event: any) => void;
    handleMobileMenuClose: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=Topbar.d.ts.map