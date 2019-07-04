/// <reference types="react" />
import PropTypes from 'prop-types';
import { BoardProps } from '.';
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