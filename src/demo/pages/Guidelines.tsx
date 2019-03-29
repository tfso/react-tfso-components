import React from 'react'
import Typography from '@material-ui/core/Typography'

export default class Guidelines extends React.PureComponent {
    render(){
        return (
            <>
                <Typography variant='h2'>
                    Guidelines
                </Typography>
                <Typography variant='subtitle1'>
                    TODO
                </Typography>
                <br />
                <Typography variant='body2'>
                    Do's &amp; Don'ts, Tips &amp; Tricks, Pitfalls and Best Practices etc.. 
                </Typography>
                <br />
            </>
        )
    }
}