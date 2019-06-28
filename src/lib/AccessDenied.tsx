import React from 'react'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import {Button} from '@material-ui/core'
import styled from 'styled-components/macro'
import Link from '@material-ui/core/Link'
import {InjectedScreenSizeProps, withScreenSize} from './ScreenSize'
import Typography from '@material-ui/core/Typography'
type AccessDeniedProps ={
    data: any
    onButtonClick: (event: any, value: string) => void
    goBack: () => void
}
const CustomDiv = styled.div`
        width: 400px;
        z-index: 2;
    `
const CustomPaper = styled(Paper)`
&&{
    height: 100%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
} 
`as typeof Paper
const styles = {
    position: 'absolute',
    zIndex: '1',
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: '25em',
    transform: 'translate(-50 %, -50 %)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}
const styleButton = {
    color: 'rgb(36,160,237)'
}
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
                <LockIcon style={styles as any}/>
                <CustomDiv>
                    <Typography variant='h3'>Access Denied</Typography> <br/>
                    <Typography variant='body1'>Ops! Ser ut som du ikke har tilgang her. Trykk på knappen under, så gir vi beskjed til en administrator at du øsnker tilgang til følgene:</Typography>
                    <ul style={{listStyle: 'none', padding: 0, fontWeight: 'bold'}}>
                        {this.props.data.modules.map((module) => <li key={module.id}>{module.name} </li>) }
                    </ul>
                    <Button size='large' color='primary' style={styleButton} onClick={this.onButtonClick}>Click here</Button><br/>
                    <Link onClick={this.goBack}>Go back</Link>
                </CustomDiv>
            </CustomPaper>
        )
    }
})
