import { GhostCursor } from './components/GhostCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      <GhostCursor
        color="#B19EEF"
        brightness={1.2}
        edgeIntensity={0}
        trailLength={20}
        inertia={0.4}
        grainIntensity={0.05}
        bloomStrength={0.5}
        bloomRadius={0.7}
        bloomThreshold={0}
        fadeDelayMs={200}
        fadeDurationMs={1000}
        zIndex={10}
      />

      <main>
        <Hero />
        <div className="mx-auto max-w-5xl px-6">
          <hr className="border-border" />
        </div>
        <About />
        <div className="mx-auto max-w-5xl px-6">
          <hr className="border-border" />
        </div>
        <Experience />
        <div className="mx-auto max-w-5xl px-6">
          <hr className="border-border" />
        </div>
        <Projects />
        <div className="mx-auto max-w-5xl px-6">
          <hr className="border-border" />
        </div>
        <Skills />
        <div className="mx-auto max-w-5xl px-6">
          <hr className="border-border" />
        </div>
        <Contact />
      </main>
    </div>
  );
}

export default App;
