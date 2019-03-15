import React from 'react'

export class TopMenu extends React.Component{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}