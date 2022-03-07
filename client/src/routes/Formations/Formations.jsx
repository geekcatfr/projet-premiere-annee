import React, { useEffect, useState } from "react";

export default function Formations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/formations")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsLoaded(true);
        setFormations(result);
      },
      (error) => {
          setIsLoaded(true);
          setError(error);
      }
    )
  }, []);
  if (error) {
    return (
      <>
        <p>Erreur en essayant de charger le contenu de la page...</p>
      </>
    )
  }
  else {
  return (
    <div>
      <FormationUnit name={formations.nom} desc={formations.desc} />
    </div>
  );
  }
}

function FormationUnit(props) {
  return (
    <div className="formation-block">
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
    </div>
  );
}
