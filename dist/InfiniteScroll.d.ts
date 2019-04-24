import React from 'react';
import PropTypes from 'prop-types';
export declare type InfiniteScrollProps = {
    /**
     * Invoked when the bottom of the scrollcontainer is reached
     */
    onReachEnd?: () => void;
    /**
     * Invoked when the treshold distance to the bottom of the scrollcontainer is reached
     */
    onReachTreshold?: () => void;
    /**
     * A number >= 0 and < 1
     * Defines in percentage (factor) of the viewable containers height the distance from the bottom where the threshold is
     * @default 0.1
     */
    threshold?: number;
    /**
     * The height of the container
     * @default 'calc(100%)'
     */
    height?: string | number;
    /**
     * Children, whatever you want
     */
    children: React.ReactNode;
};
export default class InfiniteScroll extends React.PureComponent<InfiniteScrollProps> {
    static defaultProps: {
        treshold: number;
        height: string;
    };
    static propTypes: {
        onReachEnd: PropTypes.Requireable<(...args: any[]) => any>;
        onReachThreshold: PropTypes.Requireable<(...args: any[]) => any>;
        threshold: (props: InfiniteScrollProps, propName: string, componentName: string) => Error | undefined;
        height: PropTypes.Requireable<React.ReactText>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
    _reachedTreshold: boolean;
    _lastScrollTop: number;
    _ref: React.RefObject<HTMLDivElement>;
    onScroll: (...args: any[]) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=InfiniteScroll.d.ts.map