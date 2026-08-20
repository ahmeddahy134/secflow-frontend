'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { GitBranch, Copy, Check, Terminal, Settings2 } from 'lucide-react';
import { FadeIn, SlideUp } from '@/components/ui/MotionWrapper';

export default function CiCdPage() {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    sast: true,
    dast: true,
    sca: true,
    autoFix: true,
    gatedDeploy: true,
  });

  const toggleConfig = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const yamlContent = `name: SecFlow DevSecOps Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  secflow-security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SecFlow AI Security Analysis
        uses: secflow/secflow-action@v2
        with:
          api-token: \${{ secrets.SECFLOW_API_TOKEN }}
          sast: ${config.sast}
          dast: ${config.dast}
          dependency-scan: ${config.sca}
          auto-fix: ${config.autoFix}
          gated-deploy: ${config.gatedDeploy}`;

  const copyYaml = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-cyan-400" /> CI/CD Pipeline Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">Generate and configure automated GitHub Actions & GitLab CI workflow files</p>
        </div>
        <Button onClick={copyYaml} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied YAML!' : 'Copy Workflow YAML'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-blue-400" /> Pipeline Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: 'sast' as const, label: 'Static Code Analysis (SAST)' },
                { key: 'dast' as const, label: 'Dynamic Testing (DAST)' },
                { key: 'sca' as const, label: 'SCA Dependency Audit' },
                { key: 'autoFix' as const, label: 'AI Auto-Fix PRs' },
                { key: 'gatedDeploy' as const, label: 'Gated AWS Cloud Deployment' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-border)] text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <button
                    role="switch"
                    aria-checked={config[item.key]}
                    aria-label={`Toggle ${item.label}`}
                    onClick={() => toggleConfig(item.key)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${config[item.key] ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${config[item.key] ? 'translate-x-4.5' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Generated YAML Code */}
        <div className="lg:col-span-2">
          <SlideUp delay={0.1}>
            <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--color-border)]">
                <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" /> .github/workflows/secflow.yml
                </CardTitle>
                <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400 font-mono">GitHub Actions</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-[#050508] p-6 font-mono text-xs text-slate-300 overflow-x-auto scrollbar-thin">
                  <pre>{yamlContent}</pre>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </FadeIn>
  );
}
