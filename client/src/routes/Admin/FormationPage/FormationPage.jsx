import { React, useEffect, useState } from "react";

export default function FormationPage() {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/formations")
      .then((res) => res.json())
      .then(
        (result) => {
          setFormations(result.formations);
        },
        (error) => {
          setError(true);
        }
      );
  });
  return (
    <>
      <h1>Formations</h1>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation) => (
            <tr value={formation.id}>{formation.name}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
