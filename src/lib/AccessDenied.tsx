import React from 'react'
import styled from 'styled-components/macro'

export type BlueDivProps = {
    hasBorder: boolean
}

const BlueDiv = styled.div<BlueDivProps>`
  background-color: #ff7110;
  color: ${props => props.theme.tfso.colors.baseLight};
  border: ${props => props.hasBorder ? '1px solid #000' : 'none'};
`

export default props => {
    return (
        <BlueDiv hasBorder={false}>
            Hei hei fra access denied
        </BlueDiv>
    )
}