import React from 'react'

export default class MobileMenu extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}