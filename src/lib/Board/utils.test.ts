import {BreakpointValues} from '@material-ui/core/styles/createBreakpoints'
import {
    calculateBoardHeight,
    calculateBoardRows,
    calculateItemDimensions,
    calculateItemLayout,
    getBreakpointFromWidth,
    compact,
    moveItem,
    addBoardItem,
    // removeBoardItem,
    // showBoardItem,
    // hideBoardItem,
} from './utils'
import {BoardItems, BoardItemLayout} from '.'
import {BoardItemDimensions} from './types'

// TODO: Write more tests.. (this mantra could be the meaning of life, who knows, it's always that voice in your head whispering 'write.more.testsssss' when you're about to fall asleep or when you're on the toilet a misty early morning, squeesing a chunky snickers, suddenly filling you with anxiety that your code may blow up any second now.)

describe('utils', () => {
    describe('calculateBoardHeight', () => {
        it('calculates height correctly when board has spacing', () => {
            const res = calculateBoardHeight(10, 16, 90)
            expect(res).toBe(10 * 90 + 9 * 16)
        })
        it('calculates height correctly when board has 0 spacing', () => {
            const res = calculateBoardHeight(10, 0, 90)
            expect(res).toBe(10 * 90)
        })
        it('calculates height correctly when there are no rows and has spacing', () => {
            const res = calculateBoardHeight(0, 16, 90)
            expect(res).toBe(0)
        })
        it('calculates height correctly when there are no rows and no spacing', () => {
            expect(calculateBoardHeight(0, 0, 90)).toBe(0)
        })
    })
    describe('calculateBoardRows', () => {
        const component = null as any
        const items: BoardItems = {
            a: {
                key: 'a',
                component,
                desktop: {
                    row: 0,
                    col: 0,
                    colSpan: 1,
                    rowSpan: 2
                },
                mobile: {
                    row: 0,
                    col: 0,
                    colSpan: 1,
                    rowSpan: 1
                }
            },
            b: {
                key: 'b',
                component,
                desktop: {
                    row: 2,
                    col: 0,
                    colSpan: 1,
                    rowSpan: 1
                }
            }
        }

        it('returns 0 when there are no items on the tablet board', () => {
            const res = calculateBoardRows(items, 'tablet')
            expect(res).toBe(0)
        })
        it('returns 1 when board only has 1 item with height of 1 visible for mobile', () => {
            const res = calculateBoardRows(items, 'mobile')
            expect(res).toBe(1)
        })
        it('returns 3 when board has 2 items totaling 3 rowSpan for desktop', () => {
            const res = calculateBoardRows(items, 'desktop')
            expect(res).toBe(3)
        })
    })
    describe('calculateItemDimensions', () => {
        const item: BoardItemLayout = {
            row: 1,
            col: 4,
            colSpan: 3,
            rowSpan: 2
        }
        it('calculates correctly', () => {
            const res = calculateItemDimensions(item, {colWidth: 90, rowHeight: 90, spacing: 16} as any) // not providing width on purpose
            expect(res).toEqual({
                top: 106,
                left: 106 * 4,
                height: 196,
                width: 302
            } as BoardItemDimensions)
        })
    })
    describe('calculateItemLayout', () => {
        const item = {
            row: 1,
            col: 4,
            colSpan: 3,
            rowSpan: 2
        }
        it('calculates correctly', () => {
            const res = calculateItemLayout(
                item,
                {top: 106 + 2, left: 106 * 4 - 3}, // adds a little noise
                {colWidth: 90, rowHeight: 90, spacing: 16} as any
            )
            expect(res).not.toBe(item)
            expect(res).toEqual(item)
        })
    })
    describe('getBreakpointFromWidth', () => {
        const breakpoints: BreakpointValues = {
            xs: 2,
            sm: 4,
            md: 6,
            lg: 8,
            xl: 10
        }
        it('returns correct breakpoint', () => {
            const res = getBreakpointFromWidth(breakpoints, 6) // wider than both xs and sm, but sm is expected. not wider than md, but equal.
            expect(res).toBe('sm')
            expect(getBreakpointFromWidth(breakpoints, 12)).toBe('xl')
        })
    })
    describe('addBoardItem', () => {
        it('adds item to items', () => {
            const items = {}
            const newItems = addBoardItem(items, {
                key: 'foo',
                component: () => 'div' as any,
                desktop: {
                    row: 0,
                    col: 0,
                    rowSpan: 1,
                    colSpan: 1
                }
            })
            expect(newItems['foo']).toBeTruthy()
        })
        it('is pure', () => {
            const items = {}
            const item = {
                key: 'foo',
                component: () => 'div' as any,
                desktop: {
                    row: -1, // faulty values should be corrected in output
                    col: -1,
                    rowSpan: 1,
                    colSpan: 1
                }
            }
            const newItems = addBoardItem(items, item)
            expect(items).toEqual({})
            expect(items).not.toBe(newItems)
            expect(item).toBe(item)
            expect(item.desktop.col).toBe(-1)
        })
        it('throws when item is missing layout', () => {
            expect(() => addBoardItem({}, {key: 'foo'} as any))
                .toThrowError('no layout defined')
        })
        it('throws when item with same key already exists', () => {
            expect(() => addBoardItem({foo: 'foo'} as any, {key: 'foo'} as any))
                .toThrowError('duplicate key \'foo\'')
        })
        it('corrects faulty bounds of items layout', () => {
            const foo = {
                key: 'foo',
                component: () => 'div' as any,
                desktop: {
                    row: -1, // faulty values should be corrected in output
                    col: -1,
                    rowSpan: 20,
                    colSpan: 15
                }
            }
            const bar = {
                key: 'bar',
                component: () => 'div' as any,
                tablet: {
                    row: 1, // faulty values should be corrected in output
                    col: 13,
                    rowSpan: 0,
                    colSpan: 0
                }
            }

            let items = addBoardItem({}, foo)
            items = addBoardItem(items, bar as any)

            expect(items['foo'].desktop).toEqual({
                row: 0,
                col: 0,
                rowSpan: 20,
                colSpan: 12,
            })
            expect(items['bar'].tablet).toEqual({
                row: 0,
                col: 10,
                rowSpan: 1,
                colSpan: 1
            })
        })
        it('moves other items out of the way of the newly added item', () => {
            const items = addBoardItem({
                a: {
                    key: 'a',
                    component: 'div' as any,
                    desktop: {
                        col: 0,
                        row: 0,
                        rowSpan: 2,
                        colSpan: 2
                    }
                }
            }, {
                key: 'b',
                component: 'div' as any,
                desktop: {
                    col: 1,
                    row: 1,
                    rowSpan: 1,
                    colSpan: 1
                }
            })

            // This behaviour may seem kinda strange, hence the drawing:
            //   _______  <- top
            //  |a      |
            //  |    ___|
            //  |   |b  |
            //  |___|___|
            //
            // expected:
            //       ___  <- top
            //      |b  |
            //   ___|___|
            //  |a      |
            //  |       |
            //  |       |
            //  |_______|
            // TODO: Maybe the addBoarItem logic should evalute the newly placed item in relation to the first colliding item to decide wether or not to place it above or below.
            expect(items).toEqual({
                a: {
                    key: 'a',
                    component: 'div' as any,
                    desktop: {
                        col: 0,
                        row: 1,
                        rowSpan: 2,
                        colSpan: 2
                    }
                },
                b: {
                    key: 'b',
                    component: 'div' as any,
                    desktop: {
                        col: 1,
                        row: 0,
                        rowSpan: 1,
                        colSpan: 1
                    }
                }
            })
        })
        it('compacts added item with free space above', () => {
            const items = addBoardItem({}, {
                key: 'a',
                component: 'a' as any,
                desktop: {
                    row: 1,
                    col: 0,
                    rowSpan: 1,
                    colSpan: 1
                }
            })
            expect(items['a'].desktop.row).toBe(0)
        })
    })
    describe('removeBoardItem', () => {

    })
    describe('showBoardItem', () => {

    })
    describe('hideBoardItem', () => {

    })
    describe('compact', () => {
        it('compacts moves an item that fits above other items up', () => {
            const component = null as any
            const items: BoardItems = {
                a: {
                    key: 'a',
                    component,
                    desktop: {
                        row: 0,
                        col: 2,
                        rowSpan: 1,
                        colSpan: 2
                    }
                },
                b: {
                    key: 'b',
                    component,
                    desktop: {
                        row: 1,
                        col: 0,
                        rowSpan: 2,
                        colSpan: 12,
                    }
                },
                c: {
                    key: 'c',
                    component,
                    desktop: { // should fit to the left of a
                        row: 5,
                        col: 0,
                        rowSpan: 1,
                        colSpan: 2
                    }
                }
            }
            const newItems = compact(items, 'desktop')
            expect(newItems['c'].desktop.row).toBe(0)
        })
    })
    describe('moveItem', () => {
        it('moves vertically stacked items down that both collides with a taller item moved horizontally', () => {
            // a is moved 2 cols to the right, colliding with b and c
            //     _____ _ _____<- top
            //    |a    |b¦     |
            // -->|     |_¦_____|
            //    |     |c¦     |
            //    |_____|_¦_____|
            //
            // expected:
            //     _______<- top
            //    |a      |
            //    |       |
            //    |       |
            //    |_______|
            //           _______
            //          |b      |
            //          |_______|
            //          |c      |
            //          |_______|

            const items: BoardItems = {
                a: {
                    key: 'a',
                    component: 'a' as any,
                    desktop: {
                        col: 0,
                        row: 0,
                        colSpan: 4,
                        rowSpan: 4
                    }
                },
                b: {
                    key: 'b',
                    component: 'b' as any,
                    desktop: {
                        col: 4,
                        row: 0,
                        colSpan: 4,
                        rowSpan: 2
                    }
                },
                c: {
                    key: 'c',
                    component: 'c' as any,
                    desktop: {
                        col: 4,
                        row: 2,
                        colSpan: 4,
                        rowSpan: 2
                    }
                }
            }

            const afterMove = moveItem('a', items, 2, 0, 'desktop')

            expect(afterMove).toEqual({
                a: {
                    key: 'a',
                    component: 'a' as any,
                    desktop: {
                        col: 2,
                        row: 0,
                        colSpan: 4,
                        rowSpan: 4
                    }
                },
                b: {
                    key: 'b',
                    component: 'b' as any,
                    desktop: {
                        col: 4,
                        row: 4,
                        colSpan: 4,
                        rowSpan: 2
                    }
                },
                c: {
                    key: 'c',
                    component: 'c' as any,
                    desktop: {
                        col: 4,
                        row: 6,
                        colSpan: 4,
                        rowSpan: 2
                    }
                }
            })
        })
    })
})