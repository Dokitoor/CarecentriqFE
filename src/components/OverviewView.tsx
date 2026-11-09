import React from 'react';
import { toast } from '../lib/toast';
import {
  Users,
  Calendar,
  FileCheck2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Organization, ClientRecord, StaffRecord } from '../types';
import { StatCards } from './StatCards';
import { Sound } from '../utils/soundEffects';

interface OverviewViewProps {
  currentOrg: Organization;
  clients: ClientRecord[];
  staff: StaffRecord[];
  onNavigate: (viewId: string) => void;
  onSelectClient: (client: ClientRecord) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentOrg,
  clients,
  staff,
  onNavigate,
  onSelectClient,
}) => {
  const activeStaff = staff.filter((s) => s.status === 'Active');
  const activeClients = clients.filter((c) => c.status === 'Active');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Hero Operations Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rail via-[#0a483f] to-[#125846] text-white p-6 sm:p-8 shadow-card border border-white/10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-brand-0 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-brand-0 animate-pulse" />
              Active Service Line · {currentOrg.name}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {currentOrg.name} Operations Hub
            </h1>

            <p className="text-xs sm:text-sm text-grey-100 font-normal leading-relaxed">
              Real-time oversight for enrolled client care, daily progress notes, active staffing rosters, and curriculum compliance.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentOrg.badges.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 rounded-lg bg-black/20 text-white text-[11px] font-medium border border-white/10"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => {
                toast.info('Shift Note Composer', `Preparing progress note roster for ${currentOrg.name}.`);
                onNavigate('notes');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-0 text-brand-1200 font-bold text-xs hover:bg-brand-50 transition-all shadow-sm active:scale-95"
            >
              Write Daily Note
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                toast.info('Authorized Hours', 'Displaying attendance quotas & calendar units.');
                onNavigate('calendar');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-all active:scale-95"
            >
              Check Calendar Hours
            </button>
            <button
              onClick={() => {
                toast.info('Caregiver Roster', `Viewing staff scheduled at ${currentOrg.name}.`);
                onNavigate('staff');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-all active:scale-95"
            >
              Staff Roster
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Operational Metrics (Board UI Sleek Stat Cards) */}
      <StatCards
        variant="footer"
        stats={[
          {
            icon: Users,
            label: 'Active Staff',
            value: `${staff.length}`,
            delta: 'Ready',
            deltaColor: 'lime',
            tone: 'emerald',
            caption: `${activeStaff.length} on shift today`,
            hint: 'Direct Support Professionals and supervisors actively scheduled at this facility.',
            onClick: () => onNavigate('staff'),
          },
          {
            icon: Sparkles,
            label: 'Enrolled Clients',
            value: `${clients.length}`,
            delta: '+2 this mo',
            deltaColor: 'lime',
            tone: 'blue',
            caption: `${activeClients.length} currently active`,
            hint: 'Total enrolled individuals with approved Title 22 care plans.',
            onClick: () => onNavigate('clients'),
          },
          {
            icon: Clock,
            label: "Today's Notes",
            value: '3 / 8',
            delta: 'Review',
            deltaColor: 'amber',
            tone: 'orange',
            caption: '5 notes pending sign-off',
            hint: 'Daily clinical progress logs submitted by assigned direct care staff.',
            onClick: () => onNavigate('notes'),
          },
          {
            icon: ShieldAlert,
            label: 'Compliance Rating',
            value: '89%',
            delta: '+4.2%',
            deltaColor: 'lime',
            tone: 'purple',
            caption: '3 open audit items',
            hint: 'Curriculum, fire drill, and mandatory Title 22 documentation audit score.',
            onClick: () => onNavigate('compliance'),
          },
        ]}
      />

      {/* 3. Operational Sections: Today's Notes & Active Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Priority Daily Notes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-border p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div>
                <h3 className="font-bold text-rail text-sm">Today’s Progress Notes Roster</h3>
                <p className="text-xs text-grey-500">Track client sessions, documentation status, and care delivery.</p>
              </div>
              <button
                onClick={() => onNavigate('notes')}
                className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
              >
                View all notes
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-border/60 mt-2">
              {clients.slice(0, 5).map((client) => {
                const isPending = client.id === 'c-1' || client.id === 'c-3';
                return (
                  <div
                    key={client.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-grey-50/80 px-2 rounded-xl transition-colors"
                  >
                    <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => onSelectClient(client)}
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-900 text-xs font-bold flex items-center justify-center border border-brand-200 shrink-0">
                        {client.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-grey-900 hover:text-brand-800 transition-colors">
                          {client.name}
                        </div>
                        <div className="text-[11px] text-grey-500">
                          {client.uci} · {client.program}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={
                          isPending
                            ? 'px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200'
                            : 'px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200'
                        }
                      >
                        {isPending ? 'Pending Note' : 'Submitted'}
                      </span>

                      <button
                        onClick={() => {
                          if (isPending) {
                            toast.action(
                              'Draft Progress Note',
                              `Opening session note draft for ${client.name}`,
                              {
                                title: 'Open Form',
                                onClick: () => onNavigate('notes'),
                              }
                            );
                            onNavigate('notes');
                          } else {
                            toast.success(
                              'Note Approved',
                              `Today's ISP progress note for ${client.name} is signed and locked.`
                            );
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rail text-white text-[11px] font-semibold hover:bg-[#062420] transition-colors"
                      >
                        {isPending ? 'Write Note' : 'Review'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Objectives & Behavioral Goals */}
          <div className="bg-white rounded-3xl border border-border p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div>
                <h3 className="font-bold text-rail text-sm">Active Behavioral Curriculum & Goals</h3>
                <p className="text-xs text-grey-500">Program objectives and skill acquisition protocols.</p>
              </div>
              <span className="text-[11px] font-semibold text-grey-500">4 Active Objectives</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {[
                { title: 'Access-to-Item Protocol', desc: 'Positive communication reinforcement goal', progress: '78%' },
                { title: 'Activity Transitions', desc: 'Task switching and routine adherence', progress: '62%' },
                { title: 'Social Engagement', desc: 'Peer group interaction in day room', progress: '85%' },
                { title: 'Community Living Skills', desc: 'Meal prep, hygiene and navigation', progress: '54%' },
              ].map((obj) => (
                <div key={obj.title} className="p-3 rounded-2xl border border-border/80 bg-canvas/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-grey-900">{obj.title}</span>
                    <span className="text-[11px] font-bold text-brand-700">{obj.progress}</span>
                  </div>
                  <p className="text-[11px] text-grey-500">{obj.desc}</p>
                  <div className="w-full bg-grey-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full" style={{ width: obj.progress }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Staff on Shift */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-border p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div>
                <h3 className="font-bold text-rail text-sm">Staff on Shift Today</h3>
                <p className="text-xs text-grey-500">{activeStaff.length} professionals active</p>
              </div>
              <button
                onClick={() => onNavigate('staff')}
                className="text-xs font-semibold text-brand-700 hover:text-brand-900"
              >
                Full Roster
              </button>
            </div>

            <div className="divide-y divide-border/60 mt-2">
              {staff.slice(0, 6).map((member) => (
                <div key={member.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-grey-100 text-grey-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-grey-900">{member.name}</div>
                      <div className="text-[11px] text-grey-500">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-medium text-grey-600 block">
                      {member.shift || '08:00 – 16:00'}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="rounded-3xl p-5 bg-gradient-to-br from-brand-50 to-emerald-100/50 border border-brand-200 shadow-xs">
            <h4 className="font-bold text-xs text-brand-900 mb-1">Audit Compliance Ready</h4>
            <p className="text-[11px] text-brand-800 leading-relaxed mb-3">
              All state health clearances and live scan records are stored in the digital document repository.
            </p>
            <button
              onClick={() => onNavigate('compliance')}
              className="text-xs font-bold text-brand-900 underline hover:text-brand-1000"
            >
              Run Compliance Assessment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

