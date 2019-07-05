import styled from 'styled-components/macro'
import {BoardItemDimensions} from './types'

export type BoardItemContainerProps = {
    dragging?: boolean
} & BoardItemDimensions

const BoardItemContainer = styled.div.attrs((props: BoardItemContainerProps) => ({
    style: {
        // This property changes very often, if it's in the styled macro, a new class will be generated for each change to the position.
        transform: `translate(${props.left}px, ${props.top}px)`
    }
}))<BoardItemContainerProps>`&&{
    position: absolute;
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    transition: ${({dragging}) => dragging ? 'none' : 'transform 200ms ease'};
    z-index: ${({dragging}) => dragging ? 3 : 'auto'};
    /* will-change: ${({dragging}) => dragging ? 'transform' : 'auto'} */
}`

export default BoardItemContainer