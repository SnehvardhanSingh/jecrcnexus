import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, CheckCheck, HelpCircle, Award, Users, Calendar, Sparkles } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount, setCurrentPage } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'doubt_answer':
        return <HelpCircle className="w-4 h-4 text-brand-blue" />;
      case 'resource_verified':
        return <Award className="w-4 h-4 text-emerald-600" />;
      case 'team_application':
        return <Users className="w-4 h-4 text-indigo-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-purple" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-dark" />
          <span className="text-xs font-bold text-brand-dark uppercase tracking-wide">Campus Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 bg-brand-blue text-white text-[10px] font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-[11px] font-medium text-brand-blue hover:text-brand-blueHover flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No notifications at the moment.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.type === 'doubt_answer') setCurrentPage('doubts');
                if (notif.type === 'resource_verified') setCurrentPage('resources');
                if (notif.type === 'team_application') setCurrentPage('projects');
                if (notif.type === 'event') setCurrentPage('dashboard');
                onClose();
              }}
              className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                !notif.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex-shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className={`text-xs font-semibold ${!notif.isRead ? 'text-brand-blue font-bold' : 'text-slate-900'}`}>
                    {notif.title}
                  </p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timeAgo}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                  {notif.message}
                </p>
              </div>
              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            onClose();
            setCurrentPage('profile');
          }}
          className="text-xs text-brand-slate hover:text-brand-blue font-medium"
        >
          View Activity History
        </button>
      </div>
    </div>
  );
};
