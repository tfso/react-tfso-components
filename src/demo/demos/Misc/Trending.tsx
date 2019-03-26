import React from 'react'
import { Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle } from '../../demo'
import Trending, { TrendingProps } from '../../../lib/Trending'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

type TrendingDemoState = {
    variant: TrendingProps['variant']
}

export default class TrendingDemo extends React.PureComponent<{}, TrendingDemoState> {
    state: TrendingDemoState = {
        variant: 'up'
    }

    render(){
        return (
            <Demo>
                <DemoTitle>Trending</DemoTitle>
                <DemoHelp>A colored icon indicating a trending direction</DemoHelp>
                <DemoProps>
                    <DemoProp name='variant' type='up | down | flat' default='' description=''></DemoProp>
                    <DemoProp name='...' type='SvgIconProps' default='' description='Any other prop is spread to the SvgIcon'></DemoProp>
                </DemoProps>
                <DemoContent>
                    <Trending variant={this.state.variant} fontSize='large' />
                    <TextField
                        select
                        value={this.state.variant}
                        onChange={e => this.setState({variant: e.target.value as any})}
                        label='variant'
                    >
                        <MenuItem value='up'>up</MenuItem>
                        <MenuItem value='flat'>flat</MenuItem>
                        <MenuItem value='down'>down</MenuItem>
                    </TextField>
                </DemoContent>
            </Demo>
        )
    }
}