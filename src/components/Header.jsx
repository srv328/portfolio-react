import { Container, Nav, Button } from "react-bootstrap";
import {
  FaGithub,
  FaVk,
  FaTelegramPlane,
  FaExternalLinkAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./css/Header.css";

const Header = ({ isDarkMode, toggleTheme }) => {
  return (
    <header
      className={`text-center ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <div
        className={`py-4 mb-4 bg-danger text-white position-relative`}
      >
        <h1 className="mb-0">Портфолио</h1>
        <Button
          variant={isDarkMode ? "light" : "dark"}
          onClick={toggleTheme}
          className="position-absolute top-50 end-0 translate-middle-y me-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
      <Container>
        <div className="image-container mb-3">
          <img src="/img/photo.png" alt="Фото" className="photo" />
        </div>
        <div>
          <Nav className="justify-content-center">
            {[
              {
                href: "https://github.com/srv328",
                icon: FaGithub,
                text: "GitHub",
              },
              { href: "https://vk.com/id330036555", icon: FaVk, text: "VK" },
              {
                href: "https://t.me/shevelev_rv",
                icon: FaTelegramPlane,
                text: "Telegram",
              },
            ].map(({ href, icon: Icon, text }) => (
				<Nav.Link
                href={href}
                target="_blank" 
                rel="noopener noreferrer" 
                className="mx-3 d-inline-flex align-items-center"
                style={{ fontSize: "1.4rem" }}
                key={text}
              >
                <div className="d-flex align-items-center">
                  <Icon size={32} className="me-2" />
                  <span>{text}</span>
                </div>
                <FaExternalLinkAlt
                  size={18}
                  className="ms-1 align-self-start"
                />
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
