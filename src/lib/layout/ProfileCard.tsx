import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import styled from 'styled-components/macro'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PowerOffIcon from '@material-ui/icons/PowerSettingsNew'
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import ScreenSize from '../ScreenSize'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import Tooltip from '@material-ui/core/Tooltip'


export type ProfileCardProps = {
    open: boolean
    onClose: () => void
    children?: undefined
    identity: Array<{}>
    closeButtonText: string
    anchorEl?: null | HTMLElement
}

type State = {}

const CustomCard = styled(Card)`
  &&{
   box-shadow: none;
  } 
` as typeof Card

const CustomCardContent = styled(CardContent)`
  &&{
    padding: 0;
    box-shadow: none;
  }
` as typeof CardContent

const CustomDialogTitle = styled.div`
  display: flex;
  flex-flow: row-reverse;
  padding: 5px;
`

const ProfileCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  background-color: ${({theme, color}) => color || theme.tfso.palette.primaryLight};
   //theme.mui.palette.secondary.dark
` as typeof CardContent

const ProfileTypography = styled(Typography)`
  &&{
    color: ${({theme}) => theme.mui.palette.primary.contrastText}
  }
` as typeof Typography

const ProfileAvatar = styled(Avatar)`
    &&{
     margin: 10px;
     width: 60px;
     height: 60px;
     margin: ${({theme}) => theme.mui.spacing.unit}px;  
    }
` as typeof Avatar
const CustomCloseIconButton = styled(IconButton)`
  &&{
     position: absolute;
     right: 0;
     margin: 0 auto;
     color: ${({theme}) => theme.mui.palette.primary.contrastText};
  }
` as typeof IconButton

const RightPanel = styled.div`
  flex: 1;
  padding: ${({theme}) => theme.mui.spacing.unit}px;;
`

const Right = styled.div`
  text-align: right;
  flex: 1;
`

const TransitionComponent = props => <Slide direction='down' {...props} />

export default class ProfileCard extends React.PureComponent<ProfileCardProps, State>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        //identity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        closeButtonText: PropTypes.string.isRequired
    }

    onClose = () => {
        this.props.onClose()
    }

    render(){
        const renderContent = (
            <CustomCard>
                <ProfileCardContent>
                    <ProfileAvatar src={this.props.identity.profile.thumb.data} aria-label="{this.props.identity.profile.firstName}"/>
                    <RightPanel>
                        <ProfileTypography variant='h6'>{this.props.identity.profile.firstName + ' ' + this.props.identity.profile.lastName}</ProfileTypography>
                        <ProfileTypography variant='body2'>{this.props.identity.profile.identifier}</ProfileTypography>
                    </RightPanel>
                </ProfileCardContent>
                <Divider />
                <CustomCardContent>
                    <List>
                        <ListItem><ListItemText primary="Account"/></ListItem>
                        <ListItem><ListItemText primary="Requests"/></ListItem>
                        <Divider component='li' />
                        <ListItem>
                            <Tooltip title='Switch client'>
                                <IconButton>
                                    <SwapHorizIcon />
                                </IconButton>
                            </Tooltip>
                            <ListItemText primary={this.props.identity.client.name} secondary='Administration' />
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
        )

        const desktopDialog = (
            <Popover
                anchorEl={this.props.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={this.props.open}
                onClose={this.onClose}
            >
                {renderContent}
            </Popover>
        )

        const mobileDialog = (
            <Dialog
                TransitionComponent={TransitionComponent}
                keepMounted={false}
                fullScreen={true}
                open={this.props.open}
                onClose={this.onClose}
                fullWidth
                maxWidth='sm'
            >
                <CustomCloseIconButton onClick={this.props.onClose} aria-label="Close">
                    <CloseIcon />
                </CustomCloseIconButton>
                {renderContent}
            </Dialog>
        )

        return (
            <ScreenSize>
                {({mobile}) => mobile ? mobileDialog : desktopDialog}
            </ScreenSize>
        )
    }
}