'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, GitBranch, FolderGit2, ShieldAlert, CheckCircle2,
  Loader2, Lock, AlertTriangle, Info, Rocket, Shield,
  Terminal, Zap, Play, Container, Cloud, Cpu, Database, ChevronRight, Server, Activity, ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/Input';

// ─── Input wrapper ────────────────────────────────────────────────────────────
function Field({
  label, required, helper, error, children,
}: { label: string; required?: boolean; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p className="flex items-center gap-1 text-[11px] text-slate-600">
          <Info className="h-3 w-3 flex-shrink-0" />{helper}
        </p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400">
          <AlertTriangle className="h-3 w-3 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  `w-full px-3 py-2 text-sm rounded-lg border bg-slate-900/50 text-slate-200 placeholder-slate-600
   transition-colors focus:outline-none focus:ring-1
   ${hasError
     ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
     : 'border-slate-800 focus:border-cyan-500/80 focus:ring-cyan-500/50'}`;

// ─── Custom Select Component ──────────────────────────────────────────────────
function CustomSelect({
  value, onChange, options, placeholder = "Select...", hasError, className = "", icon: Icon
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  hasError?: boolean;
  className?: string;
  icon?: React.ElementType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none z-10" />
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputCls(hasError)} flex items-center justify-between text-left ${Icon ? 'pl-9' : ''}`}
      >
        <span className={selectedOption ? 'text-slate-200' : 'text-slate-600'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-500 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[999] top-full mt-1 w-full bg-[#0B0F19] border border-slate-800 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                  ${value === opt.value ? 'bg-slate-800/80 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-400'}`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dropdown Options ────────────────────────────────────────────────────────
const TARGET_BRANCHES = [
  { label: 'main', value: 'main' },
  { label: 'develop', value: 'develop' },
  { label: 'staging', value: 'staging' },
  { label: 'master', value: 'master' },
];

const REPO_ACCESS = [
  { label: 'Public (Open Source)', value: 'Public' },
  { label: 'Private (Internal)', value: 'Private' },
];

const BACKEND_FRAMEWORKS = [
  { label: '.NET / ASP.NET Core', value: '.NET / ASP.NET Core' },
  { label: 'Node.js / Express', value: 'Node.js / Express' },
  { label: 'Node.js / NestJS', value: 'Node.js / NestJS' },
  { label: 'Django', value: 'Django' },
  { label: 'Flask', value: 'Flask' },
  { label: 'FastAPI', value: 'FastAPI' },
  { label: 'Spring Boot', value: 'Spring Boot' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'Other', value: 'Other' },
];

const FRONTEND_FRAMEWORKS = [
  { label: 'React', value: 'React' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Nuxt.js', value: 'Nuxt.js' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Svelte', value: 'Svelte' },
  { label: 'SvelteKit', value: 'SvelteKit' },
  { label: 'HTML / CSS / JavaScript', value: 'HTML / CSS / JavaScript' },
  { label: 'Other', value: 'Other' },
];

const DATABASES = [
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'Microsoft SQL Server', value: 'Microsoft SQL Server' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Redis', value: 'Redis' },
  { label: 'Oracle', value: 'Oracle' },
  { label: 'SQLite', value: 'SQLite' },
  { label: 'Other', value: 'Other' },
  { label: 'No Database', value: 'No Database' },
];

const CLOUD_PROVIDERS = [
  { label: 'AWS ECS (Fargate)', value: 'aws-ecs' },
  { label: 'AWS EKS (Kubernetes)', value: 'aws-eks' },
  { label: 'GCP Cloud Run', value: 'gcp-cloudrun' },
  { label: 'GCP GKE (Kubernetes)', value: 'gcp-gke' },
  { label: 'Azure Container Apps', value: 'azure-aca' },
  { label: 'Azure AKS (Kubernetes)', value: 'azure-aks' },
  { label: 'Vercel (Serverless / Edge)', value: 'vercel' },
];

const TARGET_CPUS = [
  { label: '0.25 vCPU', value: '0.25' },
  { label: '0.5 vCPU', value: '0.5' },
  { label: '1 vCPU', value: '1' },
  { label: '2 vCPU', value: '2' },
];

const TARGET_MEMORY = [
  { label: '0.5 GB', value: '0.5' },
  { label: '1 GB', value: '1' },
  { label: '2 GB', value: '2' },
  { label: '4 GB', value: '4' },
];


// ─── Props ────────────────────────────────────────────────────────────────────
interface ConnectRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function ConnectRepoModal({ isOpen, onClose, onSuccess }: ConnectRepoModalProps) {
  const [step, setStep] = useState(1);
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [repoAccess, setRepoAccess] = useState('Public');
  const [dockerPath, setDockerPath] = useState('Dockerfile');
  const [manifestPath, setManifestPath] = useState('secflow/deployment.yaml');
  const [appPort, setAppPort] = useState('3000');
  const [healthCheck, setHealthCheck] = useState('/health');
  
  const [backendFramework, setBackendFramework] = useState('');
  const [frontendFramework, setFrontendFramework] = useState('');
  const [database, setDatabase] = useState('');
  
  const [cloudProvider, setCloudProvider] = useState('aws-ecs');
  const [targetCpu, setTargetCpu] = useState('1');
  const [targetMemory, setTargetMemory] = useState('2');
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0); // 0 to 10
  const [errors, setErrors] = useState<Record<string, string>>({});
  const backdropRef = useRef<HTMLDivElement>(null);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Run mock validation simulation when reaching step 4
  useEffect(() => {
    if (step === 4) {
      setIsValidating(true);
      setValidationProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 1;
        setValidationProgress(p);
        if (p >= 10) {
          clearInterval(interval);
          setIsValidating(false);
        }
      }, 350); // Simulates a fast validation process
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleClose = () => {
    // Reset state on close
    setTimeout(() => {
      setStep(1);
      setValidationProgress(0);
      setErrors({});
    }, 300);
    onClose();
  };

  const handleNext = () => {
    if (step === 1) {
      const e: Record<string, string> = {};
      if (!repoUrl.trim()) e.repoUrl = 'Repository URL is required';
      else if (!/^https?:\/\/(www\.)?github\.com\/.+\/.+/.test(repoUrl.trim()))
        e.repoUrl = 'Must be a valid GitHub URL';
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const e: Record<string, string> = {};
      if (!appPort || isNaN(Number(appPort))) e.appPort = 'Valid port required';
      if (!backendFramework) e.backendFramework = 'Required';
      if (!frontendFramework) e.frontendFramework = 'Required';
      if (!database) e.database = 'Required';
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose();
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "1. Repository Configuration";
      case 2: return "2. Application Configuration";
      case 3: return "3. Deployment Configuration";
      case 4: return "4. Pre-Flight Validation";
      default: return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          onClick={handleBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
        >
          {/* ── Modal shell ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.97, y: 16  }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl flex flex-col bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            {/* ── HEADER ─────────────────────────────────────────────── */}
            <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-slate-800/80 bg-[#0B0F19]">
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <GitBranch className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">Project Onboarding</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-cyan-400 font-semibold">{getStepTitle()}</p>
                    <span className="text-slate-600 text-[10px]">&bull;</span>
                    <p className="text-[11px] text-slate-500">Configure and trigger initial security scan</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── BODY (scrollable) ───────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 h-full"
                >
                  
                  {/* ==============================================================
                      STEP 1: REPOSITORY CONFIGURATION
                      ============================================================== */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                      <div className="space-y-5 min-w-0">
                        <Field label="GitHub Repository URL" required error={errors.repoUrl} helper="e.g. https://github.com/myorg/my-api">
                          <div className="relative">
                            <FolderGit2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                            <input
                              value={repoUrl}
                              onChange={(e) => { setRepoUrl(e.target.value); setErrors((p) => ({ ...p, repoUrl: '' })); }}
                              placeholder="https://github.com/org/repo-name"
                              className={`${inputCls(!!errors.repoUrl)} pl-9`}
                            />
                          </div>
                        </Field>

                        <Field label="Target Branch" required error={errors.branch}>
                          <CustomSelect
                            value={branch}
                            onChange={(val) => setBranch(val)}
                            options={TARGET_BRANCHES}
                            icon={GitBranch}
                            hasError={!!errors.branch}
                          />
                        </Field>

                        <Field label="Repository Access" required>
                          <CustomSelect
                            value={repoAccess}
                            onChange={(val) => setRepoAccess(val)}
                            options={REPO_ACCESS}
                            icon={Lock}
                          />
                        </Field>

                        <AnimatePresence>
                          {repoAccess === 'Private' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                              <div className="flex gap-3 p-3.5 rounded-xl border border-blue-500/25 bg-blue-500/5 mt-2">
                                <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-[11px] text-blue-200/80 leading-relaxed">
                                  Private repositories require SecFlow to have the required read access via the SecFlow GitHub App integration.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col bg-slate-900/50 p-6 rounded-xl border border-slate-800/50">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4">Repository Requirements</p>
                        <div className="space-y-3">
                          {[
                            { text: 'Complete source code available in the target branch' },
                            { text: 'Repository accessible to SecFlow GitHub App' },
                            { text: 'Application dependencies declared via standard package managers' },
                            { text: 'No raw secrets or credentials committed to the repository', critical: true },
                          ].map((req, i) => (
                            <div key={i} className={`flex items-start gap-2.5 p-3 rounded-lg border ${req.critical ? 'border-rose-500/20 bg-rose-500/5' : 'border-slate-800/50 bg-[#0B0F19]/50'}`}>
                              {req.critical ? <ShieldAlert className="h-3.5 w-3.5 text-rose-400 mt-0.5" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5" />}
                              <p className={`text-[11px] leading-relaxed ${req.critical ? 'text-rose-200' : 'text-slate-300'}`}>{req.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==============================================================
                      STEP 2: APPLICATION CONFIGURATION
                      ============================================================== */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                      <div className="space-y-5 min-w-0">
                        <Field label="Application Port" required error={errors.appPort}>
                          <div className="relative">
                            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                            <input type="number" value={appPort} onChange={(e) => setAppPort(e.target.value)} placeholder="3000" className={`${inputCls(!!errors.appPort)} pl-9`} />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-slate-800 px-1.5 py-0.5 rounded">Auto Detected</span>
                          </div>
                        </Field>

                        <Field label="Health Check Endpoint">
                          <div className="relative">
                            <Server className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                            <input value={healthCheck} onChange={(e) => setHealthCheck(e.target.value)} placeholder="/health" className={`${inputCls()} pl-9`} />
                          </div>
                        </Field>

                        <Field label="Dockerfile Path">
                          <div className="relative">
                            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                            <input value={dockerPath} onChange={(e) => setDockerPath(e.target.value)} placeholder="Dockerfile" className={`${inputCls()} pl-9`} />
                          </div>
                        </Field>

                        <Field label="Deployment Manifest Path">
                          <input value={manifestPath} onChange={(e) => setManifestPath(e.target.value)} placeholder="secflow/deployment.yaml" className={inputCls()} />
                        </Field>
                      </div>

                      <div className="flex flex-col bg-slate-900/50 p-6 rounded-xl border border-slate-800/50">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4">Technology Stack</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
                          Select the technologies used by your application.
                        </p>
                        
                        <div className="space-y-4 mt-auto">
                          <Field label="Backend Framework" required error={errors.backendFramework}>
                            <CustomSelect
                              value={backendFramework}
                              onChange={(val) => { setBackendFramework(val); setErrors((p) => ({ ...p, backendFramework: '' })); }}
                              options={BACKEND_FRAMEWORKS}
                              hasError={!!errors.backendFramework}
                            />
                          </Field>

                          <Field label="Frontend Framework" required error={errors.frontendFramework}>
                            <CustomSelect
                              value={frontendFramework}
                              onChange={(val) => { setFrontendFramework(val); setErrors((p) => ({ ...p, frontendFramework: '' })); }}
                              options={FRONTEND_FRAMEWORKS}
                              hasError={!!errors.frontendFramework}
                            />
                          </Field>

                          <Field label="Database" required error={errors.database}>
                            <CustomSelect
                              value={database}
                              onChange={(val) => { setDatabase(val); setErrors((p) => ({ ...p, database: '' })); }}
                              options={DATABASES}
                              hasError={!!errors.database}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==============================================================
                      STEP 3: DEPLOYMENT CONFIGURATION
                      ============================================================== */}
                  {step === 3 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                      <div className="space-y-5 min-w-0">
                        <Field label="Cloud Provider / Target Platform">
                          <CustomSelect
                            value={cloudProvider}
                            onChange={(val) => setCloudProvider(val)}
                            options={CLOUD_PROVIDERS}
                            icon={Cloud}
                          />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Target CPU">
                            <CustomSelect
                              value={targetCpu}
                              onChange={(val) => setTargetCpu(val)}
                              options={TARGET_CPUS}
                            />
                          </Field>
                          <Field label="Target Memory">
                            <CustomSelect
                              value={targetMemory}
                              onChange={(val) => setTargetMemory(val)}
                              options={TARGET_MEMORY}
                            />
                          </Field>
                        </div>

                      </div>

                      <div className="flex flex-col justify-center bg-slate-900/50 p-6 rounded-xl border border-slate-800/50">
                        <div className="flex gap-3 p-4 rounded-xl border border-rose-500/25 bg-rose-500/5">
                          <Lock className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-[13px] font-bold text-rose-300 mb-1">Secure Secrets Configuration</h3>
                            <p className="text-[11px] text-rose-200/80 leading-relaxed mb-4">
                              SecFlow explicitly prohibits exposing raw secrets, passwords, or production API keys in this form or within the repository.
                            </p>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              If your project requires secrets during build or runtime, please use your cloud provider's native secret management (e.g., AWS Secrets Manager, HashiCorp Vault) and inject them via secure ARNs or secret references.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==============================================================
                      STEP 4: PRE-FLIGHT VALIDATION
                      ============================================================== */}
                  {step === 4 && (
                    <div className="flex flex-col h-full max-w-3xl mx-auto items-center justify-center py-6">
                      
                      <div className="w-full mb-8 flex justify-between items-end">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">Pre-Flight Validation</h3>
                          <p className="text-xs text-slate-400">Verifying repository, configuration, and sandbox compatibility</p>
                        </div>
                        <div className="text-right">
                          {isValidating ? (
                            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                              <Loader2 className="h-4 w-4 animate-spin" /> Validating...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                              <CheckCircle2 className="h-5 w-5" /> Validation Complete
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Animated Checklists */}
                      <div className="w-full space-y-6">
                        
                        {/* Group 1: Repository */}
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Repository Checks</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <ValidationItem label="Repository accessible" passed={validationProgress >= 1} />
                            <ValidationItem label="Target branch found" passed={validationProgress >= 2} />
                            <ValidationItem label="Source code detected" passed={validationProgress >= 3} />
                          </div>
                        </div>

                        {/* Group 2: Configuration */}
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Configuration Checks</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <ValidationItem label="Dockerfile detected" passed={validationProgress >= 4} />
                            <ValidationItem label="Application port extracted" passed={validationProgress >= 5} />
                            <ValidationItem label="Deployment manifest auto-generated" passed={validationProgress >= 6} />
                            <ValidationItem label="Dependencies identified" passed={validationProgress >= 7} />
                          </div>
                        </div>

                        {/* Group 3: Docker */}
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Sandbox Docker Validation</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <ValidationItem label="Docker image built successfully" passed={validationProgress >= 8} />
                            <ValidationItem label="Container spawned securely" passed={validationProgress >= 9} />
                            <ValidationItem label="Health check endpoint responded" passed={validationProgress >= 10} />
                          </div>
                        </div>

                      </div>

                      {/* Final Success Banner */}
                      <AnimatePresence>
                        {!isValidating && validationProgress >= 10 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3"
                          >
                            <Shield className="h-5 w-5 text-emerald-400" />
                            <p className="text-sm font-bold text-emerald-300">Project is ready for Security Testing</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── STICKY FOOTER ──────────────────────────────────────────── */}
            <div className="flex-shrink-0 flex items-center justify-between p-5 border-t border-slate-800/80 bg-[#0B0F19]">
              <div>
                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-cyan-500' : i < step ? 'w-1.5 bg-emerald-500' : 'w-1.5 bg-slate-700'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={step === 1 ? handleClose : () => setStep(step - 1)}
                  disabled={step === 4 && isValidating}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-colors disabled:opacity-50"
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-slate-900 bg-white hover:bg-slate-200 transition-colors"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => { onSuccess?.(); handleClose(); }}
                    disabled={isValidating}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white
                      bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                      shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_28px_rgba(34,211,238,0.35)]
                      transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isValidating ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Validating…</>
                    ) : (
                      <><Play className="h-4 w-4 fill-white" />Continue to Security Scan</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small helper component for the validation checklist
function ValidationItem({ label, passed }: { label: string, passed: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all duration-300 ${passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/30 border-slate-800/50'}`}>
      {passed ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      ) : (
        <div className="h-4 w-4 rounded-full border-2 border-slate-700 flex-shrink-0" />
      )}
      <span className={`text-[11px] font-medium ${passed ? 'text-emerald-100' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}
