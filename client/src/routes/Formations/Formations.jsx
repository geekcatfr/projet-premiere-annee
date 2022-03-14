import React, { useEffect, useState } from "react";
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
        (error) => {
          setIsLoaded(true);
          setError(error);
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
    <div className="container">
      <ul className="formation-grid">
        {formations.map((formation) => (
          <li key={formation.id} className="formation-box">
            <div className="formation-description">
              <h2>{formation.title}</h2>
              <p>{formation.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
