'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileNav } from './MobileNav';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-4',
          isScrolled ? 'glass-header bg-white/80' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-display text-2xl font-extrabold bg-clip-text text-transparent transition-all duration-300 tracking-tight",
              isScrolled
                ? "bg-gradient-to-r from-paddy-gold-dark via-monsoon-slate to-paddy-gold-dark"
                : "bg-gradient-to-r from-paddy-gold via-white to-paddy-gold drop-shadow-md"
            )}
          >
            Bangladesh Tour
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold transition-all duration-300 relative py-1.5 group',
                    isActive
                      ? isScrolled
                        ? 'bg-gradient-to-r from-paddy-gold-dark via-amber-600 to-paddy-gold-dark bg-clip-text text-transparent font-extrabold'
                        : 'bg-gradient-to-r from-paddy-gold via-white to-paddy-gold bg-clip-text text-transparent font-extrabold drop-shadow-sm'
                      : isScrolled
                        ? 'text-monsoon-slate hover:bg-gradient-to-r hover:from-paddy-gold-dark hover:via-amber-600 hover:to-paddy-gold-dark hover:bg-clip-text hover:text-transparent'
                        : 'text-white/90 hover:bg-gradient-to-r hover:from-paddy-gold hover:via-white hover:to-paddy-gold hover:bg-clip-text hover:text-transparent'
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 transform scale-x-0 group-hover:scale-x-100',
                      isScrolled
                        ? 'bg-gradient-to-r from-paddy-gold-dark via-amber-500 to-paddy-gold-dark'
                        : 'bg-gradient-to-r from-paddy-gold via-white to-paddy-gold',
                      isActive ? 'scale-x-100 opacity-100' : 'opacity-80'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              className={cn(
                'p-2 rounded-full focus-ring transition-colors',
                isScrolled ? 'text-monsoon-slate hover:bg-black/5' : 'text-white hover:bg-white/10'
              )}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            <button
              className={cn(
                'md:hidden p-2 rounded-full focus-ring transition-colors',
                isScrolled ? 'text-monsoon-slate hover:bg-black/5' : 'text-white hover:bg-white/10'
              )}
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
