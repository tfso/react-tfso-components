import styled from 'styled-components/macro'

type BoardContainerProps = {
    height: number
}

const BoardContainer = styled.div.attrs((props: BoardContainerProps) => ({
    style: {
        height: props.height
    }
}))<BoardContainerProps>`&&{
    position: relative;
    transition: height 200ms ease;
}`

export default BoardContainer