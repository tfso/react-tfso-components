/// <reference types="react" />
import PropTypes from 'prop-types';
export declare type ConfirmationDialogProps = {
    open: boolean;
    title?: string;
    message: string;
    okButtonText: string;
    cancelButtonText: string;
    onOk: () => void;
    onCancel: () => void;
};
declare const ConfirmationDialog: {
    (props: ConfirmationDialogProps): JSX.Element;
    propTypes: {
        open: PropTypes.Validator<boolean>;
        title: PropTypes.Requireable<string>;
        message: PropTypes.Validator<string>;
        okButtonText: PropTypes.Validator<string>;
        cancelButtonText: PropTypes.Validator<string>;
        onOk: PropTypes.Validator<(...args: any[]) => any>;
        onCancel: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default ConfirmationDialog;
//# sourceMappingURL=ConfirmationDialog.d.ts.map