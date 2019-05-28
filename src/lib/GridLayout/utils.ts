import isEqual from 'lodash/isEqual'
import React from 'react'

export type LayoutItem = Readonly<{
    width: number
    height: number
    col: number
    row: number
    id: string
    draggable?: boolean
}>
export type Layout = Readonly<{[key: string]: LayoutItem}>
export type Position = Readonly<{
    left: number
    top: number
    width: number
    height: number
}>
export type ReactDraggableCallbackData = {
    node: HTMLElement
    x: number
    y: number
    deltaX: number
    deltaY: number
    lastX: number
    lastY: number
}

export type PartialPosition = { left: number, top: number }
export type Size = { width: number, height: number }
export type GridDragEvent = {
    e: Event
    node: HTMLElement
    newPosition: PartialPosition
}

export type GridResizeEvent = { e: Event, node: HTMLElement, size: Size }

// All callbacks are of the signature (layout, oldItem, newItem, placeholder, e).
export type EventCallback = (
    layout: Layout,
    oldItem: LayoutItem | null,
    newItem: LayoutItem | null,
    placeholder: LayoutItem | null,
    event: Event,
    node: HTMLElement
) => void

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout: Layout): number{
    return Object.values(layout)
        .map(item => item.row + item.height)
        .reduce((max, bottomY) => bottomY > max ? bottomY : max, 0)
}

/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */
export function childrenEqual(a: Array<React.ReactElement>, b: Array<React.ReactElement>): boolean{
    return isEqual(
        React.Children.map(a, c => c.key),
        React.Children.map(b, c => c.key)
    )
}

/**
 * Given two layoutitems, check if they collide.
 */
export function collides(l1: LayoutItem, l2: LayoutItem): boolean{
    if (l1.id === l2.id) return false // same element

    if (l1.col + l1.width <= l2.col) return false // l1 is left of l2
    if (l1.col >= l2.col + l2.width) return false // l1 is right of l2

    if (l1.row + l1.height <= l2.row) return false // l1 is above l2
    if (l1.row >= l2.row + l2.height) return false // l1 is below l2

    return true // boxes overlap
}

export function compact(layout: Layout): Layout{
    let newLayout = {}
    const sortedItems = sortLayoutItems(layout)

    for(let item of sortedItems){
        while(true){
            const test = {...item, row: item.row - 1}
            if(test.row < 0 || !!getFirstCollision(Object.values(newLayout), test)){
                break
            }
            item = test
        }
        newLayout[item.id] = item
    }

    return newLayout
}

export function constrainCol(targetCol: number, width: number, columns: number){
    if(width > columns || targetCol < 0){
        return 0
    }
    if(targetCol + width > columns){
        return columns - width
    }
    return targetCol
}

/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */
export function correctBounds(layout: Layout, cols: number): Layout{
    return Object.values(layout)
        .map(item => {
            let width = item.width > cols ? cols : item.width
            let col = constrainCol(item.col, width, cols) // item.col + width > cols ? Math.max(cols - width, 0) : item.col
            return item.col !== col || item.width !== width
                ? {...item, width, col}
                : item
        })
        .reduce((l, item) => {
            l[item.id] = item
            return l
        }, {})
}

export function getFirstCollision(layoutItems: ReadonlyArray<LayoutItem>, target: LayoutItem){
    return layoutItems.find(item => collides(item, target))
}

export function getAllCollisions(layoutItems: ReadonlyArray<LayoutItem>, target: LayoutItem){
    return layoutItems.filter(item => collides(item, target)) as ReadonlyArray<LayoutItem>
}

export function moveItem(
    itemId: string,
    layout: Layout,
    col: number,
    row: number,
    cols: number
){
    if(!layout.hasOwnProperty(itemId)){
        throw new Error('slutt')
    }

    const source = layout[itemId]
    const correctedCol = constrainCol(col, source.width, cols)
    const target = {...source, col: correctedCol, row}

    let newLayout = {...layout, [source.id]: target}
    const collisions = getAllCollisions(Object.values(newLayout), target)

    if(!collisions){
        return newLayout
    }

    const movedItems = new Set<string>([target.id])
    for(const collision of collisions){
        const collissionMovedUp = {
            ...collision,
            row: Math.max(target.row - collision.height, 0)
        }

        // Can switch places (move collision above target)
        if(!getFirstCollision(Object.values(newLayout), collissionMovedUp)){
            movedItems.add(collision.id)
            newLayout = {...newLayout, [collision.id]: collissionMovedUp}
        }else{
            newLayout = moveCollidingItem(target, collision, newLayout, movedItems)
        }
    }
    return newLayout
}

function moveCollidingItem(
    source: LayoutItem,
    collidesWith: LayoutItem,
    layout: Layout,
    movedItems: Set<string>
){
    movedItems.add(collidesWith.id)

    // const collissionMovedUp = {
    // ...collidesWith,
    // row: Math.max(source.row - collidesWith.height, 0)
    // }

    // // Can switch places (move collision above source)
    // if(!getFirstCollision(Object.values(layout), collissionMovedUp)){
    // return {...layout, [collissionMovedUp.id]: collissionMovedUp}
    // }

    const collissionMovedDown = {
        ...collidesWith,
        row: source.row + source.height
    }

    let newLayout = {...layout, [collissionMovedDown.id]: collissionMovedDown}
    const collisions = Object.values(newLayout)
        .filter(item => !movedItems.has(item.id) && collides(item, collissionMovedDown))

    if(!collisions.length){
        return newLayout
    }

    for(const collision of collisions){
        newLayout = moveCollidingItem(collissionMovedDown, collision, newLayout, movedItems)
    }

    return newLayout
}

export function setTransform({ top, left, width, height }: Position): React.CSSProperties{
    // Replace unitless items with px
    const translate = `translate(${left}px,${top}px)`
    return {
        transform: translate,
        // WebkitTransform: translate,
        // MozTransform: translate,
        // msTransform: translate,
        // OTransform: translate,
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute'
    }
}

function uncollide(layout: Layout): Layout{
    let newLayout = layout
    const sortedItemIds = sortLayoutItems(layout)
        .map(item => item.id)
    const pickFromLayout = (id: string) => newLayout[id]
    for(let i = 0; i < sortedItemIds.length - 1; i++){ // length - 1 because the last item won't collide with jack shit
        while(true){
            const item = newLayout[sortedItemIds[i]]
            const rest = sortedItemIds.slice(i + 1).map(pickFromLayout)
            const collision = getFirstCollision(rest, item)
            if(!collision){
                break
            }
            newLayout = moveCollidingItem(item, collision, newLayout, new Set([item.id]))
        }
    }
    return newLayout
}

export function sortLayoutItems(layout: Layout, ascending: boolean = true): ReadonlyArray<LayoutItem>{
    return Object.values(layout).sort((a, b) => {
        if(a.row > b.row || (a.row === b.row && a.col > b.col)){
            return ascending ? 1 : -1
        }else if(a.row === b.row && a.col === b.col){
            // Without this, we can get different sort results in IE vs. Chrome/FF
            return 0
        }
        return ascending ? -1 : 1
    })
}

/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */
export function synchronizeLayoutWithChildren(
    initialLayout: Layout,
    children: Array<React.ReactElement>,
    cols: number
): Layout{
    // Generate one layout item per child.
    let layout = {}
    React.Children.forEach(children, (child: React.ReactElement<any>) => {
        const id = String(child.key)
        // Don't overwrite if it already exists.
        const exists = initialLayout[id]
        if(exists){
            layout[id] = {...exists}
        }else{
            // Nothing provided: ensure this is added to the bottom
            layout[id] = {
                width: 1,
                height: 1,
                col: 0,
                row: bottom(layout),
                id
            }
        }
    })

    // Correct the layout.
    layout = correctBounds(layout, cols)
    layout = uncollide(layout)
    layout = compact(layout)

    return layout
}

/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
export function validateLayout(
    layout: Layout,
    contextName: string = 'Layout'
): void {
    const subProps: Array<keyof LayoutItem> = ['col', 'row', 'width', 'height']
    for(const item of Object.values(layout)){
        for(let j = 0; j < subProps.length; j++){
            if(typeof item[subProps[j]] !== 'number'){
                throw new Error(
                    'GridLayout: ' +
                    contextName +
                    '[' +
                    item.id +
                    '].' +
                    subProps[j] +
                    ' must be a number!'
                )
            }
        }
        if(item.id && typeof item.id !== 'string'){
            throw new Error(
                'GridLayout: ' + contextName + ' item.id must be a string!'
            )
        }
    }
}

export function autoBindHandlers(el: Object, fns: Array<string>): void {
    fns.forEach(key => (el[key] = el[key].bind(el)))
}