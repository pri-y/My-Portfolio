import { Navbar, Hero, About, Skills, Experience, Projects, Contact, Reviews, Footer } from './components';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#0B192C] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
