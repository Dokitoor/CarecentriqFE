import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  FileText,
  Calendar,
  Shield,
  Activity,
  FolderOpen,
  BookOpen,
  Upload,
  AlertCircle,
  Clock,
  Phone,
  User,
  ExternalLink,
} from 'lucide-react';
import { ClientRecord } from '../types';

interface ClientProfileViewProps {
  client: ClientRecord;
  onBack: () => void;
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({ client, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'isp' | 'calendar' | 'docs' | 'binder'>('overview');

  const TABS = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'isp', label: 'ISP Objectives', icon: FileText },
    { id: 'calendar', label: 'Calendar Hours', icon: Calendar },
    { id: 'docs', label: 'Documents', icon: FolderOpen },
    { id: 'binder', label: 'Audit Binder', icon: BookOpen },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Profile Hero Card */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xs">
        {/* Banner with Brand gradient */}
        <div className="h-28 bg-gradient-to-r from-brand-700 via-brand-500 to-emerald-400 relative" />

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            {/* Avatar & Identifiers */}
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-card border border-border shrink-0">
                <div className="w-full h-full rounded-full bg-brand-50 text-brand-900 font-bold text-xl flex items-center justify-center border border-brand-200">
                  {client.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-rail">{client.name}</h1>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-brand-50 text-brand-900 border border-brand-200">
                    {client.isBehavioral ? 'Behavioral Support' : 'Standard Day Care'}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                      client.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-grey-100 text-grey-700 border-grey-200'
                    )}
                  >
                    {client.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-grey-500 flex-wrap">
                  <span>{client.uci}</span>
                  <span>·</span>
                  <span>DOB: {client.dob}</span>
                  <span>·</span>
                  <span>{client.insurance}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toast.success('Facesheet Exported', `Generated state-compliant facesheet for ${client.name}.`);
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border bg-white hover:bg-grey-50 text-xs font-semibold text-grey-800 transition-colors"
              >
                Print Facesheet
              </button>
              <button
                onClick={() => {
                  toast.info('Progress Note Composer', `Ready to record daily ISP objectives for ${client.name}.`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
              >
                Write Today's Note
              </button>
            </div>
          </div>

          {/* Emergency & Case Management Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-border/80 text-xs">
            <div className="p-2.5 rounded-xl bg-canvas border border-border/60">
              <span className="text-[10px] font-bold uppercase text-grey-400 block mb-0.5">
                Emergency Contact
              </span>
              <div className="font-semibold text-grey-900">{client.emergencyContact.name}</div>
              <div className="text-grey-500 text-[11px]">
                {client.emergencyContact.relation} · {client.emergencyContact.phone}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-canvas border border-border/60">
              <span className="text-[10px] font-bold uppercase text-grey-400 block mb-0.5">
                Case Manager
              </span>
              <div className="font-semibold text-grey-900">{client.caseManager}</div>
              <div className="text-grey-500 text-[11px]">{client.careStatus}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-canvas border border-border/60">
              <span className="text-[10px] font-bold uppercase text-grey-400 block mb-0.5">
                Clinical Alerts
              </span>
              {client.alerts.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {client.alerts.map((al) => (
                    <span
                      key={al}
                      className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200"
                    >
                      {al}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-grey-400 text-[11px]">No active medical alerts</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Secondary Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-white border border-border rounded-2xl w-fit shadow-xs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
                isActive ? 'bg-rail text-white shadow-xs' : 'text-grey-600 hover:text-grey-900'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-3">
            <h3 className="font-bold text-rail text-sm">Assigned Behavioral Objectives</h3>
            <div className="space-y-2">
              {[
                { title: 'Functional Communication', desc: 'Use adaptive speech tools during group lunch', progress: 74 },
                { title: 'Activity Task Transitions', desc: 'Transition between classroom and garden within 3m', progress: 60 },
                { title: 'Self-Advocacy & Boundaries', desc: 'Express personal space requirements calmly', progress: 88 },
              ].map((obj) => (
                <div key={obj.title} className="p-3 rounded-2xl border border-border bg-canvas/60">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span>{obj.title}</span>
                    <span className="text-brand-700">{obj.progress}%</span>
                  </div>
                  <p className="text-[11px] text-grey-500 mb-2">{obj.desc}</p>
                  <div className="w-full bg-grey-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full" style={{ width: `${obj.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-3">
            <h3 className="font-bold text-rail text-sm">Required Document Clearance</h3>
            <div className="divide-y divide-border/60">
              {[
                { file: 'Current IPP Evaluation.pdf', date: 'Updated Sep 12, 2024', status: 'Live in file' },
                { file: 'Annual Medical Physical.pdf', date: 'Awaiting doctor signature', status: 'Pending review' },
                { file: 'Emergency Contact Form.pdf', date: 'Verified Jul 08, 2024', status: 'Live in file' },
              ].map((doc) => (
                <div key={doc.file} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-grey-900">{doc.file}</div>
                    <div className="text-[11px] text-grey-500">{doc.date}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'isp' && (
        <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-rail text-sm">Active ISP Goals & Progress Notes</h3>
            <button className="px-3 py-1.5 rounded-xl bg-rail text-white text-xs font-semibold">
              + Add Objective
            </button>
          </div>
          <p className="text-xs text-grey-500">
            Objectives are synchronized with California Regional Center IPP requirements.
          </p>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-4">
          <h3 className="font-bold text-rail text-sm">Monthly Attendance & Authorized Hours</h3>
          <p className="text-xs text-grey-500">Scheduled: 32 of 40 approved monthly hours.</p>
        </div>
      )}

      {activeTab === 'docs' && (
        <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-4">
          <h3 className="font-bold text-rail text-sm">Client Medical and Legal Document Vault</h3>
          <p className="text-xs text-grey-500">All uploaded documents are encrypted and audit-ready.</p>
        </div>
      )}

      {activeTab === 'binder' && (
        <div className="bg-white p-5 rounded-3xl border border-border shadow-xs space-y-4">
          <h3 className="font-bold text-rail text-sm">Licensing Audit Binder Assembly</h3>
          <p className="text-xs text-grey-500">One-click compile for state inspection and survey reviews.</p>
        </div>
      )}
    </div>
  );
};

