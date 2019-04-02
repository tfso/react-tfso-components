import React from 'react'

import history from '../history'

import MuiLink, {LinkProps as MuiLinkProps} from '@material-ui/core/Link'
import styled from 'styled-components/macro'

export type LinkProps = {
    to?: string
    children: React.ReactNode
} & MuiLinkProps

export default class Link extends React.PureComponent<LinkProps>{
    onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        this.props.onClick && this.props.onClick(event)

        if(event.defaultPrevented || !this.props.to){
            return
        }
        event.preventDefault()
        history.push(this.props.to.toLowerCase())
    }

    render(){
        const {to, href, underline, ...other} = this.props
        return <MuiLink
            {...other}
            href={to && to.toLowerCase() || href}
            underline={underline || 'none'}
            rel={this.props.target === '_blank' ? 'noreferrer' : undefined}
            onClick={this.onClick}
        />
    }
}

const AnchorLink = styled(Link)`&&{
    opacity: 0.2;
    :hover{
        opacity: 1;
    }
}`

const getPage = () => window.location.hash.split('/')[1]
export const Anchor = (props: {id: string}) => {
    const id = `/${getPage()}/${props.id.toLowerCase()}`
    return (
        <AnchorLink id={id} to={id}>#</AnchorLink>
    )
}