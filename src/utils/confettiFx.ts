// Celebratory Confetti Particle System from Carecentriq Guided Setup
// Renders vibrant streamers, circles, and paper bursts on a transparent canvas overlay.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: 'rect' | 'circle' | 'streamer';
  col: string;
  w: number;
  h: number;
  rot: number;
  vr: number;
  flip: number;
  vf: number;
  wob: number;
  life: number;
  max: number;
}

const COLORS = [
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

class ConfettiFX {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private raf: number = 0;
  private lastTime: number = 0;
  private dpr: number = 1;
  private W: number = 0;
  private H: number = 0;

  private init() {
    if (typeof window === 'undefined') return;
    if (this.canvas) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'carecentriq-fx';
    this.canvas.style.position = 'fixed';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    if (!this.canvas) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.canvas.width = this.W * this.dpr;
    this.canvas.height = this.H * this.dpr;
  }

  private addParticle(x: number, y: number, vx: number, vy: number, kind?: 'rect' | 'circle' | 'streamer') {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)];
    const chosenKind =
      kind || (Math.random() < 0.14 ? 'streamer' : Math.random() < 0.3 ? 'circle' : 'rect');
    this.particles.push({
      x,
      y,
      vx,
      vy,
      kind: chosenKind,
      col,
      w: 6 + Math.random() * 7,
      h: 9 + Math.random() * 9,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 12,
      flip: Math.random() * 6.28,
      vf: 4 + Math.random() * 8,
      wob: Math.random() * 6.28,
      life: 0,
      max: 3.5 + Math.random() * 2.5,
    });
  }

  public burst(x?: number, y?: number, n: number = 60, power: number = 380) {
    this.init();
    const bx = x !== undefined ? x : window.innerWidth / 2;
    const by = y !== undefined ? y : window.innerHeight * 0.45;
    for (let i = 0; i < n; i++) {
      const angle = (-90 + (Math.random() - 0.5) * 140) * (Math.PI / 180);
      const speed = power * (0.55 + Math.random() * 0.6);
      this.addParticle(bx, by, Math.cos(angle) * speed, Math.sin(angle) * speed);
    }
    this.startLoop();
  }

  public rain(n: number = 180, durationSeconds: number = 3) {
    this.init();
    let tickCount = 0;
    const totalTicks = durationSeconds * 60;
    const perTick = n / totalTicks;
    const interval = setInterval(() => {
      for (let i = 0; i < perTick; i++) {
        this.addParticle(
          Math.random() * this.W,
          -20,
          (Math.random() - 0.5) * 60,
          40 + Math.random() * 120
        );
      }
      this.startLoop();
      tickCount++;
      if (tickCount >= totalTicks) clearInterval(interval);
    }, 16);
  }

  private startLoop() {
    if (!this.raf) {
      this.lastTime = performance.now();
      this.raf = requestAnimationFrame((now) => this.loop(now));
    }
  }

  private loop(now: number) {
    if (!this.ctx || !this.canvas) return;
    const dt = Math.min(0.033, (now - this.lastTime) / 1000);
    this.lastTime = now;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.clearRect(0, 0, this.W, this.H);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
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

      if (p.y > this.H + 40 || p.life > p.max) {
        this.particles.splice(i, 1);
        continue;
      }

      const alpha = Math.min(1, (p.max - p.life) * 1.5);
      this.ctx.globalAlpha = alpha;
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rot);
      this.ctx.fillStyle = p.col;

      if (p.kind === 'circle') {
        this.ctx.beginPath();
        this.ctx.ellipse(
          0,
          0,
          p.w * 0.45,
          p.w * 0.45 * Math.abs(Math.cos(p.flip)) + 0.5,
          0,
          0,
          6.28
        );
        this.ctx.fill();
      } else if (p.kind === 'streamer') {
        this.ctx.strokeStyle = p.col;
        this.ctx.lineWidth = 3.2;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        for (let k = 0; k <= 6; k++) {
          const yy = k * 5;
          const xx = Math.sin(p.flip + k * 0.9) * 5;
          if (k === 0) this.ctx.moveTo(xx, yy);
          else this.ctx.lineTo(xx, yy);
        }
        this.ctx.stroke();
      } else {
        this.ctx.scale(1, Math.cos(p.flip));
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      this.ctx.restore();
    }

    this.ctx.globalAlpha = 1;
    if (this.particles.length > 0) {
      this.raf = requestAnimationFrame((n) => this.loop(n));
    } else {
      this.raf = 0;
      this.ctx.clearRect(0, 0, this.W, this.H);
    }
  }
}

export const Confetti = new ConfettiFX();
