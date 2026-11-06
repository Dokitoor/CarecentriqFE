'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface AnimatedMascotSvgProps {
  className?: string;
  size?: number;
  interactive?: boolean; // Follow mouse cursor with pupils
  enableWaving?: boolean;
}

export const AnimatedMascotSvg: React.FC<AnimatedMascotSvgProps> = ({
  className = '',
  size = 96,
  interactive = true,
  enableWaving = true,
}) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);

  // Mouse pupil tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse offset between -3 and +3 pixels
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      setPupilOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none cursor-pointer', className)}
      style={{ width: size, height: Math.round(size * 1.15) }}
      onMouseEnter={() => setIsWaving(true)}
      onMouseLeave={() => setIsWaving(false)}
      title="Hi! I'm the CareCentriq Mascot."
    >
      <svg
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Subtle gradient for body */}
          <linearGradient id="mascotBodyGrad" x1="100" y1="58" x2="100" y2="168" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2FDC4F" />
            <stop offset="100%" stopColor="#1EBE3E" />
          </linearGradient>

          {/* Eye clip paths for smooth blinking */}
          <clipPath id="leftEyeClip">
            <circle cx="81" cy="115" r="13" />
          </clipPath>
          <clipPath id="rightEyeClip">
            <circle cx="119" cy="115" r="13" />
          </clipPath>
        </defs>

        <style>{`
          @keyframes idleBreath {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes blinkAnimation {
            0%, 92%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.08); }
          }
          @keyframes hairWiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(4deg); }
          }
          @keyframes armWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-24deg); }
            75% { transform: rotate(18deg); }
          }
          .mascot-body-group {
            transform-origin: 100px 170px;
            animation: idleBreath 3.6s ease-in-out infinite;
          }
          .mascot-eyes {
            transform-origin: 100px 115px;
            animation: blinkAnimation 4.2s infinite;
          }
          .mascot-hair {
            transform-origin: 100px 58px;
            animation: hairWiggle 2.8s ease-in-out infinite;
          }
          .mascot-wave-arm {
            transform-origin: 153px 115px;
            transition: transform 0.2s ease;
          }
          .mascot-wave-active {
            animation: armWave 0.7s ease-in-out infinite;
          }
        `}</style>

        {/* ===================================================
            HAIR TUFT & BLACK CURL WIRE ON TOP
        =================================================== */}
        <g id="hair" className="mascot-hair">
          {/* White organic hair tuft behind spiral */}
          <path
            d="M86 64 C86 42, 102 32, 118 32 C126 32, 134 42, 134 62 Z"
            fill="#F4F4F6"
            stroke="#D1D5DB"
            strokeWidth="1.2"
          />
          {/* Black spring loop spiral */}
          <path
            d="M84 65 C88 50, 108 40, 122 44 C132 46, 138 54, 130 62 C120 70, 108 52, 126 50 C136 49, 142 58, 140 68"
            stroke="#0A0A0A"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* ===================================================
            LEGS (DARK FOREST GREEN)
        =================================================== */}
        <g id="legs" stroke="#0E392F" strokeWidth="6.5" strokeLinecap="round">
          {/* Left Leg */}
          <line x1="82" y1="168" x2="82" y2="204" />
          {/* Right Leg */}
          <line x1="118" y1="168" x2="118" y2="204" />

          {/* Left Foot */}
          <ellipse cx="78" cy="207" rx="10" ry="3.8" fill="#0E392F" stroke="none" />
          {/* Right Foot */}
          <ellipse cx="122" cy="207" rx="10" ry="3.8" fill="#0E392F" stroke="none" />
        </g>

        {/* ===================================================
            LEFT ARM
        =================================================== */}
        <g id="left-arm">
          <path
            d="M48 116 C38 140, 34 165, 30 182"
            stroke="#0E392F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left Hand Fingers */}
          <path
            d="M30 182 C27 186, 25 190, 27 194 M30 182 C30 188, 30 192, 32 195 M30 182 C34 187, 36 190, 37 193"
            stroke="#0E392F"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* ===================================================
            RIGHT ARM (WAVING CAPABLE)
        =================================================== */}
        <g
          id="right-arm"
          className={cn('mascot-wave-arm', (isWaving && enableWaving) && 'mascot-wave-active')}
        >
          {isWaving && enableWaving ? (
            // Raised arm when waving
            <path
              d="M152 115 C166 98, 172 78, 178 64"
              stroke="#0E392F"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Resting arm by the side
            <path
              d="M152 116 C162 140, 166 165, 170 182"
              stroke="#0E392F"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Right Hand */}
          {isWaving && enableWaving ? (
            <path
              d="M178 64 C176 58, 178 54, 183 55 M178 64 C182 60, 186 58, 188 62 M178 64 C184 66, 188 68, 189 73"
              stroke="#0E392F"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M170 182 C167 186, 164 190, 166 194 M170 182 C171 188, 171 192, 173 195 M170 182 C174 187, 176 190, 177 193"
              stroke="#0E392F"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* ===================================================
            MAIN GREEN SQUARE BODY (ANIMATED BREATHE)
        =================================================== */}
        <g id="body" className="mascot-body-group">
          {/* Rounded Square Body */}
          <rect
            x="45"
            y="58"
            width="110"
            height="110"
            rx="16"
            fill="url(#mascotBodyGrad)"
          />

          {/* Subtle textured pixel/blocks at the bottom of the body */}
          <g fill="#17AB36" opacity="0.45">
            <rect x="47" y="96" width="16" height="58" rx="2" />
            <rect x="67" y="112" width="18" height="54" rx="2" />
            <rect x="89" y="125" width="22" height="41" rx="2" />
            <rect x="115" y="104" width="16" height="62" rx="2" />
            <rect x="135" y="120" width="18" height="46" rx="2" />
          </g>

          {/* ===================================================
              FACIAL FEATURES
          =================================================== */}
          {/* Eyebrows */}
          <path
            d="M74 91 Q81 87 88 90"
            stroke="#0A0A0A"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M112 90 Q119 87 126 91"
            stroke="#0A0A0A"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes (Blinking Animation & Pupil Tracking) */}
          <g id="eyes" className="mascot-eyes">
            {/* Left Eye Sclera (White Pill/Circle) */}
            <circle cx="81" cy="115" r="13" fill="#FFFFFF" />
            {/* Left Pupil (Dark Iris with Tracking) */}
            <g clipPath="url(#leftEyeClip)">
              <circle
                cx={81 + pupilOffset.x}
                cy={115 + pupilOffset.y}
                r="10"
                fill="#0A1813"
              />
              {/* White Glint Highlight 1 */}
              <circle
                cx={83 + pupilOffset.x}
                cy={111 + pupilOffset.y}
                r="3.5"
                fill="#FFFFFF"
              />
              {/* Small Glint Highlight 2 */}
              <circle
                cx={77 + pupilOffset.x}
                cy={118 + pupilOffset.y}
                r="1.4"
                fill="#FFFFFF"
              />
            </g>

            {/* Right Eye Sclera (White Pill/Circle) */}
            <circle cx="119" cy="115" r="13" fill="#FFFFFF" />
            {/* Right Pupil (Dark Iris with Tracking) */}
            <g clipPath="url(#rightEyeClip)">
              <circle
                cx={119 + pupilOffset.x}
                cy={115 + pupilOffset.y}
                r="10"
                fill="#0A1813"
              />
              {/* White Glint Highlight 1 */}
              <circle
                cx={121 + pupilOffset.x}
                cy={111 + pupilOffset.y}
                r="3.5"
                fill="#FFFFFF"
              />
              {/* Small Glint Highlight 2 */}
              <circle
                cx={115 + pupilOffset.x}
                cy={118 + pupilOffset.y}
                r="1.4"
                fill="#FFFFFF"
              />
            </g>
          </g>

          {/* Happy Open Smiling Mouth with Tongue */}
          <g id="mouth">
            {/* Dark inner mouth cavity */}
            <path
              d="M93 125 C93 138, 107 138, 107 125 Z"
              fill="#062E28"
            />
            {/* Soft cyan/mint tongue */}
            <path
              d="M95 131 C98 136, 102 136, 105 131 C102 129, 98 129, 95 131 Z"
              fill="#A7F3D0"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

