import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export type BigNumberProps = {
    /**
     * Choose `light` when you have a dark background, otherwise `dark`
     * @default light
     */
    color?: 'light' | 'dark'

    /**
     * @default large
     */
    size?: 'medium' | 'large'
    children: string | number
}

const fontSizeMap: {[P in Required<BigNumberProps>['size']]: number} = {
    medium: 32,
    large: 48
}

const defaultProps: Required<Pick<BigNumberProps, 'color' | 'size'>> = {
    color: 'light',
    size: 'large',
}

const wrapper = ({size, color, ...props}: Required<BigNumberProps>) => <div {...props} />
// TODO: These should be on the BigNumber component instead..
wrapper.defaultProps = defaultProps
wrapper.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
    size: PropTypes.oneOf(['medium', 'large']),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

const BigNumber = styled(wrapper)`&&{
    font-size: ${({theme, size = defaultProps.size}) => theme.mui.typography.pxToRem(fontSizeMap[size])};
    line-height: normal;
    letter-spacing: 0.08em;
    color: ${({color = defaultProps.color}) => color === 'light' ? '#FFFFFF' : '#404040'};
    white-space: nowrap
}`

export default BigNumber as React.ComponentType<BigNumberProps>