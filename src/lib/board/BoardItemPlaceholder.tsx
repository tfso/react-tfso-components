import styled from 'styled-components/macro'
import {BoardItemDimensions} from './types'

export type BoardItemPlaceholdProps = BoardItemDimensions

const BoardItemPlaceholder = styled.div.attrs((props: BoardItemPlaceholdProps) => ({
    style: {
        // This property changes very often, if it's in the styled macro, a new class will be generated for each change to the position.
        transform: `translate(${props.left}px, ${props.top}px)`
    }
}))<BoardItemPlaceholdProps>`&&{
    position: absolute;
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    background: red;
    opacity: 0.2;
    transition: transform 100ms ease;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}`

export default BoardItemPlaceholder