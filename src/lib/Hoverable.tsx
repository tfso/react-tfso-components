import React, {HTMLProps} from 'react'
import PropTypes from 'prop-types'

type Props = {
    children: (hover: boolean, ref: React.RefObject<any>) => React.ReactNode
} & HTMLProps<HTMLDivElement>

type State = {
    hover: boolean
}

export default class Hoverable extends React.PureComponent<Props, State>{
    private ref: React.RefObject<any>

    static propTypes = {
        children: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)

        this.ref = React.createRef()

        this.state = {
            hover: false
        }
    }

    toggleHover = () => {
        this.setState(state => ({hover: !state.hover}))
    }

    hoverOn = () => this.setState({hover: true})
    hoverOff = () => this.setState({hover: false})

    render(){
        const {children, ...restProps} = this.props

        return (
            <div
                ref={this.ref}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
                {...restProps}
            >
                {children(this.state.hover, this.ref)}
            </div>
        )
    }
}