import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { BiLink } from "react-icons/bi";
import "./css/About.css";

const About = () => {
  const [displayedText, setDisplayedText] = useState("");
  const personalInfo =
    "Роман, 20 лет. Студент 4 курса ДВФУ Института Математики и Компьютерных Технологий направления подготовки бакалавриата Программная инженерия. Учусь, пишу пет-проекты, работаю на фрилансе, открыт к коммерческим предложениям.";

  const achievements = [
    {
      category: "Соревнования и хакатоны",
      items: [
        {
          text: "Участие в ICPC CodeForces с командой на 1 курсе в рамках CodeWork",
          link: "https://codeforces.com/gyms?filterContestType=Official+ACM-ICPC+Contest&locale=ru",
          linkText: "CodeWork",
        },
        {
          text: "Участник хакатона Tender Hack 2024 года",
          link: "https://github.com/srv328/tenderhack-2024",
          linkText: "Tender Hack",
        },
      ],
    },
    {
      category: "Научная деятельность",
      items: [
        {
          text: 'Участник гранта ESP Academic Grant с темой "Anomaly Detection on Ethereum P2P Network Using LLM"',
          link: "https://esp.ethereum.foundation/academic-grants",
          linkText: '"Anomaly Detection on Ethereum P2P Network Using LLM"',
        },
        {
          text: "Соавтор статьи на конференции ДВФУ: Выявление уязвимостей в смарт-контрактах с помощью глубокого обучения",
          link: "sources/статья.pdf",
          linkText:
            "Выявление уязвимостей в смарт-контрактах с помощью глубокого обучения",
        },
      ],
    },
    {
      category: "Инновационные проекты",
      items: [
        {
          text: 'Участник программы "Студ. стартап" с темой "LLM для проведения собеседования потенциальных сотрудников"',
          link: "https://fasie.ru/studstartup/",
          linkText: '"Студ. стартап"',
        },
      ],
    },
  ];

  const renderTextWithLink = (text, link, linkText) => {
    const parts = text.split(linkText);
    return (
      <>
        {parts[0]}
        <a href={link} target="_blank" rel="noopener noreferrer">
          {linkText}
          <BiLink
            style={{
              marginLeft: "2px",
              display: "inline-block",
              verticalAlign: "top",
            }}
          />
        </a>
        {parts[1]}
      </>
    );
  };

  useEffect(() => {
    function animateText() {
      let textIndex = 0;
      const textInterval = setInterval(() => {
        setDisplayedText(personalInfo.substring(0, textIndex++));

        if (textIndex > personalInfo.length) {
          clearInterval(textInterval);
        }
      }, 40);
    }

    animateText();
  }, []);

  return (
    <Container className="my-5">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        О себе
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-5"
        style={{ textIndent: "20px", margin: "0 auto", fontSize: "1.25rem" }} 
      >
        {displayedText}
      </motion.p>

      <h3 className="text-center mb-4">Достижения</h3>

      <Row className="text-white">
        {achievements.map((achievement, index) => (
          <Col md={4} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-100">
                <Card.Body>
                  <Card.Title><strong>{achievement.category}</strong></Card.Title>
                  <Card.Text>
                    <ul className="list-unstyled">
                      {achievement.items.map((item, i) => (
                        <li key={i} className="mb-2">
                          {renderTextWithLink(
                            item.text,
                            item.link,
                            item.linkText
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default About;
