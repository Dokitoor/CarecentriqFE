import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { StatCards, TILE_TONES, StatTone } from './StatCards';

export const ReportsDocsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'docs'>('reports');

  const REPORTS = [
    { title: 'All Daily Notes Summary', type: 'Progress Notes', lastRun: 'Today, 08:30', format: 'PDF · CSV' },
    { title: 'ISP Objectives Achievement Report', type: 'Clinical / ISP', lastRun: 'Yesterday', format: 'PDF' },
    { title: 'Behavioral Incident Frequency Graph', type: 'Data Visualization', lastRun: 'Oct 28', format: 'Interactive' },
    { title: 'Authorized Hours vs. Attendance Audit', type: 'Billing & Quota', lastRun: 'Oct 25', format: 'Excel' },
  ];

  const DOCUMENTS = [
    { name: 'Regional Center Annual IPP.pdf', client: 'James Whitfield', category: 'Legal / IPP', status: 'Live in File', updated: 'Sep 12, 2024' },
    { name: 'Physician Medication Order.pdf', client: 'Nina Alvarez', category: 'Medical Clearance', status: 'Live in File', updated: 'Aug 28, 2024' },
    { name: 'Emergency Consent & Release.pdf', client: 'Micah Turner', category: 'Consent', status: 'Pending Review', updated: 'Oct 14, 2024' },
    { name: 'Individual Facesheet.pdf', client: 'Sophia Diaz', category: 'Summary', status: 'Live in File', updated: 'Oct 02, 2024' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rail tracking-tight">Reports & Document Repository</h1>
          <p className="text-xs text-grey-500 mt-1">
            Generate state audit packages, clinical summaries, and manage secure client file cabinets.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-white border border-border rounded-xl shadow-xs">
          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
              activeTab === 'reports' ? 'bg-rail text-white' : 'text-grey-600 hover:text-grey-900'
            )}
          >
            Analytics & Reports
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
              activeTab === 'docs' ? 'bg-rail text-white' : 'text-grey-600 hover:text-grey-900'
            )}
          >
            Document Center
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Board UI Sleek Stat Cards) */}
      <StatCards
        variant="footer"
        stats={[
          {
            icon: BarChart3,
            label: 'Analytics Reports',
            value: '4 Active',
            delta: '+1 added',
            deltaColor: 'lime',
            tone: 'emerald',
            caption: 'Weekly automated compiles',
            hint: 'Cross-module analytics, daily notes compilations, and attendance quota tracking.',
          },
          {
            icon: Layers,
            label: 'Document Center Files',
            value: '48 Records',
            delta: '100% verified',
            deltaColor: 'lime',
            tone: 'blue',
            caption: 'IPP, medical & legal binders',
            hint: 'Digital document center for client health evaluations and consent forms.',
          },
          {
            icon: FileSpreadsheet,
            label: 'Export Formats',
            value: 'PDF & CSV',
            delta: 'Instant',
            deltaColor: 'lime',
            tone: 'purple',
            caption: 'Audit-ready packages',
            hint: 'Downloadable standardized reports for Regional Center case managers.',
          },
          {
            icon: ShieldCheck,
            label: 'HIPAA Storage',
            value: '256-bit AES',
            delta: 'Encrypted',
            deltaColor: 'lime',
            tone: 'sky',
            caption: 'Compliant cloud vault',
            hint: 'All confidential client documents encrypted in compliance with federal guidelines.',
          },
        ]}
      />

      {activeTab === 'reports' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REPORTS.map((rep, idx) => {
              const tones: StatTone[] = ['emerald', 'purple', 'orange', 'blue'];
              const tone = tones[idx % tones.length];
              return (
                <div
                  key={rep.title}
                  className="bg-white p-2 rounded-2xl border border-border/80 shadow-xs hover:border-brand-400 hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between gap-2.5 p-2">
                    <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b text-white shadow-sm transition-transform group-hover:scale-105', TILE_TONES[tone])}>
                      <BarChart3 className="size-5 shrink-0 text-white" />
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-grey-100 text-grey-700 border border-grey-200">
                      {rep.format}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 px-2 pt-2 pb-3">
                    <p className="text-xs font-semibold text-brand-700">{rep.type}</p>
                    <h3 className="font-bold text-rail text-sm group-hover:text-brand-900 transition-colors">
                      {rep.title}
                    </h3>
                    <p className="text-[11px] text-grey-400 mt-0.5">Last generated: {rep.lastRun}</p>
                  </div>

                  <div className="mt-auto flex w-full items-center justify-between gap-2 rounded-xl bg-grey-50/90 py-1.5 pe-1.5 ps-2.5 border border-border/50 shadow-2xs">
                    <span className="text-[11px] text-grey-500 font-medium">Automated Weekly</span>
                    <button
                      onClick={() => {
                        toast.success(
                          'Report Generated',
                          `"${rep.title}" compiled successfully in ${rep.format} format.`
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rail text-white text-xs font-semibold hover:bg-[#062420] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Generate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xs">
          <div className="p-4 border-b border-border flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search file name, client, or category..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border text-xs focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                toast.success('Document Vault', 'New clinical document uploaded and queued for audit review.');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-rail text-white text-xs font-semibold hover:bg-[#062420] transition-colors"
            >
              + Upload Document
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-grey-50/70 border-b border-border text-grey-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Client Record</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Updated Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DOCUMENTS.map((doc) => (
                <tr key={doc.name} className="hover:bg-panel/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-grey-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-700 shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-3 px-4 text-grey-700">{doc.client}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-grey-100 text-grey-700 font-medium">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-grey-500">{doc.updated}</td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                        doc.status === 'Live in File'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      )}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        toast.info('Downloading File', `Accessing ${doc.name} for ${doc.client}.`);
                      }}
                      className="px-3 py-1 rounded-lg border border-border bg-white text-grey-700 font-semibold text-[11px] hover:bg-grey-50 transition-colors"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

