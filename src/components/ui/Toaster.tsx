'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore, type ToastVariant } from '@/store/toast-store';
import { cn } from '@/lib/utils';

const variantConfig: Record<ToastVariant, { icon: React.ElementType; className: string; iconClassName: string }> = {
  success: {
    icon: CheckCircle2,
    className: 'border-emerald-500/30 bg-emerald-500/5',
    iconClassName: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/5',
    iconClassName: 'text-red-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-500/30 bg-amber-500/5',
    iconClassName: 'text-amber-400',
  },
  info: {
    icon: Info,
    className: 'border-blue-500/30 bg-blue-500/5',
    iconClassName: 'text-blue-400',
  },
};

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2.5 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const config = variantConfig[t.variant];
          const Icon = config.icon;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-xl border bg-[#12141F]/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/40',
                config.className
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconClassName)} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
