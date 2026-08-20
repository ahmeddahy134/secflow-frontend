'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { EmptyState } from '@/components/ui/EmptyState';
import { FolderGit2, Search, Plus, ExternalLink, GitBranch, Clock, Shield } from 'lucide-react';
import { mockRepositories } from '@/data/mock-data';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { toast } from '@/store/toast-store';

type StatusFilter = 'all' | 'connected' | 'failed';

export default function RepositoriesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [isConnecting, setIsConnecting] = useState(false);

  const filtered = mockRepositories.filter((r) => {
    if (!r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter === 'connected') return r.lastScanStatus !== 'failed';
    if (statusFilter === 'failed') return r.lastScanStatus === 'failed';
    return true;
  });

  const handleConnect = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    toast({ variant: 'info', title: 'Opening GitHub authorization...' });
    setTimeout(() => {
      toast({ variant: 'success', title: 'Repository sync started', description: 'SecFlow is indexing your GitHub organization.' });
      setIsConnecting(false);
    }, 900);
  };

  const handleScanNow = (e: React.MouseEvent, repoName: string) => {
    e.stopPropagation();
    toast({ variant: 'info', title: `Scan queued for ${repoName}`, description: 'Cloning into an isolated sandbox...' });
    router.push('/scans/latest');
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Repositories</h1>
          <p className="text-sm text-slate-400 mt-1">Manage and scan your connected repositories</p>
        </div>
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20"
        >
          <Plus className="h-4 w-4 mr-2" /> {isConnecting ? 'Connecting...' : 'Connect Repository'}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input placeholder="Search repositories..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={statusFilter === 'all' ? 'default' : 'ghost'} size="sm" onClick={() => setStatusFilter('all')}>All</Button>
          <Button variant={statusFilter === 'connected' ? 'default' : 'ghost'} size="sm" onClick={() => setStatusFilter('connected')}>Connected</Button>
          <Button variant={statusFilter === 'failed' ? 'default' : 'ghost'} size="sm" onClick={() => setStatusFilter('failed')}>Failed</Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          type="general"
          title="No repositories found"
          description={search ? `No repositories match your search criteria "${search}".` : 'No repositories match the selected filter.'}
          actionLabel="Clear Filters"
          onAction={() => { setSearch(''); setStatusFilter('all'); }}
        />
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(repo => (
            <StaggerItem key={repo.id}>
              <Card
                className="card-hover cursor-pointer h-full border-[#1E2235] bg-[#12141F]"
                onClick={() => router.push('/scans/latest')}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#0A0B14] border border-[#1E2235] flex items-center justify-center">
                        <FolderGit2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{repo.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <GitBranch className="h-3 w-3" /> {repo.branch}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${repo.language === 'TypeScript' ? 'text-blue-400 border-blue-500/30' : repo.language === 'Python' ? 'text-yellow-400 border-yellow-500/30' : 'text-cyan-400 border-cyan-500/30'}`}>
                      {repo.language}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="rounded-lg bg-[#0A0B14] border border-[#1E2235] p-2.5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Score</p>
                      <p className="text-sm font-semibold text-white">{repo.securityScore ?? '—'}/100</p>
                    </div>
                    <div className="rounded-lg bg-[#0A0B14] border border-[#1E2235] p-2.5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Scan</p>
                      <p className="text-xs text-slate-300 flex items-center gap-1"><Clock className="h-3 w-3" />{repo.lastScan ?? 'Never'}</p>
                    </div>
                    <div className="rounded-lg bg-[#0A0B14] border border-[#1E2235] p-2.5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Status</p>
                      {repo.lastScanStatus ? <StatusIndicator status={repo.lastScanStatus} /> : <span className="text-xs text-slate-500">—</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1E2235]">
                    <a
                      href={repo.url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> View on GitHub
                    </a>
                    <Button
                      size="sm"
                      onClick={(e) => handleScanNow(e, repo.name)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs h-8 px-4 shadow-md"
                    >
                      <Shield className="h-3 w-3 mr-1.5" /> Scan Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </FadeIn>
  );
}
