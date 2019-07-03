import React, { HTMLProps } from 'react';
import PropTypes from 'prop-types';
declare type Props = {
    children: (tabIndex: number, next: () => void, prev: () => void) => React.ReactNode;
    index?: number;
    length?: number;
} & HTMLProps<HTMLDivElement>;
declare type State = {
    index: number;
};
export default class Wizard extends React.PureComponent<Props, State> {
    static propTypes: {
        children: PropTypes.Validator<(...args: any[]) => any>;
        index: PropTypes.Requireable<number>;
        length: PropTypes.Requireable<number>;
    };
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any): {
        index: any;
    } | null;
    next: () => void;
    prev: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Wizard.d.ts.map