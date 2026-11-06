import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  Users,
  Search,
  Plus,
  Shield,
  FileCheck,
  AlertTriangle,
  ChevronRight,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { StaffRecord } from '../types';
import { StatCards } from './StatCards';

interface StaffListViewProps {
  staff: StaffRecord[];
}

export const StaffListView: React.FC<StaffListViewProps> = ({ staff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffRecord | null>(null);

  const filteredStaff = staff
    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((s) => selectedRole === 'all' || s.role === selectedRole);

  if (selectedStaff) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <button
          onClick={() => setSelectedStaff(null)}
          className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
        >
          ← Back to Staff Roster
        </button>

        {/* Staff Profile Card */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xs p-6 space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-900 font-bold text-xl flex items-center justify-center border border-brand-200">
                {selectedStaff.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-rail">{selectedStaff.name}</h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-900 border border-brand-200">
                    {selectedStaff.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {selectedStaff.chip}
                  </span>
                </div>
                <p className="text-xs text-grey-500 mt-0.5">
                  {selectedStaff.role} · {selectedStaff.program}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toast.info('Clearance Editor', `Modifying regulatory documents for ${selectedStaff.name}.`);
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border bg-white text-xs font-semibold hover:bg-grey-50 transition-colors"
              >
                Edit Clearances
              </button>
              <button
                onClick={() => {
                  toast.success('Shifts Updated', `Assigned weekly shift rotation for ${selectedStaff.name}.`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
              >
                Assign Shifts
              </button>
            </div>
          </div>

          {/* Clearances & Pending Uploads */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold text-rail text-sm">Regulatory Clearances & Certificates</h3>
            {selectedStaff.alerts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedStaff.alerts.map((al, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-amber-900 block">{al.title}</span>
                      <span className="text-[11px] text-amber-800">{al.desc}</span>
                    </div>
                    <button
                      onClick={() => {
                        toast.success('Clearance Processed', `Completed: "${al.action}" for ${selectedStaff.name}.`);
                      }}
                      className="mt-2 text-left text-xs font-semibold text-brand-800 underline hover:text-brand-900 transition-colors"
                    >
                      {al.action} →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-800 font-medium">
                ✓ All licensing background checks, TB clearances, and CPR credentials are fully up to date.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rail tracking-tight">Team & Staff Operations</h1>
          <p className="text-xs text-grey-500 mt-1">
            Manage active shift assignments, state credentials, and professional onboarding.
          </p>
        </div>

        <button
          onClick={() => {
            toast.info('Caregiver Onboarding', 'Opening new staff credential and background intake form.');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* KPI Stat Cards (Board UI Sleek Stat Cards) */}
      <StatCards
        variant="footer"
        stats={[
          {
            icon: Users,
            label: 'Total Staff',
            value: `${staff.length}`,
            delta: '+3 this qtr',
            deltaColor: 'lime',
            tone: 'emerald',
            caption: 'All verified credentials',
            hint: 'Licensed care professionals enrolled in your agency roster.',
          },
          {
            icon: Calendar,
            label: 'Active on Shift',
            value: `${staff.filter((s) => s.status === 'Active').length}`,
            delta: '100% covered',
            deltaColor: 'lime',
            tone: 'blue',
            caption: 'Today’s floor coverage',
            hint: 'Direct Support Professionals and supervisors checked in today.',
          },
          {
            icon: FileCheck,
            label: 'Clearances Verified',
            value: `${staff.filter((s) => s.alerts.length === 0).length}`,
            delta: 'Audit-ready',
            deltaColor: 'lime',
            tone: 'purple',
            caption: 'TB, CPR & LiveScan',
            hint: 'Staff with all California Regional Center requirements up to date.',
          },
          {
            icon: AlertTriangle,
            label: 'Renewals Pending',
            value: `${staff.filter((s) => s.alerts.length > 0).length}`,
            delta: staff.filter((s) => s.alerts.length > 0).length > 0 ? 'Action needed' : 'Zero overdue',
            deltaColor: staff.filter((s) => s.alerts.length > 0).length > 0 ? 'amber' : 'lime',
            tone: 'orange',
            caption: 'Expiring in 30 days',
            hint: 'Certifications needing renewal within the next 30 days.',
          },
        ]}
      />

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-border shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by staff name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border text-xs text-grey-700 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="Direct Support Professional">Direct Support (DSP)</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>
      </div>

      {/* Staff Roster Table */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-grey-50/70 border-b border-border text-grey-500 font-semibold">
            <tr>
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Service Program</th>
              <th className="py-3 px-4">Clearance Status</th>
              <th className="py-3 px-4">Shift Today</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredStaff.map((member) => (
              <tr
                key={member.id}
                onClick={() => setSelectedStaff(member)}
                className="hover:bg-panel/40 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-grey-900 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-grey-100 text-grey-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span>{member.name}</span>
                </td>
                <td className="py-3 px-4 text-grey-600">{member.role}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-grey-100 font-medium text-grey-700">
                    {member.program}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {member.alerts.length > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      {member.alerts.length} required
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      Verified
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 font-medium text-grey-700">{member.shift || '08:00 – 16:00'}</td>
                <td className="py-3 px-4 text-right">
                  <button className="px-3 py-1 rounded-lg border border-border bg-white text-grey-700 font-semibold text-[11px] hover:bg-grey-50">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

