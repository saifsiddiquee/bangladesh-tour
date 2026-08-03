import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  ariaLabel,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-sundarbans text-white hover:bg-sundarbans/90 shadow-sm',
    secondary: 'bg-white text-monsoon-slate border border-gray-200 hover:border-sundarbans hover:text-sundarbans',
    ghost: 'text-monsoon-slate hover:text-sundarbans hover:bg-sundarbans/5',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const classes = cn(
    'rounded-lg font-medium transition-all duration-200 focus-ring inline-flex items-center justify-center gap-2',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
