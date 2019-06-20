import * as utils from './utils'

describe('utils', () => {
    describe('constrainCol', () => {
        it('corrects col when out of bounds', () => {
            expect(utils.constrainCol(-1, 0, 6)).toBe(0)
            expect(utils.constrainCol(7, 0, 6)).toBe(6)
        })
        it('returns 0 when width > columns', () => {
            expect(utils.constrainCol(0, 7, 6)).toBe(0)
        })
        it('returns columns - width when col + width > columns', () => {
            expect(utils.constrainCol(5, 2, 6)).toBe(4)
        })
        it('returns col when col + width is within bounds', () => {
            expect(utils.constrainCol(1, 3, 4)).toBe(1)
        })
    })

    describe('sortLayoutItems', () => {
        const layout: utils.Layout = {
            a: {
                id: 'a',
                col: 0,
                row: 0,
                width: 1,
                height: 1
            },
            c: {
                id: 'c',
                col: 0,
                row: 1,
                width: 1,
                height: 1
            },
            b: {
                id: 'b',
                col: 1,
                row: 0,
                width: 1,
                height: 1
            },
        }

        it('sorts items in ascending order', () => {
            expect(utils.sortLayoutItems(layout, true).map(i => i.id)).toEqual(['a', 'b', 'c'])
        })

        it('sorts items in descending order', () => {
            expect(utils.sortLayoutItems(layout, false).map(i => i.id)).toEqual(['c', 'b', 'a'])
        })
    })

    // describe('collides', () => {
    //     const layout: utils.Layout = {
    //         a: {
    //             id: 'a',
    //             col: 0,
    //             row: 0,
    //             width: 1,
    //             height: 1
    //         },
    //         c: {
    //             id: 'c',
    //             col: 0,
    //             row: 1,
    //             width: 1,
    //             height: 1
    //         },
    //         b: {
    //             id: 'b',
    //             col: 1,
    //             row: 0,
    //             width: 1,
    //             height: 2 // should collide with c
    //         },
    //     }
    //     it('detects collision when height overlaps', () => {})
    // })
})