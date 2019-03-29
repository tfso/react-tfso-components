import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Paper, { PaperProps } from '@material-ui/core/Paper'

const BackgroundPaper = ({background, ...props}: { background: string } & PaperProps) => (<Paper {...props} />)
const WidgetContainer = styled(BackgroundPaper)`&&{
    background: ${({background}) => background};
    width: 100%;
    height: 100%;
}`

type WidgetSize = 'small' | 'medium' | 'large'

type WidgetBaseProps = {
    index: number
    background?: string
    onOrder: (index: number, sourceIndex: number) => void
    children: React.ReactChild //allow only one child
}

type DragDropData = {
    index: number
}

type WidgetState = {
    dragging: boolean
    dragOver: boolean
}

class Widget extends React.PureComponent<WidgetBaseProps, WidgetState> {
    static defaultProps = {
        background: 'inherit'
    }
    static propTypes = {
        index: PropTypes.number.isRequired,
        background: PropTypes.string,
        onOrder: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    }

    state: WidgetState = {
        dragging: false,
        dragOver: false,
    }

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()

        try{
            const data = JSON.parse(e.dataTransfer.getData('text')) as DragDropData
            if(data.index !== this.props.index)
                this.props.onOrder(this.props.index, data.index)
        }catch(err){ }
        this.setState({dragOver: false})
    }

    onDragStart = (e: React.DragEvent<HTMLDivElement | SVGSVGElement>) => {
        const dragData: DragDropData = {
            index: this.props.index
        }
        e.dataTransfer.setData('text', JSON.stringify(dragData))
        this.setState({dragging: true})
    }

    onDragEnd = (e: React.DragEvent<HTMLDivElement | SVGSVGElement>) => {
        this.setState({dragging: false})
    }

    onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        this.setState({dragOver: true})
    }

    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        this.setState({dragOver: false})
    }

    render(){
        const { children, background } = this.props

        return(
            <WidgetContainer 
                background={background || 'inherit'}
                elevation={0}
                style={{
                    // TODO: other design??
                    border: this.state.dragOver ? '2px dashed #333' : 'unset',
                }}
                draggable
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                {children}        
            </WidgetContainer>
        )
    }
}

const sizeMap: {[P in WidgetSize]: {cols: number, rows: number}} = {
    small: {cols: 1, rows: 0.5},
    medium: {cols: 2, rows: 1},
    large: {cols: 4, rows: 2}
}

export type WidgetProps = { 
    size: WidgetSize
    minSize?: WidgetSize
} &  Pick<WidgetBaseProps, 'background' | 'children'>

export type DashBoardProps = {
    widgets: Array<WidgetProps>
    onChangeOrder: (widgets: Array<WidgetProps>) => void
    onRemove: (something) => void
    spacing?: number //GridListProps['spacing']
    children?: undefined // don't allow any children
}

export default class DashBoard extends React.PureComponent<DashBoardProps> {
    static defaultProps = {
        spacing: 16
    }

    static propTypes = {
        onChangeOrder: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        spacing: PropTypes.number,
        widgets: PropTypes.arrayOf(PropTypes.shape({
            background: PropTypes.string,
            children: PropTypes.node.isRequired,
            minSize: PropTypes.oneOf(['small', 'medium', 'large']),
            size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired
        })),
        //children: PropTypes. //TODO: Check that children is undefined
    }

    onOrderArray = (target: number, source: number) => {
        const widgets = [...this.props.widgets]
        widgets.splice(target, 0, widgets.splice(source, 1)[0])
        this.props.onChangeOrder(widgets)
    }

    render(){
        return(
            <GridList 
                spacing={this.props.spacing}
                cols={4}
                cellHeight={250}
                style={{width: '100%'}}
            >
                {this.props.widgets.map(({size, ...widget}, i) => (
                    <GridListTile key={i} {...sizeMap[size]} >
                        <Widget {...widget}
                            index={i}
                            onOrder={this.onOrderArray}
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }
}