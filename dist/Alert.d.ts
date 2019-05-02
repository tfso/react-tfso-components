import React from 'react';
import PropTypes from 'prop-types';
declare type AlertVariant = 'success' | 'warning' | 'error' | 'info';
export declare type AlertProps = {
    message: React.ReactNode;
    onClose(): void;
    variant: AlertVariant;
};
declare const Alert: {
    (props: AlertProps): JSX.Element;
    propTypes: {
        message: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        variant: PropTypes.Requireable<string>;
    };
};
export default Alert;
//# sourceMappingURL=Alert.d.ts.map