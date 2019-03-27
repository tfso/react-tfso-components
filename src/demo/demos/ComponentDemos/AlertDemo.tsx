import React from 'react'
import Button from '@material-ui/core/Button'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../../components/demo'
import Snackbar from '@material-ui/core/Snackbar'
import Alert, { AlertProps } from '../../../lib/Alert'

const variantMessage: {[P in AlertProps['variant']]: string } = {
    success: 'GRATE SUCCÉSS!',
    info: 'Informational information',
    warning: 'You better not do that, Brian',
    error: 'That failed horribly...',
}

export default class AlertDemo extends React.PureComponent<{}, {variant: AlertProps['variant'], message: string, open: boolean}> {
    state = {
        variant: 'success' as AlertProps['variant'],
        open: false,
        message: 'GRATE SUCCÉSS!'
    }

    onClose = () => this.setState({open: false})

    onPress = (variant: AlertProps['variant']) => { 
        const message = variantMessage[variant]
        return () => this.setState({ open: true, message, variant})
    }

    render(){
        return(
            <Demo>
                <DemoTitle demoPath='ComponentDemos/AlertDemo.tsx' srcPath='Alert.tsx' >Alert</DemoTitle>
                <DemoHelp>A dismissable alert-box that can be used in a SnackBar or as a standard component in a page</DemoHelp>
                <DemoProps>
                    <DemoProp name='message' type='string | ReactNode' description='The message string or Element to be displayed' />
                    <DemoProp name='variant' type='success | error | info | warning' description='The variant of the alert. Icon and background-color is selected based on the variant' />
                    <DemoProp name='onClose' type='() => void' description='Callback function invoked when the alert is dismissed' />
                </DemoProps>
                <DemoContent>
                    <Snackbar
                        open={this.state.open}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        autoHideDuration={2000}
                        onClose={this.onClose}
                    >
                        <Alert
                            onClose={this.onClose}
                            message={this.state.message}
                            variant={this.state.variant}
                        />
                    </Snackbar>
                    <Button variant='outlined' onClick={this.onPress('success')}>Open Success</Button>
                    <Button variant='outlined' onClick={this.onPress('info')}>Open Info</Button>
                    <Button variant='outlined' onClick={this.onPress('warning')}>Open Warning</Button>
                    <Button variant='outlined' onClick={this.onPress('error')}>Open Error</Button>
                </DemoContent>
            </Demo>
        )
    }
}