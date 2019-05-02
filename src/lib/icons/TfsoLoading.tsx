import React from 'react'

import SvgIcon, {SvgIconProps} from '@material-ui/core/SvgIcon'
import styled, {css} from 'styled-components/macro'

export type TfsoLoadingIconProps = {
    /**
     * @default infinite
     */
    once?: boolean
} & SvgIconProps

const TfsoLoadingIconWrapper = ({once, ...other}: TfsoLoadingIconProps) => <SvgIcon {...other}/>

const path = css`
    opacity: 1;
    animation-delay: 1.5s;
`
const StyledSvgIcon = styled(TfsoLoadingIconWrapper)`&&{
    #path1{
        ${path}
        animation: fade-in1 1.5s ${({once}) => once ? 1 : 'infinite'}
    }
    #path2{
        ${path}
        animation: fade-in2 1.5s ${({once}) => once ? 1 : 'infinite'}
    }
    #path3{
        ${path}
        animation: fade-in3 1.5s ${({once}) => once ? 1 : 'infinite'}
    }
    #path4{
        ${path}
        animation: fade-in4 1.5s ${({once}) => once ? 1 : 'infinite'}
    }
    #path5{
        ${path}
        animation: fade-in5 1.5s ${({once}) => once ? 1 : 'infinite'}
    }
    @keyframes fade-in1 {
        0%   { opacity: 0.2; }
        20% { opacity: 1; }
        40% { opacity: 1; }
        60% { opacity: 1; }
        80% { opacity: 1; }
        100% {opactiy: 1}
    }
    @keyframes fade-in2 {
        0%   { opacity: 0.2; }
        20% { opacity: 0.2; }
        40% { opacity: 1; }
        60% { opacity: 1; }
        80% { opacity: 1; }
        100% {opactiy: 1}
    }
    @keyframes fade-in3 {
        0%   { opacity: 0.2; }
        20% { opacity: 0.2; }
        40% { opacity: 0.2; }
        60% { opacity: 1; }
        80% { opacity: 1; }
        100% {opactiy: 1}
    }
    @keyframes fade-in4 {
        0%   { opacity:0.2; }
        20% { opacity: 0.2; }
        40% { opacity: 0.2; }
        60% { opacity: 0.2; }
        80% { opacity: 1; }
        100% {opactiy: 1}
    }
    @keyframes fade-in5 {
        0%   { opacity: 0.2; }
        20% { opacity: 0.2; }
        40% { opacity: 0.2; }
        60% { opacity: 0.2; }
        80% { opacity: 1; }
        100% {opactiy: 1}
    }
}` as typeof SvgIcon

const TfsoLoading = React.memo((props: TfsoLoadingIconProps) => (
    <StyledSvgIcon
        {...props}
        viewBox="0 0 37 23"
        fillRule='evenodd'
        strokeWidth="1"
    >
        <path d="M21.79 9.81C21.17789 8.5323532 19.886707 7.7195303 18.47 7.72 16.444136 7.7143752 14.803816 6.0724096 14.800223 4.0465408 14.79663 2.020672 16.431115 0.37289845 18.456947 0.36008776 20.482778 0.34727707 22.137972 1.9742478 22.16 4c-0.01782 1.4288443 0.793121 2.7388262 2.08 3.36-1.120033 0.4431782-2.006822 1.3299671-2.45 2.45l0 0z" id="path5"/>
        <path d="m33.24 15.09c-1.427527 0.01209-2.733245-0.802525-3.35-2.09-0.443178 1.120033-1.329967 2.006822-2.45 2.45 1.275973 0.613987 2.088053 1.903991 2.09 3.32 0 2.032408 1.647592 3.68 3.68 3.68 2.032408 0 3.68-1.647592 3.68-3.68 0-2.032408-1.647592-3.68-3.68-3.68l0.03 0 0 0z" id="path4"/>
        <path d="m14.79 11.41c0-2.0351693-1.649831-3.685-3.685-3.685-2.0351693 0-3.685 1.6498307-3.685 3.685 0 2.032408-1.6475921 3.68-3.68 3.68-2.0324079 0-3.68 1.647592-3.68 3.68 0 2.032408 1.6475921 3.68 3.68 3.68 2.0324079 0 3.68-1.647592 3.68-3.68-0.00119-1.719312 1.1882715-3.210312 2.864877-3.591141 1.676605-0.380829 3.39346 0.450022 4.135123 2.001141 0.443178-1.120033 1.329967-2.006822 2.45-2.45-1.27208-0.616837-2.079908-1.906255-2.08-3.32l0 0 0 0z" id="path2"/>
        <path d="m25.84 7.73c-2.016889-0.0001192-3.658077 1.6232303-3.68 3.64l0 0.09c-0.02094 1.397916-0.830116 2.663946-2.09 3.27 1.120033 0.443178 2.006822 1.329967 2.45 2.45 0.613987-1.275973 1.903991-2.088053 3.32-2.09 2.035169 0 3.685-1.649831 3.685-3.685 0-2.0351693-1.649831-3.685-3.685-3.685l0 0.01 0 0z" id="path3"/>
        <path d="m18.47 15.1c-2.031097 0.0055-3.673671 1.655547-3.669994 3.686649 0.0037 2.031101 1.652215 3.675171 3.683318 3.673336C20.514428 22.45815 22.159993 20.811104 22.16 18.78 22.162665 17.800536 21.774754 16.860421 21.082167 16.167833 20.389579 15.475246 19.449463 15.087335 18.47 15.09l0 0.01 0 0z" id="path1"/>
    </StyledSvgIcon>
))

TfsoLoading.displayName = 'TfsoLoadingIcon'
export default TfsoLoading as typeof SvgIcon