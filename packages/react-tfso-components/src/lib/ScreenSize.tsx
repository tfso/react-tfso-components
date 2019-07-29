import React from 'react'
import withWidth, {WithWidth} from '@material-ui/core/withWidth'
// import useTheme from '@material-ui/styles/useTheme'
// import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery'

type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>

export type ScreenSizeData = {
    mobile: boolean
    tablet: boolean
    desktop: boolean
}

export type InjectedScreenSizeProps = {
    screenSize: ScreenSizeData
}

export type ScreenSizeProps = {
    children: (screenSize: ScreenSizeData) => any
} & WithWidth

const mobile = ['xs', 'sm']
const tablet = ['sm', 'md']
const desktop = ['md', 'lg', 'xl']

const getScreenSize = width => ({
    mobile: mobile.includes(width),
    tablet: tablet.includes(width),
    desktop: desktop.includes(width)
})

const ScreenSize = withWidth()((props: ScreenSizeProps) => props.children(getScreenSize(props.width)))

export function withScreenSize<P extends InjectedScreenSizeProps>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, keyof InjectedScreenSizeProps>>{
    return (props: any) => {
        return (
            <ScreenSize>
                {(screenSize) => <Component {...props} screenSize={screenSize} />}
            </ScreenSize>
        )
    }
}

export const useScreenSize = () => {
    throw new Error('ScreenSize hook is not finished yet. Sorry')

    // Below breaks hook rules (even though it actually works)
    /*
    const theme = useTheme()

    const width = [...theme.breakpoints.keys]
        .reverse()
        .reduce((output, key) => {
            const matches = useMediaQuery(theme.breakpoints.only(key))
            return !output && matches ? key : output
        }, null) || 'xs'

    return getScreenSize(width)
    */
}

export default ScreenSize