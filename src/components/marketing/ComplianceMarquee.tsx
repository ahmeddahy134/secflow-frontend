import React from 'react';
import { ShieldCheck } from 'lucide-react';

const frameworks = ['OWASP Top 10', 'CWE', 'CVE', 'CVSS', 'SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST 800-53'];

export function ComplianceMarquee() {
  const items = [...frameworks, ...frameworks];
  return (
    <div className="relative overflow-hidden border-y border-[#1E2235] bg-[#0A0B14] py-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max items-center gap-10 animate-marquee">
        {items.map((f, i) => (
          <span key={`${f}-${i}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 whitespace-nowrap">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-600" />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
