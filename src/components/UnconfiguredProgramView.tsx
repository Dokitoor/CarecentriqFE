import React from 'react';
import { ChevronRight, Shield, Users, Calendar, Home, Award } from 'lucide-react';
import { Organization } from '../types';
import { SetupCardsGraphic } from './CurriculumMascots';
import { toast } from '../lib/toast';
import { VERIFIED_CARE_AVATARS, handleImageError } from '../lib/images';

interface UnconfiguredProgramViewProps {
  program: Organization;
  onStartSetup: () => void;
  onNavigateToTeam?: () => void;
  onNavigateToClients?: () => void;
  onSwitchToOperations?: () => void;
}

export const UnconfiguredProgramView: React.FC<UnconfiguredProgramViewProps> = ({
  program,
  onStartSetup,
  onNavigateToTeam,
  onNavigateToClients,
  onSwitchToOperations,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Program Name Header & Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-grey-900 tracking-tight">
            {program.name}
          </h1>

          {onSwitchToOperations && (
            <button
              type="button"
              onClick={onSwitchToOperations}
              className="text-xs text-brand-700 hover:text-brand-900 font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer border border-brand-200 shrink-0"
            >
              Preview Live Dashboard →
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {program.badges.map((b, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-grey-600 border border-grey-200 shadow-2xs"
            >
              <Award className="w-3 h-3 text-grey-400" />
              <span>{b}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Top 3 Progress / Step Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Line Setup (Active) */}
        <div
          onClick={onStartSetup}
          className="p-4 rounded-2xl border-2 border-[#9CF269] bg-emerald-50/20 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group relative overflow-hidden"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={VERIFIED_CARE_AVATARS[4]}
              alt="Line Setup"
              onError={handleImageError}
              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-emerald-200 shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-grey-900 group-hover:text-emerald-950 transition-colors flex items-center gap-1.5">
                <span>Line Setup</span>
                <span className="w-2 h-2 rounded-full bg-[#2EE05A] animate-pulse" />
              </div>
              <p className="text-[11px] text-grey-500 leading-snug line-clamp-2 mt-0.5">
                Set up objectives, trainings, calendar and daily notes for this service line
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 shrink-0 transition-colors" />
        </div>

        {/* Step 2: Build your Team */}
        <div
          onClick={() => {
            if (onNavigateToTeam) {
              onNavigateToTeam();
            } else {
              toast.info('Staff Assignment', `Ready to assign team members to ${program.name}.`);
            }
          }}
          className="p-4 rounded-2xl border border-grey-200 bg-white hover:border-grey-300 hover:bg-grey-50/50 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={VERIFIED_CARE_AVATARS[0]}
              alt="Build your Team"
              onError={handleImageError}
              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-grey-200 shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-grey-900 group-hover:text-brand-900 transition-colors">
                Build your Team
              </div>
              <p className="text-[11px] text-grey-500 leading-snug line-clamp-2 mt-0.5">
                Assign staff members to this service line
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 shrink-0 transition-colors" />
        </div>

        {/* Step 3: Add your Clients */}
        <div
          onClick={() => {
            if (onNavigateToClients) {
              onNavigateToClients();
            } else {
              toast.info('Client Setup', `Ready to assign participants to ${program.name}.`);
            }
          }}
          className="p-4 rounded-2xl border border-grey-200 bg-white hover:border-grey-300 hover:bg-grey-50/50 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={VERIFIED_CARE_AVATARS[1]}
              alt="Add your Clients"
              onError={handleImageError}
              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-grey-200 shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-grey-900 group-hover:text-brand-900 transition-colors">
                Add your Clients
              </div>
              <p className="text-[11px] text-grey-500 leading-snug line-clamp-2 mt-0.5">
                Set shift windows and recurring support hours
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 shrink-0 transition-colors" />
        </div>
      </div>

      {/* Main Empty State Container Card (Matching Image 1 verbatim) */}
      <div className="w-full bg-white rounded-3xl border border-grey-200/80 p-8 sm:p-12 shadow-xs min-h-[360px] flex flex-col items-center justify-center text-center">
        {/* Floating 3D card graphic */}
        <SetupCardsGraphic className="mb-2" />

        <h2 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight mt-4">
          Finish configuring your {program.name}
        </h2>
        <p className="text-xs sm:text-sm text-grey-500 max-w-md mt-1.5 leading-relaxed">
          It only takes a few minutes and helps your team hit the ground running.
        </p>

        <button
          type="button"
          onClick={onStartSetup}
          className="mt-6 px-8 py-3 rounded-xl bg-[#9CF269] hover:bg-[#8ee45e] text-[#00342F] font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
        >
          Start Service Line Setup
        </button>
      </div>
    </div>
  );
};

