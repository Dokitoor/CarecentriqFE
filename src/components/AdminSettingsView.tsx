import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  Shield,
  Layers,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Check,
  Building,
  Key,
  CreditCard,
  Radio,
  ArrowUpRight,
} from 'lucide-react';
import { StatCards, TILE_TONES, StatTone } from './StatCards';

interface AdminSettingsViewProps {
  type: 'lines' | 'mods' | 'agency' | 'perm' | 'bill' | 'integ';
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({ type }) => {
  const [moduleToggles, setModuleToggles] = useState<Record<string, boolean>>({
    notes: true,
    isp: true,
    calendar: true,
    drills: true,
    docs: true,
    evv: true,
  });

  const toggleModule = (k: string, name: string) => {
    const nextVal = !moduleToggles[k];
    setModuleToggles({ ...moduleToggles, [k]: nextVal });
    if (nextVal) {
      toast.success('Module Enabled', `"${name}" activated in navigation.`);
    } else {
      toast.warning('Module Deactivated', `"${name}" hidden from staff workspaces.`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {type === 'lines' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Service Line Setup</h1>
          <p className="text-xs text-grey-500">
            Define service codes, component rules, and parental service programs across the agency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { code: '532', name: 'Day Care Services', clients: 12, rule: 'Regular daily attendance quota', tone: 'emerald' as StatTone },
              { code: 'TDS', name: 'Developmental Training', clients: 21, rule: 'Monthly authorized hours budget', tone: 'blue' as StatTone },
              { code: 'PIP', name: 'Community Integration', clients: 9, rule: '1:1 Direct staffing protocol', tone: 'purple' as StatTone },
            ].map((sl) => (
              <div
                key={sl.code}
                className="flex min-w-0 flex-col rounded-2xl bg-white border border-border/80 p-2 shadow-xs hover:border-brand-400 hover:shadow-card transition-all group"
              >
                <div className="flex w-full items-start justify-between gap-2.5 p-2">
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b text-white shadow-sm transition-transform group-hover:scale-105',
                      TILE_TONES[sl.tone]
                    )}
                  >
                    <Building className="size-5 shrink-0 text-white" />
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200">
                    Code: {sl.code}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 px-2 pt-2 pb-3">
                  <h3 className="font-bold text-rail text-sm group-hover:text-brand-900 transition-colors">
                    {sl.name}
                  </h3>
                  <p className="text-[11px] text-grey-500 line-clamp-2 mt-0.5">{sl.rule}</p>
                </div>

                <div className="mt-auto flex w-full items-center justify-between gap-2 rounded-xl bg-grey-50/90 py-1.5 pe-1.5 ps-2.5 border border-border/50 shadow-2xs">
                  <span className="text-[11px] font-medium text-grey-500">Enrolled Care</span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full py-0.5 pe-2 ps-1.5 text-[11px] font-semibold tabular-nums bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    {sl.clients} Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'mods' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Module Feature Management</h1>
          <p className="text-xs text-grey-500">
            Enable or disable functional modules to reduce visual clutter for clinical staff.
          </p>

          <div className="bg-white rounded-3xl border border-border overflow-hidden divide-y divide-border shadow-xs">
            {[
              { key: 'notes', name: 'Daily Progress Notes Module', desc: 'Clinical documentation and supervisor review workflows' },
              { key: 'isp', name: 'ISP & Regional Center Plans', desc: 'Initial, 30-day, and annual goal compliance tracking' },
              { key: 'calendar', name: 'Authorized Hours & Calendar', desc: 'Pre-schedule attendance quotas and compare actual billable units' },
              { key: 'drills', name: 'Safety & Evacuation Drills', desc: 'Emergency response verification for facility licensing' },
              { key: 'evv', name: 'Electronic Visit Verification (EVV)', desc: 'GPS & telephony check-in for state compliance' },
            ].map((mod) => (
              <div key={mod.key} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-xs text-rail">{mod.name}</div>
                  <div className="text-[11px] text-grey-500 mt-0.5">{mod.desc}</div>
                </div>
                <button
                  onClick={() => toggleModule(mod.key, mod.name)}
                  className={cn(
                    'w-11 h-6 rounded-full transition-colors relative p-0.5',
                    moduleToggles[mod.key] ? 'bg-brand-600' : 'bg-grey-200'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full bg-white block transition-transform shadow-xs',
                      moduleToggles[mod.key] ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'agency' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Agency Settings</h1>
          <p className="text-xs text-grey-500">
            Configure organization legal name, branding, and license identifiers.
          </p>

          <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-grey-700 block mb-1">Legal Agency Name</label>
                <input
                  type="text"
                  defaultValue="CareCentriq Healthcare Services, Inc."
                  className="w-full px-3 py-2 rounded-xl border border-border focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-grey-700 block mb-1">State License Number</label>
                <input
                  type="text"
                  defaultValue="LIC-CA-92019412"
                  className="w-full px-3 py-2 rounded-xl border border-border focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => {
                toast.success('Agency Profile Saved', 'Updated legal entity info and state facility license.');
              }}
              className="px-4 py-2 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
            >
              Save Agency Profile
            </button>
          </div>
        </div>
      )}

      {type === 'perm' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Roles & Access Permissions</h1>
          <p className="text-xs text-grey-500">
            Define boundaries for Direct Support, Case Managers, and Supervisors.
          </p>

          <div className="bg-white rounded-3xl border border-border overflow-hidden divide-y divide-border shadow-xs text-xs">
            {[
              { role: 'Administrator', members: 2, access: 'Full unconstrained read/write across all service lines' },
              { role: 'Clinical Supervisor', members: 4, access: 'Approve daily notes, edit ISP plans, and verify staff clearances' },
              { role: 'Direct Support (DSP)', members: 18, access: 'Draft assigned notes, log safety drills, view facesheets' },
            ].map((r) => (
              <div key={r.role} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rail">{r.role}</div>
                  <div className="text-grey-500 mt-0.5">{r.access}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-grey-100 font-semibold text-grey-700">
                  {r.members} Members
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'bill' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Billing & Subscription</h1>
          <p className="text-xs text-grey-500">Manage plan tier and automated invoices.</p>

          <div className="bg-white p-6 rounded-3xl border border-border shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800">
                Current Plan
              </span>
              <div className="text-lg font-bold text-rail">Enterprise Operations Tier</div>
              <div className="text-xs text-grey-500">Includes all 5 service line allocations and unlimited staff seats.</div>
            </div>
            <button
              onClick={() => {
                toast.info('Billing Portal', 'Loading automated state billing invoices and seat allocations.');
              }}
              className="px-4 py-2 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
            >
              Manage Invoices
            </button>
          </div>
        </div>
      )}

      {type === 'integ' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rail tracking-tight">Connected Integrations</h1>
          <p className="text-xs text-grey-500">Sync with State Medicaid Portals, EVV aggregators, and payroll.</p>

          <div className="bg-white rounded-3xl border border-border divide-y divide-border shadow-xs text-xs">
            {[
              { name: 'State Sandata EVV Aggregator', status: 'Connected', sync: 'Live realtime sync' },
              { name: 'Therap Regional Center Export', status: 'Connected', sync: 'Daily export at 23:00' },
              { name: 'QuickBooks Payroll Sync', status: 'Active', sync: 'Bi-weekly timesheet export' },
            ].map((int) => (
              <div key={int.name} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rail">{int.name}</div>
                  <div className="text-grey-500">{int.sync}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

