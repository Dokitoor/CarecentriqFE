'use client';

import React from 'react';
import { Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobilePhoneMockupProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const MobilePhoneMockup: React.FC<MobilePhoneMockupProps> = ({
  title,
  subtitle,
  badge,
  headerAction,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative w-[300px] sm:w-[325px] h-[640px] sm:h-[670px] select-none mx-auto flex flex-col',
        'rounded-[50px] p-[10px] bg-[#1E2022]',
        'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_0_2px_rgba(0,0,0,0.9),inset_0_0_0_3px_#42464b]',
        className
      )}
    >
      {/* Hardware Buttons - Left Side */}
      <div className="absolute -left-[3px] top-[100px] w-[3px] h-[26px] bg-[#3a3d40] rounded-l-xs" />
      <div className="absolute -left-[3px] top-[140px] w-[3px] h-[48px] bg-[#3a3d40] rounded-l-xs" />
      <div className="absolute -left-[3px] top-[200px] w-[3px] h-[48px] bg-[#3a3d40] rounded-l-xs" />

      {/* Hardware Button - Right Side (Power) */}
      <div className="absolute -right-[3px] top-[150px] w-[3px] h-[68px] bg-[#3a3d40] rounded-r-xs" />

      {/* Internal Phone Screen */}
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col text-grey-900 border border-black/5 shadow-inner">
        {/* Dynamic Island Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[84px] h-[22px] bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-white/10" />
          <div className="w-2 h-2 rounded-full bg-[#081524]" />
        </div>

        {/* Top iOS Status Bar */}
        <div className="w-full pt-2.5 px-6 pb-1 flex items-center justify-between text-[10px] font-bold text-grey-900 z-20 select-none bg-white">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-grey-800">
            <span className="text-[9px] font-bold">5G</span>
            <div className="w-4 h-2 rounded-xs border border-grey-900 p-0.5 flex items-center">
              <div className="w-full h-full bg-grey-900 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* In-App Header Bar */}
        {(title || badge || headerAction) && (
          <div className="px-3.5 py-1.5 border-b border-grey-100 flex items-center justify-between bg-white z-10">
            <div className="min-w-0">
              {title && (
                <div className="font-bold text-xs text-grey-900 leading-tight truncate">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="text-[9px] text-grey-500 truncate">{subtitle}</div>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {badge && (
                <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {badge}
                </span>
              )}
              {headerAction}
            </div>
          </div>
        )}

        {/* Scrollable Screen Body (100% VISIBLE, Interactive) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3 text-left font-sans select-auto">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="w-full py-1.5 flex justify-center bg-white/95 backdrop-blur-xs select-none">
          <div className="w-28 h-1 bg-black/70 rounded-full" />
        </div>
      </div>
    </div>
  );
};

