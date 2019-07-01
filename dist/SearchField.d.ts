import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
export declare type SearchFieldProps = TextFieldProps;
declare type State = {
    editing: boolean;
};
export default class SearchField extends React.PureComponent<SearchFieldProps, State> {
    static defaultProps: {
        placeholder: string;
        margin: string;
        InputProps: {
            startAdornment: JSX.Element;
        };
    };
    state: State;
    onBlur: (e: (event: any) => void) => void;
    onFocus: (e: (event: any) => void) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=SearchField.d.ts.map