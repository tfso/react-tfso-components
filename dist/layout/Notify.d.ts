import React from 'react';
import PropTypes from 'prop-types';
import { ListItemProps } from '@material-ui/core/ListItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
export declare type NotificationItemProps = {
    /**
     * Unique identifier of the Notification.
     * Spread to the `ListItem` component.
     */
    id: string;
    /**
     * Date when the notification was created.
     */
    date: Date;
    /**
     * `true` when the notification has been displayed to the user.
     */
    seen?: boolean;
    /**
     * `true` when the user has marked the notification as read either by:
     * - marking all notifications as read.
     * - clicking on the notification.
     */
    read?: boolean;
    /**
     * Callback when the user clicks the notification.
     * you should set `read` to `true` in this callback before anything else.
     */
    onClick: () => void;
    /**
     * Should be either an `<Avatar>`, `<SvgIcon>` or `undefined`. Wrapped in a ListItemAvatar
     */
    avatar?: React.ReactElement;
    /**
     * <Typography> formatted text, or string
     */
    children: React.ReactChild;
    action?: React.ReactChild;
    ContainerComponent?: ListItemProps['ContainerComponent'];
};
declare const NotificationItem: {
    (props: NotificationItemProps): JSX.Element;
    propTypes: {
        id: PropTypes.Validator<string>;
        date: PropTypes.Validator<object>;
        seen: PropTypes.Requireable<boolean>;
        read: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        avatar: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        action: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        ContainerComponent: PropTypes.Requireable<any>;
    };
};
export { NotificationItem };
export declare type NotifierProps = {
    /**
     * Number of new notifications
     */
    count: number;
    /**
     * Display a loading indicator
     */
    loading?: boolean;
    open: boolean;
    translate: (key: string) => string;
    /**
     * Callback when the user clicked the bell and opens the list of notifications.
     * You may want to fetch new notifications here.
     * When you're done fetching data, it is your responsibility to mark all notifications as read if the notifications is still open.
     */
    onOpen: () => void;
    /**
     * Invoked when the user clicks the `Mark all as read` button
     * You should set the notifications as read here.
     */
    onReadAll: () => void;
    /**
     * Invoked when the user scrolled to the end of the list
     */
    onLoadMore: () => Promise<void>;
    /**
     * Invoked when the list is closed.
     */
    onClose: () => void;
    /**
     * Render your notifications here.
     * The children will be wrapped in a `List`component.
     * Typically a `NotificationItem`, but anything goes.
     */
    children: React.ReactNode;
    /**
     * Properties for the Notification Bell icon
     */
    IconProps?: SvgIconProps;
};
export default class Notifier extends React.PureComponent<NotifierProps> {
    static propTypes: {
        count: PropTypes.Validator<number>;
        loading: PropTypes.Requireable<boolean>;
        open: PropTypes.Validator<boolean>;
        translate: PropTypes.Validator<(...args: any[]) => any>;
        onOpen: PropTypes.Validator<(...args: any[]) => any>;
        onReadAll: PropTypes.Validator<(...args: any[]) => any>;
        onLoadMore: PropTypes.Validator<(...args: any[]) => any>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        IconProps: PropTypes.Requireable<object>;
    };
    _anchorEl: React.RefObject<HTMLButtonElement>;
    onOpen: () => void;
    onClose: () => void;
    renderNotifyer: () => JSX.Element;
    renderToolbar: (mobile: boolean) => JSX.Element;
    renderContent(mobile: boolean): JSX.Element;
    renderDesktop(): JSX.Element;
    renderMobile(): JSX.Element;
    renderLoading: () => JSX.Element;
    render(): JSX.Element;
}
//# sourceMappingURL=Notify.d.ts.map