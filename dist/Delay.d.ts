import React from 'react';
import PropTypes from 'prop-types';
export declare type DelayProps = {
    beforeShow?: React.ReactNode;
    /**
     * @default 1000
     */
    delayMs?: number;
    /**
     * @deprecated ??
     */
    show?: boolean;
    children: React.ReactNode;
};
declare type State = {
    show: boolean;
};
export default class Delay extends React.PureComponent<DelayProps, State> {
    static propTypes: {
        beforeShow: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        delayMs: PropTypes.Requireable<number>;
        show: PropTypes.Requireable<boolean>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    static defaultProps: {
        delayMs: number;
    };
    _timer: any;
    state: {
        show: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
export {};
//# sourceMappingURL=Delay.d.ts.map