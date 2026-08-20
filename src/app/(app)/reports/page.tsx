'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { Download, FileText, Shield, AlertTriangle, Lock, Package } from 'lucide-react';
import { mockReports, mockFindings } from '@/data/mock-data';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

type GroupBy = 'file' | 'severity' | 'type';

export default function ReportsPage() {
  const report = mockReports[0];
  const [groupBy, setGroupBy] = React.useState<GroupBy>('file');
  const findings = mockFindings.filter(f => f.scanId === report.scanId);

  const sorted = React.useMemo(() => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    const copy = [...findings];
    if (groupBy === 'severity') copy.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    if (groupBy === 'type') copy.sort((a, b) => a.scanner.localeCompare(b.scanner));
    if (groupBy === 'file') copy.sort((a, b) => a.file.localeCompare(b.file));
    return copy;
  }, [findings, groupBy]);

  const handleDownload = (format: 'PDF' | 'HTML') => {
    toast({ variant: 'success', title: `${format} report ready`, description: `Report #${report.scanId} exported as ${format}.` });
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Report</h1>
          <p className="text-sm text-slate-400 mt-1">{report.repositoryName} · Scan #{report.scanId}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => handleDownload('PDF')}><Download className="h-4 w-4 mr-2" /> PDF</Button>
          <Button variant="outline" size="sm" onClick={() => handleDownload('HTML')}><Download className="h-4 w-4 mr-2" /> HTML</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StaggerItem>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-white">{report.totalFindings}</p>
            <p className="text-xs text-slate-500 mt-1">Total Issues</p>
          </CardContent>
        </Card>
        </StaggerItem>
        {[
          { sev: 'critical' as const, count: report.findingsBySeverity.critical, color: 'text-red-400' },
          { sev: 'high' as const, count: report.findingsBySeverity.high, color: 'text-orange-400' },
          { sev: 'medium' as const, count: report.findingsBySeverity.medium, color: 'text-amber-400' },
          { sev: 'low' as const, count: report.findingsBySeverity.low, color: 'text-blue-400' },
        ].map(item => (
          <StaggerItem key={item.sev}>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
              <p className="text-xs text-slate-500 mt-1 capitalize">{item.sev}</p>
            </CardContent>
          </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Report Tabs Content */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.2}>
        {/* Severity Distribution */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" /> Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Critical', count: report.findingsBySeverity.critical, color: 'bg-red-500', pct: (report.findingsBySeverity.critical / report.totalFindings) * 100 },
                { label: 'High', count: report.findingsBySeverity.high, color: 'bg-orange-500', pct: (report.findingsBySeverity.high / report.totalFindings) * 100 },
                { label: 'Medium', count: report.findingsBySeverity.medium, color: 'bg-amber-500', pct: (report.findingsBySeverity.medium / report.totalFindings) * 100 },
                { label: 'Low', count: report.findingsBySeverity.low, color: 'bg-blue-500', pct: (report.findingsBySeverity.low / report.totalFindings) * 100 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="text-sm font-medium text-white">{item.count} ({item.pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#1E2235] overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        {/* Issues by Category */}
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-400" /> Issues by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: AlertTriangle, label: 'Injection', count: 28, color: 'text-red-400', bg: 'bg-red-500/10' },
                { icon: Lock, label: 'Authentication', count: 18, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { icon: Shield, label: 'Access Control', count: 22, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { icon: Package, label: 'Dependencies', count: 35, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Lock, label: 'Secrets', count: 12, color: 'text-purple-400', bg: 'bg-purple-500/10' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#0A0B0E] border border-[#1E2235]">
                  <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-sm text-slate-300 flex-1">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Scanner Coverage */}
      <SlideUp delay={0.4}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">Scanner Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1E2235" strokeWidth="10" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(report.scannerCoverage / 100) * 238.76} 238.76`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{report.scannerCoverage}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {['Semgrep', 'Bandit', 'Trivy', 'OWASP ZAP', 'Gitleaks'].map(scanner => (
                <div key={scanner} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-slate-300">{scanner}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </SlideUp>

      {/* All Findings */}
      <SlideUp delay={0.5}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-sm font-medium text-slate-400">All Findings</CardTitle>
          <div className="flex items-center gap-1 bg-[#0A0B0E] border border-[#1E2235] rounded-lg p-1">
            {(['file', 'severity', 'type'] as GroupBy[]).map(opt => (
              <button
                key={opt}
                onClick={() => setGroupBy(opt)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                  groupBy === opt ? 'bg-[#1E2235] text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                By {opt}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E2235] text-left">
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">File</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Line</th>
                  <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2235]">
                {sorted.map(finding => (
                  <tr key={finding.id} className="hover:bg-[#1A1D2B] transition-colors cursor-pointer">
                    <td className="py-3 pr-4"><SeverityBadge severity={finding.severity} /></td>
                    <td className="py-3 pr-4">
                      <span className="font-medium text-white">{finding.title}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <code className="text-xs text-slate-400 font-mono">{finding.file}</code>
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-400 font-mono">{finding.line}</td>
                    <td className="py-3 text-xs text-slate-400 max-w-md truncate">{finding.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </SlideUp>
    </FadeIn>
  );
}
