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
