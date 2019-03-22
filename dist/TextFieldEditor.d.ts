import React from 'react';
import PropTypes from 'prop-types';
import { TextFieldProps } from '@material-ui/core/TextField';
declare type Props = {
    value: string;
    onChange(value: string): void;
    dirty?: boolean;
    enableDirtyCheck?: boolean;
};
declare type State = {
    editing: boolean;
    value: string;
    prevProps: Props;
};
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type TextFieldEditorProps = Props & Partial<Omit<TextFieldProps, 'value' | 'onChange'>>;
export default class TextFieldEditor extends React.PureComponent<TextFieldEditorProps, State> {
    static propTypes: {
        value: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        dirty: PropTypes.Requireable<boolean>;
    };
    _inputRef: React.RefObject<HTMLInputElement>;
    state: State;
    static getDerivedStateFromProps(props: Readonly<TextFieldEditorProps>, state: Readonly<State>): {
        value: string;
        prevProps: Readonly<TextFieldEditorProps>;
    } | {
        prevProps: Readonly<TextFieldEditorProps>;
        value?: undefined;
    };
    blur: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onFocus: (e: (event: any) => void) => void;
    onBlur: (e: (event: any) => void) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=TextFieldEditor.d.ts.map