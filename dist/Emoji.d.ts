/// <reference types="react" />
import PropTypes from 'prop-types';
declare const emojis: {
    middleFinger: JSX.Element;
    indexFinger: JSX.Element;
    flex: JSX.Element;
    brokenHeart: JSX.Element;
    perfect: JSX.Element;
    thumbsUp: JSX.Element;
    thumbsDown: JSX.Element;
    clap: JSX.Element;
    heart: JSX.Element;
    fire: JSX.Element;
    bulb: JSX.Element;
    crap: JSX.Element;
    thinking: JSX.Element;
    rocket: JSX.Element;
};
export declare type EmojiProps = {
    variant: keyof typeof emojis;
};
declare const Emoji: {
    (props: EmojiProps): JSX.Element;
    propTypes: {
        variant: PropTypes.Requireable<string>;
    };
};
export default Emoji;
//# sourceMappingURL=Emoji.d.ts.map