import React from 'react'

import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'
import Link from '@material-ui/core/Link'

import TfsoLoading from '../../lib/icons/TfsoLoading'
import {MaterialUiIcon} from '../components/MaterialUiLink'
import {GitHubIcon} from '../components/GitHubLink'

// TODO: this could be a Util HOC component
const CenterTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
`

const Home = () => {
    return (
        <CenterTop>
            <TfsoLoading color='primary' fontSize='inherit' style={{fontSize: 400}} />
            <Typography variant='h3' color='primary' paragraph>
                REACT-TFSO-COMPONENTS
            </Typography>
            <Typography variant='h6' align='center' color='textSecondary' paragraph>
                Something something useful description something dark side (TODO) <br />
                Supplementary React components based on Material-UI with Tfso styling<br />
            </Typography>
            <Grid container justify='center'>
                <Grid item xs={5} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Zoom in appear style={{transitionDelay: '250ms'}} >
                        <Link href='https://material-ui.com/' target='_blank' rel='noreferrer'>
                            <MaterialUiIcon style={{fontSize: 150}} />
                        </Link>
                    </Zoom>
                    <Zoom in appear style={{transitionDelay: '750ms'}} >
                        <Typography variant='h6'>
                            Find standard components <Link href='https://material-ui.com/' target='_blank' rel='noreferrer'>here</Link>
                        </Typography>
                    </Zoom>
                </Grid>
                <Grid item xs={5} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Zoom in appear style={{transitionDelay: '500ms'}}>
                        <Link href='https://github.com/tfso/react-tfso-components' target='_blank' rel='noreferrer' >
                            <GitHubIcon style={{fontSize: 150}} color='primary' />
                        </Link>
                    </Zoom>
                    <Zoom in appear style={{transitionDelay: '1000ms'}} >
                        <Typography variant='h6'>
                            View source on <Link href='https://github.com/tfso/react-tfso-components' target='_blank' rel='noreferrer' >GitHub</Link>
                        </Typography>
                    </Zoom>
                </Grid>
            </Grid>
        </CenterTop>
    )
}

export default Home