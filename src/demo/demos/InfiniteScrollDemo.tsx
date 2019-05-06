import React from 'react'

import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'
import InfiniteScroll from '../../lib/InfiniteScroll'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

type State = {
    items: JSX.Element[]
}

const makeItems = (startIndex = 0, count = 200) => {
    const items: JSX.Element[] = []
    for(let i = startIndex; i < startIndex + count; i++){
        items.push(<ListItem key={i} divider>{i}</ListItem>)
    }
    return items
}

export default class InfiniteScrollDemo extends React.PureComponent<{}, State>{
    state: State = {
        items: makeItems()
    }

    onReachThreshold = async () => {
        this.setState(state => ({items: [...state.items, ...makeItems(state.items.length)]}))
    }

    render(){
        return (
            <Demo>
                <DemoTitle>InfiniteScroll</DemoTitle>
                <DemoHelp>A wrapper component that invokes callbacks when scrolling to a threshold</DemoHelp>
                <DemoProps>
                    <DemoProp name='threshold' type='1 > number >= 0' default='0.1' description='Defines in percentage (factor) of the viewable containers height the distance from the bottom where the threshold is'></DemoProp>
                    <DemoProp name='height' type='string | number' default='calc(100%)' description='The height of the scroll container'></DemoProp>
                    <DemoProp name='onReachThreshold' type='() => void' description='Callback invoked when scroll has reached the threshold'></DemoProp>
                    <DemoProp name='onReachEnd' type='() => void' description='Callback invoked when the scroll has reached the end'></DemoProp>
                    <DemoProp required name='children' type='React.ReactNode'></DemoProp>
                </DemoProps>
                <DemoContent>
                    <InfiniteScroll
                        height={300}
                        threshold={0.5}
                        onReachThreshold={this.onReachThreshold}
                    >
                        <List>
                            {this.state.items}
                        </List>
                    </InfiniteScroll>
                </DemoContent>
            </Demo>
        )
    }
}