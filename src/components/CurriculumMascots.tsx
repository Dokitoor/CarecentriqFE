import React from 'react';
import { AnimatedMascotSvg } from './AnimatedMascotSvg';

// Official CareCentriq Mascot from C:\Users\LENOVO T480\Downloads\illustrations\Mascot
export const GreenBagMascot: React.FC<{
  variant?: 'idle' | 'winking' | 'celebrating';
  className?: string;
  size?: number;
  useSvg?: boolean;
}> = ({ variant = 'idle', className = '', size = 96, useSvg = true }) => {
  if (useSvg) {
    return <AnimatedMascotSvg size={size} className={className} interactive enableWaving />;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: Math.round(size * 1.15) }}
    >
      {/* Celebrating sparkles / burst effect */}
      {variant === 'celebrating' && (
        <div className="absolute -inset-4 pointer-events-none flex items-center justify-center z-10">
          <span className="absolute -top-3 -left-2 text-xl animate-bounce">✨</span>
          <span className="absolute -top-4 -right-2 text-xl animate-pulse">🎉</span>
          <span className="absolute -bottom-2 -left-2 text-lg">🌟</span>
          <span className="absolute -bottom-2 -right-2 text-lg">⭐</span>
        </div>
      )}

      {/* Actual Mascot Illustration */}
      <img
        src="/mascot.png"
        alt="CareCentriq Mascot"
        className={`w-full h-full object-contain pointer-events-none drop-shadow-sm transition-all duration-300 ${
          variant === 'winking' ? 'rotate-2 scale-105' : ''
        } ${variant === 'celebrating' ? 'scale-110 -translate-y-1' : ''}`}
      />
    </div>
  );
};

export const CareCentriqMascot = GreenBagMascot;

// Yellow Starburst Character (Program Objectives)
export const YellowStarMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-44 flex items-end justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Glowing Starburst overhead */}
        <g opacity="0.95">
          <line x1="100" y1="18" x2="100" y2="52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="82" y1="35" x2="118" y2="35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="87" y1="22" x2="113" y2="48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="113" y1="22" x2="87" y2="48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="35" r="5" fill="#FFFFFF" />
        </g>

        {/* Little whimsical head curl */}
        <path
          d="M100 70 Q95 55 102 48 Q108 42 100 38"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Yellow Round Body */}
        <circle cx="100" cy="140" r="75" fill="#FFC83B" stroke="#0A0A0A" strokeWidth="3.5" />

        {/* Cheerful Kawaii Face */}
        <circle cx="75" cy="115" r="7" fill="#0A0A0A" />
        <circle cx="77.5" cy="113" r="2.5" fill="#FFFFFF" />
        <circle cx="125" cy="115" r="7" fill="#0A0A0A" />
        <circle cx="127.5" cy="113" r="2.5" fill="#FFFFFF" />

        {/* Rosy blush cheeks */}
        <ellipse cx="68" cy="125" rx="5" ry="3" fill="#FB7185" opacity="0.7" />
        <ellipse cx="132" cy="125" rx="5" ry="3" fill="#FB7185" opacity="0.7" />

        {/* Big open smile */}
        <path
          d="M90 120 Q100 132 110 120 Z"
          fill="#0A0A0A"
        />
        <path
          d="M93 123 Q100 129 107 123"
          fill="#FB7185"
        />

        {/* Joyful arms raised towards the star */}
        <path
          d="M48 135 Q40 95 65 78 Q72 72 75 78"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="#FFC83B"
        />
        <path
          d="M152 135 Q160 95 135 78 Q128 72 125 78"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="#FFC83B"
        />
      </svg>
    </div>
  );
};

// Orange Donut / Activity Character (Trainings & Activities)
export const OrangeActivityMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-44 flex items-end justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Floating musical notes & archery/sports items */}
        <g stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none">
          {/* Music note 1 */}
          <circle cx="36" cy="48" r="3.5" fill="#EF4444" />
          <path d="M39 48 L39 32 L49 28 L49 44" />
          <circle cx="49" cy="44" r="3" fill="#EF4444" />

          {/* Bow & Arrow icon */}
          <path d="M156 32 Q172 45 156 58" stroke="#EF4444" strokeWidth="2.5" />
          <line x1="146" y1="45" x2="170" y2="45" stroke="#EF4444" strokeWidth="2.5" />

          {/* Small sports ball */}
          <circle cx="30" cy="74" r="7" stroke="#EF4444" strokeWidth="2" fill="#FED7AA" />
          <path d="M26 71 Q30 74 26 77" stroke="#EF4444" />
          <path d="M34 71 Q30 74 34 77" stroke="#EF4444" />
        </g>

        {/* Orange Donut Character Body */}
        <ellipse cx="100" cy="115" rx="55" ry="50" fill="#FF7020" stroke="#0A0A0A" strokeWidth="3.5" />
        <ellipse cx="100" cy="124" rx="20" ry="18" fill="#C5E88F" stroke="#0A0A0A" strokeWidth="3" />

        {/* Eyebrows & Eyes */}
        <path d="M78 86 Q86 84 92 88" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M108 88 Q114 84 122 86" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="85" cy="94" r="4.5" fill="#0A0A0A" />
        <circle cx="86.5" cy="93" r="1.5" fill="#FFFFFF" />
        <circle cx="115" cy="94" r="4.5" fill="#0A0A0A" />
        <circle cx="116.5" cy="93" r="1.5" fill="#FFFFFF" />

        {/* Cute slightly smirk mouth */}
        <path d="M96 102 Q100 106 104 102" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Arms stretching out active */}
        <path
          d="M48 108 Q32 105 24 100"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M152 108 Q168 105 176 100"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Blue Diamond Cape Character (Tasks)
export const BlueDiamondMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-44 flex items-end justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Dynamic Cape Fluttering Behind */}
        <path
          d="M60 85 Q40 120 20 135 Q70 148 100 140 Q130 148 180 135 Q160 120 140 85 Z"
          fill="#1D4ED8"
          stroke="#0A0A0A"
          strokeWidth="3"
        />

        {/* Diamond Kite Body */}
        <polygon
          points="100,42 155,108 100,165 45,108"
          fill="#3B82F6"
          stroke="#0A0A0A"
          strokeWidth="3.5"
        />

        {/* Diamond Inner Contour */}
        <polygon
          points="100,50 145,108 100,155 55,108"
          fill="#60A5FA"
          opacity="0.3"
        />

        {/* Determined Hero Eyes with highlights */}
        <path d="M68 98 L88 105" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="78" cy="107" rx="6" ry="7" fill="#0A0A0A" />
        <circle cx="80" cy="105" r="2.5" fill="#FFFFFF" />

        <path d="M132 98 L112 105" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="122" cy="107" rx="6" ry="7" fill="#0A0A0A" />
        <circle cx="124" cy="105" r="2.5" fill="#FFFFFF" />

        {/* Cute confident mouth */}
        <path d="M96 118 Q100 122 104 118" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Hand pointing upwards to achievements */}
        <path d="M150 108 Q165 98 168 88" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

// Pink Star Sassy Character (Behavior - Card 4)
export const PinkStarMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-44 flex items-end justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Cute hair curl on top */}
        <path
          d="M100 48 Q95 38 102 32 Q108 26 100 22"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Pink Star Body with 5 Points */}
        <path
          d="M100 48 
             L114 78 
             L148 82 
             L122 105 
             L130 138 
             L100 122 
             L70 138 
             L78 105 
             L52 82 
             L86 78 Z"
          fill="#EC4899"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Sassy determined face */}
        {/* Eyebrows */}
        <path d="M78 86 Q86 82 92 86" stroke="#0A0A0A" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M108 86 Q114 82 122 86" stroke="#0A0A0A" strokeWidth="2.8" strokeLinecap="round" />

        {/* Half-lidded sassy eyes */}
        <ellipse cx="85" cy="94" rx="6" ry="5" fill="#0A0A0A" />
        <circle cx="87" cy="92.5" r="1.8" fill="#FFFFFF" />
        <line x1="78" y1="91" x2="92" y2="91" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

        <ellipse cx="115" cy="94" rx="6" ry="5" fill="#0A0A0A" />
        <circle cx="117" cy="92.5" r="1.8" fill="#FFFFFF" />
        <line x1="108" y1="91" x2="122" y2="91" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Confident small smirk mouth */}
        <path d="M96 104 Q100 108 106 103" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Hands on hips */}
        <path d="M72 100 Q60 110 65 125" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M128 100 Q140 110 135 125" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Little feet */}
        <line x1="90" y1="130" x2="88" y2="148" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="110" y1="130" x2="112" y2="148" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Purple Quadrant Character with Magnifying Glass (Behavior Measurement - Card 5)
export const PurpleMagnifierMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-44 flex items-end justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hair swirl on top */}
        <path
          d="M75 52 Q68 40 76 34 Q84 28 78 22"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Purple Quadrant / Semicircle Character Body */}
        <path
          d="M60 135 L60 85 Q60 55 90 55 Q135 55 140 135 Z"
          fill="#8B5CF6"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Cute wide inquiring eyes */}
        <circle cx="85" cy="85" r="7" fill="#0A0A0A" />
        <circle cx="87.5" cy="82.5" r="2.5" fill="#FFFFFF" />
        <circle cx="115" cy="85" r="7" fill="#0A0A0A" />
        <circle cx="117.5" cy="82.5" r="2.5" fill="#FFFFFF" />

        {/* Cute small smile */}
        <path d="M98 96 Q100 100 102 96" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Little stick legs */}
        <line x1="90" y1="135" x2="90" y2="155" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="105" y1="135" x2="105" y2="155" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />

        {/* Hand holding bright pink/magenta magnifying glass */}
        <g transform="translate(130, 48)">
          {/* Glass Circle */}
          <circle cx="20" cy="20" r="16" stroke="#EC4899" strokeWidth="4.5" fill="#FDF2F8" fillOpacity="0.7" />
          {/* Handle */}
          <line x1="20" y1="36" x2="20" y2="68" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" />
          {/* Glass shine glint */}
          <path d="M12 12 Q16 8 22 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Hand reaching out to handle */}
        <path d="M135 110 Q145 95 150 90" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Folder Illustration with papers on subtle grid (Image 3 Left Card 1)
export const FolderIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-32 flex items-end justify-start select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Subtle background grid pattern */}
        <g stroke="#E5E7EB" strokeWidth="0.8" opacity="0.6">
          <line x1="0" y1="20" x2="220" y2="20" />
          <line x1="0" y1="50" x2="220" y2="50" />
          <line x1="0" y1="80" x2="220" y2="80" />
          <line x1="0" y1="110" x2="220" y2="110" />
          <line x1="40" y1="0" x2="40" y2="140" />
          <line x1="80" y1="0" x2="80" y2="140" />
          <line x1="120" y1="0" x2="120" y2="140" />
          <line x1="160" y1="0" x2="160" y2="140" />
          <line x1="200" y1="0" x2="200" y2="140" />
        </g>

        {/* Folder Back Tab */}
        <path
          d="M20 70 L20 62 Q20 54 28 54 L65 54 Q72 54 78 60 L86 68 L170 68 Q178 68 178 76 L178 140 L20 140 Z"
          fill="#D97706"
        />

        {/* White Document Pages Popping Out */}
        {/* Doc 1 (tilted left) */}
        <g transform="rotate(-6 60 70)">
          <rect x="36" y="44" width="75" height="70" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="48" y1="58" x2="88" y2="58" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="68" x2="96" y2="68" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="78" x2="78" y2="78" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Doc 2 (center upright, crisp white) */}
        <rect x="70" y="40" width="85" height="85" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" className="drop-shadow-sm" />
        <line x1="84" y1="54" x2="135" y2="54" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="66" x2="142" y2="66" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="78" x2="120" y2="78" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

        {/* Folder Front Flap (curved warm orange) */}
        <path
          d="M16 80 L70 80 Q76 80 82 86 L90 92 L180 92 Q188 92 188 100 L188 140 L16 140 Z"
          fill="#F59E0B"
          className="drop-shadow-md"
        />
        <path
          d="M16 85 Q16 80 24 80 L72 80 Q78 80 84 86 L92 92 L180 92"
          stroke="#FBBF24"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Stacked Lego Building Blocks Illustration (Image 3 Left Card 2)
export const LegoBricksIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-32 flex items-end justify-start select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Green Base Brick */}
        <g transform="translate(90, 95)">
          <rect x="0" y="0" width="90" height="35" rx="4" fill="#22C55E" />
          <rect x="0" y="0" width="90" height="7" rx="3" fill="#4ADE80" />
          {/* Studs */}
          <rect x="10" y="-6" width="14" height="7" rx="2" fill="#4ADE80" />
          <rect x="38" y="-6" width="14" height="7" rx="2" fill="#4ADE80" />
          <rect x="66" y="-6" width="14" height="7" rx="2" fill="#4ADE80" />
        </g>

        {/* Blue Brick */}
        <g transform="translate(40, 95)">
          <rect x="0" y="0" width="55" height="35" rx="4" fill="#2563EB" />
          <rect x="0" y="0" width="55" height="7" rx="3" fill="#60A5FA" />
          {/* Studs */}
          <rect x="10" y="-6" width="14" height="7" rx="2" fill="#60A5FA" />
          <rect x="32" y="-6" width="14" height="7" rx="2" fill="#60A5FA" />
        </g>

        {/* Red Brick (left) */}
        <g transform="translate(18, 68)">
          <rect x="0" y="0" width="46" height="35" rx="4" fill="#DC2626" />
          <rect x="0" y="0" width="46" height="7" rx="3" fill="#F87171" />
          {/* Studs */}
          <rect x="8" y="-6" width="13" height="7" rx="2" fill="#F87171" />
          <rect x="25" y="-6" width="13" height="7" rx="2" fill="#F87171" />
        </g>

        {/* Yellow Brick (center) */}
        <g transform="translate(60, 68)">
          <rect x="0" y="0" width="55" height="35" rx="4" fill="#EAB308" />
          <rect x="0" y="0" width="55" height="7" rx="3" fill="#FDE047" />
          {/* Studs */}
          <rect x="10" y="-6" width="14" height="7" rx="2" fill="#FDE047" />
          <rect x="32" y="-6" width="14" height="7" rx="2" fill="#FDE047" />
        </g>

        {/* Pink/Coral Floating Brick (Tilted, falling into place) */}
        <g transform="translate(95, 28) rotate(32)">
          <rect x="0" y="0" width="62" height="32" rx="4" fill="#EC4899" className="drop-shadow-md" />
          <rect x="0" y="0" width="62" height="6" rx="3" fill="#F472B6" />
          {/* Studs */}
          <rect x="8" y="-6" width="14" height="7" rx="2" fill="#F472B6" />
          <rect x="26" y="-6" width="14" height="7" rx="2" fill="#F472B6" />
          <rect x="44" y="-6" width="14" height="7" rx="2" fill="#F472B6" />
        </g>
      </svg>
    </div>
  );
};

// 3D Floating Setup Card Stack Graphic (Image 1 Empty State)
export const SetupCardsGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-44 h-28 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 180 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Soft shadow base */}
        <ellipse cx="90" cy="98" rx="60" ry="12" fill="#E5E7EB" opacity="0.6" />

        {/* Card 1 (bottom layer) */}
        <rect
          x="32"
          y="35"
          width="116"
          height="52"
          rx="14"
          fill="#F3F4F6"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />

        {/* Card 2 (middle layer) */}
        <rect
          x="24"
          y="25"
          width="132"
          height="54"
          rx="14"
          fill="#FAFAFA"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />

        {/* Card 3 (top floating layer) */}
        <rect
          x="16"
          y="15"
          width="148"
          height="58"
          rx="14"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          className="drop-shadow-sm"
        />

        {/* Top Card Details: Avatar Badge + Placeholder Content Lines */}
        <rect x="28" y="27" width="22" height="22" rx="8" fill="#E6F9EA" stroke="#2EE05A" strokeWidth="1" />
        {/* Checkmark icon inside badge */}
        <path d="M34 38 L38 42 L45 34" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Text bars */}
        <rect x="58" y="28" width="58" height="6" rx="3" fill="#D1D5DB" />
        <rect x="58" y="38" width="88" height="5" rx="2.5" fill="#E5E7EB" />
        <rect x="58" y="47" width="40" height="4" rx="2" fill="#F3F4F6" />
      </svg>
    </div>
  );
};

