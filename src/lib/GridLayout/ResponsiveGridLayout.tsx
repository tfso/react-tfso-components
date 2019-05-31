import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'

import {
    synchronizeLayoutWithChildren,
    validateLayout,
    Layout
} from './utils'
import {
    getBreakpointFromWidth,
    getColsFromBreakpoint,
    findOrGenerateResponsiveLayout,
} from './responsiveUtils'
import GridLayout, {GridLayoutProps} from './GridLayout'
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints'

type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>

const type = obj => Object.prototype.toString.call(obj)

type State = {
    layout: Layout,
    breakpoint: Breakpoint,
    cols: number
}

export type ResponsiveGridLayoutProps = Omit<GridLayoutProps, 'cols' | 'layout' | 'onLayoutChange'> & {
    breakpoint?: Breakpoint
    breakpoints: Partial<{ [BP in Breakpoint]: number }>
    cols: Partial<{ [BP in Breakpoint]: number }>
    layouts: Partial<{ [BP in Breakpoint]: Layout }>

    onBreakpointChange?: (breakpoint: Breakpoint, cols: number) => void
    onLayoutChange?: (layout: Layout, breakpoint: Breakpoint, layouts: Partial<{ [BP in Breakpoint]: Layout}>) => void
    onWidthChange?: (
        containerWidth: number,
        margin: [number, number],
        cols: number,
        containerPadding: [number, number] | null
    ) => void
}

export default class ResponsiveGridLayout extends React.PureComponent<ResponsiveGridLayoutProps, State>{
    static propTypes = {
        breakpoint: PropTypes.string,
        breakpoints: PropTypes.object,
        cols: PropTypes.object,
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
                        'Expected one of xl, lg, md, sm or xs, received' + key
                    )
                }
                validateLayout(props.layouts[key], 'layouts.' + key)
            })
        },

        width: PropTypes.number.isRequired,
        onBreakpointChange: PropTypes.func,
        onLayoutChange: PropTypes.func,
        onWidthChange: PropTypes.func
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
        }else if(!isEqual(prevProps.layouts, layouts)){
            const {breakpoint, cols} = this.state
            const newLayout = findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, breakpoint, cols)
            this.setState({layout: newLayout})
        }
    }

    onLayoutChange = (layout: Layout) => {
        this.props.onLayoutChange && this.props.onLayoutChange(layout, this.state.breakpoint, {
            ...this.props.layouts,
            [this.state.breakpoint]: layout
        })
    }

    onWidthChange(prevProps: Readonly<ResponsiveGridLayoutProps>){
        const {children, breakpoint, breakpoints, margin, containerPadding, width, cols, onLayoutChange, onBreakpointChange, onWidthChange: onWidthChangeCallback} = this.props
        const layouts = {...this.props.layouts}
        const newBreakpoint = breakpoint || getBreakpointFromWidth(breakpoints, width)
        const lastBreakpoint = this.state.breakpoint
        const newCols = getColsFromBreakpoint(newBreakpoint, cols)
        if(lastBreakpoint !== newBreakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols){
            if(!(lastBreakpoint in layouts)){
                layouts[lastBreakpoint] = this.state.layout
            }
            const newLayout = synchronizeLayoutWithChildren(
                findOrGenerateResponsiveLayout(layouts, breakpoints, newBreakpoint, lastBreakpoint, newCols),
                children, newCols
            )

            layouts[newBreakpoint] = newLayout

            onLayoutChange && onLayoutChange(newLayout, newBreakpoint, layouts)
            onBreakpointChange && onBreakpointChange(newBreakpoint, newCols)
            this.setState({breakpoint: newBreakpoint, layout: newLayout, cols: newCols})
        }
        onWidthChangeCallback && onWidthChangeCallback(width, margin, newCols, containerPadding)
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
