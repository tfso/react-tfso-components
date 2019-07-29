import React from 'react'
import {Demo, DemoContent, DemoHelp, DemoTitle} from '../components/demo'
import {ScreenSize} from '../../lib'

export default class ScreenSizeDemo extends React.PureComponent{
    render(){
        return (
            <Demo>
                <DemoTitle demoPath='ScreenSize.tsx' srcPath='ScreenSize.tsx'>ScreenSize</DemoTitle>
                <DemoHelp>Gives you current screen size (mobile, tablet, desktop). Comes in hoc, render prop, and hook variants</DemoHelp>
                <DemoContent>
                    Drag screen to different sizes to test. Note that there is some overlap.
                    <ScreenSize>
                        {(screenSize) => {
                            return (
                                <>
                                <div>Mobile: {screenSize.mobile.toString()}</div>
                                <div>Tablet: {screenSize.tablet.toString()}</div>
                                <div>Desktop: {screenSize.desktop.toString()}</div>
                                </>
                            )
                        }}
                    </ScreenSize>
                </DemoContent>
            </Demo>
        )
    }
}