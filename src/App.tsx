import BubbleBackground from './components/BubbleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SnakeGame from './components/SnakeGame';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-cream text-deep overflow-x-hidden">
      <BubbleBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SnakeGame />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
