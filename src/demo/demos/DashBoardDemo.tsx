import React from 'react'
import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'
import DashBoard, {WidgetProps} from '../../lib/DashBoard'
import {styledTheme} from '../../lib/theme'
import {BigNumber, Trending} from '../../lib'
import Grid from '@material-ui/core/Grid'

type State = {
    widgets: Array<WidgetProps>
}

let i = 0
const colors = Object.keys(styledTheme.tfso.colors)
const getColor = () => styledTheme.tfso.colors[colors[i++]]

const W1 = () => (
    <Grid container wrap='nowrap' style={{padding: 10}}>
        <Grid item>
            <BigNumber color='light' >$123</BigNumber>
        </Grid>
        <Grid item xs>
            <Trending variant='up' fontSize='large'></Trending>
        </Grid>
    </Grid>
)

export default class DashBoardDemo extends React.PureComponent<{}, State>{
    state: State = {
        widgets: [
            {
                size: 'small',
                background: styledTheme.tfso.colors.orangeColor,
                children: <W1 />
            },
            {
                size: 'small',
                background: getColor(),
                children: <div>Small 2</div>
            },
            {
                size: 'small',
                background: getColor(),
                children: <div>Small 3</div>
            },
            {
                size: 'small',
                background: getColor(),
                children: <div>Small 4</div>
            },
            {
                size: 'medium',
                background: getColor(),
                children: <div>Medium 5</div>
            },
            {
                size: 'large',
                background: getColor(),
                children: <div>large 7</div>
            },
            {
                size: 'medium',
                background: getColor(),
                children: <div>Medium 5</div>
            },
            {
                size: 'medium',
                background: getColor(),
                children: <div>Medium 6</div>
            },
            {
                size: 'large',
                background: getColor(),
                children: <div>large 7</div>
            }
        ]
    }

    onOrder = (widgets: Array<WidgetProps>) => {
        this.setState({widgets})
    }

    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ComponentsDemo/DashBoardDemo.tsx' srcPath='DashBoard.Tsx'>DashBoard</DemoTitle>
                <DemoHelp></DemoHelp>
                <DemoProps>
                    {/* <DemoProp /> */}
                </DemoProps>
                <DemoContent>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        overflowX: 'auto',
                        padding: 10,
                        height: '400px',
                        // backgroundColor: '#eee'
                    }} >
                        <DashBoard
                            onChangeOrder={this.onOrder}
                            onRemove={() => {}}
                            widgets={this.state.widgets}
                        />
                    </div>
                </DemoContent>
            </Demo>
        )
    }
}