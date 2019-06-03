import React from 'react'
import {ScreenType} from './types'
import {getBreakpointFromWidth} from './utils'
import {materialuiTheme} from '../theme'

const mobile = ['xs', 'sm']
const tablet = ['sm', 'md']
const desktop = ['md', 'lg', 'xl']

const getScreenSize = width => ({
    mobile: mobile.includes(width),
    tablet: tablet.includes(width),
    desktop: desktop.includes(width)
})

const useScreenType = (width: number): ScreenType => {
    return React.useMemo(() => {
        const breakpoint = getBreakpointFromWidth(materialuiTheme.breakpoints.values, width)
        const {mobile, tablet} = getScreenSize(breakpoint)
        return mobile ? 'mobile' : tablet ? 'tablet' : 'desktop'
    }, [width])
}

export default useScreenType