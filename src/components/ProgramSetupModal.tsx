import React from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  FileText,
  Users,
  LayoutGrid,
  ChevronRight,
  X,
} from 'lucide-react';
import { Organization } from '../types';
import { VERIFIED_CARE_AVATARS, handleImageError } from '../lib/images';

interface ProgramSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Organization | null;
  onNavigateToCurriculum: () => void;
  onNavigateToTeam: () => void;
  onNavigateToClients: () => void;
}

const FAN_AVATARS = [
  VERIFIED_CARE_AVATARS[4],
  VERIFIED_CARE_AVATARS[0],
  VERIFIED_CARE_AVATARS[5],
];

export const ProgramSetupModal: React.FC<ProgramSetupModalProps> = ({
  isOpen,
  onClose,
  program,
  onNavigateToCurriculum,
  onNavigateToTeam,
  onNavigateToClients,
}) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Dialog (Matches Figma Frame 2147238504) */}
      <div className="relative w-full max-w-lg bg-[#062E28] rounded-[28px] p-6 sm:p-8 text-center text-white shadow-2xl border border-white/10 my-auto select-none animate-in zoom-in-95 duration-200">
        
        {/* Top Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Fanned Out Portraits Hanging at Top Center */}
        <div className="flex items-center justify-center -mt-2 mb-3">
          <div className="flex -space-x-3.5 items-center">
            <img
              src={FAN_AVATARS[0]}
              alt="Care team"
              onError={handleImageError}
              className="w-14 h-14 rounded-2xl object-cover -rotate-8 border-2 border-white shadow-lg shrink-0"
            />
            <img
              src={FAN_AVATARS[1]}
              alt="Care professional"
              onError={handleImageError}
              className="w-14 h-14 rounded-2xl object-cover rotate-1 border-2 border-white shadow-lg z-10 shrink-0"
            />
            <img
              src={FAN_AVATARS[2]}
              alt="Care participant"
              onError={handleImageError}
              className="w-14 h-14 rounded-2xl object-cover rotate-8 border-2 border-white shadow-lg z-20 shrink-0"
            />
          </div>
        </div>

        {/* Title in Brand Green */}
        <h2 className="font-sans font-bold text-2xl sm:text-[28px] text-[#9CF269] tracking-tight leading-snug">
          ‘{program.name}’<br />is all set up.
        </h2>

        {/* Subtitle Explanations */}
        <p className="text-xs sm:text-sm text-grey-100 font-medium mt-2">
          Now let's get it ready for your clients.
        </p>
        <p className="text-[11px] sm:text-xs text-grey-300/80 leading-relaxed max-w-sm mx-auto mt-1 font-normal">
          We'll do this together, one small step at a time. You can skip anything and finish it later.
        </p>

        {/* Inner Card Container */}
        <div className="rounded-2xl bg-white/10 border border-white/10 p-3 sm:p-4 text-left mt-5 space-y-3">
          {/* Header row with Program Name and Badges */}
          <div className="space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-white">{program.name}</div>
            <div className="flex flex-wrap gap-1.5">
              {program.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/25 text-grey-200 border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* White Checklist Menu */}
          <div className="bg-white rounded-xl divide-y divide-grey-100 overflow-hidden shadow-xs">
            {/* Item 1: Curriculum */}
            <div
              onClick={() => {
                onClose();
                onNavigateToCurriculum();
                toast.info('Curriculum Setup', `Linking behavioral curriculum to ${program.name}.`);
              }}
              className="p-3 flex items-center justify-between gap-3 hover:bg-grey-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-grey-900 group-hover:text-brand-900 transition-colors">
                    Set up your Program Curriculum
                  </div>
                  <div className="text-[10px] text-grey-500">
                    Link a program curriculum to this service line
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 transition-colors" />
            </div>

            {/* Item 2: Team */}
            <div
              onClick={() => {
                onClose();
                onNavigateToTeam();
                toast.info('Staff Assignment', `Assigning direct care specialists to ${program.name}.`);
              }}
              className="p-3 flex items-center justify-between gap-3 hover:bg-grey-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-grey-900 group-hover:text-brand-900 transition-colors">
                    Build your Team
                  </div>
                  <div className="text-[10px] text-grey-500">
                    Assign staff members to this service line
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 transition-colors" />
            </div>

            {/* Item 3: Clients */}
            <div
              onClick={() => {
                onClose();
                onNavigateToClients();
                toast.info('Client Enrollment', `Enrolling clients and setting authorized hours.`);
              }}
              className="p-3 flex items-center justify-between gap-3 hover:bg-grey-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-grey-900 group-hover:text-brand-900 transition-colors">
                    Add your Clients
                  </div>
                  <div className="text-[10px] text-grey-500">
                    Set shift windows and recurring support hours
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-grey-700 transition-colors" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-grey-300 hover:text-white font-medium transition-colors cursor-pointer px-2 py-1"
          >
            I'll do this later
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateToCurriculum();
              toast.success('Curriculum Launcher', `Opening curriculum designer for ${program.name}.`);
            }}
            className="bg-[#9CF269] hover:bg-[#8ee45e] text-[#00342F] font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Setup my Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};

