import { Nav, Button } from "react-bootstrap";
import {
  FaGithub,
  FaEnvelope,
  FaTelegramPlane,
  FaExternalLinkAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./css/Header.css";
import { useEffect, useState } from "react";

const Header = ({ isDarkMode, toggleTheme, isScrolled }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div className="header-top">
          {!isMobile && <h1 className="header-title">srv328</h1>}
          <SocialLinks />
          <Button
            variant={isDarkMode ? "light" : "dark"}
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
