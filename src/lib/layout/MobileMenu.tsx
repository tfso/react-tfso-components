import React from 'react'

export class MobileMenu extends React.Component{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}