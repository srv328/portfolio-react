import React from "react";

/**
 * Компонент для отображения готового бейджа с технологией
 * @param {Object} props - Свойства компонента
 * @param {string} props.badge - URL изображения бейджа
 * @param {string} props.name - Название навыка для атрибута alt
 */

const DirectBadge = ({ badge, name }) => {
  return (
    <div className="skill-badge">
      <img src={badge} alt={`${name} badge`} />
    </div>
  );
};

export default DirectBadge;
