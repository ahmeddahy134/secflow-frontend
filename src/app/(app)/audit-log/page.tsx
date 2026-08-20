'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockAuditLog } from '@/data/mock-data';
import { FadeIn, SlideUp } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

const selectClass =
  'h-9 rounded-lg border border-[#1E2235] bg-[#12141F] px-3 text-sm text-slate-300 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors';

export default function AuditLogPage() {
  const [userFilter, setUserFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = Array.from(new Set(mockAuditLog.map((e) => e.user)));

  const filteredLog = mockAuditLog.filter((entry) => {
    if (userFilter !== 'all' && entry.user !== userFilter) return false;
    if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
    return true;
  });

  const handleExport = () => {
    toast({ variant: 'success', title: 'Export started', description: `Preparing CSV export of ${filteredLog.length} audit log entries.` });
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
          <p className="text-sm text-slate-400 mt-1">Track all actions and changes</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}><Download className="h-4 w-4 mr-2" /> Export</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Actions</option>
          <option value="success">Success only</option>
          <option value="failure">Failed only</option>
        </select>
        <select className={selectClass} value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="all">All Users</option>
          {users.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <Button variant="ghost" size="sm">All Resources</Button>
        <div className="relative flex-1 max-w-xs ml-auto">
          <Input type="date" className="text-sm h-9" />
        </div>
      </div>

      <SlideUp delay={0.1}>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E2235] text-left">
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Resource</th>
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">IP Address</th>
                  <th className="p-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2235]">
                {filteredLog.map(entry => (
                  <tr key={entry.id} className="hover:bg-[#1A1D2B] transition-colors">
                    <td className="p-4 text-xs text-slate-400">{entry.timestamp}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                          {entry.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-white">{entry.user}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-300">{entry.action}</td>
                    <td className="p-4 text-sm text-slate-400">{entry.resource}</td>
                    <td className="p-4"><code className="text-xs text-slate-500 font-mono">{entry.ipAddress}</code></td>
                    <td className="p-4">
                      <Badge variant={entry.status === 'success' ? 'success' : 'destructive'} className="text-xs capitalize">
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-[#1E2235]">
            <p className="text-xs text-slate-500">Showing {filteredLog.length} of {mockAuditLog.length} entries</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-xs text-slate-400">Page 1 of 1</span>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </SlideUp>
    </FadeIn>
  );
}
