import { useCallback, useEffect, useRef, useState, type TouchEvent as RTouch } from 'react';
import { Close } from './Icons';

const N = 20;          // grid cells per side
const PX = 20;         // canvas px per cell (canvas is scaled by CSS)
type Pt = { x: number; y: number };
type Dir = 'U' | 'D' | 'L' | 'R';
const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };

const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

export function Snake({ onClose }: { onClose: () => void }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const snake = useRef<Pt[]>([{ x: 10, y: 10 }]);
  const dir = useRef<Dir>('R');
  const next = useRef<Dir>('R');
  const food = useRef<Pt>({ x: 5, y: 5 });
  const dead = useRef(false);
  const touch = useRef<Pt | null>(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  const steer = (d: Dir) => { if (d !== OPP[dir.current]) next.current = d; };

  const draw = useCallback(() => {
    const ctx = cv.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = css('--bg-2');
    ctx.fillRect(0, 0, N * PX, N * PX);
    ctx.fillStyle = css('--line-2');
    for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) ctx.fillRect(x * PX + PX / 2 - 1, y * PX + PX / 2 - 1, 2, 2);
    ctx.fillStyle = css('--ok');
    ctx.fillRect(food.current.x * PX + 5, food.current.y * PX + 5, PX - 10, PX - 10);
    const accent = css('--accent');
    snake.current.forEach((s, i) => {
      ctx.globalAlpha = i === 0 ? 1 : 0.45 + 0.55 * (1 - i / snake.current.length);
      ctx.fillStyle = accent;
      ctx.fillRect(s.x * PX + 1, s.y * PX + 1, PX - 2, PX - 2);
    });
    ctx.globalAlpha = 1;
  }, []);

  const reset = useCallback(() => {
    snake.current = [{ x: 10, y: 10 }];
    dir.current = 'R'; next.current = 'R';
    food.current = { x: 5, y: 5 };
    dead.current = false;
    setScore(0); setOver(false);
    draw();
  }, [draw]);

  useEffect(() => {
    reset();
    const keys: Record<string, Dir> = { ArrowUp: 'U', w: 'U', W: 'U', ArrowDown: 'D', s: 'D', S: 'D', ArrowLeft: 'L', a: 'L', A: 'L', ArrowRight: 'R', d: 'R', D: 'R' };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      const d = keys[e.key];
      if (!d) return;
      e.preventDefault(); e.stopPropagation();
      steer(d);
    };
    window.addEventListener('keydown', onKey, { capture: true });

    const t = window.setInterval(() => {
      if (dead.current) return;
      dir.current = next.current;
      const h = { ...snake.current[0] };
      if (dir.current === 'U') h.y--;
      if (dir.current === 'D') h.y++;
      if (dir.current === 'L') h.x--;
      if (dir.current === 'R') h.x++;
      if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || snake.current.some(s => s.x === h.x && s.y === h.y)) {
        dead.current = true; setOver(true); draw(); return;
      }
      const ate = h.x === food.current.x && h.y === food.current.y;
      snake.current = [h, ...snake.current.slice(0, ate ? undefined : -1)];
      if (ate) {
        let p: Pt;
        do { p = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) }; }
        while (snake.current.some(s => s.x === p.x && s.y === p.y));
        food.current = p;
        setScore(n => n + 1);
      }
      draw();
    }, 130);

    return () => { window.clearInterval(t); window.removeEventListener('keydown', onKey, { capture: true }); };
  }, [reset, draw, onClose]);

  const onTouchStart = (e: RTouch) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e: RTouch) => {
    const s = touch.current; touch.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U'));
  };

  return (
    <div className="snake" role="dialog" aria-modal="true" aria-label="Snake game">
      <div className="snake__head">
        <span>Score <b>{String(score).padStart(3, '0')}</b></span>
        <button className="iconbtn" onClick={onClose} aria-label="Close game"><Close /></button>
      </div>
      <div className="snake__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas ref={cv} width={N * PX} height={N * PX} aria-label="Game board" />
        {over && (
          <div className="snake__over">
            <p>Game over</p>
            <button className="btn btn--solid btn--sm" onClick={reset} autoFocus>Play again</button>
          </div>
        )}
      </div>
      <div className="pad" aria-label="Direction controls">
        <button className="u" onClick={() => steer('U')} aria-label="Up">↑</button>
        <button className="l" onClick={() => steer('L')} aria-label="Left">←</button>
        <button className="d" onClick={() => steer('D')} aria-label="Down">↓</button>
        <button className="r" onClick={() => steer('R')} aria-label="Right">→</button>
      </div>
      <p className="snake__hint">Arrow keys or WASD. Swipe on touch screens. Esc to exit.</p>
    </div>
  );
}
