import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./FormationPage.css";

library.add(fas);

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
        (err) => {
          setError(true);
        }
      );
  }, []);

  if (error) {
    return <p>Impossible de charger le contenu de la page</p>;
  }
  if (formations.length === 0) {
    return (
      <div>
        <h1>Formations</h1>
        <p>
          Aucune formation existe actuellement. Commencez par en créer une !
        </p>
        <AddFormationButton />
      </div>
    );
  }
  return (
    <div>
      <h1>Formations</h1>
      <AddFormationButton />
      <FormationTable formations={formations} />
    </div>
  );
}

function AddFormationButton() {
  const addFormationAction = () => {
    const formationName = prompt("Entrez le nom d'une formation");
    fetch("http://localhost:8000/formations/add", {
      method: "POST",
      mode: "cors",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name: formationName }),
    });
  };
  return (
    <button
      onClick={addFormationAction}
      className="add_formation_button"
      type="button"
    >
      <FontAwesomeIcon icon="fa-solid fa-plus" />
      <span>Ajouter</span>
    </button>
  );
}

function FormationTable(props) {
  const { formations } = props;
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
        <FormationRows formations={formations} />
      </tbody>
    </table>
  );
}

function FormationRows(props) {
  return props.formations.map((formation) => (
    <FormationRow
      key={formation.id}
      formationId={formation.id}
      title={formation.title}
    />
  ));
}

function FormationRow(props) {
  const [selected, setIsSelected] = useState(false);
  const { formationId, title } = props;

  const deleteRequest = () => {
    fetch(`http://localhost:8000/formations/delete/${formationId}`);
    window.location.reload();
  };

  return (
    <tr className="formation-row">
      <td className="checkbox">
        <input type="checkbox" onChange={() => setIsSelected(!selected)} />
      </td>

      <td>
        <p className="formation-title">{title}</p>
        <ul className="formation-actions">
          <li>
            <Link to={`edit/${formationId}`}>Editer</Link>
          </li>
          <li>
            <button type="button" onClick={deleteRequest}>
              Supprimer
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}
