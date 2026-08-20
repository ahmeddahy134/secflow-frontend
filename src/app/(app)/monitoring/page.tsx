'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cpu, MemoryStick, Timer, Activity, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockMetrics, mockCpuTimeSeries, mockMemoryTimeSeries } from '@/data/mock-data';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

function MiniChart({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 100;
  const h = 50;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.value - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#gradient-${color})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function MonitoringPage() {
  const iconMap: Record<string, React.ReactNode> = {
    CPU: <Cpu className="h-4 w-4 text-blue-400" />,
    Memory: <MemoryStick className="h-4 w-4 text-purple-400" />,
    'Response Time': <Timer className="h-4 w-4 text-amber-400" />,
    Requests: <Activity className="h-4 w-4 text-emerald-400" />,
    'Error Rate': <AlertTriangle className="h-4 w-4 text-red-400" />,
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoring</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time infrastructure metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-[#1E2235] text-slate-400">Production</Badge>
          <Badge variant="outline" className="border-[#1E2235] text-slate-400">Last 24h</Badge>
        </div>
      </div>

      {/* Metric Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {mockMetrics.map(metric => (
          <StaggerItem key={metric.label}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {iconMap[metric.label]}
                <span className="text-xs text-slate-500 font-medium">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <span className="text-sm text-slate-400">{metric.unit}</span>
              </div>
              <div className={`flex items-center gap-1 mt-1 text-xs ${
                metric.trend === 'up' ? 'text-red-400' :
                metric.trend === 'down' ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> :
                 metric.trend === 'down' ? <TrendingDown className="h-3 w-3" /> :
                 <Minus className="h-3 w-3" />}
                {metric.trendValue}
              </div>
            </CardContent>
          </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Charts */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.2}>
        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-400" /> CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MiniChart data={mockCpuTimeSeries} color="#3B82F6" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500">00:00</span>
              <span className="text-xs text-slate-500">12:00</span>
              <span className="text-xs text-slate-500">Now</span>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>

        <StaggerItem>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <MemoryStick className="h-4 w-4 text-purple-400" /> Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MiniChart data={mockMemoryTimeSeries} color="#8B5CF6" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500">00:00</span>
              <span className="text-xs text-slate-500">12:00</span>
              <span className="text-xs text-slate-500">Now</span>
            </div>
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>
    </FadeIn>
  );
}
