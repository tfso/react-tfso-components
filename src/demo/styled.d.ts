// https://www.styled-components.com/docs/api#typescript

import 'styled-components'
import { TfsoTheme } from '../lib/theme'

declare module 'styled-components' {
    export interface DefaultTheme extends TfsoTheme {}
}