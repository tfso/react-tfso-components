import React from 'react'
import styled from 'styled-components/macro'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

export type ProgressBarProps = {
    /**
     * @default #6699bb
     */
    color?: string,
    name: string,
    currentValue: number,
    targetValue: number
}

const Bar = styled.div(props => ({
    height: '1em',
    width: '30em',
    borderRadius: '0.3em',
    background: `linear-gradient(90deg, ${props.color});`
}))

const calculatePercentage = (a, b) => (
    Math.floor(a / b * 100)
)

const defaultProps: Required<Pick<ProgressBarProps, 'color' >> = {
    color: '#6699bb'
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({name, color, currentValue, targetValue}) => (
    <>
        <Bar color={`${color} ${calculatePercentage(currentValue, targetValue)}%, lightgrey ${calculatePercentage(currentValue, targetValue)}%`} />
        <Typography variant='subtitle1' >
            {name}
            <span style={{float: 'right'}}>{calculatePercentage(currentValue, targetValue)}%</span>
        </Typography>
    </>
)

ProgressBar.defaultProps = defaultProps

ProgressBar.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    currentValue: PropTypes.number.isRequired,
    targetValue: PropTypes.number.isRequired
}

export default ProgressBar as React.ComponentType<ProgressBarProps>