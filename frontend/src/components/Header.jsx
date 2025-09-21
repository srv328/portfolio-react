import { Nav, Button } from "react-bootstrap";
import {
  FaGithub,
  FaEnvelope,
  FaTelegramPlane,
  FaExternalLinkAlt,
  FaSun,
  FaMoon,
  FaUser,
  FaCode,
  FaBriefcase,
  FaProjectDiagram,
  FaBars,
  FaComments,
} from "react-icons/fa";
import { smoothScrollTo } from "../utils/smoothScroll";
import "./css/Header.css";
import { useEffect, useState } from "react";

const Header = ({ isDarkMode, toggleTheme, isScrolled, toggleMobileMenu }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === "contact" || sectionId === "contact-form") {
      smoothScrollTo("contact-form");
    } else {
      smoothScrollTo(sectionId);
    }
  };

  const NavigationLinks = () => (
    <div className="navigation-links">
      <Nav className="justify-content-center">
        {[
          { id: "about", icon: FaUser, text: "О себе" },
          { id: "skills", icon: FaCode, text: "Навыки" },
          { id: "experience", icon: FaBriefcase, text: "Опыт" },
          { id: "projects", icon: FaProjectDiagram, text: "Проекты" },
          { id: "contact-form", icon: FaComments, text: "Связаться" },
        ].map(({ id, icon: Icon, text }) => (
          <Nav.Link
            onClick={() => scrollToSection(id)}
            className="nav-link"
            key={id}
          >
            <div className="nav-link-content">
              <Icon className="nav-icon" />
              {text && <span className="nav-text">{text}</span>}
            </div>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );

  const SocialLinks = () => (
    <div className="social-links">
      <Nav className="justify-content-center">
        {[
          {
            href: "https://github.com/srv328",
            icon: FaGithub,
            text: isMobile ? "" : "GitHub",
          },
          {
            href: "https://t.me/shevelev_rv",
            icon: FaTelegramPlane,
            text: isMobile ? "" : "Telegram",
          },
          {
            href: "mailto:shevelev.rv328@gmail.com",
            icon: FaEnvelope,
            text: isMobile ? "" : "Почта",
          },
        ].map(({ href, icon: Icon, text }) => (
          <Nav.Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            key={href}
          >
            <div className="social-link-content">
              <Icon className="social-icon" />
              {text && <span className="social-text">{text}</span>}
              {!isMobile && <FaExternalLinkAlt className="external-icon" />}
            </div>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );

  return (
    <header
      className={`header ${isDarkMode ? "dark-mode" : "light-mode"} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="header-content">
        {isMobile ? (
          <div className="header-top">
            <SocialLinks />
            <button
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Открыть меню"
            >
              <FaBars />
            </button>
          </div>
        ) : (
          <div className="header-desktop">
            <div className="header-logo">
              <h1 className="header-title">srv328</h1>
            </div>
            <NavigationLinks />
            <Button
              variant={isDarkMode ? "light" : "dark"}
              onClick={toggleTheme}
              className="theme-toggle"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
