import React from 'react'
// import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>
type WPProps = {
    measureBeforeMount?: boolean
}

type WPState = {
    width: number
}

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
export default function WidthProvider<TProps extends WPState>(
    ComposedComponent: React.ComponentType<TProps>
): React.ComponentType<Omit<TProps & WPProps, 'width'>>{
    return class WidthProvider extends React.PureComponent<Omit<TProps & WPProps, 'width'>, WPState>{
        // static defaultProps = {
        // measureBeforeMount: false
        // }

        // static propTypes = {
        // // If true, will not render children until mounted. Useful for getting the exact width before
        // // rendering, to prevent any unsightly resizing.
        // measureBeforeMount: PropTypes.bool.isRequired,
        // }

        state: WPState = {
            width: 1280
        }

        _mounted: boolean = false

        componentDidMount(){
            this._mounted = true

            window.addEventListener('resize', this.onWindowResize)
            // Call to properly set the breakpoint and resize the elements.
            // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
            // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.
            this.onWindowResize()
        }

        componentWillUnmount(){
            this._mounted = false
            window.removeEventListener('resize', this.onWindowResize)
        }

        onWindowResize = () => {
            if(!this._mounted) return
            const node = ReactDOM.findDOMNode(this)
            if(node instanceof HTMLElement){
                this.setState({width: node.offsetWidth})
            }
        }

        render(){
            const {measureBeforeMount, ...rest} = this.props
            if(measureBeforeMount && !this._mounted){
                return (
                    <div {...rest} />
                )
            }

            return <ComposedComponent {...rest as any} {...this.state} />
        }
    }
}
