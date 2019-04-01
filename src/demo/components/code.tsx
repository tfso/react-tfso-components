import React from 'react'
import Prism from 'prismjs'
import './prism.css'

export class JavaScriptCode extends React.PureComponent<{children: React.ReactNode}> {
    componentDidMount(){
        Prism.highlightAll()
    }

    render(){
        return (
            <pre>
                <code className='language-javascript'>
                    {this.props.children}
                </code>
            </pre>
        )
    }
}