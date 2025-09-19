import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DirectBadge from "./utils/DirectBadge";
import skillsData from "./utils/SkillsData";
import "./css/SkillBadge.css";

const Skills = ({ isDarkMode }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
  });

  const categoriesArray = Object.values(skillsData);
  const lastIndex = categoriesArray.length - 1;

  return (
    <Container className="mt-n5 mb-5" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 section-title"
      >
        Навыки и технологии
      </motion.h2>

      <Row>
        {categoriesArray.map((category, index) => (
          <Col
            lg={
              index === lastIndex && categoriesArray.length % 2 !== 0 ? 12 : 6
            }
            key={index}
            className={`mb-4 ${
              index === lastIndex && categoriesArray.length % 2 !== 0
                ? "last-category"
                : ""
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`skill-category ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
              style={
                index === lastIndex && categoriesArray.length % 2 !== 0
                  ? { maxWidth: "570px", margin: "0 auto" }
                  : {}
              }
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skills-container">
                {category.skills.map((skill, i) => (
                  <DirectBadge key={i} name={skill.name} badge={skill.badge} />
                ))}
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Skills;
