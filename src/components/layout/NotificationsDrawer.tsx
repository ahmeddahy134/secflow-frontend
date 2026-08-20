'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Rocket, Scan, ShieldAlert, FolderGit2, Bell, CheckCheck } from 'lucide-react';
import { mockNotifications } from '@/data/mock-data';
import type { Notification } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<Notification['type'], { icon: React.ElementType; className: string }> = {
  deployment: { icon: Rocket, className: 'text-orange-400 bg-orange-500/10' },
  scan: { icon: Scan, className: 'text-blue-400 bg-blue-500/10' },
  vulnerability: { icon: ShieldAlert, className: 'text-red-400 bg-red-500/10' },
  alert: { icon: Bell, className: 'text-amber-400 bg-amber-500/10' },
  repository: { icon: FolderGit2, className: 'text-purple-400 bg-purple-500/10' },
};

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="relative w-full max-w-sm bg-[#0A0B14] border-l border-[#1E2235] shadow-2xl overflow-y-auto z-10 flex flex-col h-full"
      >
        <div className="sticky top-0 bg-[#0A0B14] border-b border-[#1E2235] p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-base font-bold text-white">Notifications</h2>
            <p className="text-xs text-slate-500 mt-0.5">{unreadCount} unread</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-blue-400 hover:bg-[#12141F] transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all as read
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#12141F] text-slate-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 divide-y divide-[#1E2235]">
          {notifications.map((n) => {
            const config = iconMap[n.type];
            const Icon = config.icon;
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  'w-full flex items-start gap-3 p-4 text-left hover:bg-[#12141F] transition-colors relative',
                  !n.read && 'bg-blue-500/[0.03]'
                )}
              >
                {!n.read && <span className="absolute left-1.5 top-6 h-1.5 w-1.5 rounded-full bg-blue-500" />}
                <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', config.className)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm', n.read ? 'text-slate-300' : 'text-white font-semibold')}>{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[11px] text-slate-600 mt-1.5">{n.createdAt}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
