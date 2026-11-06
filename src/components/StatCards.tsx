import React, { useState, type ComponentType } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

export type IconComponent = ComponentType<{
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

export type StatCardsVariant = 'plain' | 'footer';

/** Tint of the footer variant's gradient icon tile. */
export type StatTone = 'blue' | 'orange' | 'purple' | 'pink' | 'sky' | 'emerald' | 'amber';

export type Stat = {
  icon: IconComponent;
  label: string;
  value: string;
  delta?: string;
  deltaColor?: 'lime' | 'rose' | 'neutral' | 'amber';
  /** Footer variant: icon tile tint (defaults to blue). */
  tone?: StatTone;
  /** Footer variant: comparison caption in the band ("From last month", "3 on shift", etc.). */
  caption?: string;
  /** Footer variant: shows an info glyph with tooltip on hover/click. */
  hint?: string;
  /** Optional click callback for entire card */
  onClick?: () => void;
};

/** Gradient stops for the footer variant's icon tile, keyed by tone. */
export const TILE_TONES: Record<StatTone, string> = {
  emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
  blue: 'from-blue-500 to-blue-600 shadow-blue-500/20',
  purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
  orange: 'from-orange-400 to-orange-500 shadow-orange-500/20',
  pink: 'from-pink-500 to-pink-600 shadow-pink-500/20',
  sky: 'from-sky-400 to-sky-500 shadow-sky-500/20',
  amber: 'from-amber-400 to-amber-500 shadow-amber-500/20',
};

const DELTA_STYLES: Record<
  NonNullable<Stat['deltaColor']>,
  { icon: IconComponent; className: string; pill: string }
> = {
  lime: {
    icon: TrendingUp,
    className: 'text-emerald-700',
    pill: 'bg-emerald-50/90 border border-emerald-200/70',
  },
  rose: {
    icon: TrendingDown,
    className: 'text-rose-700',
    pill: 'bg-rose-50/90 border border-rose-200/70',
  },
  neutral: {
    icon: Minus,
    className: 'text-grey-600',
    pill: 'bg-grey-100 border border-grey-200/70',
  },
  amber: {
    icon: TrendingUp,
    className: 'text-amber-700',
    pill: 'bg-amber-50/90 border border-amber-200/70',
  },
};

/** Tinted pill with direction glyph — footer band's delta readout */
export function DeltaPill({
  delta,
  deltaColor = 'lime',
}: {
  delta?: string;
  deltaColor?: Stat['deltaColor'];
}) {
  if (!delta) return null;
  const style = DELTA_STYLES[deltaColor || 'lime'];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'flex shrink-0 items-center gap-1 rounded-full py-0.5 pe-2 ps-1.5 text-[11px] font-semibold tabular-nums shadow-2xs',
        style.pill
      )}
    >
      <Icon className={cn('w-3.5 h-3.5 shrink-0', style.className)} aria-hidden />
      <span className={cn('whitespace-nowrap', style.className)}>
        {delta}
      </span>
    </span>
  );
}

/** Bare info glyph with tooltip on hover/click */
export function StatHint({ label, hint }: { label: string; hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={`About ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex shrink-0 cursor-pointer items-center justify-center rounded-full text-grey-400 outline-none transition-colors duration-150 hover:text-grey-700 focus-visible:ring-2 focus-visible:ring-brand-400 p-0.5"
      >
        <Info className="w-4 h-4" aria-hidden />
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute right-0 top-6 z-50 w-52 rounded-xl bg-grey-900 p-2.5 text-xs text-white shadow-xl animate-in fade-in zoom-in-95 pointer-events-none"
        >
          <div className="font-semibold text-white/90 pb-0.5">{label}</div>
          <div className="text-[11px] text-grey-200 leading-relaxed font-normal">{hint}</div>
        </div>
      )}
    </div>
  );
}

export function PlainStatCard({ stat }: { stat: Stat }) {
  const deltaColor = stat.deltaColor || 'lime';
  const deltaStyle = DELTA_STYLES[deltaColor];

  return (
    <section
      onClick={stat.onClick}
      className={cn(
        'flex h-[132px] min-w-0 flex-col items-start justify-between rounded-2xl bg-white p-4 border border-border/80 shadow-xs transition-all duration-200',
        stat.onClick && 'cursor-pointer hover:border-brand-400/80 hover:shadow-card active:scale-[0.99] group'
      )}
    >
      <span className="flex items-center rounded-lg bg-grey-50 p-2 border border-border/60 text-grey-700 group-hover:scale-105 transition-transform">
        <stat.icon className="w-5 h-5 shrink-0 text-grey-900" aria-hidden />
      </span>
      <div className="flex w-full flex-col gap-0.5">
        <p className="w-full text-xs font-medium text-grey-500 truncate">{stat.label}</p>
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-grey-900 tabular-nums">
            {stat.value}
          </p>
          {stat.delta && (
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums inline-flex items-center gap-1',
                deltaStyle.pill,
                deltaStyle.className
              )}
            >
              {stat.delta}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export function FooterStatCard({ stat }: { stat: Stat }) {
  const tone = stat.tone ?? 'emerald';

  return (
    <section
      onClick={stat.onClick}
      className={cn(
        'flex min-w-0 flex-col rounded-2xl bg-white border border-border/80 p-2 shadow-xs transition-all duration-200',
        stat.onClick && 'cursor-pointer hover:border-brand-400/80 hover:shadow-card group active:scale-[0.99]'
      )}
    >
      {/* Icon tile + optional info glyph, both hanging from the same top inset */}
      <div className="flex w-full items-start justify-between gap-2.5 p-2">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b text-white shadow-sm transition-transform duration-200 group-hover:scale-105',
            TILE_TONES[tone]
          )}
        >
          <stat.icon className="w-5 h-5 shrink-0 text-white" aria-hidden />
        </span>
        {stat.hint ? (
          <StatHint label={stat.label} hint={stat.hint} />
        ) : stat.onClick ? (
          <span className="text-grey-400 group-hover:text-grey-700 transition-colors p-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        ) : null}
      </div>

      {/* Label sits directly over the number, as on the plain cards */}
      <div className="flex flex-col gap-0.5 px-2 pt-2 pb-3">
        <p className="truncate text-xs font-medium text-grey-500">{stat.label}</p>
        <p className="text-2xl sm:text-[28px] font-bold tracking-tight text-grey-900 tabular-nums leading-tight">
          {stat.value}
        </p>
      </div>

      {/* Footer band: comparison caption + delta pill on an inner tile */}
      <div className="mt-auto flex w-full items-center justify-between gap-2 rounded-xl bg-grey-50/90 py-1.5 pe-1.5 ps-2.5 border border-border/50 shadow-2xs">
        <p className="truncate text-[11px] font-medium text-grey-500">
          {stat.caption ?? 'From last month'}
        </p>
        {stat.delta && (
          <DeltaPill delta={stat.delta} deltaColor={stat.deltaColor} />
        )}
      </div>
    </section>
  );
}

export function StatCards({
  variant = 'footer',
  stats = [],
  count,
  columns = 4,
  className,
}: {
  variant?: StatCardsVariant;
  stats?: Stat[];
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const items = count ? stats.slice(0, count) : stats;

  return (
    <div
      className={cn(
        'grid w-full gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && (variant === 'footer' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'),
        className
      )}
    >
      {items.map((stat, idx) =>
        variant === 'footer' ? (
          <FooterStatCard key={stat.label + idx} stat={stat} />
        ) : (
          <PlainStatCard key={stat.label + idx} stat={stat} />
        )
      )}
    </div>
  );
}

