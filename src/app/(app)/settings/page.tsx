'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Save, GitBranch, Cloud, Bell, CreditCard, Key } from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

const settingsNav = [
  { name: 'General', icon: Key },
  { name: 'GitHub', icon: GitBranch },
  { name: 'AWS Cloud', icon: Cloud },
  { name: 'Scanners', brandIcon: '/brand/08_shield_symbol_app.png' },
  { name: 'Deployments', brandIcon: '/brand/09_cube_symbol_app.png' },
  { name: 'Notifications', icon: Bell },
  { name: 'Billing', icon: CreditCard },
];

const initialScanners = [
  { name: 'Semgrep SAST', desc: 'Static analysis for security vulnerabilities in code.', enabled: true, type: 'sast' },
  { name: 'Trivy Depend', desc: 'Scans dependencies and container images for CVEs.', enabled: true, type: 'sca' },
  { name: 'Nuclei DAST', desc: 'Dynamic application security testing against running apps.', enabled: true, type: 'dast' },
  { name: 'Gitleaks Secrets', desc: 'Detects hardcoded secrets, passwords, and API keys.', enabled: true, type: 'secret' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Scanners');
  const [scanners, setScanners] = useState(initialScanners);

  const toggleScanner = (name: string) => {
    setScanners((prev) => prev.map((s) => (s.name === name ? { ...s, enabled: !s.enabled } : s)));
  };

  const handleSave = () => {
    toast({ variant: 'success', title: 'Settings saved', description: 'Your workspace configuration has been updated.' });
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage workspace settings, security scanners, and cloud integrations</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {settingsNav.map(item => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all text-left ${
                activeTab === item.name ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500' : 'text-slate-400 hover:bg-[#12141F] hover:text-slate-200'
              }`}>
                {item.brandIcon ? (
                  <div className="relative h-5 w-5 flex-shrink-0">
                    <Image src={item.brandIcon} alt={item.name} fill sizes="20px" className="object-contain" />
                  </div>
                ) : item.icon ? (
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                ) : null}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <SlideUp key={activeTab} duration={0.3}>
            <Card className="border-[#1E2235] bg-[#12141F]">
              <CardHeader className="border-b border-[#1E2235]">
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  {activeTab === 'Scanners' && (
                    <div className="relative h-6 w-6">
                      <Image src="/brand/08_shield_symbol_app.png" alt="Security" fill sizes="24px" className="object-contain" />
                    </div>
                  )}
                  {activeTab === 'Deployments' && (
                    <div className="relative h-6 w-6">
                      <Image src="/brand/09_cube_symbol_app.png" alt="Deployments" fill sizes="24px" className="object-contain" />
                    </div>
                  )}
                  {activeTab} Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {activeTab === 'Scanners' ? (
                  <>
                    <p className="text-sm text-slate-400 mb-6">Enable or disable security scanners for your automated pipeline.</p>
                    <StaggerContainer className="space-y-4">
                      {scanners.map(scanner => (
                        <StaggerItem key={scanner.name}>
                          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0A0B14] border border-[#1E2235]">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-200">{scanner.name}</span>
                                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{scanner.type}</Badge>
                              </div>
                              <p className="text-sm text-slate-400">{scanner.desc}</p>
                            </div>
                            <button
                              onClick={() => toggleScanner(scanner.name)}
                              role="switch"
                              aria-checked={scanner.enabled}
                              aria-label={`Toggle ${scanner.name}`}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${scanner.enabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scanner.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <p className="text-sm text-slate-400">
                      {activeTab} settings are managed per-workspace. Contact your organization admin to make changes here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </FadeIn>
  );
}
