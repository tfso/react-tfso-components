import React from 'react'
import Prism from 'prismjs'

// Load languages
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// Load style
import 'prismjs/themes/prism.css'

type CodeProps = {
    language: 'js' | 'ts' | 'tsx' | 'jsx'
    children: React.ReactNode
}

export class Code extends React.PureComponent<CodeProps> {
    _ref: React.RefObject<HTMLPreElement> = React.createRef()

    componentDidMount(){
        this.highlight()
    }

    componentDidUpdate(){
        this.highlight()
    }

    highlight = () => {
        if(!this._ref.current)
            return
        Prism.highlightElement(this._ref.current!)
    }

    render(){
        return (
            <pre ref={this._ref} className={`language-${this.props.language}`}>
                <code className={`language-${this.props.language}`}>
                    {this.props.children}
                </code>
            </pre>
        )
    }
}