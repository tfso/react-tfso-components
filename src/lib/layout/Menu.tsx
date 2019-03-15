import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import styled from 'styled-components/macro'

const StyledDrawer = styled(Drawer).attrs({
    classes: {paper: 'MuiPaperStyle'}
})`
    &&{
      width: ${props => props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1}px;
      transition: none;
      transform: none;
      white-space: nowrap;
      display: flex;
      overflow-x: hidden;
      background-color: #CCC;
      border: none;
    }
    
    .MuiPaperStyle{
      width: ${props => props.open ? 260 : props.theme.mui.spacing.unit * 9 + 1}px;
      transition: none;
      transform: none;
      position: static;
      overflow-x: hidden;
      background-color: ${props => props.theme.tfso.colors.baseLight5Color};
      border: none;
    }
`

export type MenuProps = {
    open: boolean
}

export class Menu extends React.PureComponent<MenuProps>{
    static propTypes = {
        open: PropTypes.bool.isRequired
    }

    render(){
        return (
            <StyledDrawer variant="permanent" open={this.props.open}>
                <List>
                    {this.props.children}
                </List>
            </StyledDrawer>
        )
    }
}