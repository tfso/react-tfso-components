import React from 'react'

import history from '../history'

import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'
import styled from 'styled-components/macro'

export type LinkProps = {
    to?: string
    children: React.ReactNode
} & MuiLinkProps

export default class Link extends React.PureComponent<LinkProps> {
    onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        this.props.onClick && this.props.onClick(event)

        if(event.defaultPrevented || !this.props.to){
            return
        }
        event.preventDefault()
        //history.location.
        history.push(this.props.to.toLowerCase())
    }

    render(){
        const { to, href, underline, ...other } = this.props
        return <MuiLink 
            {...other}
            href={to && to.toLowerCase() || href}
            underline={underline || 'none'}
            rel={this.props.target === '_blank' ? 'noreferrer' : undefined}
            onClick={this.onClick}
        />
    }
}

export const Anchor = styled(Link)`&&{
    opacity: 0.2;
    :hover{
        opacity: 1;
    }
}`
