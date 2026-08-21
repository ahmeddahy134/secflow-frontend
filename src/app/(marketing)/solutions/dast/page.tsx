'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  Radar,
  Globe,
  Package,
  Shield,
  ShieldCheck,
  Zap,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Layers,
  Activity,
  Server,
  Code,
  Terminal,
  ExternalLink,
  Brain,
  Workflow,
  Search,
  Check,
  AlertCircle,
  PackageCheck,
  Cpu,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

/* ──────────────────────── Animated Counter Component ──────────────────────── */
function MetricCounter({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────── Main Page Component ──────────────────────── */
export default function DastSolutionPage() {
  // Live scan simulation state
  const [dastProgress, setDastProgress] = useState<number>(0);
  const [scaProgress, setScaProgress] = useState<number>(0);
  const [scanStep, setScanStep] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const scanStepsText = [
    'Target Connected: https://app.secflow.dev',
    'Discovering Endpoints (248 found)...',
    'Testing HTTP Requests (GET, POST, PUT, DELETE)...',
    'Analyzing Responses & Security Headers...',
    'Scanning 1,426 Package Dependencies...',
    'Generating Vulnerability & SBOM Report...',
    'Scan Completed ✓',
  ];

  // Scan simulation loop
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setDastProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 12) + 8;
      });

      setScaProgress((prev) => {
        if (prev >= 78) return 78;
        return prev + Math.floor(Math.random() * 10) + 7;
      });

      setScanStep((prev) => {
        if (prev >= scanStepsText.length - 2) {
          setIsScanning(false);
          return scanStepsText.length - 1;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isScanning]);

  const restartScan = () => {
    setDastProgress(0);
    setScaProgress(0);
    setScanStep(0);
    setIsScanning(true);
  };

  const solutionsList = [
    {
      id: 'appsec',
      title: 'AppSec & SAST Scanning',
      desc: 'Find vulnerabilities in your code.',
      icon: ShieldCheck,
      href: '/solutions/appsec',
      active: false,
    },
    {
      id: 'dast',
      title: 'DAST & Dependency SCA',
      desc: 'Test running apps & dependencies.',
      icon: Radar,
      href: '/solutions/dast',
      active: true,
    },
    {
      id: 'ai-agent',
      title: 'AI Remediation Agent',
      desc: 'Get fixes & PRs with AI.',
      icon: Brain,
      href: '/solutions/ai-agent',
      active: false,
    },
    {
      id: 'multi-deployment',
      title: 'Multi Deployment',
      desc: 'Secure deployments across every environment.',
      icon: Workflow,
      href: '/solutions/multi-deployment',
      active: false,
    },
  ];

  // Demo Package Table Data
  const dependenciesList = [
    { name: 'express', version: '4.18.2', status: 'Clean', risk: 'Low', cve: '—', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { name: 'axios', version: '1.4.0', status: 'Outdated', risk: 'Medium', cve: 'CVE-2023-45857', statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { name: 'lodash', version: '4.17.21', status: 'Clean', risk: 'Low', cve: '—', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { name: 'jsonwebtoken', version: '8.5.1', status: 'Vulnerable', risk: 'Critical', cve: 'CVE-2022-23529', statusColor: 'text-red-400 bg-red-500/10 border-red-500/30' },
    { name: 'mongoose', version: '6.11.3', status: 'Clean', risk: 'Low', cve: '—', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050914] text-slate-200 overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* ──────────────────────── BACKGROUND GLOWS & PATTERNS ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient Top Glows */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[25%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
      </div>

      {/* ──────────────────────── HEADER ──────────────────────── */}
      <Navbar />

      {/* ──────────────────────── MAIN CONTENT ──────────────────────── */}
      <main className="flex-1 relative z-10 pt-24 sm:pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 max-w-7xl mx-auto">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-400">Solutions</span>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-400 font-medium">DAST & Dependency SCA</span>
          </nav>

          {/* ──────────────────────── HERO SECTION ──────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <SlideUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  RUNTIME SECURITY
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  DAST &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]">
                    Dependency SCA
                  </span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.3}>
                <p className="text-lg sm:text-xl font-medium text-slate-300">
                  Find runtime vulnerabilities. <br className="hidden sm:inline" />
                  Secure every dependency.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl mt-2">
                  Scan live web applications, REST APIs, and third-party dependencies in production and staging environments without impacting performance.
                </p>
              </SlideUp>

              {/* HERO CTA BUTTONS */}
              <SlideUp delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/sign-up">
                    <button
                      type="button"
                      className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)',
                        boxShadow: '0 8px 30px rgba(37, 99, 235, 0.35), 0 0 20px rgba(147, 51, 234, 0.25)',
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/25 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>Start Scanning</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </Link>

                  <Link href="/docs">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold text-slate-200 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-cyan-500/50 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md"
                    >
                      <span>View Documentation</span>
                    </button>
                  </Link>
                </div>
              </SlideUp>

              {/* SOLUTIONS MINI-NAVIGATION */}
              <SlideUp delay={0.5} className="pt-6">
                <div className="p-4 rounded-2xl border border-slate-800/80 bg-[#070B18]/70 backdrop-blur-md space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
                    Explore SecFlow Solutions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {solutionsList.map((sol) => (
                      <Link
                        key={sol.id}
                        href={sol.href}
                        className={`group p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                          sol.active
                            ? 'bg-blue-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                            : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg border flex-shrink-0 ${
                            sol.active
                              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                              : 'bg-slate-800/60 border-slate-700/50 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          <sol.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-semibold truncate ${
                              sol.active ? 'text-cyan-400' : 'text-slate-200 group-hover:text-white'
                            }`}
                          >
                            {sol.title}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sol.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </SlideUp>
            </div>

            {/* HERO RIGHT COLUMN - MAIN SECURITY DASHBOARD */}
            <div className="lg:col-span-6">
              <SlideUp delay={0.3}>
                <div className="relative rounded-2xl border border-[#38BDF8]/30 bg-[#090D1A]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.15)] backdrop-blur-2xl overflow-hidden">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#060913]/80">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/30">
                        <Globe className="h-3.5 w-3.5" />
                        Target: https://app.secflow.dev
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={restartScan}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                        title="Re-run scan animation"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Re-scan
                      </button>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE SECURITY SCAN
                      </div>
                    </div>
                  </div>

                  {/* Dual Scanning Panels */}
                  <div className="p-4 sm:p-5 space-y-4 bg-[#050812] border-b border-slate-800/80">
                    {/* DAST SCAN CARD */}
                    <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white flex items-center gap-2">
                          <Globe className="h-4 w-4 text-cyan-400" />
                          DAST Scan (Dynamic Application Security)
                        </span>
                        <span className="text-cyan-400 font-mono font-bold">{dastProgress}%</span>
                      </div>

                      <div className="h-2.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                          style={{ width: `${dastProgress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>248 endpoints discovered</span>
                        <div className="flex gap-1 text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">GET</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">POST</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">PUT</span>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">DELETE</span>
                        </div>
                      </div>
                    </div>

                    {/* DEPENDENCY SCA CARD */}
                    <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white flex items-center gap-2">
                          <Package className="h-4 w-4 text-purple-400" />
                          Dependency SCA (Software Composition Analysis)
                        </span>
                        <span className="text-purple-400 font-mono font-bold">{scaProgress}%</span>
                      </div>

                      <div className="h-2.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                          style={{ width: `${scaProgress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>

                      <p className="text-[11px] font-mono text-slate-400">
                        1,426 dependencies checked across package manifests
                      </p>
                    </div>

                    {/* Dynamic Scan Status Bar */}
                    <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                        <Cpu className={`h-3.5 w-3.5 ${isScanning ? 'text-cyan-400 animate-spin' : 'text-emerald-400'}`} />
                        {scanStepsText[scanStep]}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Live Telemetry</span>
                    </div>
                  </div>

                  {/* Summary Counters & Risk Breakdown */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#080C1B]">
                    {/* 3 Summary Counters */}
                    <div className="sm:col-span-7 grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                        <p className="text-lg font-black text-white font-mono">248</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Endpoints</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                        <p className="text-lg font-black text-purple-400 font-mono">1,426</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Dependencies</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                        <p className="text-lg font-black text-red-400 font-mono">72</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Findings</p>
                      </div>
                    </div>

                    {/* Risk Summary Badge Grid */}
                    <div className="sm:col-span-5 p-3 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">Risk Summary</span>
                        <span className="text-[10px] text-slate-400 font-mono">72 Total</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
                        <div className="p-1 rounded bg-red-500/10 border border-red-500/30">
                          <p className="text-red-400 font-bold">8</p>
                          <p className="text-[9px] text-red-300">Crit</p>
                        </div>
                        <div className="p-1 rounded bg-orange-500/10 border border-orange-500/30">
                          <p className="text-orange-400 font-bold">21</p>
                          <p className="text-[9px] text-orange-300">High</p>
                        </div>
                        <div className="p-1 rounded bg-amber-500/10 border border-amber-500/30">
                          <p className="text-amber-400 font-bold">43</p>
                          <p className="text-[9px] text-amber-300">Med</p>
                        </div>
                        <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/30">
                          <p className="text-cyan-400 font-bold">0</p>
                          <p className="text-[9px] text-cyan-300">Low</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </section>

          {/* ──────────────────────── DEPENDENCY SCA TABLE SECTION ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-10">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Software Composition Analysis (SBOM)
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Full package manifest visibility
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Scan third-party dependencies, open-source modules, and CVE databases continuously.
              </p>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="rounded-2xl border border-slate-800 bg-[#070C1B]/90 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090D20]">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-bold text-white font-mono">Dependency Scan — package.json</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">1,426 dependencies scanned</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#050814] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-3.5">Package</th>
                        <th className="px-6 py-3.5">Version</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5">Risk Level</th>
                        <th className="px-6 py-3.5">Reference CVE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {dependenciesList.map((dep) => (
                        <tr key={dep.name} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                            <Package className="h-4 w-4 text-slate-500" />
                            {dep.name}
                          </td>
                          <td className="px-6 py-4 text-slate-400">{dep.version}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold ${dep.statusColor}`}>
                              {dep.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold">
                            {dep.risk === 'Critical' && <span className="text-red-400">Critical</span>}
                            {dep.risk === 'Medium' && <span className="text-amber-400">Medium</span>}
                            {dep.risk === 'Low' && <span className="text-emerald-400">Low</span>}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {dep.cve !== '—' ? (
                              <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                {dep.cve}
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-3.5 bg-[#050814] border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
                  +1,421 more dependencies scanned across manifests
                </div>
              </div>
            </SlideUp>
          </section>

          {/* ──────────────────────── FEATURE CARDS SECTION ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-12">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Comprehensive Scanning Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Runtime application & package protection
              </h2>
            </SlideUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {/* Feature 1 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Runtime Testing
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Test your application while it&apos;s running across web routes and API endpoints.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 2 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
                    <Package className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Dependency Intelligence
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Detect vulnerable packages, outdated releases, and known CVE exposures.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 3 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    SBOM Visibility
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Know exactly what&apos;s inside your software with automated Software Bill of Materials exports.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 4 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Continuous Protection
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Scan every release automatically before deploying to production environments.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all" />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ──────────────────────── HOW IT WORKS (PIPELINE WORKFLOW) ──────────────────────── */}
          <section className="mb-24 p-8 sm:p-12 rounded-3xl border border-slate-800/80 bg-[#070C1C]/60 backdrop-blur-xl relative overflow-hidden">
            <SlideUp className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Execution Pipeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How it works
              </h2>
            </SlideUp>

            {/* Workflow Steps with Animated Pipeline Line */}
            <div className="relative">
              {/* Connecting glowing line on desktop */}
              <div className="hidden lg:block absolute top-[36px] left-[8%] right-[8%] h-[2px] bg-slate-800">
                <motion.div
                  className="h-full w-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] rounded-full"
                  animate={{ x: ['0%', '480%'] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {[
                  {
                    step: '1',
                    title: 'Deploy',
                    desc: 'Deploy your application.',
                    icon: Server,
                    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                  },
                  {
                    step: '2',
                    title: 'Discover',
                    desc: 'Discover endpoints and dependencies.',
                    icon: Search,
                    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
                  },
                  {
                    step: '3',
                    title: 'Test',
                    desc: 'Test real requests and responses.',
                    icon: Activity,
                    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
                  },
                  {
                    step: '4',
                    title: 'Analyze',
                    desc: 'Analyze runtime behavior.',
                    icon: Layers,
                    color: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
                  },
                  {
                    step: '5',
                    title: 'Detect',
                    desc: 'Identify security vulnerabilities.',
                    icon: ShieldCheck,
                    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                  },
                ].map((item, index) => (
                  <SlideUp key={item.step} delay={index * 0.1} className="flex flex-col items-center text-center">
                    <div className={`h-16 w-16 rounded-2xl border flex items-center justify-center mb-5 ${item.color} shadow-lg relative`}>
                      <item.icon className="h-7 w-7" />
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white flex items-center justify-center">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[170px]">
                      {item.desc}
                    </p>
                  </SlideUp>
                ))}
              </div>
            </div>
          </section>

          {/* ──────────────────────── SECURITY FINDINGS SECTION (SIDE BY SIDE) ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-12">
              <Badge variant="outline" className="border-red-500/30 text-red-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Telemetry Insights
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Real security findings
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Side-by-side demonstration of DAST runtime vulnerabilities and Dependency SCA CVE exposures.
              </p>
            </SlideUp>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Side - DAST Finding */}
              <SlideUp delay={0.2} className="lg:col-span-6 flex">
                <div className="p-6 rounded-2xl border border-orange-500/30 bg-[#0A0D1D] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 uppercase tracking-wider">
                        High Severity DAST
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">CWE-89</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">OWASP A03</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      SQL Injection
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mb-4">
                      Endpoint: <span className="text-cyan-400 font-semibold">GET /api/users?id=</span>
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      The application is vulnerable to SQL injection through the id parameter in live runtime testing.
                    </p>

                    {/* Request Payload Snippet */}
                    <div className="p-4 rounded-xl bg-[#050812] border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                      <div className="text-slate-500"># HTTP Request Payload</div>
                      <div className="text-blue-400">GET /api/users?id=1&apos; OR &apos;1&apos;=&apos;1 HTTP/1.1</div>
                      <div className="text-slate-400">Host: app.secflow.dev</div>
                      <div className="text-red-400 bg-red-500/20 border-l-2 border-red-500 px-2 py-1 mt-1 rounded-r">
                        Response: 200 OK (SQL error payload reflected)
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    ⚠️ Parameter sanitation missing on endpoint database query.
                  </div>
                </div>
              </SlideUp>

              {/* Right Side - Dependency SCA Finding */}
              <SlideUp delay={0.4} className="lg:col-span-6 flex">
                <div className="p-6 rounded-2xl border border-red-500/40 bg-[#0F0819] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wider">
                        Critical Severity SCA
                      </span>
                      <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20">
                        CVE-2022-23529
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      jsonwebtoken@8.5.1
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mb-4">
                      Package Manifest: <span className="text-slate-200">package.json</span>
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      A vulnerable dependency version was detected allowing secret key bypass during token verification.
                    </p>

                    {/* Dependency Fix Box */}
                    <div className="p-4 rounded-xl bg-[#080310] border border-red-500/30 font-mono text-xs text-slate-200 space-y-1 overflow-x-auto">
                      <div className="text-red-400 font-bold">Vulnerability: Insecure Key Verification</div>
                      <div className="text-slate-400">CVSS v3 Score: 9.8 (Critical)</div>
                      <div className="text-emerald-400 font-bold pt-2">
                        Recommended: Upgrade to jsonwebtoken@9.0.0 or later
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    🔒 High-priority patch available in repository dependency tree.
                  </div>
                </div>
              </SlideUp>
            </div>
          </section>

          {/* ──────────────────────── METRICS SECTION ──────────────────────── */}
          <section className="mb-20">
            <SlideUp>
              <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0A0F24] to-[#060917] shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="text-center p-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight mb-2">
                      <MetricCounter value={1400} suffix="+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Dependencies Scanned
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight mb-2">
                      <MetricCounter value={250} suffix="+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Endpoints Tested
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight mb-2">
                      <MetricCounter value={100} suffix="%" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      SBOM Visibility
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-2">
                      24/7
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Continuous Scanning
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>
          </section>

          {/* ──────────────────────── FINAL CTA SECTION ──────────────────────── */}
          <section className="mb-12">
            <SlideUp>
              <div className="p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#080E24] via-[#090D1F] to-[#100B24] text-center relative overflow-hidden shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  Secure your application before production.
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
                  Scan running applications and dependencies automatically with SecFlow.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/sign-up">
                    <button
                      type="button"
                      className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)',
                        boxShadow: '0 8px 30px rgba(37, 99, 235, 0.35), 0 0 20px rgba(147, 51, 234, 0.25)',
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/25 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>Start Scanning</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </Link>

                  <Link href="/docs">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold text-slate-200 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-cyan-500/50 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md"
                    >
                      <span>View Documentation</span>
                    </button>
                  </Link>
                </div>
              </div>
            </SlideUp>
          </section>
        </div>
      </main>

      {/* ──────────────────────── FOOTER ──────────────────────── */}
      <footer className="border-t border-slate-800/80 bg-[#040711] py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-28 opacity-80">
              <Image
                src="/brand/01_secflow_wordmark_horizontal.png"
                alt="SecFlow"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[11px] text-slate-500">
              © 2026 SecFlow Platform. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/solutions/appsec" className="hover:text-cyan-400 transition-colors">
              AppSec & SAST
            </Link>
            <Link href="/solutions/dast" className="text-cyan-400 font-medium">
              DAST & SCA
            </Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-cyan-400 transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
