import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import ParticlesBackground from "./components/ParticlesBackground";
import DigitalRain from "./components/DigitalRain";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode
      ? "bg-dark text-white"
      : "bg-light text-dark";

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DigitalRain isDarkMode={isDarkMode} />
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isScrolled={isScrolled}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileNavigation 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      <main className="sections-container">
        <section id="about" className="section about-section">
          <About isDarkMode={isDarkMode} />
        </section>
        <section id="skills" className="section skills-section">
          <Skills isDarkMode={isDarkMode} />
        </section>
        <section id="experience" className="section experience-section">
          <Experience isDarkMode={isDarkMode} />
        </section>
        <section id="projects" className="section projects-section">
          <Projects isDarkMode={isDarkMode} />
        </section>
      </main>
      <section id="contact">
        <Footer isDarkMode={isDarkMode} />
      </section>
    </div>
  );
}

export default App;
