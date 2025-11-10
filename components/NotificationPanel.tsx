import React from 'react';
import { Notification, NotificationType } from '../types';
import { BellIcon, ChatBubbleLeftEllipsisIcon, CheckCircleIcon, XCircleIcon, UsersIcon } from './Icons';

interface NotificationPanelProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

const NotificationIcon: React.FC<{ type: NotificationType }> = ({ type }) => {
    const iconProps = { className: "w-6 h-6" };
    switch (type) {
        case NotificationType.APPLICATION_ACCEPTED:
            return <CheckCircleIcon {...iconProps} className="w-6 h-6 text-green-500" />;
        case NotificationType.APPLICATION_REJECTED:
            return <XCircleIcon {...iconProps} className="w-6 h-6 text-red-500" />;
        case NotificationType.NEW_MESSAGE:
            return <ChatBubbleLeftEllipsisIcon {...iconProps} className="w-6 h-6 text-blue-500" />;
        case NotificationType.NEW_APPLICANT:
            return <UsersIcon {...iconProps} className="w-6 h-6 text-primary" />;
        case NotificationType.SHIFT_CONFIRMED:
            return <CheckCircleIcon {...iconProps} className="w-6 h-6 text-blue-500" />;
        default:
            return <BellIcon {...iconProps} className="w-6 h-6 text-slate-500" />;
    }
};

const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${Math.floor(seconds)}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onNotificationClick, onMarkAllAsRead, onClose }) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAllReadClick = () => {
        onMarkAllAsRead();
    };

    return (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
            <div className="p-4 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-primary">Notifications</h3>
                    {unreadCount > 0 && (
                        <button onClick={handleMarkAllReadClick} className="text-sm font-semibold text-accent hover:underline">
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>
            {notifications.length > 0 ? (
                <ul className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <button
                                onClick={() => onNotificationClick(notification)}
                                className={`w-full text-left p-4 transition-colors ${!notification.isRead ? 'bg-cyan-50/50 hover:bg-cyan-50' : 'hover:bg-slate-50'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        <NotificationIcon type={notification.type} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-slate-700">{notification.message}</p>
                                        <p className="text-xs text-slate-500 mt-1">{timeSince(notification.timestamp)}</p>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="flex-shrink-0 pt-1">
                                            <span className="w-2.5 h-2.5 bg-accent rounded-full block" title="Unread"></span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center p-12">
                    <BellIcon className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="mt-4 font-semibold text-primary">No new notifications</h4>
                    <p className="text-sm text-slate-500 mt-1">We'll let you know when something new comes up.</p>
                </div>
            )}
            <div className="p-2 bg-slate-50 text-center border-t border-slate-200">
                <button onClick={onClose} className="text-sm font-semibold text-slate-600 hover:underline">
                    Close
                </button>
            </div>
        </div>
    );
};

export default NotificationPanel;