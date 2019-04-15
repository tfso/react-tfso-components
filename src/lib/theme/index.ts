import {createMuiTheme} from '@material-ui/core/styles'
import 'styled-components'
import './index.css'

const colorScheme = {
    fiord: '#445566',
    lynch: '#637b94',
    dodgerBlue: '#11beff',
    bayOfMany: '#224477',
    easternBlue: '#22aabb',
    apple: '#49bd39',
    melrose: '#A3A4FB',
    flamingo: '#f04b4b',
    texasRose: '#ffb155',
    dandelion: '#FFD966',
    tundora: '#404040',
    dustyGray: '#999999',
    hippieBlue: '#6699bb',
    emperor: '#555555',
    silver: '#CCCCCC',
    porcelain: '#E8E9EA',
    wildSand: '#F6F6F6',
    white: '#FFFFFF',
    casper: '#AFC5D0'
}

const colors = {
    tfso: '#00c7f5',
    base: colorScheme.fiord,
    baseLight: '#637b94',
    baseLight2: '#8fa1b4',
    baseLight3: '#bdc8d3',
    baseLight4: '#ebeef1',
    baseLight5: '#f4f6f8',
    blue: colorScheme.dodgerBlue,
    blueDark: colorScheme.bayOfMany,
    blueDesaturated: colorScheme.hippieBlue,
    grayBlue: colorScheme.casper,
    teal: colorScheme.easternBlue,
    green: colorScheme.apple,
    greenLight: 'rgba(73, 189, 57, 0.4)',
    purple: colorScheme.melrose,
    red: colorScheme.flamingo,
    redLight: 'rgba(240, 75, 75, 0.4)',
    orange: colorScheme.texasRose,
    yellow: colorScheme.dandelion,
    black: colorScheme.tundora,
    gray: colorScheme.dustyGray,
    grayDark: '#6E6E6E',
    grayDarker: '#454545',
    grayLight: '#C4C4C4',
    grayLighter: '#E6E6E6',
    grayLightest: '#F7F7F7',
    white: colorScheme.white,
    whiteDark: '#F7F7F7',
    whiteDarker: '#E6E6E6',
    bodyBackground: '#F7F7F7',
    listOverBackground: '#E6E6E6',
    border: '#C4C4C4',
    tabBar: colorScheme.white,
    menu: '#637b94',
    menuExpanded: colorScheme.fiord,
    menuItem: '#637b94',
    menuItemText: colorScheme.white,
    menuItemSelectedText: colorScheme.texasRose
}

const palette = {
    primary: colors.base,
    primaryLight: colors.baseLight,
    success: colors.green,
    warning: colors.orange,
    alert: colors.red,
    delete: colors.red,
}

const layout = {
    containerMargin: '15px'
}

export const materialuiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        secondary: {
            dark: '#1b2c3c',
            main: '#456',
            light: '#708194'
        },
        primary: {
            dark: '#0090cc',
            main: '#11c0ff',
            light: '#6df3ff',
            contrastText: '#FFF'
        }
    }
})

export const styledTheme = {
    tfso: {
        colors,
        palette,
        layout
    },
    mui: materialuiTheme, // Make the entire material-ui theme available to styled components as well
}

export type TfsoTheme = typeof styledTheme

declare module 'styled-components' {
    export interface DefaultTheme extends TfsoTheme {}
    export type WithTheme = { theme: DefaultTheme }
}