import React from 'react'

import {Demo, DemoTitle, DemoHelp, DemoContent, DemoProp, DemoProps} from '../components/demo'
import ProfileCard from '../../lib/ProfileCard'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

type State = {
    // variant
}

export default class ProfileCardDemo extends React.PureComponent<{}, State>{
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render(){

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Demo>
                <DemoTitle srcPath='ProfileCard.tsx' demoPath='ProfileCardDemo.tsx'>Profile Card</DemoTitle>
                <DemoHelp>Testing</DemoHelp>
                <DemoProps>
                    <DemoProp name='' type='string' default='' description=''/>
                </DemoProps>
                <DemoContent>
                    <Button
                        aria-owns={open ? 'simple-popper' : undefined}
                        aria-haspopup="true"
                        variant="contained"
                        onClick={this.handleClick}
                    >
                        Open Popover
                    </Button>
                    <ProfileCard open={open} onClose={this.handleClose} anchorEl={anchorEl}/>
                </DemoContent>
            </Demo>
        )
    }
}