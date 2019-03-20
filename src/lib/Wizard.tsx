import React, {HTMLProps} from 'react'
import PropTypes from 'prop-types'

type Props = {
    children: (tabIndex: number, next: () => void, prev: () => void) => React.ReactNode
    index?: number
    length?: number
} & HTMLProps<HTMLDivElement>

type State = {
    index: number
}

export default class Wizard extends React.PureComponent<Props, State>{
    static propTypes = {
        children: PropTypes.func.isRequired,
        index: PropTypes.number,
        length: PropTypes.number
    }

    constructor(props){
        super(props)
        this.state = {index: props.index || 0}
    }

    static getDerivedStateFromProps(nextProps){
        if(nextProps.hasOwnProperty('index')){
            return {index: nextProps.index}
        }
        return null
    }

    next = () => this.setState(state => {
        if(this.props.length && state.index + 1 >= this.props.length) return state
        return {index: state.index + 1}
    })
    prev = () => this.setState(state => {
        if(state.index - 1 < 0) return state
        return {index: state.index - 1}
    })

    render(){
        const {children, ...restProps} = this.props

        return (
            <div {...restProps}>
                {children(this.state.index, this.next, this.prev)}
            </div>
        )
    }
}