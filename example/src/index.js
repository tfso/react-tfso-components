import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {theme} from 'react-tfso-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {MuiThemeProvider} from '@material-ui/core/styles'

import App from './demos/App'

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme.materialuiTheme}>
            <StyledThemeProvider theme={theme.styledTheme}>
                <App />
            </StyledThemeProvider>
        </MuiThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
)
