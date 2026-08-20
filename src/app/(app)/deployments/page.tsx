'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Rocket, ExternalLink, RotateCcw, XCircle } from 'lucide-react';
import { mockDeployments } from '@/data/mock-data';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

export default function DeploymentsPage() {
  const deployment = mockDeployments[0];

  const handleRollback = () => {
    toast({ variant: 'warning', title: 'Rollback initiated', description: `Reverting ${deployment.repositoryName} to the previous healthy release.` });
  };

  const handleNewDeployment = () => {
    toast({ variant: 'info', title: 'Deployment queued', description: 'Building image and preparing ECS task definition...' });
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Deployments</h1>
          <p className="text-sm text-slate-400 mt-1">{deployment.repositoryName}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleRollback}><RotateCcw className="h-4 w-4 mr-2" /> Rollback</Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" size="sm" onClick={handleNewDeployment}>
            <Rocket className="h-4 w-4 mr-2" /> New Deployment
          </Button>
        </div>
      </div>

      {/* Deployment Progress */}
      <SlideUp delay={0.1}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">Deployment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployment.stages.map((stage, i) => (
              <div key={stage.name} className="flex items-center gap-4">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  stage.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                  stage.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400 animate-pulse' :
                  stage.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                  'bg-[#1A1D2B] text-slate-500'
                }`}>
                  {stage.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                   stage.status === 'failed' ? <XCircle className="h-4 w-4" /> :
                   <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{stage.name}</span>
                    <span className={`text-xs capitalize ${
                      stage.status === 'completed' ? 'text-emerald-400' :
                      stage.status === 'in_progress' ? 'text-blue-400' :
                      stage.status === 'failed' ? 'text-red-400' : 'text-slate-500'
                    }`}>{stage.status.replace('_', ' ')}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1E2235] overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${
                      stage.status === 'completed' ? 'bg-emerald-500 w-full' :
                      stage.status === 'in_progress' ? 'bg-blue-500 w-1/2 animate-pulse' :
                      'w-0'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </SlideUp>

      {/* Deployment Info */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.2}>
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">Deployment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Environment', value: deployment.environment, badge: true },
                { label: 'Region', value: deployment.region },
                { label: 'Status', value: deployment.status },
                { label: 'Deployed', value: deployment.deployedAt },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#1E2235] last:border-0">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  {item.badge ? (
                    <Badge variant="outline" className="capitalize">{item.value}</Badge>
                  ) : (
                    <span className="text-sm font-medium text-white capitalize">{String(item.value).replace('_', ' ')}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                deployment.healthStatus === 'healthy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                <CheckCircle2 className={`h-8 w-8 ${
                  deployment.healthStatus === 'healthy' ? 'text-emerald-400' : 'text-red-400'
                }`} />
              </div>
              <div>
                <p className={`text-lg font-semibold capitalize ${
                  deployment.healthStatus === 'healthy' ? 'text-emerald-400' : 'text-red-400'
                }`}>{deployment.healthStatus}</p>
                <p className="text-xs text-slate-500">All targets responding</p>
              </div>
            </div>

            {deployment.applicationUrl && (
              <div className="rounded-lg bg-[#0A0B0E] border border-[#1E2235] p-4">
                <p className="text-xs text-slate-500 mb-2">Application URL</p>
                <a href={deployment.applicationUrl} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  {deployment.applicationUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>
    </FadeIn>
  );
}
