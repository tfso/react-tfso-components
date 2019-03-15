import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
export declare type SearchFieldProps = TextFieldProps;
export default class SearchField extends React.PureComponent<SearchFieldProps> {
    static propTypes: React.WeakValidationMap<import("@material-ui/core/TextField").StandardTextFieldProps> | React.WeakValidationMap<import("@material-ui/core/TextField").FilledTextFieldProps> | React.WeakValidationMap<import("@material-ui/core/TextField").OutlinedTextFieldProps> | undefined;
    static defaultProps: {
        placeholder: string;
        margin: string;
        InputProps: {
            startAdornment: JSX.Element;
        };
    };
    state: {
        editing: boolean;
    };
    onBlur: (e: any) => void;
    onFocus: (e: any) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map