
import React from 'react'
import PropTypes from 'prop-types'
import Dialog, {DialogProps} from '@material-ui/core/Dialog'
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

export type ClientSwitcherDialogProps = {
    open: boolean
    onCancel: () => void
    onSwitch: (value: string) => void
    children?: undefined
    options: Array<{ value: string, label: string }>
    cancelButtonText: string
    fullScreen?: DialogProps['fullScreen']
    selected?: string
}
type State = {
    filterValue: string,
    focusValue: string
}

const TransitionComponent = props => <Slide direction='down' {...props} />

export default class ClientSwitcherDialog extends React.PureComponent<ClientSwitcherDialogProps, State>{
    _inputRef = React.createRef()
    _listRef = React.createRef()
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
    onKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!(event && event.keyCode === 40)){
            return
        }
        this.refs.menulist.focus()
    }

    render(){
        return (
            <Dialog
                TransitionComponent={TransitionComponent}
                keepMounted={false}
                open={this.props.open}
                fullScreen={this.props.fullScreen}
                onClose={this.props.onCancel}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent>
                    <SearchField
                        inputRef={this._inputRef}
                        onChange={this.onFilter}
                        value={this.state.filterValue}
                        onKeyDown={this.onKeyDown}
                    />
                    <MenuList
                        component='nav'
                        ref='menulist'
                    >
                        { this.props.options
                            .filter(option => option.label.toLowerCase().indexOf(this.state.filterValue) > -1 || option.value.indexOf(this.state.filterValue) > -1)
                            .map((option, i) => (
                                <MenuItem
                                    disabled={option.value == this.props.selected}
                                    key={i}
                                    onClick={() => { this.props.onSwitch(option.value) }}
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
                                    <ListItemText>{option.label}</ListItemText>
                                </MenuItem>
                            ))
                        }
                    </MenuList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onCancel}>{this.props.cancelButtonText}</Button>
                </DialogActions>
            </Dialog>
        )
    }
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSwitch: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, label: PropTypes.string.isRequired})).isRequired,
        cancelButtonText: PropTypes.string.isRequired
    }
}