/* eslint-disable react/forbid-prop-types */
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FormationPage.css";
import PropTypes from "prop-types";
import { addFormationAction } from "../../../utils/data";
import { AddTeacherButton } from "../../../components/Button/Button";

export default function FormationPage() {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then(
        (res) => setTeachers(res),
        () => {
          setError(true);
        }
      );
    fetch("http://localhost:8000/formations")
      .then((res1) => res1.json())
      .then(
        (res1) => {
          setFormations(res1.formations);
        },
        () => {
          setError(true);
        }
      );
  }, []);

  if (error) {
    return <p>Impossible de charger le contenu de la page</p>;
  }
  return (
    <div>
      <h1>Formations</h1>

      <p>
        {teachers.length === 0
          ? "Aucun professeur existe actuellement. Commencez par en ajouter un !"
          : "Vous pouvez ajouter des formations"}
      </p>
      <div className="actions-buttons-container">
        {teachers.length === 0 ? (
          <AddTeacherButton />
        ) : (
          <AddFormationButton teachers={teachers} />
        )}
      </div>

      <FormationTable formations={formations} />
      <p>
        Vous souhaitez <Link to="/admin/teachers">gérer les professeurs ?</Link>
      </p>
    </div>
  );
}

function AddFormationButton({ teachers }) {
  const [isFormationBoxToggled, setIsFormationBoxToggled] = useState(false);

  const toggleFormationBox = () => {
    setIsFormationBoxToggled(!isFormationBoxToggled);
  };
  return (
    <>
      <button
        onClick={toggleFormationBox}
        className="add_formation_button"
        type="button"
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" />
        <span>Ajouter une formation</span>
      </button>
      {isFormationBoxToggled ? <AddFormationBox teachers={teachers} /> : null}
    </>
  );
}

AddFormationButton.propTypes = {
  teachers: PropTypes.object.isRequired,
};

function AddFormationBox({ teachers }) {
  const [formationName, setFormationName] = useState(null);
  const [teacherId, setTeacherId] = useState(1);

  const handleRequest = () => {
    addFormationAction(formationName, teacherId);
  };
  return (
    <>
      <h2>Ajouter une nouvelle formation</h2>
      <p className="alert">
        Pensez à ajouter un professeur avant d&apos;ajouter une formation !
      </p>
      <div onSubmit={handleRequest}>
        <label id="formationName">
          Nom de la formation
          <input
            onChange={(e) => setFormationName(e.target.value)}
            type="text"
            id="formationName"
            name="formationName"
          />
        </label>
        <select
          onChange={(e) => {
            setTeacherId(e.target.value);
          }}
        >
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleRequest}>
          Ajouter
        </button>
      </div>
    </>
  );
}

AddFormationBox.propTypes = {
  teachers: PropTypes.object.isRequired,
};

function FormationTable(props) {
  const { formations } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Sélectionner</th>
          <th>Titre</th>
          <th>Nom de l&apos;enseignant</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formations.map((formation) => (
          <FormationRow
            key={formation.id}
            formationId={formation.id}
            title={formation.title}
            teacher={formation.teacher}
          />
        ))}
      </tbody>
    </table>
  );
}
FormationTable.propTypes = {
  formations: PropTypes.array.isRequired,
};

function FormationRow(props) {
  const [selected, setIsSelected] = useState(false);
  const { formationId, title, teacher } = props;

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
        <p>{title}</p>
      </td>
      <td>
        <p>
          <Link to={`/teacher/${teacher}`}>{teacher}</Link>
        </p>
      </td>
      <td>
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
FormationRow.propTypes = {
  formationId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  teacher: PropTypes.number.isRequired,
};
