import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FormationPage.css";

export default function FormationPage() {
  return (
    <>
      <h1>Formations</h1>
      <FormationTable />
    </>
  );
}

function FormationTable(props) {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/formations")
      .then((res) => res.json())
      .then(
        (result) => {
          setFormations(result.formations);
        },
        (err) => {
          setError(true);
        }
      );
  }, []);
  if (error) {
    return <p>Impossible de charger le contenu de la page</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Titre</th>
        </tr>
      </thead>
      <tbody>
        {formations.map((formation) => (
          <tr className="formation-row" key={formation.id}>
            <td className="checkbox">
              <input type="checkbox" />
            </td>

            <td>
              <p className="formation-title">{formation.title}</p>
              <ul className="formation-actions">
                <li>
                  <Link to="edit">Editer</Link>
                </li>
                <li>
                  <Link to="delete">Supprimer</Link>
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
