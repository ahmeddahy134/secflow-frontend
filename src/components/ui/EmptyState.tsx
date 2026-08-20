import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type?: 'security' | 'deployment' | 'general';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const iconMap = {
  security: '/brand/04_shield_security_symbol.png',
  deployment: '/brand/05_cube_architecture_symbol.png',
  general: '/brand/03_infinity_flow_symbol.png',
};

export function EmptyState({
  type = 'general',
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 py-16 rounded-2xl border border-[#1E2235] bg-[#12141F]/40 backdrop-blur-sm max-w-md mx-auto my-8", className)}>
      <div className="relative h-24 w-24 mb-6 opacity-80 transition-transform duration-500 hover:scale-105">
        <Image
          src={iconMap[type]}
          alt={title}
          fill
          sizes="96px"
          className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          priority
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 max-w-xs leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-6 shadow-lg shadow-blue-500/25"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
