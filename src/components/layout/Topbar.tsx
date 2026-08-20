'use client';

import React, { useState } from 'react';
import { Bell, Search, HelpCircle, Command } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { NotificationsDrawer } from './NotificationsDrawer';
import { mockNotifications } from '@/data/mock-data';

export function Topbar() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#1E2235] bg-[#0A0B14]/80 px-6 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-500">Projects</span>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-slate-200 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-blue-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              secflow-api
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                MAIN
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Search trigger for Command Palette */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center justify-between w-64 h-9 px-3 rounded-lg bg-[#12141F] border border-[#1E2235] text-slate-400 hover:border-slate-700 text-xs transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <span>Search anything...</span>
            </div>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>

          <div className="flex items-center gap-2 border-l border-[#1E2235] pl-4">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative rounded-lg p-2 text-slate-400 hover:bg-[#12141F] hover:text-slate-200 transition-colors"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#0A0B14]" />
              )}
            </button>

            <a
              href="/docs"
              className="rounded-lg p-2 text-slate-400 hover:bg-[#12141F] hover:text-slate-200 transition-colors"
              aria-label="Help & documentation"
            >
              <HelpCircle className="h-4 w-4" />
            </a>

            {/* User Avatar with Brand Gradient */}
            <div className="ml-2 flex items-center gap-3 cursor-pointer group">
              <div className="h-8 w-8 overflow-hidden rounded-full border border-[#1E2235] bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md group-hover:ring-2 group-hover:ring-blue-500/50 transition-all">
                AK
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Notifications Drawer */}
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  );
}
