import React, {Component} from 'react'
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

export class Menu extends Component{
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