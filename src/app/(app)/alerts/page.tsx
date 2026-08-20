'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { Badge } from '@/components/ui/Badge';
import { Bell, CheckCircle2, Clock } from 'lucide-react';
import { mockAlerts as initialAlerts } from '@/data/mock-data';
import type { Severity, Alert } from '@/types';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const acknowledge = (alert: Alert) => {
    setAlerts((prev) => prev.map((a) => (a.id === alert.id ? { ...a, acknowledged: true } : a)));
    toast({ variant: 'success', title: 'Alert acknowledged', description: alert.title });
  };

  const groupedAlerts: Record<Severity, typeof alerts> = {
    critical: alerts.filter(a => a.severity === 'critical'),
    high: alerts.filter(a => a.severity === 'high'),
    medium: alerts.filter(a => a.severity === 'medium'),
    low: alerts.filter(a => a.severity === 'low'),
    info: [],
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts</h1>
          <p className="text-sm text-slate-400 mt-1">{alerts.filter(a => !a.acknowledged).length} unacknowledged alerts</p>
        </div>
      </div>

      {(['critical', 'high', 'medium'] as Severity[]).map(severity => {
        const alerts = groupedAlerts[severity];
        if (alerts.length === 0) return null;
        return (
          <div key={severity} className="space-y-3">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={severity} />
              <span className="text-sm text-slate-500">({alerts.length})</span>
            </div>
            <StaggerContainer className="space-y-3" staggerDelay={0.05}>
              {alerts.map(alert => (
                <StaggerItem key={alert.id}>
                <Card className={`card-hover ${!alert.acknowledged ? 'border-l-2' : ''} ${
                  alert.severity === 'critical' ? 'border-l-red-500' :
                  alert.severity === 'high' ? 'border-l-orange-500' : 'border-l-amber-500'
                }`}>
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-white">{alert.title}</h3>
                          {alert.acknowledged && (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                              <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Acknowledged
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Bell className="h-3 w-3" /> {alert.environment}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {alert.triggeredAt}</span>
                        </div>
                      </div>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledge(alert)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap ml-4"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );
      })}
    </FadeIn>
  );
}
