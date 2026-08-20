'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  Cloud,
  Server,
  ShieldCheck,
  Lock,
  GitBranch,
  Search,
  Rocket,
  Check,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Layers,
  Cpu,
  ExternalLink,
  Shield,
  Radar,
  Brain,
  Activity,
  Globe,
  Database,
  Sliders,
  Sparkles,
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
export default function MultiDeploymentSolutionPage() {
  // Pipeline simulation state
  const [pipelinePhase, setPipelinePhase] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Simulation sequence
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setPipelinePhase((prev) => {
        if (prev >= 4) {
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const restartPipeline = () => {
    setPipelinePhase(0);
    setIsSimulating(true);
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
      active: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050914] text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
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
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[25%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      {/* ──────────────────────── HEADER ──────────────────────── */}
      <Navbar />

      {/* ──────────────────────── MAIN CONTENT ──────────────────────── */}
      <main className="flex-1 relative z-10 pt-6 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 max-w-7xl mx-auto">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-400">Solutions</span>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-400 font-medium">Multi Deployment</span>
          </nav>

          {/* ──────────────────────── HERO SECTION ──────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <SlideUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  SECURE DEPLOYMENTS
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  Multi{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]">
                    Deployment
                  </span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.3}>
                <p className="text-lg sm:text-xl font-medium text-slate-300">
                  Secure, automate, and deploy across every environment.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl mt-2">
                  Deploy securely across multiple environments with automated security gates and continuous validation.
                </p>
              </SlideUp>

              {/* HERO CTA BUTTONS & BENEFITS */}
              <SlideUp delay={0.4}>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-4">
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
                        <span>See It in Action</span>
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

                  {/* 3 HERO BENEFITS */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" /> Multi-Environment
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <CheckCircle2 className="h-4 w-4" /> Security Gates
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Automated & Safe
                    </span>
                  </div>
                </div>
              </SlideUp>

              {/* EXPLORE SECFLOW SOLUTIONS MINI-NAV */}
              <SlideUp delay={0.5} className="pt-4">
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
                            ? 'bg-blue-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
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

            {/* HERO RIGHT COLUMN - DEPLOYMENT PIPELINE DASHBOARD */}
            <div className="lg:col-span-6">
              <SlideUp delay={0.3}>
                <div className="relative rounded-2xl border border-cyan-500/30 bg-[#090D1A]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-2xl overflow-hidden">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#060913]/80">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-cyan-400" />
                        DEPLOY SECURELY EVERYWHERE
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={restartPipeline}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                        title="Re-run pipeline simulation"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Re-run
                      </button>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </div>
                    </div>
                  </div>

                  {/* Visual Pipeline Layout */}
                  <div className="p-5 space-y-4 bg-[#050812] border-b border-slate-800/80">
                    {/* Top Row: Repository & Scan Cards */}
                    <div className="grid grid-cols-2 gap-3 relative">
                      {/* Code Repository Card */}
                      <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <GitBranch className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Code Repository</p>
                          <p className="text-[10px] font-mono text-slate-400">main (9d010fe)</p>
                        </div>
                      </div>

                      {/* Security Scan Card */}
                      <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <Search className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Security Scan</p>
                            <p className="text-[10px] font-mono text-emerald-400">Completed ✓</p>
                          </div>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                    </div>

                    {/* Animated Arrow Connector */}
                    <div className="flex justify-center my-1">
                      <div className="h-6 w-[2px] bg-gradient-to-b from-cyan-400 to-purple-500 relative">
                        <motion.div
                          className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] -translate-x-[3px]"
                          animate={{ y: [0, 20] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        />
                      </div>
                    </div>

                    {/* SECURITY GATE CENTERPIECE CARD */}
                    <div className="p-4 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 shadow-[0_0_25px_rgba(34,211,238,0.15)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-black tracking-widest text-white uppercase">SECURITY GATE</p>
                          <p className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> All checks passed ✓ (0 Critical, 0 High)
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        GATE PASSED
                      </span>
                    </div>

                    {/* Animated Arrow Connector branching into 4 */}
                    <div className="flex justify-center my-1">
                      <div className="h-6 w-[2px] bg-gradient-to-b from-purple-500 to-emerald-400 relative">
                        <motion.div
                          className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] -translate-x-[3px]"
                          animate={{ y: [0, 20] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        />
                      </div>
                    </div>

                    {/* 4 DEPLOYMENT TARGETS GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {/* AWS Target */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1 hover:border-cyan-500/40 transition-colors">
                        <div className="h-8 w-8 mx-auto rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                          <Cloud className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-white">AWS</p>
                        <p className="text-[9px] text-slate-400 line-clamp-1">Amazon Web</p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
                        </span>
                      </div>

                      {/* Azure Target */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1 hover:border-blue-500/40 transition-colors">
                        <div className="h-8 w-8 mx-auto rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Globe className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-white">Azure</p>
                        <p className="text-[9px] text-slate-400 line-clamp-1">MS Azure</p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
                        </span>
                      </div>

                      {/* Kubernetes Target */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1 hover:border-purple-500/40 transition-colors">
                        <div className="h-8 w-8 mx-auto rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          <Layers className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-white">Kubernetes</p>
                        <p className="text-[9px] text-slate-400 line-clamp-1">K8s Cluster</p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
                        </span>
                      </div>

                      {/* On-Prem Target */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1 hover:border-emerald-500/40 transition-colors">
                        <div className="h-8 w-8 mx-auto rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Server className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-white">On-Prem</p>
                        <p className="text-[9px] text-slate-400 line-clamp-1">On-Premise</p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DEPLOYMENT STATUS PANEL */}
                  <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#080C1B]">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-cyan-400 font-mono">128</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Deployments</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-emerald-400 font-mono">98%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Success Rate</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-purple-400 font-mono">2m 14s</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Avg. Time</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-emerald-400 font-mono">0</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Blocked Risks</p>
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
                Enterprise Deployment Controls
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Secure every deployment pipeline
              </h2>
            </SlideUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {/* Feature 1 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Multi-Environment
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Deploy across different environments from one unified pipeline.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 2 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Security Gates
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Block vulnerable builds and risky code before it reaches production.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 3 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Automated Validation
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Continuously validate and enforce security across every deployment.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 4 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Centralized Control
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Manage deployment security and policies from a single control plane.
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
                Deployment Flow
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How it works
              </h2>
            </SlideUp>

            {/* 4-Step Pipeline with Animated Line */}
            <div className="relative">
              {/* Connecting glowing line on desktop */}
              <div className="hidden lg:block absolute top-[36px] left-[12%] right-[12%] h-[2px] bg-slate-800">
                <motion.div
                  className="h-full w-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] rounded-full"
                  animate={{ x: ['0%', '420%'] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    step: '1',
                    title: 'Connect',
                    desc: 'Connect your repository and environments.',
                    icon: GitBranch,
                    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                  },
                  {
                    step: '2',
                    title: 'Scan',
                    desc: 'Analyze every build for security risks.',
                    icon: Search,
                    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
                  },
                  {
                    step: '3',
                    title: 'Validate',
                    desc: 'Apply security gates before deployment.',
                    icon: ShieldCheck,
                    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
                  },
                  {
                    step: '4',
                    title: 'Deploy',
                    desc: 'Deploy safely to target environments.',
                    icon: Rocket,
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

              <div className="text-center mt-10 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> ✓ Deployment Ready across AWS, Azure, Kubernetes & On-Prem
              </div>
            </div>
          </section>

          {/* ──────────────────────── METRICS / TRUST SECTION ──────────────────────── */}
          <section className="mb-20">
            <SlideUp>
              <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0A0F24] to-[#060917] shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                  <div className="text-center p-4">
                    <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight mb-2">
                      Multiple
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Deployment Targets
                    </p>
                    <p className="text-[11px] text-slate-400">
                      AWS, Azure, Kubernetes, On-Prem &amp; more
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 lg:pt-4">
                    <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight mb-2">
                      <MetricCounter value={100} suffix="%" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Security Validation
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Every deployment passes security gates
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 lg:pt-4">
                    <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight mb-2">
                      24/7
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Continuous Protection
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Always-on monitoring &amp; enforcement
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 lg:pt-4">
                    <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-2">
                      <MetricCounter value={1} />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Centralized Pipeline
                    </p>
                    <p className="text-[11px] text-slate-400">
                      One pipeline for all your environments
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
                  Deploy securely across every environment.
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
                  Let SecFlow handle security so you can ship faster with confidence.
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
                      <span>Start Deploying Securely</span>
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
            <Link href="/solutions/dast" className="hover:text-cyan-400 transition-colors">
              DAST & SCA
            </Link>
            <Link href="/solutions/ai-agent" className="hover:text-cyan-400 transition-colors">
              AI Remediation Agent
            </Link>
            <Link href="/solutions/multi-deployment" className="text-cyan-400 font-medium">
              Multi Deployment
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
