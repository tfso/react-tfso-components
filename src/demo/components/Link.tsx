import React from 'react'

import history from '../history'

export type LinkProps = {
    to: string
    children: React.ReactNode
}

export default class Link extends React.PureComponent<LinkProps> {
    onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if(event.defaultPrevented){
            return
        }
        event.preventDefault()
        history.push(this.props.to.toLowerCase())
    }

    render(){
        const { to, ...other } = this.props
        return <a 
            {...other}
            href={to.toLowerCase()}
            onClick={this.onClick}
            style={{textDecoration: 'none'}}
        />
    }
}