import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import TrendingUp from '@material-ui/icons/TrendingUp'
import TrendingFlat from '@material-ui/icons/TrendingFlat'
import TrendingDown from '@material-ui/icons/TrendingDown'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

export type TrendingProps = {
    variant: 'up' | 'down' | 'flat'
} & SvgIconProps

const iconMap: {[P in TrendingProps['variant']]: React.ComponentType<SvgIconProps>} = {
    up: styled(TrendingUp)`color: ${({theme}) => theme.tfso.palette.success};` as any,
    flat: styled(TrendingFlat)`color: ${({theme}) => theme.tfso.palette.warning};` as any,
    down: styled(TrendingDown)`color: ${({theme}) => theme.tfso.palette.alert};` as any,
}

const trending = ({variant, ...iconProps}: TrendingProps) =>{ 
    const Icon = iconMap[variant]
    return (
        <Icon {...iconProps} />
)}

trending.propTypes = {
    variant: PropTypes.oneOf(['up', 'down', 'flat'])
}

export default React.memo(trending)