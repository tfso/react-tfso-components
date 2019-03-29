import React from 'react'

import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import TfsoLoading from '../../lib/icons/TfsoLoading'

// TODO: this could be a Util HOC component
const CenterTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
`

const Home = () => {
    return(
        <CenterTop>
            <TfsoLoading once color='primary' fontSize='inherit' style={{fontSize: 400}} />
            <Typography variant='h4' color='primary'>
                REACT-TFSO-COMPONENTS
            </Typography>
            <Typography variant='body1' align='center' color='textSecondary'>
                Something something useful description something that does something (TODO) <br />
                Supplementary React components based on Material-UI with Tfso styling<br />
            </Typography>
        </CenterTop>
    )
}

export default Home