import React from 'react'

import PropTypes from 'prop-types'
import {withTheme, DefaultTheme} from 'styled-components'

import TrendingUp from '@material-ui/icons/TrendingUp'
import TrendingFlat from '@material-ui/icons/TrendingFlat'
import TrendingDown from '@material-ui/icons/TrendingDown'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

export type TrendingProps = {
    variant: 'up' | 'down' | 'flat'
} & SvgIconProps

type InjectedProps = {
    theme: DefaultTheme
}

const iconMap: {[P in TrendingProps['variant']]: React.ComponentType<SvgIconProps>} = {
    up: TrendingUp,
    flat: TrendingFlat,
    down: TrendingDown,
}

const getColor = (variant: TrendingProps['variant'], theme: DefaultTheme) => {
    switch(variant){
        case 'up': return theme.tfso.palette.success
        case 'down': return theme.tfso.palette.warning
        case 'flat': return theme.tfso.palette.alert
        default:
            return undefined
    }
}

const trending = ({variant, theme, ...iconProps}: TrendingProps & InjectedProps) =>{ 
    const Icon = iconMap[variant]
    const nativeColor = getColor(variant, theme)
    return (
        <Icon 
            nativeColor={nativeColor}
            {...iconProps} 
        />
)}

trending.propTypes = {
    variant: PropTypes.oneOf(['up', 'down', 'flat']).isRequired
}

export default React.memo(withTheme(trending))