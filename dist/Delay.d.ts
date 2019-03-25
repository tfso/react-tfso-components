import React from 'react';
import PropTypes from 'prop-types';
declare type Props = {
    beforeShow?: any;
    delayMs?: number;
    show?: boolean;
    children: React.ReactNode;
};
declare type State = {
    show: boolean;
};
export default class Delay extends React.PureComponent<Props, State> {
    static propTypes: {
        beforeShow: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        delayMs: PropTypes.Requireable<number>;
        show: PropTypes.Requireable<boolean>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    _timer: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
export {};
//# sourceMappingURL=Delay.d.ts.map