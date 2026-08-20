import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={cn("relative animate-spin [animation-duration:2.5s]", sizeMap[size], className)}>
        <Image
          src="/brand/03_infinity_flow_symbol.png"
          alt="Loading..."
          fill
          sizes="64px"
          className="object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          priority
        />
      </div>
      {label && (
        <p className="text-xs font-medium text-slate-400 animate-pulse tracking-wide">{label}</p>
      )}
    </div>
  );
}
