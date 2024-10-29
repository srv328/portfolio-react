import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from "./components/Header";
import About from './components/About';
import Skills from './components/Skills'
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <About isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
	  <Skills isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
	  <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
    </div>
  );
}

export default App;
