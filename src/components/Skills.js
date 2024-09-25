import { BiLink } from "react-icons/bi";

function Skills() {
  return (
    <section className="skills">
      <ul>
        <li>Работа с технической документацией</li>
        <li>Опыт работы с алгоритмами и структурами данных</li>
        <h3>
          <a
            href="https://github.com/srv328/web-development"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend-разработка:
          </a>
          <BiLink />
        </h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React.js</li>
          <li>Pug</li>
          <li>Stylus</li>
        </ul>
        <h3>Backend-разработка:</h3>
        <li>Node.js:</li>
        <ul>
          <li>Создание REST API с Express.js.</li>
          <li>Обработка HTTP-запросов и ответов.</li>
          <li>Работа с сессиями и аутентификацией.</li>
          <li>Настройка CORS (Cross-Origin Resource Sharing).</li>
        </ul>
        <li>Базовые навыки работы с 1С:Предприятие</li>
        <li>
          <a
            href="https://github.com/srv328/fundamental-algorithms-and-data-structures"
            target="_blank"
            rel="noopener noreferrer"
          >
            Знание базовых алгоритмов и структур данных
            <BiLink />
          </a>
        </li>
        <li>
          Опыт работы с базами данных: построение ER-диаграмм, написание
          SQL-запросов, работа с MySQL
        </li>
        <li>
          Разработка приложений с пользовательским интерфейсом (GUI) с помощью{" "}
          <a
            href="https://github.com/srv328/task-manager"
            target="_blank"
            rel="noopener noreferrer"
          >
            WinForms
            <BiLink />
          </a>{" "}
          на платформе .NET Framework версии 4.7.2 (C++/C#)
        </li>
        <li>
          Написание телеграмм-ботов на базе библиотеки{" "}
          <a
            href="https://github.com/srv328/crypto-price-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aiogram V3, работа с FSM
            <BiLink />
          </a>{" "}
          (Python)
        </li>
        <li>
          Работа с БД -{" "}
          <a
            href="https://github.com/srv328/test_task_farpost"
            target="_blank"
            rel="noopener noreferrer"
          >
            sqlite3
            <BiLink />
          </a>{" "}
          (Python)
        </li>
        <li>Парсинг/работа с библиотекой requests (Python)</li>
        <li>
          Работа с{" "}
          <a
            href="https://github.com/srv328/get-erc20-balances"
            target="_blank"
            rel="noopener noreferrer"
          >
            web3.py
            <BiLink />
          </a>{" "}
          (Python)
        </li>
      </ul>
    </section>
  );
}

export default Skills;
