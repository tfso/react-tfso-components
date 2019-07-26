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
import {InjectedScreenSizeProps, withScreenSize} from './ScreenSize'
import LinearProgress from '@material-ui/core/LinearProgress'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Box from '@material-ui/core/Box'
import Delay from './Delay'

export type ListPickerProps = {
    open: boolean
    onCancel: () => void
    onSelect: (value: string) => void
    children?: undefined
    options: {value: string, label: string}[]
    cancelButtonText: string
    searchLabel?: string
    anchorEl?: null | HTMLElement
    disabled?: string
    selected?: string
    avatarColor?: string
    loading?: boolean
}

type State = {
    filterValue: string,
    focusValue: string

}

const AvatarColor = styled(Avatar)`&&{
    background-color: ${({theme, color}) => color || theme.tfso.colors.menu};
    color: ${({theme}) => theme.mui.palette.primary.contrastText};
}` as typeof Avatar

const CustomDialogTitle = styled.div`
  display: flex;
  flex-flow: row-reverse;
  padding: 5px;
`

const TransitionComponent = props => <Slide direction='down' {...props} />

// @ts-ignore
export default withScreenSize(class ListPicker extends React.PureComponent<ListPickerProps & InjectedScreenSizeProps, State>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, label: PropTypes.string.isRequired})).isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        searchLabel: PropTypes.string,
        disabled: PropTypes.string,
        selected: PropTypes.string,
        avatarColor: PropTypes.string,
        loading: PropTypes.bool
    }
    _inputRef: React.RefObject<HTMLLIElement> = React.createRef()
    _listRef: React.RefObject<HTMLInputElement> = React.createRef()
    state: State = {
        filterValue: '',
        focusValue: ''
    }

    componentDidUpdate(prevProps){
        if(!prevProps.open && this.props.open && !this.props.screenSize.mobile){
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

    onSelect = (value) => {
        this.props.onSelect(value)
    }

    onClose = () => {
        this.props.onCancel()
    }

    render(){
        const renderLoading = () => {
            const Spacer = <div style={{height: 4}} />
            return (
                this.props.loading ? (
                    <Delay delayMs={200} beforeShow={Spacer}>
                        <LinearProgress color='secondary' />
                    </Delay>
                ) : Spacer
            )
        }

        const renderItems = (
            <>

                <SearchField
                    placeholder={this.props.searchLabel}
                    inputRef={this._inputRef}
                    onChange={this.onFilter}
                    value={this.state.filterValue}
                    onKeyDown={this.onKeyDown}
                    fullWidth
                />
                {renderLoading()}
                <
                    // @ts-ignore
                    MenuList ref={this._listRef}>
                    {this.props.options
                        .filter(option => option.label.toLowerCase().indexOf(this.state.filterValue.toLocaleLowerCase()) > -1 || option.value.indexOf(this.state.filterValue.toLocaleLowerCase()) > -1)
                        .map((option, i) => (
                            <MenuItem
                                disabled={option.value === this.props.disabled}
                                selected={option.value === this.props.selected}
                                key={i}
                                onClick={() => { this.onSelect(option.value) }}
                            >
                                <ListItemAvatar>
                                    <AvatarColor color={this.props.avatarColor === 'default' ? '' : this.props.avatarColor}>
                                        <Typography variant='caption' color='inherit'>
                                            {option.label.split(' ')
                                                .slice(0, 3)
                                                .map((words) => (
                                                    words[0]
                                                ))
                                            }
                                        </Typography>
                                    </AvatarColor>
                                </ListItemAvatar>
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
                    <IconButton size="small" onClick={this.onClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </CustomDialogTitle>
                <Box p={1}>
                    {renderItems}
                </Box>
            </Dialog>
        )

        const {mobile} = this.props.screenSize
        return mobile ? mobileDialog : desktopDialog
    }
})