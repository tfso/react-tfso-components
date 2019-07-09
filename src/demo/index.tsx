import React from 'react'
import ReactDOM from 'react-dom'
import {theme} from '../lib'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {MuiThemeProvider} from '@material-ui/core/styles'
import Layout from './Layout'

ReactDOM.render(
    <React.Fragment>
        {/* <React.StrictMode> */}
        <CssBaseline />
        <MuiThemeProvider theme={theme.materialuiTheme}>
            <StyledThemeProvider theme={theme.styledTheme}>
                <Layout />
            </StyledThemeProvider>
        </MuiThemeProvider>
        {/* </React.StrictMode> */}
    </React.Fragment>,
    document.getElementById('root')
)
