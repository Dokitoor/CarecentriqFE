'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import { Sound } from '@/utils/soundEffects';

interface FinaleCelebrationStageProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnToDashboard: () => void;
  onWatchVideo: () => void;
  programName: string;
  programCategory?: string;
  scheduleType?: string;
  isBehavioral?: boolean;
  objectivesCount?: number;
  trainingsCount?: number;
  tasksCount?: number;
}

const CREW: [string, number][] = [
  ['ch_objectives', 210],
  ['ch_trainings', 340],
  ['ch_calendar', 470],
  ['ch_tasks', 880],
  ['ch_measure', 1000],
];

export const FinaleCelebrationStage: React.FC<FinaleCelebrationStageProps> = ({
  isOpen,
  onClose,
  onReturnToDashboard,
  onWatchVideo,
  programName,
  programCategory = 'Day Services',
  scheduleType = 'Regular program schedule',
  isBehavioral = true,
  objectivesCount = 2,
  trainingsCount = 2,
  tasksCount = 3,
}) => {
  const [scale, setScale] = useState(1);
  const [isSnip, setIsSnip] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [showRecap, setShowRecap] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fxEngineRef = useRef<any>(null);

  // Resize listener for stage scaling
  useEffect(() => {
    if (!isOpen) return;
    const handleResize = () => {
      const s = Math.min(window.innerWidth / 1200, (window.innerHeight - 70) / 780, 1.25);
      setScale(s);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Canvas confetti engine initialization
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const cv = canvasRef.current;
    const g = cv.getContext('2d');
    if (!g) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let parts: any[] = [];
    let raf = 0;
    let last = 0;

    const COLS = [
      '#CBD6F8',
      '#C1E387',
      '#FFE45C',
      '#FAD4C8',
      '#27A147',
      '#9BF168',
      '#F49AC1',
      '#5B8DEF',
      '#FF8A3D',
      '#B06CF0',
      '#33CC33',
      '#FFFFFF',
    ];

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
    };
    size();
    window.addEventListener('resize', size);

    const add = (x: number, y: number, vx: number, vy: number, kind?: string) => {
      const col = COLS[(Math.random() * COLS.length) | 0];
      parts.push({
        x,
        y,
        vx,
        vy,
        kind:
          kind ||
          (Math.random() < 0.14 ? 'streamer' : Math.random() < 0.3 ? 'circle' : 'rect'),
        col,
        w: 6 + Math.random() * 7,
        h: 9 + Math.random() * 9,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 12,
        flip: Math.random() * 6.28,
        vf: 4 + Math.random() * 8,
        wob: Math.random() * 6.28,
        life: 0,
        max: 4.5 + Math.random() * 2.5,
      });
    };

    const cannon = (
      x: number,
      y: number,
      deg: number,
      spread: number,
      n: number,
      power: number
    ) => {
      for (let i = 0; i < n; i++) {
        const a = ((deg + (Math.random() - 0.5) * spread) * Math.PI) / 180;
        const s = power * (0.55 + Math.random() * 0.6);
        add(x, y, Math.cos(a) * s, Math.sin(a) * s);
      }
      go();
    };

    const burst = (x: number, y: number, n: number, power: number) => {
      cannon(x, y, -90, 140, n, power);
    };

    const rain = (n: number, dur: number) => {
      let k = 0;
      const per = n / (dur * 60);
      const t = setInterval(() => {
        for (let i = 0; i < per; i++) {
          add(
            Math.random() * W,
            -20,
            (Math.random() - 0.5) * 60,
            40 + Math.random() * 120
          );
        }
        go();
        if ((k += 1) > dur * 60) clearInterval(t);
      }, 16);
    };

    const go = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        p.vy += 520 * dt;
        p.vx *= Math.pow(0.32, dt);
        p.vy *= Math.pow(0.42, dt);
        if (p.vy > 170) p.vy = 170;
        p.wob += dt * 5;
        p.x += (p.vx + Math.sin(p.wob) * 30) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vf * dt;

        if (p.y > H + 40 || p.life > p.max) {
          parts.splice(i, 1);
          continue;
        }

        const a = Math.min(1, (p.max - p.life) * 1.5);
        g.globalAlpha = a;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.rot);
        g.fillStyle = p.col;

        if (p.kind === 'circle') {
          g.beginPath();
          g.ellipse(0, 0, p.w * 0.45, p.w * 0.45 * Math.abs(Math.cos(p.flip)) + 0.5, 0, 0, 6.28);
          g.fill();
        } else if (p.kind === 'streamer') {
          g.strokeStyle = p.col;
          g.lineWidth = 3.2;
          g.lineCap = 'round';
          g.beginPath();
          for (let k = 0; k <= 6; k++) {
            const yy = k * 5;
            const xx = Math.sin(p.flip + k * 0.9) * 5;
            k ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
          }
          g.stroke();
        } else {
          g.scale(1, Math.cos(p.flip));
          g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        g.restore();
      }

      g.globalAlpha = 1;
      if (parts.length) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
        g.clearRect(0, 0, W, H);
      }
    };

    fxEngineRef.current = {
      cannon,
      burst,
      rain,
    };

    return () => {
      window.removeEventListener('resize', size);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isOpen]);

  const fireCelebrationFX = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    Sound.fanfare();

    const wave = (delay: number, n: number) => {
      setTimeout(() => {
        if (fxEngineRef.current) {
          fxEngineRef.current.cannon(0, H * 0.92, -58, 34, n, 1250);
          fxEngineRef.current.cannon(W, H * 0.92, -122, 34, n, 1250);
        }
        Sound.pop();
      }, delay);
    };

    wave(0, 200);
    wave(550, 170);
    wave(1150, 150);
    setTimeout(() => fxEngineRef.current?.rain(420, 3.5), 300);
    setTimeout(() => fxEngineRef.current?.burst(W / 2, H * 0.35, 160, 900), 800);
  };

  const handleStartCut = async () => {
    if (isCounting || isCut) return;
    setIsCounting(true);

    const counts = ['3', '2', '1'];
    for (const num of counts) {
      setCountdown(num);
      Sound.tick();
      setIsSnip((s) => !s);
      await new Promise((r) => setTimeout(r, 650));
    }

    setCountdown(null);
    setIsSnip(true);
    Sound.snip();
    setIsCut(true);
    setIsCounting(false);

    // Fire dual cannons, confetti rain, fanfare
    fireCelebrationFX();

    // Slide in recap card after celebration burst
    setTimeout(() => {
      setShowRecap(true);
    }, 2800);
  };

  const handleCelebrateAgain = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    Sound.fanfare();
    [0, 500].forEach((delay) => {
      setTimeout(() => {
        if (fxEngineRef.current) {
          fxEngineRef.current.cannon(0, H * 0.92, -58, 34, 180, 1250);
          fxEngineRef.current.cannon(W, H * 0.92, -122, 34, 180, 1250);
        }
        Sound.pop();
      }, delay);
    });
    fxEngineRef.current?.rain(300, 2.5);
  };

  if (!isOpen) return null;

  return (
    <div className={`fin ${isCut ? 'cut' : ''}`}>
      {/* Top Right Close Button to Return to Setup */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-grey-800 flex items-center justify-center shadow-lg border border-black/10 cursor-pointer transition-transform hover:scale-105"
        title="Close celebration and return to setup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Background Rotating Sunburst Rays */}
      <div className="rays" />

      {/* Decorative Clouds */}
      <div className="cloud" style={{ left: '8%', top: '18%', width: '180px', height: '48px' }} />
      <div className="cloud" style={{ right: '12%', top: '24%', width: '220px', height: '54px' }} />

      {/* Centered Grand Finale Stage */}
      <div
        className="fin-stage"
        style={{
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {/* Festive Bunting Garland */}
        <svg
          className="bunting"
          viewBox="0 0 1120 90"
          aria-hidden="true"
        >
          <path d="M0 12 Q560 80 1120 12" stroke="#5A6B68" strokeWidth="2.5" fill="none" />
          {Array.from({ length: 22 }, (_, i) => {
            const cols = ['#CBD6F8', '#C1E387', '#FFE45C', '#FAD4C8', '#33CC33', '#F49AC1', '#5B8DEF'];
            const x = 10 + i * 50;
            const y = 14 + Math.sin((i / 21) * Math.PI) * 34;
            const nextY = 14 + Math.sin(((i + 1) / 21) * Math.PI) * 34;
            const diffY = (nextY - y).toFixed(1);
            return (
              <path
                key={i}
                d={`M${x} ${y} l44 ${diffY} l-20 46 Z`}
                fill={cols[i % cols.length]}
              />
            );
          })}
        </svg>

        {/* Suspended Green Banner */}
        <div className="banner">
          <div className="bkick">
            <span>SERVICE LINE</span>
          </div>
          <svg viewBox="0 0 840 118" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 20 L70 20 L70 108 L0 108 L28 64 Z" fill="#0B4A4A" />
            <path d="M840 20 L770 20 L770 108 L840 108 L812 64 Z" fill="#0B4A4A" />
            <path d="M54 10 Q420 -4 786 10 L786 104 Q420 92 54 104 Z" fill="#003333" />
            <path d="M54 18 Q420 4 786 18" stroke="#33CC33" strokeWidth="4" fill="none" />
            <path d="M54 96 Q420 84 786 96" stroke="#33CC33" strokeWidth="4" fill="none" />
            <line x1="120" y1="-150" x2="130" y2="14" stroke="#7A8A88" strokeWidth="3" />
            <line x1="720" y1="-150" x2="710" y2="14" stroke="#7A8A88" strokeWidth="3" />
          </svg>
          <div
            className="bname"
            style={{
              fontSize: `${Math.max(24, Math.min(52, Math.floor(640 / (programName.length || 10))))}px`,
            }}
          >
            {programName}
          </div>
        </div>

        {/* Agency Building */}
        <svg className="building" viewBox="0 0 700 420" aria-hidden="true">
          <rect x="40" y="60" width="620" height="330" rx="10" fill="#FFFFFF" stroke="#E2E6F0" strokeWidth="3" />
          <rect x="40" y="60" width="620" height="54" fill="#CBD6F8" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${40 + i * 52} 114 h52 v26 q-26 22 -52 0 Z`}
              fill={i % 2 ? '#FFFFFF' : '#9BF168'}
              stroke="#E2E6F0"
              strokeWidth="1.5"
            />
          ))}
          <rect x="290" y="200" width="120" height="190" rx="8" fill="#27A147" />
          <rect x="300" y="210" width="45" height="120" rx="4" fill="#5FD27A" />
          <rect x="355" y="210" width="45" height="120" rx="4" fill="#5FD27A" />
          <circle cx="342" cy="300" r="5" fill="#F2B930" />
          <circle cx="358" cy="300" r="5" fill="#F2B930" />
          <rect x="90" y="180" width="150" height="110" rx="10" fill="#DCE3FB" stroke="#C3CDF1" strokeWidth="3" />
          <rect x="460" y="180" width="150" height="110" rx="10" fill="#DCE3FB" stroke="#C3CDF1" strokeWidth="3" />
          <path d="M90 235 h150 M165 180 v110 M460 235 h150 M535 180 v110" stroke="#C3CDF1" strokeWidth="3" />
          <rect x="80" y="300" width="170" height="26" rx="8" fill="#B88C5A" />
          <circle cx="110" cy="296" r="18" fill="#7ACB6B" />
          <circle cx="140" cy="290" r="22" fill="#5DBB63" />
          <circle cx="175" cy="296" r="17" fill="#8BD17A" />
          <circle cx="210" cy="292" r="20" fill="#5DBB63" />
          <rect x="450" y="300" width="170" height="26" rx="8" fill="#B88C5A" />
          <circle cx="480" cy="292" r="20" fill="#5DBB63" />
          <circle cx="515" cy="296" r="17" fill="#F59BC0" />
          <circle cx="550" cy="290" r="22" fill="#7ACB6B" />
          <circle cx="590" cy="296" r="18" fill="#FFD24D" />
        </svg>

        {/* Walkway Ground */}
        <svg
          className="absolute left-0 bottom-0 w-[1200px] h-[150px]"
          viewBox="0 0 1200 150"
          aria-hidden="true"
        >
          <path d="M0 150 L500 40 L700 40 L1200 150Z" fill="#EAE5DC" />
          <path d="M500 40 L500 150 L700 150 L700 40Z" fill="#E5DFD4" />
          <path d="M500 150 L500 40 L700 150Z" fill="#EFE5D2" />
        </svg>

        {/* Crew Characters */}
        {CREW.map(([c, leftPos], i) => (
          <img
            key={c}
            src={`/guided/${c}.webp`}
            alt=""
            className="crew-f"
            style={{
              left: `${leftPos - 85}px`,
              animationDelay: `${i * 0.11}s`,
            }}
          />
        ))}

        {/* Posts & Ribbon */}
        <div className="post" style={{ left: '107px' }} />
        <div className="post" style={{ left: '1067px' }} />
        <div
          className="ribbon l cursor-pointer"
          onClick={handleStartCut}
          title="Click to cut the ribbon!"
        />
        <div
          className="ribbon r cursor-pointer"
          onClick={handleStartCut}
          title="Click to cut the ribbon!"
        />

        {/* Big Bow */}
        <div
          onClick={handleStartCut}
          className="cursor-pointer"
          title="Click to cut the ribbon!"
        >
          <svg className="bow" viewBox="0 0 120 110" aria-hidden="true">
            <path d="M60 40 C20 0 0 20 10 44 C18 64 46 56 60 46Z" fill="#E23B3F" stroke="#A81E22" strokeWidth="2" />
            <path d="M60 40 C100 0 120 20 110 44 C102 64 74 56 60 46Z" fill="#E23B3F" stroke="#A81E22" strokeWidth="2" />
            <path d="M54 48 L36 106 L48 100 L56 108 L60 52Z" fill="#C92A2E" />
            <path d="M66 48 L84 106 L72 100 L64 108 L60 52Z" fill="#C92A2E" />
            <circle cx="60" cy="44" r="12" fill="#F25A5E" stroke="#A81E22" strokeWidth="2" />
          </svg>
        </div>

        {/* Coci Cutter with Shears */}
        <div
          className="cutter cursor-pointer"
          onClick={handleStartCut}
          title="Click Coci to cut the ribbon!"
        >
          <img
            src={isCut ? '/guided/coci_jump.webp' : '/guided/coci.webp'}
            alt="Coci"
            className="w-[170px]"
          />
          <svg className={`scissors ${isSnip ? 'snip' : ''}`} viewBox="0 0 150 100" aria-hidden="true">
            <g className="blade-a">
              <path d="M76 50 L4 44 L76 42Z" fill="#D7DEE2" stroke="#7D8A90" strokeWidth="2" />
              <circle cx="104" cy="30" r="17" fill="none" stroke="#27A147" strokeWidth="9" />
              <path d="M76 46 L92 38" stroke="#27A147" strokeWidth="9" strokeLinecap="round" />
            </g>
            <g className="blade-b">
              <path d="M76 50 L4 56 L76 58Z" fill="#C5CED3" stroke="#7D8A90" strokeWidth="2" />
              <circle cx="104" cy="70" r="17" fill="none" stroke="#33CC33" strokeWidth="9" />
              <path d="M76 54 L92 62" stroke="#33CC33" strokeWidth="9" strokeLinecap="round" />
            </g>
            <circle cx="76" cy="50" r="5" fill="#5A666B" />
          </svg>
        </div>
      </div>

      {/* Floating Speech UI on Top */}
      <div className="fin-ui">
        <div className="fin-say">
          <img
            src={isCut ? '/guided/mood_joyful.webp' : '/guided/mood_excited.webp'}
            alt=""
            className="w-14 h-14 object-contain flex-none"
          />
          <p className="text-sm sm:text-[15px] leading-snug text-grey-800 font-sans">
            {!isCut ? (
              <>
                You built <strong className="text-grey-900 font-bold">{programName}</strong> from scratch. Every piece you added now works together. Want to do the honors?
              </>
            ) : (
              <>
                <strong className="text-grey-900 font-bold">{programName}</strong> is officially open! Your whole team came out to celebrate.
              </>
            )}
          </p>
          {!isCut && !isCounting && (
            <button
              type="button"
              onClick={handleStartCut}
              className="btn-coci flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Cut the ribbon</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Big Animated Countdown */}
      {countdown && (
        <div className="count-big">
          {countdown}
        </div>
      )}

      {/* Confetti & FX Canvas */}
      <canvas
        ref={canvasRef}
        id="fx"
        className="fixed inset-0 w-full h-full pointer-events-none z-[95]"
      />

      {/* Recap Card */}
      {showRecap && (
        <aside className="recap" aria-label="What you built">
          <div className="recap-h">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full inline-block">
              Service line ready
            </span>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-grey-900 mt-1 tracking-tight">
              {programName} is open!
            </h3>
            <p className="text-xs text-grey-600 mt-1">
              Next, assign each client’s objectives and begin planning with them.
            </p>
          </div>

          <div className="recap-b">
            {/* Characters Crew Row */}
            <div className="flex items-center justify-center gap-2 py-1">
              {['ch_objectives', 'ch_trainings', 'ch_calendar', 'ch_tasks', 'ch_measure'].map((c) => (
                <img
                  key={c}
                  src={`/guided/${c}.webp`}
                  alt=""
                  className="w-10 h-10 object-contain drop-shadow-xs"
                />
              ))}
            </div>

            {/* Configured Details */}
            <div className="divide-y divide-grey-100 text-xs">
              <div className="rrow">
                <span>Service line</span>
                <b>{programName}</b>
              </div>
              <div className="rrow">
                <span>Program</span>
                <b>{programCategory}</b>
              </div>
              <div className="rrow">
                <span>Schedule</span>
                <b>{scheduleType}</b>
              </div>
              <div className="rrow">
                <span>Type</span>
                <b>{isBehavioral ? 'Behavioral' : 'Nonbehavioral'}</b>
              </div>
              <div className="rrow">
                <span>Objectives</span>
                <b>{objectivesCount} configured</b>
              </div>
              <div className="rrow">
                <span>Trainings</span>
                <b>{trainingsCount} configured</b>
              </div>
              <div className="rrow">
                <span>Universal tasks</span>
                <b>{tasksCount} configured</b>
              </div>
            </div>
          </div>

          <div className="recap-f">
            <button
              type="button"
              onClick={handleCelebrateAgain}
              className="btn-coci text-xs py-2 px-3.5 cursor-pointer shadow-xs"
            >
              Celebrate again
            </button>

            <button
              type="button"
              onClick={onWatchVideo}
              className="btn-line text-xs py-2 px-3 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-grey-700" />
              <span>Celebration video (0:35)</span>
            </button>

            <button
              type="button"
              onClick={onReturnToDashboard}
              className="text-xs py-2.5 px-4 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-semibold transition-colors cursor-pointer w-full text-center mt-1"
            >
              Return to dashboard
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-semibold text-grey-500 hover:text-grey-900 underline mx-auto py-1 cursor-pointer block"
            >
              Review setup
            </button>
          </div>
        </aside>
      )}

      {/* Embedded Component CSS */}
      <style jsx>{`
        .fin {
          position: fixed;
          inset: 0;
          z-index: 80;
          overflow: hidden;
          background: linear-gradient(180deg, #BFD0FA 0%, #E4EBFD 45%, #F6FBEA 100%);
          animation: finFade 0.6s both;
        }
        .rays {
          position: absolute;
          left: 50%;
          top: 38%;
          width: 220vmax;
          height: 220vmax;
          transform: translate(-50%, -50%);
          background: repeating-conic-gradient(from 0deg, rgba(255, 255, 255, 0.34) 0 7deg, rgba(255, 255, 255, 0) 7deg 18deg);
          animation: finSpin 60s linear infinite;
          opacity: 0.55;
          transition: opacity 1s;
        }
        .fin.cut .rays {
          opacity: 1;
        }
        .cloud {
          position: absolute;
          background: #fff;
          border-radius: 999px;
          opacity: 0.85;
          filter: blur(0.3px);
        }
        .cloud::before, .cloud::after {
          content: "";
          position: absolute;
          background: #fff;
          border-radius: 50%;
        }
        .cloud::before {
          width: 55%;
          height: 160%;
          left: 15%;
          top: -70%;
        }
        .cloud::after {
          width: 40%;
          height: 130%;
          right: 12%;
          top: -45%;
        }
        .fin-stage {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 1200px;
          height: 780px;
          transform-origin: 50% 100%;
        }
        .bunting {
          position: absolute;
          left: 40px;
          top: 60px;
          width: 1120px;
          height: 90px;
        }
        .banner {
          position: absolute;
          left: 180px;
          top: 150px;
          width: 840px;
          height: 118px;
          transform-origin: 50% -60px;
          animation: finSway 4s ease-in-out infinite;
        }
        .banner svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .banner .bname {
          position: absolute;
          left: 90px;
          right: 90px;
          top: 18px;
          height: 74px;
          display: grid;
          place-items: center;
          text-align: center;
          color: #fff;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1;
          white-space: nowrap;
        }
        .banner .bkick {
          position: absolute;
          left: 0;
          right: 0;
          top: -34px;
          text-align: center;
        }
        .banner .bkick span {
          display: inline-block;
          background: #33CC33;
          color: #052E16;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-radius: 999px;
          padding: 6px 16px;
          box-shadow: 0 8px 18px -10px rgba(0, 0, 0, 0.5);
        }
        .fin.cut .banner {
          animation: finSway 1.4s ease-in-out infinite;
        }
        .building {
          position: absolute;
          left: 250px;
          top: 250px;
          width: 700px;
          height: 420px;
        }
        .crew-f {
          position: absolute;
          bottom: 92px;
          height: 175px;
          transform-origin: 50% 100%;
          animation: finIdle 3s ease-in-out infinite;
          filter: drop-shadow(0 14px 12px rgba(0, 0, 0, 0.18));
        }
        .fin.cut .crew-f {
          animation: finParty 0.62s ease-in-out infinite;
        }
        .ribbon {
          position: absolute;
          top: 560px;
          height: 30px;
          background: linear-gradient(180deg, #F25A5E 0%, #E23B3F 45%, #B9262A 100%);
          box-shadow: 0 6px 12px -6px rgba(120, 0, 0, 0.6);
          z-index: 5;
          transition: transform 1.1s cubic-bezier(0.3, 1.4, 0.5, 1);
        }
        .ribbon.l {
          left: 120px;
          width: 480px;
          transform-origin: 0 50%;
          border-radius: 4px 0 0 4px;
        }
        .ribbon.r {
          left: 600px;
          width: 480px;
          transform-origin: 100% 50%;
          border-radius: 0 4px 4px 0;
        }
        .fin.cut .ribbon.l {
          transform: rotate(68deg) scaleX(0.42);
        }
        .fin.cut .ribbon.r {
          transform: rotate(-68deg) scaleX(0.42);
        }
        .post {
          position: absolute;
          top: 520px;
          width: 26px;
          height: 200px;
          border-radius: 13px 13px 4px 4px;
          background: linear-gradient(90deg, #B98410, #F7CF55 45%, #C58F17);
          z-index: 6;
        }
        .post::before {
          content: "";
          position: absolute;
          left: -9px;
          top: -30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #FFE89A, #E1A51F 60%, #A8740C);
        }
        .post::after {
          content: "";
          position: absolute;
          left: -26px;
          bottom: -10px;
          width: 78px;
          height: 20px;
          border-radius: 50%;
          background: #C08A15;
        }
        .bow {
          position: absolute;
          left: 540px;
          top: 528px;
          width: 120px;
          height: 110px;
          z-index: 7;
          transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.9s;
        }
        .fin.cut .bow {
          transform: translate(-30px, -160px) rotate(-200deg) scale(0.6);
          opacity: 0;
        }
        .cutter {
          position: absolute;
          left: 620px;
          bottom: 96px;
          width: 200px;
          z-index: 8;
        }
        .cutter img {
          width: 170px;
          display: block;
          transform-origin: 50% 100%;
          animation: finIdle 2.6s ease-in-out infinite;
          filter: drop-shadow(0 14px 12px rgba(0, 0, 0, 0.2));
        }
        .fin.cut .cutter img {
          animation: finParty 0.55s ease-in-out infinite;
        }
        .scissors {
          position: absolute;
          left: -118px;
          top: 44px;
          width: 150px;
          height: 100px;
          z-index: 9;
          transform: rotate(-12deg);
        }
        .scissors :global(.blade-a) {
          transform-origin: 76px 50px;
          transform: rotate(-16deg);
          transition: transform 0.18s;
        }
        .scissors :global(.blade-b) {
          transform-origin: 76px 50px;
          transform: rotate(16deg);
          transition: transform 0.18s;
        }
        .scissors:global(.snip) :global(.blade-a),
        .scissors:global(.snip) :global(.blade-b) {
          transform: rotate(0);
        }
        .fin.cut .scissors {
          opacity: 0;
          transition: opacity 0.6s 0.5s;
        }
        .fin-ui {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(18px + env(safe-area-inset-top, 0px));
          display: flex;
          justify-content: center;
          padding-left: max(16px, env(safe-area-inset-left, 0px));
          padding-right: max(16px, env(safe-area-inset-right, 0px));
          z-index: 20;
          pointer-events: none;
        }
        .fin-say {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          border-radius: 24px;
          padding: 12px 16px 12px 14px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25);
          max-width: 680px;
          animation: finCardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .count-big {
          position: absolute;
          left: 50%;
          top: 44%;
          transform: translate(-50%, -50%);
          z-index: 30;
          font-size: min(34vw, 260px);
          font-weight: 900;
          color: #fff;
          -webkit-text-stroke: 6px #003333;
          paint-order: stroke fill;
          pointer-events: none;
          animation: finCountPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          text-shadow: 0 18px 30px rgba(0, 51, 51, 0.35);
        }
        .recap {
          position: absolute;
          z-index: 25;
          right: max(16px, env(safe-area-inset-right, 0px));
          top: calc(84px + env(safe-area-inset-top, 0px));
          bottom: 16px;
          width: min(420px, calc(100vw - 32px));
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 50px 100px -40px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: finSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .recap-h {
          padding: 20px 22px 14px;
          background: #EAF7EE;
        }
        .recap-b {
          flex: 1;
          overflow-y: auto;
          padding: 14px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .recap-f {
          padding: 14px 22px 18px;
          border-top: 1px solid #F0F0F0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .rrow {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
          padding: 8px 0;
          border-bottom: 1px solid #F3F3F3;
        }
        .rrow span {
          color: #718096;
        }
        .rrow b {
          text-align: right;
          font-weight: 600;
          color: #1A202C;
        }
        .btn-coci {
          background: #33CC33;
          color: #052E16;
          font-weight: 700;
          border: none;
          border-radius: 999px;
          padding: 10px 20px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          transition: transform 0.15s, filter 0.15s;
        }
        .btn-coci:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .btn-coci:active {
          transform: translateY(1px);
        }
        .btn-line {
          background: #fff;
          border: 1px solid #E2E8F0;
          color: #1A202C;
          font-weight: 600;
          border-radius: 999px;
          padding: 8px 16px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          transition: background 0.15s;
        }
        .btn-line:hover {
          background: #F8FAFC;
        }

        @keyframes finFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes finSpin { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes finSway { 0%, 100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
        @keyframes finIdle { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-5px) rotate(-1.5deg); } }
        @keyframes finParty {
          0%, 100% { transform: translateY(0) scale(1,1); }
          20% { transform: translateY(0) scale(1.06, 0.92); }
          55% { transform: translateY(-46px) scale(0.96, 1.05) rotate(-4deg); }
          80% { transform: translateY(0) scale(1.04, 0.95); }
        }
        @keyframes finCountPop {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
          60% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes finSlideIn {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: none; opacity: 1; }
        }
        @keyframes finCardIn {
          from { opacity: 0; transform: translateY(40px) rotateX(18deg) scale(0.94); }
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 640px) {
          .recap {
            top: auto;
            height: 60%;
            right: 12px;
            left: 12px;
            width: auto;
            bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
};

