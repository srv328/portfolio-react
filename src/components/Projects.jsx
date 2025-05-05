import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { BiCalendar, BiCodeAlt } from "react-icons/bi";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import "./css/Projects.css";

const Projects = ({ isDarkMode }) => {
  const commercialProjects = [
    {
      title: "Онлайн-магазин",
      description:
        "Цифровая версия настоящего рынка в городе Петропавловск-Камчатский. Платформа для продажи продуктов питания, одежды, обуви, игрушек, и многого другого.",
      image: "/img/projects/kammarket.png",
      link: "https://kammarket.com",
      concept:
        "Оцифрованный рынок в городе Петропавловск-Камчатский. Покупатели и продавцы могут взаимодействовать друг с другом, общаться, просматривать и покупать товары.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "styled-components",
      ],
      completionDate: "Сентябрь 2024",
      role: "Full-stack разработчик",
      features: [
        "Полное управление товарами и категориями",
        "Управление заказами и доставками",
        "Три типа пользователей: администратор, продавец, покупатель",
        "Личный кабинет пользователя",
        "Корзина покупок с сохранением между сессиями",
        "Автоматическая генерация sitemap.xml для SEO оптимизации",
      ],
    },
    {
      title: "Агрегатор коммерческой недвижимости",
      description:
        "Агрегатор для коммерческой недвижимости, который помогает клиентам сдать или арендовать недвижимость в городе Петропавловск-Камчатский.",
      image: "/img/projects/realty.png",
      link: "https://arendakamchatka.com",
      concept: "Простой и удобный интерфейс для сдачи и аренды недвижимости.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "styled-components",
        "Figma",
      ],
      completionDate: "Январь 2025",
      role: "Full-stack разработчик",
      features: [
        "Формы обратной связи",
        "Четыре типа пользователей: администратор, субадмин (ограниченные права), менеджер, арендатор",
        "Заявки приходят как администратору, так и менеджеру объектов",
        "Личный кабинет пользователя",
        "Интеграция с Яндекс.Картами",
        "Функциональная админ-панель для управления контентом сайта (до 90%)",
      ],
    },
  ];

  const personalProjects = [
    {
      title: "Система управления базой данных АЗС",
      description:
        "Приложение для управления данными автозаправочных станций с возможностью мониторинга продаж топлива и управления клиентами.",
      image: "/img/projects/gasstation.png",
      github: "https://github.com/srv328/gasstation-database-management",
      concept:
        "Комплексная система для администрирования данных автозаправочных станций с разделением прав доступа и функциональным интерфейсом.",
      technologies: [
        "C# .NET Framework 4.7.2",
        "Windows Forms",
        "MySQL",
        "ADO.NET",
        "MySql.Data (Connector/NET)",
        "System.Windows.Forms",
      ],
      completionDate: "Январь 2024",
      role: "Разработчик базы данных и приложения",
      features: [
        "Авторизация пользователей с разными уровнями доступа (админ, представитель фирмы, клиент)",
        "Управление данными АЗС, фирм и клиентов",
        "Мониторинг продаж топлива",
        "Интерактивный интерфейс для работы с данными",
        "Каскадное удаление связанных записей",
        "Валидация вводимых данных",
        "Защита от SQL-инъекций",
      ],
    },
    {
      title: "Бот расписания занятий FEFU (ДВФУ)",
      description:
        "Телеграм-бот для управления и отслеживания учебного расписания с удобным интерфейсом.",
      image: "/img/projects/tgbot.png",
      github: "https://github.com/srv328/schedule-bot",
      concept:
        "Телеграм-бот для управления расписанием занятий с возможностью добавления, редактирования и просмотра расписания на разные дни недели.",
      technologies: [
        "Python",
        "aiogram",
        "SQLite3",
        "Redis",
        "asyncio",
        "pytz",
        "openpyxl",
        "Telegram API",
      ],
      completionDate: "Апрель 2024",
      role: "Backend разработчик",
      features: [
        "Просмотр расписания на сегодня/завтра/неделю",
        "Добавление и редактирование пар",
        "Экспорт расписания в Excel и TXT",
        "Просмотр следующей пары",
        "Панель администратора",
        "Статистика по расписанию",
        "Настройки пользователя",
        "Антифлуд система с использованием Redis",
      ],
    },
    {
      title: "Генератор красивых Ethereum адресов",
      description:
        "Инструмент для генерации Ethereum адресов с заданными префиксами, вхождениями или суффиксами.",
      image: "/img/projects/ethereum.png",
      github: "https://github.com/srv328/eth-beautiful-address-generator",
      concept:
        "Утилита для криптоэнтузиастов, позволяющая генерировать Ethereum кошельки с красивыми или запоминающимися адресами, сохраняя при этом доступ к мнемоническим фразам.",
      technologies: ["Python", "eth_account", "bip_utils", "threading"],
      completionDate: "Июнь 2024",
      role: "Backend разработчик",
      features: [
        "Многопоточная генерация для повышения производительности",
        "Поиск адресов по префиксу (начало адреса)",
        "Поиск адресов по вхождению (любая часть адреса)",
        "Поиск адресов по суффиксу (конец адреса)",
        "Выбор длины мнемонической фразы (12 или 24 слова)",
        "Автоматическое сохранение результатов в файл wallets.txt",
      ],
    },
    {
      title: "get-erc20-balances",
      description:
        "Python-пакет для генерации Ethereum-адресов из мнемонической фразы и проверки балансов ETH и ERC-20 токенов, связанных с заданным Ethereum-адресом.",
      image: "/img/projects/blockchain.png",
      github: "https://github.com/srv328/get-erc20-balances",
      concept:
        "Инструмент для работы с криптовалютой, позволяющий генерировать Ethereum-адреса из мнемонических фраз и получать информацию о балансе Ethereum и различных ERC-20 токенов на этих адресах.",
      technologies: ["Python", "web3.py", "hdwallet", "JSON", "Ethereum API"],
      completionDate: "Февраль 2024",
      role: "Blockchain Developer",
      features: [
        "Генерация Ethereum-адресов из мнемонических фраз",
        "Поддержка различных путей деривации (для Exodus, Trust Wallet, Metamask, Ledger)",
        "Проверка баланса ETH",
        "Проверка балансов ERC-20 токенов",
        "Поддержка множества популярных ERC-20 токенов (USDT, BNB, USDC и др.)",
        "Возможность настройки глубины генерации адресов",
      ],
    },
    {
      title: "Портфолио на React",
      description:
        "Персональный сайт-портфолио с использованием современных технологий web-разработки.",
      image: "/logo512.png",
      github: "https://github.com/srv328/portfolio-react",
      concept:
        "Современное портфолио для демонстрации навыков и проектов с адаптивным дизайном и интерактивными элементами.",
      technologies: [
        "React",
        "Bootstrap",
        "CSS3",
        "Framer Motion",
        "Particles.js",
      ],
      completionDate: "Май 2025",
      role: "Frontend разработчик",
      features: [
        "Адаптивный дизайн для всех устройств",
        "Интерактивная анимация и эффекты",
        "Темная и светлая темы оформления",
        "Стеклянный морфизм для элементов интерфейса",
      ],
    },
  ];

  // Варианты анимаций для разных элементов
  const titleAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const descriptionAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const conceptAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        delay: 0.3,
        type: "spring",
        stiffness: 100
      } 
    }
  };

  const metaAnimation = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.4 } }
  };

  const techAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.5,
      duration: 0.3 
    } }
  };

  const techItemAnimation = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200 }
    }
  };

  const featuresAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.6,
        when: "beforeChildren"
      } 
    }
  };

  const featureItemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  // Общий компонент для отображения карточки проекта
  const ProjectCard = ({ project, index, isLast, totalCount }) => {
    const isFullWidth = isLast && totalCount % 2 !== 0;
    
    const cardContent = (
      <>
        {isFullWidth ? (
          <Row className="g-0">
            <Col lg={6} md={12}>
              <div className="project-image-container full-width-image">
                <Card.Img
                  variant="top"
                  src={project.image}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaExternalLinkAlt /> Посмотреть
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github-link"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <Card.Body>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.div variants={titleAnimation}>
                    <Card.Title className="project-title">
                      {project.title}
                    </Card.Title>
                  </motion.div>

                  <motion.div variants={descriptionAnimation}>
                    <Card.Text className="project-description">
                      {project.description}
                    </Card.Text>
                  </motion.div>

                  <motion.div className="project-concept" variants={conceptAnimation}>
                    <h6 className="concept-title">Концепция:</h6>
                    <p>{project.concept}</p>
                  </motion.div>

                  <motion.div className="project-meta" variants={metaAnimation}>
                    <div className="project-date">
                      <BiCalendar className="meta-icon" />
                      <span>{project.completionDate}</span>
                    </div>
                    <div className="project-role">
                      <BiCodeAlt className="meta-icon" />
                      <span>{project.role}</span>
                    </div>
                  </motion.div>

                  <motion.div className="project-technologies" variants={techAnimation}>
                    {project.technologies.map((tech, i) => (
                      <motion.span key={i} variants={techItemAnimation}>
                        <Badge className="tech-badge">
                          {tech}
                        </Badge>
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div className="project-features" variants={featuresAnimation}>
                    <h6>Ключевые особенности:</h6>
                    <ul>
                      {project.features.map((feature, i) => (
                        <motion.li key={i} variants={featureItemAnimation}>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </Card.Body>
            </Col>
          </Row>
        ) : (
          <>
            <div className="project-image-container">
              <Card.Img
                variant="top"
                src={project.image}
                className="project-image"
              />
              <div className="project-overlay">
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaExternalLinkAlt /> Посмотреть
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
            <Card.Body>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={titleAnimation}>
                  <Card.Title className="project-title">
                    {project.title}
                  </Card.Title>
                </motion.div>

                <motion.div variants={descriptionAnimation}>
                  <Card.Text className="project-description">
                    {project.description}
                  </Card.Text>
                </motion.div>

                <motion.div className="project-concept" variants={conceptAnimation}>
                  <h6 className="concept-title">Концепция:</h6>
                  <p>{project.concept}</p>
                </motion.div>

                <motion.div className="project-meta" variants={metaAnimation}>
                  <div className="project-date">
                    <BiCalendar className="meta-icon" />
                    <span>{project.completionDate}</span>
                  </div>
                  <div className="project-role">
                    <BiCodeAlt className="meta-icon" />
                    <span>{project.role}</span>
                  </div>
                </motion.div>

                <motion.div className="project-technologies" variants={techAnimation}>
                  {project.technologies.map((tech, i) => (
                    <motion.span key={i} variants={techItemAnimation}>
                      <Badge className="tech-badge">
                        {tech}
                      </Badge>
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div className="project-features" variants={featuresAnimation}>
                  <h6>Ключевые особенности:</h6>
                  <ul>
                    {project.features.map((feature, i) => (
                      <motion.li key={i} variants={featureItemAnimation}>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </Card.Body>
          </>
        )}
      </>
    );

    return (
      <Col
        lg={isFullWidth ? 12 : 6}
        md={12}
        sm={12}
        key={index}
        className="mb-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            className={`project-card h-100 ${
              isDarkMode ? "dark-mode" : "light-mode"
            } ${isFullWidth ? "full-width-card" : ""}`}
          >
            {cardContent}
          </Card>
        </motion.div>
      </Col>
    );
  };

  return (
    <Container className="my-5">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5 projects-main-title"
      >
        Мои проекты
      </motion.h2>

      {/* Коммерческие проекты */}
      <motion.h3
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-4 section-subtitle"
      >
        Коммерческие проекты
      </motion.h3>

      <Row className="mb-5">
        {commercialProjects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            key={index}
            isLast={index === commercialProjects.length - 1}
            totalCount={commercialProjects.length}
          />
        ))}
      </Row>

      {/* Некоммерческие проекты */}
      <motion.h3
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 mt-5 section-subtitle"
      >
        Некоммерческие проекты
      </motion.h3>

      <Row>
        {personalProjects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            key={index}
            isLast={index === personalProjects.length - 1}
            totalCount={personalProjects.length}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
