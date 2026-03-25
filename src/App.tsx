import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import SnakeGame from './components/SnakeGame';
import { Ticker } from './components/Ticker';
import About from './components/About';
import Experience from './components/Experience';
import ScrollPinCards from './components/ScrollPinCards';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-cream text-deep overflow-x-hidden">
      <Preloader />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SnakeGame />
        <Ticker />
        <About />
        <Experience />
        <ScrollPinCards />
        <OpenSource />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
