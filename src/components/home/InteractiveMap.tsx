'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Division, Destination, MapDivisionData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MapPin, Compass, Layers, ExternalLink, Sparkles } from 'lucide-react';
import mapDivisionsRaw from '../../../data/bangladesh-divisions-map.json';

const mapDivisions = mapDivisionsRaw as MapDivisionData[];

interface InteractiveMapProps {
  divisions: Division[];
  destinations: Destination[];
}

// Bounding box for longitude/latitude to SVG canvas (600 x 750)
const MIN_LONG = 88.0086, MAX_LONG = 92.6803;
const MIN_LAT = 20.5906, MAX_LAT = 26.6340;
const WIDTH = 600, HEIGHT = 750, PADDING = 30;
const contentWidth = WIDTH - 2 * PADDING;
const contentHeight = HEIGHT - 2 * PADDING;
const latRad = (23.6850 * Math.PI) / 180;
const aspect = Math.cos(latRad);
const scale = Math.min(contentWidth / ((MAX_LONG - MIN_LONG) * aspect), contentHeight / (MAX_LAT - MIN_LAT));

function projectGeoToSvg(lng: number, lat: number): [number, number] {
  const x = PADDING + (lng - MIN_LONG) * aspect * scale;
  const y = HEIGHT - PADDING - (lat - MIN_LAT) * scale;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

export function InteractiveMap({ divisions, destinations }: InteractiveMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [showPins, setShowPins] = useState<boolean>(true);
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);

  const activeSlug = hoveredSlug || selectedSlug || 'dhaka';
  const activeMapDivision = mapDivisions.find((d) => d.slug === activeSlug) || mapDivisions[0];
  const activeDivisionObj = divisions.find((d) => d.slug.toLowerCase() === activeSlug) || divisions[0];

  const activeDestinations = destinations.filter(
    (d) => d.division.toLowerCase() === activeSlug
  );

  return (
    <section className="py-20 w-full bg-gradient-to-b from-river-mist to-white overflow-hidden relative">
      {/* Decorative Background Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-monsoon-slate text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-teal-600 animate-spin-slow" />
            <span>Interactive GeoJSON Explorer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-monsoon-slate mb-4 tracking-tight">
            Explore Bangladesh Map
          </h2>
          <p className="text-lg text-monsoon-slate/75 font-body">
            Select any division to explore detailed geographical boundaries, upazila structures, and top travel destinations.
          </p>

          {/* Interactive Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowPins(!showPins)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-sm border",
                showPins
                  ? "bg-monsoon-slate text-white border-monsoon-slate shadow-monsoon-slate/20"
                  : "bg-white text-monsoon-slate border-monsoon-slate/20 hover:bg-river-mist"
              )}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{showPins ? "Hide Destination Pins" : "Show Destination Pins"}</span>
            </button>

            <a
              href="https://github.com/ifahimreza/bangladesh-geojson"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-white text-monsoon-slate/70 border border-monsoon-slate/15 hover:text-monsoon-slate hover:border-monsoon-slate/30 transition-all duration-200"
            >
              <span>GeoJSON Data by ifahimreza</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Main Grid: Map + Division Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Canvas Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[580px] bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-monsoon-slate/10 shadow-2xl shadow-monsoon-slate/5 relative overflow-hidden">
              
              {/* SVG Map */}
              <svg
                viewBox="0 0 600 750"
                className="w-full h-auto drop-shadow-md select-none"
                style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.06))' }}
              >
                <defs>
                  {mapDivisions.map((div) => (
                    <linearGradient key={`grad-${div.slug}`} id={`grad-${div.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={div.color} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={div.color} stopOpacity="1" />
                    </linearGradient>
                  ))}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Division Boundaries */}
                <g className="division-shapes">
                  {mapDivisions.map((div) => {
                    const isHovered = hoveredSlug === div.slug;
                    const isSelected = selectedSlug === div.slug;
                    const isActive = isHovered || (selectedSlug === null && activeSlug === div.slug);

                    return (
                      <g key={div.slug} className="cursor-pointer">
                        <motion.path
                          d={div.combinedPath}
                          fill={`url(#grad-${div.slug})`}
                          stroke="#FFFFFF"
                          strokeWidth={isActive ? "2" : "1"}
                          strokeLinejoin="round"
                          className="transition-all duration-300"
                          initial={{ opacity: 0.8 }}
                          animate={{
                            opacity: isActive ? 1 : hoveredSlug ? 0.45 : 0.85,
                            scale: isActive ? 1.015 : 1,
                          }}
                          transition={{ duration: 0.25 }}
                          onMouseEnter={() => setHoveredSlug(div.slug)}
                          onMouseLeave={() => setHoveredSlug(null)}
                          onClick={() => setSelectedSlug(div.slug === selectedSlug ? null : div.slug)}
                          filter={isActive ? "url(#glow)" : undefined}
                        />

                        {/* Division Centroid Name Labels */}
                        <text
                          x={div.center[0]}
                          y={div.center[1]}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          className={cn(
                            "pointer-events-none font-display font-semibold transition-all duration-300 shadow-sm",
                            isActive ? "text-[15px] opacity-100 font-bold" : "text-[13px] opacity-90"
                          )}
                          style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {div.name}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Destination Pins Layer */}
                {showPins && (
                  <g className="destination-pins">
                    {destinations.map((dest) => {
                      const [px, py] = projectGeoToSvg(dest.coordinates.lng, dest.coordinates.lat);
                      const isPinHovered = hoveredDestination?.id === dest.id;
                      const isMatchingDiv = dest.division.toLowerCase() === activeSlug;

                      return (
                        <g
                          key={dest.id}
                          transform={`translate(${px}, ${py})`}
                          className="cursor-pointer group"
                          onMouseEnter={() => setHoveredDestination(dest)}
                          onMouseLeave={() => setHoveredDestination(null)}
                        >
                          {/* Animated Pulse Ring */}
                          <circle
                            r={isMatchingDiv ? "10" : "6"}
                            fill={isMatchingDiv ? "#F59E0B" : "#FFFFFF"}
                            opacity="0.35"
                            className="animate-ping"
                          />
                          {/* Pin Center */}
                          <circle
                            r={isMatchingDiv ? "6" : "4"}
                            fill={isMatchingDiv ? "#F59E0B" : "#1E293B"}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            className="transition-all duration-300 group-hover:scale-125"
                          />
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>

              {/* Destination Hover Tooltip Card */}
              <AnimatePresence>
                {hoveredDestination && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-monsoon-slate/15 shadow-xl flex items-center gap-4 z-30"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-river-mist">
                      <Image
                        src={hoveredDestination.heroImage.url}
                        alt={hoveredDestination.heroImage.alt || hoveredDestination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                        {hoveredDestination.district}, {hoveredDestination.division}
                      </div>
                      <h4 className="font-display font-bold text-monsoon-slate text-base truncate">
                        {hoveredDestination.name}
                      </h4>
                      <p className="text-xs text-monsoon-slate/70 truncate">
                        {hoveredDestination.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={`/destinations/${hoveredDestination.slug}`}
                      className="px-3 py-2 bg-monsoon-slate text-white text-xs font-medium rounded-xl hover:bg-monsoon-slate/90 transition-colors flex-shrink-0"
                    >
                      View
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Division Explorer & Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Active Division Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-monsoon-slate/10 shadow-xl shadow-monsoon-slate/5 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: activeMapDivision.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-body text-monsoon-slate/50">
                      Division #{activeMapDivision.id}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: activeMapDivision.color }}
                    >
                      {activeMapDivision.bn_name}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-monsoon-slate mt-1">
                    {activeMapDivision.name}
                  </h3>
                </div>

                <Link
                  href={`/divisions/${activeMapDivision.slug}`}
                  className="p-3 rounded-2xl bg-river-mist hover:bg-monsoon-slate hover:text-white transition-all duration-200 group"
                  title={`View ${activeMapDivision.name} Division`}
                >
                  <ExternalLink className="w-5 h-5 text-monsoon-slate group-hover:text-white transition-colors" />
                </Link>
              </div>

              <p className="text-sm text-monsoon-slate/80 font-body mb-6 line-clamp-3">
                {activeDivisionObj?.description || `Explore ${activeMapDivision.name} division with its rich culture, historical landmarks, and natural beauty.`}
              </p>

              {/* Geographic Statistics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-monsoon-slate/10">
                <div className="bg-river-mist/60 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold font-display text-monsoon-slate">
                    {activeMapDivision.districtCount}
                  </div>
                  <div className="text-[11px] font-medium text-monsoon-slate/60">
                    Districts
                  </div>
                </div>

                <div className="bg-river-mist/60 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold font-display text-monsoon-slate">
                    {activeMapDivision.upazilaCount}
                  </div>
                  <div className="text-[11px] font-medium text-monsoon-slate/60">
                    Upazilas
                  </div>
                </div>

                <div className="bg-river-mist/60 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold font-display text-monsoon-slate">
                    {activeDestinations.length}
                  </div>
                  <div className="text-[11px] font-medium text-monsoon-slate/60">
                    Destinations
                  </div>
                </div>
              </div>
            </div>

            {/* Division Selection List */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-monsoon-slate/10 shadow-lg">
              <div className="text-xs font-semibold text-monsoon-slate/60 uppercase tracking-wider px-3 mb-3 flex items-center justify-between">
                <span>Select Division</span>
                <span className="text-[10px] text-monsoon-slate/40">8 Divisions</span>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {mapDivisions.map((div) => {
                  const isHovered = hoveredSlug === div.slug;
                  const isSelected = selectedSlug === div.slug;
                  const isActive = isHovered || (selectedSlug === null && activeSlug === div.slug);

                  return (
                    <button
                      key={div.slug}
                      onMouseEnter={() => setHoveredSlug(div.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      onClick={() => setSelectedSlug(div.slug === selectedSlug ? null : div.slug)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-2xl transition-all duration-300 text-left border relative overflow-hidden group",
                        isActive
                          ? "bg-monsoon-slate text-white border-paddy-gold/50 shadow-lg scale-[1.02] shadow-monsoon-slate/20"
                          : "bg-river-mist/40 text-monsoon-slate border-transparent hover:bg-river-mist hover:border-paddy-gold/30"
                      )}
                    >
                      <div className="min-w-0">
                        <div className={cn(
                          "font-display font-semibold text-sm truncate transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-r from-paddy-gold via-white to-paddy-gold bg-clip-text text-transparent font-extrabold"
                            : "group-hover:bg-gradient-to-r group-hover:from-paddy-gold-dark group-hover:via-amber-600 group-hover:to-paddy-gold-dark group-hover:bg-clip-text group-hover:text-transparent"
                        )}>
                          {div.name}
                        </div>
                        <div className={cn(
                          "text-[11px] truncate transition-colors",
                          isActive ? "text-paddy-gold/90 font-medium" : "text-monsoon-slate/60"
                        )}>
                          {div.bn_name}
                        </div>
                      </div>

                      <span
                        className={cn(
                          "w-3 h-3 rounded-full flex-shrink-0 ml-2 transition-transform group-hover:scale-125 shadow-sm",
                          isActive ? "ring-2 ring-paddy-gold ring-offset-1 ring-offset-monsoon-slate" : ""
                        )}
                        style={{ backgroundColor: div.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

