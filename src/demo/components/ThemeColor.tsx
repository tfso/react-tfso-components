import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {styledTheme} from '../../lib/theme/index'

const bgColor = (color: string) => {
    const colors = styledTheme['tfso']['colors']
    return colors[color]
}

export type ThemeColorProps = {
    color: string
}

const Box = styled.div<{color: string}>`
    background-color: ${({color, theme}) => theme.tfso.colors[color]};
    width: 230px;
    height: 230px;
    text-align: center;
`

const Txt = styled.div<{dark?: boolean}>`
  font-size: 2em;
  line-height: 2em;
  color: ${({dark, theme}) => dark ? '#000' : theme.mui.palette.secondary.contrastText}
`

const ThemeColor = (props: ThemeColorProps) => {
    const {color} = props
    return (
        <Box color={color}>
            theme.tfso.colors.{color}<br/><br/>
            <Txt>{bgColor(color)}</Txt>
            <Txt dark>{bgColor(color)}</Txt>
        </Box>
    )
}

ThemeColor.propTypes = {
    color: PropTypes.node.isRequired
}

export default ThemeColor