export type ScreenType = 'mobile' | 'tablet' | 'desktop'

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
    desktop?: BoardItemLayout
    component: React.ElementType<{screenType: ScreenType}>
}>

export type BoardItems = Readonly<{
    [key: string]: BoardItem
}>

export type BoardDimensions = Readonly<{
    colWidth: number
    rowHeight: number
    spacing: number
}>

export type BoardItemDimensions = Readonly<{
    top: number
    left: number
    width: number
    height: number
}>