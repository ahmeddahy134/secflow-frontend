'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LayoutDashboard, FolderGit2, ShieldAlert, FileText, Rocket, ActivitySquare, Bell, ScrollText, Settings, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
  { name: 'Repositories', href: '/repositories', icon: FolderGit2, category: 'Navigation' },
  { name: 'Findings & Vulnerabilities', href: '/findings', icon: ShieldAlert, category: 'Navigation' },
  { name: 'AI Intelligence', href: '/ai-intelligence', icon: Bot, category: 'Navigation' },
  { name: 'Security Reports', href: '/reports', icon: FileText, category: 'Navigation' },
  { name: 'Deployments & Infrastructure', href: '/deployments', icon: Rocket, category: 'Navigation' },
  { name: 'System Monitoring', href: '/monitoring', icon: ActivitySquare, category: 'Navigation' },
  { name: 'Alerts & Incidents', href: '/alerts', icon: Bell, category: 'Navigation' },
  { name: 'Audit Logs', href: '/audit-log', icon: ScrollText, category: 'Navigation' },
  { name: 'Settings & Integrations', href: '/settings', icon: Settings, category: 'Navigation' },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-xl rounded-2xl border border-[#1E2235] bg-[#12141F] shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center px-4 border-b border-[#1E2235] bg-[#0A0B14]">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, findings, repos... (Press Esc to exit)"
                className="w-full h-14 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none text-sm"
                autoFocus
              />
              <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No matching results found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    Navigation Shortcuts
                  </p>
                  {filteredItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-slate-400 group-hover:text-blue-400" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{item.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#1E2235] bg-[#0A0B14] text-[11px] text-slate-500">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↓</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
