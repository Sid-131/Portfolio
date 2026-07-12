import { useState, useEffect } from 'react';
import { GrainOverlay }  from './components/effects/GrainOverlay';
import { MeshBlobs }     from './components/effects/MeshBlobs';
import { CustomCursor }  from './components/effects/CustomCursor';
import { Loader }        from './components/effects/Loader';
import { Header }        from './components/chrome/Header';
import { CircularMenu }  from './components/chrome/CircularMenu';
import { SectionDots }   from './components/chrome/SectionDots';
import { SnakeGame }     from './components/chrome/SnakeGame';
import { FloatingCards } from './components/chrome/FloatingCards';
import { Hero }          from './components/sections/Hero';
import { About }         from './components/sections/About';
import { Work }          from './components/sections/Work';
import { Contact }       from './components/sections/Contact';

export default function App() {
  const [loaded,    setLoaded] = useState(false);
  const [menuOpen,  setMenu]   = useState(false);
  const [snakeOpen, setSnake]  = useState(false);

  // G opens the snake game from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (snakeOpen || menuOpen) return;
      if (e.key === 'g' || e.key === 'G') setSnake(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [snakeOpen, menuOpen]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ position: 'relative', background: '#080808', minHeight: '100vh' }}>
      <CustomCursor />
      <GrainOverlay />
      <MeshBlobs />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Header onMenu={() => setMenu(true)} />
      <CircularMenu open={menuOpen} onClose={() => setMenu(false)} onGo={go} />
      <SnakeGame open={snakeOpen} onClose={() => setSnake(false)} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero active={loaded} onNext={() => go('about')} />
        <About />
        <Work />
        <Contact onSnake={() => setSnake(true)} />
      </main>

      {loaded && <SectionDots />}
      {loaded && <FloatingCards onSnake={() => setSnake(true)} />}
    </div>
  );
}
