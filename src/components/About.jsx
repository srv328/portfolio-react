import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { BiLink } from "react-icons/bi";
import { FaTrophy, FaGraduationCap, FaRocket } from "react-icons/fa";
import "./css/About.css";

const About = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const personalInfo =
    "Роман, 21 год. Выпускник ДВФУ Института Математики и Компьютерных Технологий направления подготовки бакалавриата Программная инженерия. Учусь в магистратуре (ПМИ, матмоделирование), пишу пет-проекты, работаю на фрилансе, открыт к коммерческим предложениям.";

  useEffect(() => {
    let textIndex = 0;
    const typeInterval = setInterval(() => {
      if (textIndex <= personalInfo.length) {
        setDisplayedText(personalInfo.substring(0, textIndex));
        textIndex++;
      } else {
        clearInterval(typeInterval);
        setTypingComplete(true);
      }
    }, 20);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(typeInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  const achievements = [
    {
      category: "Соревнования и хакатоны",
      icon: FaTrophy,
      color: "#FFD700",
      items: [
        {
          text: "Участие в ICPC CodeForces с командой на 1 курсе в рамках CodeWork",
          link: "https://codeforces.com/gyms?filterContestType=Official+ACM-ICPC+Contest&locale=ru",
          linkText: "CodeWork",
          year: "2022",
        },
        {
          text: "Участник хакатона Tender Hack",
          link: "https://github.com/srv328/tenderhack-2024",
          linkText: "Tender Hack",
          year: "2024",
        },
		{
			text: "True Tech Champ Трек 2: программирование роботов МТС квалификации",
			link: "https://truetecharena.ru/contests/tth-2025-track-2#",
			linkText: "True Tech Champ",
			year: "2025",
		},
      ],
    },
    {
      category: "Научная деятельность",
      icon: FaGraduationCap,
      color: "#00b4d8",
      items: [
        {
          text: 'Участник гранта ESP Academic Grant с темой "Anomaly Detection on Ethereum P2P Network Using LLM"',
          link: "https://esp.ethereum.foundation/academic-grants",
          linkText: '"Anomaly Detection on Ethereum P2P Network Using LLM"',
          year: "2024",
        },
        {
          text: "Соавтор статьи на конференции ДВФУ: Выявление уязвимостей в смарт-контрактах с помощью глубокого обучения",
          link: "sources/статья.pdf",
          linkText:
            "Выявление уязвимостей в смарт-контрактах с помощью глубокого обучения",
          year: "2024",
        },
      ],
    },
    {
      category: "Инновационные проекты",
      icon: FaRocket,
      color: "#ff6b6b",
      items: [
        {
          text: 'Участник программы "Студ. стартап" с темой "LLM для проведения собеседования потенциальных сотрудников"',
          link: "https://fasie.ru/studstartup/",
          linkText: '"Студ. стартап"',
          year: "2024",
        },
		{
			text: "Разработчик первого маркетплейса в Камчатском крае",
			link: "https://kammarket.com",
			linkText: "Каммаркет",
			year: "2024",
		},
      ],
    },
  ];

  const renderTextWithLink = (text, link, linkText, year) => {
    const parts = text.split(linkText);
    return (
      <div className="achievement-item">
        <div className="achievement-content">
          {parts[0]}
          <a href={link} target="_blank" rel="noopener noreferrer" className="achievement-link">
            {linkText}
            <BiLink className="link-icon" />
          </a>
          {parts[1]}
        </div>
        <div className="achievement-year-badge">
          {year}
        </div>
      </div>
    );
  };

  return (
    <Container className="my-5">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 mt-4 section-title"
        style={{ marginBottom: "2rem" }}
      >
        О себе
      </motion.h2>

      <div
        className="typing-container mb-5"
        style={{
          textIndent: "20px",
          fontSize: "1.25rem",
          textAlign: isMobile ? "justify" : "left",
          minHeight: "100px",
        }}
      >
        <span>{displayedText}</span>
        <span
          className={`cursor ${typingComplete ? "cursor-done" : ""}`}
        ></span>
      </div>

      <motion.h3 
        className="text-center mb-5 achievements-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Достижения
      </motion.h3>

      <Row className="mb-5">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <Col lg={4} md={6} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="achievement-card-wrapper"
              >
                <Card className="achievement-card h-100">
                  <Card.Body className="p-4">
                    <div className="achievement-header">
                      <div 
                        className="achievement-icon"
                        style={{ backgroundColor: achievement.color }}
                      >
                        <IconComponent />
                      </div>
                      <h4 className="achievement-category">{achievement.category}</h4>
                    </div>
                    
                    <div className="achievement-items">
                      {achievement.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.2) + (i * 0.1) + 0.5 }}
                          className="achievement-item-wrapper"
                        >
                          {renderTextWithLink(
                            item.text,
                            item.link,
                            item.linkText,
                            item.year
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default About;
