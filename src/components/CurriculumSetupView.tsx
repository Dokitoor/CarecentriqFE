import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  FileText,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Check,
  Smartphone,
  Layers,
  ArrowRight,
  Info,
  GripVertical,
  X,
  Lock,
  MapPin,
  User,
  Folder,
} from 'lucide-react';
import { Organization } from '../types';
import { toast } from '../lib/toast';
import { cn } from '../lib/utils';
import { GreenBagMascot, PinkStarMascot } from './CurriculumMascots';
import { VERIFIED_CARE_AVATARS, handleImageError } from '../lib/images';

// Exact artwork uploaded by user for Got a lot to add & Prefer to build it yourself (Next.js public paths)
const objectiveFolderImg = '/objective-folder.png';
const objectiveBlocksImg = '/objective-blocks.png';

// Exact illustrations from C:\Users\LENOVO T480\Downloads\illustrations
const cardObjectivesImg = '/illustrations/card-objectives.png';
const cardTrainingsImg = '/illustrations/card-trainings.png';
const cardTasksImg = '/illustrations/card-tasks.png';
const cardBehaviorImg = '/illustrations/card-behavior.png';
const cardMeasurementImg = '/illustrations/card-measurement.png';

// Exact Behavior illustrations from C:\Users\LENOVO T480\Downloads\illustrations\Behaviour
const behaviorAbcImg = '/illustrations/ABc tracking.png';
const behaviorCustomImg = '/illustrations/custom build.png';

export type CurriculumStep =
  | 'overview'
  | 'objectives'
  | 'trainings'
  | 'tasks'
  | 'behavior'
  | 'calendar'
  | 'daily-note';

// 30 Days of November 2026 with realistic, rich service line schedule data
interface CalendarDayItem {
  day: number;
  isWeekend?: boolean;
  comp?: string;
  title?: string;
  task?: string;
  duration?: string;
  objective?: string;
  staff?: string;
  loc?: string;
}

const NOVEMBER_30_DAYS: CalendarDayItem[] = [
  // Week 1: Day 1 (Sunday)
  { day: 1, isWeekend: true },

  // Week 2: Days 2 - 8
  {
    day: 2,
    comp: 'Recreation',
    title: 'Walking',
    task: 'Pace regulation & pedestrian safety',
    duration: '45 mins',
    objective: 'Physical Health & Mobility',
    staff: 'Olusuyi Emmanuel',
    loc: '210 Park Road',
  },
  {
    day: 3,
    comp: 'Self-Care',
    title: 'Shopping practice',
    task: 'Produce selection & checkout budgeting',
    duration: '1.5 hrs',
    objective: 'Independent Daily Living',
    staff: 'Olusuyi Emmanuel',
    loc: 'Home home',
  },
  {
    day: 4,
    comp: 'Creative Arts',
    title: 'Art workshop',
    task: 'Color blending & clean workspace maintenance',
    duration: '1 hr',
    objective: 'Sensory Expression',
    staff: 'Olusuyi Emmanuel',
    loc: '32 Center Drive',
  },
  {
    day: 5,
    comp: 'Community Integration',
    title: 'Library visit',
    task: 'Catalogue book search & quiet voice control',
    duration: '1 hr',
    objective: 'Community Navigation',
    staff: 'Olusuyi Emmanuel',
    loc: '123 Main Street',
  },
  {
    day: 6,
    comp: 'Self-Care',
    title: 'Cooking club',
    task: 'Kitchen utensil safety & recipe sequencing',
    duration: '1.5 hrs',
    objective: 'Nutrition & Meal Prep',
    staff: 'Olusuyi Emmanuel',
    loc: 'Home home',
  },
  { day: 7, isWeekend: true },
  { day: 8, isWeekend: true },

  // Week 3: Days 9 - 15
  {
    day: 9,
    comp: 'Creative Arts',
    title: 'Art workshop',
    task: 'Mosaic paper collage assembly',
    duration: '1 hr',
    objective: 'Sensory Expression',
    staff: 'Olusuyi Emmanuel',
    loc: '32 Center Drive',
  },
  {
    day: 10,
    comp: 'Community Integration',
    title: 'Library visit',
    task: 'Borrowing procedure & digital research',
    duration: '1 hr',
    objective: 'Lifelong Learning',
    staff: 'Olusuyi Emmanuel',
    loc: '123 Main Street',
  },
  {
    day: 11,
    comp: 'Self-Care',
    title: 'Cooking club',
    task: 'Vegetable washing & measuring cups',
    duration: '1.5 hrs',
    objective: 'Nutrition & Meal Prep',
    staff: 'Olusuyi Emmanuel',
    loc: '45 Oak Avenue',
  },
  {
    day: 12,
    comp: 'Recreation',
    title: 'Walking',
    task: 'Hydration intervals & trail stamina',
    duration: '45 mins',
    objective: 'Physical Health & Mobility',
    staff: 'Olusuyi Emmanuel',
    loc: 'Home home',
  },
  {
    day: 13,
    comp: 'Self-Care',
    title: 'Shopping practice',
    task: 'Receipt auditing & bag packing',
    duration: '1 hr',
    objective: 'Independent Daily Living',
    staff: 'Olusuyi Emmanuel',
    loc: '88 Market Street',
  },
  { day: 14, isWeekend: true },
  { day: 15, isWeekend: true },

  // Week 4: Days 16 - 22
  {
    day: 16,
    comp: 'Digital Skills',
    title: 'Computer Lab',
    task: 'Profile sign-in & keyboard typing',
    duration: '1 hr',
    objective: 'Vocational Tech Skills',
    staff: 'Elena Rostova',
    loc: 'Tech Center Suite 10',
  },
  {
    day: 17,
    comp: 'Recreation',
    title: 'Bowling & Balance',
    task: 'Turn taking & lane boundary awareness',
    duration: '1.5 hrs',
    objective: 'Gross Motor Development',
    staff: 'Marcus Chen',
    loc: 'Sunset Lanes',
  },
  {
    day: 18,
    comp: 'Community Integration',
    title: 'Public Transit Training',
    task: 'Fare-card validation & platform safety',
    duration: '1.5 hrs',
    objective: 'Community Navigation',
    staff: 'Chloe Bennett',
    loc: 'Metro Central Station',
  },
  {
    day: 19,
    comp: 'Self-Care',
    title: 'Laundry Care',
    task: 'Garment sorting & cycle initiation',
    duration: '1 hr',
    objective: 'Home Economics',
    staff: 'Devon Vance',
    loc: 'Home home',
  },
  {
    day: 20,
    comp: 'Creative Arts',
    title: 'Rhythm Circle',
    task: 'Group tempo following & expression',
    duration: '45 mins',
    objective: 'Auditory Social Bonding',
    staff: 'Elena Rostova',
    loc: '32 Center Drive',
  },
  { day: 21, isWeekend: true },
  { day: 22, isWeekend: true },

  // Week 5: Days 23 - 29
  {
    day: 23,
    comp: 'Vocational Prep',
    title: 'Assembly & Sorting',
    task: 'Component verification & boxed seal',
    duration: '1 hr',
    objective: 'Work Readiness',
    staff: 'Marcus Chen',
    loc: 'Vocational Workshop',
  },
  {
    day: 24,
    comp: 'Self-Care',
    title: 'Menu Planning',
    task: 'Balanced diet meal sheet drafting',
    duration: '45 mins',
    objective: 'Nutritional Autonomy',
    staff: 'Olusuyi Emmanuel',
    loc: 'Home home',
  },
  {
    day: 25,
    comp: 'Social Skills',
    title: 'Board Game Social',
    task: 'Rule compliance & cooperative play',
    duration: '1 hr',
    objective: 'Peer Relationships',
    staff: 'Chloe Bennett',
    loc: 'Community Lounge',
  },
  {
    day: 26,
    comp: 'Cultural Life',
    title: 'Thanksgiving Celebration',
    task: 'Group dining etiquette & sharing',
    duration: '2 hrs',
    objective: 'Community Celebration',
    staff: 'Team Staff',
    loc: 'Campus Dining Hall',
  },
  {
    day: 27,
    comp: 'Recreation',
    title: 'Nature Park Walk',
    task: 'Trail orientation & pacing',
    duration: '1 hr',
    objective: 'Outdoor Physical Wellness',
    staff: 'Devon Vance',
    loc: 'Oak City Park',
  },
  { day: 28, isWeekend: true },
  { day: 29, isWeekend: true },

  // Week 6: Day 30 (Monday)
  {
    day: 30,
    comp: 'Goal Review',
    title: 'Monthly Progress Review',
    task: 'Self-reflection & goal charting',
    duration: '1 hr',
    objective: 'ISP Self-Advocacy',
    staff: 'Olusuyi Emmanuel',
    loc: '32 Center Drive',
  },
];

interface CurriculumSetupViewProps {
  program: Organization;
  initialStep?: CurriculumStep;
  onReturnToDashboard: () => void;
  onObjectivesConfigured: () => void;
}

export const CurriculumSetupView: React.FC<CurriculumSetupViewProps> = ({
  program,
  initialStep = 'overview',
  onReturnToDashboard,
  onObjectivesConfigured,
}) => {
  const [step, setStep] = useState<CurriculumStep>(initialStep);
  const [downloadModal, setDownloadModal] = useState<'none' | 'downloading' | 'downloaded'>('none');
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Behavior tracking state
  const [behaviorMethod, setBehaviorMethod] = useState<'abc' | 'custom'>('custom');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('Significant');

  // Calendar configuration state (Matching staging screenshots media_1793813970862_b9f15d5e.png & media_1793812396350_09b3df34.jpg)
  const [calendarToggles, setCalendarToggles] = useState({
    date: true, // locked
    ispObjective: true,
    trainingComponent: true,
    activity: true, // locked
    task: false,
    duration: false,
    assignedStaff: true,
    activityAddress: true,
  });

  // Daily note configuration state
  const [activeNoteSection, setActiveNoteSection] = useState<1 | 2 | 3 | 4>(1);
  const [showUci, setShowUci] = useState(true);
  const [requireParticipation, setRequireParticipation] = useState(true);
  const [enableDuration, setEnableDuration] = useState(true);
  const [requireSignature, setRequireSignature] = useState(true);

  // Interactive phone preview state
  const [phoneAttendance, setPhoneAttendance] = useState<'Present' | 'Absent'>('Present');
  const [phoneAbsenceReason, setPhoneAbsenceReason] = useState('Illness');
  const [phoneParticipated, setPhoneParticipated] = useState('Yes');
  const [phoneGoalsMet, setPhoneGoalsMet] = useState('Yes');
  const [phonePromptLevel, setPhonePromptLevel] = useState('Verbal');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animated progress for downloading popup
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (downloadModal === 'downloading') {
      setDownloadProgress(0);
      const startTime = Date.now();
      const duration = 1800; // 1.8 seconds

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.round((elapsed / duration) * 100));
        setDownloadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          triggerCsvDownload();
          timer = setTimeout(() => {
            setDownloadModal('downloaded');
          }, 350);
        }
      }, 50);

      return () => {
        clearInterval(interval);
        if (timer) clearTimeout(timer);
      };
    }
  }, [downloadModal]);

  // Real CSV template generator and downloader for active step
  const triggerCsvDownload = () => {
    let csvContent = '';
    let fileName = '';

    if (step === 'objectives') {
      fileName = `${program.name.replace(/\s+/g, '_')}_Objectives_Template.csv`;
      csvContent =
`Objective ID,Title,Domain / Category,Description,Measurement Method,Target Frequency,Target Score (%)
OBJ-001,Independent Meal Preparation,Daily living,Participant will prepare a simple healthy lunch with minimal verbal cues.,Percentage of steps completed independently,5 days / week,85%
OBJ-002,Resume and Application Building,Employment skill,Participant will draft and update their vocational resume and identify 2 job openings.,Bi-weekly review with job coach,2 times / month,100%
OBJ-003,Public Transit Navigation,Daily living,Participant will utilize public bus transit to commute between home and day center safely.,Staff observation checklist,3 days / week,90%
OBJ-004,Medication Routine Awareness,Personal wellness,Participant will identify their prescribed medications and time slots independently.,Daily self-report log,Daily,95%
OBJ-005,Conflict De-escalation & Coping,Behavioral,Participant will utilize deep breathing or quiet space when experiencing sensory overstimulation.,Frequency count of self-advocacy prompts,Weekly,80%
`;
    } else if (step === 'trainings') {
      fileName = `${program.name.replace(/\s+/g, '_')}_Trainings_Template.csv`;
      csvContent =
`Training ID,Title,Category,Frequency,Target Ratio,Default Duration
TRN-001,Culinary & Nutrition Workshop,Life Skills,Twice Weekly,1:3,45 mins
TRN-002,Digital Literacy & Computer Lab,Vocational,3 times / week,1:2,60 mins
TRN-003,Mobility & Community Transit,Independence,Weekly,1:1,90 mins
TRN-004,Wellness, Breathing & Yoga,Physical Wellness,Daily,Group,30 mins
`;
    } else {
      fileName = `${program.name.replace(/\s+/g, '_')}_Universal_Tasks_Template.csv`;
      csvContent =
`Task ID,Task Name,Category,Measurement Criteria,Evaluation Scale
TSK-101,Follow Activity Instructions,Execution,Follows 2-step verbal prompt without repetition,1-5 Scale
TSK-102,Complete Assigned Work,Independence,Finishes station assignments within session,Percentage Done
TSK-103,Maintain Engagement,Focus,Remains on task during 20-min block,Duration (mins)
TSK-104,Demonstrate Responsibility,Social,Returns equipment and tidies workstation,Pass / Fail
TSK-105,Manage Materials Properly,Safety,Uses safety scissors and tools appropriately,Prompt Level
`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(
        'Records Imported!',
        `Successfully loaded items from "${file.name}" into ${program.name}.`
      );
      if (step === 'objectives') {
        setStep('trainings');
      } else if (step === 'trainings') {
        setStep('tasks');
      } else if (step === 'tasks') {
        setStep('behavior');
      }
    }
  };

  // Step Number helper
  const getStepNumber = (): number => {
    switch (step) {
      case 'objectives':
        return 1;
      case 'trainings':
        return 2;
      case 'tasks':
        return 3;
      case 'behavior':
        return 4;
      case 'calendar':
        return 5;
      case 'daily-note':
        return 6;
      default:
        return 1;
    }
  };

  const currentStepNumber = getStepNumber();

  // Step indicator component placed atop the right explanation segment
  const renderStepProgressPills = (stepNum: number) => (
    <div className="flex items-center justify-between pb-5 mb-6 border-b border-black/[0.08] w-full">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const isCurrent = stepNum === num;
          const isPast = stepNum > num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => {
                const stepMap: Record<number, CurriculumStep> = {
                  1: 'objectives',
                  2: 'trainings',
                  3: 'tasks',
                  4: 'behavior',
                  5: 'calendar',
                  6: 'daily-note',
                };
                if (stepMap[num]) setStep(stepMap[num]);
              }}
              className={cn(
                'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer',
                isCurrent
                  ? 'bg-[#0A0A0A] text-white shadow-xs ring-2 ring-black/15 scale-105'
                  : isPast
                  ? 'bg-black/15 text-grey-800 hover:bg-black/25'
                  : 'bg-black/5 text-grey-400 hover:bg-black/10'
              )}
              title={`Go to Step ${num}`}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="text-[11px] font-bold text-grey-700 uppercase tracking-wider shrink-0">
        Step {stepNum} of 6
      </div>
    </div>
  );

  // 5 Curriculum Cards on the Slide with EXACT illustrations from C:\Users\LENOVO T480\Downloads\illustrations
  const CURRICULUM_CARDS = [
    {
      id: 'objectives',
      title: 'Program\nObjectives',
      desc: 'Define the outcomes participants are working towards and measure their progress over time.',
      bg: 'bg-[#DDE5FE]',
      illustration: cardObjectivesImg,
      isSelected: true,
      onClick: () => setStep('objectives'),
    },
    {
      id: 'trainings',
      title: 'Trainings\n& Activities',
      desc: 'Organise client development into skill areas and meaningful activities that support growth and progress.',
      bg: 'bg-[#D8ECC3]',
      illustration: cardTrainingsImg,
      isSelected: false,
      onClick: () => setStep('trainings'),
    },
    {
      id: 'tasks',
      title: 'Tasks',
      desc: 'A shared set of measurable actions used to monitor progress and document performance across activities.',
      bg: 'bg-[#FCE8A6]',
      illustration: cardTasksImg,
      isSelected: false,
      onClick: () => setStep('tasks'),
    },
    {
      id: 'behavior',
      title: 'Behavior',
      desc: 'Identify the key behaviours your team will monitor, document, and support throughout the program.',
      bg: 'bg-[#FED2C7]',
      illustration: cardBehaviorImg,
      isSelected: false,
      onClick: () => setStep('behavior'),
    },
    {
      id: 'measurement',
      title: 'Behavior\nMeasurement',
      desc: 'Select the methods your team will use to record behaviours and monitor progress.',
      bg: 'bg-[#DCF0B4]',
      illustration: cardMeasurementImg,
      isSelected: false,
      onClick: () => setStep('behavior'),
    },
  ];

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-white text-grey-900 flex flex-col font-sans select-none animate-in fade-in duration-200">
      {/* Hidden File Input for CSV/Excel file selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv,.xlsx,.xls,.txt"
        className="hidden"
      />

      {/* ====================================================================
          FULL SCREEN 1: SET UP YOUR ENTIRE PROGRAM CURRICULUM (Slide View)
          (With exact illustrations from C:\Users\LENOVO T480\Downloads\illustrations)
      ==================================================================== */}
      {step === 'overview' && (
        <div className="flex-1 flex flex-col md:flex-row items-stretch min-h-screen">
          {/* Left Column (Soft Blue #DDE5FE Panel) */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#DDE5FE] p-8 sm:p-12 flex flex-col justify-between shrink-0">
            <div>
              {/* Back Button */}
              <button
                type="button"
                onClick={onReturnToDashboard}
                className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-grey-800 flex items-center justify-center transition-colors cursor-pointer mb-8 shadow-2xs"
                title="Return to dashboard"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Green Cute Bag Mascot */}
              <div className="mb-6">
                <GreenBagMascot variant="idle" size={84} />
              </div>

              {/* Display Title */}
              <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-grey-900 tracking-tight leading-[1.08] mb-6">
                Set up your<br />
                entire<br />
                Program<br />
                Curriculum
              </h1>

              {/* Explanatory Body */}
              <div className="space-y-4 text-xs sm:text-sm text-grey-700/90 leading-relaxed font-normal max-w-sm">
                <p>
                  On the right, you'll find the core components of your program curriculum.
                </p>
                <p>
                  Each section represents what participants will learn, practice, and be supported with by staff. Together, they form a structured path for building skills and tracking progress over time.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-10 mt-auto">
              <button
                type="button"
                onClick={() => setStep('objectives')}
                className="w-full py-4 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-98 cursor-pointer text-center"
              >
                Proceed to set up
              </button>

              <button
                type="button"
                onClick={onReturnToDashboard}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white text-grey-800 font-semibold text-sm transition-all shadow-2xs cursor-pointer text-center"
              >
                Return to dashboard
              </button>
            </div>
          </div>

          {/* Right Column: 5 Horizontal Curriculum Cards Slide with EXACT Illustrations */}
          <div className="flex-1 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center overflow-x-auto">
            <div className="flex items-stretch gap-5 min-w-max pb-4">
              {CURRICULUM_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={card.onClick}
                  className={cn(
                    'w-[250px] sm:w-[265px] rounded-3xl bg-white flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md overflow-hidden',
                    card.isSelected
                      ? 'border-2 border-[#5B6BF5] ring-2 ring-[#5B6BF5]/20 shadow-sm'
                      : 'border border-grey-200/90 hover:border-grey-300'
                  )}
                  style={{ minHeight: '440px' }}
                >
                  {/* Top Text Section */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight leading-tight whitespace-pre-line">
                      {card.title}
                    </h3>
                    <p className="text-xs text-grey-500 mt-3 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Exact Illustration Container */}
                  <div className={cn('w-full pt-4 rounded-b-3xl overflow-hidden mt-auto flex items-end justify-center', card.bg)}>
                    <img
                      src={card.illustration}
                      alt={card.title}
                      className="w-full h-44 sm:h-48 object-contain object-bottom pointer-events-none select-none transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 2: STEP 1 OF 6 - OBJECTIVES SETUP
      ==================================================================== */}
      {step === 'objectives' && (
        <div className="flex-1 flex flex-col md:flex-row items-stretch min-h-screen">
          {/* Left Side: Title, 2 Cards, & Skip Link */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
            {/* Top Navigation & Header */}
            <div className="flex items-start gap-4 mb-8">
              <button
                type="button"
                onClick={() => setStep('overview')}
                className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1 shadow-2xs"
                title="Back to curriculum cards"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                  We’ll start with setting up your objectives.
                </h1>
                <p className="text-xs sm:text-sm text-grey-500">
                  Pick whichever way feels easier — upload a bunch at once, or build them out yourself as you go.
                </p>
              </div>
            </div>

            {/* 2 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
              {/* Card 1: Got a lot to add? */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Got a lot to add?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    Grab our template, fill it in, and upload everything in one go — no need to type each one manually.
                  </p>

                  <div className="flex items-center gap-2.5 pt-5">
                    <button
                      type="button"
                      onClick={() => setDownloadModal('downloading')}
                      className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Download template</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-grey-50 text-grey-800 font-semibold text-xs border border-grey-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Upload</span>
                      <Upload className="w-3.5 h-3.5 text-grey-500" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveFolderImg}
                    alt="Got a lot to add template folder"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Card 2: Prefer to build it yourself? */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Prefer to build it yourself?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    No problem — you can add and tweak objectives manually whenever you're ready.
                  </p>

                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={() => setStep('trainings')}
                      className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Let's go</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveBlocksImg}
                    alt="Prefer to build it yourself lego blocks"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Skip Link - Located directly beneath cards so it is never lost */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('trainings');
                  toast.info('Skipped Objectives', 'Moved to trainings & activities setup.');
                }}
                className="text-xs sm:text-sm font-medium text-grey-500 hover:text-grey-900 underline underline-offset-4 transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>

          {/* Right Side: Informational Context Panel with Page Numbering Atop */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#DCE5FE] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden border-l border-blue-100/60">
            <div className="space-y-6 z-10">
              {/* Page Numbering Atop Explanation Segment */}
              {renderStepProgressPills(1)}

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    What is an objective
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs text-grey-600 leading-relaxed">
                  Think of objectives as the goals you're working toward with each client — what success looks like for them. They help guide care, shape support plans, and let you track progress over time.{' '}
                  <button
                    type="button"
                    onClick={() => toast.info('About Objectives', 'Objectives define measurable goals tied to ISP plans.')}
                    className="font-semibold text-brand-800 underline hover:text-brand-950 inline cursor-pointer"
                  >
                    Learn more
                  </button>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    A few examples to get you started
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Daily living',
                    'Employment skill',
                    'Time management',
                    'Personal wellness',
                    'Safety awareness',
                  ].map((eg, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#EAEFFE] text-indigo-950 text-xs font-medium"
                    >
                      {eg}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <div className="flex -space-x-2.5 items-center">
                    <img
                      src={VERIFIED_CARE_AVATARS[4]}
                      alt="Caregiver"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[0]}
                      alt="Caregiver"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-10"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[5]}
                      alt="Participant"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-grey-500 italic text-right z-10 font-medium">
              After objectives, you'll set up your trainings.
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 3: STEP 2 OF 6 - TRAININGS & ACTIVITIES
      ==================================================================== */}
      {step === 'trainings' && (
        <div className="flex-1 flex flex-col md:flex-row items-stretch min-h-screen">
          {/* Left Side: Title, 2 Cards, & Skip Link */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
            {/* Top Navigation & Header */}
            <div className="flex items-start gap-4 mb-8">
              <button
                type="button"
                onClick={() => setStep('objectives')}
                className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1 shadow-2xs"
                title="Back to objectives"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                  Now, let's set up your trainings & activities.
                </h1>
                <p className="text-xs sm:text-sm text-grey-500">
                  Pick whichever way feels easier — upload a bunch at once, or build them out yourself as you go.
                </p>
              </div>
            </div>

            {/* 2 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
              {/* Card 1: Got a lot to add? */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Got a lot to add?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    Grab our template, fill it in, and upload everything in one go — no need to type each one manually.
                  </p>

                  <div className="flex items-center gap-2.5 pt-5">
                    <button
                      type="button"
                      onClick={() => setDownloadModal('downloading')}
                      className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Download template</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-grey-50 text-grey-800 font-semibold text-xs border border-grey-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Upload</span>
                      <Upload className="w-3.5 h-3.5 text-grey-500" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveFolderImg}
                    alt="Got a lot to add template folder"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Card 2: Prefer to build it yourself? */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Prefer to build it yourself?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    No problem — you can add and tweak trainings manually whenever you're ready.
                  </p>

                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={() => setStep('tasks')}
                      className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Let's go</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveBlocksImg}
                    alt="Prefer to build it yourself lego blocks"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Skip Link - Located directly beneath cards so it is never lost */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('tasks');
                  toast.info('Skipped Trainings', 'Moved to universal task set setup.');
                }}
                className="text-xs sm:text-sm font-medium text-grey-500 hover:text-grey-900 underline underline-offset-4 transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>

          {/* Right Side: Informational Context Panel with Page Numbering Atop */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#D8ECC3]/70 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden border-l border-emerald-100/60">
            <div className="space-y-6 z-10">
              {/* Page Numbering Atop Explanation Segment */}
              {renderStepProgressPills(2)}

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    What is a training & activity?
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs text-grey-600 leading-relaxed">
                  Trainings organize client development into practical, recurring skill areas and group sessions. They guide staff on scheduled activities that support growth.{' '}
                  <button
                    type="button"
                    onClick={() => toast.info('About Trainings', 'Trainings structure daily group and 1:1 sessions.')}
                    className="font-semibold text-brand-800 underline hover:text-brand-950 inline cursor-pointer"
                  >
                    Learn more
                  </button>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    A few examples to get you started
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Culinary & Meal Prep',
                    'Computer & Vocational Skills',
                    'Community Outing & Safety',
                    'Sensory Art & Expression',
                    'Physical Fitness & Mobility',
                  ].map((eg, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-950 text-xs font-medium border border-emerald-100"
                    >
                      {eg}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <div className="flex -space-x-2.5 items-center">
                    <img
                      src={VERIFIED_CARE_AVATARS[1]}
                      alt="Trainer"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[0]}
                      alt="Trainer"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-10"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[3]}
                      alt="Caregiver"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-grey-600 italic text-right z-10 font-medium">
              After trainings, you'll set up your tasks.
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 4: STEP 3 OF 6 - UNIVERSAL TASK SET
      ==================================================================== */}
      {step === 'tasks' && (
        <div className="flex-1 flex flex-col md:flex-row items-stretch min-h-screen">
          {/* Left Side: Title, 2 Cards, & Skip Link */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
            {/* Top Navigation & Header */}
            <div className="flex items-start gap-4 mb-8">
              <button
                type="button"
                onClick={() => setStep('trainings')}
                className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1 shadow-2xs"
                title="Back to trainings"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                  You rock! lets setup your universal task set
                </h1>
                <p className="text-xs sm:text-sm text-grey-500">
                  Pick whichever way feels easier — upload a bunch at once, or build them out yourself as you go.
                </p>
              </div>
            </div>

            {/* 2 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
              {/* Card 1: Got a lot to add? */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Got a lot to add?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    Grab our template, fill it in, and upload everything in one go — no need to type each one manually.
                  </p>

                  <div className="flex items-center gap-2.5 pt-5">
                    <button
                      type="button"
                      onClick={() => setDownloadModal('downloading')}
                      className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Download template</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-grey-50 text-grey-800 font-semibold text-xs border border-grey-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Upload</span>
                      <Upload className="w-3.5 h-3.5 text-grey-500" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveFolderImg}
                    alt="Got a lot to add template folder"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Card 2: Start with our recommended tasks */}
              <div className="p-6 sm:p-7 rounded-3xl border border-grey-200/90 bg-white hover:border-grey-300 shadow-xs transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                    Start with our recommended tasks
                  </h3>
                  <p className="text-xs sm:text-[13px] text-grey-500 mt-2 leading-relaxed">
                    Ready-made tasks you can edit anytime. You can review and customise them at any time.
                  </p>

                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={() => setStep('behavior')}
                      className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Use this set</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src={objectiveBlocksImg}
                    alt="Recommended tasks lego blocks"
                    className="w-full max-h-48 sm:max-h-52 object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Skip Link - Located directly beneath cards so it is never lost */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('behavior');
                  toast.info('Skipped Tasks', 'Moved to behavior measurement setup.');
                }}
                className="text-xs sm:text-sm font-medium text-grey-500 hover:text-grey-900 underline underline-offset-4 transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>

          {/* Right Side: Informational Context Panel with Page Numbering Atop */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#FEF9C3]/80 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden border-l border-amber-100/60">
            <div className="space-y-6 z-10">
              {/* Page Numbering Atop Explanation Segment */}
              {renderStepProgressPills(3)}

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    What is a task?
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs text-grey-600 leading-relaxed">
                  Think of tasks as the measurable actions staff observe during activities. They help track performance and progress consistently across your program.{' '}
                  <button
                    type="button"
                    onClick={() => toast.info('About Tasks', 'Universal tasks form the evaluation criteria for daily notes.')}
                    className="font-semibold text-amber-900 underline hover:text-amber-950 inline cursor-pointer"
                  >
                    Learn more
                  </button>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-2xs border border-white/80 space-y-3.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    A few examples to get you started
                  </h4>
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    'Follow Activity Instructions',
                    'Complete Assigned Work',
                    'Maintain Engagement',
                    'Demonstrate Responsibility',
                    'Manage Materials Properly',
                  ].map((eg, i) => (
                    <div
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FEFCE8] text-amber-950 text-xs font-semibold border border-amber-200/60"
                    >
                      {eg}
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <div className="flex -space-x-2.5 items-center">
                    <img
                      src={VERIFIED_CARE_AVATARS[5]}
                      alt="Staff"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[4]}
                      alt="Staff"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-10"
                    />
                    <img
                      src={VERIFIED_CARE_AVATARS[2]}
                      alt="Client"
                      onError={handleImageError}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white z-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-amber-900/80 italic text-right z-10 font-medium">
              After tasks, you'll set up your behaviors.
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 5: STEP 4 OF 6 - BEHAVIOR MEASUREMENT (media_1793886090218_4fbc4601.png)
      ==================================================================== */}
      {step === 'behavior' && (
        <div className="flex-1 flex flex-col md:flex-row items-stretch min-h-screen">
          {/* Left Side: Title, 2 Cards with Official Illustrations, & Bottom Actions */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Top Navigation & Header */}
              <div className="flex items-start gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setStep('tasks')}
                  className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1 shadow-2xs"
                  title="Back to tasks"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="space-y-2">
                  <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                    Behavior Measurement
                  </h1>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base text-grey-900">
                      How would you like to record behaviors?
                    </h2>
                    <p className="text-xs sm:text-sm text-grey-500 mt-0.5">
                      Choose preset ABC choices or build your own measurement settings. Your choice carries into staff Daily Notes.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2 Cards Grid with Illustrations from C:\Users\LENOVO T480\Downloads\illustrations\Behaviour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl pt-2">
                {/* Card 1: Use ABC Tracking */}
                <div
                  onClick={() => setBehaviorMethod('abc')}
                  className={cn(
                    'p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group overflow-hidden bg-white shadow-xs',
                    behaviorMethod === 'abc'
                      ? 'border-[#2ee05a] ring-2 ring-[#2ee05a]/25 shadow-sm'
                      : 'border-grey-200 hover:border-grey-300'
                  )}
                >
                  <div className="space-y-4">
                    {/* Illustration Container */}
                    <div className="w-full h-44 sm:h-48 rounded-2xl bg-[#FAFAFC] border border-grey-100/90 overflow-hidden flex items-center justify-center p-3 transition-transform group-hover:scale-[1.01]">
                      <img
                        src={behaviorAbcImg}
                        alt="ABC Tracking Character Group"
                        className="w-full h-full object-contain pointer-events-none select-none"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                        Use ABC Tracking
                      </h3>
                      <p className="text-xs text-grey-500 leading-relaxed mt-1.5">
                        Record what happened before, what the client did and what happened afterward.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBehaviorMethod('abc');
                        setStep('calendar');
                        toast.success('ABC Tracking Configured', 'Moving to calendar setup.');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Set up ABC Tracking
                    </button>
                  </div>
                </div>

                {/* Card 2: Build Your Measurements */}
                <div
                  onClick={() => setBehaviorMethod('custom')}
                  className={cn(
                    'p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group overflow-hidden bg-white shadow-xs',
                    behaviorMethod === 'custom'
                      ? 'border-[#2ee05a] ring-2 ring-[#2ee05a]/25 shadow-sm'
                      : 'border-grey-200 hover:border-grey-300'
                  )}
                >
                  <div className="space-y-4">
                    {/* Illustration Container */}
                    <div className="w-full h-44 sm:h-48 rounded-2xl bg-[#FAFAFC] border border-grey-100/90 overflow-hidden flex items-center justify-center p-3 transition-transform group-hover:scale-[1.01]">
                      <img
                        src={behaviorCustomImg}
                        alt="Custom Build Characters"
                        className="w-full h-full object-contain pointer-events-none select-none"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-grey-900 tracking-tight">
                        Build Your Measurements
                      </h3>
                      <p className="text-xs text-grey-500 leading-relaxed mt-1.5">
                        Set severity levels, frequency counts, duration and incident recording.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBehaviorMethod('custom');
                        setStep('calendar');
                        toast.success('Custom Measurements Configured', 'Moving to calendar setup.');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Build Your Measurements
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions matching media_1793886090218_4fbc4601.png */}
            <div className="mt-8 pt-4 flex items-center justify-between border-t border-grey-100">
              <button
                type="button"
                onClick={() => setStep('tasks')}
                className="px-4 py-2 rounded-xl border border-grey-200 bg-white hover:bg-grey-50 text-xs font-semibold text-grey-700 transition-colors cursor-pointer"
              >
                Back to setup
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('calendar');
                  toast.info('Skipped Behavior Setup', 'Moved to calendar setup.');
                }}
                className="px-4 py-2 rounded-xl border border-grey-200 bg-white hover:bg-grey-50 text-xs font-semibold text-grey-700 transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>

          {/* Right Side: Informational Context Panel (Matching media_1793886090218_4fbc4601.png) */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#FCECE7] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden border-l border-orange-100">
            {/* Soft decorative background wavy ribbon */}
            <div className="absolute -top-6 -right-6 w-56 h-56 pointer-events-none opacity-25 select-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#E7A68D]">
                <path
                  d="M20,20 C80,80 140,20 180,80 C220,140 160,200 100,180"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <div className="space-y-6 z-10">
              {/* Page Numbering Atop Explanation Segment */}
              {renderStepProgressPills(4)}

              <div className="p-6 rounded-3xl bg-white shadow-2xs border border-white/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-grey-900">
                    What is behavior measurement?
                  </h4>
                  <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700">
                    <Folder className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-grey-600 leading-relaxed">
                  Measurement settings define how staff record observations. Choose one tracking method for this configuration. Both methods use each client's assigned ISP Objectives
                </p>
              </div>
            </div>

            <div className="pt-8 text-xs text-emerald-800 italic text-right z-10 font-medium">
              Your choice carries into staff Daily Notes.
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 6: STEP 5 OF 6 - CALENDAR SETUP WITH ALL 8 TOGGLE FORMS & FULL 30 DAYS
          (Matches media_1793813970862_b9f15d5e.png & media_1793812396350_09b3df34.jpg)
      ==================================================================== */}
      {step === 'calendar' && (
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {/* Top Title Bar with Page Numbering on Right */}
          <div className="p-6 sm:p-8 lg:px-12 border-b border-grey-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-30 shadow-2xs">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => setStep('behavior')}
                className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5 shadow-2xs"
                title="Back to behavior setup"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                  Set up your program calendar
                </h1>
                <p className="text-xs sm:text-sm text-grey-500">
                  Choose what appears on your calendar. Common fields are already turned on for you.
                </p>
              </div>
            </div>

            {/* Step Progress Numbering Atop Calendar View */}
            <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isCurrent = 5 === num;
                const isPast = 5 > num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      const stepMap: Record<number, CurriculumStep> = {
                        1: 'objectives',
                        2: 'trainings',
                        3: 'tasks',
                        4: 'behavior',
                        5: 'calendar',
                        6: 'daily-note',
                      };
                      if (stepMap[num]) setStep(stepMap[num]);
                    }}
                    className={cn(
                      'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer',
                      isCurrent
                        ? 'bg-[#0A0A0A] text-white shadow-xs ring-2 ring-black/15 scale-105'
                        : isPast
                        ? 'bg-grey-200 text-grey-800 hover:bg-grey-300'
                        : 'bg-grey-100 text-grey-400 hover:bg-grey-200'
                    )}
                    title={`Go to Step ${num}`}
                  >
                    {num}
                  </button>
                );
              })}
              <span className="text-[11px] font-bold text-grey-600 uppercase tracking-wider ml-2">
                Step 5 of 6
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row items-stretch pb-24 min-h-0">
            {/* ========================================================
                LEFT COLUMN: FORMS WHERE YOU TOGGLE AND UNTOGGLE STUFFS
                (Captures all 8 toggles from media_1793813970862_b9f15d5e.png)
            ======================================================== */}
            <div className="w-full lg:w-[410px] xl:w-[440px] p-5 sm:p-6 lg:p-7 border-r border-grey-200/80 bg-white flex flex-col justify-start shrink-0 overflow-y-auto space-y-5 select-none">
              <div className="space-y-4">
                {/* Calendar Type Meta Card */}
                <div className="p-4 rounded-2xl bg-grey-50 border border-grey-200/80 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-grey-500">
                    Calendar type
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-grey-400 block text-[10px]">Program hours</span>
                      <span className="font-bold text-grey-900">Regular Program Hours</span>
                    </div>
                    <div>
                      <span className="text-grey-400 block text-[10px]">Tracking method</span>
                      <span className="font-bold text-grey-900">Behavioral</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-grey-400 pt-1 border-t border-grey-200/60">
                    Set when the service line was created. Change it in the service line's settings.
                  </p>
                </div>

                {/* Character Banner Card */}
                <div className="p-4 rounded-2xl bg-[#EDE9FE] flex items-center gap-3 border border-purple-200/60 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center shrink-0 shadow-2xs">
                    <img
                      src="/illustrations/card-behavior.png"
                      alt="Your calendar, your way"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-purple-950">Your calendar, your way</h4>
                    <p className="text-[10px] text-purple-800/80">Configured to match direct care shift notes</p>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    THE 8 FIELD TOGGLE CARDS (Matches Screenshot 100%)
                ---------------------------------------------------- */}
                <div className="space-y-3 pt-1">
                  {/* 1. Training Component (Recommended) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Training Component</div>
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">Recommended</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            trainingComponent: !prev.trainingComponent,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.trainingComponent ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle Training Component"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the training area selected from Service Line Setup.
                    </p>
                  </div>

                  {/* 2. Activity (Required, Locked) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Activity</div>
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">Required</div>
                      </div>
                      <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 cursor-not-allowed opacity-90 shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </div>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the planned activity selected from Service Line Setup.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-grey-400 pt-0.5">
                      <Lock className="w-3 h-3 text-grey-400" />
                      <span>Always on for the calendar</span>
                    </div>
                  </div>

                  {/* 3. Task (Optional) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Task</div>
                        <div className="text-[11px] font-medium text-grey-500 mt-0.5">Optional</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            task: !prev.task,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.task ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle Task"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows a specific task connected to the planned activity, when used.
                    </p>
                  </div>

                  {/* 4. Duration (Optional) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Duration</div>
                        <div className="text-[11px] font-medium text-grey-500 mt-0.5">Optional</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            duration: !prev.duration,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.duration ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle Duration"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the planned activity length on the calendar. Optional for Regular Hours; required for Approved Hours.
                    </p>
                  </div>

                  {/* 5. Assigned Staff (Recommended) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Assigned Staff</div>
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">Recommended</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            assignedStaff: !prev.assignedStaff,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.assignedStaff ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle Assigned Staff"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the employee assigned to the calendar activity.
                    </p>
                  </div>

                  {/* 6. Activity Address (Recommended) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Activity Address</div>
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">Recommended</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            activityAddress: !prev.activityAddress,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.activityAddress ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle Activity Address"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the activity location entered when staff create the monthly calendar entry.
                    </p>
                  </div>

                  {/* 7. Date (Required, Locked) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">Date</div>
                        <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">Required</div>
                      </div>
                      <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 cursor-not-allowed opacity-90 shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </div>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Shows the date of each scheduled activity.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-grey-400 pt-0.5">
                      <Lock className="w-3 h-3 text-grey-400" />
                      <span>Always on for the calendar</span>
                    </div>
                  </div>

                  {/* 8. ISP Objective / Assigned Behaviors (Optional) */}
                  <div className="p-3.5 rounded-2xl border border-grey-200 bg-white space-y-1.5 shadow-2xs hover:border-grey-300 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-grey-900">
                          ISP Objective / Assigned Behaviors
                        </div>
                        <div className="text-[11px] font-medium text-grey-500 mt-0.5">Optional</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarToggles((prev) => ({
                            ...prev,
                            ispObjective: !prev.ispObjective,
                          }))
                        }
                        className={cn(
                          'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0 mt-0.5',
                          calendarToggles.ispObjective ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                        )}
                        title="Toggle ISP Objectives"
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                    <p className="text-[11px] text-grey-500 leading-relaxed">
                      Choose whether assigned ISP objectives or behaviors appear on the monthly calendar. Behavioral calendars can hide this field.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Skip Link */}
              <div className="pt-6 border-t border-grey-100">
                <button
                  type="button"
                  onClick={() => {
                    setStep('daily-note');
                    toast.info('Skipped Calendar', 'Moved to daily note setup.');
                  }}
                  className="hover:text-grey-900 underline text-xs font-medium text-grey-500 transition-colors cursor-pointer"
                >
                  Skip for now
                </button>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: COMPLETE 30-DAY CALENDAR GRID PREVIEW
                (Full November 2026 month with all 30 days rendered)
            ======================================================== */}
            <div className="flex-1 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-[#F8F9FA] overflow-y-auto overflow-x-auto min-w-0">
              <div className="space-y-4 min-w-[740px] xl:min-w-0">
                {/* Header row above calendar board */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-grey-900">Calendar preview</h3>
                    <p className="text-xs text-grey-500 mt-0.5">
                      Each weekday shows a sample activity with the fields that are on. Nothing is saved until you continue.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                      All 30 Days Visible
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-grey-100 text-grey-700">
                      {[
                        calendarToggles.date,
                        calendarToggles.activity,
                        calendarToggles.trainingComponent,
                        calendarToggles.ispObjective,
                        calendarToggles.task,
                        calendarToggles.duration,
                        calendarToggles.assignedStaff,
                        calendarToggles.activityAddress,
                      ].filter(Boolean).length}{' '}
                      fields active
                    </span>
                  </div>
                </div>

                {/* Calendar Board Shell */}
                <div className="bg-white rounded-3xl border border-grey-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                  {/* Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-grey-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans font-bold text-lg text-grey-900">{program.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Residential
                        </span>
                      </div>
                      <p className="text-xs text-grey-500 mt-0.5">
                        Oak City Campus · Rm - Home home · Regular program schedule - Behavioral
                      </p>
                    </div>

                    <div className="text-xs sm:text-right">
                      <div className="font-bold text-grey-900">Sample client: Joe Doe</div>
                      <div className="text-grey-400 font-mono text-[11px]">UCI number: 1234567</div>
                      <div className="text-[10px] text-grey-400 mt-0.5">Activity calendar · Sample details</div>
                    </div>
                  </div>

                  {/* Month Banner */}
                  <div className="flex items-center justify-between text-xs font-bold text-grey-800 pt-1">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-sans font-bold">November 2026</span>
                    </div>
                    <span className="text-[11px] text-grey-400 font-normal">
                      Full month view (Days 1 – 30)
                    </span>
                  </div>

                  {/* ========================================================
                      FULL MONTH 7-COLUMN GRID (NOVEMBER 2026: 30 DAYS)
                      Nov 1, 2026 was Sunday -> Day 1 is 7th cell of row 1.
                  ======================================================== */}
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs">
                    {/* Weekday Column Headers */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div
                        key={day}
                        className={cn(
                          'font-bold py-1.5 uppercase text-[10px] tracking-wider rounded-lg',
                          day === 'Sat' || day === 'Sun'
                            ? 'text-grey-400 bg-grey-50/60'
                            : 'text-grey-700 bg-grey-100/70'
                        )}
                      >
                        {day}
                      </div>
                    ))}

                    {/* ROW 1: Oct 26 - Oct 31 (6 empty days) + Nov 1 (Sunday) */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`empty-prev-${i}`}
                        className="min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border border-grey-100/70 bg-grey-50/30 text-grey-300 text-left"
                      />
                    ))}

                    {/* Day 1: Sunday */}
                    <div className="min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border border-grey-200/80 bg-grey-50/40 text-left flex flex-col justify-between">
                      {calendarToggles.date && (
                        <span className="font-bold text-xs text-grey-600">1</span>
                      )}
                      <span className="text-[10px] text-grey-400 italic">Weekend</span>
                    </div>

                    {/* ROWS 2 to 5: Days 2 to 29 */}
                    {NOVEMBER_30_DAYS.slice(1, 29).map((item) => (
                      <div
                        key={item.day}
                        className={cn(
                          'min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border text-left flex flex-col justify-between transition-all',
                          item.isWeekend
                            ? 'bg-grey-50/40 border-grey-100 text-grey-400'
                            : 'bg-white border-grey-200 shadow-2xs hover:border-grey-300 hover:shadow-xs'
                        )}
                      >
                        {calendarToggles.date && (
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-grey-800">{item.day}</span>
                            {calendarToggles.duration && item.duration && (
                              <span className="text-[9px] font-semibold text-purple-700 bg-purple-50 px-1 rounded flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{item.duration}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {item.isWeekend ? (
                          <span className="text-[10px] text-grey-400 italic">Weekend</span>
                        ) : (
                          <div className="text-[10px] leading-tight space-y-1 pt-0.5">
                            {/* Training Component */}
                            {calendarToggles.trainingComponent && item.comp && (
                              <div className="text-emerald-800 bg-emerald-50/90 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-emerald-100 truncate">
                                Training Component: {item.comp}
                              </div>
                            )}

                            {/* Activity Title (Always required) */}
                            {calendarToggles.activity && item.title && (
                              <div className="font-bold text-grey-900 truncate text-[11px] leading-snug">
                                {item.title}
                              </div>
                            )}

                            {/* Task */}
                            {calendarToggles.task && item.task && (
                              <div className="text-indigo-700 bg-indigo-50/80 px-1.5 py-0.5 rounded text-[9px] font-medium border border-indigo-100 truncate">
                                Task: {item.task}
                              </div>
                            )}

                            {/* ISP Objective */}
                            {calendarToggles.ispObjective && item.objective && (
                              <div className="text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded text-[9px] font-medium border border-amber-100 truncate">
                                ISP: {item.objective}
                              </div>
                            )}

                            {/* Assigned Staff */}
                            {calendarToggles.assignedStaff && item.staff && (
                              <div className="text-grey-600 text-[9px] truncate flex items-center gap-1">
                                <User className="w-2.5 h-2.5 text-grey-400 shrink-0" />
                                <span>Assigned Staff: {item.staff}</span>
                              </div>
                            )}

                            {/* Activity Address */}
                            {calendarToggles.activityAddress && item.loc && (
                              <div className="text-grey-400 text-[9px] truncate flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-grey-400 shrink-0" />
                                <span>Activity Address: {item.loc}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* ROW 6: Day 30 (Monday) + Dec 1 - Dec 6 (6 empty days) */}
                    {(() => {
                      const day30 = NOVEMBER_30_DAYS[29]; // Day 30
                      return (
                        <div
                          key={day30.day}
                          className="min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border border-grey-200 bg-white shadow-2xs hover:border-grey-300 text-left flex flex-col justify-between transition-all"
                        >
                          {calendarToggles.date && (
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-grey-800">{day30.day}</span>
                              {calendarToggles.duration && day30.duration && (
                                <span className="text-[9px] font-semibold text-purple-700 bg-purple-50 px-1 rounded flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>{day30.duration}</span>
                                </span>
                              )}
                            </div>
                          )}

                          <div className="text-[10px] leading-tight space-y-1 pt-0.5">
                            {calendarToggles.trainingComponent && day30.comp && (
                              <div className="text-emerald-800 bg-emerald-50/90 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-emerald-100 truncate">
                                Training Component: {day30.comp}
                              </div>
                            )}

                            {calendarToggles.activity && day30.title && (
                              <div className="font-bold text-grey-900 truncate text-[11px] leading-snug">
                                {day30.title}
                              </div>
                            )}

                            {calendarToggles.task && day30.task && (
                              <div className="text-indigo-700 bg-indigo-50/80 px-1.5 py-0.5 rounded text-[9px] font-medium border border-indigo-100 truncate">
                                Task: {day30.task}
                              </div>
                            )}

                            {calendarToggles.ispObjective && day30.objective && (
                              <div className="text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded text-[9px] font-medium border border-amber-100 truncate">
                                ISP: {day30.objective}
                              </div>
                            )}

                            {calendarToggles.assignedStaff && day30.staff && (
                              <div className="text-grey-600 text-[9px] truncate flex items-center gap-1">
                                <User className="w-2.5 h-2.5 text-grey-400 shrink-0" />
                                <span>Assigned Staff: {day30.staff}</span>
                              </div>
                            )}

                            {calendarToggles.activityAddress && day30.loc && (
                              <div className="text-grey-400 text-[9px] truncate flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-grey-400 shrink-0" />
                                <span>Activity Address: {day30.loc}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Trailing empty cells (Dec 1 - Dec 6) */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`empty-next-${i}`}
                        className="min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border border-grey-100/70 bg-grey-50/30 text-grey-300 text-left"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Right Action Button */}
              <div className="flex items-center justify-end pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep('daily-note');
                    toast.success('Calendar Settings Saved', 'Proceeding to daily note configuration.');
                  }}
                  className="px-8 py-3 rounded-2xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>Save and continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SCREEN 7: STEP 6 OF 6 - DAILY NOTES WITH RESPONSIVE SECTIONED PHONE PREVIEW
          (Exact Match to media_1793886282923_c7b77254.png)
      ==================================================================== */}
      {step === 'daily-note' && (
        <div className="flex-1 flex flex-col min-h-screen bg-white">
          {/* Top Title Bar */}
          <div className="p-6 sm:p-8 lg:px-12 border-b border-grey-100 flex items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('calendar')}
                className="w-9 h-9 rounded-full bg-grey-100 hover:bg-grey-200 text-grey-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
                title="Back to calendar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-grey-900 tracking-tight">
                Daily notes
              </h1>
            </div>

            {/* Step Progress Numbering */}
            {renderStepProgressPills(6)}
          </div>

          <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0">
            {/* ========================================================
                LEFT COLUMN: 4 HORIZONTAL PILL TABS & CONFIGURATION FORM
                (Exact Match to media_1793886282923_c7b77254.png)
            ======================================================== */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between max-w-3xl overflow-y-auto">
              <div className="space-y-6">
                {/* 4 Horizontal Pill Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-2">
                  {[
                    { id: 1, title: 'Client Information & Attendance' },
                    { id: 2, title: 'Provider Questions' },
                    { id: 3, title: 'Activity & Progress' },
                    { id: 4, title: 'Daily Note' },
                  ].map((s) => {
                    const isActive = activeNoteSection === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveNoteSection(s.id as 1 | 2 | 3 | 4)}
                        className={cn(
                          'px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer',
                          isActive
                            ? 'bg-[#0A0A0A] text-white shadow-xs'
                            : 'text-grey-600 hover:text-grey-900 hover:bg-grey-100'
                        )}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>

                {/* Section 1 Content: Client information & attendance */}
                {activeNoteSection === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div>
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight">
                        Client information & attendance
                      </h2>
                      <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                        Set what staff see before documenting the day. These shared settings apply to either tracking method.
                      </p>
                    </div>

                    {/* Section 1 Card */}
                    <div className="bg-white rounded-3xl border border-grey-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
                      {/* Show UCI number Toggle */}
                      <div className="flex items-center justify-between pb-4 border-b border-grey-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-grey-900">Show UCI number</span>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>On</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-grey-500 mt-0.5">
                            Include the client's UCI number in Daily Notes.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowUci(!showUci)}
                          className={cn(
                            'w-10 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer shrink-0',
                            showUci ? 'bg-[#2ee05a] justify-end' : 'bg-grey-300 justify-start'
                          )}
                          title="Toggle UCI Number"
                        >
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </button>
                      </div>

                      {/* Field Inputs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium text-grey-600">Client</label>
                          <div className="px-3.5 py-2.5 rounded-xl border border-grey-200 bg-grey-50/50 text-xs text-grey-800 font-semibold">
                            Joe Doe
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium text-grey-600">Date</label>
                          <div className="px-3.5 py-2.5 rounded-xl border border-grey-200 bg-grey-50/50 text-xs text-grey-800 font-semibold">
                            October 5, 2026
                          </div>
                        </div>

                        {showUci && (
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-medium text-grey-600">UCI number</label>
                            <div className="px-3.5 py-2.5 rounded-xl border border-grey-200 bg-grey-50/50 text-xs text-grey-800 font-mono">
                              1234567
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium text-grey-600">Assigned Staff</label>
                          <div className="px-3.5 py-2.5 rounded-xl border border-grey-200 bg-grey-50/50 text-xs text-grey-800 font-semibold">
                            Reuben Stewart
                          </div>
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-[11px] font-medium text-grey-600">
                            Scheduled hours · From calendar
                          </label>
                          <div className="px-3.5 py-2.5 rounded-xl border border-grey-200 bg-grey-50/50 text-xs text-grey-800 font-semibold">
                            3 hours · 9:00 AM–12:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2 Content: Provider Questions */}
                {activeNoteSection === 2 && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div>
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight">
                        Provider questions
                      </h2>
                      <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                        Set what staff are asked after direct support or activities.
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-grey-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                      {/* Question 1 */}
                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Did the client participate?</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Required check for every shift note.</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          Active · Required
                        </div>
                      </div>

                      {/* Question 2 */}
                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Were scheduled training activities completed?</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Verifies program activity alignment.</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          Active · Required
                        </div>
                      </div>

                      {/* Question 3 */}
                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Were any behavioral redirections required?</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Triggers behavioral incident logging when marked yes.</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 text-[10px] font-bold border border-purple-200">
                          Behavioral Setting
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3 Content: Activity & Progress */}
                {activeNoteSection === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div>
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight">
                        Activity & progress
                      </h2>
                      <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                        Configure parameters for tracking client goals, tasks, and behavior incident logging.
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-grey-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Track ISP Objectives during activities</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Direct care staff rate target outcomes for each active goal.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Log Staff Prompt Level</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Verbal, Visual, Gestural, Physical, Independent.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Engagement & Mood Rating</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Star score from 1 to 5 for overall session engagement.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 4 Content: Daily Note Summary */}
                {activeNoteSection === 4 && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div>
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 tracking-tight">
                        Daily note summary
                      </h2>
                      <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                        Staff shift wrap-up notes, verification checklist, and signature requirements.
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-grey-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Require staff electronic signature</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Auditable digital stamp with staff timestamp.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Automated shift time & location stamp</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Records GPS or center coordinate for EVV compliance.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-grey-100 bg-grey-50/40 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-grey-900">Allow voice-to-text dictation</div>
                          <p className="text-[11px] text-grey-500 mt-0.5">Enables mobile microphone dictation for fast notes.</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#2ee05a] flex items-center justify-end px-0.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions matching media_1793886282923_c7b77254.png */}
              <div className="pt-8 border-t border-grey-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (activeNoteSection > 1) {
                      setActiveNoteSection((s) => (s - 1) as 1 | 2 | 3 | 4);
                    } else {
                      setStep('calendar');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl border border-grey-200 bg-white hover:bg-grey-50 text-xs font-semibold text-grey-800 transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeNoteSection < 4) {
                      setActiveNoteSection((s) => (s + 1) as 1 | 2 | 3 | 4);
                      toast.info(`Moved to Section ${activeNoteSection + 1}`);
                    } else {
                      onObjectivesConfigured();
                      toast.success('Curriculum Setup Completed!', `${program.name} is now fully configured and ready.`);
                    }
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>
                    {activeNoteSection === 1 && 'Continue to Provider Questions'}
                    {activeNoteSection === 2 && 'Continue to Activity & Progress'}
                    {activeNoteSection === 3 && 'Continue to Daily Note'}
                    {activeNoteSection === 4 && 'Proceed'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: SUPPORTING GREY PREVIEW AREA WITH PHONE MOCKUP
                (Exact Match to media_1793886282923_c7b77254.png)
            ======================================================== */}
            <div className="w-full lg:w-[390px] xl:w-[430px] bg-[#EEF0F3] p-5 lg:p-7 border-l border-grey-200/90 flex flex-col justify-start shrink-0 select-none">
              <div className="space-y-3.5 max-w-[320px] mx-auto w-full">
                {/* Header above phone */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-grey-900">Staff phone preview</h3>
                    <p className="text-[11px] text-grey-500 mt-0.5">
                      Sample preview — no client records changed
                    </p>
                  </div>

                  {/* Absence Example Toggle Tag */}
                  <button
                    type="button"
                    onClick={() => setPhoneAttendance((curr) => (curr === 'Present' ? 'Absent' : 'Present'))}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border',
                      phoneAttendance === 'Absent'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                        : 'bg-white text-grey-600 border-grey-200 hover:bg-grey-50'
                    )}
                    title="Toggle Absence Example"
                  >
                    Absence example {phoneAttendance === 'Absent' ? '✓' : ''}
                  </button>
                </div>

                {/* Hyper-Realistic Smartphone Chassis that fits completely in view */}
                <div className="w-full bg-[#1C1C1E] rounded-[42px] p-2.5 shadow-2xl border-4 border-grey-900 ring-1 ring-black/20 relative select-none">
                  {/* Dynamic Island Pill */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-18 h-3.5 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/80 border border-indigo-900" />
                  </div>

                  {/* Inside Screen Canvas (Displays ONLY questions for the active section) */}
                  <div className="w-full bg-white rounded-[34px] overflow-hidden pt-6 pb-3 px-3.5 max-h-[510px] overflow-y-auto space-y-2.5 text-left text-xs font-sans">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between text-[10px] font-bold text-grey-900 px-1 pt-0.5">
                      <span>9:41</span>
                      <div className="flex items-center gap-1 text-grey-700">
                        <span className="text-[8px] font-bold">5G</span>
                        <div className="w-3.5 h-2 rounded-xs border border-grey-800 flex items-center p-0.5">
                          <div className="w-full h-full bg-grey-900 rounded-2xs" />
                        </div>
                      </div>
                    </div>

                    {/* App Header Inside Phone */}
                    <div className="pt-1 border-b border-grey-100 pb-1.5">
                      <div className="font-bold text-sm text-grey-900 leading-tight">Daily Note</div>
                      <div className="text-[10px] text-grey-500">Joe Doe · October 5, 2026</div>
                    </div>

                    {/* Active Section Pill Tag */}
                    <div className="pt-0.5">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold uppercase tracking-wider border border-emerald-200">
                        {activeNoteSection === 1 && 'Client Information & Attendance'}
                        {activeNoteSection === 2 && 'Provider Questions'}
                        {activeNoteSection === 3 && 'Activity & Progress'}
                        {activeNoteSection === 4 && 'Daily Note'}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-grey-900 pt-0.5">
                      {activeNoteSection === 1 && 'Client Information & Attendance'}
                      {activeNoteSection === 2 && 'Provider Questions'}
                      {activeNoteSection === 3 && 'Activity & Progress'}
                      {activeNoteSection === 4 && 'Daily Note'}
                    </div>

                    {/* ===================================================
                        ONLY SHOW ACTIVE SECTION QUESTIONS / FIELDS
                    =================================================== */}

                    {/* SECTION 1: Client Info & Attendance */}
                    {activeNoteSection === 1 && (
                      <div className="space-y-2 animate-in fade-in duration-150">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <span className="text-grey-500 block text-[9px]">Client</span>
                            <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-white text-[11px] font-medium text-grey-900">
                              Joe Doe
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-grey-500 block text-[9px]">Date</span>
                            <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-white text-[11px] font-medium text-grey-900">
                              October 5, 2026
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {showUci && (
                            <div className="space-y-1">
                              <span className="text-grey-500 block text-[9px]">UCI number</span>
                              <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-white text-[11px] font-mono text-grey-900">
                                1234567
                              </div>
                            </div>
                          )}
                          <div className={cn('space-y-1', !showUci && 'col-span-2')}>
                            <span className="text-grey-500 block text-[9px]">Assigned Staff</span>
                            <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-white text-[11px] font-medium text-grey-900">
                              Reuben Stewart
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-500 block text-[9px]">Scheduled hours · From calendar</span>
                          <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-white text-[11px] font-medium text-grey-900">
                            3 hours · 9AM–12PM
                          </div>
                        </div>

                        <div className="space-y-1 pt-0.5">
                          <span className="text-grey-700 block text-[10px] font-semibold">Attendance *</span>
                          <select
                            value={phoneAttendance}
                            onChange={(e) => setPhoneAttendance(e.target.value as 'Present' | 'Absent')}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </div>

                        {phoneAttendance === 'Absent' && (
                          <div className="space-y-2 pt-0.5 animate-in fade-in duration-150">
                            <div className="space-y-1">
                              <span className="text-grey-700 block text-[10px] font-semibold">Absence reason *</span>
                              <select
                                value={phoneAbsenceReason}
                                onChange={(e) => setPhoneAbsenceReason(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                              >
                                <option value="Illness">Illness</option>
                                <option value="Medical Appointment">Medical Appointment</option>
                                <option value="Family Leave">Family Leave</option>
                                <option value="Transportation Delay">Transportation Delay</option>
                              </select>
                            </div>

                            {/* Green Notification Callout matching screenshot */}
                            <div className="p-2.5 rounded-xl bg-[#E8F8E5] border border-[#C5EEC0] text-[10px] text-[#22681E] font-medium leading-relaxed">
                              Only the absence reason is recorded.
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* SECTION 2: Provider Questions */}
                    {activeNoteSection === 2 && (
                      <div className="space-y-3 animate-in fade-in duration-150">
                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Did the client participate? *
                          </span>
                          <select
                            value={phoneParticipated}
                            onChange={(e) => setPhoneParticipated(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Were scheduled activities completed? *
                          </span>
                          <select
                            value={phoneGoalsMet}
                            onChange={(e) => setPhoneGoalsMet(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Yes">Yes</option>
                            <option value="Partial">Partial</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Any behavioral redirections required?
                          </span>
                          <select
                            defaultValue="No"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="No">No</option>
                            <option value="Yes - Logged">Yes - Logged</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: Activity & Progress */}
                    {activeNoteSection === 3 && (
                      <div className="space-y-3 animate-in fade-in duration-150">
                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Did the client follow the calendar?
                          </span>
                          <select
                            defaultValue="Yes"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            ISP Objective: Independent Daily Living
                          </span>
                          <div className="px-2.5 py-1.5 rounded-lg border border-grey-200 bg-grey-50 text-[10px] text-grey-800 font-semibold flex items-center justify-between">
                            <span>Goal progress</span>
                            <span className="text-emerald-700 font-bold">On Track (85%)</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Staff prompt level required
                          </span>
                          <select
                            value={phonePromptLevel}
                            onChange={(e) => setPhonePromptLevel(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-grey-300 bg-white text-xs font-semibold text-grey-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Verbal">Verbal prompt</option>
                            <option value="Visual">Visual cue</option>
                            <option value="Gestural">Gestural</option>
                            <option value="Independent">Independent</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* SECTION 4: Daily Note */}
                    {activeNoteSection === 4 && (
                      <div className="space-y-3 animate-in fade-in duration-150">
                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Daily Summary Note *
                          </span>
                          <textarea
                            rows={3}
                            defaultValue="Client participated enthusiastically in morning meal prep and afternoon art workshop. Demonstrated active self-care skills."
                            className="w-full p-2.5 rounded-xl border border-grey-300 bg-grey-50 text-[10px] text-grey-900 focus:outline-none resize-none leading-relaxed"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-grey-700 block text-[11px] font-medium">
                            Staff Electronic Signature *
                          </span>
                          <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                            <div>
                              <div className="text-[11px] font-bold text-emerald-950 font-sans italic tracking-wide">
                                Reuben Stewart
                              </div>
                              <div className="text-[9px] text-emerald-800">
                                Verified Oct 5, 2026 · 12:02 PM
                              </div>
                            </div>
                            <Check className="w-4 h-4 text-emerald-700" />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="w-full py-2 rounded-xl bg-[#0A0A0A] text-white font-bold text-[11px] mt-1 shadow-xs"
                        >
                          Submit Daily Note
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          POPUP 1: YOUR TEMPLATE DOWNLOADING!
      ==================================================================== */}
      {downloadModal === 'downloading' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border border-grey-100 flex flex-col items-center select-none animate-in zoom-in-95 duration-200">
            <div className="mb-3">
              <GreenBagMascot variant="winking" size={88} />
            </div>

            <h3 className="font-sans font-bold text-2xl text-grey-900 tracking-tight">
              Your template<br />downloading!
            </h3>

            <p className="text-xs text-grey-500 mt-2 leading-relaxed px-2">
              Open the template in the top right corner of your browser. Fill in your {step} and description.
            </p>

            <div className="w-full bg-grey-50 rounded-2xl p-3 border border-grey-100 mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs text-grey-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-[11px] truncate">
                    Organizing your program records...
                  </span>
                </div>
                <span className="font-bold text-[11px] tabular-nums text-grey-800">
                  {downloadProgress}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-grey-200 overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-150"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          POPUP 2: YOUR TEMPLATE READY TO BE EDITED!
      ==================================================================== */}
      {downloadModal === 'downloaded' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border border-grey-100 flex flex-col items-center select-none animate-in zoom-in-95 duration-200">
            <div className="mb-3">
              <GreenBagMascot variant="celebrating" size={88} />
            </div>

            <h3 className="font-sans font-bold text-2xl text-grey-900 tracking-tight">
              Your template<br />ready to be edited!
            </h3>

            <p className="text-xs text-grey-500 mt-2 leading-relaxed px-2">
              Open the template in the top right corner of your browser. Fill in your {step} and description.
            </p>

            <button
              type="button"
              onClick={() => {
                setDownloadModal('none');
                toast.success('Template Downloaded', `Check your browser downloads for the ${program.name} template.`);
              }}
              className="w-full py-3.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98 cursor-pointer mt-6"
            >
              Okay
            </button>

            <div className="w-full bg-[#FDF2F2] border border-[#FECACA] rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-[#DC2626] font-medium mt-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
              <span className="text-[11px] sm:text-xs">Do not change the title of the columns.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
