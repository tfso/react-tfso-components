import {BoardItems, ScreenType, BoardItemDimensions, BoardItemLayout, BoardDimensions} from './types'
import {Breakpoint, BreakpointValues} from '@material-ui/core/styles/createBreakpoints'

export function calculateBoardRows(items: BoardItems, screenType: ScreenType){
    return Object.values(items)
        .map((item) => {
            const layout = item[screenType]
            return layout
                ? layout.row + layout.rowSpan
                : 0
        })
        .reduce((max, bottomY) => bottomY > max ? bottomY : max, 0)
}

export function calculateBoardHeight(rows: number, spacing: number, rowHeight: number){
    return rows * rowHeight + (rows - 1) * spacing
}

export function calculateItemDimensions(
    item: BoardItemLayout,
    {rowHeight, colWidth, spacing}: BoardDimensions
):BoardItemDimensions{
    return {
        top: item.row * (rowHeight + spacing),
        left: item.col * (colWidth + spacing),
        height: item.rowSpan * rowHeight + (item.rowSpan - 1) * spacing,
        width: item.colSpan * colWidth + (item.colSpan - 1) * spacing,
    }
}

export function calculateItemLayout(
    item: BoardItemLayout,
    {top, left}: Pick<BoardItemDimensions, 'top' | 'left'>,
    {rowHeight, colWidth, spacing}: BoardDimensions
):BoardItemLayout{
    return {
        ...item,
        col: Math.round(left / (colWidth + spacing)),
        row: Math.round(top / (rowHeight + spacing))
    }
}

export function getBreakpointFromWidth(
    breakpoints: BreakpointValues,
    width: number
): Breakpoint{
    const sorted = sortBreakpoints(breakpoints)
    let matching = sorted[0]
    for(let i = 1; i < sorted.length; i++){
        const breakpointName = sorted[i]
        const breakpoint = breakpoints[breakpointName]
        if(breakpoint && width > breakpoint) matching = breakpointName
    }
    return matching
}

export function sortBreakpoints(breakpoints: BreakpointValues): Array<Breakpoint>{
    const keys = Object.keys(breakpoints) as Array<Breakpoint>
    return keys.sort((a, b) => (breakpoints[a] || 0) - (breakpoints[b] || 0))
}
