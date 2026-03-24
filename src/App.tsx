import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SnakeGame from './components/SnakeGame';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Contact from './components/Contact';

const BubbleBackground3D = lazy(() => import('./components/BubbleBackground3D'));

function App() {
  return (
    <div className="relative min-h-screen bg-cream text-deep overflow-x-hidden">
      <Suspense fallback={
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'linear-gradient(160deg, #B8DCF0 0%, #cce8d8 55%, #a8d4b8 100%)' }} />
      }>
        <BubbleBackground3D />
      </Suspense>
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SnakeGame />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
