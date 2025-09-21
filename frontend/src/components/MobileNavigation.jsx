import React, { useState, useEffect } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { FaTimes, FaUser, FaCode, FaProjectDiagram, FaBriefcase, FaSun, FaMoon, FaComments } from "react-icons/fa";
import { smoothScrollTo } from "../utils/smoothScroll";
import "./css/MobileNavigation.css";

const MobileNavigation = ({ isDarkMode, toggleTheme, isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'contact' || sectionId === 'contact-form') {
      smoothScrollTo("contact-form");
    } else {
      smoothScrollTo(sectionId);
    }
    onClose();
  };

  const navigationItems = [
    { id: "about", label: "О себе", icon: FaUser },
    { id: "skills", label: "Навыки", icon: FaCode },
    { id: "experience", label: "Опыт", icon: FaBriefcase },
    { id: "projects", label: "Проекты", icon: FaProjectDiagram },
    { id: "contact-form", label: "Связаться", icon: FaComments },
  ];

  if (!isMobile) {
    return null;
  }

  return (
    <Offcanvas
      show={isOpen}
      onHide={onClose}
      placement="end"
      className={`mobile-navigation ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
        <Offcanvas.Header className="mobile-nav-header">
          <Offcanvas.Title className="mobile-nav-title">
            srv328
          </Offcanvas.Title>
          <button
            className="mobile-close-button"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            <FaTimes />
          </button>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="mobile-nav-body">
          <Nav className="flex-column mobile-nav-list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Nav.Link
                  key={item.id}
                  className="mobile-nav-item"
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="mobile-nav-item-content">
                    <IconComponent className="mobile-nav-icon" />
                    <span className="mobile-nav-text">{item.label}</span>
                  </div>
                </Nav.Link>
              );
            })}
          </Nav>
          
          <div className="mobile-nav-footer">
            <div className="mobile-nav-social">
              <a
                href="https://github.com/srv328"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                GitHub
              </a>
              <a
                href="https://t.me/shevelev_rv"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                Telegram
              </a>
              <a
                href="mailto:shevelev.rv328@gmail.com"
                className="mobile-social-link"
              >
                Email
              </a>
            </div>
            
            <div className="mobile-theme-toggle">
              <button
                onClick={toggleTheme}
                className="mobile-theme-button"
                aria-label={isDarkMode ? "Переключить на светлую тему" : "Переключить на темную тему"}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
                <span className="mobile-theme-text">
                  {isDarkMode ? "Светлая тема" : "Темная тема"}
                </span>
              </button>
            </div>
          </div>
        </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileNavigation;
