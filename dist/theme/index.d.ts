import 'styled-components';
import './index.css';
export declare const materialuiTheme: import("@material-ui/core/styles").Theme;
export declare const styledTheme: {
    tfso: {
        colors: {
            tfso: string;
            base: string;
            baseLight: string;
            baseLight1: string;
            baseLight2: string;
            baseLight3: string;
            baseLight4: string;
            baseLight5: string;
            blue: string;
            blueDark: string;
            blueDesaturated: string;
            grayBlue: string;
            teal: string;
            green: string;
            greenLight: string;
            purple: string;
            red: string;
            redLight: string;
            orange: string;
            yellow: string;
            black: string;
            gray: string;
            grayDark: string;
            grayDarker: string;
            grayLight: string;
            grayLighter: string;
            grayLightest: string;
            white: string;
            whiteDark: string;
            whiteDarker: string;
            bodyBackground: string;
            listOverBackground: string;
            border: string;
            tabBar: string;
            menu: string;
            menuExpanded: string;
            menuExpandedDivider: string;
            menuItem: string;
            menuItemText: string;
            menuItemSelectedText: string;
            notification: string;
            notificationHover: string;
        };
        palette: {
            primary: string;
            primaryLight: string;
            success: string;
            warning: string;
            alert: string;
            delete: string;
            loudInfo: string;
        };
        layout: {
            containerMargin: string;
        };
    };
    mui: import("@material-ui/core/styles").Theme;
};
export declare type TfsoTheme = typeof styledTheme;
declare module 'styled-components' {
    interface DefaultTheme extends TfsoTheme {
    }
    type WithTheme = {
        theme: DefaultTheme;
    };
}
//# sourceMappingURL=index.d.ts.map