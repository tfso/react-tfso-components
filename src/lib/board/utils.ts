import {BoardItems, ScreenType, BoardItemDimensions, BoardItemLayout, BoardDimensions, BoardItem} from './types'
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

export function collides(bil1?: BoardItemLayout, bil2?: BoardItemLayout){
    if(!bil1 || !bil2) return false
    if(bil1.col + bil1.colSpan <= bil2.col) return false
    if(bil1.col >= bil2.col + bil2.colSpan) return false
    if(bil1.row + bil1.rowSpan <= bil2.row) return false
    if(bil1.row >= bil2.row + bil2.rowSpan) return false
    return true
}

export function compact(items: BoardItems, screenType: ScreenType): BoardItems{
    let newLayout: {[key: string]: BoardItem} = {}
    let layoutWasChanged = false
    const sortedItemLayouts = Object.values(items)
        .filter(item => item.hasOwnProperty(screenType))
        .map(item => ({key: item.key, ...item[screenType]!}))
        .sort(compareBoardItemLayout)

    for(let itemLayout of sortedItemLayouts){
        let itemWasChanged = false
        while(true){
            const test = {...itemLayout, row: itemLayout.row - 1}
            if(test.row < 0 || !!Object.values(newLayout).find(otherItem => collides(otherItem[screenType], test))){
                break
            }
            itemLayout = test
            itemWasChanged = layoutWasChanged = true
        }
        newLayout[itemLayout.key] = itemWasChanged
            ? {...items[itemLayout.key], [screenType]: itemLayout}
            : items[itemLayout.key] // don't want to duplicated items.
    }

    return layoutWasChanged
        ? newLayout
        : items
}

export function compareBoardItemLayout(a: BoardItemLayout, b: BoardItemLayout){
    if(a.row > b.row || (a.row === b.row && a.col > b.col)){
        return 1
    }else if(a.row === b.row && a.col === b.col){
        return 0
    }
    return -1
}

export function moveItem(
    key: string | number,
    items: BoardItems,
    col: number,
    row: number,
    screenType: ScreenType
){
    if(!items.hasOwnProperty(key)){
        throw new Error('slutt')
    }

    const sourceItem = items[key]
    const sourceItemLayout = sourceItem[screenType]!
    const targetItemLayout = {...sourceItemLayout, col, row}
    const targetItem = {...sourceItem, [screenType]: targetItemLayout}

    let newItems = {...items, [sourceItem.key]: targetItem}
    const collisions = Object.values(newItems).filter(otherItem => targetItem.key !== otherItem.key && collides(otherItem[screenType], targetItemLayout))

    if(!collisions.length){
        return newItems
    }

    const movedItems = new Set<string | number>([sourceItem.key])
    for(const collision of collisions){
        const collisionLayout = collision[screenType]!
        const collissionMovedUp = {
            ...collision,
            [screenType]: {
                ...collisionLayout,
                row: Math.max(targetItemLayout.row - collisionLayout.rowSpan, 0)
            }
        }

        // Can switch places (move collision above target)
        if(!Object.values(newItems).find(item => collides(item[screenType], collissionMovedUp[screenType]))){
            movedItems.add(collision.key)
            newItems = {...newItems, [collision.key]: collissionMovedUp}
        }else{
            newItems = moveCollidingItem(targetItem, collision, newItems, screenType, movedItems)
        }
    }
    return newItems
}

function moveCollidingItem(
    source: BoardItem,
    collidesWith: BoardItem,
    items: BoardItems,
    screenType: ScreenType,
    movedItems: Set<string | number>
){
    movedItems.add(collidesWith.key)

    const collissionMovedDown = {
        ...collidesWith,
        [screenType]: {
            ...collidesWith[screenType],
            row: source[screenType]!.row + source[screenType]!.rowSpan
        }
    }

    let newItems = {...items, [collissionMovedDown.key]: collissionMovedDown}
    const collisions = Object.values(newItems)
        .filter(otherItem => !movedItems.has(otherItem.key) && collides(otherItem[screenType], collissionMovedDown[screenType]))

    if(!collisions.length){
        return newItems
    }

    for(const collision of collisions){
        newItems = moveCollidingItem(collissionMovedDown, collision, newItems, screenType, movedItems)
    }

    return newItems
}