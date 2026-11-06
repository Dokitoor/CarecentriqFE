import React from 'react';
import { cn } from '../lib/utils';
import {
  Home,
  Activity,
  Users,
  FileText,
  Shield,
  Settings,
  ChevronLeft,
  ChevronsLeft,
  Flower2,
  Compass,
  LayoutGrid,
  LogOut,
} from 'lucide-react';
import { NavGroup, Organization } from '../types';

interface SidebarProps {
  groups: NavGroup[];
  activeGroupKey: string;
  activeItemId: string;
  onSelectGroup: (groupKey: string) => void;
  onSelectItem: (itemId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenProfile: () => void;
  onSignOut?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  home: Home,
  activity: Flower2,
  act: Flower2,
  users: Users,
  ppl: Users,
  'file-text': Compass,
  rep: Compass,
  shield: LayoutGrid,
  adm: LayoutGrid,
  more: LayoutGrid,
  grid: LayoutGrid,
  settings: Settings,
};

export const Sidebar: React.FC<SidebarProps> = ({
  groups,
  activeGroupKey,
  activeItemId,
  onSelectGroup,
  onSelectItem,
  isCollapsed,
  onToggleCollapse,
  onOpenProfile,
  onSignOut,
}) => {
  const activeGroup = groups.find((g) => g.key === activeGroupKey) || groups[0];

  return (
    <div className="flex h-full select-none">
      {/* 1. Primary Left Rail (Deep Slate Forest: #00342f) - No line on the right */}
      <aside className="w-[72px] bg-rail text-white flex flex-col items-center py-4 gap-2 z-30 shrink-0">
        {/* Brand Mark */}
        <div 
          className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelectItem('overview')}
          title="CareCentriq"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="2.5" fill="#00342f" />
            <rect x="13" y="3" width="8" height="8" rx="2.5" fill="#2ee05a" />
            <rect x="3" y="13" width="8" height="8" rx="2.5" fill="#2ee05a" />
            <rect x="13" y="13" width="8" height="8" rx="2.5" fill="#00342f" />
          </svg>
        </div>

        {/* Primary Nav Icons with High Contrast Selection */}
        <div className="flex flex-col items-center gap-2 flex-1 w-full px-2.5">
          {groups.map((group) => {
            const Icon = ICON_MAP[group.icon] || ICON_MAP[group.key] || Activity;
            const isActive = group.key === activeGroupKey;

            return (
              <button
                key={group.key}
                onClick={() => onSelectGroup(group.key)}
                title={group.tip}
                className={cn(
                  'w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group cursor-pointer',
                  isActive
                    ? 'bg-[#2ee05a] text-[#00342f] shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </button>
            );
          })}

          {/* Subtle horizontal divider below rail navigation */}
          <div className="w-8 h-[1px] bg-white/20 my-1" />
        </div>

        {/* Bottom Actions: Settings & Profile */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10 w-full px-2.5">
          <button
            onClick={() => onSelectItem('agency')}
            title="Agency Settings & Administration"
            className={cn(
              'w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer',
              activeItemId === 'agency'
                ? 'bg-[#2ee05a] text-[#00342f]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            )}
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenProfile}
            title="Reuben Stewart (Administrator) — Click to view profile"
            className="w-9 h-9 rounded-full bg-[#7a5a48] text-white text-xs font-bold flex items-center justify-center border-2 border-transparent hover:border-[#2ee05a] transition-colors shadow-xs cursor-pointer"
          >
            RS
          </button>

          {onSignOut && (
            <button
              onClick={onSignOut}
              title="Sign Out / Switch Account"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-grey-400 hover:text-rose-400 hover:bg-white/10 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>

      {/* 2. Secondary Panel (Light Sage Surface: #F5FDEF) */}
      <div
        className={cn(
          'bg-panel text-grey-900 border-r border-[#E2E8F0]/80 transition-all duration-300 overflow-hidden flex flex-col',
          isCollapsed ? 'w-0 border-r-0' : 'w-60'
        )}
      >
        <div className="flex flex-col h-full min-w-[240px]">
          {/* Header with Title and ChevronsLeft collapse toggle */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <h2 className="text-xl font-bold text-[#00342F] tracking-tight">
              Carecentriq
            </h2>
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-lg text-[#718096] hover:text-[#00342F] hover:bg-black/5 transition-colors cursor-pointer"
              title="Collapse menu"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Section Category Header */}
          <div className="px-5 pt-3 pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-grey-400">
              {activeGroup.key === 'adm' ? 'MORE' : activeGroup.name}
            </span>
            <div className="border-b border-[#E2E8F0]/80 mt-2 mb-1" />
          </div>

          {/* Nav Items List: Flush to right edge with green border marker */}
          <div className="pl-4 pr-0 py-2 flex-1 overflow-y-auto space-y-1">
            {activeGroup.items.map((item) => {
              const isItemActive = item.id === activeItemId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  title={item.tip}
                  className={cn(
                    'w-full text-left pl-4 pr-4 py-2.5 rounded-l-2xl text-[14px] transition-all relative flex items-center justify-between group cursor-pointer',
                    isItemActive
                      ? 'bg-white text-grey-900 font-semibold shadow-2xs'
                      : 'text-grey-600 hover:text-grey-900 hover:bg-white/40 font-medium'
                  )}
                >
                  <span className="truncate">{item.name}</span>
                  {/* Marker closing firmly against the sub nav bar border */}
                  {isItemActive && (
                    <span className="absolute right-0 top-0 bottom-0 w-1 bg-[#2ee05a] rounded-l-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Collapse Indicator & Help hint */}
          <div className="p-3 border-t border-[#E2E8F0]/80 text-[11px] text-grey-500 flex items-center justify-between px-5">
            <span>CareCentriq v2.4</span>
            <span className="font-semibold text-brand-700">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

