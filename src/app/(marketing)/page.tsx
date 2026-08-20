'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  CheckCircle2, GitBranch, Shield, FileText, Lock,
  Brain, Radar, Workflow, ShieldCheck, Plus, Menu, X,
  Wrench, Rocket, KeyRound, Users, Webhook, Code2, Sparkles,
} from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';
import { LiveMonitoringSection } from '@/components/marketing/LiveMonitoring';
import { ComplianceMarquee } from '@/components/marketing/ComplianceMarquee';
import { Navbar } from '@/components/layout/Navbar';
import { ScannerHub } from '@/components/marketing/ScannerHub';

// Section wrapper — every section shares the same max-width container so the
// page stays visually aligned at every breakpoint (nav, hero, features,
// pricing, and footer never drift to different widths).
function Section({
  id,
  children,
  className = '',
  bg = 'bg-transparent',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <section id={id} className={`py-[clamp(3.5rem,6vw,7rem)] relative ${bg} ${className}`}>
      <div className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,4vw,3rem)] relative z-10">
        {children}
      </div>
    </section>
  );
}

// Small uppercase "— LABEL" eyebrow used above every section heading,
// matching the reference visual language (thin dash + tracked caps).
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">
      <span className="h-px w-6 bg-blue-400/60" />
      {children}
    </div>
  );
}

const faqs = [
  {
    q: 'Does SecFlow need access to my source code?',
    a: 'SecFlow clones your repository into an isolated, network-restricted sandbox for the duration of the scan only. Nothing is retained outside of the scan artifacts and generated reports you choose to keep.',
    icon: Code2,
  },
  {
    q: 'What scan types does SecFlow run?',
    a: 'Every scan runs static analysis (SAST), dependency and container scanning (SCA), dynamic testing against a running build (DAST), and secrets detection — in parallel, inside the sandbox.',
    icon: Radar,
  },
  {
    q: 'Will SecFlow slow down my deployment pipeline?',
    a: 'No. Scans run in parallel isolated containers and typically complete in under two minutes for a mid-sized service. Deployment only gates on scans you explicitly mark as blocking.',
    icon: Rocket,
  },
  {
    q: 'How does the AI remediation actually work?',
    a: 'For each finding, SecFlow\u2019s AI agent explains the risk in plain language, proposes a concrete code fix, and can open a pull request directly against your branch for review.',
    icon: Brain,
  },
  {
    q: 'Can I deploy to my own AWS account?',
    a: 'Yes. Pro and Team plans support gated deployment to your connected AWS account behind an Application Load Balancer, with health checks and rollback built in.',
    icon: Workflow,
  },
  {
    q: 'Do you support self-hosted or on-prem scanning?',
    a: 'Self-hosted scanning runners are available on the Team plan for organizations that need code to never leave their own network perimeter.',
    icon: Lock,
  },
];

function FaqItem({
  q, a, icon: Icon, isOpen, onToggle,
}: { q: string; a: string; icon: React.ElementType; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#1E2235]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          <span className={`flex-shrink-0 h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
            isOpen ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 'border-[#1E2235] text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30'
          }`}>
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
            {q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-shrink-0 h-7 w-7 rounded-full border border-[#1E2235] flex items-center justify-center text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      {/* Grid-rows 0fr → 1fr trick: animates smoothly to intrinsic ("auto")
          height with a plain CSS transition, no JS height measurement and
          no layout jump on fast toggles. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-11 text-sm text-slate-400 leading-relaxed max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  { href: '#platform', label: 'Platform' },
  { href: '#features', label: 'Features' },
  { href: '#more-features', label: 'More' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0B14] text-slate-200 overflow-x-hidden">
      {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
      <Navbar />

      {/* ═══════════════════════ MAIN CONTENT ═══════════════════════ */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-[clamp(8.5rem,10vw,11.5rem)] pb-[clamp(3.5rem,6vw,7rem)] overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,4vw,3rem)] relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-16">
            {/* Left Column: Text Content */}
            <StaggerContainer className="text-center lg:text-left" staggerDelay={0.15}>
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 backdrop-blur-sm shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  LIVE · 214 scans running right now
                </div>
              </StaggerItem>

              <StaggerItem>
                {/* Fluid clamp() instead of a hard jump straight to text-6xl at the
                    lg breakpoint — the fixed column is only ~45% of the container,
                    so a flat 60px heading forced 3 aggressive wraps at common
                    desktop widths (1366–1440px) and read as oversized. Scaling
                    continuously with viewport width keeps it proportionate at
                    every size while still reaching full impact past ~1700px. */}
                <h1 className="text-[clamp(2.25rem,3.6vw,3.75rem)] font-black text-white tracking-tight mb-6 leading-[1.08]">
                  Scan every repo.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#22D3EE]">
                    Deploy the ones that pass.
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  SecFlow is an AI-powered DevSecOps platform that runs isolated SAST, DAST, and dependency analysis on every repository, explains what it finds, fixes it, and only deploys the builds that pass.
                </p>
              </StaggerItem>

              <StaggerItem className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-full w-full shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                    <GitBranch className="h-5 w-5 flex-shrink-0" />
                    <span>Connect a repo</span>
                  </Button>
                </Link>
                <Link href="/reports" className="w-full sm:w-auto">
                  <Button variant="outline" className="h-12 px-8 rounded-full border-slate-700 hover:bg-slate-800 text-white w-full backdrop-blur-sm flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span>View a sample report</span>
                  </Button>
                </Link>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mt-8 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5 text-purple-400" /> AI-Powered Agents</span>
                  <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-blue-400" /> End-to-End Security</span>
                  <span className="flex items-center gap-1.5"><Workflow className="h-3.5 w-3.5 text-emerald-400" /> Continuous Protection</span>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column: Brand illustration, contained within its own grid column */}
            <FadeIn delay={0.25} duration={0.8} className="relative w-full flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Small floating security icon chips orbiting the illustration */}
              <motion.div
                className="hidden sm:flex absolute top-4 left-2 lg:-left-4 items-center gap-2 rounded-lg border border-[#1E2235] bg-[#12141F]/90 backdrop-blur-xl px-3 py-2 shadow-xl z-10"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium text-slate-300">SAST passed</span>
              </motion.div>
              <motion.div
                className="hidden sm:flex absolute top-1/3 right-0 lg:-right-6 items-center gap-2 rounded-lg border border-[#1E2235] bg-[#12141F]/90 backdrop-blur-xl px-3 py-2 shadow-xl z-10"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Radar className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[11px] font-medium text-slate-300">DAST running</span>
              </motion.div>
              <div className="relative w-full max-w-[clamp(300px,34vw,480px)] aspect-square mx-auto lg:mx-0">
                <Image
                  src="/images/landing/hero-illustration-2.png"
                  alt="SecFlow AI-powered DevSecOps pipeline — AppSec, CloudOps, DevSecOps, and Pentest working together"
                  fill
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating status badge, anchored inside the visual column only */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex items-center gap-2.5 rounded-xl border border-[#1E2235] bg-[#12141F]/90 backdrop-blur-xl px-4 py-3 shadow-2xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">0 Critical Issues</p>
                  <p className="text-slate-500">Isolated sandbox · v2.4</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ COMPLIANCE MARQUEE ═══════════════════════ */}
        <ComplianceMarquee />

        {/* ═══════════════════════ LIVE MONITORING ═══════════════════════ */}
        <Section id="monitoring" bg="bg-[#0A0B14]" className="relative overflow-hidden">
          {/* ambient floating glows for extra motion in this section */}
          <motion.div
            className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none"
            animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"
            animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <SlideUp className="mb-12 text-center">
            <div className="flex justify-center">
              <Eyebrow>Live Monitoring</Eyebrow>
            </div>
            <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-black text-white leading-[1.15] mb-4">
              See every finding the moment it happens.
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A live view into what SecFlow is catching across your repositories right now — vulnerability
              classes, severity, and the auto-fix pipeline working behind the scenes.
            </p>
          </SlideUp>

          <LiveMonitoringSection />
        </Section>

        {/* ═══════════════════════ 4-ICON FEATURE STRIP ═══════════════════════ */}
        <Section id="features" bg="bg-[#0D0F1C]" className="border-y border-[#1E2235]">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: '/brand/09_cube_symbol_app.png', title: 'Isolated Sandboxes', sub: 'Every run in a clean container' },
              { icon: '/brand/08_shield_symbol_app.png', title: 'Full-Spectrum', sub: 'SAST · DAST · Dependencies' },
              { icon: FileText, title: 'Readable Reports', sub: 'PDF with CVE, CWE & CVSS' },
              { icon: Lock, title: 'Gated Deploys', sub: 'Only when code is 100% clean' },
            ].map((feat) => (
              <StaggerItem key={feat.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.5)' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#1E2235] bg-[#12141F]/80 backdrop-blur-sm h-full"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 p-2">
                    {typeof feat.icon === 'string' ? (
                      <div className="relative h-full w-full">
                        <Image src={feat.icon} alt="" fill sizes="32px" className="object-contain" />
                      </div>
                    ) : (
                      <feat.icon className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feat.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{feat.sub}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <SlideUp delay={0.2} className="mt-20 sm:mt-32 relative z-20">
            <ScannerHub />
          </SlideUp>
        </Section>

        {/* ═══════════════════════ PLATFORM — 2x2 STAT FEATURE GRID ═══════════════════════ */}
        <Section id="platform" bg="bg-[#0A0B14]">
          <div id="solutions" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14">
            <SlideUp>
              <Eyebrow>The Platform</Eyebrow>
              <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-black text-white leading-[1.15]">
                Real security response, <br className="hidden md:block" />not just a findings list.
              </h2>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-base text-slate-400 leading-relaxed lg:mt-16">
                SecFlow doesn&apos;t just flag vulnerabilities — it explains the risk, proposes the fix, and revalidates the code before it&apos;s allowed anywhere near production.
              </p>
            </SlideUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#1E2235] rounded-xl overflow-hidden" staggerDelay={0.1}>
            {[
              { icon: Brain, stat: 'AI-Driven', statLabel: 'Every Finding', title: 'AI-powered risk explanation', desc: 'Every finding is explained in plain language with real impact, not a raw scanner ID, so any engineer can triage it.' },
              { icon: Radar, stat: 'Real-Time', statLabel: 'Sandbox Telemetry', title: 'Continuous scan visibility', desc: 'Watch SAST, DAST, dependency, and secrets scans progress live inside an isolated, network-restricted sandbox.' },
              { icon: Workflow, stat: '0', statLabel: 'Config Files Needed', title: 'Zero-config pipeline', desc: 'Connect a repository and SecFlow generates the scan and deployment pipeline automatically — no YAML required.' },
              { icon: ShieldCheck, stat: '10+', statLabel: 'Frameworks Mapped', title: 'Compliance-ready reports', desc: 'Findings map to OWASP, CWE, CVE, and CVSS out of the box, so audit season starts and ends the same week.' },
            ].map((item) => (
              <StaggerItem key={item.title} className="border-r border-b border-[#1E2235] p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-9 w-9 rounded-lg bg-[#12141F] border border-[#1E2235] flex items-center justify-center text-blue-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{item.stat}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">{item.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        {/* ═══════════════════════ PIPELINE STEPS ═══════════════════════ */}
        <Section id="how-it-works" bg="bg-[#0D0F1C]" className="border-y border-[#1E2235]">
          <SlideUp className="mb-16">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-black text-white leading-[1.15]">From Code to Cloud. Secured by AI.</h2>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative" staggerDelay={0.1}>
            {/* Connector line spans exactly from the 1st to the 6th icon's
                horizontal center. With 6 equal columns, each icon center sits
                at (2n-1)/12 of the grid width, so the line starts/ends at
                1/12 (8.3333%) from each edge — this scales correctly at any
                viewport instead of relying on a fixed-pixel offset. */}
            <div className="hidden lg:block absolute top-8 left-[8.3333%] right-[8.3333%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 overflow-visible">
              {/* Traveling pulse that sweeps the length of the pipeline on loop */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {[
              { num: '01', title: 'Submit Repo', desc: 'Connect Git repository', icon: GitBranch },
              { num: '02', title: 'Analyze & Scan', desc: 'SAST & DAST scanning', icon: Radar },
              { num: '03', title: 'AI Intelligence', desc: 'Prioritize security risks', icon: Brain },
              { num: '04', title: 'Auto Fix', desc: 'AI fixes vulnerabilities', icon: Wrench },
              { num: '05', title: 'Build & Deploy', desc: 'Gated cloud deployment', icon: Rocket },
              { num: '06', title: 'Monitor', desc: 'Continuous audit loop', icon: ShieldCheck },
            ].map((step) => (
              <StaggerItem key={step.num} className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-16 h-16 rounded-full bg-[#12141F] border-2 border-[#1E2235] flex items-center justify-center mb-4 shadow-xl hover:border-blue-500 transition-colors cursor-default group"
                >
                  <step.icon className="h-6 w-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#0D0F1C] border border-[#1E2235] flex items-center justify-center text-[9px] font-bold text-slate-500">
                    {step.num}
                  </span>
                </motion.div>
                <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-400">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        {/* ═══════════════════════ MORE FEATURES — BENTO GRID ═══════════════════════ */}
        <Section id="more-features" bg="bg-[#0A0B14]">
          <SlideUp className="mb-14 text-center">
            <div className="flex justify-center">
              <Eyebrow>More under the hood</Eyebrow>
            </div>
            <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-black text-white leading-[1.15] mb-4">
              Everything a security team actually needs.
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Beyond scanning — the workflow tooling that gets findings fixed and keeps auditors happy.
            </p>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {[
              {
                icon: KeyRound, title: 'Secrets detection',
                desc: 'Catches hardcoded API keys, tokens, and credentials before they ever reach a commit history.',
              },
              {
                icon: '/brand/05_cube_architecture_symbol.png', title: 'Dependency graph & SBOM',
                desc: 'A full software bill of materials for every build, with transitive dependencies mapped to known CVEs.',
              },
              {
                icon: '/brand/08_shield_symbol_app.png', title: 'Compliance mapping',
                desc: 'Findings map automatically to OWASP Top 10, CWE, CVSS, SOC 2, and ISO 27001 controls.',
              },
              {
                icon: Users, title: 'Team RBAC & audit trail',
                desc: 'Fine-grained roles per repository, plus a full audit log of every scan, override, and deploy.',
              },
              {
                icon: Webhook, title: 'Slack, Jira & webhooks',
                desc: 'Route critical findings straight into the tools your team already triages work in.',
              },
              {
                icon: Sparkles, title: 'AI-generated fix PRs',
                desc: 'The agent doesn\u2019t just explain a finding — it opens a reviewable pull request with the patch.',
              },
            ].map((feat) => (
              <StaggerItem key={feat.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative h-full p-6 rounded-xl border border-[#1E2235] bg-[#12141F]/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-2xl transition-colors duration-300 pointer-events-none" />
                  <div className="relative h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 p-2.5">
                    {typeof feat.icon === 'string' ? (
                      <div className="relative h-full w-full">
                        <Image src={feat.icon} alt="" fill sizes="28px" className="object-contain" />
                      </div>
                    ) : (
                      <feat.icon className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        {/* ═══════════════════════ FAQ SECTION ═══════════════════════ */}
        <Section bg="bg-[#0A0B14]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <SlideUp className="lg:col-span-1">
              <Eyebrow>FAQs</Eyebrow>
              <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-black text-white leading-tight mb-4">
                The questions security teams actually ask us.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pulled from real conversations that happen before a team adopts SecFlow.
              </p>
            </SlideUp>

            <SlideUp delay={0.1} className="lg:col-span-2">
              <div className="border-t border-[#1E2235]">
                {faqs.map((faq, i) => (
                  <FaqItem
                    key={faq.q}
                    q={faq.q}
                    a={faq.a}
                    icon={faq.icon}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </SlideUp>
          </div>
        </Section>

        {/* ═══════════════════════ PRICING SECTION ═══════════════════════ */}
        <Section id="pricing" bg="bg-[#0D0F1C]" className="border-t border-[#1E2235]">
          <SlideUp className="text-center mb-16">
            <div className="flex justify-center">
              <Eyebrow>Pricing</Eyebrow>
            </div>
            <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-black text-white mb-4">Simple pricing.</h2>
            <p className="text-lg text-slate-400 mb-8">Start free. Pay for what you ship.</p>

            {/* Monthly / Yearly toggle */}
            <div className="inline-flex items-center gap-1 bg-[#12141F] border border-[#1E2235] rounded-full p-1">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Save 20%
                </span>
              </button>
            </div>
          </SlideUp>

          {/* Equal height grid container, centered within the global container */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch" staggerDelay={0.2}>
            {/* Starter */}
            <StaggerItem className="flex">
              <Card className="bg-[#12141F] border-[#1E2235] hover:border-slate-700 transition-all flex flex-col w-full">
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">3 scans included</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Public repos only', 'Basic SAST scans', 'PDF reports'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="w-full bg-[#1A1D2B] hover:bg-[#2A2F45] text-white mt-auto">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Pro Card — Floating Badge positioned absolute -top-3 ONLY relative to this card container */}
            <StaggerItem className="flex">
              <Card className="bg-gradient-to-b from-[#1A1D2B] to-[#12141F] border-purple-500/50 ring-2 ring-purple-500/40 shadow-xl shadow-purple-500/10 relative flex flex-col w-full transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                  Most Popular
                </div>
                <CardContent className="p-8 pt-10 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">
                      ${billingCycle === 'monthly' ? '29' : '23'}
                    </span>
                    <span className="text-slate-500">/month</span>
                    {billingCycle === 'yearly' && (
                      <div className="text-xs text-emerald-400 font-medium mt-1">Billed $276/year</div>
                    )}
                  </div>
                  <p className="text-sm text-blue-400 mb-6 font-medium">100 scans / month</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['All scan types (SAST, DAST, SCA)', 'Priority execution queue', 'Advanced PDF & HTML reports', 'Gated AWS deployment'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white font-medium">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 mt-auto">
                      Start Pro
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Team */}
            <StaggerItem className="flex">
              <Card className="bg-[#12141F] border-[#1E2235] hover:border-slate-700 transition-all flex flex-col w-full">
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Team</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">
                      ${billingCycle === 'monthly' ? '99' : '79'}
                    </span>
                    <span className="text-slate-500">/month</span>
                    {billingCycle === 'yearly' && (
                      <div className="text-xs text-emerald-400 font-medium mt-1">Billed $948/year</div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-6">Unlimited scans</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Everything in Pro', 'Unlimited team access', 'Audit logs & RBAC', 'Custom compliance rules'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="w-full bg-[#1A1D2B] hover:bg-[#2A2F45] text-white mt-auto">Start Team</Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </Section>
      </main>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t border-[#1E2235] bg-[#0A0B14] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,4vw,3rem)] flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative h-9 w-36 opacity-80">
              <Image
                src="/brand/logo-wordmark-cropped.png"
                alt="SecFlow"
                fill
                sizes="144px"
                className="object-contain object-left"
              />
            </div>
            <span className="text-xs text-slate-500">© 2026 SecFlow Platform. All rights reserved.</span>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
