import React from 'react'
import PropTypes from 'prop-types'
import TextField, {TextFieldProps} from '@material-ui/core/TextField'

type Props = {
    value: string
    onChange: (value: string) => void
    dirty?: boolean
    enableDirtyCheck?: boolean
}

type State = {
    editing: boolean
    value: string
    prevProps: Props
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

function handleEvent(event: React.KeyboardEvent<HTMLDivElement>){
    event.preventDefault()
    event.stopPropagation()
    // the above only prevents other synthetic events, if we want to prevent global listeners too, we need to stop the propagation on the native event as well
    event.nativeEvent.stopImmediatePropagation()
}

export type TextFieldEditorProps = Props & Partial<Omit<TextFieldProps, 'value' | 'onChange'>>

export default class TextFieldEditor extends React.PureComponent<TextFieldEditorProps, State>{
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        dirty: PropTypes.bool
    }

    _inputRef: React.RefObject<HTMLInputElement> = React.createRef()

    state: State = {
        editing: false,
        value: this.props.value,
        prevProps: this.props
    }

    static getDerivedStateFromProps(props: Readonly<TextFieldEditorProps>, state: Readonly<State>){
        const prevProps = state.prevProps

        if(prevProps.value !== props.value){ return {value: props.value, prevProps: props} }

        return {prevProps: props}
    }

    blur = () => { this._inputRef.current && this._inputRef.current.blur() }

    onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        this.props.onKeyDown && this.props.onKeyDown(event)
        if(event.defaultPrevented){ return }

        if(event.ctrlKey){
            switch(event.key){
            case 's':
            // this event should not be 'handled' here (eg. invoke handleEvent(event)), control may want to perform other actions on ctrl+s
            // It should behave as a save changes in the control as well however
                this.blur()
                break
            case 'z':
                handleEvent(event)
                this.setState({editing: false, value: this.props.value}, this.blur)
                break
            default: break
            }
        }else{
            switch(event.key){
            case 'Enter':
                if(this.props.multiline){ break }
                handleEvent(event)
                this.blur()
                break
            case 'Escape':
                handleEvent(event)
                this.setState({editing: false, value: this.props.value}, this.blur)
                break
            default: break
            }
        }
    }

    onFocus = (e: React.EventHandler<any>) => {
        this.setState({editing: true})
        this.props.onFocus && this.props.onFocus(e)
    }

    onBlur = (e: React.EventHandler<any>) => {
        if(!this.state.editing){ return } // The method should be safe to call multiple times, but we don't want to raise the event multiple times if we dont need to

        this.props.onChange(this.state.value)
        this.setState({editing: false})
        this.props.onBlur && this.props.onBlur(e)
    }

    onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const value = event.target.value
        this.setState({value, editing: true})
    }

    render(){
        const {dirty: dirtyProp, onChange: onChangeProp, value: valueProp, enableDirtyCheck, ...otherProps} = this.props
        const {value} = this.state

        const isDirty = enableDirtyCheck ? this.props.value !== value || !!dirtyProp : !!dirtyProp

        return (
            <TextField
                {...otherProps as any}
                inputRef={this._inputRef}
                value={value}
                onFocus={this.onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                InputProps={{style: {fontStyle: isDirty ? 'italic' : 'normal'}}}
            />
        )
    }
}