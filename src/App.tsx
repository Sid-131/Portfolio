import { GhostCursor } from './components/GhostCursor';
import MosaicBackground from './components/MosaicBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <hr className="border-0 border-t" style={{ borderColor: 'rgba(58, 58, 56, 0.2)' }} />
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-paper text-grid overflow-x-hidden">
      <MosaicBackground />
      <Navbar />

      <GhostCursor
        color="#1A3C2B"
        brightness={0.4}
        edgeIntensity={0}
        trailLength={20}
        inertia={0.4}
        grainIntensity={0.02}
        bloomStrength={0.2}
        bloomRadius={0.4}
        bloomThreshold={0.1}
        fadeDelayMs={300}
        fadeDurationMs={1200}
        mixBlendMode="multiply"
        zIndex={5}
      />

      <main className="relative z-10">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
    </div>
  );
}

export default App;
