import React from 'react'
import ReactDOM from 'react-dom'

export const useWidth = <T extends React.ReactInstance>(node: T | undefined | null, initialWidth: number = 1280) => {
    const [width, setWidth] = React.useState(initialWidth)
    const handleResize = React.useCallback(() => {
        const domNode = ReactDOM.findDOMNode(node)
        if(domNode instanceof HTMLElement){
            setWidth(domNode.offsetWidth)
        }
    }, [node, setWidth])
    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize() // invoking once to get the correct initial size
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])
    return width
}