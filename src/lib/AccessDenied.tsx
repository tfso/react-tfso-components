import React from 'react'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import {Button} from '@material-ui/core'
import styled from 'styled-components/macro'
import Link from '@material-ui/core/Link'
import {InjectedScreenSizeProps, withScreenSize} from './ScreenSize'
import Typography from '@material-ui/core/Typography'
// import {Translate} from '../types'
type AccessDeniedProps ={
    data: any
    onButtonClick: (event: any, value: string) => void
    goBack: () => void
    translate: (key: string) => string
}
const CustomDiv = styled.div`
        width: 400px;
        z-index: 2;
    `
const CustomPaper = styled(Paper)`
&&{
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
} 
`as typeof Paper
const CustomLockIcon = styled(LockIcon)` &&{
    position: absolute;
    z-index: 1;
    color: rgba(0, 0, 0, 0.1);
    font-size: 25em;
    transform: translate(-50 %, -50 %);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
` as typeof LockIcon

export default withScreenSize(class AccessDenied extends React.PureComponent<AccessDeniedProps & InjectedScreenSizeProps>{
    onButtonClick = (event) => {
        this.props.onButtonClick(event, this.props.data)
    }

    goBack = () => {
        this.props.goBack()
    }
    render(){
        return (
            <CustomPaper>
                <CustomLockIcon/>
                <CustomDiv>
                    <Typography variant='h3'>{this.props.translate('Access Denied')}</Typography> <br/>
                    <Typography variant='body1'>{this.props.translate('accessdenieddescription')}</Typography>
                    <ul style={{listStyle: 'none', padding: 0, fontWeight: 'bold'}}>
                        {this.props.data.modules.map((module) => <li key={module.id}>{module.name} </li>) }
                    </ul>
                    <Button size='large' color='primary' onClick={this.onButtonClick}>{this.props.translate('Request access')}</Button><br/>
                    <Link onClick={this.goBack}>{this.props.translate('Go back')}</Link>
                </CustomDiv>
            </CustomPaper>
        )
    }
})
