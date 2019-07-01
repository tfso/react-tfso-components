import React from 'react'

import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'
import Emoji from '../../lib/Emoji'

import Typography from '@material-ui/core/Typography'

type State = {
    // variant
}

export default class EmojiDemo extends React.PureComponent<{}, State>{
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='Emoji.tsx' demoPath='EmojiDemo.tsx'>Emoji</DemoTitle>
                <DemoHelp>A simple html Emoji component</DemoHelp>
                <DemoProps>
                    <DemoProp name='variant' type='string' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <Typography variant="h2">
                        <Emoji variant='heart' />
                        <Emoji variant='thumbsUp' />
                        <Emoji variant='fire' />
                    </Typography>
                </DemoContent>
            </Demo>
        )
    }
}