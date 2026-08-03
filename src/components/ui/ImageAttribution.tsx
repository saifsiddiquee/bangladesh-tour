import React from 'react';
import { cn } from '@/lib/utils';

interface ImageAttributionProps {
  photographer: {
    name: string;
    profileUrl: string;
  };
  className?: string;
  light?: boolean;
}

export function ImageAttribution({ photographer, className }: ImageAttributionProps) {
  const utmParams = '?utm_source=beautiful_bangladesh&utm_medium=referral';
  const url = `${photographer.profileUrl}${utmParams}`;

  return (
    <div
      className={cn(
        'absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm',
        className
      )}
    >
      Photo by{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-paddy-gold transition-colors underline decoration-white/30 hover:decoration-paddy-gold"
      >
        {photographer.name}
      </a>
    </div>
  );
}
