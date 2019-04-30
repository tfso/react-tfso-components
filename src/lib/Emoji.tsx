import React from 'react'

import PropTypes from 'prop-types'

// https://www.w3schools.com/charsets/ref_emoji.asp
const emojis = {
    middleFinger: <>&#128405;</>,
    indexFinger: <>&#128070;</>,
    flex: <>&#128170;</>,
    brokenHeart: <>&#128148;</>,
    perfect: <>&#128076;</>,
    thumbsUp: <>&#128077;</>,
    thumbsDown: <>&#128078;</>,
    clap: <>&#128079;</>,
    heart: <>&#128152;</>,
    fire: <>&#128293;</>,
    bulb: <>&#128161;</>,
    crap: <>&#128169;</>,
    thinking: <>&#129300;</>,
    rocket: <>&#128640;</>,
}

export type EmojiProps = {
    variant: keyof typeof emojis
}

const Emoji = (props: EmojiProps) => emojis[props.variant]

Emoji.propTypes = {
    variant: PropTypes.oneOf(Object.keys(emojis))
}

export default Emoji