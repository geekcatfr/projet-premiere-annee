import React, { useEffect, useState } from "react";

export default function Formations() {
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/formations")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsLoaded(true);
        setFormations(result.nom);
      });
  }, []);
  return (
    <div>
      <FormationUnit name={formations} desc={formations} />
    </div>
  );
}

function FormationUnit(props) {
  return (
    <div className="formation-block">
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
    </div>
  );
}
