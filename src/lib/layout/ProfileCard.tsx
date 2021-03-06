import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import ScreenSize from '../ScreenSize'
import {Tooltip} from '@material-ui/core'

export type ProfileCardProps = {
    open: boolean
    onClose: () => void
    onSignOut: () => void
    children?: React.ReactNode
    identity: any
    translate: (key: string) => string
    anchorEl?: null | HTMLElement
}

type State = {}

const CustomCard = styled(Card)`
  &&{
    box-shadow: none;
    min-width: 200px;
  } 
` as typeof Card

const CustomCardContent = styled(CardContent)`
  &&{
    padding: 0;
    box-shadow: none;
  }
` as typeof CardContent

const ProfileCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  background-color: ${({theme, color}) => color || theme.tfso.colors.menu};
` as typeof CardContent

const ProfileTypography = styled(Typography)`
  &&{
    color: ${({theme}) => theme.mui.palette.primary.contrastText}
  }
` as typeof Typography

const ProfileAvatar = styled(Avatar)`
    &&{
     width: 60px;
     height: 60px;
     margin: ${({theme}) => theme.mui.spacing()}px;  
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
  flex: 1 0 auto;
  padding: ${({theme}) => theme.mui.spacing()}px;;
`

const Right = styled.div`
  text-align: right;
  flex: 1 0 auto;
`

const TransitionComponent = props => <Slide direction='down' {...props} />

export default class ProfileCard extends React.PureComponent<ProfileCardProps, State>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired
    }

    onClose = () => {
        this.props.onClose()
    }

    onSignOut = () => {
        this.props.onSignOut()
    }

    renderContent = () => (
        <CustomCard>
            <ProfileCardContent>
                <ProfileAvatar src={this.props.identity.profile.thumb.data} aria-label={this.props.identity.profile.firstName} />
                <RightPanel>
                    <ProfileTypography variant='h6'>{this.props.identity.profile.firstName + ' ' + this.props.identity.profile.lastName}</ProfileTypography>
                    <ProfileTypography variant='body2'>{this.props.identity.profile.identifier}</ProfileTypography>
                </RightPanel>
            </ProfileCardContent>
            <Divider />
            <CustomCardContent>
                {this.props.children}
            </CustomCardContent>
            <CardActions>
                <Right>
                    <Tooltip title={this.props.translate('Sign out')}>
                        <Button variant="outlined" size="small" color="secondary" onClick={this.onSignOut}>
                            {this.props.translate('Sign out')}
                        </Button>
                    </Tooltip>
                </Right>
            </CardActions>
        </CustomCard>
    )

    render(){
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
                {this.renderContent()}
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
                {this.renderContent()}
            </Dialog>
        )

        return (
            <ScreenSize>
                {({mobile}) => mobile ? mobileDialog : desktopDialog}
            </ScreenSize>
        )
    }
}