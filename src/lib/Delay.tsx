import React from 'react'
import PropTypes from 'prop-types'

type Props = {
    beforeShow?: any
    delayMs?: number
    show?: boolean
    children: React.ReactNode
}

type State = {
    show: boolean
}

export default class Delay extends React.PureComponent<Props, State>{
    static propTypes = {
        beforeShow: PropTypes.node,
        delayMs: PropTypes.number,
        show: PropTypes.bool,
        children: PropTypes.node.isRequired
    }

    _timer: any = null

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    componentDidMount(){
        this.setState({show: false})
        this._timer = setTimeout(() => {
            this.setState({show: true})
        }, this.props.delayMs || 1000)
    }
    componentWillUnmount(){
        clearTimeout(this._timer)
    }
    render(){
        if(this.props.show || this.state.show){
            return this.props.children
        }

        return this.props.beforeShow || null
    }
}