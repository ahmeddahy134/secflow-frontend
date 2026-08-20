import React from 'react';
import { CheckCircle2, Clock, PlayCircle, XCircle, XOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScanStatus } from '@/types';

interface StatusIndicatorProps {
  status: ScanStatus | 'pending';
  className?: string;
  showLabel?: boolean;
}

export function StatusIndicator({ status, className, showLabel = true }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
          text: 'Completed',
          textColor: 'text-emerald-500',
        };
      case 'running':
        return {
          icon: <PlayCircle className="h-4 w-4 text-blue-500 animate-pulse" />,
          text: 'Running',
          textColor: 'text-blue-500',
        };
      case 'failed':
        return {
          icon: <XOctagon className="h-4 w-4 text-red-500" />,
          text: 'Failed',
          textColor: 'text-red-500',
        };
      case 'cancelled':
        return {
          icon: <XCircle className="h-4 w-4 text-slate-400" />,
          text: 'Cancelled',
          textColor: 'text-slate-400',
        };
      case 'pending':
      case 'queued':
      default:
        return {
          icon: <Clock className="h-4 w-4 text-slate-500" />,
          text: status === 'queued' ? 'Queued' : 'Pending',
          textColor: 'text-slate-500',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {config.icon}
      {showLabel && (
        <span className={cn("text-sm font-medium", config.textColor)}>
          {config.text}
        </span>
      )}
    </div>
  );
}
