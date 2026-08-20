'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RefreshCcw, CheckCircle2, ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function RevalidationPage() {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const revalidations = [
    { name: 'SQL Injection Remediation Check', target: '/app/controllers/userController.py', before: 'Critical', after: 'Passed', duration: '1.2s' },
    { name: 'AWS Credentials Rotation Verification', target: '/config/aws.js', before: 'High', after: 'Passed', duration: '0.8s' },
    { name: 'Package lodash Dependency Audit', target: '/package.json', before: 'High', after: 'Passed', duration: '2.1s' },
  ];

  return (
    <FadeIn className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <RefreshCcw className="h-6 w-6 text-emerald-400" /> Security Revalidation
          </h1>
          <p className="text-sm text-slate-400 mt-1">Post-remediation security test execution & regression checking</p>
        </div>
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/20"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Revalidating...' : 'Run Revalidation'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Revalidation Status</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-400">Passed</span>
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Last run 5 min ago</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Coverage Ratio</p>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-slate-400 mt-1">37 / 37 fixed issues tested</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Regressions Detected</p>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-emerald-400 mt-1">Clean bill of health</p>
          </CardContent>
        </Card>
      </div>

      <SlideUp delay={0.1}>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Before vs After Verification Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StaggerContainer className="space-y-3" staggerDelay={0.1}>
              {revalidations.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-border)] gap-3">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{item.target}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-semibold">{item.before}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">{item.after}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{item.duration}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </CardContent>
        </Card>
      </SlideUp>
    </FadeIn>
  );
}
