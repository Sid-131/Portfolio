import { useState, useEffect, useRef, useCallback } from 'react';
import { ORANGE, EASE, cab, mono } from '../../data';

const CELL  = 20;
const GCOLS = 20;
const GROWS = 20;

type Pt  = { x: number; y: number };
type Dir = 'U' | 'D' | 'L' | 'R';

export function SnakeGame({ open, onClose }: { open: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake     = useRef<Pt[]>([{ x: 10, y: 10 }]);
  const dir       = useRef<Dir>('R');
  const nextDir   = useRef<Dir>('R');
  const food      = useRef<Pt>({ x: 5, y: 5 });
  const running   = useRef(false);
  const deadRef   = useRef(false);
  const [score, setScore]   = useState(0);
  const [isDead, setIsDead] = useState(false);

  const rndFood = (s: Pt[]): Pt => {
    let p: Pt;
    do { p = { x: Math.floor(Math.random() * GCOLS), y: Math.floor(Math.random() * GROWS) }; }
    while (s.some(q => q.x === p.x && q.y === p.y));
    return p;
  };

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, GCOLS * CELL, GROWS * CELL);

    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x = 0; x < GCOLS; x++)
      for (let y = 0; y < GROWS; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);

    ctx.shadowColor = '#fff';
    ctx.shadowBlur  = 12;
    ctx.fillStyle   = '#fff';
    ctx.fillRect(food.current.x * CELL + 5, food.current.y * CELL + 5, CELL - 10, CELL - 10);
    ctx.shadowBlur  = 0;

    const len = snake.current.length;
    snake.current.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : 0.35 + (0.65 * (len - i) / len);
      ctx.fillStyle = i === 0 ? ORANGE : `rgba(255,77,0,${alpha})`;
      if (i === 0) { ctx.shadowColor = ORANGE; ctx.shadowBlur = 14; }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      ctx.shadowBlur = 0;
    });
  }, []);

  const reset = useCallback(() => {
    snake.current   = [{ x: 10, y: 10 }];
    dir.current     = 'R';
    nextDir.current = 'R';
    food.current    = { x: 5, y: 5 };
    running.current = true;
    deadRef.current = false;
    setScore(0);
    setIsDead(false);
    draw();
  }, [draw]);

  useEffect(() => {
    if (!open) return;
    reset();

    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'U', w: 'U', W: 'U',
        ArrowDown: 'D', s: 'D', S: 'D',
        ArrowLeft: 'L', a: 'L', A: 'L',
        ArrowRight: 'R', d: 'R', D: 'R',
      };
      const d = map[e.key];
      if (!d) return;
      e.stopPropagation();
      e.preventDefault();
      const opp: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
      if (d !== opp[dir.current]) nextDir.current = d;
    };
    window.addEventListener('keydown', onKey, { capture: true });

    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);

    const tick = setInterval(() => {
      if (!running.current || deadRef.current) return;
      dir.current = nextDir.current;
      const head = { ...snake.current[0] };
      if (dir.current === 'U') head.y--;
      if (dir.current === 'D') head.y++;
      if (dir.current === 'L') head.x--;
      if (dir.current === 'R') head.x++;

      if (
        head.x < 0 || head.x >= GCOLS ||
        head.y < 0 || head.y >= GROWS ||
        snake.current.some(s => s.x === head.x && s.y === head.y)
      ) {
        deadRef.current = true;
        running.current = false;
        setIsDead(true);
        draw();
        return;
      }

      const ate = head.x === food.current.x && head.y === food.current.y;
      snake.current = [head, ...snake.current.slice(0, ate ? undefined : -1)];
      if (ate) { food.current = rndFood(snake.current); setScore(p => p + 1); }
      draw();
    }, 130);

    return () => {
      clearInterval(tick);
      window.removeEventListener('keydown', onKey, { capture: true });
      window.removeEventListener('keydown', onEsc);
    };
  }, [open, reset, draw, onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: `opacity 0.4s ${EASE}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: GCOLS * CELL, marginBottom: 14 }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.45em', color: ORANGE, textTransform: 'uppercase' }}>
          {String(score).padStart(3, '0')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
            WASD / ARROWS
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 22, lineHeight: 1, transition: `color 0.2s` }}
            onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            data-cur
          >×</button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} width={GCOLS * CELL} height={GROWS * CELL}
          style={{ display: 'block', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }} />
        {isDead && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(8,8,8,0.85)', borderRadius: 10,
          }}>
            <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 56, color: ORANGE, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>GAME OVER</p>
            <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.45em', margin: '12px 0 0', textTransform: 'uppercase' }}>
              SCORE — {String(score).padStart(3, '0')}
            </p>
            <button onClick={reset} style={{
              marginTop: 28, fontFamily: mono, fontSize: 10, letterSpacing: '0.5em',
              textTransform: 'uppercase', color: '#080808', background: ORANGE,
              border: 'none', cursor: 'none', padding: '10px 28px', borderRadius: 6,
            }} data-cur>PLAY AGAIN</button>
          </div>
        )}
      </div>

      <p style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.14)', letterSpacing: '0.4em', marginTop: 14, textTransform: 'uppercase' }}>
        ESC TO EXIT
      </p>
    </div>
  );
}
