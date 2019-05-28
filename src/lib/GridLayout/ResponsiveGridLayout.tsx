import React from 'react'
import PropTypes from 'prop-types'

import {
    synchronizeLayoutWithChildren,
    validateLayout,
    Layout
} from './utils'
import {
    getBreakpointFromWidth,
    getColsFromBreakpoint,
    findOrGenerateResponsiveLayout,
    Breakpoint
} from './responsiveUtils'
import GridLayout, {GridLayoutProps} from './GridLayout'

const type = obj => Object.prototype.toString.call(obj)

type State = {
    layout: Layout,
    breakpoint: Breakpoint,
    cols: number
}

export type ResponsiveGridLayoutProps = GridLayoutProps & {
    // Responsive config
    breakpoint?: Breakpoint,
    breakpoints: { [BP in Breakpoint]: number },
    cols: { [BP in Breakpoint]: number },
    layouts: { [BP in Breakpoint]: Layout },

    // Callbacks
    onBreakpointChange?: (breakpoint: Breakpoint, cols: number) => void,
    onLayoutChange?: (layout: Layout, data: { [BP in Breakpoint]: Layout}) => void,
    onWidthChange?: (
        containerWidth: number,
        margin: [number, number],
        cols: number,
        containerPadding: [number, number] | null
    ) => void
}

export default class ResponsiveReactGridLayout extends React.PureComponent<ResponsiveGridLayoutProps, State>{
    // This should only include propTypes needed in this code; RGL itself
    // will do validation of the rest props passed to it.
    static propTypes = {
        //
        // Basic props
        //

        // Optional, but if you are managing width yourself you may want to set the breakpoint
        // yourself as well.
        breakpoint: PropTypes.string,

        // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
        breakpoints: PropTypes.object,

        // # of cols. This is a breakpoint -> cols map
        cols: PropTypes.object,

        // layouts is an object mapping breakpoints to layouts.
        // e.g. {lg: Layout, md: Layout, ...}
        layouts(props: ResponsiveGridLayoutProps, propName: string){
            if(type(props[propName]) !== '[object Object]'){
                throw new Error(
                    'Layout property must be an object. Received: ' +
                    type(props[propName])
                )
            }
            Object.keys(props[propName]).forEach(key => {
                if(!(key in props.breakpoints)){
                    throw new Error(
                        'Each key in layouts must align with a key in breakpoints.'
                    )
                }
                validateLayout(props.layouts[key], 'layouts.' + key)
            })
        },

        // The width of this component.
        // Required in this propTypes stanza because generateInitialState() will fail without it.
        width: PropTypes.number.isRequired,

        //
        // Callbacks
        //

        // Calls back with breakpoint and new # cols
        onBreakpointChange: PropTypes.func,

        // Callback so you can save the layout.
        // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
        onLayoutChange: PropTypes.func,

        // Calls back with (containerWidth, margin, cols, containerPadding)
        onWidthChange: PropTypes.func
    }

    static defaultProps = {
        breakpoints: {xl: 1600, lg: 1200, md: 996, sm: 768, xs: 480},
        cols: {xl: 12, lg: 10, md: 8, sm: 6, xs: 4},
        layouts: {}
    }

    state = this.generateInitialState()

    generateInitialState(): State{
        const {width, breakpoints, layouts, cols} = this.props
        const breakpoint = getBreakpointFromWidth(breakpoints, width)
        const colNo = getColsFromBreakpoint(breakpoint, cols)

        // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
        // for this layout.
        const initialLayout = findOrGenerateResponsiveLayout(
            layouts,
            breakpoints,
            breakpoint,
            breakpoint,
            colNo
        )

        return {
            layout: initialLayout,
            breakpoint: breakpoint,
            cols: colNo
        }
    }

    componentDidUpdate(prevProps: Readonly<ResponsiveGridLayoutProps>){
        const {width, breakpoint, breakpoints, cols, layouts} = this.props
        if(prevProps.width !== width || prevProps.breakpoint !== breakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols){
            this.onWidthChange(prevProps)
        }else if(prevProps.layouts !== this.props.layouts){
            const {breakpoint, cols} = this.state
            const newLayout = findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, breakpoint, cols)
            this.setState({layout: newLayout})
        }
    }

    // wrap layouts so we do not need to pass layouts to child
    onLayoutChange = (layout: Layout) => {
        this.props.onLayoutChange && this.props.onLayoutChange(layout, {
            ...this.props.layouts,
            [this.state.breakpoint]: layout
        })
    }

    onWidthChange(prevProps: Readonly<ResponsiveGridLayoutProps>){
        const {children, breakpoint, breakpoints, margin, containerPadding, width, cols, onLayoutChange, onBreakpointChange, onWidthChange} = this.props
        const layouts = {...this.props.layouts}
        const newBreakpoint = breakpoint || getBreakpointFromWidth(breakpoints, width)
        const lastBreakpoint = this.state.breakpoint
        const newCols = getColsFromBreakpoint(newBreakpoint, cols)
        if(lastBreakpoint !== newBreakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols){
            if(!(lastBreakpoint in layouts)){
                layouts[lastBreakpoint] = {...this.state.layout}
            }
            const newLayout = synchronizeLayoutWithChildren(
                findOrGenerateResponsiveLayout(layouts, breakpoints, newBreakpoint, lastBreakpoint, newCols),
                children, newCols
            )

            layouts[newBreakpoint] = newLayout

            onLayoutChange && onLayoutChange(newLayout, layouts)
            onBreakpointChange && onBreakpointChange(newBreakpoint, newCols)
            this.setState({breakpoint: newBreakpoint, layout: newLayout, cols: newCols})
        }
        onWidthChange && onWidthChange(width, margin, newCols, containerPadding)
    }

    render(){
        const {
            breakpoint,
            breakpoints,
            cols,
            layouts,
            onBreakpointChange,
            onLayoutChange,
            onWidthChange,
            ...other
        } = this.props

        return (
            <GridLayout
                {...other}
                onLayoutChange={this.onLayoutChange}
                layout={this.state.layout}
                cols={this.state.cols}
            />
        )
    }
}
