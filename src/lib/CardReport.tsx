import React, {PureComponent} from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import OpenInNew from '@material-ui/icons/OpenInNew'
import IconButton from '@material-ui/core/IconButton'
import _ from 'lodash'
import {InjectedScreenSizeProps, withScreenSize} from './ScreenSize'
import {Tooltip} from '@material-ui/core'
import TfsoReportImage from './images/TfsoReportImage.svg'

export type ReportsProps = {
    options: {id: number, title: string, description: string, url: string, image: any}
    translate: (key: string) => string
    onClick: (event, object) => void
}

const TitleContainer = styled.div`
  display: flex;
  flex-grow: 1;
`

const CustomHeader = styled(Typography)` && {
  flex: 1;
  font-weight: 500;
  font-size: 13px;
  }
` as typeof Typography

const CustomDescription = styled(Typography)` && {
  font-size: 12px;
}
` as typeof Typography

const CustomIconButton = styled(IconButton)` &&{
  padding: 2px;
  }
` as typeof IconButton

const CustomContent = styled(CardContent)` &&{
  border-top: 1px solid #dadce0;
  position: relative;
  background-color: white;
  :last-child{
    padding-bottom: ${({theme}) => theme.mui.spacing.unit * 2}px;
  }  
}` as typeof CardContent

const CustomMedia = styled(CardMedia)` &&{
  background: #f5f5f5;
  padding: 10px 10px 0 10px;
}` as typeof CardMedia

const CustomArea = styled(CardActionArea)` &&{
  max-height: 100px;
  position: relative;
}` as typeof CardActionArea

export default withScreenSize(class CardReport extends PureComponent<ReportsProps & InjectedScreenSizeProps>{
    onClickLink = (event, report) => {
        this.props.onClick(event, report)
    }
    render(){
        const {translate, options, screenSize} = this.props
        const report = (
            <CustomContent>
                <TitleContainer>
                    <Tooltip title={options.title}>
                        <CustomHeader noWrap gutterBottom variant="body1">
                            {translate(_.capitalize(this.props.options.title))}
                        </CustomHeader>
                    </Tooltip>
                    <CustomIconButton color='primary' onClick={(e) => { this.onClickLink(e, options) }}>
                        <OpenInNew/>
                    </CustomIconButton>
                </TitleContainer>
                <Tooltip title={options.description}>
                    <CustomDescription variant="body2" color="textSecondary" noWrap>
                        {translate(_.capitalize(options.description))}
                    </CustomDescription>
                </Tooltip>
            </CustomContent>
        )
        const reportImage = (
            <CustomArea onClick={(e) => this.onClickLink(e, options)}>

                <CustomMedia
                    component="img"
                    image={options.image ? options.image : TfsoReportImage}
                    title={translate(_.capitalize(options.title))}
                />
            </CustomArea>
        )
        const desktopCard = (
            <Card>
                {reportImage}
                {report}
            </Card>
        )
        const mobileList = (
            <Card>
                {report}
            </Card>
        )
        const {mobile} = screenSize
        return mobile ? mobileList : desktopCard
    }
}
)