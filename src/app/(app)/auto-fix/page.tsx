'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Wrench, CheckCircle2, GitPullRequest, Code2, Sparkles, RefreshCcw, ArrowRight } from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function AutoFixPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [fixedIssues, setFixedIssues] = useState([
    {
      id: 'fix-1',
      title: 'SQL Injection in userController.py',
      file: '/app/controllers/userController.py',
      line: 87,
      additions: `+ db.execute("SELECT * FROM users WHERE username = %s", (username,))`,
      deletions: `- db.execute(f"SELECT * FROM users WHERE username = '{username}'")`,
      status: 'PR Opened',
      prNumber: '#142',
    },
    {
      id: 'fix-2',
      title: 'Hardcoded AWS Access Key',
      file: '/config/aws.js',
      line: 12,
      additions: `+ const AWS_KEY = process.env.AWS_ACCESS_KEY_ID;`,
      deletions: `- const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";`,
      status: 'PR Opened',
      prNumber: '#143',
    },
    {
      id: 'fix-3',
      title: 'Outdated Dependency: lodash < 4.17.21',
      file: '/package.json',
      line: 24,
      additions: `+ "lodash": "^4.17.21"`,
      deletions: `- "lodash": "4.17.15"`,
      status: 'Merged',
      prNumber: '#138',
    },
  ]);

  const handleGenerateFix = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setFixedIssues(prev => [
        {
          id: `fix-${Date.now()}`,
          title: 'Remote Command Injection in exec.py',
          file: '/app/utils/exec.py',
          line: 12,
          additions: `+ subprocess.run(["ls", user_dir], check=True)`,
          deletions: `- os.system(f"ls {user_dir}")`,
          status: 'PR Opened',
          prNumber: `#${144 + prev.length}`,
        },
        ...prev
      ]);
    }, 1200);
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-400" /> Auto Fix Agent
          </h1>
          <p className="text-sm text-slate-400 mt-1">AI-generated automated security remediations and Pull Requests</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status="enabled" label="Agent Active" />
          <Button
            onClick={handleGenerateFix}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/20"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating Fix...' : 'Generate New Fix PR'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Auto-Fixed</p>
            <p className="text-3xl font-bold text-white">37</p>
            <p className="text-xs text-emerald-400 mt-1">+12 fixes generated this week</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Open Pull Requests</p>
            <p className="text-3xl font-bold text-blue-400">{fixedIssues.filter(i => i.status === 'PR Opened').length}</p>
            <p className="text-xs text-slate-400 mt-1">Awaiting developer merge</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Revalidation Rate</p>
            <p className="text-3xl font-bold text-emerald-400">100%</p>
            <p className="text-xs text-slate-400 mt-1">Zero synthetic regressions</p>
          </CardContent>
        </Card>
      </div>

      <SlideUp delay={0.1}>
        <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" /> Recent AI Code Remediations & Pull Requests
            </CardTitle>
            <Link href="/revalidation" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
              Verify with Revalidation <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <StaggerContainer className="space-y-4" staggerDelay={0.08}>
              {fixedIssues.map(issue => (
                <StaggerItem key={issue.id}>
                  <div className="p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-border)] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-white text-sm">{issue.title}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{issue.file}:{issue.line}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                          <GitPullRequest className="h-3 w-3 mr-1" /> {issue.prNumber}
                        </Badge>
                        <StatusBadge status={issue.status === 'Merged' ? 'passed' : 'active'} label={issue.status} />
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#050508] border border-[var(--color-border)] p-3 font-mono text-xs overflow-x-auto scrollbar-thin space-y-1">
                      <div className="text-red-400 bg-red-500/10 px-2 py-1 rounded border-l-2 border-red-500">
                        {issue.deletions}
                      </div>
                      <div className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border-l-2 border-emerald-500">
                        {issue.additions}
                      </div>
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
