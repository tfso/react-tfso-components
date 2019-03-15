import React from 'react'
import styled from 'styled-components/macro'
import {TopBar} from './Topbar'
import DocumentTitle from './DocumentTitle'
import './index.css'

export {Menu} from './Menu'
export {TopBar} from './Topbar'

// Wrap everything
export const LayoutWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column; // Flex header and body from top to bottom
`

// Put topbar in here
export const LayoutHeader = styled.div`
  
`

// Put everything below topbar here
export const LayoutBody = styled.div`
  flex: 1; // Fill the rest of the page after header has taken its space
  display: flex;
`

// Put menu here
export const LayoutBodyLeft = styled.div`

`

// Put your app here
export const LayoutBodyRight = styled.div`
  flex: 1;
  padding: 15px;
`

type LayoutProps = {
    title: string
    docTitle: string
    menu: React.ReactNode
    mobileMenu: React.ReactNode
    onMenuToggle: Function
}

type LayoutState = {
    menuOpen: boolean
}

export class Layout extends React.Component<LayoutProps, LayoutState>{
    render(){
        return (
            <LayoutWrapper>
                <DocumentTitle text={this.props.docTitle} />
                <LayoutHeader>
                    <TopBar
                        title={this.props.title}
                        onMenuToggle={this.props.onMenuToggle}
                        mobileMenu={this.props.mobileMenu}
                    />
                </LayoutHeader>
                <LayoutBody>
                    <LayoutBodyLeft>
                        {this.props.menu}
                    </LayoutBodyLeft>
                    <LayoutBodyRight>
                        {this.props.children}
                    </LayoutBodyRight>
                </LayoutBody>
            </LayoutWrapper>
        )
    }
}