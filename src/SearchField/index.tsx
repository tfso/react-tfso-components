import React from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { TextFieldProps} from '@material-ui/core/TextField'

export type SearchFieldProps = TextFieldProps

export default class SearchField extends React.PureComponent<SearchFieldProps> {
    static propTypes = TextField.propTypes
    static defaultProps = {
        placeholder: 'Search',
        margin: 'dense',
        InputProps: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>}
    }

    state = {
        editing: false
    }

    onBlur = (e) => {
        const { onBlur } = this.props
        this.setState({editing: false})
        onBlur && onBlur(e)
    }

    onFocus = (e) => {
        const { onFocus } = this.props
        this.setState({editing: true})
        onFocus && onFocus(e)
    }

    render(){
        return( 
            <TextField 
                // placeholder="Search"
                // margin="dense"
                fullWidth={this.state.editing}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                }}
                {...this.props}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
            /> 
        )
    }
}