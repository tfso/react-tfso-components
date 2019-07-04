import Board from './Board'

export {addBoardItem, removeBoardItem, hideBoardItem, showBoardItem} from './utils'

export default Board

export type ScreenType = 'mobile' | 'tablet' | 'desktop'

export type BoardProps = {
    locked?: boolean
    items: BoardItems
    spacing?: number
    rowHeight: number
    onChange?: (items: BoardItems) => void
    children?: undefined
}

export type BoardItemLayout = Readonly<{
    col: number
    row: number
    colSpan: number
    rowSpan: number
}>

export type BoardItemComponent = React.ElementType<{
    screenType: ScreenType
}>

export type BoardItem = Readonly<{
    key: React.Key
    mobile?: BoardItemLayout
    tablet?: BoardItemLayout
    desktop: BoardItemLayout
    component: BoardItemComponent
}>

export type BoardItems = Readonly<{
    [key: string]: BoardItem
}>