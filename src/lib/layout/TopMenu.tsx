import React from 'react'

export default class TopMenu extends React.PureComponent{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}