'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  ShieldCheck, KeyRound, Bug, PackageSearch, Webhook, Lock,
  GitPullRequest, TerminalSquare, Radar, Activity, TrendingDown, TrendingUp,
} from 'lucide-react';
import { SlideUp } from '@/components/ui/MotionWrapper';

/* ────────────────────────── helpers ────────────────────────── */

function formatAgo(seconds: number) {
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

// Animated number that counts up from 0 to `value` once it scrolls into view.
function CountUp({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

/* ────────────────────────── mock live data ────────────────────────── */

type Severity = 'critical' | 'high' | 'medium' | 'low';

const severityStyles: Record<Severity, string> = {
  critical: 'text-red-400 border-red-500/30 bg-red-500/10',
  high: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  medium: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  low: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
};

const threatClasses: { label: string; severity: Severity; count: number; pct: number }[] = [
  { label: 'SQL injection', severity: 'critical', count: 2184, pct: 100 },
  { label: 'Hardcoded secrets', severity: 'critical', count: 1246, pct: 57 },
  { label: 'Vulnerable dependency (CVE)', severity: 'high', count: 987, pct: 45 },
  { label: 'Cross-site scripting (XSS)', severity: 'high', count: 892, pct: 41 },
  { label: 'Insecure deserialization', severity: 'medium', count: 631, pct: 29 },
  { label: 'SSRF', severity: 'medium', count: 214, pct: 10 },
  { label: 'Misconfigured CORS', severity: 'low', count: 118, pct: 5 },
];

const iconFor = (label: string) => {
  if (label.includes('SQL')) return TerminalSquare;
  if (label.includes('secret')) return KeyRound;
  if (label.includes('CVE') || label.includes('dependency')) return PackageSearch;
  if (label.includes('XSS')) return Bug;
  if (label.includes('deserialization')) return Webhook;
  if (label.includes('SSRF')) return Radar;
  return Lock;
};

type FeedEvent = {
  id: number;
  title: string;
  subtitle: string;
  severity: Severity;
  icon: React.ElementType;
  age: number; // seconds, offset from mount — deterministic across server/client
};

const seedEvents: FeedEvent[] = [
  { id: 1, title: 'Critical SQLi blocked before merge', subtitle: 'ecommerce-api · main · SAST', severity: 'critical', icon: TerminalSquare, age: 2 },
  { id: 2, title: 'Hardcoded AWS key detected', subtitle: 'user-service · develop · Secrets scan', severity: 'critical', icon: KeyRound, age: 26 },
  { id: 3, title: 'CVE-2025-4130 patched automatically', subtitle: 'payment-gateway · main · Dependency scan', severity: 'high', icon: PackageSearch, age: 71 },
  { id: 4, title: 'Auth bypass flagged in DAST run', subtitle: 'mobile-app · release/v1.3', severity: 'high', icon: Bug, age: 154 },
  { id: 5, title: 'Insecure deserialization found', subtitle: 'checkout-service · main', severity: 'medium', icon: Webhook, age: 238 },
];

const eventPool: Omit<FeedEvent, 'id' | 'age'>[] = [
  { title: 'Critical SQLi blocked before merge', subtitle: 'ecommerce-api · main · SAST', severity: 'critical', icon: TerminalSquare },
  { title: 'Hardcoded API key detected', subtitle: 'user-service · develop · Secrets scan', severity: 'critical', icon: KeyRound },
  { title: 'Dependency CVE patched automatically', subtitle: 'payment-gateway · main · SCA', severity: 'high', icon: PackageSearch },
  { title: 'Reflected XSS caught pre-deploy', subtitle: 'checkout-service · main · DAST', severity: 'high', icon: Bug },
  { title: 'Open redirect flagged', subtitle: 'auth-service · main · DAST', severity: 'medium', icon: Radar },
  { title: 'AI agent opened a fix PR', subtitle: 'mobile-app · release/v1.3', severity: 'medium', icon: GitPullRequest },
  { title: 'Insecure deserialization found', subtitle: 'ecommerce-api · main · SAST', severity: 'medium', icon: Webhook },
  { title: 'Weak TLS config flagged', subtitle: 'user-service · develop', severity: 'low', icon: Lock },
];

type StatItem = {
  label: string;
  value: React.ReactNode;
  trend: string | null;
  up?: boolean;
  good?: boolean;
  isText?: boolean;
};

const statRow = (blocked: number): StatItem[] => [
  { label: 'Repos protected', value: <><CountUp value={6} />/8</>, trend: null },
  { label: 'Vulnerabilities blocked', value: <CountUp value={blocked} />, trend: '+18%', up: true, good: true },
  { label: 'Open critical findings', value: <CountUp value={3} />, trend: '-41%', up: false, good: true },
  { label: 'Deploy risk score', value: 'Low', trend: '-27%', up: false, good: true, isText: true },
];

/* ────────────────────────── component ────────────────────────── */

export function LiveMonitoring() {
  const [events, setEvents] = useState<FeedEvent[]>(seedEvents);
  const [tick, setTick] = useState(0);
  const [blocked, setBlocked] = useState(6274);
  const nextId = React.useRef(seedEvents.length + 1);
  // Mirror `tick` into a ref so the event-feed interval (below) can read the
  // latest value without needing `tick` in its own dependency array — if it
  // did, the 4.2s interval would get torn down and rebuilt every second by
  // the 1s ticker and would never survive long enough to actually fire.
  const tickRef = React.useRef(0);

  // Tick every second so relative timestamps stay live.
  useEffect(() => {
    const t = setInterval(() => setTick((v) => {
      tickRef.current = v + 1;
      return v + 1;
    }), 1000);
    return () => clearInterval(t);
  }, []);

  // Every few seconds, push a fresh event onto the feed and bump the counter.
  useEffect(() => {
    const i = setInterval(() => {
      const pick = eventPool[Math.floor(Math.random() * eventPool.length)];
      setEvents((prev) => [{ ...pick, id: nextId.current++, age: -tickRef.current }, ...prev].slice(0, 5));
      setBlocked((v) => v + Math.floor(Math.random() * 6) + 1);
    }, 4200);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative rounded-2xl border border-[#1E2235] bg-[#0D0F1C]/80 backdrop-blur-sm overflow-hidden shadow-2xl">
      {/* window chrome header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2235] bg-[#0A0B14]/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2A2F45]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2A2F45]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2A2F45]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            SECFLOW / MONITOR
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          production · live
        </div>
      </div>

      {/* stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1E2235] border-b border-[#1E2235]">
        {statRow(blocked).map((s) => (
          <div key={s.label} className="p-5">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">{s.label}</p>
            <div className="flex items-end gap-2">
              <span className={`font-bold text-white ${s.isText ? 'text-2xl text-emerald-400' : 'text-2xl'}`}>
                {s.value}
              </span>
              {s.trend && (
                <span className={`flex items-center gap-0.5 text-xs font-medium mb-1 ${s.good ? 'text-emerald-400' : 'text-red-400'}`}>
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E2235]">
        {/* left: top threat classes this week */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-sm font-semibold text-white">Top findings this week</h4>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider">Live · auto-triaged</span>
          </div>
          <div className="space-y-4">
            {threatClasses.map((t, i) => {
              const Icon = iconFor(t.label);
              return (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <Icon className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                  <span className="text-xs text-slate-300 w-[168px] flex-shrink-0 truncate">{t.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[#1A1D2B] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        t.severity === 'critical' || t.severity === 'high'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-blue-500/60'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border flex-shrink-0 ${severityStyles[t.severity]}`}>
                    {t.severity}
                  </span>
                  <span className="text-xs text-slate-400 w-12 text-right flex-shrink-0 tabular-nums">{t.count.toLocaleString()}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* right: live event feed */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-sm font-semibold text-white">Recent security events</h4>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 uppercase tracking-wider font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <div className="space-y-1">
            {events.map((e) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 py-2.5 border-b border-[#1A1D2B] last:border-0"
              >
                <div className={`h-7 w-7 rounded-md border flex items-center justify-center flex-shrink-0 ${severityStyles[e.severity]}`}>
                  <e.icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-200 truncate">{e.title}</p>
                  <p className="text-[11px] text-slate-500 truncate">{e.subtitle}</p>
                </div>
                <span className="text-[11px] text-slate-500 flex-shrink-0 tabular-nums">
                  {formatAgo(Math.max(0, tick + e.age))}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom strip stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#1E2235] divide-x divide-[#1E2235]">
        {[
          { icon: Activity, value: '< 2 min', label: 'Time to first scan' },
          { icon: ShieldCheck, value: '0', label: 'Days findings sit unfixed' },
          { icon: PackageSearch, value: '100%', label: 'Repos covered by SCA' },
          { icon: GitPullRequest, value: '1,900+', label: 'Auto-fix PRs opened' },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center gap-1 py-5 text-center px-2">
            <s.icon className="h-4 w-4 text-blue-400 mb-1" />
            <p className="text-base sm:text-lg font-bold text-white">{s.value}</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LiveMonitoringSection() {
  return (
    <SlideUp>
      <LiveMonitoring />
    </SlideUp>
  );
}
