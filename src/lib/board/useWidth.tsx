import React from 'react'
import ReactDOM from 'react-dom'

export const useWidth = <T extends React.ReactInstance>(
    ref: React.RefObject<T | null>,
    onWidthChange: (width: number) => void
) => {
    const handleResize = React.useCallback(() => {
        const domNode = ReactDOM.findDOMNode(ref.current)
        if(domNode instanceof HTMLElement){
            onWidthChange(domNode.offsetWidth)
        }
    }, [ref, onWidthChange])

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize() // invoking once to get the correct initial size
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])
}