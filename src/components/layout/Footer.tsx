import React from 'react';
import Link from 'next/link';

const DESTINATIONS = [
  { label: 'Sundarbans', href: '/destinations/sundarbans' },
  { label: 'Cox\'s Bazar', href: '/destinations/coxs-bazar' },
  { label: 'Sylhet Tea Gardens', href: '/destinations/sylhet-tea-gardens' },
  { label: 'Sajek Valley', href: '/destinations/sajek-valley' },
  { label: 'Saint Martin\'s Island', href: '/destinations/saint-martins-island' },
  { label: 'Bandarban', href: '/destinations/bandarban' },
];

const DIVISIONS = [
  { label: 'Dhaka', href: '/divisions/dhaka' },
  { label: 'Chattogram', href: '/divisions/chittagong' },
  { label: 'Sylhet', href: '/divisions/sylhet' },
  { label: 'Rajshahi', href: '/divisions/rajshahi' },
  { label: 'Khulna', href: '/divisions/khulna' },
  { label: 'Barishal', href: '/divisions/barisal' },
  { label: 'Rangpur', href: '/divisions/rangpur' },
  { label: 'Mymensingh', href: '/divisions/mymensingh' },
];

const CATEGORIES = [
  { label: 'Nature & Wildlife', href: '/categories/forests-wildlife' },
  { label: 'Heritage & Culture', href: '/categories/historical-sites' },
  { label: 'Beaches & Islands', href: '/categories/beaches' },
  { label: 'Hills & Trekking', href: '/categories/hills-mountains' },
];

const ABOUT = [
  { label: 'About Us', href: '/about' },
  // { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="gradient-monsoon text-white pt-16 pb-8 mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 text-paddy-gold">Explore</h3>
            <ul className="space-y-3">
              {DESTINATIONS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:bg-gradient-to-r hover:from-paddy-gold hover:via-white hover:to-paddy-gold hover:bg-clip-text hover:text-transparent transition-all duration-300 text-sm inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 text-paddy-gold">Divisions</h3>
            <ul className="space-y-3">
              {DIVISIONS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:bg-gradient-to-r hover:from-paddy-gold hover:via-white hover:to-paddy-gold hover:bg-clip-text hover:text-transparent transition-all duration-300 text-sm inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 text-paddy-gold">Categories</h3>
            <ul className="space-y-3">
              {CATEGORIES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:bg-gradient-to-r hover:from-paddy-gold hover:via-white hover:to-paddy-gold hover:bg-clip-text hover:text-transparent transition-all duration-300 text-sm inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 text-paddy-gold">Beautiful Bangladesh</h3>
            <ul className="space-y-3">
              {ABOUT.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:bg-gradient-to-r hover:from-paddy-gold hover:via-white hover:to-paddy-gold hover:bg-clip-text hover:text-transparent transition-all duration-300 text-sm inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big Footer Giant Typography - Full text guaranteed 100% visible */}
        <div className="w-full my-6 md:my-10 select-none flex justify-center items-center">
          <svg
            viewBox="0 0 1000 130"
            className="w-full h-auto max-w-full overflow-visible"
            role="img"
            aria-label="BANGLADESH"
          >
            <defs>
              <linearGradient id="bangladeshFooterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A843" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#D4A843" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="98"
              textAnchor="middle"
              fill="url(#bangladeshFooterGrad)"
              className="font-display font-black text-[122px] uppercase transition-all duration-300 hover:opacity-100"
              style={{
                fontFamily: 'var(--font-display), system-ui, sans-serif',
                fontWeight: 900,
                letterSpacing: '0.04em',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
              }}
            >
              BANGLADESH
            </text>
          </svg>
        </div>

        <hr className="border-paddy-gold/30 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            Photos sourced from various sources.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p>Made with ❤️ for Bangladesh by <a href="https://saifsiddiquee.qzz.io" target="_blank" rel="noopener noreferrer" className="text-white hover:text-paddy-gold underline decoration-gray-500">Saif</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
