import React from 'react';
import PropTypes from 'prop-types';
declare type WidgetSize = 'small' | 'medium' | 'large';
declare type WidgetBaseProps = {
    index: number;
    background?: string;
    onOrder: (index: number, sourceIndex: number) => void;
    children: React.ReactChild;
};
export declare type WidgetProps = {
    size: WidgetSize;
    minSize?: WidgetSize;
} & Pick<WidgetBaseProps, 'background' | 'children'>;
export declare type DashBoardProps = {
    widgets: Array<WidgetProps>;
    onChangeOrder: (widgets: Array<WidgetProps>) => void;
    onRemove: (something: any) => void;
    spacing?: number;
    children?: undefined;
};
export default class DashBoard extends React.PureComponent<DashBoardProps> {
    static defaultProps: {
        spacing: number;
    };
    static propTypes: {
        onChangeOrder: PropTypes.Validator<(...args: any[]) => any>;
        onRemove: PropTypes.Validator<(...args: any[]) => any>;
        spacing: PropTypes.Requireable<number>;
        widgets: PropTypes.Requireable<(PropTypes.InferProps<{
            background: PropTypes.Requireable<string>;
            children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
            minSize: PropTypes.Requireable<string>;
            size: PropTypes.Validator<string>;
        }> | null)[]>;
    };
    onOrderArray: (target: number, source: number) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=DashBoard.d.ts.map