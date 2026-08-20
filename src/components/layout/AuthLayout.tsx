'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

const perks = [
  { icon: '/brand/08_shield_symbol_app.png', text: 'Isolated SAST, DAST & dependency scanning on every push' },
  { icon: 'brain', text: 'AI agents explain every finding and propose the fix' },
  { icon: '/brand/07_infinity_symbol_app_light.png', text: 'Only clean, revalidated builds ever reach production' },
];

/**
 * Shared shell for /sign-in, /sign-up, /forgot-password.
 *
 * On desktop (lg+) this is a two-column composition — an animated brand
 * panel on the left carrying the same visual weight as the landing page,
 * built from the actual SecFlow icon set (shield / cube / infinity), and
 * the form on the right — so the auth flow doesn't read as "a small card
 * dropped onto an empty screen". On mobile it collapses to a single
 * centered column with a compact logo + back-link header.
 */
export function AuthLayout({
  children,
  backHref = '/',
  backLabel = 'Back to home',
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.05fr_1fr] bg-[#0A0B0E]">
      {/* ── Brand panel (desktop only) ── */}
      <div className="hidden lg:flex relative flex-col justify-between overflow-hidden border-r border-[#1E2235] bg-[radial-gradient(ellipse_80%_60%_at_25%_0%,rgba(59,130,246,0.14),transparent)] p-12 xl:p-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,#000_60%,transparent_100%)]" />

        {/* Ambient glow blobs — now slowly drifting instead of static */}
        <motion.div
          className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
          animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Large floating brand mark + orbiting shield/cube icons — sits
            behind the copy, anchored to the right/bottom of the panel so it
            doesn't collide with text on smaller desktop widths. */}
        <motion.div
          className="absolute right-[-40px] top-[46%] -translate-y-1/2 w-[300px] h-[300px] xl:w-[360px] xl:h-[360px] opacity-90 pointer-events-none"
          animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/brand/07_infinity_symbol_app_light.png"
            alt=""
            fill
            sizes="360px"
            className="object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.25)]"
          />
        </motion.div>
        <motion.div
          className="absolute right-[64px] top-[18%] w-14 h-14 pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image src="/brand/08_shield_symbol_app.png" alt="" fill sizes="56px" className="object-contain drop-shadow-lg" />
        </motion.div>
        <motion.div
          className="absolute right-[10px] bottom-[16%] w-12 h-12 pointer-events-none"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <Image src="/brand/09_cube_symbol_app.png" alt="" fill sizes="48px" className="object-contain drop-shadow-lg" />
        </motion.div>

        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <div className="relative h-10 w-44">
              <Image
                src="/brand/logo-wordmark-cropped.png"
                alt="SecFlow"
                fill
                sizes="176px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <h2 className="mt-16 text-3xl xl:text-4xl font-black text-white leading-tight max-w-md">
            Secure every deploy before it ships.
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-sm">
            SecFlow scans, explains, and fixes vulnerabilities automatically — so only clean, revalidated builds ever reach production.
          </p>

          <StaggerContainer className="mt-10 space-y-5" staggerDelay={0.12} delayChildren={0.3}>
            {perks.map((perk) => (
              <StaggerItem key={perk.text}>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 p-1.5">
                    {perk.icon === 'brain' ? (
                      <Brain className="h-4 w-4" />
                    ) : (
                      <div className="relative h-full w-full">
                        <Image src={perk.icon} alt="" fill sizes="24px" className="object-contain" />
                      </div>
                    )}
                  </span>
                  <span className="pt-1.5 leading-relaxed max-w-sm">{perk.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 text-xs text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          214 scans running right now · isolated sandbox v2.4
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="relative flex items-center justify-center p-6 sm:p-10 py-16 overflow-hidden">
        <div className="absolute inset-0 lg:hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] bg-blue-500/8 rounded-full blur-[110px] pointer-events-none lg:hidden" />

        <FadeIn className="w-full max-w-md relative z-10">
          {/* Mobile-only header — desktop shows the logo in the brand panel instead */}
          <div className="mb-8 flex flex-col items-center gap-4 lg:hidden">
            <Link href={backHref} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors self-start">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <Link href="/">
              <div className="relative h-10 w-40">
                <Image src="/brand/logo-wordmark-cropped.png" alt="SecFlow" fill sizes="160px" className="object-contain" priority />
              </div>
            </Link>
          </div>

          {/* Desktop-only back link, above the card */}
          <Link
            href={backHref}
            className="hidden lg:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          {children}
        </FadeIn>
      </div>
    </div>
  );
}
