// https://www.styled-components.com/docs/api#typescript

import 'styled-components'
import { TfsoTheme } from '.'

declare module 'styled-components' {
    export interface DefaultTheme extends TfsoTheme {}
}