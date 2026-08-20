'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bot, Brain, ShieldCheck, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

const aiInsights = [
  {
    title: 'SQL Injection in api.rb is exploitable via the search endpoint',
    severity: 'critical' as const,
    context: 'The SQL injection at line 45 of api.rb can be reached through the /api/v1/search endpoint. User-supplied query parameters are passed directly to the SQL query without sanitization, enabling data exfiltration.',
    recommendation: 'Replace string concatenation with parameterized queries. Use ActiveRecord\'s built-in query methods like `where(id: params[:id])`.',
    confidence: 97,
  },
  {
    title: 'Command injection has elevated risk due to root execution context',
    severity: 'critical' as const,
    context: 'The os.system() call at exec.py:12 runs in a Docker container with root privileges. Combined with user-controllable input, this creates a remote code execution pathway with maximum impact.',
    recommendation: 'Use subprocess.run() with shell=False. Additionally, configure the container to run as a non-root user.',
    confidence: 94,
  },
  {
    title: 'Hardcoded AWS key grants broad S3 and Lambda access',
    severity: 'high' as const,
    context: 'The exposed AWS access key AKIA1234... has policies attached for s3:*, lambda:*, and ec2:Describe*. If compromised, an attacker could read all S3 buckets and modify Lambda functions.',
    recommendation: 'Rotate the key immediately. Migrate to IAM roles for service-to-service auth. Use AWS Secrets Manager for any remaining keys.',
    confidence: 91,
  },
  {
    title: 'lodash prototype pollution can be chained with XSS',
    severity: 'high' as const,
    context: 'The outdated lodash@4.17.15 has CVE-2021-23337. In this application, prototype pollution can be chained with the reflected XSS in search.py to achieve persistent session hijacking.',
    recommendation: 'Update lodash to ≥4.17.21. This is a one-line change in package.json with no breaking API changes.',
    confidence: 88,
  },
];

export default function AIIntelligencePage() {
  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Security Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">Context-aware vulnerability analysis powered by AI</p>
        </div>
        <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-1.5 animate-pulse" />
          AI Agent Active
        </Badge>
      </div>

      {/* Summary Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Brain, label: 'Issues Analyzed', value: '132', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { icon: ShieldCheck, label: 'Auto-Fixable', value: '28', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: TrendingUp, label: 'Risk Score', value: 'High', color: 'text-red-400', bg: 'bg-red-500/10' },
          { icon: Zap, label: 'Avg Confidence', value: '92%', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map(item => (
          <StaggerItem key={item.label}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.label}</span>
              </div>
              <span className="text-2xl font-bold text-white">{item.value}</span>
            </CardContent>
          </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          AI Insights
        </h2>
        <StaggerContainer className="space-y-4" staggerDelay={0.15}>
        {aiInsights.map((insight, i) => (
          <StaggerItem key={i}>
          <Card className="border-l-2 border-l-purple-500/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <SeverityBadge severity={insight.severity} />
                    <h3 className="font-semibold text-white">{insight.title}</h3>
                  </div>
                  
                  <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Context Analysis</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{insight.context}</p>
                  </div>

                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
                    <p className="text-xs text-emerald-500 uppercase tracking-wider mb-2">AI Recommendation</p>
                    <p className="text-sm text-emerald-400 leading-relaxed">{insight.recommendation}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Confidence:</span>
                      <div className="w-20 h-1.5 rounded-full bg-[#1E2235] overflow-hidden">
                        <div className="h-full rounded-full bg-purple-500" style={{ width: `${insight.confidence}%` }} />
                      </div>
                      <span className="text-xs font-medium text-purple-400">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </StaggerItem>
        ))}
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}
