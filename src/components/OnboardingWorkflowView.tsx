import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface OnboardingWorkflowViewProps {
  type: 'client' | 'staff';
}

export const OnboardingWorkflowView: React.FC<OnboardingWorkflowViewProps> = ({ type }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]);

  const clientSteps = [
    { title: 'Intake Assessment', desc: 'Regional center referral and client demographic records' },
    { title: 'Document Clearance', desc: 'Upload IPP, medical history, facesheet, and consent' },
    { title: 'Service Line Allocation', desc: 'Assign Day Services (532), TDS, or PIP schedules' },
    { title: 'ISP Objectives Definition', desc: 'Configure skill acquisition and behavioral goals' },
    { title: 'Calendar & Quota Setup', desc: 'Allocate authorized monthly hours and attendance days' },
  ];

  const staffSteps = [
    { title: 'Employment Profile', desc: 'DSP/Supervisor role, contact information, and W-4 setup' },
    { title: 'Background Live Scan', desc: 'Submit LIC 9182 fingerprint clearance to state registry' },
    { title: 'Health Clearances (TB & Physical)', desc: 'Valid TB test result and medical evaluation' },
    { title: 'Orientation & Training', desc: 'CareCentriq clinical documentation & safety procedures' },
    { title: 'Service Line & Permissions', desc: 'Assign to active program rosters and grant access' },
  ];

  const steps = type === 'client' ? clientSteps : staffSteps;

  const toggleStep = (idx: number) => {
    const step = steps[idx];
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
      toast.warning('Milestone Reopened', `"${step.title}" marked as pending completion.`);
    } else {
      setCompletedSteps([...completedSteps, idx]);
      toast.success('Milestone Verified', `"${step.title}" successfully verified and locked.`);
    }
  };

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-rail tracking-tight">
          {type === 'client' ? 'Client Onboarding Pipeline' : 'Staff Credentialing Pipeline'}
        </h1>
        <p className="text-xs text-grey-500 mt-1">
          {type === 'client'
            ? 'Ensure 100% compliance before admitting a new client to operational rosters.'
            : 'Track pre-employment regulatory clearances and state mandated certifications.'}
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-grey-700">Onboarding Progress</span>
          <span className="text-brand-800">{completedSteps.length} of {steps.length} Steps Complete ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-grey-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step by Step Checklist */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isDone = completedSteps.includes(idx);
          return (
            <div
              key={step.title}
              onClick={() => toggleStep(idx)}
              className={cn(
                'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 shadow-xs',
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-white border-border hover:border-brand-300'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors',
                    isDone ? 'text-emerald-600' : 'text-grey-300'
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-100 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-grey-400">
                      Step {idx + 1}
                    </span>
                    <span
                      className={cn(
                        'text-xs font-bold',
                        isDone ? 'text-emerald-900 line-through opacity-80' : 'text-rail'
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-grey-500 mt-0.5">{step.desc}</p>
                </div>
              </div>

              <button
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors',
                  isDone
                    ? 'bg-white border border-emerald-200 text-emerald-800'
                    : 'bg-rail text-white'
                )}
              >
                {isDone ? 'Review Details' : 'Complete Step'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

