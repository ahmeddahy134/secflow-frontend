'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-canvas)] text-slate-200 overflow-x-hidden">
      {/* HEADER */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-8 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-12">
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Predictable plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">every security engineering scale</span>.
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Choose the right plan to secure your repository pipelines, automate AI code fixes, and deploy with complete confidence.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-xs sm:text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}`}>Monthly Billing</span>
              <button
                role="switch"
                aria-checked={billingCycle === 'yearly'}
                aria-label="Toggle annual billing discount"
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-12 items-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] p-1 transition-colors cursor-pointer"
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-blue-500 transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs sm:text-sm flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-slate-400'}`}>
                Yearly Billing
                <Badge variant="success" className="text-[10px] uppercase font-bold">Save 20%</Badge>
              </span>
            </div>
          </SlideUp>

          {/* Pricing Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch mb-20" staggerDelay={0.1}>
            {/* Starter */}
            <StaggerItem className="flex">
              <Card className="bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all flex flex-col w-full">
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Starter</h3>
                  <p className="text-xs text-slate-400 mb-4">Ideal for open-source & individual devs</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {[
                      'Public repositories only',
                      'Basic SAST scanning',
                      'Standard PDF reports',
                      '3 scans included per month',
                      'Community support'
                    ].map(f => (
                      <li key={f} className="flex items-center gap-3 text-xs text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button variant="outline" className="w-full mt-auto text-xs">Get Started Free</Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Pro */}
            <StaggerItem className="flex">
              <Card className="bg-gradient-to-b from-[var(--color-card-hover)] to-[var(--color-card)] border-purple-500/50 ring-2 ring-purple-500/30 shadow-xl shadow-purple-500/10 relative flex flex-col w-full transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                  Most Popular
                </div>
                <CardContent className="p-8 pt-10 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                  <p className="text-xs text-blue-400 mb-4 font-medium">For growing engineering teams</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === 'yearly' ? '$23' : '$29'}
                    </span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {[
                      'Private & public repositories',
                      'Full suite (SAST, DAST, SCA, Secrets)',
                      'Priority execution queue',
                      'AI Auto-Fix Agent included',
                      'Gated AWS deployment integration',
                      '100 scans per month'
                    ].map(f => (
                      <li key={f} className="flex items-center gap-3 text-xs text-white font-medium">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs shadow-lg shadow-blue-500/25 mt-auto">
                      Start Pro Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Enterprise */}
            <StaggerItem className="flex">
              <Card className="bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all flex flex-col w-full">
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Enterprise</h3>
                  <p className="text-xs text-slate-400 mb-4">For security & compliance at scale</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === 'yearly' ? '$79' : '$99'}
                    </span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {[
                      'Everything in Pro',
                      'Unlimited team members & RBAC',
                      'Custom compliance rules & policy enforcement',
                      'Dedicated cloud runner infrastructure',
                      'Audit logging & SOC2 ready',
                      'Unlimited scans'
                    ].map(f => (
                      <li key={f} className="flex items-center gap-3 text-xs text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button variant="outline" className="w-full mt-auto text-xs">Contact Sales</Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
            {[
              { q: 'How does SecFlow execute scans safely?', a: 'SecFlow provisions ephemeral, isolated sandbox containers for every scan. Your code never runs in a shared runtime.' },
              { q: 'Can I upgrade or downgrade anytime?', a: 'Yes! You can change plans at any point. Upgrades take effect immediately, while downgrades apply at the end of your billing cycle.' },
              { q: 'How does the AI Auto-Fix agent work?', a: 'When vulnerabilities are detected, our AI agent generates clean, tested remediation diffs and opens Pull Requests directly to your repository for review.' },
            ].map((faq, i) => (
              <Card key={i} className="bg-[var(--color-card)] border-[var(--color-border)]">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-white text-sm mb-1.5 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-28 opacity-70">
              <Image 
                src="/brand/01_secflow_wordmark_horizontal.png" 
                alt="SECFlow" 
                fill 
                className="object-contain object-left" 
              />
            </div>
            <span className="text-[11px] text-slate-500">© 2026 SECFlow Platform. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">App Platform</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
