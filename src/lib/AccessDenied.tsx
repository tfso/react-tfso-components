import React from 'react'
import Emoji from './Emoji'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {Button} from '@material-ui/core'
import styled from 'styled-components/macro'
type AccessDeniedProps ={
    data: any
    showButton?: boolean
    onButtonClick: (event: any, value: string) => void
}
const CustomPaper = styled(Paper)` && {
    display: flex;
    flex-direction: column;
    align-items: center;
   justify-content: center;
   width: 20%;
   height: 100%;
  }
`as typeof Paper

export default class AccessDenied extends React.PureComponent<AccessDeniedProps>{
    onButtonClick = (event) => {
        this.props.onButtonClick(event, this.props.data)
    }

    render(){
        return (
            <CustomPaper>
                <h3>Access denied to:</h3>
                <Typography variant="h2">
                    <Emoji variant={'warning'}/>
                </Typography>
                <ul>
                    {this.props.data.modules.map((module) => <li key={module.id}>{module.name}</li>) }
                </ul>
                {this.props.showButton &&
                <Button onClick={this.onButtonClick}>Click here</Button>}
            </CustomPaper>
        )
    }
}
