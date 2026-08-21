'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, ChevronRight, CheckCircle2, AlertTriangle,
  FileText, Lock, Code, Radar, Network, Key, ExternalLink,
  BookOpen, ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const STANDARDS = [
  {
    id: 'owasp',
    badge: 'OWASP Top 10',
    badgeColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.12)]',
    badgeBg: 'bg-orange-500/10',
    icon: ShieldCheck,
    iconColor: 'text-orange-400',
    title: 'OWASP Top 10 (2021 / 2025)',
    description:
      'The industry-standard awareness document for web application security risks. SecFlow maps every SAST, DAST, and dependency finding to its OWASP category automatically.',
    coverage: 'Full — all 10 categories detected and mapped',
    plans: 'All plans',
    items: [
      { id: 'A01', label: 'Broken Access Control', scanners: ['SAST', 'DAST'] },
      { id: 'A02', label: 'Cryptographic Failures', scanners: ['SAST'] },
      { id: 'A03', label: 'Injection (SQL, Command, LDAP)', scanners: ['SAST', 'DAST'] },
      { id: 'A04', label: 'Insecure Design', scanners: ['SAST'] },
      { id: 'A05', label: 'Security Misconfiguration', scanners: ['SAST', 'DAST'] },
      { id: 'A06', label: 'Vulnerable & Outdated Components', scanners: ['Dependency'] },
      { id: 'A07', label: 'Identification & Authentication Failures', scanners: ['SAST', 'DAST'] },
      { id: 'A08', label: 'Software & Data Integrity Failures', scanners: ['SAST', 'Dependency'] },
      { id: 'A09', label: 'Security Logging & Monitoring Failures', scanners: ['DAST'] },
      { id: 'A10', label: 'Server-Side Request Forgery (SSRF)', scanners: ['DAST'] },
    ],
    reference: 'https://owasp.org/Top10/',
  },
  {
    id: 'cwe',
    badge: 'CWE',
    badgeColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]',
    badgeBg: 'bg-blue-500/10',
    icon: Code,
    iconColor: 'text-blue-400',
    title: 'CWE — Common Weakness Enumeration',
    description:
      'A community-developed list of common software and hardware weakness types. SecFlow attaches a CWE identifier to every SAST and DAST finding so developers have a precise, universally understood classification.',
    coverage: 'CWE ID on every SAST and DAST finding',
    plans: 'All plans',
    items: [
      { id: 'CWE-89',  label: 'SQL Injection',                   scanners: ['SAST'] },
      { id: 'CWE-79',  label: 'Cross-Site Scripting (XSS)',       scanners: ['SAST', 'DAST'] },
      { id: 'CWE-22',  label: 'Path Traversal',                   scanners: ['SAST'] },
      { id: 'CWE-78',  label: 'OS Command Injection',             scanners: ['SAST'] },
      { id: 'CWE-287', label: 'Improper Authentication',          scanners: ['SAST', 'DAST'] },
      { id: 'CWE-798', label: 'Hardcoded Credentials',            scanners: ['SAST', 'Secrets'] },
      { id: 'CWE-502', label: 'Deserialization of Untrusted Data',scanners: ['SAST'] },
      { id: 'CWE-611', label: 'XXE Injection',                    scanners: ['SAST'] },
    ],
    reference: 'https://cwe.mitre.org/',
  },
  {
    id: 'cve',
    badge: 'CVE / NVD',
    badgeColor: 'text-red-400',
    borderColor: 'border-red-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.12)]',
    badgeBg: 'bg-red-500/10',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    title: 'CVE & National Vulnerability Database',
    description:
      'Every dependency vulnerability found by Trivy and OWASP Dependency-Check is directly linked to its CVE identifier in the National Vulnerability Database (NVD), giving developers exact references for patching.',
    coverage: 'CVE ID on all dependency findings; NVD link in report',
    plans: 'All plans',
    items: [
      { id: 'Trivy', label: 'Container & OS CVE detection', scanners: ['Dependency'] },
      { id: 'OWASP DC', label: 'Java / .NET / Node.js / Python package CVEs', scanners: ['Dependency'] },
      { id: 'NVD Link', label: 'Direct link to NVD entry per CVE', scanners: ['Report'] },
      { id: 'SBOM', label: 'CycloneDX-format SBOM export', scanners: ['Report'] },
    ],
    reference: 'https://nvd.nist.gov/',
  },
  {
    id: 'cvss',
    badge: 'CVSS v3.1',
    badgeColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.12)]',
    badgeBg: 'bg-amber-500/10',
    icon: Radar,
    iconColor: 'text-amber-400',
    title: 'CVSS v3.1 — Common Vulnerability Scoring System',
    description:
      'An open framework for communicating the characteristics and severity of software vulnerabilities. SecFlow uses CVSS base scores to classify every dependency CVE into Critical, High, Medium, Low, or Info severity bands.',
    coverage: 'CVSS base score on all dependency CVEs; used for deployment gating',
    plans: 'All plans',
    items: [
      { id: '9.0–10', label: 'Critical — blocks deployment by default', scanners: ['Policy'] },
      { id: '7.0–8.9', label: 'High — configurable deployment block', scanners: ['Policy'] },
      { id: '4.0–6.9', label: 'Medium — warning in report', scanners: ['Policy'] },
      { id: '0.1–3.9', label: 'Low — informational', scanners: ['Policy'] },
      { id: '0.0', label: 'Info — no severity impact', scanners: ['Policy'] },
    ],
    reference: 'https://www.first.org/cvss/',
  },
  {
    id: 'soc2',
    badge: 'SOC 2 Type II',
    badgeColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]',
    badgeBg: 'bg-emerald-500/10',
    icon: FileText,
    iconColor: 'text-emerald-400',
    title: 'SOC 2 Type II — Security Evidence Package',
    description:
      'SecFlow generates structured evidence packages that map scan results and deployment gates to the SOC 2 Trust Services Criteria — specifically the Security (CC) category — so your audits move faster.',
    coverage: 'Evidence package with finding history, remediation timeline & deploy gates',
    plans: 'Pro & Team',
    items: [
      { id: 'CC6.1', label: 'Logical and Physical Access Controls', scanners: ['SAST', 'DAST'] },
      { id: 'CC6.6', label: 'Security Boundaries & Threat Detection', scanners: ['DAST'] },
      { id: 'CC7.1', label: 'System Monitoring', scanners: ['Monitoring'] },
      { id: 'CC7.2', label: 'Anomaly Identification & Response', scanners: ['SAST', 'Secrets'] },
      { id: 'CC8.1', label: 'Change Management Controls', scanners: ['Deploy Gate'] },
    ],
    reference: 'https://www.aicpa.org/soc',
  },
  {
    id: 'iso27001',
    badge: 'ISO 27001',
    badgeColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]',
    badgeBg: 'bg-purple-500/10',
    icon: Lock,
    iconColor: 'text-purple-400',
    title: 'ISO/IEC 27001 — Annex A Control Mapping',
    description:
      'The international standard for Information Security Management Systems. SecFlow maps its scan pipeline and gated deployment controls to the ISO 27001 Annex A control set for organizations pursuing certification.',
    coverage: 'Annex A control mapping in PDF report',
    plans: 'Team plan',
    items: [
      { id: 'A.8.25', label: 'Secure Development Lifecycle', scanners: ['SAST', 'DAST'] },
      { id: 'A.8.26', label: 'Application Security Requirements', scanners: ['SAST', 'DAST'] },
      { id: 'A.8.28', label: 'Secure Coding', scanners: ['SAST'] },
      { id: 'A.8.29', label: 'Security Testing in Development', scanners: ['SAST', 'DAST', 'Dependency'] },
      { id: 'A.8.31', label: 'Separation of Development/Production', scanners: ['Sandbox'] },
      { id: 'A.8.32', label: 'Change Management', scanners: ['Deploy Gate'] },
    ],
    reference: 'https://www.iso.org/standard/82875.html',
  },
  {
    id: 'pci',
    badge: 'PCI DSS v4.0',
    badgeColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]',
    badgeBg: 'bg-cyan-500/10',
    icon: Network,
    iconColor: 'text-cyan-400',
    title: 'PCI DSS v4.0 — Payment Card Industry',
    description:
      'For software teams handling cardholder data, SecFlow covers Requirement 6 (Develop and Maintain Secure Systems and Software) through automated SAST/DAST scanning, dependency CVE detection, and gated deployments.',
    coverage: 'Requirement 6 coverage; findings mapped to PCI DSS controls',
    plans: 'Team plan',
    items: [
      { id: 'Req 6.2', label: 'Bespoke / Custom Software Protection', scanners: ['SAST'] },
      { id: 'Req 6.3', label: 'Security Vulnerabilities Identified & Addressed', scanners: ['SAST', 'Dependency'] },
      { id: 'Req 6.4', label: 'Public-Facing Web Application Protection', scanners: ['DAST'] },
      { id: 'Req 6.5', label: 'Changes to Payment Pages Controlled', scanners: ['Deploy Gate'] },
    ],
    reference: 'https://www.pcisecuritystandards.org/',
  },
  {
    id: 'secrets-compliance',
    badge: 'Secrets Policy',
    badgeColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    glowColor: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.12)]',
    badgeBg: 'bg-rose-500/10',
    icon: Key,
    iconColor: 'text-rose-400',
    title: 'Secrets & Credential Policy',
    description:
      'Hardcoded credentials are one of the most common causes of data breaches. SecFlow scans the full Git history using Gitleaks, detecting 150+ credential patterns across all major cloud and SaaS platforms.',
    coverage: '150+ secret patterns; full git history scan',
    plans: 'All plans',
    items: [
      { id: 'AWS', label: 'AWS Access Keys & Secret Keys', scanners: ['Secrets'] },
      { id: 'GCP', label: 'Google Cloud Service Account Keys', scanners: ['Secrets'] },
      { id: 'Azure', label: 'Azure Client Secrets & SAS Tokens', scanners: ['Secrets'] },
      { id: 'GitHub', label: 'GitHub PATs & OAuth Tokens', scanners: ['Secrets'] },
      { id: 'Stripe', label: 'Stripe API Keys (live & test)', scanners: ['Secrets'] },
      { id: 'JWT', label: 'Hardcoded JWT Secrets', scanners: ['Secrets'] },
    ],
    reference: 'https://github.com/gitleaks/gitleaks',
  },
];

const SCANNER_COLORS: Record<string, string> = {
  SAST:       'bg-blue-500/15 text-blue-300 border-blue-500/30',
  DAST:       'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Dependency: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Secrets:    'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Report:     'bg-slate-500/15 text-slate-300 border-slate-500/30',
  Policy:     'bg-purple-500/15 text-purple-300 border-purple-500/30',
  Monitoring: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Sandbox:    'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  'Deploy Gate': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

// ─── Components ───────────────────────────────────────────────────────────────

function ScannerBadge({ label }: { label: string }) {
  const cls = SCANNER_COLORS[label] ?? 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StandardsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0B14] text-slate-200 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-[clamp(6.5rem,8vw,9rem)]">
        {/* Hero */}
        <section className="relative pb-[clamp(3rem,5vw,6rem)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3rem)] relative z-10 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                SECURITY STANDARDS
              </div>
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tight mb-5 leading-[1.1]">
                Compliance built into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-[#22D3EE]">
                  every scan.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                SecFlow maps every finding across OWASP, CWE, CVE, CVSS, SOC 2, ISO 27001, and PCI DSS automatically.
                Get audit-ready evidence without a single manual cross-reference.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/sign-up" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all">
                  Start scanning free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1E2235] text-slate-300 hover:text-white hover:border-slate-600 text-sm font-semibold transition-all">
                  <BookOpen className="h-4 w-4" />
                  Read the docs
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Coverage matrix summary */}
        <section className="border-y border-[#1E2235] bg-[#0D0F1C] py-8">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3rem)]">
            <SlideUp>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#1E2235]">
                      <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Standard</th>
                      <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scope</th>
                      <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scanners</th>
                      <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2235]">
                    {STANDARDS.map((s) => {
                      const Icon = s.icon;
                      const allScanners = [...new Set(s.items.flatMap((i) => i.scanners))];
                      return (
                        <tr key={s.id} className="hover:bg-[#12141F]/60 transition-colors cursor-pointer" onClick={() => setActiveId(activeId === s.id ? null : s.id)}>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`h-7 w-7 rounded-lg ${s.badgeBg} border ${s.borderColor} flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`h-3.5 w-3.5 ${s.iconColor}`} />
                              </div>
                              <span className={`text-xs font-bold ${s.badgeColor}`}>{s.badge}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-slate-300 text-xs max-w-xs">{s.coverage}</td>
                          <td className="py-3 pr-4">
                            <div className="flex flex-wrap gap-1">
                              {allScanners.map((sc) => <ScannerBadge key={sc} label={sc} />)}
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`text-xs font-semibold ${s.plans === 'All plans' ? 'text-emerald-400' : s.plans === 'Pro & Team' ? 'text-blue-400' : 'text-purple-400'}`}>{s.plans}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Detailed cards */}
        <section className="py-[clamp(3.5rem,6vw,7rem)]">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3rem)]">
            <SlideUp className="text-center mb-14">
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase">
                  <span className="h-px w-6 bg-blue-400/60" />
                  Detailed Coverage
                </div>
              </div>
              <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white leading-tight mb-3">
                What SecFlow detects for each standard
              </h2>
              <p className="text-slate-400 text-base max-w-xl mx-auto">
                Click any card to expand the full control-to-scanner mapping.
              </p>
            </SlideUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.07}>
              {STANDARDS.map((standard) => {
                const Icon = standard.icon;
                const isOpen = activeId === standard.id;
                return (
                  <StaggerItem key={standard.id}>
                    <motion.div
                      layout
                      className={`rounded-2xl border ${standard.borderColor} bg-[#0D0F1C]/80 backdrop-blur-sm overflow-hidden transition-all duration-300 ${standard.glowColor} cursor-pointer`}
                      onClick={() => setActiveId(isOpen ? null : standard.id)}
                    >
                      {/* Card header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-11 w-11 rounded-xl ${standard.badgeBg} border ${standard.borderColor} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`h-5 w-5 ${standard.iconColor}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-bold tracking-wider ${standard.badgeColor} uppercase`}>{standard.badge}</span>
                              <h3 className="text-sm font-bold text-white mt-0.5">{standard.title}</h3>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span className={`text-xs font-semibold ${standard.plans === 'All plans' ? 'text-emerald-400' : standard.plans === 'Pro & Team' ? 'text-blue-400' : 'text-purple-400'}`}>
                              {standard.plans}
                            </span>
                            <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{standard.description}</p>
                      </div>

                      {/* Expanded control list */}
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-[#1E2235]"
                        >
                          <div className="p-6 pt-4 space-y-2">
                            {standard.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-[#1E2235]/60 last:border-0">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 ${standard.iconColor}`} />
                                  <span className={`text-xs font-mono font-bold ${standard.badgeColor} flex-shrink-0`}>{item.id}</span>
                                  <span className="text-xs text-slate-300 truncate">{item.label}</span>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  {item.scanners.map((sc) => <ScannerBadge key={sc} label={sc} />)}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-6 pb-5">
                            <a
                              href={standard.reference}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Official reference
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA section */}
        <section className="border-t border-[#1E2235] bg-[#0D0F1C] py-[clamp(3.5rem,6vw,7rem)]">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3rem)] text-center">
            <FadeIn>
              <div className="max-w-2xl mx-auto">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-7 w-7 text-blue-400" />
                </div>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mb-4">
                  Compliance-ready reports on every scan.
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  Every SecFlow PDF report includes a compliance annex mapping findings to OWASP, CWE, CVE, and CVSS.
                  Pro and Team plans add SOC 2 and ISO 27001 evidence packages — ready to hand to an auditor.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/sign-up" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all">
                    Start for free <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1E2235] text-slate-300 hover:text-white hover:border-slate-600 text-sm font-semibold transition-all">
                    View pricing <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2235] bg-[#0A0B14] py-8">
        <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3rem)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 SecFlow Platform. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/reports" className="hover:text-white transition-colors">Sample Report</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
