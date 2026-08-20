'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderGit2, ShieldAlert, FileText, Rocket, ActivitySquare, Bell, ScrollText, Settings, PlayCircle, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Repositories', href: '/repositories', icon: FolderGit2 },
  { name: 'Pipeline', href: '/scans/latest', icon: PlayCircle },
  { name: 'Findings', href: '/findings', icon: ShieldAlert },
  { name: 'AI Intelligence', href: '/ai-intelligence', icon: Bot },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Deployments', href: '/deployments', icon: Rocket },
  { name: 'Monitoring', href: '/monitoring', icon: ActivitySquare },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Audit Log', href: '/audit-log', icon: ScrollText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "relative flex h-full flex-col border-r border-[#1E2235] bg-[#0A0B14] transition-all duration-300 z-30 select-none",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-[#1E2235] bg-[#12141F] text-slate-400 hover:text-white hover:border-blue-500/50 shadow-md transition-colors"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Header Logo */}
      <div className="flex h-16 items-center px-5 border-b border-[#1E2235]">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          {isCollapsed ? (
            <div className="relative h-8 w-8 flex-shrink-0">
              <Image 
                src="/brand/06_infinity_symbol_app_dark.png" 
                alt="SECFlow" 
                fill 
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="relative h-7 w-32 flex-shrink-0">
              <Image 
                src="/brand/logo-wordmark.png" 
                alt="SECFlow" 
                fill 
                sizes="128px"
                className="object-contain object-left"
                priority
              />
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="grid gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const addSeparator = item.name === 'Deployments' || item.name === 'Alerts' || item.name === 'Settings';
            
            return (
              <React.Fragment key={item.name}>
                {addSeparator && <div className="my-2 h-px bg-[#1E2235]/60 mx-2" />}
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group",
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  {/* Framer Motion Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-2 border-blue-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <item.icon className={cn(
                    "h-5 w-5 relative z-10 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />

                  {!isCollapsed && (
                    <span className="relative z-10 font-medium truncate">{item.name}</span>
                  )}

                  {item.name === 'Alerts' && (
                    <span className={cn(
                      "relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-400 border border-red-500/30",
                      isCollapsed ? "absolute top-1 right-1 h-2 w-2 p-0 text-[0px]" : "ml-auto"
                    )}>
                      {!isCollapsed && "2"}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Footer Organization Card */}
      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-[#1E2235]">
          <div className="rounded-xl border border-[#1E2235] bg-[#12141F]/80 p-3.5">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Organization</p>
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                SF
              </div>
              <div className="truncate">
                <span className="text-sm font-semibold text-slate-200 block truncate">SecFlow Team</span>
                <span className="text-[11px] text-emerald-400 block">Pro Plan</span>
              </div>
            </div>
            <Link href="/#pricing" className="mt-3 block text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Upgrade Plan &rarr;
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
