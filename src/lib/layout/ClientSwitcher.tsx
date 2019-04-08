
import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import SearchField from '../SearchField'
import withWidth, {WithWidth} from '@material-ui/core/withWidth'
import Popover from '@material-ui/core/Popover'

export type ClientSwitcherDialogProps = {
    open: boolean
    onCancel: () => void
    onSwitch: (value: string) => void
    children?: undefined
    options: Array<{ value: string, label: string }>
    cancelButtonText: string
    anchorEl?: null | HTMLElement
    disabled?: string
    selected?: string
}

type State = {
    filterValue: string,
    focusValue: string
}

const TransitionComponent = props => <Slide direction='down' {...props} />

const IsMobile = withWidth()((props: WithWidth & {children: (isMobile: boolean) => JSX.Element}) => {
    const isMobile = ['xs', 'sm'].includes(props.width)
    return props.children(isMobile)
})

export default class ClientSwitcher extends React.PureComponent<ClientSwitcherDialogProps, State>{
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSwitch: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, label: PropTypes.string.isRequired})).isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        disabled: PropTypes.string,
        selected: PropTypes.string
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
                    inputRef={this._inputRef}
                    onChange={this.onFilter}
                    value={this.state.filterValue}
                    onKeyDown={this.onKeyDown}
                />
                <MenuList
                    ref={this._listRef}
                >
                    { this.props.options
                        .filter(option => option.label.toLowerCase().indexOf(this.state.filterValue) > -1 || option.value.indexOf(this.state.filterValue) > -1)
                        .map((option, i) => (
                            <MenuItem
                                disabled={option.value == this.props.disabled}
                                selected={option.value == this.props.selected}
                                key={i}
                                onClick={() => { this.onSwitch(option.value) }}
                            >
                                <Avatar>
                                    <Typography variant='caption'>
                                        {option.label.split(' ')
                                            .slice(0, 3)
                                            .map((words) => (
                                                words[0]
                                            ))
                                        }
                                    </Typography>
                                </Avatar>
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
                <DialogContent>
                    {renderItems}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onCancel}>{this.props.cancelButtonText}</Button>
                </DialogActions>
            </Dialog>
        )

        return (

            <IsMobile >
                {(isMobile) => {
                    return isMobile
                        ? mobileDialog
                        : desktopDialog
                }}
            </IsMobile>
        )
    }
}