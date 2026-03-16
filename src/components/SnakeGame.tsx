import { useEffect, useRef, useState, useCallback } from 'react';

const GRID = 20;
const CELL = 20;
const SIZE = GRID * CELL; // 400px

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

  // All mutable game state in refs — avoids stale closures
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

    // Background
    ctx.fillStyle = '#F7F7F5';
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Grid lines
    ctx.strokeStyle = 'rgba(58,58,56,0.07)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }

    // Food — coral square
    const f = foodRef.current;
    ctx.fillStyle = '#FF8C69';
    ctx.fillRect(f.x * CELL + 3, f.y * CELL + 3, CELL - 6, CELL - 6);

    // Snake
    snakeRef.current.forEach((seg, i) => {
      if (i === 0) {
        ctx.fillStyle = '#1A3C2B';
      } else {
        const alpha = Math.max(0.3, 1 - i * 0.025);
        ctx.fillStyle = `rgba(26,60,43,${alpha})`;
      }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
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

    // Wall collision
    if (nh.x < 0 || nh.x >= GRID || nh.y < 0 || nh.y >= GRID) { endGame(); return; }
    // Self collision
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

  // Keyboard controls
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

  // Initial draw + cleanup
  useEffect(() => {
    draw();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [draw]);

  // Mobile D-pad handler
  const handleDpad = (d: Dir) => {
    const cur = dirRef.current;
    if (d === 'UP' && cur !== 'DOWN') nextDirRef.current = 'UP';
    else if (d === 'DOWN' && cur !== 'UP') nextDirRef.current = 'DOWN';
    else if (d === 'LEFT' && cur !== 'RIGHT') nextDirRef.current = 'LEFT';
    else if (d === 'RIGHT' && cur !== 'LEFT') nextDirRef.current = 'RIGHT';
  };

  const btnStyle = {
    border: '1px solid rgba(58,58,56,0.2)',
    borderRadius: '2px',
    background: '#F7F7F5',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    color: '#1A3C2B',
    userSelect: 'none' as const,
  };

  return (
    <section id="game" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        // Interactive
      </div>
      <h2 className="mb-12 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        While You're Here
      </h2>

      <div className="flex flex-col items-center gap-6">
        {/* Game container */}
        <div
          className="relative bg-paper p-6"
          style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}
        >
          {/* Corner markers */}
          <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary" />
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary" />

          {/* HUD */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">
              Nokia Snake v1.0
            </span>
            <div className="flex gap-4">
              {best > 0 && (
                <span className="font-mono text-[10px] text-grid/40">
                  Best: {best}
                </span>
              )}
              <span className="font-mono text-[10px] text-primary">
                Score: {score}
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative" style={{ border: '1px solid rgba(58,58,56,0.15)' }}>
            <canvas ref={canvasRef} width={SIZE} height={SIZE} className="block" />

            {/* Idle overlay */}
            {status === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/92">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">
                  Classic Nokia Snake
                </p>
                <button
                  onClick={startGame}
                  className="bg-primary px-8 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
                  style={{ borderRadius: '2px' }}
                >
                  Start Game
                </button>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-grid/30">
                  Arrow keys or D-pad below · Enter to start
                </p>
              </div>
            )}

            {/* Game over overlay */}
            {status === 'over' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/95">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-coral">
                  Game Over
                </p>
                <p className="mb-1 font-heading text-5xl font-bold text-primary">{score}</p>
                <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.1em] text-grid/40">
                  points scored
                </p>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href="#about"
                    className="bg-primary px-8 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
                    style={{ borderRadius: '2px' }}
                  >
                    Check My Profile ↓
                  </a>
                  <button
                    onClick={startGame}
                    className="px-8 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50 transition-colors hover:text-primary"
                    style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* D-pad for mobile */}
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

          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-grid/30">
            Eat food to grow · Avoid walls & yourself
          </p>
        </div>
      </div>
    </section>
  );
}
