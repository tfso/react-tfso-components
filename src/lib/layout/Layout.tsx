import React from 'react'
import styled from 'styled-components/macro'
import {TopBar} from './Topbar'
import DocumentTitle from './DocumentTitle'

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
  min-height: 0;
  display: flex;
`

// Put menu here
export const LayoutBodyLeft = styled.div`

`

// Put your app here
export const LayoutBodyRight = styled.div`
  flex: 1;
  min-height: 0;
  padding: 15px;
  overflow-y: auto;
`

type LayoutProps = {
    title: string
    docTitle: string
    menu: React.ReactNode
    mobileMenu: React.ReactNode
    topMenu: React.ReactNode
    onMenuToggle: Function
}

export class Layout extends React.PureComponent<LayoutProps>{
    render(){
        return (
            <LayoutWrapper>
                <DocumentTitle text={this.props.docTitle} />
                <LayoutHeader>
                    <TopBar
                        title={this.props.title}
                        onMenuToggle={this.props.onMenuToggle}
                        mobileMenu={this.props.mobileMenu}
                    >
                        {this.props.topMenu}
                    </TopBar>
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

type LayoutNoMenuProps = {
    title: string
    docTitle: string
    mobileMenu: React.ReactNode
    topMenu: React.ReactNode
}

export class LayoutNoMenu extends React.PureComponent<LayoutNoMenuProps>{
    render(){
        return (
            <LayoutWrapper>
                <DocumentTitle text={this.props.docTitle} />
                <LayoutHeader>
                    <TopBar
                        title={this.props.title}
                        onMenuToggle={null}
                        mobileMenu={this.props.mobileMenu}
                    >
                        {this.props.topMenu}
                    </TopBar>
                </LayoutHeader>
                <LayoutBody>
                    <LayoutBodyRight>
                        {this.props.children}
                    </LayoutBodyRight>
                </LayoutBody>
            </LayoutWrapper>
        )
    }
}