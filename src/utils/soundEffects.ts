// Web Audio API Sound Synthesizer from Carecentriq Guided Setup
// Provides crystal-clear native sound effects with zero audio file dependencies.

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('carecentriq_sound_enabled');
      this.enabled = saved !== null ? saved === 'true' : true;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('carecentriq_sound_enabled', String(val));
    }
    if (val) {
      this.chime();
    }
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private tone(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    gain: number = 0.03
  ) {
    const a = this.getContext();
    if (!a) return;
    try {
      const osc = a.createOscillator();
      const v = a.createGain();
      osc.type = type;
      osc.frequency.value = freq;

      v.gain.setValueAtTime(0, a.currentTime + startTime);
      v.gain.linearRampToValueAtTime(gain, a.currentTime + startTime + 0.02);
      v.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + startTime + duration);

      osc.connect(v).connect(a.destination);
      osc.start(a.currentTime + startTime);
      osc.stop(a.currentTime + startTime + duration + 0.04);
    } catch {
      // AudioContext safe fallback
    }
  }

  private noise(startTime: number, duration: number, gain: number = 0.025, freq: number = 1600) {
    const a = this.getContext();
    if (!a) return;
    try {
      const len = Math.floor(a.sampleRate * duration);
      const b = a.createBuffer(1, len, a.sampleRate);
      const ch = b.getChannelData(0);
      for (let i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      const s = a.createBufferSource();
      const f = a.createBiquadFilter();
      const v = a.createGain();
      s.buffer = b;
      f.type = 'lowpass';
      f.frequency.value = freq;
      v.gain.value = gain;
      s.connect(f).connect(v).connect(a.destination);
      s.start(a.currentTime + startTime);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Intermediate step sounds are muted so the experience remains focused and professional
  public tick() {}

  public chime() {}

  public step(_level: number = 1) {}

  public snip() {}

  public pop(_t: number = 0) {}

  // Grand celebration fanfare ONLY played on the final completion page
  public fanfare() {
    const n: [number, number][] = [
      [523, 0],
      [659, 0.1],
      [784, 0.2],
      [1047, 0.3],
      [784, 0.44],
      [1047, 0.55],
    ];
    n.forEach(([f, t]) => {
      this.tone(f, t, 0.35, 'sine', 0.04);
    });
    this.tone(1319, 0.7, 0.8, 'sine', 0.05);
  }
}

export const Sound = new SoundManager();

