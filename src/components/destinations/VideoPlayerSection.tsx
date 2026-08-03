'use client';

import React from 'react';
import { Play, Video } from 'lucide-react';

interface VideoPlayerSectionProps {
  videoUrl?: string;
  destinationName: string;
}

/** Helper function to extract YouTube video ID from various URL formats */
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  
  // Regular expressions for standard youtube.com/watch?v=, youtu.be/, youtube.com/embed/
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export function VideoPlayerSection({ videoUrl, destinationName }: VideoPlayerSectionProps) {
  const videoId = getYouTubeId(videoUrl);

  if (!videoUrl || !videoId) {
    return null;
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <section className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-sundarbans text-white rounded-xl shadow-sm">
          <Video className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-monsoon-slate dark:text-river-mist">
            Video Tour of {destinationName}
          </h2>
          <p className="text-sm text-monsoon-slate-light dark:text-slate-400">
            Experience the scenery, atmosphere, and culture in motion
          </p>
        </div>
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-black group">
        <iframe
          src={embedUrl}
          title={`Video tour of ${destinationName}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 rounded-2xl"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
