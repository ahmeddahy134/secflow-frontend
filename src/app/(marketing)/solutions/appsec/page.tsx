'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Zap,
  FileCheck,
  GitBranch,
  SearchCode,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Terminal,
  AlertTriangle,
  Code2,
  Cpu,
  Layers,
  ExternalLink,
  Radar,
  Brain,
  Workflow,
  Lock,
  Play,
  RotateCcw,
  Check,
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
export default function AppSecSolutionPage() {
  // Live scan simulation state
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStep, setScanStep] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [prCreated, setPrCreated] = useState<boolean>(false);

  const scanStepsText = [
    'Analyzing 312 files...',
    'Analyzing dependencies...',
    'Checking security rules...',
    'Prioritizing findings...',
    'Scan completed ✓',
  ];

  // Scan simulation loop
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setScanStep(4);
          setIsScanning(false);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 8;
        const capped = Math.min(next, 100);

        if (capped < 25) setScanStep(0);
        else if (capped < 50) setScanStep(1);
        else if (capped < 75) setScanStep(2);
        else if (capped < 100) setScanStep(3);
        else {
          setScanStep(4);
          setIsScanning(false);
        }
        return capped;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isScanning]);

  const restartScan = () => {
    setScanProgress(0);
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
      active: true,
    },
    {
      id: 'dast',
      title: 'DAST & Dependency SCA',
      desc: 'Test running apps & dependencies.',
      icon: Radar,
      href: '/solutions/dast',
      active: false,
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

  return (
    <div className="flex flex-col min-h-screen bg-[#050914] text-slate-200 overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* ──────────────────────── BACKGROUND GLOWS & PATTERNS ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-[#38BDF8] 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient Top Glows */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
        <div className="absolute top-[60%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
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
            <span className="text-cyan-400 font-medium">AppSec & SAST Scanning</span>
          </nav>

          {/* ──────────────────────── HERO SECTION ──────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <SlideUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  STATIC APPLICATION SECURITY
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  AppSec &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]">
                    SAST Scanning
                  </span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.3}>
                <p className="text-lg sm:text-xl font-medium text-slate-300">
                  Find vulnerabilities early. <br className="hidden sm:inline" />
                  Secure every commit.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl mt-2">
                  Analyze code-level vulnerabilities, hardcoded secrets, and OWASP Top 10 risks directly in your pull requests before code reaches production.
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
                      <span>Documentation</span>
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

            {/* HERO RIGHT COLUMN - PRODUCT DASHBOARD */}
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
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800">
                        <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                        auth_service.py
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
                        Live Scan
                      </div>
                    </div>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed bg-[#050812] border-b border-slate-800/80 overflow-x-auto">
                    <div className="space-y-1 text-slate-400 select-none">
                      <div className="flex items-center">
                        <span className="w-7 text-slate-600 text-right pr-3">23</span>
                        <span className="text-purple-400">def</span>
                        <span className="text-blue-400 ml-1.5">login</span>
                        <span className="text-slate-300">(username, password):</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-7 text-slate-600 text-right pr-3">24</span>
                        <span className="text-slate-300 ml-4">user = get_user(username)</span>
                      </div>

                      {/* Vulnerable Line Highlighted */}
                      <div className="flex items-center bg-red-500/15 border-l-2 border-red-500 px-1 py-1 rounded-r text-red-200">
                        <span className="w-6 text-red-400 font-bold text-right pr-3">25</span>
                        <span className="ml-4 font-semibold">
                          <span className="text-purple-400">if</span> user{' '}
                          <span className="text-purple-400">and</span> user.password == password:
                        </span>
                        <span className="ml-auto text-[10px] bg-red-500/30 text-red-300 px-1.5 py-0.5 rounded border border-red-500/40 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-400" /> Vulnerable
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="w-7 text-slate-600 text-right pr-3">26</span>
                        <span className="text-slate-300 ml-8">token = create_token(user.id)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-7 text-slate-600 text-right pr-3">27</span>
                        <span className="text-purple-400 ml-8">return</span>
                        <span className="text-emerald-400 ml-1">
                          {"{"}&quot;status&quot;: &quot;success&quot;, &quot;token&quot;: token{"}"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scan Progress Bar & Live Status */}
                  <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#070B16]">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300 flex items-center gap-2">
                        <Cpu className={`h-3.5 w-3.5 ${isScanning ? 'text-cyan-400 animate-spin' : 'text-emerald-400'}`} />
                        Scan Progress
                      </span>
                      <span className="text-cyan-400 font-mono font-bold">{scanProgress}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative mb-2">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                        style={{ width: `${scanProgress}%` }}
                        transition={{ ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      {scanStepsText[scanStep]}
                    </p>
                  </div>

                  {/* Findings Breakdown & Top Issue */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#080C1B]">
                    {/* Findings Counter & Badges */}
                    <div className="sm:col-span-7 space-y-3">
                      <div className="flex items-baseline justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Findings Summary</span>
                        <span className="text-xs font-mono font-bold text-cyan-400">128 Total</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-between">
                          <span className="text-[11px] text-red-300 font-medium">Critical</span>
                          <span className="text-xs font-bold text-red-400 font-mono">24</span>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                          <span className="text-[11px] text-orange-300 font-medium">High</span>
                          <span className="text-xs font-bold text-orange-400 font-mono">45</span>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                          <span className="text-[11px] text-amber-300 font-medium">Medium</span>
                          <span className="text-xs font-bold text-amber-400 font-mono">38</span>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                          <span className="text-[11px] text-blue-300 font-medium">Low</span>
                          <span className="text-xs font-bold text-blue-400 font-mono">21</span>
                        </div>
                      </div>
                    </div>

                    {/* Top Issue Card */}
                    <div className="sm:col-span-5 p-3.5 rounded-xl border border-red-500/40 bg-red-500/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Top Issue
                        </div>
                        <p className="text-xs font-bold text-white leading-snug">
                          Insecure Direct Object Reference (IDOR)
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Risk Severity</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                          High Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </section>

          {/* ──────────────────────── FEATURE CARDS SECTION ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-12">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Built for Engineering Teams
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Enterprise AppSec capabilities in every commit
              </h2>
            </SlideUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {/* Feature 1 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Early Detection
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Catch vulnerabilities before production. Scan every pull request automatically.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 2 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Understand risks with clear explanations and automated code fix suggestions.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 3 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Fast Scanning
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Analyze your code in minutes with incremental AST analysis in isolated runners.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 4 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Compliance Ready
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Map findings directly to OWASP Top 10, CWE, and SOC 2 requirements.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all" />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ──────────────────────── HOW IT WORKS SECTION ──────────────────────── */}
          <section className="mb-24 p-8 sm:p-12 rounded-3xl border border-slate-800/80 bg-[#070C1C]/60 backdrop-blur-xl relative overflow-hidden">
            <SlideUp className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Security Workflow
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How it works
              </h2>
            </SlideUp>

            {/* Workflow Steps with Animated Pipeline Line */}
            <div className="relative">
              {/* Connecting glowing line on desktop */}
              <div className="hidden lg:block absolute top-[36px] left-[10%] right-[10%] h-[2px] bg-slate-800">
                <motion.div
                  className="h-full w-24 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] rounded-full"
                  animate={{ x: ['0%', '450%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    step: '1',
                    title: 'Connect',
                    desc: 'Connect your repository in seconds.',
                    icon: GitBranch,
                    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                  },
                  {
                    step: '2',
                    title: 'Scan',
                    desc: 'We analyze your code using advanced rules.',
                    icon: SearchCode,
                    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
                  },
                  {
                    step: '3',
                    title: 'Review',
                    desc: 'Review prioritized findings with context.',
                    icon: FileText,
                    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
                  },
                  {
                    step: '4',
                    title: 'Fix',
                    desc: 'Fix issues and prevent them from coming back.',
                    icon: CheckCircle2,
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
                    <h3 className="text-lg font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                      {item.desc}
                    </p>
                  </SlideUp>
                ))}
              </div>
            </div>
          </section>

          {/* ──────────────────────── EXAMPLE FINDING SECTION ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-12">
              <Badge variant="outline" className="border-red-500/30 text-red-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Real-World Remediation
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Example finding
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                See how SecFlow flags code vulnerabilities and generates immediate verified AI fixes.
              </p>
            </SlideUp>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Side - Vulnerable Code */}
              <SlideUp delay={0.2} className="lg:col-span-6 flex">
                <div className="p-6 rounded-2xl border border-red-500/30 bg-[#0A0D1D] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wider">
                        High Severity
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">OWASP A01</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">CWE-639</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      Insecure Direct Object Reference (IDOR)
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mb-4">
                      File: <span className="text-slate-200">user_controller.py</span> | Line: <span className="text-red-400 font-bold">87</span>
                    </p>

                    {/* Vulnerable Code Block */}
                    <div className="p-4 rounded-xl bg-[#050812] border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                      <div className="text-slate-500"># Vulnerable code snippet</div>
                      <div>user_id = request.GET[&quot;id&quot;]</div>
                      <div className="bg-red-500/20 border-l-2 border-red-500 px-2 py-1 text-red-200 font-semibold my-1 rounded-r">
                        user = User.objects.get(id=user_id) <span className="text-[10px] text-red-400 ml-2">← IDOR Risk</span>
                      </div>
                      <div>return JsonResponse(user.data)</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    ⚠️ Request parameter is queried without ownership verification.
                  </div>
                </div>
              </SlideUp>

              {/* Right Side - AI Recommended Fix */}
              <SlideUp delay={0.4} className="lg:col-span-6 flex">
                <div className="p-6 rounded-2xl border border-emerald-500/40 bg-[#08121B] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4" />
                        Recommended Fix
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                        Verified Patch
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Validate the user&apos;s permission before accessing the requested resource.
                    </p>

                    {/* Corrected Code Block */}
                    <div className="p-4 rounded-xl bg-[#030B10] border border-emerald-500/30 font-mono text-xs text-slate-200 space-y-1 overflow-x-auto">
                      <div className="text-emerald-400/70"># Secure implementation</div>
                      <div className="text-emerald-300 font-semibold">
                        if request.user.can_view(user):
                      </div>
                      <div className="pl-4">user = User.objects.get(id=user_id)</div>
                      <div className="pl-4">return JsonResponse(user.data)</div>
                      <div className="text-purple-400">else:</div>
                      <div className="pl-4 text-red-300">return HttpResponseForbidden()</div>
                    </div>
                  </div>

                  {/* Create Fix PR Button */}
                  <div className="mt-6 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setPrCreated(true)}
                      disabled={prCreated}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 text-xs font-bold text-white rounded-xl transition-all duration-300 cursor-pointer shadow-lg ${
                        prCreated
                          ? 'bg-emerald-600 border border-emerald-400 text-white cursor-default'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/20'
                      }`}
                    >
                      {prCreated ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-200" />
                          <span>PR #142 Created!</span>
                        </>
                      ) : (
                        <>
                          <span>Create Fix PR ✨</span>
                          <Sparkles className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {prCreated && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[11px] text-emerald-400 font-mono flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" /> PR opened in github.com/org/repo
                        </motion.p>
                      )}
                    </AnimatePresence>
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
                      <MetricCounter value={1000} suffix="+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Security Rules
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight mb-2">
                      &lt; 3 min
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Average Scan Time
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight mb-2">
                      <MetricCounter value={40} suffix="+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Supported Languages
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-2">
                      Enterprise
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Ready Security
                    </p>
                  </div>
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
            <Link href="/solutions/appsec" className="text-cyan-400 font-medium">
              AppSec & SAST
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
