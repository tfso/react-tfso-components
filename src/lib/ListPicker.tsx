import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import SearchField from './SearchField'
import Popover from '@material-ui/core/Popover'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ScreenSize from './ScreenSize'

export type ClientSwitcherDialogProps = {
    open: boolean
    onCancel: () => void
    onSwitch: (value: string) => void
    children?: undefined
    options: Array<{ value: string, label: string }>
    cancelButtonText: string
    searchLabel?: string
    anchorEl?: null | HTMLElement
    disabled?: string
    selected?: string
    avatarColor?: string
}

type State = {
    filterValue: string,
    focusValue: string
}

const AvatarColor = styled(Avatar)`
  &&{
    background-color: ${({theme, color}) => color || theme.mui.palette.primary.dark}
    color: ${({theme}) => theme.mui.palette.primary.contrastText}
  }
` as typeof Avatar

const CustomDialogTitle = styled.div`
  display: flex;
  flex-flow: row-reverse;
  padding: 5px;
`

const TransitionComponent = props => <Slide direction='down' {...props} />

export default class ListPicker extends React.PureComponent<ClientSwitcherDialogProps, State>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSwitch: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, label: PropTypes.string.isRequired})).isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        searchLabel: PropTypes.string,
        disabled: PropTypes.string,
        selected: PropTypes.string,
        avatarColor: PropTypes.string
    }
    _inputRef: React.RefObject<HTMLLIElement> = React.createRef()
    _listRef: React.RefObject<HTMLInputElement> = React.createRef()
    state: State = {
        filterValue: '',
        focusValue: ''
    }

    componentDidUpdate(prevProps){
        if(!prevProps.open && this.props.open){
            setTimeout(() => {
                this._inputRef.current && this._inputRef.current.focus()
            }, 1)
        }
    }

    onFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({filterValue: event.target.value})
    }
    onKeyDown = (event: React.KeyboardEvent) => {
        if(!(event && event.keyCode === 40)){
            return
        }
        this._listRef.current && this._listRef.current.focus()
    }

    onSwitch = (value) => {
        this.props.onSwitch(value)
    }

    onClose = () => {
        this.props.onCancel()
    }

    render(){
        const renderItems = (
            <>
                <SearchField
                    placeholder={this.props.searchLabel}
                    inputRef={this._inputRef}
                    onChange={this.onFilter}
                    value={this.state.filterValue}
                    onKeyDown={this.onKeyDown}
                />
                <MenuList>
                    { this.props.options
                        .filter(option => option.label.toLowerCase().indexOf(this.state.filterValue) > -1 || option.value.indexOf(this.state.filterValue) > -1)
                        .map((option, i) => (
                            <MenuItem
                                disabled={option.value == this.props.disabled}
                                selected={option.value == this.props.selected}
                                key={i}
                                onClick={() => { this.onSwitch(option.value) }}
                            >
                                <AvatarColor color={this.props.avatarColor}>
                                    <Typography variant='caption' color='inherit'>
                                        {option.label.split(' ')
                                            .slice(0, 3)
                                            .map((words) => (
                                                words[0]
                                            ))
                                        }
                                    </Typography>
                                </AvatarColor>
                                <ListItemText primary={option.label} />
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </>
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
                <DialogContent>
                    {renderItems}
                </DialogContent>
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
                <CustomDialogTitle>
                    <IconButton onClick={this.props.onCancel} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </CustomDialogTitle>
                <DialogContent>
                    {renderItems}
                </DialogContent>
            </Dialog>
        )

        return (
            <ScreenSize>
                {({mobile}) => mobile ? mobileDialog : desktopDialog}
            </ScreenSize>
        )
    }
}