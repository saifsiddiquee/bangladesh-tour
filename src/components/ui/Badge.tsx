import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'category' | 'season' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variantClasses = {
    default: 'text-monsoon-slate dark:text-white',
    category: 'text-sundarbans dark:text-teal-300 font-semibold',
    season: 'text-paddy-gold-dark dark:text-amber-300 font-semibold',
    info: 'text-coxs-azure dark:text-sky-300 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm transition-all duration-200',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
