import React from 'react'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import {Button} from '@material-ui/core'
import styled from 'styled-components/macro'
import Link from '@material-ui/core/Link'
import {InjectedScreenSizeProps, withScreenSize} from './ScreenSize'
import Typography from '@material-ui/core/Typography'

type ModuleDescriptor = {id: number, name: string}
type Modules = Array<ModuleDescriptor>

type AccessDeniedProps ={
    title: string
    description: string
    status: number
    modules: Modules
    onButtonClick: (event: any, value: any) => void
    goBack: () => void
    translate: (key: string) => string
}
const CustomDiv = styled.div`
        width: 400px;
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
    position: relative;
} 
`as typeof Paper

const CustomLockIcon = styled(LockIcon)` &&{
    position: absolute;
    color: rgba(0, 0, 0, 0.1);
    font-size: 25em;
    transform: translate(-50 %, -50 %);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
` as typeof LockIcon

const RequestButton = styled(Button)`
 && {
    margin: 10px;
 }

` as typeof Button

const List = styled.ul`
  list-style: none;
  padding: 0;
  font-weight: bold;
`

export default withScreenSize(class AccessDenied extends React.PureComponent<AccessDeniedProps & InjectedScreenSizeProps>{
    onButtonClick = (event) => {
        this.props.onButtonClick(event, this.props.modules)
    }

    goBack = () => {
        this.props.goBack()
    }
    render(){
        const {translate, modules} = this.props
        const desktopView = (
            <CustomPaper>
                <CustomLockIcon/>
                <CustomDiv>
                    <Typography variant='h3'>{translate('Access Denied')}</Typography> <br/>
                    <Typography variant='body1'>{translate('accessdenieddescription')}</Typography>
                    <List>
                        {modules.map((module) => <li key={module.id}>{translate(module.name)} </li>)}
                    </List>
                    <RequestButton size='large' color='primary' variant='contained' onClick={this.onButtonClick}>{translate('Request access')}</RequestButton><br/>
                    <Link onClick={this.goBack}>{translate('Go back')}</Link>
                </CustomDiv>
            </CustomPaper>
        )
        const mobileView = (
            <CustomPaper>
                <CustomLockIcon/>
                <div>
                    <Typography variant='h3'>{translate('Access Denied')}</Typography> <br/>
                    <Typography variant='body1'>{translate('accessdenieddescription')}</Typography>
                    <List>
                        {modules.map((module) => <li key={module.id}>{translate(module.name)} </li>)}
                    </List>
                    <RequestButton size='large' color='primary' variant='contained' onClick={this.onButtonClick}>{translate('Request access')}</RequestButton><br/>
                    <Link onClick={this.goBack}>{translate('Go back')}</Link>
                </div>
            </CustomPaper>
        )
        const {mobile} = this.props.screenSize
        return mobile ? mobileView : desktopView
    }
}
)