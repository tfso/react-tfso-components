import {boardInit, boardReducer, BoardActionType, BoardState} from './boardState'
import {BoardDimensions} from './types'

describe('boardState', () => {
    describe('boardInit', () => {
        it('sets drag-state to null', () => {
            expect(boardInit({foo: 'foo'} as any)).toEqual({
                items: {foo: 'foo'},
                activeDrag: null,
                oldDragItem: null,
                placeholder: null
            })
        })
    })
    describe('boardReducer', () => {
        const boardState: BoardState = {
            items: {
                a: {
                    key: 'a',
                    component: 'a' as any,
                    desktop: {
                        row: 0,
                        col: 0,
                        rowSpan: 1,
                        colSpan: 1
                    }
                }
            },
            placeholder: null,
            activeDrag: null,
            oldDragItem: null
        }
        const boardDimensions: BoardDimensions = {
            colWidth: 90,
            rowHeight: 90,
            spacing: 16,
            width: 1000
        }
        const screenType = 'desktop'

        describe('RESET_ITEMS', () => {
            it('sets items', () => {
                const state = {items: {foo: 'foo'}, otherProp: 'foo'}
                const nextState = boardReducer(state as any, {type: BoardActionType.RESET_ITEMS, items: {}})
                expect(nextState.items).toEqual({})
                expect(nextState.items).not.toBe(state.items)
                expect(state).not.toBe(nextState)
                expect(nextState['otherProp']).toBe('foo')
            })
            it('does not set items when items are the same', () => {
                const state = {items: {foo: 'foo'}, otherProp: 'foo'}
                const nextState = boardReducer(state as any, {type: BoardActionType.RESET_ITEMS, items: state.items as any})
                expect(nextState).toBe(state)
            })
        })
        describe('DRAG_START', () => {
            const type = BoardActionType.DRAG_START
            it('returns same state if the key does not exist in the items', () => {
                const state = {items: {}}
                const nextState = boardReducer(state as any, {type, key: 'a'} as any)
                expect(state).toBe(nextState)
            })
            it('sets oldDragItem and activeDrag', () => {
                const nextState = boardReducer(boardState, {type, key: 'a', screenType, boardDimensions})
                expect(nextState.oldDragItem).toBe(boardState.items['a'])
                expect(nextState.activeDrag).toEqual({
                    dragging: true,
                    height: 90,
                    key: 'a',
                    left: 0,
                    top: 0,
                    width: 90
                })
            })
            it('does not set items', () => {
                const nextState = boardReducer(boardState, {type, key: 'a', screenType, boardDimensions})
                expect(nextState.items).toBe(boardState.items)
            })
            it('does not mutate state', () => {
                boardReducer(boardState, {type, key: 'a', screenType, boardDimensions})
                expect(boardState).toEqual({
                    items: {
                        a: {
                            key: 'a',
                            component: 'a' as any,
                            desktop: {
                                row: 0,
                                col: 0,
                                rowSpan: 1,
                                colSpan: 1
                            }
                        }
                    },
                    placeholder: null,
                    activeDrag: null,
                    oldDragItem: null
                })
            })
        })
        describe('DRAGGING', () => {
            const type = BoardActionType.DRAGGING
            it('returns the same state if activeDrag is null', () => {
                const state = boardReducer(boardState, {type, deltaX: 1, deltaY: 2, boardDimensions, screenType})
                expect(state).toBe(boardState)
            })
            it('returns the same state if deltaX and deltaY is 0', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 0,
                        top: 0,
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, deltaX: 0, deltaY: 0, boardDimensions, screenType})
                expect(nextState).toBe(state)
            })
            it('constrains movement to within the boards bounds', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 0,
                        top: 0,
                        width: 90
                    }
                }
                const nextStateLessThan = boardReducer(state, {type, deltaX: -20, deltaY: -20, boardDimensions, screenType})
                const nextStateGreaterThan = boardReducer(state, {type, deltaX: 1020, deltaY: -20, boardDimensions, screenType})
                expect(nextStateLessThan.activeDrag).toEqual(state.activeDrag)
                expect(nextStateGreaterThan.activeDrag).toEqual({...state.activeDrag, left: 910})
            })
            it('compacts items', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 0,
                        top: 0,
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, deltaY: 300, deltaX: 0, boardDimensions, screenType})
                expect(nextState.placeholder!.top).toBe(0)
                expect(nextState.activeDrag!.top).toBe(300)
            })
            it('does not mutate state', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 0,
                        top: 0,
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, deltaX: 1, deltaY: 2, boardDimensions, screenType})
                expect(state).toEqual({
                    items: {
                        a: {
                            key: 'a',
                            component: 'a' as any,
                            desktop: {
                                row: 0,
                                col: 0,
                                rowSpan: 1,
                                colSpan: 1
                            }
                        }
                    },
                    placeholder: null,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 0,
                        top: 0,
                        width: 90
                    },
                    oldDragItem: null
                })
                expect(nextState).not.toBe(state)
            })
        })
        describe('DRAG_STOP', () => {
            const type = BoardActionType.DRAG_STOP
            it('returns the same state if activeDrag is null', () => {
                const state = boardReducer(boardState, {type, boardDimensions, screenType})
                expect(state).toBe(boardState)
            })
            it('returns the same items if the oldDragItem is equal to item that was dragged', () => {
                const state = {
                    ...boardState,
                    oldDragItem: {...boardState.items['a']}, // copy to make sure that isEqual is used and not ===
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 30, // snaps back where it was
                        top: 500, // should be compacted down
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, boardDimensions, screenType})
                expect(nextState).toEqual(boardState)
                expect(nextState.items).toBe(boardState.items)
            })
            it('returns new items if item was moved', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 70, // snaps 1 col to the right
                        top: 0, // should be compacted down
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, boardDimensions, screenType})
                expect(nextState.items['a'].desktop.col).toBe(1)
                expect(nextState.items).not.toBe(boardState.items)
            })
            it('compacts items', () => {
                // dragStop must also compact since it's creating a new layout based on the activeDrag, which may be held with a lot of free space above.
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 70, // is moved 1 col to the right
                        top: 500, // this movement is compacted away, but the item was nonetheless moved
                        width: 90
                    }
                }
                const nextState = boardReducer(state, {type, boardDimensions, screenType})
                expect(nextState.items['a'].desktop).toEqual({
                    col: 1,
                    row: 0,
                    colSpan: 1,
                    rowSpan: 1
                })
            })
            it('does not mutate state', () => {
                const state = {
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 70,
                        top: 0,
                        width: 90
                    }
                }
                boardReducer(state, {type, boardDimensions, screenType})
                expect(state).toEqual({
                    ...boardState,
                    activeDrag: {
                        dragging: true,
                        height: 90,
                        key: 'a',
                        left: 70,
                        top: 0,
                        width: 90
                    }
                })
            })
        })
    })
})