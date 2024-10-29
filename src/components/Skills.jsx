import React from "react";
import { Container, Carousel, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactComponent as ERIcon } from "./utils/svg/er.svg";
import { ReactComponent as DBIcon } from "./utils/svg/db.svg";
import { ReactComponent as MongoDBIcon } from "./utils/svg/mongodb.svg";
import { ReactComponent as RedisIcon } from "./utils/svg/redis.svg";
import { ReactComponent as MySqlIcon } from "./utils/svg/mysql.svg";
import { ReactComponent as SqlIcon } from "./utils/svg/sql.svg";
import { ReactComponent as RestIcon } from "./utils/svg/api.svg";
import { ReactComponent as NodeIcon } from "./utils/svg/node.svg";
import { ReactComponent as ExpressIcon } from "./utils/svg/express.svg";
import { ReactComponent as HtmlIcon } from "./utils/svg/html.svg";
import { ReactComponent as CSSIcon } from "./utils/svg/css.svg";
import { ReactComponent as JsIcon } from "./utils/svg/js.svg";
import { ReactComponent as ReactIcon } from "./utils/svg/react.svg";
import { ReactComponent as BSIcon } from "./utils/svg/bootstrap.svg";
import { ReactComponent as S1Icon } from "./utils/svg/1c.svg";
import { ReactComponent as FSMIcon } from "./utils/svg/fsm.svg";
import { ReactComponent as Web3Icon } from "./utils/svg/web3.svg";
import { ReactComponent as PythonIcon } from "./utils/svg/python.svg";
import { ReactComponent as DatabaseIcon } from "./utils/svg/database.svg";
import { ReactComponent as GitIcon } from "./utils/svg/git.svg";
import { ReactComponent as FrontendIcon } from "./utils/svg/frontend.svg";
import { ReactComponent as BackendIcon } from "./utils/svg/backend.svg";
import { ReactComponent as PugIcon } from "./utils/svg/pug.svg";
import { ReactComponent as StylusIcon } from "./utils/svg/stylus.svg";
import { ReactComponent as RBTreeIcon } from "./utils/svg/rbt.svg";
import { ReactComponent as NETIcon } from "./utils/svg/net.svg";
import { ReactComponent as CPlusIcon } from "./utils/svg/cplus.svg";
import { ReactComponent as CSharpIcon } from "./utils/svg/csharp.svg";
import { ReactComponent as AIOIcon } from "./utils/svg/aio.svg";
import { ReactComponent as OtherIcon } from "./utils/svg/others.svg";
import { ReactComponent as RequestsIcon } from "./utils/svg/requests.svg";
import { ReactComponent as PyGameIcon } from "./utils/svg/pygame.svg"
import { ReactComponent as PDIcon } from "./utils/svg/pd.svg"
import { ReactComponent as NPIcon } from "./utils/svg/np.svg"
import "./css/Carousel.css";

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.15,
  });

  const skillCategories = [
    {
      title: "Frontend-разработка",
      icon: <FrontendIcon />,
      skills: [
        { name: "React.js", icon: <ReactIcon /> },
        { name: "Bootstrap", icon: <BSIcon /> },
        { name: "JavaScript", icon: <JsIcon /> },
        { name: "HTML", icon: <HtmlIcon /> },
        { name: "CSS", icon: <CSSIcon /> },
      ],
    },
    {
      title: "Backend-разработка",
      icon: <BackendIcon />,
      skills: [
        { name: "Node.js", icon: <NodeIcon /> },
        { name: "Express.js", icon: <ExpressIcon /> },
        { name: "REST API", icon: <RestIcon /> },
      ],
    },
    {
      title: "Базы данных",
      icon: <DatabaseIcon />,
      skills: [
        { name: "SQL", icon: <SqlIcon /> },
        { name: "MySQL", icon: <MySqlIcon /> },
        { name: "1С:Предприятие", icon: <S1Icon /> },
        { name: "mongoDB", icon: <MongoDBIcon /> },
        { name: "redis", icon: <RedisIcon /> },
        { name: "sqlite3 (python)", icon: <DBIcon /> },
        { name: "ER-диаграммы", icon: <ERIcon /> },
      ],
    },
    {
      title: "Python",
      icon: <PythonIcon />,
      skills: [
        { name: "Aiogram V3", icon: <AIOIcon /> },
        { name: "FSM", icon: <FSMIcon /> },
		{ name: "requests", icon: <RequestsIcon />},
		{ name: "", icon: <PyGameIcon />},
        { name: "web3.py", icon: <Web3Icon /> },
        { name: "Numpy", icon: <NPIcon /> },
        { name: "Pandas", icon: <PDIcon /> },
      ],
    },
    {
      title: "C++ / C#",
      icon: <CPlusIcon />,
      skills: [
        { name: "WinForms", icon: <NETIcon /> },
        { name: ".NET Framework 4.7.2", icon: <CSharpIcon /> },
      ],
    },
    {
      title: "Другие навыки",
      icon: <OtherIcon />,
      skills: [
        { name: "Git", icon: <GitIcon /> },
        { name: "Telegram боты", icon: <AIOIcon /> },
        { name: "Алгоритмы и структуры данных", icon: <RBTreeIcon /> },
        { name: "Pug", icon: <PugIcon /> },
        { name: "Stylus", icon: <StylusIcon /> },
      ],
    },
  ];

  const renderSkillColumns = (skills) => {
    const skillCount = skills.length;
    const columns = [];
    let col1 = [];
    let col2 = [];
    let singleSkill = null;

    skills.forEach((skill, index) => {
      if (skillCount % 2 !== 0 && index === Math.ceil(skillCount / 2) - 1) {
        singleSkill = (
          <Col xs={12} key={index} className="d-flex justify-content-center">
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ fontSize: "1.5rem" }}>
                  {skill.icon}
                </span>
                {skill.name}
              </li>
            </ul>
          </Col>
        );
      } else {
        const currentCol = index < Math.ceil(skillCount / 2) ? col1 : col2;
        currentCol.push(
          <li key={index} className="mb-2 d-flex align-items-center">
            <span className="me-2" style={{ fontSize: "1.5rem" }}>
              {skill.icon}
            </span>
            {skill.name}
          </li>
        );
      }
    });

    columns.push(
      <Col xs={6} key={1} className="d-flex justify-content-center">
        <ul className="list-unstyled">{col1}</ul>
      </Col>
    );
    columns.push(
      <Col xs={6} key={2} className="d-flex justify-content-center">
        <ul className="list-unstyled">{col2}</ul>
      </Col>
    );

    if (singleSkill) {
      columns.push(singleSkill);
    }

    return columns;
  };

  return (
    <Container className="my-5" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        Навыки и технологии
      </motion.h2>

      <Carousel className="multi-item-carousel">
        {skillCategories.map((category) => (
          <Carousel.Item key={category.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="carousel-card"
            >
              <div className="d-flex align-items-center justify-content-center mb-3">
                <span className="me-2" style={{ fontSize: "1rem", verticalAlign: "middle" }}>
                  {category.icon}
                </span>
                <h3 style={{ margin: 0, lineHeight: "3rem" }}>{category.title}</h3>
              </div>
              <Row>{renderSkillColumns(category.skills)}</Row>
            </motion.div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Skills;
