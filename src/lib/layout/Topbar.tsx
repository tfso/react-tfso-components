import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components/macro'

const Root = styled.div`
  width: 100%;
`
const StyledAppBar = styled(AppBar)`
&&{
  background: white;
  box-shadow: none;
  z-index: ${props => props.theme.mui.zIndex.drawer + 1};
}
`

const Grow = styled.div`
  flex-grow: 1;
`

const MenuButton = styled(IconButton)`
&&{
  margin-left: -12px;
  margin-right: 20px;
}
`

const Title = styled(Typography)`
&&{
  margin-right: 20px;
  display: none;
  ${({theme}) => theme.mui.breakpoints.up('sm')}{
    display: block;
  }
}
`

const SectionDesktop = styled.div`
&&{
  display: none;
  ${({theme}) => theme.mui.breakpoints.up('md')}{
    display: flex;
    align-items: center;
  }
}
`

const SectionMobile = styled.div`
&&{
  display: flex;
  ${({theme}) => theme.mui.breakpoints.up('md')}{
    display: none;
  }
}
`

export type TopBarProps = {
    title: string
    onMenuToggle: () => void | null
    mobileMenu?: React.ReactNode
}

export default class TopBar extends React.PureComponent<TopBarProps, any>{
    static propTypes = {
        title: PropTypes.string.isRequired,
        mobileMenu: PropTypes.node.isRequired
    }
    state = {
        mobileMoreAnchorEl: null
    }
    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget})
    }
    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null})
    }

    render(){
        const {mobileMoreAnchorEl} = this.state
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

        return (
            <Root>
                <StyledAppBar position="static" color="default">
                    <Toolbar>
                        <Title variant="h6" color="inherit" noWrap>
                            {this.props.title}
                        </Title>
                        {this.props.onMenuToggle !== null &&
                        <MenuButton color="inherit" aria-label="Open drawer" onClick={e => this.props.onMenuToggle && this.props.onMenuToggle()}>
                            <MenuIcon/>
                        </MenuButton>
                        }
                        <Grow/>
                        <SectionDesktop>
                            {this.props.children}
                        </SectionDesktop>
                        <SectionMobile>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </SectionMobile>
                    </Toolbar>
                </StyledAppBar>
                <Menu
                    anchorEl={mobileMoreAnchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMobileMenuOpen}
                    onClose={this.handleMobileMenuClose}
                >
                    {this.props.mobileMenu}
                </Menu>
            </Root>
        )
    }
}