import React from 'react'
// import styled from 'styled-components'
import PropTypes from 'prop-types'

import List, {ListProps} from '@material-ui/core/List'

// const Wrapper = ({containerHeight, ...props}: {containerHeight: string | number} & React.HTMLAttributes<HTMLDivElement>) => <div {...props} />
// const Container = styled(Wrapper)`&&{
//     height: ${({containerHeight}) => typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight};
//     width: 100%;
//     overflow-y: auto;
// }`

const throttle = (fn: (...args: any[]) => void) => {
    let running = false
    return (...args: any[]) => {
        if(!running){
            // TODO: Use timeout if RAF is unavailable
            window.requestAnimationFrame(() => {
                fn(args)
                running = false
            })
            running = true
        }
    }
}

export type InfiniteListProps = ListProps & {
    /**
     * @default 0.1
     */
    threshold?: number
    more?: boolean
    onReachEnd?: () => void
    onReachTreshold?: () => void

    /**
     * @default calc(100%)
     */
    containerHeight?: string | number
}

type State = {
    reachedEnd: boolean
    reachedTreshold: boolean
}

export default class InfiniteList extends React.PureComponent<InfiniteListProps, State>{
    state: State = {
        reachedEnd: false,
        reachedTreshold: false // true because of initial mounting of items
    }

    _ref: React.RefObject<HTMLDivElement> = React.createRef()

    componentDidUpdate(prevProps: Readonly<InfiniteListProps>){
        if(prevProps.children !== this.props.children){
            console.log('new children')
            this.setState({reachedEnd: false, reachedTreshold: false})
        }
    }

    onScroll = throttle(() => {
        const node = this._ref.current
        if(!node){
            return
        }

        const end = node.clientHeight + node.scrollTop
        const reachedEnd = end === node.scrollHeight
        const reachedTreshold = end >= node.scrollHeight - node.clientHeight * (this.props.threshold || 0.1)
        if(reachedEnd){
            this.on('reachedEnd', this.props.onReachEnd)
        }
        if(reachedTreshold){
            this.on('reachedTreshold', this.props.onReachTreshold)
        }
    })

    on = (event: 'reachedEnd' | 'reachedTreshold', callback?: () => void) => {
        if(this.state[event]){
            return
        }
        console.log(event)
        this.setState({[event]: true} as State, callback)
    }

    render(){
        return (
            <div style={{height: this.props.containerHeight || 'calc(100%)', width: '100%', overflowY: 'auto'}} ref={this._ref} onScroll={this.onScroll}>
                <List {...this.props}/>
            </div>
        )
    }
}