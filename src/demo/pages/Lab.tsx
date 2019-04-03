import React from 'react'
import Typography from '@material-ui/core/Typography'
import DashBoardDemo from '../demos/DashBoardDemo'
import Divider from '@material-ui/core/Divider'

export default class Lab extends React.PureComponent{
    render(){
        return (
            <>
                <Typography variant='h2'>
                    Components Lab
                </Typography>
                <Typography variant='subtitle1'>
                    The components you find here are Works in Progress and are subjec to breaking changes and/or future removal.
                </Typography>
                <br />
                <br />
                <DashBoardDemo />
            </>
        )
    }
}