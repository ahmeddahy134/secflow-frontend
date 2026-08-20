'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { CheckCircle2, Clock, Terminal, Activity } from 'lucide-react';
import { mockScanJobs, mockPipelineStages } from '@/data/mock-data';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function ScanDetailPage() {
  const scan = mockScanJobs[0];
  const stages = mockPipelineStages;

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pipeline — Scan #{scan.id}</h1>
        <p className="text-sm text-slate-400 mt-1">{scan.repositoryName} · {scan.branch}</p>
      </div>

      {/* Pipeline Stage Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            Pipeline Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const completedCount = stages.filter(s => s.status === 'completed').length;
            const pct = Math.round((completedCount / stages.length) * 100);
            return (
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold text-white">{completedCount} / {stages.length}</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Stages Clear</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#1E2235] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })()}
          <div className="flex items-center gap-0 overflow-x-auto pb-4">
            {stages.map((stage, i) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    stage.status === 'completed' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                    stage.status === 'running' ? 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse' :
                    'bg-[#0A0B0E] border-[#1E2235] text-slate-500'
                  }`}>
                    {stage.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">{stage.order}</span>}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    stage.status === 'completed' ? 'text-emerald-400' :
                    stage.status === 'running' ? 'text-blue-400' : 'text-slate-500'
                  }`}>{stage.name}</span>
                  {stage.duration && <span className="text-[10px] text-slate-500 mt-0.5">{stage.duration}</span>}
                </div>
                {i < stages.length - 1 && (
                  <div className={`h-0.5 w-8 mt-[-26px] ${stage.status === 'completed' ? 'bg-emerald-500/50' : 'bg-[#1E2235]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scan Summary + Logs */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.2}>
        {/* Scan Summary */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">Scan Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-4 text-center">
                <p className="text-3xl font-bold text-white">{scan.totalFindings}</p>
                <p className="text-xs text-slate-500 mt-1">Total Findings</p>
              </div>
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-4 text-center">
                <p className="text-3xl font-bold text-white">{scan.duration}</p>
                <p className="text-xs text-slate-500 mt-1">Duration</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { sev: 'Critical', count: scan.findingsBySeverity.critical, color: 'bg-red-500', textColor: 'text-red-400' },
                { sev: 'High', count: scan.findingsBySeverity.high, color: 'bg-orange-500', textColor: 'text-orange-400' },
                { sev: 'Medium', count: scan.findingsBySeverity.medium, color: 'bg-amber-500', textColor: 'text-amber-400' },
                { sev: 'Low', count: scan.findingsBySeverity.low, color: 'bg-blue-500', textColor: 'text-blue-400' },
              ].map(item => (
                <div key={item.sev} className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-slate-300 flex-1">{item.sev}</span>
                  <span className={`text-sm font-semibold ${item.textColor}`}>{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Pipeline Logs */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Terminal className="h-4 w-4" /> Pipeline Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-4 font-mono text-xs max-h-[400px] overflow-y-auto space-y-1">
              <p className="text-slate-500">[11:04:01] <span className="text-emerald-400">✓</span> Repository cloned successfully (3s)</p>
              <p className="text-slate-500">[11:04:04] <span className="text-blue-400">→</span> Building sandbox environment...</p>
              <p className="text-slate-500">[11:04:49] <span className="text-emerald-400">✓</span> Sandbox ready (45s)</p>
              <p className="text-slate-500">[11:04:50] <span className="text-blue-400">→</span> Running SAST scan with Semgrep...</p>
              <p className="text-slate-500">[11:04:50] <span className="text-blue-400">→</span> Running SAST scan with Bandit...</p>
              <p className="text-slate-500">[11:06:12] <span className="text-emerald-400">✓</span> Semgrep completed — 48 findings</p>
              <p className="text-slate-500">[11:06:31] <span className="text-emerald-400">✓</span> Bandit completed — 22 findings</p>
              <p className="text-slate-500">[11:06:32] <span className="text-blue-400">→</span> Running DAST scan with OWASP ZAP...</p>
              <p className="text-slate-500">[11:06:33] <span className="text-blue-400">→</span> Scanning target: http://sandbox-1057:8080</p>
              <p className="text-white">[11:07:30] <span className="text-blue-400 animate-pulse">⠿</span> DAST scan in progress (58s elapsed)...</p>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>
    </FadeIn>
  );
}
