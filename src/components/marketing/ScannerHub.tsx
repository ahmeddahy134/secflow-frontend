'use client';

import React from 'react';
import Image from 'next/image';
import { Code, Radar, Network, Key, Box, Database, FileText, Rocket } from 'lucide-react';

const NODES = [
  { id: 'sast', label: 'SAST', icon: Code, px: 50, py: 15.71, delay: 0, color: 'text-blue-400', hoverColor: 'group-hover:text-blue-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(96,165,250,0.3)]', border: 'group-hover:border-blue-400/50' },
  { id: 'dast', label: 'DAST', icon: Radar, px: 74.29, py: 25.71, delay: 0.3, color: 'text-amber-400', hoverColor: 'group-hover:text-amber-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(251,191,36,0.3)]', border: 'group-hover:border-amber-400/50' },
  { id: 'deps', label: 'Dependency Scan', icon: Network, px: 84.29, py: 50, delay: 0.6, color: 'text-emerald-400', hoverColor: 'group-hover:text-emerald-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(52,211,153,0.3)]', border: 'group-hover:border-emerald-400/50' },
  { id: 'secrets', label: 'Secrets Scan', icon: Key, px: 74.29, py: 74.29, delay: 0.9, color: 'text-rose-400', hoverColor: 'group-hover:text-rose-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(251,113,133,0.3)]', border: 'group-hover:border-rose-400/50' },
  { id: 'sandbox', label: 'Isolated Sandbox', icon: Box, px: 50, py: 84.29, delay: 1.2, color: 'text-purple-400', hoverColor: 'group-hover:text-purple-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(192,132,252,0.3)]', border: 'group-hover:border-purple-400/50' },
  { id: 'agg', label: 'Vulnerability Aggregation', icon: Database, px: 25.71, py: 74.29, delay: 1.5, color: 'text-pink-400', hoverColor: 'group-hover:text-pink-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(244,114,182,0.3)]', border: 'group-hover:border-pink-400/50' },
  { id: 'reports', label: 'Report Generation', icon: FileText, px: 15.71, py: 50, delay: 1.8, color: 'text-slate-300', hoverColor: 'group-hover:text-white', glow: 'group-hover:shadow-[0_10px_35px_rgba(248,250,252,0.2)]', border: 'group-hover:border-slate-300/50' },
  { id: 'deploy', label: 'Multi Deployment', icon: Rocket, px: 25.71, py: 25.71, delay: 2.1, color: 'text-cyan-400', hoverColor: 'group-hover:text-cyan-300', glow: 'group-hover:shadow-[0_10px_35px_rgba(34,211,238,0.3)]', border: 'group-hover:border-cyan-400/50' },
];

export function ScannerHub() {
  return (
    <div className="w-full max-w-[900px] mx-auto font-sans flex flex-col items-center">
      {/* Header Text Section */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141F]/80 border border-[#1E2235] text-[#22D3EE] text-xs font-semibold mb-5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.15)] uppercase tracking-wider">
          SCANNER ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight">
          <span className="text-white">All Scanners. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#9333EA]">One Unified Core.</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-[750px] mx-auto leading-relaxed">
          8 specialized security modules feeding findings into SecFlow—the single source of truth for your entire DevSecOps pipeline.
        </p>
      </div>

      <div className="relative w-full max-w-[700px] aspect-square mx-auto">
        {/* SVG Background Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        
        {/* Outer orbit ring */}
        <circle cx="350" cy="350" r="240" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" strokeDasharray="4 8" />
        
        {/* Inner hub ring */}
        <circle cx="350" cy="350" r="90" fill="rgba(147, 51, 234, 0.05)" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="1.5" />
        
        {/* Pulse ring 1 */}
        <circle cx="350" cy="350" r="90" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5">
          <animate attributeName="r" values="90;150;90" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        
        {/* Pulse ring 2 (offset) */}
        <circle cx="350" cy="350" r="90" fill="none" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="1">
          <animate attributeName="r" values="90;180;90" dur="4s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="4s" begin="2s" repeatCount="indefinite" />
        </circle>

        {/* Connection lines & data packets */}
        {NODES.map((node, i) => {
          // Convert percentages back to SVG coords for lines (based on 700x700)
          const x = (node.px / 100) * 700;
          const y = (node.py / 100) * 700;
          
          return (
            <g key={`connection-${node.id}`}>
              <line 
                x1="350" y1="350" 
                x2={x} y2={y} 
                stroke="rgba(147, 51, 234, 0.2)" 
                strokeWidth="1" 
                strokeDasharray="4 6" 
              />
              <path id={`path-${node.id}`} d={`M${x},${y} L350,350`} fill="none" />
              <circle r="4" fill={i % 2 === 0 ? "#22D3EE" : "#A855F7"} opacity="0.8">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${node.delay}s`}>
                  <mpath href={`#path-${node.id}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Center Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-max">
        {/* Multi-layered premium glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-[#2563EB]/40 to-[#9333EA]/40 rounded-full blur-[60px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
        
        {/* Logo perfectly centered on the SVG rings */}
        <div className="relative flex items-center justify-center z-10">
           <div className="relative h-24 w-24 sm:h-32 sm:w-32">
             <Image src="/brand/10_favicon_small_icon.png" alt="SecFlow Logo" fill sizes="128px" className="object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.8)]" priority />
           </div>
        </div>
        
        {/* Text absolutely positioned below so it doesn't offset the logo's center */}
        <div className="absolute top-[120%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 w-max text-center">
          <div className="text-white font-black tracking-[0.2em] text-sm sm:text-base uppercase drop-shadow-lg">
            SecFlow Core
          </div>
          <div className="text-[#22D3EE] font-medium tracking-widest text-[10px] sm:text-xs uppercase bg-[#0A0B14]/80 px-4 py-1.5 rounded-full border border-[#1E2235] shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            Unified Security Intelligence
          </div>
        </div>
      </div>

      {/* Surrounding Nodes */}
      {NODES.map((node) => (
        <div 
          key={`node-${node.id}`}
          className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${node.px}%`, top: `${node.py}%` }}
        >
          {/* Subtle node glow on hover */}
          <div className="absolute inset-0 bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/20 blur-2xl rounded-full transition-colors duration-500 pointer-events-none" />
          
          <div className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-[#1A1D2B]/95 to-[#12141F]/95 border border-[#2A2F45] ${node.border} shadow-2xl ${node.glow} flex items-center justify-center backdrop-blur-xl transition-all duration-300 transform group-hover:scale-110`}>
            <node.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${node.color} ${node.hoverColor} transition-colors duration-300 drop-shadow-md`} strokeWidth={1.5} />
          </div>
          <div className={`mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white bg-[#0A0B14]/95 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-xl border border-[#1E2235] ${node.border} transition-all whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.6)] text-center tracking-wide`}>
            {node.label}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
