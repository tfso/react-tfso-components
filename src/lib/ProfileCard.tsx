import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import styled from 'styled-components/macro'

import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PowerOffIcon from '@material-ui/icons/PowerSettingsNew';

/*export type ProfileCardProps = {

}*/

const CustomCard = styled(Card)`
  &&{
   // box-shadow: none;
  }`

const CustomCardContent = styled(CardContent)`
  &&{
    padding: 0;
    box-shadow: none;
  }
`

const ProfileAvatar = styled(Avatar)`
  backgroundColor: red
`

const Right = styled.div`
  text-align: right;
  flex: 1;
`

export default class ProfileCard extends React.PureComponent<{}, State>{
    render() {
        const { open, onClose, anchorEl } = this.props;

        return (
            <>
            <Popover open={open}
                     onClose={onClose}
                     anchorEl={anchorEl}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'right',
                     }}
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'right',
                     }}>
                <CustomCard>
                    <CardHeader
                        avatar={
                            <ProfileAvatar aria-label="Your name">
                                JS
                            </ProfileAvatar>
                        }
                        title="Jeanette Stavsholt Gusjås"
                        subheader="jeanette.stavsholt@live.no"
                    />
                    <Divider />
                    <CustomCardContent>
                        <List>
                            <ListItem><ListItemText primary="Account"/></ListItem>
                            <ListItem><ListItemText primary="Requests"/></ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Stavsholt Web og Design" secondary="Administration" />
                            </ListItem>
                        </List>
                    </CustomCardContent>
                    <Divider />
                    <CardActions>
                        <Right>
                            <IconButton>
                                <PowerOffIcon />
                            </IconButton>
                        </Right>
                    </CardActions>
                </CustomCard>
            </Popover>
            </>
        );
    }
}

/*ProfileCard.propTypes = {

}*/