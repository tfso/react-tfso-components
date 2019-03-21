import React from 'react'
import TextField, {TextFieldProps} from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

export type SearchFieldProps = TextFieldProps

type State = {
    editing: boolean
}

export default class SearchField extends React.PureComponent<SearchFieldProps, State>{
    static defaultProps = {
        placeholder: 'Search',
        margin: 'dense',
        InputProps: {
            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>
        }
    }

    state: State = {
        editing: false
    }

    onBlur = (e: React.EventHandler<any>) => {
        this.setState({editing: false})
        const { onBlur } = this.props
        onBlur && onBlur(e)
    }

    onFocus = (e: React.EventHandler<any>) => {
        this.setState({editing: true})
        const { onFocus } = this.props
        onFocus && onFocus(e)
    }

    render(){
        return (
            <TextField
                fullWidth={this.state.editing}
                {...this.props}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
            />
        )
    }
}