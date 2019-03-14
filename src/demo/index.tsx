import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {theme} from '../lib'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {MainLayout} from './demos/layout'
import App from './demos/App'

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme.materialuiTheme}>
            <StyledThemeProvider theme={theme.styledTheme}>
                <MainLayout>
                    <App />
                </MainLayout>
            </StyledThemeProvider>
        </MuiThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
)
