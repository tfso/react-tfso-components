import React from 'react'

export class MobileMenu extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}