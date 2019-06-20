/// <reference types="react" />
import PropTypes from 'prop-types';
import { BoardItems } from './types';
export declare type BoardProps = {
    locked?: boolean;
    items: BoardItems;
    spacing?: number;
    rowHeight: number;
    onChange?: (items: BoardItems) => void;
    children?: undefined;
};
declare const Board: {
    (props: BoardProps): JSX.Element;
    propTypes: {
        items: PropTypes.Validator<object>;
        locked: PropTypes.Requireable<boolean>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        rowHeight: PropTypes.Validator<number>;
        spacing: PropTypes.Requireable<number>;
    };
};
export default Board;
//# sourceMappingURL=Board.d.ts.map