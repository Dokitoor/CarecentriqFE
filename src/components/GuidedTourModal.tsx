import React, { useState } from 'react';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (viewId: string) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  if (!isOpen) return null;

  const STEPS = [
    {
      title: 'Welcome to CareCentriq Operations',
      desc: 'Let us show you around your decluttered care workspace in less than 60 seconds.',
      target: 'overview',
      highlight: 'Streamlined navigation with clear separation between Daily Activity and Long-Term Compliance.',
    },
    {
      title: 'Operations Hub & Quick Actions',
      desc: 'Your central command deck. Real-time client attendance, pending progress notes, and staff coverage without text overload.',
      target: 'overview',
      highlight: 'Check today’s status at a glance and jump straight into clinical notes.',
    },
    {
      title: 'Real-Time Program Switching',
      desc: 'Seamlessly switch between Highpointe 532, Lakeview, or Cedar Ridge from the header without losing your place.',
      target: 'overview',
      highlight: 'Context is preserved per program with instant data updates.',
    },
    {
      title: 'Compliance & Risk Center',
      desc: 'One single view to detect what is overdue across ISP reports, daily notes, calendars, and emergency drills.',
      target: 'compliance',
      highlight: 'Visual trend curves replace endless walls of status text.',
    },
    {
      title: 'Daily Care Activity',
      desc: 'Progress notes, ISP reports, calendars, and safety drills live together under Daily Activity with unified filters.',
      target: 'notes',
      highlight: 'Search by client or filter by service line in seconds.',
    },
    {
      title: 'People & Clinical Teams',
      desc: 'Manage client medical binders, facesheets, and staff credentialing pipelines without multi-portal confusion.',
      target: 'clients',
      highlight: 'Individualized profiles consolidate goals, emergency contacts, and state compliance.',
    },
    {
      title: 'You Are All Set!',
      desc: 'You can reopen this guided tour at any time by clicking the Help icon in the top header.',
      target: 'overview',
      highlight: 'Let’s start managing client care with clarity and ease.',
    },
  ];

  const currentStep = STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      onNavigate(STEPS[next].target);
    } else {
      toast.success('Walkthrough Finished', 'You are ready to manage care operations with CareCentriq.');
      onClose();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      onNavigate(STEPS[prev].target);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-border shadow-popover p-6 relative space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-grey-400 hover:text-grey-700 p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge & Step indicator */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-grey-400 uppercase tracking-wider">
            Step {stepIndex + 1} of {STEPS.length}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-rail">{currentStep.title}</h2>
          <p className="text-xs text-grey-600 leading-relaxed">{currentStep.desc}</p>
        </div>

        {/* Highlight Callout */}
        <div className="p-3 rounded-2xl bg-panel border border-brand-200 text-xs text-brand-900 font-medium">
          💡 {currentStep.highlight}
        </div>

        {/* Stepper Dots & Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === stepIndex ? 'w-5 bg-brand-600' : 'w-1.5 bg-grey-200'
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-xl border border-border text-xs font-semibold text-grey-700 hover:bg-grey-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-rail text-white text-xs font-bold hover:bg-[#062420] transition-colors"
            >
              {stepIndex === STEPS.length - 1 ? 'Get Started' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

