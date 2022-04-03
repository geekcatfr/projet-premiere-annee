import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Formations.css";

export default function Formations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/formations")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFormations(result.formations);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, []);

  if (error) {
    return (
      <div className="container">
        <p>
          Erreur en essayant de charger le contenu de la page... {error.message}
        </p>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="container">
        <p>Chargement des formations...</p>
      </div>
    );
  }
  return (
    <div className="formation-wrapper">
      <h1>Formations</h1>
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
    </div>
  );
}

function FormationBox(props) {
  return (
    <div className="formation-description">
      <img
        src="https://www.studyrama.com/modules/custom/stu_anfor/public/images/annuaire-diplomes.svg"
        alt="C'est un diplôme"
      />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
