import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import ThemeColor from '../components/ThemeColor'
import {styledTheme} from '../../lib/theme/index'

const ThemeColors = styled.div`
  clear: both;
  > div{
    float: left;
      :hover{
        width: 460px;
        height: 230px;
      }
  }
`

export default class Theme extends React.PureComponent {
    render(){
        return (
            <>
                <Typography variant='h2'>
                    Theme &amp; Styling
                </Typography>
                <Typography variant='subtitle1'>
                    There is more TODO
                </Typography>
                <ThemeColors>
                    {Object.keys(styledTheme['tfso']['colors']).map(color => (
                        <ThemeColor color={color}/>
                    ))}
                </ThemeColors>
            </>
        )
    }
}