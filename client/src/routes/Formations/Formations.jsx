import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFormations } from "../../utils/data";
import {
  FormationGrid,
  FormationBox,
} from "../../components/FormationGrid/FormationGrid";
import "./Formations.css";

export default function Formations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetchFormations().then(
      (res) => {
        setIsLoaded(true);
        setFormations(res.formations);
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
      <FormationGrid formations={formations} />
    </div>
  );
}
