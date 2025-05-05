import React from "react";
import { FaHeart, FaEnvelope, FaTelegramPlane, FaGithub } from "react-icons/fa";
import "./css/Footer.css";

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="footer-content">
        <div className="footer-text">
          © {currentYear} srv328.tech
          <span className="heart">
            <FaHeart />
          </span>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/srv328"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaGithub style={{ marginRight: "0.3em" }} />
            GitHub
          </a>
          <span className="separator">•</span>
          <a
            href="https://t.me/shevelev_rv"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaTelegramPlane style={{ marginRight: "0.3em" }} />
            Telegram
          </a>
          <span className="separator">•</span>
          <a href="mailto:shevelev.rv328@gmail.com" className="footer-link">
            <FaEnvelope style={{ marginRight: "0.3em" }} />
            Почта
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
