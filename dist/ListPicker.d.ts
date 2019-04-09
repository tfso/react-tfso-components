import React from 'react';
import PropTypes from 'prop-types';
export declare type ClientSwitcherDialogProps = {
    open: boolean;
    onCancel: () => void;
    onSwitch: (value: string) => void;
    children?: undefined;
    options: Array<{
        value: string;
        label: string;
    }>;
    cancelButtonText: string;
    searchLabel?: string;
    anchorEl?: null | HTMLElement;
    disabled?: string;
    selected?: string;
    avatarColor?: string;
};
declare type State = {
    filterValue: string;
    focusValue: string;
};
export default class ListPicker extends React.PureComponent<ClientSwitcherDialogProps, State> {
    static propTypes: {
        open: PropTypes.Validator<boolean>;
        onCancel: PropTypes.Validator<(...args: any[]) => any>;
        onSwitch: PropTypes.Validator<(...args: any[]) => any>;
        options: PropTypes.Validator<(PropTypes.InferProps<{
            value: PropTypes.Validator<string>;
            label: PropTypes.Validator<string>;
        }> | null)[]>;
        cancelButtonText: PropTypes.Validator<string>;
        searchLabel: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<string>;
        selected: PropTypes.Requireable<string>;
        avatarColor: PropTypes.Requireable<string>;
    };
    _inputRef: React.RefObject<HTMLLIElement>;
    _listRef: React.RefObject<HTMLInputElement>;
    state: State;
    componentDidUpdate(prevProps: any): void;
    onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<Element>) => void;
    onSwitch: (value: any) => void;
    onClose: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ListPicker.d.ts.map