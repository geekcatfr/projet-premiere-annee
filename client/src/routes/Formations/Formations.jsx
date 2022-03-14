import React, { useEffect, useState } from "react";

export default function Formations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/formations")
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
    console.log("Impossible to load the content of the API : ", error);
    return (
      <div className="container">
        <p>Erreur en essayant de charger le contenu de la page...</p>
      </div>
    );
  } else {
    return (
      <div>
        <FormationUnit formations={formations} />
      </div>
    );
  }
}

function FormationUnit(props) {
  const formationElement = props.formations;
  console.log(formationElement)
  const nameElement = formationElement.map((formation) => {
    <li>
      <h2>{formation.title}</h2>
      <p>{formation.description}</p>
    </li>
  })
  return (
    <>
      {nameElement}
    </>
  );
}
