import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import TopBar from './Topbar'
import DocumentTitle from './DocumentTitle'
import Menu from './Menu'
import {withScreenSize, ScreenSizeData} from '../ScreenSize'

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
    docTitle: string
    menuContent?: React.ReactNode
    topMenuContent?: React.ReactNode
} & {
    screenSize: ScreenSizeData
}

type LayoutState = {
    menuOpen: boolean | null
}

export default withScreenSize(class Layout extends React.PureComponent<LayoutProps, LayoutState>{
    static propTypes = {
        docTitle: PropTypes.string.isRequired,
        menuContent: PropTypes.node,
        topMenuContent: PropTypes.node
    }

    state: LayoutState = {
        menuOpen: null
    }

    onCloseMenu = () => this.setState({menuOpen: false})
    onMenuToggle = () => this.setState(state => ({menuOpen: !this.menuIsOpen()}))
    menuIsOpen(){
        if(this.state.menuOpen === null){
            return !this.props.screenSize.mobile
        }
        return this.state.menuOpen
    }
    onClickContent = () => {
        if(this.props.screenSize.mobile && this.menuIsOpen()){
            this.onCloseMenu()
        }
    }

    render(){
        return (
            <LayoutWrapper>
                <DocumentTitle text={this.props.docTitle + ' - 24SevenOffice'} />
                <LayoutHeader>
                    <TopBar
                        onMenuToggle={this.onMenuToggle}
                        mobile={this.props.screenSize.mobile}
                    >
                        {this.props.topMenuContent}
                    </TopBar>
                </LayoutHeader>
                <LayoutBody>
                    <LayoutBodyLeft onClick={this.onClickContent}>
                        <Menu mobile={this.props.screenSize.mobile} open={this.menuIsOpen()} onClose={this.onCloseMenu}>
                            {this.props.menuContent}
                        </Menu>
                    </LayoutBodyLeft>
                    <LayoutBodyRight>
                        {this.props.children}
                    </LayoutBodyRight>
                </LayoutBody>
            </LayoutWrapper>
        )
    }
})