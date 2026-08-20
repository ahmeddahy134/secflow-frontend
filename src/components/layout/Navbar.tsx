'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Radar,
  Brain,
  Workflow,
  FileText,
  BookOpen,
  Activity,
  History,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: 'solutions' | 'resources';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'platform', label: 'Platform', href: '/#platform' },
  { id: 'features', label: 'Features', href: '/#features' },
  { id: 'solutions', label: 'Solutions', href: '/#solutions', hasDropdown: true, dropdownType: 'solutions' },
  { id: 'how-it-works', label: 'How it Works', href: '/#how-it-works' },
  { id: 'pricing', label: 'Pricing', href: '/#pricing' },
  { id: 'resources', label: 'Resources', href: '/docs', hasDropdown: true, dropdownType: 'resources' },
];

const SOLUTIONS_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'AppSec & SAST Scanning',
    desc: 'Static code analysis in isolated sandboxes',
    href: '/solutions/appsec',
  },
  {
    icon: Radar,
    title: 'DAST & Dependency SCA',
    desc: 'Dynamic security testing & SBOM analysis',
    href: '/solutions/dast',
  },
  {
    icon: Brain,
    title: 'AI Remediation Agent',
    desc: 'Automated code fixes & pull requests',
    href: '/solutions/ai-agent',
  },
  {
    icon: Workflow,
    title: 'Multi Deployment',
    desc: 'Secure deployments across every environment',
    href: '/solutions/multi-deployment',
  },
];

const RESOURCES_ITEMS = [
  {
    icon: BookOpen,
    title: 'Documentation',
    desc: 'Guides, setup instructions & CLI tools',
    href: '/docs',
  },
  {
    icon: FileText,
    title: 'Security Reports',
    desc: 'Sample CVE, CWE & compliance PDF exports',
    href: '/reports',
  },
  {
    icon: Activity,
    title: 'AI Intelligence',
    desc: 'Live vulnerability telemetry dashboard',
    href: '/ai-intelligence',
  },
  {
    icon: History,
    title: 'Audit Logs',
    desc: 'Full record of scans, overrides & deploys',
    href: '/audit-log',
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'resources' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize hash state on mount, route changes, hashchange & scroll
  useEffect(() => {
    const syncLocationState = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '');
        setCurrentHash(hash);
      }
    };

    syncLocationState();

    window.addEventListener('hashchange', syncLocationState);
    window.addEventListener('popstate', syncLocationState);

    return () => {
      window.removeEventListener('hashchange', syncLocationState);
      window.removeEventListener('popstate', syncLocationState);
    };
  }, [pathname]);

  // Handle scroll detection for navbar glow and dynamic section hash detection on landing page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // When on homepage, update active section based on scroll position if no explicit click hash is active
      if (pathname === '/') {
        const sections = ['platform', 'features', 'solutions', 'how-it-works', 'more-features'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              if (sectionId === 'solutions' || sectionId === 'platform') {
                setCurrentHash(sectionId);
              } else if (sectionId === 'features' || sectionId === 'how-it-works') {
                setCurrentHash(sectionId);
              }
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Determine active item derived directly from current route & hash
  const getActiveItemId = (): string => {
    if (pathname === '/pricing') {
      return 'pricing';
    }
    if (pathname.startsWith('/solutions')) {
      return 'solutions';
    }
    if (
      pathname === '/docs' ||
      pathname.startsWith('/reports') ||
      pathname.startsWith('/ai-intelligence') ||
      pathname.startsWith('/audit-log')
    ) {
      return 'resources';
    }
    if (pathname === '/') {
      if (currentHash === 'features') return 'features';
      if (currentHash === 'solutions') return 'solutions';
      if (currentHash === 'how-it-works') return 'how-it-works';
      if (currentHash === 'pricing') return 'pricing';
      if (currentHash === 'resources') return 'resources';
      return 'platform';
    }
    return 'platform';
  };

  const activeItemId = getActiveItemId();

  const handleMouseEnter = (dropdownType?: 'solutions' | 'resources') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (dropdownType) {
      setActiveDropdown(dropdownType);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (itemId: string, href: string) => {
    const hash = href.includes('#') ? href.split('#')[1] : '';
    setCurrentHash(hash);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 w-full px-4 sm:px-6 max-w-[1340px] mx-auto transition-all duration-300">
      {/* Outer Floating Glass Pillar */}
      <div
        className={`relative flex items-center justify-between h-[72px] px-5 sm:px-7 rounded-xl border transition-all duration-300 ${
          scrolled
            ? 'bg-[#12141F]/95 border-[#1E2235]/80 shadow-[0_0_35px_rgba(34,211,238,0.15)] backdrop-blur-xl'
            : 'bg-[#12141F]/80 border-[#1E2235]/60 shadow-[0_0_25px_rgba(59,130,246,0.1)] backdrop-blur-md'
        }`}
      >
        {/* Soft bottom gradient highlight */}
        <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/80 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
        {/* 1. Logo Left */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0 group relative z-10"
          onClick={() => handleLinkClick('platform', '/#platform')}
        >
          <div className="relative h-10 w-[155px] sm:w-[170px]">
            <Image
              src="/brand/logo-wordmark-cropped.png"
              alt="SecFlow"
              fill
              sizes="170px"
              className="object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </Link>

        {/* 2. Navigation Links Center (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 relative">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItemId === item.id;
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.dropdownType)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  onClick={() => handleLinkClick(item.id, item.href)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[14px] font-medium transition-all duration-250 ease-out select-none group ${
                    isActive
                      ? 'text-[#22D3EE] font-semibold'
                      : 'text-slate-300 hover:text-[#22D3EE] hover:-translate-y-[1px]'
                  }`}
                >
                  <span>{item.label}</span>

                  {item.hasDropdown && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeDropdown === item.dropdownType
                          ? 'rotate-180 text-[#22D3EE]'
                          : 'text-slate-400 group-hover:text-[#22D3EE]'
                      }`}
                    />
                  )}

                  {/* Active Sliding Horizontal Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-[-10px] left-0 right-0 h-[3px] rounded-full"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Dropdown Menu Popover */}
                {item.hasDropdown && activeDropdown === item.dropdownType && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 p-2 rounded-xl bg-[#12141F]/95 border border-[#1E2235] shadow-xl backdrop-blur-2xl z-50"
                    >
                      <div className="space-y-1">
                        {(item.dropdownType === 'solutions' ? SOLUTIONS_ITEMS : RESOURCES_ITEMS).map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => handleLinkClick(item.id, subItem.href)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all group"
                          >
                            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-[#22D3EE] group-hover:bg-blue-500/20 transition-colors flex-shrink-0 mt-0.5">
                              <subItem.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white group-hover:text-[#22D3EE] transition-colors">
                                {subItem.title}
                              </p>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{subItem.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* 3. Actions Right (Sign In & Get Started) */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <Link
            href="/sign-in"
            className="text-[14px] font-medium text-slate-300 hover:text-[#22D3EE] transition-colors duration-200"
          >
            Sign In
          </Link>

          <Link href="/sign-up" className="group">
            <button
              type="button"
              className="relative inline-flex items-center justify-center gap-2 h-[44px] px-6 text-[14px] font-medium text-white rounded-[16px] transition-all duration-250 ease-out hover:-translate-y-[1px] cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.28), 0 0 15px rgba(147, 51, 234, 0.2)',
              }}
            >
              {/* Button inner hover shimmer glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle (below lg) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl border border-[#1E2235] bg-[#12141F]/80 text-slate-200 hover:text-white hover:border-blue-500/50 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden mt-3 p-5 rounded-xl bg-[#12141F]/95 border border-[#1E2235] shadow-2xl backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleLinkClick(item.id, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-500/15 border border-cyan-500/30 text-[#22D3EE] font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#1E2235] flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-medium text-slate-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 h-11 text-sm font-medium text-white rounded-xl shadow-lg cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
