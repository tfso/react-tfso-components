import React from 'react'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../../demo'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import BigNumber, { BigNumberProps } from '../../../lib/BigNumber';
import { Grid, Typography } from '@material-ui/core';

type BigNumberState = {
    color: BigNumberProps['color']
    size: BigNumberProps['size']
}

export default class BigNumberDemo extends React.PureComponent<{}, BigNumberState> {
    state: BigNumberState = {
        color: 'dark',
        size: 'large',
    }

    handleChange = (key: keyof BigNumberState) => (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({[key]: event.target.value} as any)

    render(){
        return (
            <Demo>
                <DemoTitle>BigNumber</DemoTitle>
                <DemoHelp>
                    A Big Number is a number stands out
                </DemoHelp>
                <DemoProps>
                    <DemoProp name='color' type='light | dark' default='light' description=''></DemoProp>
                    <DemoProp name='size' type='medium | large' default='larger' description=''></DemoProp>
                    <DemoProp name='children' type='string | number' default='' description=''></DemoProp>
                    {/* <DemoProp name='...' type='SvgIconProps' default='' description='Any other prop is spread to the SvgIcon'></DemoProp> */}
                </DemoProps>
                <DemoContent>
                    <Grid container alignItems='center' spacing={32}>
                        <Grid item>
                            <div style={{backgroundColor: this.state.color === 'light' ? '#11beff' : 'inherit', padding: 10}}>
                                <BigNumber
                                    size={this.state.size}
                                    color={this.state.color}
                                >$123</BigNumber>
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant='caption'>NB: The BigNumber component does not set the background color!<br /> The background color used here is just for illustrative purposes.</Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        select
                        label='size'
                        value={this.state.size}
                        onChange={this.handleChange('size')}
                    >
                        <MenuItem value='medium'>medium</MenuItem>
                        <MenuItem value='large'>large</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label='color'
                        value={this.state.color}
                        onChange={this.handleChange('color')}
                    >
                        <MenuItem value='light'>light</MenuItem>
                        <MenuItem value='dark'>dark</MenuItem>
                    </TextField>
                </DemoContent>
            </Demo>
        )
    }
}