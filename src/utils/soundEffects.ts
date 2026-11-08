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
    type: OscillatorType = 'triangle',
    gain: number = 0.18
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
      osc.stop(a.currentTime + startTime + duration + 0.05);
    } catch {
      // AudioContext safe fallback
    }
  }

  private noise(startTime: number, duration: number, gain: number = 0.4, freq: number = 1800) {
    const a = this.getContext();
    if (!a) return;
    try {
      const len = Math.floor(a.sampleRate * duration);
      const b = a.createBuffer(1, len, a.sampleRate);
      const ch = b.getChannelData(0);
      for (let i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      }
      const s = a.createBufferSource();
      const f = a.createBiquadFilter();
      const v = a.createGain();
      s.buffer = b;
      f.type = 'bandpass';
      f.frequency.value = freq;
      v.gain.value = gain;
      s.connect(f).connect(v).connect(a.destination);
      s.start(a.currentTime + startTime);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Sound effects
  public tick() {
    this.tone(880, 0, 0.12, 'sine', 0.08);
  }

  public chime() {
    [784, 988, 1175].forEach((f, i) => this.tone(f, i * 0.09, 0.5, 'sine', 0.14));
  }

  public step(level: number = 1) {
    [523, 659, 784, 1047]
      .slice(0, 2 + Math.min(2, level))
      .forEach((f, i) => this.tone(f, i * 0.1, 0.6, 'triangle', 0.16));
    this.noise(0, 0.25, 0.35, 2400);
  }

  public snip() {
    this.noise(0, 0.08, 0.6, 4200);
    this.noise(0.06, 0.06, 0.5, 3000);
  }

  public pop(t: number = 0) {
    this.noise(t, 0.18, 0.5, 900);
    this.noise(t + 0.02, 0.3, 0.25, 2600);
  }

  public fanfare() {
    const n: [number, number][] = [
      [523, 0],
      [659, 0.14],
      [784, 0.28],
      [1047, 0.42],
      [784, 0.62],
      [1047, 0.76],
    ];
    n.forEach(([f, t]) => {
      this.tone(f, t, 0.5, 'sawtooth', 0.07);
      this.tone(f, t, 0.7, 'triangle', 0.12);
    });
    this.tone(1319, 0.95, 1.4, 'triangle', 0.14);
    this.tone(1047, 0.95, 1.4, 'sine', 0.12);
    this.tone(784, 0.95, 1.4, 'sine', 0.1);
  }
}

export const Sound = new SoundManager();
