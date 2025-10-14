import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaGraduationCap, FaTrophy } from "react-icons/fa";
import "./css/Experience.css";

const Experience = ({ isDarkMode }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
  });

  const experienceData = [
    {
      type: "education",
      title: "Бакалавриат",
      company: "ДВФУ, Программная инженерия",
      period: "2021 - 2025",
      description:
        "Изучение основ программирования, алгоритмов, структур данных, веб-разработки и управления проектами.",
      technologies: [
        "JavaScript",
		"Python",
        "C++",
		"C#",	
		"SQL",
		"NoSQL",
		"Git",
        "Web Development",
        "Algorithms",
        "Data Structures",
      ],
      icon: FaGraduationCap,
      achievements: [
        "Участник ICPC CodeForces",
        "Участник хакатона Tender Hack 2024",
        "Разработка пет-проектов на различных технологиях",
        "Участник гранта ESP Academic Grant",
        "Соавтор научной статьи по блокчейн технологиям",
        "Участник программы 'Студ. стартап'",
      ],
    },

    {
      type: "education",
      title: "Магистратура",
      company: "ИГУ, ПМИ (Прикладная математика и информатика)",
      period: "2025 - настоящее время",
      description:
        "Изучение математического моделирования, машинного обучения и современных методов анализа данных.",
      technologies: [
        "Python",
        "Machine Learning",
        "Data Science",
        "Mathematical Modeling",
      ],
      icon: FaGraduationCap,
      achievements: ["Обработка данных", "Машинное обучение", "Математическое моделирование"],
    },
    {
      type: "work",
      title: "Frontend разработчик",
      company: "НИУ ВШЭ",
      period: "Октябрь 2025 - настоящее время",
      description:
        "Разработка фронтенд-приложений на Vue.js и Nuxt.js. Создание современных пользовательских интерфейсов для научных и образовательных проектов.",
      technologies: ["Vue.js", "Nuxt.js", "TypeScript", "SCSS", "JavaScript"],
      icon: FaBriefcase,
      achievements: [
        "Поддержка проекта НИУ ВШЭ ИМЛИ РАН",
        "Поддержка проекта Sociolit",
        "Применяю современные подходы к фронтенд-разработке",
      ],
    },
    {
      type: "work",
      title: "Full-stack разработчик (Фриланс)",
      company: "Удаленная работа",
      period: "2023 - настоящее время",
      description:
        "Разработка веб-приложений и мобильных приложений для клиентов. Специализация на React, Node.js, Python и блокчейн технологиях.",
      technologies: ["Vue.js", "Nuxt.js", "TypeScript", "JavaScript", "Python", "Blockchain", "Web3"],
      icon: FaBriefcase,
      achievements: [
        "Разработал 4 коммерческих проекта",
        "Постоянно поддерживаю и развиваю проекты клиентов",
        "Разработал агрегатор недвижимости",
        "Создал онлайн-магазин с полным функционалом",
      ],
    },
    {
      type: "achievement",
      title: "Научная деятельность",
      company: "Исследовательские проекты",
      period: "2023 - настоящее время",
      description:
        "Участие в научных исследованиях в области блокчейн технологий и машинного обучения.",
      technologies: [
        "Ethereum",
        "Smart Contracts",
        "Deep Learning",
        "Anomaly Detection",
      ],
      icon: FaTrophy,
      achievements: [
        "Грант на исследование аномалий в Ethereum P2P сети",
        "Публикация статьи о выявлении уязвимостей в смарт-контрактах",
      ],
    },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "work":
        return "#00b4d8";
      case "education":
        return "#0077b6";
      case "achievement":
        return "#ff6b35";
      default:
        return "#6c757d";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "work":
        return "Работа";
      case "education":
        return "Образование";
      case "achievement":
        return "Достижения";
      default:
        return "Другое";
    }
  };

  return (
    <Container className="my-5" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5 experience-main-title"
      >
        Опыт работы и образование
      </motion.h2>

      <div className="timeline">
        {experienceData.map((item, index) => {
          const IconComponent = item.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: isEven ? -100 : 100 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`timeline-item ${isEven ? "left" : "right"}`}
            >
              <div className="timeline-marker">
                <div
                  className="timeline-icon"
                  style={{ backgroundColor: getTypeColor(item.type) }}
                >
                  <IconComponent />
                </div>
                <div
                  className="timeline-line"
                  style={{ backgroundColor: getTypeColor(item.type) }}
                ></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                className={`timeline-content ${
                  isDarkMode ? "dark-mode" : "light-mode"
                }`}
                style={{ borderLeftColor: getTypeColor(item.type) }}
              >
                <div className="timeline-header">
                  <div
                    className="timeline-type-badge"
                    style={{ backgroundColor: getTypeColor(item.type) }}
                  >
                    {getTypeLabel(item.type)}
                  </div>
                  <div className="timeline-period">{item.period}</div>
                </div>

                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>

                <div className="timeline-technologies">
                  {item.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="timeline-achievements">
                  <h5>Ключевые достижения:</h5>
                  <ul>
                    {item.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};

export default Experience;
