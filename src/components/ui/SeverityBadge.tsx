import React from 'react';
import { Badge } from '@/components/ui/Badge';
import type { Severity } from '@/types';
import { AlertOctagon, AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
  showIcon?: boolean;
}

export function SeverityBadge({ severity, className, showIcon = true }: SeverityBadgeProps) {
  const getSeverityStyles = (sev: Severity) => {
    switch (sev) {
      case 'critical':
        return 'border-red-500/40 bg-red-500/10 text-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.15)]';
      case 'high':
        return 'border-orange-500/40 bg-orange-500/10 text-[#F97316]';
      case 'medium':
        return 'border-amber-500/40 bg-amber-500/10 text-[#EAB308]';
      case 'low':
        return 'border-blue-500/40 bg-blue-500/10 text-[#3B82F6]';
      case 'info':
        return 'border-cyan-500/40 bg-cyan-500/10 text-[#22D3EE]';
      default:
        return 'border-slate-500/40 bg-slate-500/10 text-slate-400';
    }
  };

  const IconComponent = (sev: Severity) => {
    switch (sev) {
      case 'critical': return AlertOctagon;
      case 'high': return AlertTriangle;
      case 'medium': return AlertCircle;
      case 'low': return Info;
      case 'info': return ShieldCheck;
      default: return Info;
    }
  };

  const Icon = IconComponent(severity);

  return (
    <Badge
      variant="outline"
      className={`border px-2.5 py-0.5 inline-flex items-center gap-1.5 font-medium rounded-full text-xs transition-colors ${getSeverityStyles(severity)} ${className || ''}`}
    >
      {showIcon && (
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      )}
      <span className="capitalize">{severity}</span>
    </Badge>
  );
}
