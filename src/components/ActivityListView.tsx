import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import { Search, Filter, Plus, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { DailyNoteRecord, IspRecord, CalendarRecord, DrillRecord } from '../types';

interface ActivityListViewProps {
  type: 'notes' | 'isp' | 'calendar' | 'drills';
  notes: DailyNoteRecord[];
  isps: IspRecord[];
  calendars: CalendarRecord[];
  drills: DrillRecord[];
}

export const ActivityListView: React.FC<ActivityListViewProps> = ({
  type,
  notes,
  isps,
  calendars,
  drills,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const titles = {
    notes: { title: 'Daily Progress Notes', desc: 'Draft, submit, and approve daily clinical and support notes.' },
    isp: { title: 'Individualized Service Plans (ISP)', desc: 'Initial, 30-day, semi-annual, and annual plans tracking.' },
    calendar: { title: 'Program Calendars & Attendance', desc: 'Authorized hours and attendance days validation.' },
    drills: { title: 'Emergency & Evacuation Drills', desc: 'Monthly client drill compliance and staff certification.' },
  };

  const getRows = () => {
    switch (type) {
      case 'notes':
        return notes
          .filter((n) =>
            n.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.uci.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((n) => selectedService === 'all' || n.service === selectedService)
          .filter((n) => selectedStatus === 'all' || n.status === selectedStatus);

      case 'isp':
        return isps
          .filter((i) =>
            i.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.uci.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((i) => selectedService === 'all' || i.service === selectedService)
          .filter((i) => selectedStatus === 'all' || i.status === selectedStatus);

      case 'calendar':
        return calendars
          .filter((c) => c.client.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((c) => selectedService === 'all' || c.service === selectedService)
          .filter((c) => selectedStatus === 'all' || c.status === selectedStatus);

      case 'drills':
        return drills
          .filter((d) => d.client.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((d) => selectedService === 'all' || d.service === selectedService)
          .filter((d) => selectedStatus === 'all' || d.status === selectedStatus);
    }
  };

  const rows = getRows();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
      case 'Complete':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Due soon':
      case 'Draft':
      case 'Incomplete':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Missing':
      case 'Not submitted':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-grey-100 text-grey-700 border-grey-200';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rail tracking-tight">{titles[type].title}</h1>
          <p className="text-xs text-grey-500 mt-1">{titles[type].desc}</p>
        </div>

        <button
          onClick={() => {
            toast.info('New Record Form', `Opening entry creator for ${titles[type].title}.`);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-border shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client name or UCI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border text-xs text-grey-700 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Services (532, TDS, PIP)</option>
            <option value="532">532 Day Care</option>
            <option value="TDS">TDS Developmental</option>
            <option value="PIP">PIP Community</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border text-xs text-grey-700 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted / Complete</option>
            <option value="Due soon">Due Soon / Draft</option>
            <option value="Missing">Missing / Not Submitted</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-grey-50/70 border-b border-border text-grey-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Client</th>
                {type !== 'calendar' && type !== 'drills' && <th className="py-3 px-4">UCI ID</th>}
                <th className="py-3 px-4">Service</th>
                {type === 'isp' && <th className="py-3 px-4">ISP Type</th>}
                {type === 'isp' && <th className="py-3 px-4">Due Date</th>}
                {type === 'calendar' && <th className="py-3 px-4">Quota Type</th>}
                {type === 'calendar' && <th className="py-3 px-4">Done / Required</th>}
                {type === 'drills' && <th className="py-3 px-4">Drill Description</th>}
                {type === 'drills' && <th className="py-3 px-4">Staff Certified</th>}
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-grey-400">
                    No records found matching current filters.
                  </td>
                </tr>
              ) : (
                rows.map((row: any) => (
                  <tr key={row.id} className="hover:bg-panel/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-grey-900">{row.client}</td>
                    {type !== 'calendar' && type !== 'drills' && (
                      <td className="py-3 px-4 text-grey-500">{row.uci}</td>
                    )}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-grey-100 font-medium text-grey-700">
                        {row.service}
                      </span>
                    </td>
                    {type === 'isp' && <td className="py-3 px-4 font-medium">{row.type}</td>}
                    {type === 'isp' && <td className="py-3 px-4 text-grey-600">{row.due}</td>}
                    {type === 'calendar' && <td className="py-3 px-4">{row.type}</td>}
                    {type === 'calendar' && (
                      <td className="py-3 px-4 font-semibold text-grey-800">{row.doneRequired}</td>
                    )}
                    {type === 'drills' && <td className="py-3 px-4">{row.drill}</td>}
                    {type === 'drills' && <td className="py-3 px-4 text-grey-600">{row.staff}</td>}
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
                          getStatusBadge(row.status)
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          toast.info('Record Loaded', `Viewing activity details for ${row.client}.`);
                        }}
                        className="px-3 py-1 rounded-lg border border-border bg-white text-grey-700 font-semibold text-[11px] hover:bg-grey-50 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

