import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { toast } from '../lib/toast';
import {
  Bell,
  HelpCircle,
  Building,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  SlidersHorizontal,
  FileQuestion,
  User,
  Sparkles,
  LogOut,
  Plus,
} from 'lucide-react';
import { Organization, NotificationItem, NavGroup } from '../types';
import { Sound } from '../utils/soundEffects';

interface HeaderProps {
  currentOrg: Organization;
  organizations: Organization[];
  onSelectOrg: (org: Organization) => void;
  onCreateProgram?: () => void;
  activeGroup: NavGroup;
  activeItemTitle: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigateItem: (itemId: string) => void;
  onOpenTour: () => void;
  onOpenProfile: () => void;
  onSignOut?: () => void;
  clientCount?: number;
  selectedClientName?: string | null;
  onClearClient?: () => void;
  onOpenCelebration?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentOrg,
  organizations,
  onSelectOrg,
  onCreateProgram,
  activeGroup,
  activeItemTitle,
  isCollapsed,
  onToggleCollapse,
  notifications,
  onMarkAllRead,
  onNavigateItem,
  onOpenTour,
  onOpenProfile,
  onSignOut,
  selectedClientName,
  onClearClient,
  onOpenCelebration,
}) => {
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 bg-white border-b border-border px-5 flex items-center justify-between z-20 shrink-0">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-grey-600 hover:text-grey-900 hover:bg-grey-100 transition-colors mr-1"
            title="Expand menu"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <span className="font-medium text-grey-500">{activeGroup.name}</span>
        <span className="text-grey-300">/</span>
        <span className="font-semibold text-rail">{activeItemTitle}</span>

        {selectedClientName && (
          <>
            <span className="text-grey-300">/</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 font-medium text-[11px] border border-brand-100">
              {selectedClientName}
              <button
                onClick={() => {
                  onClearClient?.();
                  toast.info('Client Cleared', 'Returned to full operations view.');
                }}
                className="hover:text-red-500 transition-colors"
                title="Back to list"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2">
        {/* Organization / Program Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowOrgDropdown(!showOrgDropdown);
              setShowNotifications(false);
              setShowHelpMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-white hover:bg-grey-50 text-xs font-semibold text-rail transition-all shadow-xs"
          >
            <Building className="w-3.5 h-3.5 text-brand-600" />
            <span>Program: {currentOrg.name}</span>
            <span className="text-grey-400">▾</span>
          </button>

          {showOrgDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowOrgDropdown(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-popover border border-border p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-border/60">
                  <span className="font-bold text-grey-900 block">Switch Service Line</span>
                  <span className="text-[11px] text-grey-500">
                    Switch context across authorized programs
                  </span>
                </div>
                <div className="py-1">
                  {organizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        onSelectOrg(org);
                        setShowOrgDropdown(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-panel transition-colors',
                        org.id === currentOrg.id && 'font-bold text-brand-900 bg-brand-50'
                      )}
                    >
                      <div>
                        <div className="font-semibold">{org.name}</div>
                        <div className="text-[10px] text-grey-500">
                          {org.clientsCount} clients · {org.teamCount} staff
                        </div>
                      </div>
                      {org.id === currentOrg.id && (
                        <Check className="w-4 h-4 text-brand-600" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Create New Program Action */}
                <div className="pt-1.5 pb-0.5 border-t border-border/70 mt-1">
                  <button
                    onClick={() => {
                      setShowOrgDropdown(false);
                      onCreateProgram?.();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left font-semibold text-brand-800 hover:bg-brand-50 hover:text-brand-900 transition-colors cursor-pointer group"
                  >
                    <div className="w-5 h-5 rounded-lg bg-brand-100 flex items-center justify-center text-brand-800 group-hover:bg-brand-200 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span>Create New Program</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Ribbon Cutting Ceremony Button if Configured */}
        {onOpenCelebration && currentOrg.isConfigured && (
          <button
            type="button"
            onClick={() => {
              onOpenCelebration();
              Sound.fanfare();
            }}
            className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all hover:scale-105 active:scale-95"
            title="Ribbon Cutting Ceremony"
          >
            <span>🎀 Ribbon Cutting</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowOrgDropdown(false);
              setShowHelpMenu(false);
            }}
            className="w-9 h-9 rounded-xl border border-border bg-white hover:bg-grey-50 text-grey-700 flex items-center justify-center relative transition-all shadow-xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-2xl shadow-popover border border-border p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-border/80">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-grey-900 text-sm">Action Items</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onMarkAllRead}
                    className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-border/60 max-h-72 overflow-y-auto my-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onNavigateItem(item.targetId);
                        setShowNotifications(false);
                        toast.info(item.title, item.desc);
                      }}
                      className={cn(
                        'py-2.5 px-2 rounded-xl hover:bg-panel cursor-pointer transition-colors',
                        !item.read && 'bg-brand-50/50'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-grey-900 leading-tight">
                          {item.title}
                        </span>
                        {!item.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-grey-500 mt-1">
                        <span>{item.desc}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Help & Tour */}
        <div className="relative">
          <button
            onClick={() => {
              setShowHelpMenu(!showHelpMenu);
              setShowOrgDropdown(false);
              setShowNotifications(false);
            }}
            className="w-9 h-9 rounded-xl border border-border bg-white hover:bg-grey-50 text-grey-700 flex items-center justify-center transition-all shadow-xs"
            title="Help & Guidance"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {showHelpMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowHelpMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-2xl shadow-popover border border-border p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 font-bold text-grey-900 border-b border-border/60 mb-1">
                  Support & Learning
                </div>
                <button
                  onClick={() => {
                    setShowHelpMenu(false);
                    toast.info('Walkthrough Started', 'Taking interactive tour of CareCentriq operations.');
                    onOpenTour();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-brand-50 text-brand-900 font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Interactive Walkthrough</span>
                </button>
                <button
                  onClick={() => {
                    setShowHelpMenu(false);
                    toast.info('Documentation Center', 'Accessing California Title 22 & CareCentriq clinical handbook.');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-grey-50 text-grey-700 transition-colors"
                >
                  <FileQuestion className="w-4 h-4 text-grey-500" />
                  <span>Documentation Center</span>
                </button>
                <button
                  onClick={() => {
                    setShowHelpMenu(false);
                    onOpenProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-grey-50 text-grey-700 transition-colors"
                >
                  <User className="w-4 h-4 text-grey-500" />
                  <span>Administrator Account</span>
                </button>
                {onSignOut && (
                  <button
                    onClick={() => {
                      setShowHelpMenu(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-rose-50 text-rose-700 font-semibold transition-colors border-t border-border/70 mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out / Switch Account</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

