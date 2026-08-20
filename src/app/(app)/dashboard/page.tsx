'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { Badge } from '@/components/ui/Badge';
import { Shield, Bug, Scan, Bot, Wrench, CheckCircle2, GitBranch, Cloud, ArrowUpRight, ArrowDownRight, ExternalLink, Activity } from 'lucide-react';
import { mockDashboardStats, mockFindings, mockSecurityPipeline, mockRecentPipelines } from '@/data/mock-data';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function DashboardPage() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <FadeIn className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Security overview for <span className="text-blue-400">secflow-api</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Live
          </Badge>
        </div>
      </FadeIn>

      {/* Quick Stat Row */}
      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Repositories', value: stats.repositories },
          { label: 'Pipelines', value: stats.pipelines },
          { label: 'Scans', value: stats.scans },
          { label: 'Deployments', value: stats.deployments },
          { label: 'Alerts', value: stats.alerts },
        ].map(stat => (
          <StaggerItem key={stat.label}>
            <Card className="h-full">
              <CardContent className="pt-6 pb-5">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Recent Pipelines */}
      <SlideUp delay={0.1}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-cyan-400" />
              Recent Pipelines
            </CardTitle>
            <a href="/repositories" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View All <ExternalLink className="h-3 w-3" />
            </a>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2235] text-left">
                    <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Repo</th>
                    <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Branch</th>
                    <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Stages</th>
                    <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Run</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2235]">
                  {mockRecentPipelines.map(p => (
                    <tr key={p.repo} className="hover:bg-[#1A1D2B] transition-colors cursor-pointer">
                      <td className="py-3 pr-4 font-medium text-white">{p.repo}</td>
                      <td className="py-3 pr-4">
                        <code className="text-xs text-slate-400 font-mono">{p.branch}</code>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={p.status === 'failed' ? 'destructive' : p.status === 'completed' ? 'success' : 'outline'}
                          className="text-xs capitalize"
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-300 font-mono">{p.stages}</td>
                      <td className="py-3 text-xs text-slate-400">{p.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Top Row — Score + Vulnerabilities + Scan Status */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security Score */}
        <StaggerItem>
          <Card className="relative overflow-hidden h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Overall Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              {/* Circular Gauge */}
              <div className="relative h-28 w-28 flex-shrink-0">
                <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1E2235" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGradient)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(stats.securityScore / 100) * 263.9} 263.9`} />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{stats.securityScore}</span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-emerald-400">Good</p>
                <p className="text-xs text-slate-500">Based on {stats.scans} scans across {stats.repositories} repositories</p>
                <div className="flex items-center text-xs text-emerald-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +5 from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Vulnerabilities */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Bug className="h-4 w-4 text-red-400" />
              Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-4">{stats.totalVulnerabilities}</div>
            <div className="space-y-2.5">
              {[
                { severity: 'critical' as const, count: stats.vulnerabilitiesBySeverity.critical, color: 'bg-red-500' },
                { severity: 'high' as const, count: stats.vulnerabilitiesBySeverity.high, color: 'bg-orange-500' },
                { severity: 'medium' as const, count: stats.vulnerabilitiesBySeverity.medium, color: 'bg-amber-500' },
                { severity: 'low' as const, count: stats.vulnerabilitiesBySeverity.low, color: 'bg-blue-500' },
              ].map(item => (
                <div key={item.severity} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-14 capitalize">{item.severity}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#1E2235] overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.count / stats.totalVulnerabilities) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-white w-8 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Scan Status */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Scan className="h-4 w-4 text-purple-400" />
              Scan Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(stats.scanStatus).map(scan => (
                <div key={scan.label} className="flex items-center justify-between p-3 rounded-lg bg-[#0A0B0E] border border-[#1E2235]">
                  <span className="text-sm font-medium text-white">{scan.label}</span>
                  <StatusIndicator status={scan.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Middle Row — AI Intelligence + Auto Fix + Revalidation */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" delayChildren={0.2}>
        {/* AI Security Intelligence */}
        <StaggerItem>
        <Card className="border-purple-500/20 bg-gradient-to-br from-[#12141C] to-purple-900/5 h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Security Intelligence</h3>
                <p className="text-xs text-slate-400">Powered by AI Agent</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">Active</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Analyzed</p>
                <span className="text-sm font-medium text-white">132 issues</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Auto Fix Agent */}
        <StaggerItem>
        <Card className="border-blue-500/20 bg-gradient-to-br from-[#12141C] to-blue-900/5 h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Auto Fix Agent</h3>
                <p className="text-xs text-slate-400">Automated Remediation</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-blue-400">Enabled</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Fixed</p>
                <span className="text-sm font-medium text-white">28 issues</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Revalidation */}
        <StaggerItem>
        <Card className="border-emerald-500/20 bg-gradient-to-br from-[#12141C] to-emerald-900/5 h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Revalidation</h3>
                <p className="text-xs text-slate-400">Post-fix verification</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-400">Passed</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Coverage</p>
                <span className="text-sm font-medium text-white">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* CI/CD Pipeline + Deployment */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" delayChildren={0.4}>
        {/* CI/CD Pipeline */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-cyan-400" />
              CI/CD Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['Build', 'Test', 'Scan', 'Package', 'Deploy'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border ${i < 4 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium whitespace-nowrap">{step}</span>
                  </div>
                  {i < 4 && <div className="h-px w-4 bg-[#1E2235] flex-shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Deployment (AWS) */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Cloud className="h-4 w-4 text-orange-400" />
              Deployment (AWS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Environment</p>
                <span className="text-sm font-medium text-white">Production</span>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Region</p>
                <span className="text-sm font-medium text-white">us-east-1</span>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-emerald-400">Healthy</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-3">
                <p className="text-xs text-slate-500 mb-1">Last Deployed</p>
                <span className="text-sm font-medium text-white">2h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Security Pipeline — 12-Step Stepper */}
      <SlideUp delay={0.6}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            Security Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center gap-0 overflow-x-auto pb-4">
              {mockSecurityPipeline.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center min-w-[90px] flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      stage.status === 'completed' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                      stage.status === 'running' ? 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse' :
                      'bg-[#0A0B0E] border-[#1E2235] text-slate-500'
                    }`}>
                      {stage.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : (i + 1)}
                    </div>
                    <span className={`text-[10px] mt-2 text-center leading-tight ${
                      stage.status === 'completed' ? 'text-emerald-400' :
                      stage.status === 'running' ? 'text-blue-400' : 'text-slate-500'
                    }`}>{stage.name}</span>
                  </div>
                  {i < mockSecurityPipeline.length - 1 && (
                    <div className={`h-0.5 w-6 flex-shrink-0 mt-[-18px] ${
                      stage.status === 'completed' ? 'bg-emerald-500/50' : 'bg-[#1E2235]'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </SlideUp>

      {/* Recent Security Findings */}
      <SlideUp delay={0.7}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-400">Recent Security Findings</CardTitle>
          <a href="/findings" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View All <ExternalLink className="h-3 w-3" />
          </a>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E2235] text-left">
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Scanner</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Detected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2235]">
                {mockFindings.slice(0, 5).map(finding => (
                  <tr key={finding.id} className="hover:bg-[#1A1D2B] transition-colors cursor-pointer">
                    <td className="py-3 pr-4">
                      <SeverityBadge severity={finding.severity} />
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-medium text-white">{finding.title}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant="outline" className="text-xs">{finding.scanner}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={finding.status === 'open' ? 'destructive' : 'success'} className="text-xs capitalize">{finding.status}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <code className="text-xs text-slate-400 font-mono">{finding.file}:{finding.line}</code>
                    </td>
                    <td className="py-3 text-xs text-slate-400">{finding.detectedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </SlideUp>
    </div>
  );
}
