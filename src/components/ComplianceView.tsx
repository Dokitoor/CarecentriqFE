import React, { useState } from 'react';
import { toast } from '../lib/toast';
import {
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  FileText,
  ArrowUpRight,
  Filter,
  Check,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { StatCards } from './StatCards';

interface ComplianceViewProps {
  onNavigate: (viewId: string) => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({ onNavigate }) => {
  const [period, setPeriod] = useState<'1w' | '1m' | '3m' | '6m'>('1m');

  const MODULES = [
    {
      id: 'isp',
      title: 'ISP Reports',
      count: 3,
      status: 'overdue reports',
      total: 19,
      done: 16,
      trend: '-1 from last month',
      trendType: 'good',
      color: '#00342f',
    },
    {
      id: 'notes',
      title: 'Daily Progress Notes',
      count: 5,
      status: 'pending today',
      total: 34,
      done: 29,
      trend: '-2 from yesterday',
      trendType: 'good',
      color: '#2ee05a',
    },
    {
      id: 'calendar',
      title: 'Authorized Hours',
      count: 4,
      status: 'clients under quota',
      total: 22,
      done: 18,
      trend: '+1 this week',
      trendType: 'bad',
      color: '#f0a31a',
    },
    {
      id: 'drills',
      title: 'Monthly Safety Drills',
      count: 2,
      status: 'unlogged drills',
      total: 16,
      done: 14,
      trend: 'On pace',
      trendType: 'neutral',
      color: '#106254',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rail tracking-tight">Compliance & Risk Center</h1>
          <p className="text-xs text-grey-500 mt-1">
            Real-time oversight of overdue documentation, missed hours, and safety protocol audits.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-border rounded-xl shadow-xs self-start">
          {(['1w', '1m', '3m', '6m'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriod(p);
                toast.info('Time Horizon Changed', `Filtered audits for ${p.toUpperCase()} cycle.`);
              }}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                period === p
                  ? 'bg-rail text-white shadow-xs'
                  : 'text-grey-600 hover:text-grey-900'
              )}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Workstation Cards (Board UI Sleek Stat Cards) */}
      <StatCards
        variant="footer"
        stats={[
          {
            icon: FileText,
            label: 'ISP Reports',
            value: '3',
            delta: '-1 mo',
            deltaColor: 'lime',
            tone: 'purple',
            caption: '16 of 19 complete',
            hint: 'Individual Service Plans requiring semi-annual or annual clinical re-evaluation.',
            onClick: () => {
              toast.info('ISP Reports', 'Inspecting 3 overdue reports.');
              onNavigate('isp');
            },
          },
          {
            icon: Clock,
            label: 'Daily Progress Notes',
            value: '5',
            delta: '-2 today',
            deltaColor: 'lime',
            tone: 'emerald',
            caption: '29 of 34 complete',
            hint: 'Required end-of-shift documentation for Title 22 and Regional Center compliance.',
            onClick: () => {
              toast.info('Daily Progress Notes', 'Inspecting 5 pending notes.');
              onNavigate('notes');
            },
          },
          {
            icon: Calendar,
            label: 'Authorized Hours',
            value: '4',
            delta: '+1 wk',
            deltaColor: 'rose',
            tone: 'orange',
            caption: '18 of 22 on quota',
            hint: 'Enrolled clients approaching authorized service hour under-utilization.',
            onClick: () => {
              toast.info('Authorized Hours', 'Inspecting 4 clients under quota.');
              onNavigate('calendar');
            },
          },
          {
            icon: Shield,
            label: 'Monthly Safety Drills',
            value: '2',
            delta: 'On pace',
            deltaColor: 'neutral',
            tone: 'sky',
            caption: '14 of 16 complete',
            hint: 'Fire and disaster drill logs required by California Regional Center Title 22.',
            onClick: () => {
              toast.info('Monthly Safety Drills', 'Inspecting 2 unlogged drills.');
              onNavigate('drills');
            },
          },
        ]}
      />

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart Simulator */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-rail text-sm">Open Compliance Items Trend</h3>
              <p className="text-xs text-grey-500">Lower is better · Tracks unresolved documentation items</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              -28% overall drop
            </span>
          </div>

          {/* SVG Trend Line */}
          <div className="h-56 w-full pt-4">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ee05a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2ee05a" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="30" y1={y} x2="590" y2={y} stroke="#f0f2f1" strokeDasharray="4 4" />
              ))}

              {/* Shaded Area */}
              <path
                d="M30,140 C100,120 180,150 250,90 C320,60 400,80 480,45 C540,30 590,50 590,50 L590,180 L30,180 Z"
                fill="url(#trendGrad)"
              />

              {/* Primary Line */}
              <path
                d="M30,140 C100,120 180,150 250,90 C320,60 400,80 480,45 C540,30 590,50 590,50"
                fill="none"
                stroke="#00342f"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              {[
                { x: 30, y: 140, label: 'W1: 8' },
                { x: 250, y: 90, label: 'W2: 5' },
                { x: 480, y: 45, label: 'W3: 2' },
                { x: 590, y: 50, label: 'W4: 3' },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#2ee05a" stroke="#ffffff" strokeWidth="2" />
                </g>
              ))}

              {/* X Axis Labels */}
              <text x="30" y="196" fontSize="11" fill="#71717a" textAnchor="middle">Week 1</text>
              <text x="210" y="196" fontSize="11" fill="#71717a" textAnchor="middle">Week 2</text>
              <text x="390" y="196" fontSize="11" fill="#71717a" textAnchor="middle">Week 3</text>
              <text x="570" y="196" fontSize="11" fill="#71717a" textAnchor="middle">Current</text>
            </svg>
          </div>
        </div>

        {/* Overall Health Gauge */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-rail text-sm">Overall Program Health</h3>
            <p className="text-xs text-grey-500">Audit preparedness index</p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e6efe9"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#2ee05a"
                  strokeWidth="9"
                  strokeDasharray="264"
                  strokeDashoffset="34"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-rail">89%</span>
                <span className="text-[11px] font-semibold text-grey-500 uppercase tracking-wider">
                  Audit Ready
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-grey-600 max-w-xs mt-3 leading-relaxed">
              77 of 87 required items are up to date. Only authorized calendar hours show an open delta this cycle.
            </p>
          </div>

          <button
            onClick={() => {
              toast.success('Audit Binder Ready', 'All 87 regulatory compliance items exported as secure PDF.');
              onNavigate('reports');
            }}
            className="w-full py-2.5 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
          >
            Export Comprehensive Audit Binder
          </button>
        </div>
      </div>
    </div>
  );
};

