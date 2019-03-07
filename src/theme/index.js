import {createMuiTheme} from '@material-ui/core/styles'

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
    baseColor: colorScheme.fiord,
    baseLightColor: '#637b94',
    baseLight2Color: '#8fa1b4',
    baseLight3Color: '#bdc8d3',
    baseLight4Color: '#ebeef1',
    baseLight5Color: '#f4f6f8',
    blueColor: colorScheme.dodgerBlue,
    blueDarkColor: colorScheme.bayOfMany,
    blueDesaturatedColor: colorScheme.hippieBlue,
    grayBlueColor: colorScheme.casper,
    tealColor: colorScheme.easternBlue,
    greenColor: colorScheme.apple,
    greenLightColor: 'rgba(73, 189, 57, 0.4)',
    purpleColor: colorScheme.melrose,
    redColor: colorScheme.flamingo,
    redLightColor: 'rgba(240, 75, 75, 0.4)',
    orangeColor: colorScheme.texasRose,
    yellowColor: colorScheme.dandelion,
    blackColor: colorScheme.tundora,
    grayColor: colorScheme.dustyGray,
    grayDarkColor: '#6E6E6E',
    grayDarkerColor: '#454545',
    grayLightColor: '#C4C4C4',
    grayLighterColor: '#E6E6E6',
    grayLightestColor: '#F7F7F7',
    whiteColor: colorScheme.white,
    whiteDarkColor: '#F7F7F7',
    whiteDarkerColor: '#E6E6E6',
    bodyBackgroundColor: '#F7F7F7',
    listOverBackgroundColor: '#E6E6E6',
    borderColor: '#C4C4C4',
    tabBarColor: '#C4C4C4'
}

const palette = {
    primary: colors.baseColor,
    primaryLight: colors.baseLightColor,
    success: colors.greenColor,
    warning: colors.orangeColor,
    alert: colors.redColor,
    delete: colors.redColor,
}

const layout = {
    containerMargin: '15px'
}

export const materialuiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            dark: '#1b2c3c',
            main: '#456',
            light: '#708194'
        },
        secondary: {
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