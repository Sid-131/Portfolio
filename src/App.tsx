import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SnakeGame from './components/SnakeGame';
import { Ticker } from './components/Ticker';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-cream text-deep overflow-x-hidden">
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SnakeGame />
        <Ticker />
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
