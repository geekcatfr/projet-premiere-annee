import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FormationPage.css";

export default function FormationPage() {
  return (
    <div>
      <h1>Formations</h1>
      <FormationTable />
    </div>
  );
}

function FormationTable(props) {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);

  const FormationRows = (props) =>
    formations.map((formation) => (
      <FormationRow
        key={formation.id}
        formationId={formation.id}
        title={formation.title}
      />
    ));

  const checkAllCaseFormations = () => {};

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
            <input type="checkbox" onChange={checkAllCaseFormations} />
          </th>
          <th>Titre</th>
        </tr>
      </thead>
      <tbody>
        <FormationRows />
      </tbody>
    </table>
  );
}

function FormationRow(props) {
  const [selected, setIsSelected] = useState(false);

  return (
    <tr className="formation-row">
      <td className="checkbox">
        <input type="checkbox" onChange={() => setIsSelected(!selected)} />
      </td>

      <td>
        <p className="formation-title">{props.title}</p>
        <ul className="formation-actions">
          <li>
            <Link to={`edit/${props.formationId}`}>Editer</Link>
          </li>
          <li>
            <Link to={`delete/${props.formationId}`}>Supprimer</Link>
          </li>
        </ul>
      </td>
    </tr>
  );
}
