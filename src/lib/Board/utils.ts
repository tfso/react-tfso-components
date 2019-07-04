import {Breakpoint, BreakpointValues} from '@material-ui/core/styles/createBreakpoints'
import {BoardItems, ScreenType, BoardItemLayout, BoardItem} from '.'
import {BoardItemDimensions, BoardDimensions} from './types'

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
    if(rows <= 0){
        return 0
    }
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

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}

function constrainItemLayouts<T extends Pick<BoardItem, 'desktop' | 'tablet' | 'mobile'>>(itemLayouts: T): T{
    let layouts: Mutable<T> = {
        ...itemLayouts
    }
    if(layouts.desktop){
        layouts.desktop = constrainItemLayout(layouts.desktop!)
    }
    if(layouts.tablet){
        layouts.tablet = constrainItemLayout(layouts.tablet!)
    }
    if(layouts.mobile){
        layouts.mobile = constrainItemLayout(layouts.mobile!)
    }
    return layouts
}

function constrainItemLayout(itemLayout: BoardItemLayout){
    return {
        col: Math.max(Math.min(itemLayout.col, 10), 0), // 10 because we have 12 columns, from 0 to 11, and an item needs a minimum of 1 width
        row: Math.max(itemLayout.row, 0),
        colSpan: Math.max(Math.min(itemLayout.colSpan, 12), 1),
        rowSpan: Math.max(itemLayout.rowSpan, 1)
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

function sortBreakpoints(breakpoints: BreakpointValues): Array<Breakpoint>{
    const keys = Object.keys(breakpoints) as Array<Breakpoint>
    return keys.sort((a, b) => (breakpoints[a] || 0) - (breakpoints[b] || 0))
}

function collides(bil1?: BoardItemLayout, bil2?: BoardItemLayout){
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
        .map(item => ({key: item.key, layout: item[screenType]!}))
        .sort(({layout: layoutA}, {layout: layoutB}) => compareBoardItemLayout(layoutA, layoutB))

    for(let {key, layout: itemLayout} of sortedItemLayouts){
        let itemWasChanged = false
        while(true){
            const test = {...itemLayout, row: itemLayout.row - 1}
            if(test.row < 0 || !!Object.values(newLayout).find(otherItem => collides(otherItem[screenType], test))){
                break
            }
            itemLayout = test
            itemWasChanged = layoutWasChanged = true
        }
        newLayout[key] = itemWasChanged
            ? {...items[key], [screenType]: itemLayout}
            : items[key] // don't want to duplicate items.
    }

    return layoutWasChanged ? {
        ...items, // to populate other items that didn't have the screenType being compacted.
        ...newLayout
    } : items
}

function compareBoardItemLayout(a: BoardItemLayout, b: BoardItemLayout){
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

    let newItems = {...items, [targetItem.key]: targetItem}
    const collisions = Object.values(newItems)
        .filter(otherItem => targetItem.key !== otherItem.key && collides(otherItem[screenType], targetItemLayout))
        .sort((a, b) => compareBoardItemLayout(a[screenType]!, b[screenType]!)) // The sort may be importand in case one colliding item must be move to fix a previous colliding item
        .reverse() // so we move the bottommost item down first

    if(!collisions.length){
        return newItems
    }

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
        if(!Object.values(newItems).find(item => item.key !== collision.key && collides(item[screenType], collissionMovedUp[screenType]))){
            newItems = {...newItems, [collision.key]: collissionMovedUp}
        }else{
            newItems = moveCollidingItem(targetItem, collision, newItems, screenType)
        }
    }
    return newItems
}

function moveCollidingItem(
    source: BoardItem,
    collidesWith: BoardItem,
    items: BoardItems,
    screenType: ScreenType
){
    const collissionMovedDown = {
        ...collidesWith,
        [screenType]: {
            ...collidesWith[screenType],
            row: source[screenType]!.row + source[screenType]!.rowSpan
        }
    }

    let newItems = {...items, [collissionMovedDown.key]: collissionMovedDown}
    const collisions = Object.values(newItems)
        .filter(otherItem => otherItem.key !== collidesWith.key && collides(otherItem[screenType], collissionMovedDown[screenType]))

    if(!collisions.length){
        return newItems
    }

    for(const collision of collisions){
        newItems = moveCollidingItem(collissionMovedDown, collision, newItems, screenType)
    }

    return newItems
}

const screenTypes: ScreenType[] = ['mobile', 'tablet', 'desktop']

/**
 * Add a new item to the board
 * @param items Existing items in the board
 * @param item New item to add
 */
export function addBoardItem(
    items: BoardItems,
    item: BoardItem
){
    if(items.hasOwnProperty(item.key)){
        throw new Error(`Cannot add item with duplicate key '${item.key}'`)
    }

    const definedScreenTypes = screenTypes
        .filter(st => item.hasOwnProperty(st))

    if(!definedScreenTypes.length){
        throw new Error('Cannot add an item with no layout defined for neither mobile, tablet nor desktop')
    }

    const constrainedItem = constrainItemLayouts(item)

    let newItems = {...items, [constrainedItem.key]: constrainedItem}
    for(const screenType of definedScreenTypes){
        const collisions = Object.values(items)
            .filter(otherItem => constrainedItem.key !== otherItem.key && collides(otherItem[screenType], constrainedItem[screenType]))

        if(!collisions.length){
            newItems = compact(newItems, screenType)
            continue
        }

        for(const collision of collisions){
            newItems = moveCollidingItem(constrainedItem, collision, newItems, screenType)
        }
        newItems = compact(newItems, screenType)
    }
    return newItems
}

export function removeBoardItem(items: BoardItems, key: string){
    const deletedItem = {...items[key]}
    let newItems = {...items} as any
    delete newItems[key]
    if(deletedItem.desktop){
        newItems = compact(newItems, 'desktop')
    }
    if(deletedItem.tablet){
        newItems = compact(newItems, 'tablet')
    }
    if(deletedItem.mobile){
        newItems = compact(newItems, 'mobile')
    }
    return newItems as BoardItems
}

export function hideBoardItem(items: BoardItems, key: string, screenType: ScreenType){
    return compact({
        ...items,
        key: {
            ...items[key],
            [screenType]: undefined
        }
    }, screenType)
}

export function showBoardItem(items: BoardItems, key: string, screenType: ScreenType){
    throw new Error('Not implemtented')
    // resolve collisions
}