import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components/macro'
import TfsoIcon from '../icons/Tfso'

const Root = styled.div`
  width: 100%;
`
const StyledAppBar = styled(AppBar)`&&{
  background: white;
  z-index: ${props => props.theme.mui.zIndex.drawer + 1};  
}`
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
`
const Left = styled.div`&&{
  flex: 0 0 240px;
  background-color: ${({theme}) => theme.tfso.colors.tfso};
  color: #fff;
  padding-left: 10px;
  display: flex;
  align-items: center;
}`
const Right = styled.div`&&{
  flex: 1;
}`

const MenuButton = styled(IconButton)`&&{
  margin-left: -12px;
  margin-right: 20px;
}`

const ToolbarRight = styled.div`&&{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}`

export type TopBarProps = {
    title: string
    onMenuToggle?: () => void
}

export default class TopBar extends React.PureComponent<TopBarProps, any>{
    static propTypes = {
        title: PropTypes.string.isRequired
    }

    render(){
        return (
            <Root>
                <StyledAppBar position="static" color="default" elevation={1}>
                    <Wrapper>
                        <Left>
                            <TfsoIcon color="inherit" fontSize="large" />
                            <Typography variant="h6" color="inherit" style={{paddingLeft: 7}}>
                                {this.props.title}
                            </Typography>
                        </Left>
                        <Right>
                            <Toolbar variant="dense">
                                {this.props.onMenuToggle &&
                                <MenuButton color="inherit" aria-label="Open drawer" onClick={e => this.props.onMenuToggle && this.props.onMenuToggle()}>
                                    <MenuIcon/>
                                </MenuButton>
                                }
                                <ToolbarRight>
                                    <div>{this.props.children}</div>
                                </ToolbarRight>
                            </Toolbar>
                        </Right>
                    </Wrapper>
                </StyledAppBar>
            </Root>
        )
    }
}