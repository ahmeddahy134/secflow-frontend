'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, X, Code2, FileText, CheckCircle2 } from 'lucide-react';
import { mockFindings } from '@/data/mock-data';
import type { Finding, Severity } from '@/types';
import { FadeIn, SlideUp } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';
import { toast } from '@/store/toast-store';

function FindingDetailDrawer({ finding, onClose }: { finding: Finding; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'details' | 'code' | 'remediation'>('details');

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="absolute inset-0 z-0" onClick={onClose} />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-[#0A0B14] border-l border-[#1E2235] shadow-2xl overflow-y-auto z-10 flex flex-col h-full"
      >
        <div className="sticky top-0 bg-[#0A0B14] border-b border-[#1E2235] p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <SeverityBadge severity={finding.severity} />
            <h2 className="text-base font-bold text-white truncate max-w-md">{finding.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#12141F] text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1E2235] px-6 bg-[#12141F]/40">
          <button 
            onClick={() => setActiveTab('details')} 
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'details' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <FileText className="h-3.5 w-3.5" /> Details
          </button>
          <button 
            onClick={() => setActiveTab('code')} 
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'code' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Code2 className="h-3.5 w-3.5" /> Code Snippet
          </button>
          <button 
            onClick={() => setActiveTab('remediation')} 
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'remediation' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Remediation
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {activeTab === 'details' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {finding.cwe && (
                  <div className="rounded-lg bg-[#12141F] border border-[#1E2235] p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">CWE</p>
                    <p className="text-sm font-semibold text-white">{finding.cwe}</p>
                  </div>
                )}
                {finding.cve && (
                  <div className="rounded-lg bg-[#12141F] border border-[#1E2235] p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">CVE</p>
                    <p className="text-sm font-semibold text-red-400">{finding.cve}</p>
                  </div>
                )}
                {finding.cvss !== null && (
                  <div className="rounded-lg bg-[#12141F] border border-[#1E2235] p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">CVSS Score</p>
                    <p className="text-sm font-semibold text-white">{finding.cvss}</p>
                  </div>
                )}
                <div className="rounded-lg bg-[#12141F] border border-[#1E2235] p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Scanner</p>
                  <p className="text-sm font-semibold text-white">{finding.scannerTool}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-[#12141F] border border-[#1E2235] p-4 rounded-lg">
                  {finding.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Location</h3>
                <code className="text-xs text-blue-400 bg-[#0A0B14] p-3 rounded-lg border border-[#1E2235] block font-mono">
                  {finding.file}:{finding.line}
                </code>
              </div>
            </>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vulnerable Code Line {finding.line}</h3>
              <div className="bg-[#050508] border border-[#1E2235] rounded-xl overflow-hidden font-mono text-xs p-4">
                <div className="text-slate-600 mb-2">// {finding.file}</div>
                <div className="bg-red-500/10 border-l-2 border-red-500 text-red-300 p-2 my-1">
                  <span className="text-slate-500 select-none mr-4">{finding.line}</span>
                  <code>{finding.codeSnippet || finding.title}</code>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'remediation' && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggested AI Fix</h3>
              <div className="bg-[#12141F] border border-emerald-500/30 p-4 rounded-xl text-sm text-slate-300 space-y-3">
                <p className="text-emerald-400 font-semibold flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-4 w-4" /> AI Auto-Remediation Available
                </p>
                <p className="text-xs leading-relaxed text-slate-400">
                  {finding.remediation || "Ensure all parameters are validated against strict schema before parsing. Use parameterized queries or ORM sanitizers."}
                </p>
                <Button
                  onClick={() => toast({ variant: 'success', title: 'Pull request opened', description: `AI fix branch created for "${finding.title}".` })}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs py-2 rounded-lg shadow-md"
                >
                  Apply Fix Pull Request
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#1E2235] bg-[#0A0B14] flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-[#1E2235] text-slate-300 hover:bg-[#12141F]"
            onClick={() => { toast({ variant: 'info', title: 'Finding ignored', description: `"${finding.title}" marked as accepted risk.` }); onClose(); }}
          >
            Ignore Finding
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md"
            onClick={() => toast({ variant: 'success', title: 'Issue assigned', description: `"${finding.title}" assigned to you.` })}
          >
            Assign Issue
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function FindingsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

  const filtered = mockFindings.filter(f => {
    if (selectedSeverity !== 'all' && f.severity !== selectedSeverity) return false;
    if (search && !f.title.toLowerCase().includes(search.toLowerCase()) && !f.file.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Findings</h1>
          <p className="text-sm text-slate-400 mt-1">Aggregated vulnerabilities from SAST, DAST, and Dependency scans</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input placeholder="Search vulnerabilities, files..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <div className="flex items-center gap-2">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map(sev => (
            <Button
              key={sev}
              variant={selectedSeverity === sev ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSeverity(sev)}
              className="capitalize text-xs"
            >
              {sev}
            </Button>
          ))}
        </div>
      </div>

      {/* Table / Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          type="security"
          title="No security findings match"
          description={`No vulnerability findings match your selected filter options.`}
          actionLabel="Reset Filters"
          onAction={() => { setSelectedSeverity('all'); setSearch(''); }}
        />
      ) : (
        <SlideUp delay={0.1}>
          <Card className="border-[#1E2235] bg-[#12141F]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-[#1E2235] text-slate-500 text-xs uppercase tracking-wider bg-[#0A0B14]">
                      <th className="p-4">Severity</th>
                      <th className="p-4">Vulnerability Title</th>
                      <th className="p-4">File Path</th>
                      <th className="p-4">Scanner</th>
                      <th className="p-4">CVE / CWE</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2235]">
                    {filtered.map(finding => (
                      <tr 
                        key={finding.id} 
                        onClick={() => setSelectedFinding(finding)}
                        className="hover:bg-[#1A1D2B] transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <SeverityBadge severity={finding.severity} />
                        </td>
                        <td className="p-4 font-semibold text-white">{finding.title}</td>
                        <td className="p-4 text-slate-400 font-mono text-xs">{finding.file}:{finding.line}</td>
                        <td className="p-4"><Badge variant="outline" className="text-xs uppercase">{finding.scannerTool}</Badge></td>
                        <td className="p-4 text-xs font-mono text-slate-400">{finding.cve || finding.cwe || '—'}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {finding.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      )}

      {selectedFinding && (
        <FindingDetailDrawer finding={selectedFinding} onClose={() => setSelectedFinding(null)} />
      )}
    </FadeIn>
  );
}
