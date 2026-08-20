'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  AlertTriangle,
  Code,
  FileCheck,
  GitPullRequest,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Layers,
  Cpu,
  ExternalLink,
  Shield,
  Workflow,
  Radar,
  Minus,
  Plus,
  FileText,
  Zap,
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
export default function AiAgentSolutionPage() {
  // AI Workflow simulation states
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [prCreated, setPrCreated] = useState<boolean>(false);

  const stepStatusMessages = [
    'Security finding detected in user_controller.py',
    'Analyzing vulnerability & repository code context...',
    'Generating secure parameterized query fix...',
    'Reviewing code diff against AST & OWASP rules...',
    'Fix generated ✓ Pull Request #142 ready for review ✓',
  ];

  // AI Workflow loop simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 15) + 10;
      });

      setActiveStep((prev) => {
        if (prev >= 5) {
          setIsSimulating(false);
          return 5;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const restartSimulation = () => {
    setActiveStep(1);
    setProgress(0);
    setIsSimulating(true);
    setPrCreated(false);
  };

  const handleCreatePR = () => {
    setPrCreated(true);
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
      active: true,
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
    <div className="flex flex-col min-h-screen bg-[#050914] text-slate-200 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* ──────────────────────── BACKGROUND GLOWS & PATTERNS ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#8B5CF6 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient Top Glows */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/20 via-cyan-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
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
            <span className="text-purple-400 font-medium">AI Remediation Agent</span>
          </nav>

          {/* ──────────────────────── HERO SECTION ──────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <SlideUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  AI-POWERED REMEDIATION
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  AI Remediation{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]">
                    Agent
                  </span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.3}>
                <p className="text-lg sm:text-xl font-medium text-slate-300">
                  Turn security findings into production-ready fixes.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl mt-2">
                  SecFlow doesn&apos;t just find vulnerabilities. It uses AI to understand code context, generate secure patches, validate changes, and create pull requests.
                </p>
              </SlideUp>

              {/* HERO CTA BUTTONS & BENEFITS */}
              <SlideUp delay={0.4}>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="#action-demo">
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
                    </a>

                    <Link href="/docs">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold text-slate-200 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-purple-500/50 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md"
                      >
                        <span>View Documentation</span>
                      </button>
                    </Link>
                  </div>

                  {/* 3 SMALL BENEFITS */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> AI-Powered Fixes
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" /> Context-Aware
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <CheckCircle2 className="h-4 w-4" /> PR-Ready
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
                            ? 'bg-purple-500/10 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                            : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg border flex-shrink-0 ${
                            sol.active
                              ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                              : 'bg-slate-800/60 border-slate-700/50 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          <sol.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-semibold truncate ${
                              sol.active ? 'text-purple-400' : 'text-slate-200 group-hover:text-white'
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

            {/* HERO RIGHT COLUMN - AI REMEDIATION WORKFLOW DASHBOARD */}
            <div className="lg:col-span-6">
              <SlideUp delay={0.3}>
                <div className="relative rounded-2xl border border-purple-500/30 bg-[#090D1A]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-2xl overflow-hidden">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#060913]/80">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs font-mono text-purple-400 font-bold tracking-wider uppercase flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        AI REMEDIATION WORKFLOW
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={restartSimulation}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-purple-400 transition-colors cursor-pointer"
                        title="Restart simulation"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Re-run
                      </button>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[11px] font-semibold">
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                        Live Agent
                      </div>
                    </div>
                  </div>

                  {/* Horizontal 5-Step Agent Pipeline */}
                  <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#050812] relative overflow-hidden">
                    {/* Animated Connection Line */}
                    <div className="hidden sm:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-slate-800">
                      <motion.div
                        className="h-full w-20 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(168,85,247,0.8)] rounded-full"
                        animate={{ x: ['0%', '350%'] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative z-10">
                      {[
                        { num: 1, title: 'Finding Detected', icon: AlertTriangle, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
                        { num: 2, title: 'AI Analyzing', icon: Brain, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
                        { num: 3, title: 'Fix Generated', icon: Code, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
                        { num: 4, title: 'Code Review', icon: FileCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
                        { num: 5, title: 'Create PR', icon: GitPullRequest, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
                      ].map((step) => {
                        const isActive = activeStep >= step.num;
                        const isCurrent = activeStep === step.num;
                        return (
                          <div
                            key={step.num}
                            className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${
                              isCurrent
                                ? `${step.color} shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-105`
                                : isActive
                                ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                                : 'bg-slate-900/30 border-slate-800 text-slate-600'
                            }`}
                          >
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center mb-1">
                              <step.icon className={`h-4 w-4 ${isCurrent ? 'animate-bounce' : ''}`} />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Step {step.num}</span>
                            <span className="text-[11px] font-bold tracking-tight line-clamp-1">{step.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Remediation Progress Bar & File Details */}
                  <div className="p-4 sm:p-5 space-y-3 bg-[#070B18] border-b border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        Remediation Progress
                      </span>
                      <span className="text-purple-400 font-mono font-bold">
                        {progress >= 92 ? '92%' : `${progress}%`}
                      </span>
                    </div>

                    <div className="h-2.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: 'easeOut' }}
                      />
                    </div>

                    <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                        Analyzing file: <span className="text-white font-semibold">user_controller.py</span>
                      </span>
                      <span className="text-emerald-400 font-semibold text-[11px]">
                        {progress >= 92 ? 'Remediation Complete ✓' : 'In Progress...'}
                      </span>
                    </div>
                  </div>

                  {/* Remediation Metrics Grid */}
                  <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#080C1B]">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-emerald-400 font-mono">24</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Findings Resolved</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-purple-400 font-mono">8</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Files Modified</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xl font-black text-cyan-400 font-mono">98%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence Score</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xs font-bold font-mono">
                        <span className="text-red-400">High</span> → <span className="text-emerald-400">Low</span>
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Risk Reduced</p>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </section>

          {/* ──────────────────────── MAIN SECURITY FINDING & AI FIX SECTION ──────────────────────── */}
          <section id="action-demo" className="mb-24">
            <SlideUp className="text-center mb-10">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Interactive Fix Demonstration
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Security finding → AI fix → Pull request
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                See how SecFlow detects vulnerabilities and generates reviewable code patches automatically.
              </p>
            </SlideUp>

            {/* 3-Column Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT PANEL: SECURITY FINDING */}
              <SlideUp delay={0.2} className="lg:col-span-4 flex">
                <div className="p-6 rounded-2xl border border-red-500/30 bg-[#0A0D1D] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-red-400" /> SECURITY FINDING
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                        High Severity
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">SQL Injection</h3>

                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">CWE-89</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">OWASP A03</span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono mb-2">
                      File: <span className="text-slate-200">user_controller.py</span> (Line 42)
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      The application constructs SQL queries using user-controlled input without parameterization.
                    </p>

                    {/* Vulnerable Code Snippet */}
                    <div className="p-4 rounded-xl bg-[#050812] border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                      <div className="text-slate-500">def get_user():</div>
                      <div className="pl-4 text-slate-400">user_id = request.GET[&quot;id&quot;]</div>
                      <div className="pl-4 text-red-400 bg-red-500/20 border-l-2 border-red-500 px-2 py-0.5 rounded-r">
                        query = &quot;SELECT * FROM users WHERE id=&quot; + user_id
                      </div>
                      <div className="pl-4 text-slate-400">user = db.execute(query)</div>
                      <div className="pl-4 text-slate-400">return jsonify(user)</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                    🔴 Vulnerable to unauthenticated remote database extraction.
                  </div>
                </div>
              </SlideUp>

              {/* CENTER PANEL: AI GENERATED FIX */}
              <SlideUp delay={0.3} className="lg:col-span-5 flex">
                <div className="p-6 rounded-2xl border border-purple-500/40 bg-[#0B081A] flex flex-col justify-between w-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-purple-400" /> AI GENERATED FIX
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        Code Diff
                      </span>
                    </div>

                    {/* Code Diff Display */}
                    <div className="p-4 rounded-xl bg-[#050812] border border-slate-800 font-mono text-xs space-y-1.5 overflow-x-auto mb-4">
                      <div className="text-slate-500"># user_controller.py diff</div>
                      <div className="flex items-center text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                        <Minus className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span>query = &quot;SELECT * FROM users WHERE id=&quot; + user_id</span>
                      </div>
                      <div className="flex items-center text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span>query = &quot;SELECT * FROM users WHERE id=%s&quot;</span>
                      </div>
                      <div className="flex items-center text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span>user = db.execute(query, (user_id,))</span>
                      </div>
                    </div>

                    {/* AI Explanation Box */}
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1">
                      <p className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Brain className="h-3.5 w-3.5" /> AI Explanation
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Use parameterized queries to prevent SQL injection. The user input is now safely passed to the database driver instead of being concatenated into SQL.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Checked against AST security patterns.
                  </div>
                </div>
              </SlideUp>

              {/* RIGHT PANEL: FIX SUMMARY & PR ACTION */}
              <SlideUp delay={0.4} className="lg:col-span-3 flex">
                <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#070D1F] flex flex-col justify-between w-full shadow-xl">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-cyan-400" /> FIX SUMMARY
                    </span>

                    {/* Circular Confidence Score */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-black text-cyan-400 font-mono">98%</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence Score</p>
                      </div>
                      <div className="h-10 w-10 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                        <Check className="h-5 w-5 text-cyan-400" />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                        <span className="text-slate-400">Risk Reduced</span>
                        <span className="font-bold"><span className="text-red-400">High</span> → <span className="text-emerald-400">Low</span></span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                        <span className="text-slate-400">Files Changed</span>
                        <span className="font-bold text-white">2</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                        <span className="text-slate-400">Lines Changed</span>
                        <span className="font-bold text-white">6</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                        <span className="text-slate-400">Similar Fixes</span>
                        <span className="font-bold text-purple-400">12 found</span>
                      </div>
                    </div>
                  </div>

                  {/* Create Pull Request Interactive CTA */}
                  <div className="pt-4 space-y-2">
                    <button
                      type="button"
                      onClick={handleCreatePR}
                      className="w-full group relative inline-flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                      style={{
                        background: prCreated
                          ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)',
                        boxShadow: prCreated
                          ? '0 8px 30px rgba(16, 185, 129, 0.35)'
                          : '0 8px 30px rgba(37, 99, 235, 0.35)',
                      }}
                    >
                      <GitPullRequest className="h-4 w-4" />
                      <span>{prCreated ? 'Pull Request #142 Created! ✨' : 'Create Pull Request →'}</span>
                    </button>

                    {prCreated && (
                      <div className="text-center pt-1">
                        <span className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 cursor-pointer">
                          <ExternalLink className="h-3 w-3 text-cyan-400" /> Open in GitHub
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </SlideUp>
            </div>
          </section>

          {/* ──────────────────────── FEATURE CARDS SECTION ──────────────────────── */}
          <section className="mb-24">
            <SlideUp className="text-center mb-12">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Core Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Designed for developer workflow
              </h2>
            </SlideUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {/* Feature 1 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    AI-Powered Fixes
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Generate accurate, secure fixes directly from real security findings without manual code rewriting.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 2 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Context-Aware
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Understand your codebase, framework patterns, and package dependencies for precise patches.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 3 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Safe Code Changes
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Every fix is reviewed and validated against AST rules before you merge to master.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all" />
                </div>
              </StaggerItem>

              {/* Feature 4 */}
              <StaggerItem>
                <div className="group relative p-6 rounded-2xl border border-slate-800 bg-[#070C1B]/80 hover:bg-[#0A1024] hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full card-hover">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                    <GitPullRequest className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Pull Request Ready
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Automatically create clean, reviewable pull requests in your GitHub or GitLab repositories.
                  </p>
                  <div className="mt-6 h-[2px] w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all" />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ──────────────────────── HOW IT WORKS (WORKFLOW PIPELINE) ──────────────────────── */}
          <section className="mb-24 p-8 sm:p-12 rounded-3xl border border-slate-800/80 bg-[#070C1C]/60 backdrop-blur-xl relative overflow-hidden">
            <SlideUp className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
                Autonomous Pipeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How it works
              </h2>
            </SlideUp>

            {/* Workflow Steps with Animated Particle Line */}
            <div className="relative">
              {/* Connecting glowing line on desktop */}
              <div className="hidden lg:block absolute top-[36px] left-[8%] right-[8%] h-[2px] bg-slate-800">
                <motion.div
                  className="h-full w-24 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 shadow-[0_0_15px_rgba(168,85,247,0.8)] rounded-full"
                  animate={{ x: ['0%', '480%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {[
                  { step: '1', title: 'Detect', desc: 'We detect vulnerabilities in your code.', icon: AlertTriangle, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
                  { step: '2', title: 'Analyze', desc: 'AI understands the issue and code context.', icon: Brain, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
                  { step: '3', title: 'Fix', desc: 'AI generates a secure fix.', icon: Code, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
                  { step: '4', title: 'Review', desc: 'Review and validate the changes.', icon: FileCheck, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
                  { step: '5', title: 'PR', desc: 'Create a pull request with one click.', icon: GitPullRequest, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
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

              <div className="text-center mt-10 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> ✓ Fix ready for review & automated PR merge
              </div>
            </div>
          </section>

          {/* ──────────────────────── METRICS SECTION ──────────────────────── */}
          <section className="mb-20">
            <SlideUp>
              <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0A0F24] to-[#060917] shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="text-center p-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight mb-2">
                      <MetricCounter value={95} suffix="%+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Fix Accuracy
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight mb-2">
                      <MetricCounter value={80} suffix="%" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Time Saved
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-2">
                      <MetricCounter value={10000} suffix="+" />
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Fixes Generated
                    </p>
                  </div>

                  <div className="text-center p-4 pt-8 sm:pt-4">
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight mb-2">
                      Teams
                    </p>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Trusted by Security Teams
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>
          </section>

          {/* ──────────────────────── FINAL CTA SECTION ──────────────────────── */}
          <section className="mb-12">
            <SlideUp>
              <div className="p-8 sm:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-[#080E24] via-[#090D1F] to-[#100B24] text-center relative overflow-hidden shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  Turn security findings into secure code.
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
                  Let SecFlow analyze, fix, and prepare your security changes automatically.
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
                      <span>Start Remediation</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </Link>

                  <Link href="/docs">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold text-slate-200 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-purple-500/50 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md"
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
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="/solutions/appsec" className="hover:text-purple-400 transition-colors">
              AppSec & SAST
            </Link>
            <Link href="/solutions/dast" className="hover:text-purple-400 transition-colors">
              DAST & SCA
            </Link>
            <Link href="/solutions/ai-agent" className="text-purple-400 font-medium">
              AI Remediation Agent
            </Link>
            <Link href="/pricing" className="hover:text-purple-400 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-purple-400 transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
