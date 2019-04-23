import React from 'react'
import PropTypes from 'prop-types'

export type DelayProps = {
    beforeShow?: React.ReactNode
    /**
     * @default 1000
     */
    delayMs?: number
    /**
     * @deprecated ??
     */
    show?: boolean
    children: React.ReactNode
}

type State = {
    show: boolean
}

export default class Delay extends React.PureComponent<DelayProps, State>{
    static propTypes = {
        beforeShow: PropTypes.node,
        delayMs: PropTypes.number,
        show: PropTypes.bool,
        children: PropTypes.node.isRequired
    }
    static defaultProps = {
        delayMs: 1000
    }

    _timer: any = null
    state = {
        show: false
    }
    componentDidMount(){
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