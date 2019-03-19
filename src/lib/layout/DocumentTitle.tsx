import React from 'react'

function setTitle(text){
    document.title = text
}

type Props = {
    text: string
}

export default class DocumentTitle extends React.PureComponent<Props>{
    constructor(props){
        super(props)
        setTitle(props.text)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.text !== this.props.text){
            setTitle(nextProps.text)
        }
    }
    render(){
        return ''
    }
}