import React from 'react'
import PropTypes from 'prop-types'

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

export type InfiniteScrollProps = {
    /**
     * Invoked when the bottom of the scrollcontainer is reached
     */
    onReachEnd?: () => void

    /**
     * Invoked when the treshold distance to the bottom of the scrollcontainer is reached
     */
    onReachTreshold?: () => void

    /**
     * A number >= 0 and < 1
     * Defines in percentage (factor) of the viewable containers height the distance from the bottom where the threshold is
     * @default 0.1
     */
    threshold?: number

    /**
     * The height of the container
     * @default 'calc(100%)'
     */
    height?: string | number

    /**
     * Children, whatever you want
     */
    children: React.ReactNode
}

export default class InfiniteScroll extends React.PureComponent<InfiniteScrollProps>{
    static defaultProps = {
        treshold: 0.1,
        height: 'calc(100%)'
    }

    static propTypes = {
        onReachEnd: PropTypes.func,
        onReachThreshold: PropTypes.func,
        threshold: function(props: InfiniteScrollProps, propName: string, componentName: string){
            const propValue = props[propName]
            if(propValue === undefined){
                return
            }

            const propType = typeof propValue
            if(propType !== 'number'){
                return new Error(`Invalid prop \`${propName}\` of value \`${propValue}\` supplied to \`${componentName}\`, expected a number.`)
            }
            if(propValue >= 1 || propValue < 0){
                return new Error(`Invalied prop ${propValue} of value \`${propName}\` supplied to \`${componentName}\`, expected a number < 1 and >= 0.`)
            }
        },
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node.isRequired,
    }

    // Initially we must assume that the end is nigh
    // Lest we prematurely raise the event
    // (Because the children may not be spawned, and the clientHeight may be less than the scrollHeight)
    // Also, keeping this 'state' as regular ol class members, since we don't actually want a re-render after mutating these
    _reachedTreshold = true
    _lastScrollTop = 0

    _ref: React.RefObject<HTMLDivElement> = React.createRef()

    onScroll = throttle(() => {
        const node = this._ref.current
        if(!node){ return }

        const {clientHeight, scrollTop, scrollHeight} = node
        if(clientHeight >= scrollHeight){ return }

        const {threshold = 0.1, onReachEnd, onReachTreshold} = this.props
        const thresholdPoint = scrollHeight - clientHeight * threshold
        const thresholdReachable = clientHeight < thresholdPoint
        const end = clientHeight + scrollTop
        const reachedTreshold = end >= thresholdPoint
        const reachedEnd = end === scrollHeight

        if(scrollTop <= this._lastScrollTop){
            // Scrolling up
            this._lastScrollTop = scrollTop
            this._reachedTreshold = reachedTreshold
            return
        }
        this._lastScrollTop = scrollTop

        // Reaching the treshold can occur multiple times, handle differently
        if(reachedTreshold){
            if(!this._reachedTreshold || !thresholdReachable && reachedEnd){
                onReachTreshold && onReachTreshold()
                console.log('onReachThreshold')
            }
            this._reachedTreshold = true
        }else if(this._reachedTreshold){
            this._reachedTreshold = false
        }

        // Reaching the end can only occur once
        if(reachedEnd){
            onReachEnd && onReachEnd()
            console.log('onReachEnd')
        }
    })

    render(){
        return (
            <div style={{height: this.props.height || 'calc(100%)', width: '100%', overflowY: 'auto'}} ref={this._ref} onScroll={this.onScroll}>
                {this.props.children}
            </div>
        )
    }
}