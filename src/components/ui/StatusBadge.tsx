import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Loader2, AlertOctagon, AlertTriangle, AlertCircle, Info, ShieldCheck, Circle } from 'lucide-react';

export type StatusType = 'passed' | 'failed' | 'running' | 'critical' | 'high' | 'medium' | 'low' | 'open' | 'healthy' | 'success' | 'error' | 'warning' | 'info' | 'pending' | 'resolved' | 'active' | 'enabled' | 'disabled' | 'ready' | 'deployed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  showDot?: boolean;
  label?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; border: string; icon: React.ElementType; label: string }> = {
  // Green family
  passed:   { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Passed' },
  success:  { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Success' },
  healthy:  { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Healthy' },
  resolved: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Resolved' },
  active:   { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Active' },
  enabled:  { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Enabled' },
  deployed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Deployed' },
  ready:    { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2, label: 'Ready' },

  // Red family
  failed:   { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle, label: 'Failed' },
  critical: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', icon: AlertOctagon, label: 'Critical' },
  error:    { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle, label: 'Error' },

  // Orange / High
  high:     { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30', icon: AlertTriangle, label: 'High' },

  // Amber / Warning / Medium / Running
  medium:   { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: AlertCircle, label: 'Medium' },
  warning:  { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: AlertCircle, label: 'Warning' },
  running:  { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: Loader2, label: 'Running' },

  // Blue / Info / Low / Open
  low:      { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', icon: Info, label: 'Low' },
  open:     { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', icon: Circle, label: 'Open' },
  info:     { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', icon: Info, label: 'Info' },

  // Neutral
  pending:  { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30', icon: Circle, label: 'Pending' },
  disabled: { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30', icon: Circle, label: 'Disabled' },
};

export function StatusBadge({ status, className, showIcon = true, showDot = false, label }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.info;
  const Icon = config.icon;
  const isSpinning = status === 'running';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showDot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', config.text.replace('text-', 'bg-'), isSpinning && 'animate-pulse')} />
      )}
      {showIcon && !showDot && (
        <Icon className={cn('h-3.5 w-3.5 flex-shrink-0', isSpinning && 'animate-spin')} />
      )}
      <span>{label || config.label}</span>
    </div>
  );
}
