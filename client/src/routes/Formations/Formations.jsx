import React, { useEffect, useState } from "react";

export default function Formations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("/api/formations")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setFormations(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    console.log("Impossible to load the content of the API : " + error);
    return (
      <div className="container">
        <p>Erreur en essayant de charger le contenu de la page...</p>
      </div>
    );
  } else {
    return (
      <div>
        <FormationUnit name={formations.name} desc={formations.description} />
      </div>
    );
  }
}

function FormationUnit(props) {
  const formationName = props.name;
  const formationDesc = props.description;
  return (
    <div className="formation-block">
      <h2>{formationName}</h2>
      <p>{formationDesc}</p>
    </div>
  );
}
