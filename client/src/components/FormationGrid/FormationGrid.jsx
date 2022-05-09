import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export function FormationGrid({ formations }) {
  return (
    <ul className="formation-grid">
      {formations.map((formation) => (
        <li key={formation.id} className="formation-box">
          <Link to={`${formation.id}`}>
            <FormationBox
              title={formation.title}
              description={formation.description}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FormationBox({ title, description }) {
  return (
    <div className="formation-description">
      <img
        src="https://www.studyrama.com/modules/custom/stu_anfor/public/images/annuaire-diplomes.svg"
        alt="C'est un diplôme"
      />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

FormationBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
