import React, { HTMLProps } from 'react';
import PropTypes from 'prop-types';
declare type Props = {
    children: (hover: boolean, ref: React.RefObject<any>) => React.ReactNode;
} & HTMLProps<HTMLDivElement>;
declare type State = {
    hover: boolean;
};
export default class Hoverable extends React.PureComponent<Props, State> {
    private ref;
    static propTypes: {
        children: PropTypes.Validator<(...args: any[]) => any>;
    };
    constructor(props: any);
    toggleHover: () => void;
    hoverOn: () => void;
    hoverOff: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Hoverable.d.ts.map