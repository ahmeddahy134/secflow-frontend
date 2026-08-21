'use client';

import React, { useState } from 'react';
import {
  BookOpen, Zap, GitBranch, Code, Radar, Network, Key, Box,
  Rocket, Database, FileText, ShieldCheck, ChevronRight,
  Terminal, Copy, Check, Info, AlertTriangle, Lightbulb, Lock,
  CheckCircle2, Search, ArrowRight, Clock,
} from 'lucide-react';

const SIDEBAR_SECTIONS = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    color: 'text-blue-400',
    items: [
      { id: 'overview', label: 'Platform Overview' },
      { id: 'quickstart', label: 'Quickstart Guide' },
      { id: 'connecting-repos', label: 'Connecting Repositories' },
    ],
  },
  {
    title: 'Security Scanners',
    icon: ShieldCheck,
    color: 'text-cyan-400',
    items: [
      { id: 'sast', label: 'SAST (Static Analysis)' },
      { id: 'dast', label: 'DAST (Dynamic Analysis)' },
      { id: 'dependency', label: 'Dependency Scan (Trivy)' },
      { id: 'secrets', label: 'Secrets Detection (Gitleaks)' },
    ],
  },
  {
    title: 'Pipeline Execution',
    icon: Rocket,
    color: 'text-purple-400',
    items: [
      { id: 'sandbox', label: 'Isolated Sandbox Runtime' },
      { id: 'deployment', label: 'AWS ECS Deployment Gating' },
    ],
  },
  {
    title: 'Remediation & Compliance',
    icon: FileText,
    color: 'text-emerald-400',
    items: [
      { id: 'aggregation', label: 'Vulnerability Aggregation' },
      { id: 'fix-patches', label: 'Automated Fix Patches' },
      { id: 'standards', label: 'Security Standards' },
    ],
  },
];

function CodeBlock({ code, language = 'bash', title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl border border-[#1E2235] overflow-hidden my-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A0B14] border-b border-[#1E2235]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          {title && <span className="text-xs text-slate-500 font-mono ml-2">{title}</span>}
          {!title && <Terminal className="h-3.5 w-3.5 text-slate-500" />}
          <span className="text-xs text-slate-600 font-mono">{language}</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors px-2 py-1 rounded-md hover:bg-[#1E2235]">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-[#0D0F1C] text-sm font-mono text-slate-300 p-5 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

type CalloutType = 'tip' | 'warning' | 'info' | 'security';
function Callout({ type, children }: { type: CalloutType; children: React.ReactNode }) {
  const styles: Record<CalloutType, { icon: React.ElementType; bg: string; border: string; iconColor: string; label: string }> = {
    tip:      { icon: Lightbulb,     bg: 'bg-emerald-500/5', border: 'border-emerald-500/30', iconColor: 'text-emerald-400', label: 'TIP' },
    warning:  { icon: AlertTriangle, bg: 'bg-amber-500/5',   border: 'border-amber-500/30',   iconColor: 'text-amber-400',   label: 'WARNING' },
    info:     { icon: Info,          bg: 'bg-blue-500/5',    border: 'border-blue-500/30',    iconColor: 'text-blue-400',    label: 'NOTE' },
    security: { icon: Lock,          bg: 'bg-purple-500/5',  border: 'border-purple-500/30',  iconColor: 'text-purple-400',  label: 'SECURITY' },
  };
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${s.bg} ${s.border} my-5`}>
      <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${s.iconColor}`} />
      <div>
        <span className={`text-xs font-bold tracking-wider ${s.iconColor} mr-2`}>{s.label}</span>
        <span className="text-sm text-slate-300 leading-relaxed">{children}</span>
      </div>
    </div>
  );
}

function StepCard({ num, title, desc, icon: Icon }: { num: number; title: string; desc: string; icon: React.ElementType }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-[#1E2235] bg-[#0D0F1C]/60 hover:border-[#2A2F45] transition-colors">
      <div className="flex-shrink-0">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/30 flex items-center justify-center">
          <span className="text-sm font-black text-blue-300">{num}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Icon className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">{title}</h4>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const SECTION_META: Record<string, { badge: string; title: string; subtitle: string; icon: React.ElementType; updated: string }> = {
  overview:           { badge: 'Getting Started',   title: 'Platform Overview',             subtitle: 'Understand what SecFlow does and how the pipeline works end-to-end.',           icon: BookOpen,    updated: 'Aug 2026' },
  quickstart:         { badge: 'Getting Started',   title: 'Quickstart Guide',              subtitle: 'Get your first repository scanned and a report generated in under 5 minutes.',  icon: Zap,         updated: 'Aug 2026' },
  'connecting-repos': { badge: 'Getting Started',   title: 'Connecting Repositories',       subtitle: 'OAuth and PAT-based GitHub repository connection methods.',                     icon: GitBranch,   updated: 'Aug 2026' },
  sast:               { badge: 'Security Scanners', title: 'SAST (Static Analysis)',        subtitle: 'Semgrep and Bandit analyzing source code without execution.',                   icon: Code,        updated: 'Aug 2026' },
  dast:               { badge: 'Security Scanners', title: 'DAST (Dynamic Analysis)',       subtitle: 'Runtime probing of your running application inside the sandbox.',                icon: Radar,       updated: 'Aug 2026' },
  dependency:         { badge: 'Security Scanners', title: 'Dependency Scan (Trivy)',       subtitle: 'Third-party library CVE analysis and SBOM generation.',                         icon: Network,     updated: 'Aug 2026' },
  secrets:            { badge: 'Security Scanners', title: 'Secrets Detection (Gitleaks)',  subtitle: 'Full history scan for credentials, tokens, and private keys.',                  icon: Key,         updated: 'Aug 2026' },
  sandbox:            { badge: 'Pipeline Execution',title: 'Isolated Sandbox Runtime',      subtitle: 'How SecFlow ephemeral, network-restricted containers protect your workloads.',  icon: Box,         updated: 'Aug 2026' },
  deployment:         { badge: 'Pipeline Execution',title: 'AWS ECS Deployment Gating',    subtitle: 'The deployment gate only scans that pass reach production.',                     icon: Rocket,      updated: 'Aug 2026' },
  aggregation:        { badge: 'Remediation',       title: 'Vulnerability Aggregation',     subtitle: 'CVE, CWE, and CVSS normalization across all scan engine outputs.',              icon: Database,    updated: 'Aug 2026' },
  'fix-patches':      { badge: 'Remediation',       title: 'Automated Fix Patches',         subtitle: 'Plain-language explanations and proposed code fixes for every finding.',        icon: Zap,         updated: 'Aug 2026' },
  standards:          { badge: 'Compliance',         title: 'Security Standards',            subtitle: 'OWASP, CWE, CVE, SOC 2, ISO 27001, and PCI DSS compliance mapping.',          icon: ShieldCheck, updated: 'Aug 2026' },
};

export default function DocsPage() {
  const [activeId, setActiveId] = useState('overview');
  const [search, setSearch] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'Security Scanners': true,
    'Pipeline Execution': true,
    'Remediation & Compliance': true,
  });

  const meta = SECTION_META[activeId];
  const PageIcon = meta.icon;

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const allItems = SIDEBAR_SECTIONS.flatMap((s) => s.items);
  const filteredSections = search
    ? SIDEBAR_SECTIONS.map((s) => ({
        ...s,
        items: s.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
      })).filter((s) => s.items.length > 0)
    : SIDEBAR_SECTIONS;

  const DOC_CONTENT: Record<string, React.ReactNode> = {
    overview: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">SecFlow is an automated DevSecOps platform that takes a raw GitHub repository and runs a complete, isolated security pipeline from static and dynamic analysis to vulnerability aggregation, PDF report generation, and gated cloud deployment. No configuration files required.</p>
        <Callout type="info">SecFlow is designed as a zero-config platform. Connect a repository and the full pipeline activates automatically.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Core Pipeline Stages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: GitBranch, label: 'Repository Intake',        desc: 'GitHub OAuth or PAT token connection' },
            { icon: Box,       label: 'Isolated Sandbox',          desc: 'Network-restricted Docker containers' },
            { icon: Code,      label: 'SAST + DAST Scanning',      desc: 'Semgrep, Bandit & dynamic probing' },
            { icon: Network,   label: 'Dependency Analysis',       desc: 'Trivy + OWASP Dependency-Check' },
            { icon: Key,       label: 'Secrets Detection',         desc: 'Gitleaks full-history & pre-commit' },
            { icon: Database,  label: 'Vulnerability Aggregation', desc: 'CVE, CWE, CVSS normalization' },
            { icon: FileText,  label: 'Report Generation',         desc: 'PDF/HTML with severity breakdown' },
            { icon: Rocket,    label: 'Gated Deployment',          desc: 'AWS ECS only when scans pass' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3.5 rounded-lg border border-[#1E2235] bg-[#0D0F1C]/40">
              <item.icon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Technology Stack</h3>
        <div className="rounded-xl border border-[#1E2235] overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#0A0B14] border-b border-[#1E2235]"><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Layer</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Technology</th></tr></thead>
            <tbody className="divide-y divide-[#1E2235]">
              {[['Frontend','Next.js 15 (React), TypeScript, Tailwind CSS'],['API Gateway','ASP.NET Core Web API'],['Microservices','.NET — User, Project, Repo, Scan, Report, Deploy, Audit'],['Message Broker','RabbitMQ (async pipeline coordination)'],['Database','PostgreSQL 15 (AWS RDS in production)'],['Object Storage','MinIO (local) / AWS S3 (production)'],['Cloud','AWS ECS (Fargate), ECR, ALB, CloudWatch']].map(([layer, tech]) => (
                <tr key={layer} className="hover:bg-[#12141F]/60 transition-colors"><td className="px-4 py-3 font-medium text-slate-300">{layer}</td><td className="px-4 py-3 text-slate-400 font-mono text-xs">{tech}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    quickstart: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Get your first repository scanned and a full vulnerability report generated in under five minutes.</p>
        <Callout type="tip">You only need a GitHub account and your repository URL. No YAML, no configuration files.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Step-by-Step</h3>
        <div className="space-y-3">
          <StepCard num={1} icon={GitBranch} title="Connect your GitHub account" desc="Navigate to Settings then Integrations and click Connect GitHub. Authorize SecFlow with read access to your repositories via OAuth." />
          <StepCard num={2} icon={Zap}       title="Create a new project"         desc="From the Dashboard click New Project. Enter a project name and select your connected GitHub repository from the dropdown." />
          <StepCard num={3} icon={Code}      title="Trigger a scan"               desc="Click Run Scan on your project. SecFlow automatically clones the repository into an isolated sandbox and launches all scan engines in parallel." />
          <StepCard num={4} icon={FileText}  title="Review your report"           desc="Once complete, open the Findings tab to browse vulnerabilities by severity. Download the full PDF report from the Reports section." />
          <StepCard num={5} icon={Rocket}    title="Gate your deployment"         desc="If all critical findings are resolved, the Deploy button activates. Click it to push your containerized app to AWS ECS." />
        </div>
        <CodeBlock title=".secflow.yml (optional override)" language="yaml" code={'# .secflow.yml -- override defaults at the repo root\nscan:\n  sast: true\n  dast: true\n  dependencies: true\n  secrets: true\n\nthresholds:\n  block_on_critical: true\n  block_on_high: false\n\ndeploy:\n  target: aws-ecs\n  region: us-east-1\n  health_check_path: /health'} />
        <Callout type="warning">If no .secflow.yml is present, SecFlow applies secure defaults: all scanners enabled, critical findings block deployment.</Callout>
      </div>
    ),
    'connecting-repos': (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">SecFlow supports two authentication methods for connecting GitHub repositories: OAuth App (recommended) and Personal Access Tokens.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">OAuth Connection (Recommended)</h3>
        <div className="space-y-3 mb-6">
          <StepCard num={1} icon={GitBranch}   title="Navigate to Integrations"   desc="Open Settings then Integrations in your SecFlow dashboard." />
          <StepCard num={2} icon={CheckCircle2} title="Authorize GitHub OAuth"    desc="Click Connect GitHub. You will be redirected to GitHub to grant repository read access. Select All Repositories or specific ones." />
          <StepCard num={3} icon={ArrowRight}   title="Select a repository"       desc="Back in SecFlow, go to New Project and your authorized repositories will appear in the dropdown picker." />
        </div>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Personal Access Token (PAT)</h3>
        <CodeBlock language="bash" code={'# GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)\n# Required scopes: repo (read), read:org\n\n# Paste your PAT in SecFlow -> Settings -> Integrations -> Add Token'} />
        <Callout type="security">SecFlow stores all PATs encrypted at rest using AES-256 and never exposes them in API responses or logs. Tokens are only used server-side to clone repositories.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Supported Repository Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[{label:'Public Repos',status:'All plans',color:'text-emerald-400'},{label:'Private Repos',status:'Pro & Team',color:'text-blue-400'},{label:'GitHub Enterprise',status:'Team plan',color:'text-purple-400'}].map((item) => (
            <div key={item.label} className="p-4 rounded-xl border border-[#1E2235] bg-[#0D0F1C]/40 text-center"><p className="text-sm font-semibold text-white mb-1">{item.label}</p><p className={`text-xs font-medium ${item.color}`}>{item.status}</p></div>
          ))}
        </div>
      </div>
    ),
    sast: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Static Application Security Testing analyzes your source code without executing it, identifying vulnerabilities such as SQL injection, XSS, insecure deserialization, and hardcoded credentials.</p>
        <Callout type="info">SecFlow runs SAST using Semgrep (multi-language rule sets) and Bandit (Python-specific analysis) in parallel within the isolated sandbox.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Supported Languages</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Python','JavaScript','TypeScript','Go','Java','C#','PHP','Ruby','Kotlin','Rust'].map((lang) => (<span key={lang} className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">{lang}</span>))}
        </div>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">Rule Categories</h3>
        <div className="rounded-xl border border-[#1E2235] overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#0A0B14] border-b border-[#1E2235]"><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Examples</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</th></tr></thead>
            <tbody className="divide-y divide-[#1E2235]">
              {[['Injection Flaws','SQL injection, Command injection, LDAP injection','Critical'],['Broken Auth','Hardcoded credentials, weak JWT, session fixation','Critical / High'],['XSS','Reflected, Stored, DOM-based cross-site scripting','High'],['Insecure Deserialization','Object injection, pickle, YAML loading','High'],['Security Misconfiguration','Debug mode, CORS wildcard, open redirects','Medium'],['Sensitive Data Exposure','Logging PII, unencrypted storage, weak ciphers','Medium / High']].map(([cat,ex,sev]) => (
                <tr key={cat} className="hover:bg-[#12141F]/60 transition-colors"><td className="px-4 py-3 font-medium text-slate-300 whitespace-nowrap">{cat}</td><td className="px-4 py-3 text-slate-400 text-xs">{ex}</td><td className="px-4 py-3"><span className={`text-xs font-semibold ${sev.includes('Critical') ? 'text-red-400' : sev.includes('High') ? 'text-orange-400' : 'text-amber-400'}`}>{sev}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    dast: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Dynamic Application Security Testing probes your application while it is running inside the sandbox, uncovering vulnerabilities that only appear at runtime such as authentication bypass, SSRF, and broken access controls.</p>
        <Callout type="warning">DAST requires a successful build inside the sandbox. If the project fails to build, the DAST stage is skipped and flagged in the report.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">How DAST Works</h3>
        <div className="space-y-3">
          <StepCard num={1} icon={Box}      title="Sandbox Build"       desc="Your project is built inside an isolated Docker container with no external network access." />
          <StepCard num={2} icon={Radar}    title="Endpoint Discovery"  desc="SecFlow crawls the running application to discover all accessible endpoints and API routes." />
          <StepCard num={3} icon={Code}     title="Active Probing"      desc="Crafted payloads are sent to each endpoint to test for injection, auth bypass, and misconfiguration." />
          <StepCard num={4} icon={FileText} title="Finding Correlation" desc="Results are correlated with SAST findings to de-duplicate and prioritize the most impactful vulnerabilities." />
        </div>
        <Callout type="security">DAST probing is performed entirely within the sandbox network segment. No probing traffic ever reaches external systems or production infrastructure.</Callout>
      </div>
    ),
    dependency: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Dependency scanning analyses every third-party library your project depends on including transitive dependencies and maps them to known CVEs in the NVD.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-3">Tools Used</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[{name:'Trivy',desc:'Container, OS, and language-level dependency scanning with SBOM generation.'},{name:'OWASP Dependency-Check',desc:'Java, .NET, Node and Python package CVE lookup against NVD.'}].map((tool) => (
            <div key={tool.name} className="p-4 rounded-xl border border-[#1E2235] bg-[#0D0F1C]/40"><p className="text-sm font-bold text-emerald-400 mb-1">{tool.name}</p><p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p></div>
          ))}
        </div>
        <CodeBlock language="bash" code={'# SecFlow generates a full SBOM for every scan\n# Available as JSON (CycloneDX) in the scan artifacts\n\nsecflow sbom export --project my-api --format cyclonedx > sbom.json'} />
        <Callout type="tip">Download your SBOM from the scan artifacts panel to include in enterprise security questionnaires or SOC 2 audit evidence packages.</Callout>
      </div>
    ),
    secrets: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Secrets Detection scans your repository including the entire Git commit history for hardcoded API keys, tokens, passwords, private keys, and other credentials that should never be committed.</p>
        <Callout type="security">SecFlow uses Gitleaks with an extended rule set covering 150+ secret patterns across AWS, GitHub, Stripe, Twilio, GCP, Azure, and more.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">What Gets Detected</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {['AWS Access Keys','GitHub Tokens','Stripe Secret Keys','Google API Keys','Azure Client Secrets','Twilio Auth Tokens','Private SSH Keys','JWT Secrets','Database URLs','Slack Webhooks'].map((item) => (<span key={item} className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">{item}</span>))}
        </div>
        <CodeBlock language="bash" code={'# Gitleaks scans the full git history by default\n# Add a .gitleaksignore to exclude files or patterns:\n\n# .gitleaksignore\npath:tests/fixtures/mock_keys.py\nregex:EXAMPLE_KEY_[A-Z0-9]+'} />
      </div>
    ),
    sandbox: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Every SecFlow scan runs inside a fresh, isolated Docker container provisioned on demand and destroyed immediately after the scan completes. Your code never persists beyond the scan lifecycle.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">Sandbox Guarantees</h3>
        <div className="space-y-2">
          {[{icon:Lock,text:'No external network access — sandbox containers run on an isolated network segment with no egress.'},{icon:Box,text:'Ephemeral execution — containers are created fresh for each scan and destroyed on completion.'},{icon:ShieldCheck,text:'No cross-tenant access — each organization sandboxes run on dedicated container namespaces.'},{icon:Database,text:'Scan artifacts (reports, logs, SBOM) are stored in encrypted object storage, separate from the sandbox.'}].map(({icon:ItemIcon,text}) => (
            <div key={text} className="flex items-start gap-3 p-3.5 rounded-xl border border-[#1E2235] bg-[#0D0F1C]/40"><ItemIcon className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" /><p className="text-sm text-slate-300 leading-relaxed">{text}</p></div>
          ))}
        </div>
        <Callout type="info">Sandbox runtime limit: 15 minutes max per scan. Builds that exceed the timeout are terminated and reported as a pipeline failure, not a security pass.</Callout>
      </div>
    ),
    deployment: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">SecFlow deployment gate ensures only code that passes all blocking scan thresholds can be deployed to cloud infrastructure. Deployment is one-click but gated by your scan policy.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">Deployment Flow</h3>
        <div className="space-y-3">
          <StepCard num={1} icon={CheckCircle2} title="Scan completion check"    desc="All configured scan engines must complete with no blocking findings (Critical by default, High if configured)." />
          <StepCard num={2} icon={Box}          title="Docker image build"       desc="SecFlow builds a production Docker image of your application using the Dockerfile in your repository root." />
          <StepCard num={3} icon={Rocket}       title="ECR push"                 desc="The image is pushed to AWS Elastic Container Registry in your connected AWS account." />
          <StepCard num={4} icon={Network}      title="ECS service deployment"   desc="An ECS service is created or updated with the new image, attached to an Application Load Balancer." />
          <StepCard num={5} icon={ShieldCheck}  title="Health check + monitoring" desc="SecFlow polls the ALB health endpoint and activates CloudWatch monitoring dashboards. Rollback is automatic if health checks fail." />
        </div>
        <CodeBlock language="yaml" title="secflow-deploy.yml" code={'deploy:\n  target: aws-ecs\n  region: us-east-1\n  cluster: secflow-prod\n  service: my-api-service\n  health_check_path: /health\n  health_check_timeout: 60\n  rollback_on_failure: true'} />
      </div>
    ),
    aggregation: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">After all scan engines complete, SecFlow aggregates and normalizes their raw outputs into a unified findings model enriched with CVE identifiers, CWE classifications, and CVSS severity scores.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">Severity Levels</h3>
        <div className="rounded-xl border border-[#1E2235] overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#0A0B14] border-b border-[#1E2235]"><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">CVSS Range</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deployment Impact</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA</th></tr></thead>
            <tbody className="divide-y divide-[#1E2235]">
              {[{level:'Critical',range:'9.0-10.0',color:'text-red-400',impact:'Blocks deployment',sla:'Fix within 24h'},{level:'High',range:'7.0-8.9',color:'text-orange-400',impact:'Configurable block',sla:'Fix within 72h'},{level:'Medium',range:'4.0-6.9',color:'text-amber-400',impact:'Warning only',sla:'Fix within 2 weeks'},{level:'Low',range:'0.1-3.9',color:'text-blue-400',impact:'Informational',sla:'Best effort'},{level:'Info',range:'0.0',color:'text-slate-400',impact:'No block',sla:'No SLA'}].map((row) => (
                <tr key={row.level} className="hover:bg-[#12141F]/60 transition-colors"><td className={`px-4 py-3 font-bold ${row.color}`}>{row.level}</td><td className="px-4 py-3 text-slate-400 font-mono text-xs">{row.range}</td><td className="px-4 py-3 text-slate-300 text-xs">{row.impact}</td><td className="px-4 py-3 text-slate-400 text-xs">{row.sla}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    'fix-patches': (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">For each confirmed finding, SecFlow generates a plain-language explanation and proposes a concrete code fix that can be reviewed and applied directly from the dashboard.</p>
        <Callout type="info">Fix patches are proposed for developer review. SecFlow never automatically modifies your source code without an explicit approval action.</Callout>
        <h3 className="text-base font-semibold text-white mt-8 mb-4">Fix Workflow</h3>
        <div className="space-y-3">
          <StepCard num={1} icon={Search}       title="Finding explanation" desc="Each vulnerability is explained in plain language: what it is, why it matters, and what an attacker could do with it." />
          <StepCard num={2} icon={Code}         title="Patch proposal"      desc="A concrete code change is proposed as a diff against your original code. You can review it before applying." />
          <StepCard num={3} icon={CheckCircle2} title="Apply and re-scan"   desc="Click Apply Fix to create a patch branch. SecFlow automatically re-scans the patched code to confirm the vulnerability is resolved." />
          <StepCard num={4} icon={GitBranch}    title="Pull request"        desc="If re-scan passes, SecFlow opens a pull request against your configured default branch for final team review." />
        </div>
      </div>
    ),
    standards: (
      <div>
        <p className="text-slate-300 leading-relaxed mb-6">Every SecFlow finding is automatically mapped to industry security standards and compliance frameworks, giving you audit-ready evidence without manual cross-referencing.</p>
        <h3 className="text-base font-semibold text-white mt-6 mb-4">Compliance Coverage</h3>
        <div className="rounded-xl border border-[#1E2235] overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#0A0B14] border-b border-[#1E2235]"><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Standard</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Coverage</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plans</th></tr></thead>
            <tbody className="divide-y divide-[#1E2235]">
              {[['OWASP Top 10 (2021/2025)','Full mapping across all 10 categories','All plans'],['CWE (Common Weakness Enumeration)','CWE ID on every finding','All plans'],['CVE / NVD','Dependency findings linked to CVE IDs','All plans'],['CVSS v3.1','Base score on all dependency CVEs','All plans'],['SOC 2 Type II','Evidence package for security controls','Pro & Team'],['ISO 27001','Annex A control mapping','Team plan'],['PCI DSS v4.0','Requirement 6 (Secure Software) coverage','Team plan']].map(([std,cov,plan]) => (
                <tr key={std} className="hover:bg-[#12141F]/60 transition-colors"><td className="px-4 py-3 font-medium text-slate-300">{std}</td><td className="px-4 py-3 text-slate-400 text-xs">{cov}</td><td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">{plan}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  const idx = allItems.findIndex((i) => i.id === activeId);
  const prevItem = allItems[idx - 1];
  const nextItem = allItems[idx + 1];

  return (
    <div className="flex h-full min-h-screen bg-[#0A0B14]">
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-[#1E2235] bg-[#0A0B14] sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-[#1E2235]">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-7 w-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span className="font-semibold text-white text-sm">Documentation</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input type="text" placeholder="Search docs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 text-xs bg-[#12141F] border border-[#1E2235] rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {filteredSections.map((section) => {
            const SectionIcon = section.icon;
            const isOpen = openSections[section.title] !== false;
            return (
              <div key={section.title}>
                <button onClick={() => toggleSection(section.title)} className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-[#12141F] transition-colors">
                  <div className="flex items-center gap-2">
                    <SectionIcon className={`h-3.5 w-3.5 ${section.color}`} />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{section.title}</span>
                  </div>
                  <ChevronRight className={`h-3.5 w-3.5 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="ml-2 mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <button key={item.id} onClick={() => setActiveId(item.id)} className={`w-full flex items-center gap-2 pl-5 pr-3 py-2 rounded-lg text-left text-xs transition-all ${activeId === item.id ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20 font-medium' : 'text-slate-500 hover:text-slate-200 hover:bg-[#12141F]'}`}>
                        {activeId === item.id && <span className="h-1 w-1 rounded-full bg-blue-400 flex-shrink-0" />}
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#1E2235]">
          <a href="/reports" className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <FileText className="h-4 w-4 text-blue-400" />
            <div><p className="text-xs font-semibold text-white">Sample Report</p><p className="text-[10px] text-slate-500">View a real scan output</p></div>
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="mb-10 pb-8 border-b border-[#1E2235]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{meta.badge}</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-xs text-slate-500">{meta.title}</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <PageIcon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">{meta.title}</h1>
                <p className="text-slate-400 leading-relaxed">{meta.subtitle}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-600">
                  <Clock className="h-3 w-3" />
                  <span>Last updated {meta.updated}</span>
                </div>
              </div>
            </div>
          </div>
          <div key={activeId}>{DOC_CONTENT[activeId] ?? <p className="text-slate-400">Content coming soon.</p>}</div>
          <div className="mt-16 pt-8 border-t border-[#1E2235] flex items-center justify-between">
            {prevItem ? (<button onClick={() => setActiveId(prevItem.id)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"><ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" /><span>{prevItem.label}</span></button>) : <span />}
            {nextItem ? (<button onClick={() => setActiveId(nextItem.id)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group ml-auto"><span>{nextItem.label}</span><ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></button>) : <span />}
          </div>
        </div>
      </main>
    </div>
  );
}
