import React from 'react'

export class TopMenu extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}