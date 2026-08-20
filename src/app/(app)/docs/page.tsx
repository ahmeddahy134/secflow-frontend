'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, ChevronRight, FileText } from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { docsContent } from '@/data/docs-content';

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState(docsContent[0]);
  const [search, setSearch] = useState('');

  const filteredDocs = docsContent.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Documentation</h1>
        <p className="text-sm text-slate-400 mt-1">Official SecFlow Documentation & Resources</p>
      </div>

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <Input placeholder="Search documentation..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <StaggerContainer className="space-y-1">
            {filteredDocs.length === 0 && (
              <p className="px-3 py-2 text-xs text-slate-500">No docs match &quot;{search}&quot;.</p>
            )}
            {filteredDocs.map((doc) => (
              <StaggerItem key={doc.title}>
                <button 
                  onClick={() => setActiveDoc(doc)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                    activeDoc.title === doc.title ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-[#12141C] hover:text-slate-200'
                  }`}
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <SlideUp key={activeDoc.title} className="h-full">
            <Card className="h-full">
              <CardContent className="p-8 max-w-none">
                <div className="mb-8 border-b border-[#1E2235] pb-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#12141C] border border-[#1E2235] text-xs font-medium text-slate-400 mb-4">
                    {activeDoc.category}
                  </div>
                  <h2 className="text-2xl font-bold text-white m-0">{activeDoc.title}</h2>
                </div>
                
                <div className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed text-sm">
                  {activeDoc.content}
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </FadeIn>
  );
}
