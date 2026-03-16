import { useEffect, useRef, useState, useCallback } from 'react';

const GRID = 20;
const CELL = 20;
const SIZE = GRID * CELL;

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt = { x: number; y: number };
type Status = 'idle' | 'playing' | 'over';

function randomFood(snake: Pt[]): Pt {
  let p: Pt;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const snakeRef = useRef<Pt[]>([]);
  const dirRef = useRef<Dir>('RIGHT');
  const nextDirRef = useRef<Dir>('RIGHT');
  const foodRef = useRef<Pt>({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statusRef = useRef<Status>('idle');

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Sky-tinted canvas background
    ctx.fillStyle = '#EBF4FA';
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Grid lines
    ctx.strokeStyle = 'rgba(43,64,53,0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }

    // Food — nokia green circle
    const f = foodRef.current;
    ctx.fillStyle = '#3D8B37';
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();

    // Snake — deep green with fade
    snakeRef.current.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.3, 1 - i * 0.025);
      ctx.fillStyle = i === 0 ? '#2B4035' : `rgba(43,64,53,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 4);
      ctx.fill();
    });
  }, []);

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    statusRef.current = 'over';
    setStatus('over');
    setBest(prev => Math.max(prev, scoreRef.current));
  }, []);

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const nh: Pt = {
      x: head.x + (dirRef.current === 'RIGHT' ? 1 : dirRef.current === 'LEFT' ? -1 : 0),
      y: head.y + (dirRef.current === 'DOWN' ? 1 : dirRef.current === 'UP' ? -1 : 0),
    };
    if (nh.x < 0 || nh.x >= GRID || nh.y < 0 || nh.y >= GRID) { endGame(); return; }
    if (snakeRef.current.some(s => s.x === nh.x && s.y === nh.y)) { endGame(); return; }
    const newSnake = [nh, ...snakeRef.current];
    if (nh.x === foodRef.current.x && nh.y === foodRef.current.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      foodRef.current = randomFood(newSnake);
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
    draw();
  }, [draw, endGame]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    foodRef.current = randomFood(snakeRef.current);
    scoreRef.current = 0;
    setScore(0);
    statusRef.current = 'playing';
    setStatus('playing');
    draw();
    timerRef.current = setInterval(tick, 120);
  }, [draw, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      const d = dirRef.current;
      if (e.key === 'ArrowUp' && d !== 'DOWN') nextDirRef.current = 'UP';
      else if (e.key === 'ArrowDown' && d !== 'UP') nextDirRef.current = 'DOWN';
      else if (e.key === 'ArrowLeft' && d !== 'RIGHT') nextDirRef.current = 'LEFT';
      else if (e.key === 'ArrowRight' && d !== 'LEFT') nextDirRef.current = 'RIGHT';
      else if (e.key === 'Enter' && statusRef.current !== 'playing') startGame();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startGame]);

  useEffect(() => {
    draw();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [draw]);

  const handleDpad = (d: Dir) => {
    const cur = dirRef.current;
    if (d === 'UP' && cur !== 'DOWN') nextDirRef.current = 'UP';
    else if (d === 'DOWN' && cur !== 'UP') nextDirRef.current = 'DOWN';
    else if (d === 'LEFT' && cur !== 'RIGHT') nextDirRef.current = 'LEFT';
    else if (d === 'RIGHT' && cur !== 'LEFT') nextDirRef.current = 'RIGHT';
  };

  const btnStyle = {
    border: '1px solid rgba(43,64,53,0.15)',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(8px)',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
    fontSize: 14,
    color: '#2B4035',
    userSelect: 'none' as const,
  };

  return (
    <section id="game" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <span className="section-label">Interactive</span>
      <h2
        className="mb-12 font-display italic font-bold text-deep"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
      >
        While You're Here
      </h2>

      <div className="flex flex-col items-center gap-6">
        <div className="glass-card relative p-6">
          {/* HUD */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-deep/40">Nokia Snake v1.0</span>
            <div className="flex gap-4">
              {best > 0 && <span className="font-mono text-[10px] text-deep/40">Best: {best}</span>}
              <span className="font-mono text-[10px] text-deep"># {score}</span>
            </div>
          </div>

          {/* Canvas */}
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '8px', border: '1px solid rgba(43,64,53,0.12)' }}
          >
            <canvas ref={canvasRef} width={SIZE} height={SIZE} className="block" />

            {/* Idle overlay */}
            {status === 'idle' && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.82)' }}
              >
                <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-deep/40">Classic Nokia Snake</p>
                <button onClick={startGame} className="pill-btn">Start Game</button>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-wider text-deep/30">
                  Arrow keys or D-pad · Enter to start
                </p>
              </div>
            )}

            {/* Game over overlay */}
            {status === 'over' && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.88)' }}
              >
                <p className="mb-1 font-mono text-[11px] uppercase tracking-wider" style={{ color: '#3D8B37' }}>
                  Game Over
                </p>
                <p className="mb-1 font-display italic text-5xl font-bold text-deep">{score}</p>
                <p className="mb-8 font-mono text-[9px] uppercase tracking-wider text-deep/40">points scored</p>
                <div className="flex flex-col items-center gap-3">
                  <a href="#about" className="pill-btn">Check My Profile ↓</a>
                  <button
                    onClick={startGame}
                    className="font-body text-sm text-deep/45 transition-colors hover:text-deep"
                    style={{
                      borderRadius: '100px',
                      border: '1.5px solid rgba(43,64,53,0.2)',
                      padding: '8px 24px',
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* D-pad */}
          <div className="mt-5 flex flex-col items-center gap-1">
            <div className="flex justify-center">
              <button style={btnStyle} onPointerDown={() => handleDpad('UP')} aria-label="Up">▲</button>
            </div>
            <div className="flex gap-1">
              <button style={btnStyle} onPointerDown={() => handleDpad('LEFT')} aria-label="Left">◀</button>
              <button style={{ ...btnStyle, background: 'transparent', border: 'none', cursor: 'default' }} />
              <button style={btnStyle} onPointerDown={() => handleDpad('RIGHT')} aria-label="Right">▶</button>
            </div>
            <div className="flex justify-center">
              <button style={btnStyle} onPointerDown={() => handleDpad('DOWN')} aria-label="Down">▼</button>
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-wider text-deep/30">
            Eat food to grow · Avoid walls & yourself
          </p>
        </div>
      </div>
    </section>
  );
}
