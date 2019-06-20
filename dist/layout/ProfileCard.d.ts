import React from 'react';
import PropTypes from 'prop-types';
export declare type ProfileCardProps = {
    open: boolean;
    onClose: () => void;
    onSignOut: () => void;
    children?: React.ReactNode;
    identity: any;
    signOutText: string;
    anchorEl?: null | HTMLElement;
};
declare type State = {};
export default class ProfileCard extends React.PureComponent<ProfileCardProps, State> {
    static propTypes: {
        open: PropTypes.Validator<boolean>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        signOutText: PropTypes.Validator<string>;
    };
    onClose: () => void;
    onSignOut: () => void;
    renderContent: () => JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ProfileCard.d.ts.map