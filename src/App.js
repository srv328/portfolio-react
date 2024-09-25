import React from "react";
import Header from "./components/Header";
import Activity from "./components/Activity";
import ProfileImage from "./components/ProfileImage";
import SocialLinks from "./components/SocialLinks";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ExpandableSection from "./components/ExpandableSection";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <div class="container">
        <ProfileImage />
        <SocialLinks />
        <AboutMe />
        <ExpandableSection title="Деятельность">
          <Activity />
        </ExpandableSection>
        <ExpandableSection title="Опыт работы">
          <Experience />
        </ExpandableSection>
        <ExpandableSection title="Навыки и технологии">
          <Skills />
        </ExpandableSection>
        <Projects />
      </div>
      <Footer />
    </div>
  );
}

export default App;
