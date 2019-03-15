import React from 'react';
declare type Props = {
    beforeShow?: any;
    delayMs?: number;
    show?: boolean;
};
declare type State = {
    show: boolean;
};
export default class Delay extends React.Component<Props, State> {
    _timer: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
export {};
//# sourceMappingURL=Delay.d.ts.map