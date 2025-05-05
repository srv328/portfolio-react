import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import DigitalRain from "./components/DigitalRain";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DigitalRain isDarkMode={isDarkMode} />
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isScrolled={isScrolled}
      />
      <main className="sections-container">
        <section className="section about-section">
          <About isDarkMode={isDarkMode} />
        </section>
        <section className="section skills-section">
          <Skills isDarkMode={isDarkMode} />
        </section>
        <section className="section projects-section">
          <Projects isDarkMode={isDarkMode} />
        </section>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
