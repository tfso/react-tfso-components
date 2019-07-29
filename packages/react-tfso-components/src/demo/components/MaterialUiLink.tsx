import React from 'react'

import SvgIcon, {SvgIconProps} from '@material-ui/core/SvgIcon'
import Link from '@material-ui/core/Link'

export const MaterialUiIcon = React.memo((props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 600 476.6">
        <path d="m0 259.8v-259.8l225 129.9v86.6l-150-86.6v173.2z" fill="#00b0ff"/>
        <path d="m225 129.9 225-129.9v259.8l-150 86.6-75-43.3 150-86.6v-86.6l-150 86.6z" fill="#0081cb"/>
        <path d="m225 303.1v86.6l150 86.6v-86.6z" fill="#00b0ff"/>
        <path d="m375 476.3 225-129.9v-173.2l-75 43.3v86.6l-150 86.6zm150-346.4v-86.6l75-43.3v86.6z" fill="#0081cb"/>
    </SvgIcon>
))

export type MaterialUiLinkProps = {
    iconProps?: SvgIconProps
}

const MaterialUiLink = (props: MaterialUiLinkProps) => (
    <Link href='https://material-ui.com/' target='_blank' rel='noreferrer'>
        <MaterialUiIcon fontSize='large' {...props.iconProps as any} />
    </Link>
)

export default MaterialUiLink
