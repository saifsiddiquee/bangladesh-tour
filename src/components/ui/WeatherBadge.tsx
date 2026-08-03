import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface WeatherBadgeProps {
  weather: string;
  season: 'summer' | 'monsoon' | 'winter';
}

export function WeatherBadge({ weather, season }: WeatherBadgeProps) {
  const getIcon = () => {
    switch (season) {
      case 'summer': return '☀️';
      case 'monsoon': return '🌧️';
      case 'winter': return '❄️';
      default: return '☀️';
    }
  };

  return (
    <Badge variant={season === 'monsoon' ? 'info' : season === 'summer' ? 'season' : 'default'} className="gap-1.5">
      <span className="text-sm" aria-hidden="true">{getIcon()}</span>
      <span>{weather}</span>
    </Badge>
  );
}
